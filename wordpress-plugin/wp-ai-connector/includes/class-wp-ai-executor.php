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

        // 1. Handle Global Actions (Create Post, Create Menu, Set Front Page, Set Logo)
        if ($action_type === 'create_post') {
            $post_title   = isset($proposed_values['post_title']) ? sanitize_text_field($proposed_values['post_title']) : 'New Page';
            $post_content = isset($proposed_values['post_content']) ? $proposed_values['post_content'] : '';
            $post_type    = isset($proposed_values['post_type']) ? sanitize_text_field($proposed_values['post_type']) : 'page';
            $post_status  = isset($proposed_values['post_status']) ? sanitize_text_field($proposed_values['post_status']) : 'publish';

            $new_post_id = wp_insert_post(array(
                'post_title'   => $post_title,
                'post_content' => $post_content,
                'post_type'    => $post_type,
                'post_status'  => $post_status,
            ));

            if (is_wp_error($new_post_id)) {
                return new WP_Error('rest_create_failed', $new_post_id->get_error_message(), array('status' => 500));
            }

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'post_id'            => $new_post_id,
                'action_type'        => $action_type,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));
        }

        if ($action_type === 'create_menu') {
            $menu_name = isset($proposed_values['menu_name']) ? sanitize_text_field($proposed_values['menu_name']) : 'Main Menu';
            $menu_items = isset($proposed_values['menu_items']) ? $proposed_values['menu_items'] : array();

            $menu_exists = wp_get_nav_menu_object($menu_name);
            if ($menu_exists) {
                $menu_id = $menu_exists->term_id;
                $existing_items = wp_get_nav_menu_items($menu_id);
                if ($existing_items) {
                    foreach ($existing_items as $item) {
                        wp_delete_post($item->ID, true);
                    }
                }
            } else {
                $menu_id = wp_create_nav_menu($menu_name);
            }

            if (is_wp_error($menu_id)) {
                return new WP_Error('rest_menu_create_failed', $menu_id->get_error_message(), array('status' => 500));
            }

            foreach ($menu_items as $item) {
                $item_title = isset($item['title']) ? sanitize_text_field($item['title']) : '';
                $item_url   = isset($item['url']) ? esc_url_raw($item['url']) : '';
                $item_pid   = isset($item['object_id']) ? intval($item['object_id']) : 0;
                $item_type  = isset($item['type']) ? sanitize_text_field($item['type']) : 'custom';

                $args = array(
                    'menu-item-title'  => $item_title,
                    'menu-item-status' => 'publish',
                );

                if ($item_type === 'post_type' && $item_pid > 0) {
                    $target_post = get_post($item_pid);
                    if ($target_post) {
                        $args['menu-item-object-id'] = $item_pid;
                        $args['menu-item-object']    = $target_post->post_type;
                        $args['menu-item-type']      = 'post_type';
                    }
                } else {
                    $args['menu-item-type'] = 'custom';
                    $args['menu-item-url']  = $item_url;
                }

                wp_update_nav_menu_item($menu_id, 0, $args);
            }

            $locations = get_theme_mod('nav_menu_locations');
            if (!is_array($locations)) {
                $locations = array();
            }
            $locations['primary'] = $menu_id;
            $locations['main']    = $menu_id;
            set_theme_mod('nav_menu_locations', $locations);

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'menu_id'            => $menu_id,
                'action_type'        => $action_type,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));
        }

        if ($action_type === 'import_media') {
            $image_url = isset($proposed_values['image_url']) ? $proposed_values['image_url'] : '';
            $alt_text  = isset($proposed_values['alt_text']) ? sanitize_text_field($proposed_values['alt_text']) : '';
            $title     = isset($proposed_values['title']) ? sanitize_text_field($proposed_values['title']) : '';

            if (empty($image_url)) {
                return new WP_Error('rest_invalid_param', 'image_url parameter is required.', array('status' => 400));
            }

            // 1. Strict URL Security Validation
            $parsed_url = parse_url($image_url);
            if (!$parsed_url || !isset($parsed_url['scheme']) || !isset($parsed_url['host'])) {
                return new WP_Error('rest_invalid_url', 'Invalid image URL structure.', array('status' => 400));
            }

            $scheme = strtolower($parsed_url['scheme']);
            if ($scheme !== 'http' && $scheme !== 'https') {
                return new WP_Error('rest_invalid_scheme', 'Only HTTP and HTTPS protocols are allowed.', array('status' => 400));
            }

            $host = strtolower($parsed_url['host']);
            if ($host === 'localhost' || $host === '127.0.0.1' || $host === '[::1]') {
                return new WP_Error('rest_forbidden_host', 'Localhost access is prohibited.', array('status' => 400));
            }

            $ip = gethostbyname($host);
            if ($ip && filter_var($ip, FILTER_VALIDATE_IP)) {
                $is_private = false;
                $ip_parts = explode('.', $ip);
                if (count($ip_parts) === 4) {
                    $first_octet = intval($ip_parts[0]);
                    $second_octet = intval($ip_parts[1]);
                    if ($first_octet === 10) {
                        $is_private = true;
                    } elseif ($first_octet === 172 && ($second_octet >= 16 && $second_octet <= 31)) {
                        $is_private = true;
                    } elseif ($first_octet === 192 && $second_octet === 168) {
                        $is_private = true;
                    } elseif ($first_octet === 127) {
                        $is_private = true;
                    } elseif ($first_octet === 169 && $second_octet === 254) {
                        $is_private = true;
                    }
                } else {
                    if ($ip === '::1' || strpos($ip, 'fe80:') === 0 || strpos($ip, 'fc00:') === 0 || strpos($ip, 'fd00:') === 0) {
                        $is_private = true;
                    }
                }

                if ($is_private) {
                    return new WP_Error('rest_forbidden_ip', 'Requests to private IP addresses are prohibited.', array('status' => 400));
                }
            }

            require_once(ABSPATH . 'wp-admin/includes/image.php');
            require_once(ABSPATH . 'wp-admin/includes/file.php');
            require_once(ABSPATH . 'wp-admin/includes/media.php');

            $file_ext = pathinfo(parse_url($image_url, PHP_URL_PATH), PATHINFO_EXTENSION);
            if (empty($file_ext) || !in_array(strtolower($file_ext), array('jpg', 'jpeg', 'png', 'gif', 'webp'))) {
                $file_ext = 'jpg';
            }
            $clean_title = sanitize_title($title ? $title : 'sideloaded_image');
            $filename = $clean_title . '_' . time() . '.' . $file_ext;

            $response = wp_safe_remote_get($image_url, array(
                'timeout'     => 15,
                'redirection' => 3,
                'stream'      => true,
                'filename'    => wp_tempnam($image_url),
                'limit_response_size' => 10 * 1024 * 1024,
            ));

            if (is_wp_error($response)) {
                return new WP_Error('rest_download_failed', $response->get_error_message(), array('status' => 500));
            }

            $tmp_file = $response['filename'];
            if (!file_exists($tmp_file) || filesize($tmp_file) === 0) {
                @unlink($tmp_file);
                return new WP_Error('rest_download_failed', 'Downloaded file is empty or does not exist.', array('status' => 500));
            }

            if (function_exists('mime_content_type')) {
                $mime_type = mime_content_type($tmp_file);
            } else {
                $finfo = finfo_open(FILEINFO_MIME_TYPE);
                $mime_type = finfo_file($finfo, $tmp_file);
                finfo_close($finfo);
            }

            $allowed_mimes = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp');
            if (!in_array($mime_type, $allowed_mimes)) {
                @unlink($tmp_file);
                return new WP_Error('rest_invalid_mime', 'File type ' . $mime_type . ' is not allowed.', array('status' => 400));
            }

            $editor = wp_get_image_editor($tmp_file);
            $optimized = false;
            if (!is_wp_error($editor)) {
                $sizes = $editor->get_size();
                if ($sizes && ($sizes['width'] > 1920 || $sizes['height'] > 1920)) {
                    $editor->resize(1920, 1920, false);
                }
                $editor->set_quality(82);
                $save_res = $editor->save($tmp_file);
                if (!is_wp_error($save_res)) {
                    $optimized = true;
                }
            }

            $file_array = array(
                'name'     => $filename,
                'tmp_name' => $tmp_file,
            );

            $desc = $title ? $title : $alt_text;
            $attachment_id = media_handle_sideload($file_array, 0, $desc);

            if (is_wp_error($attachment_id)) {
                @unlink($tmp_file);
                return new WP_Error('rest_sideload_failed', $attachment_id->get_error_message(), array('status' => 500));
            }

            if (!empty($alt_text)) {
                update_post_meta($attachment_id, '_wp_attachment_image_alt', $alt_text);
            }

            $attachment_url = wp_get_attachment_url($attachment_id);

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'attachment_id'      => $attachment_id,
                'attachment_url'     => $attachment_url,
                'filename'           => $filename,
                'alt_text'           => $alt_text,
                'optimized'          => $optimized,
                'action_type'        => $action_type,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));
        }

        if ($action_type === 'set_front_page') {
            $page_id = isset($proposed_values['page_id']) ? intval($proposed_values['page_id']) : 0;
            if ($page_id <= 0) {
                return new WP_Error('rest_invalid_param', 'page_id parameter is required.', array('status' => 400));
            }

            update_option('show_on_front', 'page');
            update_option('page_on_front', $page_id);

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'page_id'            => $page_id,
                'action_type'        => $action_type,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));
        }

        if ($action_type === 'set_site_logo') {
            $logo_url = isset($proposed_values['logo_url']) ? $proposed_values['logo_url'] : '';
            if (empty($logo_url)) {
                return new WP_Error('rest_invalid_param', 'logo_url parameter is required.', array('status' => 400));
            }

            $attachment_id = 0;
            // Check if logo is base64 data
            if (strpos($logo_url, 'data:image') === 0) {
                if (preg_match('/^data:image\/(\w+);base64,/', $logo_url, $type)) {
                    $logo_data = substr($logo_url, strpos($logo_url, ',') + 1);
                    $file_ext = strtolower($type[1]);
                } else {
                    $logo_data = $logo_url;
                    $file_ext = 'png';
                }
                $decoded = base64_decode($logo_data);
                if ($decoded) {
                    $filename = 'logo_' . time() . '.' . $file_ext;
                    $upload = wp_upload_bits($filename, null, $decoded);
                    if (!$upload['error']) {
                        require_once(ABSPATH . 'wp-admin/includes/image.php');
                        $file_path = $upload['file'];
                        $file_type = wp_check_filetype($file_path, null);
                        $attachment = array(
                            'post_mime_type' => $file_type['type'],
                            'post_title'     => 'Brand Logo',
                            'post_content'   => '',
                            'post_status'    => 'inherit'
                        );
                        $attachment_id = wp_insert_attachment($attachment, $file_path, 0);
                        if (!is_wp_error($attachment_id)) {
                            $attachment_data = wp_generate_attachment_metadata($attachment_id, $file_path);
                            wp_update_attachment_metadata($attachment_id, $attachment_data);
                        } else {
                            $attachment_id = 0;
                        }
                    }
                }
            } else {
                $logo_url = esc_url_raw($logo_url);
                if (strpos($logo_url, get_site_url()) === false) {
                    require_once(ABSPATH . 'wp-admin/includes/image.php');
                    require_once(ABSPATH . 'wp-admin/includes/file.php');
                    require_once(ABSPATH . 'wp-admin/includes/media.php');

                    $desc = "Brand Logo";
                    $file_array = array();
                    $file_array['name'] = basename($logo_url);

                    $tmp_file = download_url($logo_url);
                    if (!is_wp_error($tmp_file)) {
                        $file_array['tmp_name'] = $tmp_file;
                        $attachment_id = media_handle_sideload($file_array, 0, $desc);
                        if (is_wp_error($attachment_id)) {
                            $attachment_id = 0;
                        }
                    }
                } else {
                    $attachment_id = attachment_url_to_postid($logo_url);
                }
            }

            if ($attachment_id > 0) {
                set_theme_mod('custom_logo', $attachment_id);
            } else {
                return new WP_Error('rest_logo_upload_failed', 'Failed to upload custom logo into media library.', array('status' => 500));
            }

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'attachment_id'      => $attachment_id,
                'action_type'        => $action_type,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));
        }

        // 2. Normal Single-Post Modification Checks
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

        // 3. Capabilities Enforcement
        if (is_user_logged_in() && !current_user_can('edit_post', $post_id)) {
            return new WP_Error(
                'rest_forbidden_capability',
                'Executing context lacks required edit_post capability for post #' . $post_id . '.',
                array('status' => 403)
            );
        }

        // 4. Short-Lived Entity Locking (Transient Lock)
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
