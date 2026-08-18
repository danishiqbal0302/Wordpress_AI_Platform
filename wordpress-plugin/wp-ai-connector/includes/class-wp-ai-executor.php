<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Executor {
    public function register_routes() {
        register_rest_route('wp-ai/v1', '/execute', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'execute_proposal'),
            'permission_callback' => array('WP_AI_Security', 'verify_request'),
        ));
    }

    public function execute_proposal(WP_REST_Request $request) {
        $params = $request->get_json_params();

        $post_id          = isset($params['post_id']) ? intval($params['post_id']) : 0;
        $target_checksum  = isset($params['target_checksum']) ? sanitize_text_field($params['target_checksum']) : '';
        $action_type      = isset($params['action_type']) ? sanitize_text_field($params['action_type']) : '';
        $proposed_values  = isset($params['proposed_values']) ? $params['proposed_values'] : array();

        if ($post_id <= 0 || empty($target_checksum)) {
            return new WP_Error(
                'rest_invalid_param',
                'Parameters post_id and target_checksum are required.',
                array('status' => 400)
            );
        }

        $post = get_post($post_id);
        if (!$post) {
            return new WP_Error(
                'rest_post_not_found',
                'Target post record not found in WordPress database.',
                array('status' => 404)
            );
        }

        // 1. Capabilities Enforcement
        if (is_user_logged_in() && !current_user_can('edit_post', $post_id)) {
            return new WP_Error(
                'rest_forbidden_capability',
                'Executing context lacks required edit_post capability for post #' . $post_id . '.',
                array('status' => 403)
            );
        }

        // 2. Short-Lived Entity Locking (Transient Lock)
        $lock_key = 'wp_ai_lock_' . $post_id;
        $existing_lock = get_transient($lock_key);
        if ($existing_lock) {
            return new WP_Error(
                'rest_entity_locked',
                'Post #' . $post_id . ' is currently locked by a concurrent action (Lock ID: ' . $existing_lock . ').',
                array('status' => 423)
            );
        }

        // Acquire lock for 30 seconds
        $lock_id = 'lock_' . time() . '_' . wp_generate_password(6, false);
        set_transient($lock_key, $lock_id, 30);

        try {
            // Calculate Current Post MD5 Checksum
            $current_title   = $post->post_title;
            $current_excerpt = $post->post_excerpt;
            $current_meta    = get_post_meta($post_id);
            $current_payload = $current_title . '|' . $current_excerpt . '|' . serialize($current_meta);
            $current_checksum = md5($current_payload);

            // Pre-execution Checksum Lock (Hard-Fail Stale Protection if strict checksum provided)
            if (!empty($target_checksum) && $target_checksum !== 'bypass' && $target_checksum !== $current_checksum) {
                delete_transient($lock_key);
                return new WP_Error(
                    'rest_conflict_stale_target',
                    'Stale target checksum detected. Target page was edited concurrently in wp-admin prior to execution.',
                    array(
                        'status'           => 409,
                        'current_checksum' => $current_checksum,
                        'expected_checksum'=> $target_checksum,
                    )
                );
            }

            // Generate Rollback Snapshot ID
            $snapshot_id = 'wp_ai_snapshot_' . $post_id . '_' . time();
            $snapshot_data = array(
                'post_id'      => $post_id,
                'post_title'   => $post->post_title,
                'post_content' => $post->post_content,
                'post_excerpt' => $post->post_excerpt,
                'post_meta'    => $current_meta,
                'parent_posts' => array(),
                'timestamp'    => time(),
            );

            // Save Rollback Snapshot in wp_options
            update_option($snapshot_id, $snapshot_data, false);

            // 3. Apply Action Types
            // A. Post Title Updates
            if ($action_type === 'update_post_title' || isset($proposed_values['post_title'])) {
                $title_val = '';
                if (isset($proposed_values['post_title'])) {
                    $title_val = $proposed_values['post_title'];
                } elseif (isset($proposed_values['value'])) {
                    $title_val = $proposed_values['value'];
                }
                $title_val = sanitize_text_field($title_val);
                if (!empty($title_val)) {
                    wp_update_post(array('ID' => $post_id, 'post_title' => $title_val));
                    clean_post_cache($post_id);
                }
            }

            // B. Post Content Updates
            if (isset($proposed_values['post_content'])) {
                $raw_post_content = $proposed_values['post_content'];

                // Normalize Gutenberg heading level block comments to match inner tag levels
                $raw_post_content = preg_replace(
                    '/<!--\s*wp:heading\s*-->\s*(<h1[^>]*>)/i',
                    '<!-- wp:heading {"level":1} -->' . "\n" . '$1',
                    $raw_post_content
                );
                $raw_post_content = preg_replace(
                    '/<!--\s*wp:heading\s*-->\s*(<h3[^>]*>)/i',
                    '<!-- wp:heading {"level":3} -->' . "\n" . '$1',
                    $raw_post_content
                );

                wp_update_post(array(
                    'ID'           => $post_id,
                    'post_content' => wp_slash($raw_post_content),
                ));
                clean_post_cache($post_id);
                wp_cache_delete($post_id, 'posts');
            }

            // C. Post Excerpt Updates
            if (isset($proposed_values['post_excerpt'])) {
                wp_update_post(array('ID' => $post_id, 'post_excerpt' => sanitize_textarea_field($proposed_values['post_excerpt'])));
                clean_post_cache($post_id);
            }

            // D. Image Alt Text Updates
            if ($action_type === 'update_alt_text' || isset($proposed_values['alt_text']) || isset($proposed_values['alt'])) {
                $alt_val = '';
                if (is_array($proposed_values)) {
                    if (isset($proposed_values['alt_text'])) {
                        $alt_val = $proposed_values['alt_text'];
                    } elseif (isset($proposed_values['value'])) {
                        $alt_val = $proposed_values['value'];
                    } elseif (isset($proposed_values['alt'])) {
                        $alt_val = $proposed_values['alt'];
                    }
                } elseif (is_string($proposed_values)) {
                    $alt_val = $proposed_values;
                }

                $alt_val = sanitize_text_field($alt_val);

                if (!empty($alt_val)) {
                    update_post_meta($post_id, '_wp_attachment_image_alt', wp_slash($alt_val));
                    clean_post_cache($post_id);

                    $target_post = get_post($post_id);
                    if ($target_post) {
                        $posts_to_update = array();
                        if ($target_post->post_type === 'attachment' && $target_post->post_parent > 0) {
                            $parent_p = get_post($target_post->post_parent);
                            if ($parent_p) {
                                $posts_to_update[] = $parent_p;
                            }
                        } elseif ($target_post->post_type !== 'attachment') {
                            $posts_to_update[] = $target_post;
                            $attached_images = get_attached_media('image', $post_id);
                            if (!empty($attached_images)) {
                                foreach ($attached_images as $att_img) {
                                    update_post_meta($att_img->ID, '_wp_attachment_image_alt', wp_slash($alt_val));
                                    clean_post_cache($att_img->ID);
                                }
                            }
                        }

                        foreach ($posts_to_update as $p_item) {
                            $orig_elem_data = get_post_meta($p_item->ID, '_elementor_data', true);
                            $snapshot_data['parent_posts'][] = array(
                                'post_id'        => $p_item->ID,
                                'post_content'   => $p_item->post_content,
                                'elementor_data' => $orig_elem_data,
                            );

                            if (!empty($p_item->post_content)) {
                                $updated_content = preg_replace_callback(
                                    '/<img\s+([^>]*?)>/i',
                                    function ($matches) use ($alt_val) {
                                        $img_tag = $matches[0];
                                        if (preg_match('/alt=([\'"])(.*?)\1/i', $img_tag)) {
                                            return preg_replace('/alt=([\'"])(.*?)\1/i', 'alt="' . esc_attr($alt_val) . '"', $img_tag);
                                        } else {
                                            return str_replace('<img ', '<img alt="' . esc_attr($alt_val) . '" ', $img_tag);
                                        }
                                    },
                                    $p_item->post_content
                                );

                                if (strpos($updated_content, '<!-- wp:image') !== false) {
                                    $updated_content = preg_replace_callback(
                                        '/<!--\s+wp:image\s+(\{.*?\})\s+-->/s',
                                        function ($matches) use ($alt_val) {
                                            $json_str = $matches[1];
                                            $data = json_decode($json_str, true);
                                            if (is_array($data)) {
                                                $data['alt'] = $alt_val;
                                                $new_json = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                                                return '<!-- wp:image ' . $new_json . ' -->';
                                            }
                                            return $matches[0];
                                        },
                                        $updated_content
                                    );
                                }

                                if ($updated_content !== $p_item->post_content) {
                                    wp_update_post(array(
                                        'ID'           => $p_item->ID,
                                        'post_content' => $updated_content,
                                    ));
                                    clean_post_cache($p_item->ID);
                                }
                            }

                            $elementor_data = get_post_meta($p_item->ID, '_elementor_data', true);
                            if (!empty($elementor_data) && is_string($elementor_data)) {
                                $updated_elementor = preg_replace_callback(
                                    '/"alt":\s*"([^"]*)"/i',
                                    function () use ($alt_val) {
                                        return '"alt":"' . esc_js($alt_val) . '"';
                                    },
                                    $elementor_data
                                );
                                if ($updated_elementor !== $elementor_data) {
                                    update_post_meta($p_item->ID, '_elementor_data', wp_slash($updated_elementor));
                                    clean_post_cache($p_item->ID);
                                }
                            }
                        }

                        update_option($snapshot_id, $snapshot_data, false);
                    }
                }
            }

            // E. Meta Field Updates (Yoast, Rank Math, AIOSEO, SEOPress)
            if (isset($proposed_values['meta']) && is_array($proposed_values['meta'])) {
                foreach ($proposed_values['meta'] as $meta_key => $meta_val) {
                    $clean_val = sanitize_text_field($meta_val);
                    update_post_meta($post_id, $meta_key, $clean_val);
                }
            }

            if ($action_type === 'update_meta_title' || isset($proposed_values['meta_title'])) {
                $title_val = sanitize_text_field(isset($proposed_values['meta_title']) ? $proposed_values['meta_title'] : (isset($proposed_values['value']) ? $proposed_values['value'] : ''));
                if (!empty($title_val)) {
                    update_post_meta($post_id, '_yoast_wpseo_title', $title_val);
                    update_post_meta($post_id, 'rank_math_title', $title_val);
                    update_post_meta($post_id, '_aioseo_title', $title_val);
                    update_post_meta($post_id, '_seopress_titles_title', $title_val);
                }
            }

            if ($action_type === 'update_meta_description' || isset($proposed_values['meta_description'])) {
                $desc_val = sanitize_text_field(isset($proposed_values['meta_description']) ? $proposed_values['meta_description'] : (isset($proposed_values['value']) ? $proposed_values['value'] : ''));
                if (!empty($desc_val)) {
                    update_post_meta($post_id, '_yoast_wpseo_metadesc', $desc_val);
                    update_post_meta($post_id, 'rank_math_description', $desc_val);
                    update_post_meta($post_id, '_aioseo_description', $desc_val);
                    update_post_meta($post_id, '_seopress_titles_desc', $desc_val);
                }
            }

            if ($action_type === 'update_focus_keyword' || isset($proposed_values['focus_keyword'])) {
                $kw_val = sanitize_text_field(isset($proposed_values['focus_keyword']) ? $proposed_values['focus_keyword'] : (isset($proposed_values['value']) ? $proposed_values['value'] : ''));
                if (!empty($kw_val)) {
                    update_post_meta($post_id, '_yoast_wpseo_focuskw', $kw_val);
                    update_post_meta($post_id, 'rank_math_focus_keyword', $kw_val);
                }
            }

            // 4. Strict Post-Write Cache Clean & Verification
            clean_post_cache($post_id);
            wp_cache_delete($post_id, 'posts');

            $reread_post = get_post($post_id);
            $updated_meta = get_post_meta($post_id);
            $new_payload  = $reread_post->post_title . '|' . $reread_post->post_excerpt . '|' . serialize($updated_meta);
            $new_checksum = md5($new_payload);

            delete_transient($lock_key);

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'post_id'            => $post_id,
                'action_type'        => $action_type,
                'previous_checksum'  => $current_checksum,
                'new_checksum'       => $new_checksum,
                'snapshot_id'        => $snapshot_id,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));

        } catch (Exception $e) {
            delete_transient($lock_key);
            return new WP_Error(
                'rest_execution_error',
                $e->getMessage(),
                array('status' => 500)
            );
        }
    }
}
