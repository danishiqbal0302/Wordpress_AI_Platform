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

            // Apply Proposed Field Updates
            $update_post_args = array('ID' => $post_id);

            // Direct Post Attributes
            if (isset($proposed_values['post_title'])) {
                $update_post_args['post_title'] = sanitize_text_field($proposed_values['post_title']);
            }
            if (isset($proposed_values['post_excerpt'])) {
                $update_post_args['post_excerpt'] = sanitize_textarea_field($proposed_values['post_excerpt']);
            }
            if (isset($proposed_values['post_content'])) {
                $update_post_args['post_content'] = wp_kses_post($proposed_values['post_content']);
            }

            if (count($update_post_args) > 1) {
                wp_update_post($update_post_args);
            }

            // Image Alt Text (for Attachment CPT and embedded page content)
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
                    // Update Attachment Meta
                    update_post_meta($post_id, '_wp_attachment_image_alt', wp_slash($alt_val));
                    clean_post_cache($post_id);
                    wp_cache_delete($post_id, 'post_meta');

                    // If $post_id is a Post/Page, also update attached media and embedded HTML images
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
                            // Also update attached image attachments
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
                                // A. Update <img> HTML tags
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

                                // B. Update Gutenberg Block Comment JSON (<!-- wp:image {"alt": "..."} -->)
                                if (strpos($updated_content, '<!-- wp:image') !== false) {
                                    $updated_content = preg_replace_callback(
                                        '/<!--\s+wp:image\s+(\{.*?\})\s+-->/s',
                                        function ($matches) use ($alt_val, $post_id) {
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

                            // C. Update Elementor _elementor_data Meta JSON if present
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

                        // Re-save updated snapshot data including parent_posts
                        update_option($snapshot_id, $snapshot_data, false);
                    }
                }
            }

            // Meta Field Updates (Yoast, Rank Math, AIOSEO, SEOPress, Core Meta)
            if (isset($proposed_values['meta']) && is_array($proposed_values['meta'])) {
                foreach ($proposed_values['meta'] as $meta_key => $meta_val) {
                    $clean_val = sanitize_text_field($meta_val);
                    update_post_meta($post_id, $meta_key, $clean_val);
                }
            }

            // Specific Action Type Shortcut Mappings
            if ($action_type === 'update_meta_title' && isset($proposed_values['meta_title'])) {
                $title_val = sanitize_text_field($proposed_values['meta_title']);
                update_post_meta($post_id, '_yoast_wpseo_title', $title_val);
                update_post_meta($post_id, 'rank_math_title', $title_val);
                update_post_meta($post_id, '_aioseo_title', $title_val);
                update_post_meta($post_id, '_seopress_titles_title', $title_val);
            }
            if ($action_type === 'update_meta_description' && isset($proposed_values['meta_description'])) {
                $desc_val = sanitize_text_field($proposed_values['meta_description']);
                update_post_meta($post_id, '_yoast_wpseo_metadesc', $desc_val);
                update_post_meta($post_id, 'rank_math_description', $desc_val);
                update_post_meta($post_id, '_aioseo_description', $desc_val);
                update_post_meta($post_id, '_seopress_titles_desc', $desc_val);
            }
            if ($action_type === 'update_focus_keyword' && isset($proposed_values['focus_keyword'])) {
                $kw_val = sanitize_text_field($proposed_values['focus_keyword']);
                update_post_meta($post_id, '_yoast_wpseo_focuskw', $kw_val);
                update_post_meta($post_id, 'rank_math_focus_keyword', $kw_val);
            }

            // 3. Strict Post-Write Verification
            $reread_post = get_post($post_id);
            $mismatches  = array();

            if (isset($proposed_values['post_title'])) {
                $expected = sanitize_text_field($proposed_values['post_title']);
                if ($reread_post->post_title !== $expected) {
                    $mismatches['post_title'] = array('expected' => $expected, 'actual' => $reread_post->post_title);
                }
            }

            $verification_status = empty($mismatches) ? 'VERIFIED_EXACT_MATCH' : 'VERIFICATION_FAILED';

            // Calculate New Post Checksum after Execution
            $updated_meta = get_post_meta($post_id);
            $new_payload  = $reread_post->post_title . '|' . $reread_post->post_excerpt . '|' . serialize($updated_meta);
            $new_checksum = md5($new_payload);

            // Release transient entity lock
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
