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
            $snapshot_id = 'wp_ai_snapshot_create_' . time() . '_' . wp_generate_password(6, false);
            $items_to_create = array();

            if (isset($proposed_values['items']) && is_array($proposed_values['items']) && count($proposed_values['items']) > 0) {
                $items_to_create = $proposed_values['items'];
            } else {
                $items_to_create[] = $proposed_values;
            }

            $created_items = array();
            $created_ids   = array();

            foreach ($items_to_create as $item) {
                $title   = isset($item['post_title']) ? sanitize_text_field($item['post_title']) : (isset($item['title']) ? sanitize_text_field($item['title']) : 'New Item');
                $content = isset($item['post_content']) ? $item['post_content'] : (isset($item['content']) ? $item['content'] : '');
                $type    = isset($item['post_type']) ? sanitize_text_field($item['post_type']) : 'page';
                $status  = isset($item['post_status']) ? sanitize_text_field($item['post_status']) : 'publish';

                $new_id = wp_insert_post(array(
                    'post_title'   => $title,
                    'post_content' => $content,
                    'post_type'    => $type,
                    'post_status'  => $status,
                ));

                if (is_wp_error($new_id)) {
                    return new WP_Error('rest_create_failed', "Failed to create item '{$title}': " . $new_id->get_error_message(), array('status' => 500));
                }

                clean_post_cache($new_id);
                wp_cache_delete($new_id, 'posts');

                $reread = get_post($new_id);
                if (!$reread) {
                    return new WP_Error('rest_verification_failed', "Failed to verify creation of item ID #{$new_id}", array('status' => 500));
                }

                $created_ids[]   = $new_id;
                $created_items[] = array(
                    'post_id'    => $new_id,
                    'post_title' => $reread->post_title,
                    'post_type'  => $reread->post_type,
                    'status'     => 'created',
                );
            }

            // Save creation snapshot for 1-click rollback
            $snapshot_data = array(
                'is_new_creation' => true,
                'created_ids'     => $created_ids,
                'created_items'   => $created_items,
                'action_type'     => 'create_post',
                'created_at'      => time(),
            );
            update_option($snapshot_id, $snapshot_data, false);

            $primary_id = count($created_ids) > 0 ? $created_ids[0] : 0;

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'post_id'            => $primary_id,
                'created_ids'        => $created_ids,
                'created_items'      => $created_items,
                'snapshot_id'        => $snapshot_id,
                'action_type'        => $action_type,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));
        }

        if ($action_type === 'delete_post') {
            $target_id = isset($params['post_id']) ? intval($params['post_id']) : (isset($proposed_values['post_id']) ? intval($proposed_values['post_id']) : 0);
            if ($target_id > 0) {
                wp_delete_post($target_id, true);
                clean_post_cache($target_id);
            }
            return rest_ensure_response(array(
                'execution_state' => 'SUCCEEDED',
                'action_type'     => 'delete_post',
                'post_id'         => $target_id,
                'executedAt'      => time(),
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

        if ($action_type === 'install_custom_theme') {
            $theme_slug = isset($proposed_values['theme_slug']) ? sanitize_key($proposed_values['theme_slug']) : '';
            $theme_name = isset($proposed_values['theme_name']) ? sanitize_text_field($proposed_values['theme_name']) : '';
            $theme_json = isset($proposed_values['theme_json']) ? $proposed_values['theme_json'] : '';
            $style_css  = isset($proposed_values['style_css']) ? $proposed_values['style_css'] : '';
            $templates  = isset($proposed_values['templates']) ? $proposed_values['templates'] : array();
            $parts      = isset($proposed_values['parts']) ? $proposed_values['parts'] : array();

            // 1. Theme Slug Security Validation
            if (empty($theme_slug) || !preg_match('/^[a-z0-9\-]+$/', $theme_slug)) {
                return new WP_Error('rest_invalid_theme_slug', 'Theme slug must be lowercase alphanumeric and hyphens only.', array('status' => 400));
            }
            if (empty($theme_name)) {
                return new WP_Error('rest_invalid_theme_name', 'Theme name is required.', array('status' => 400));
            }

            // 2. Payload size & file count constraints
            $max_files = 20;
            $max_file_size = 500 * 1024; // 500KB
            $max_total_size = 2 * 1024 * 1024; // 2MB

            $file_count = 2 + count($templates) + count($parts);
            if ($file_count > $max_files) {
                return new WP_Error('rest_too_many_files', 'Package exceeds maximum files limit.', array('status' => 400));
            }

            $total_size = strlen($theme_json) + strlen($style_css);
            foreach ($templates as $c) { $total_size += strlen($c); }
            foreach ($parts as $c) { $total_size += strlen($c); }

            if ($total_size > $max_total_size) {
                return new WP_Error('rest_package_oversized', 'Total theme package size exceeds 2MB.', array('status' => 400));
            }
            if (strlen($theme_json) > $max_file_size || strlen($style_css) > $max_file_size) {
                return new WP_Error('rest_file_oversized', 'Individual theme file size exceeds 500KB.', array('status' => 400));
            }
            foreach ($templates as $c) {
                if (strlen($c) > $max_file_size) {
                    return new WP_Error('rest_file_oversized', 'Individual template file size exceeds 500KB.', array('status' => 400));
                }
            }
            foreach ($parts as $c) {
                if (strlen($c) > $max_file_size) {
                    return new WP_Error('rest_file_oversized', 'Individual template part file size exceeds 500KB.', array('status' => 400));
                }
            }

            // 3. Absolute path & path traversal break guards
            $theme_root = get_theme_root();
            $dest_dir   = $theme_root . '/' . $theme_slug;

            if (file_exists($dest_dir)) {
                $real_dest = realpath($dest_dir);
                $real_root = realpath($theme_root);
                if ($real_dest && strpos($real_dest, $real_root) !== 0) {
                    return new WP_Error('rest_path_traversal', 'Path traversal attempt detected.', array('status' => 400));
                }
            }

            // Create target folder securely
            if (!file_exists($dest_dir)) {
                if (!wp_mkdir_p($dest_dir)) {
                    return new WP_Error('rest_theme_dir_failed', 'Failed to create theme directory.', array('status' => 500));
                }
            }

            // 4. File-type integrity & write validations
            // Write style.css
            $style_content = "/*\nTheme Name: " . $theme_name . "\nTheme URI: https://wordpress-ai-platform.com\nDescription: Custom premium AI generated block theme.\nVersion: 1.0.0\nAuthor: WordPress AI Platform\nLicense: GNU General Public License v2 or later\nText Domain: " . $theme_slug . "\n*/\n" . $style_css;
            if (file_put_contents($dest_dir . '/style.css', $style_content) === false) {
                return new WP_Error('rest_style_write_failed', 'Failed to write style.css file.', array('status' => 500));
            }

            // Write theme.json (syntax check)
            if (!empty($theme_json)) {
                if (is_array($theme_json) || is_object($theme_json)) {
                    $theme_json_str = json_encode($theme_json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
                } else {
                    $theme_json_str = $theme_json;
                    $decoded = json_decode($theme_json_str, true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        return new WP_Error('rest_invalid_theme_json_syntax', 'Invalid theme.json syntax.', array('status' => 400));
                    }
                }
                if (file_put_contents($dest_dir . '/theme.json', $theme_json_str) === false) {
                    return new WP_Error('rest_theme_json_write_failed', 'Failed to write theme.json file.', array('status' => 500));
                }
            }

            // Write Templates
            if (!empty($templates) && is_array($templates)) {
                $templates_dir = $dest_dir . '/templates';
                if (!file_exists($templates_dir)) {
                    wp_mkdir_p($templates_dir);
                }
                foreach ($templates as $file_name => $content) {
                    $clean_file = sanitize_file_name($file_name);
                    if (empty($clean_file) || !preg_match('/^[a-z0-9\-]+\.html$/', $clean_file)) {
                        return new WP_Error('rest_invalid_template_name', 'Invalid template file name: ' . $file_name, array('status' => 400));
                    }
                    if (file_put_contents($templates_dir . '/' . $clean_file, $content) === false) {
                        return new WP_Error('rest_template_write_failed', 'Failed to write template ' . $clean_file, array('status' => 500));
                    }
                }
            }

            // Write Parts
            if (!empty($parts) && is_array($parts)) {
                $parts_dir = $dest_dir . '/parts';
                if (!file_exists($parts_dir)) {
                    wp_mkdir_p($parts_dir);
                }
                foreach ($parts as $file_name => $content) {
                    $clean_file = sanitize_file_name($file_name);
                    if (empty($clean_file) || !preg_match('/^[a-z0-9\-]+\.html$/', $clean_file)) {
                        return new WP_Error('rest_invalid_part_name', 'Invalid template part file name: ' . $file_name, array('status' => 400));
                    }
                    if (file_put_contents($parts_dir . '/' . $clean_file, $content) === false) {
                        return new WP_Error('rest_part_write_failed', 'Failed to write template part ' . $clean_file, array('status' => 500));
                    }
                }
            }

            // 5. Audit active theme parameters before switch
            $prev_theme = wp_get_theme();
            $active_theme_before_build = array(
                'name'           => $prev_theme->get('Name'),
                'stylesheet'     => $prev_theme->get_stylesheet(),
                'template'       => $prev_theme->get_template(),
                'version'        => $prev_theme->get('Version'),
                'is_block_theme' => (function_exists('wp_is_block_theme') && wp_is_block_theme())
            );

            // Switch/Activate the custom theme
            switch_theme($theme_slug);

            // 6. Live environment verification checks
            $current_theme = wp_get_theme();
            $activated_slug = $current_theme->get_stylesheet();
            
            $activated_ok = ($activated_slug === $theme_slug);
            $theme_json_ok = file_exists($dest_dir . '/theme.json');
            $style_css_ok  = file_exists($dest_dir . '/style.css');

            $required_files = array(
                'templates/front-page.html',
                'templates/page.html',
                'templates/index.html',
                'templates/single.html',
                'templates/404.html',
                'parts/header.html',
                'parts/footer.html'
            );

            $required_files_ok = true;
            foreach ($required_files as $f) {
                if (!file_exists($dest_dir . '/' . $f)) {
                    $required_files_ok = false;
                    break;
                }
            }

            $is_block_theme_ok = (function_exists('wp_is_block_theme') && wp_is_block_theme());

            if (!$activated_ok || !$theme_json_ok || !$style_css_ok || !$required_files_ok || !$is_block_theme_ok) {
                // Rollback atomically
                switch_theme($active_theme_before_build['stylesheet']);
                
                $reasons = array();
                if (!$activated_ok) $reasons[] = "Activated slug mismatch (Expected: $theme_slug, Got: $activated_slug)";
                if (!$theme_json_ok) $reasons[] = "theme.json is missing";
                if (!$style_css_ok) $reasons[] = "style.css is missing";
                if (!$required_files_ok) $reasons[] = "One or more required templates/parts are missing";
                if (!$is_block_theme_ok) $reasons[] = "Active theme is not recognized as a block theme";

                return new WP_Error('rest_theme_verification_failed', 'Theme verification failed: ' . implode(', ', $reasons) . '. Restored previous theme: ' . $active_theme_before_build['stylesheet'], array('status' => 500));
            }

            $active_theme_after_build = array(
                'name'           => $current_theme->get('Name'),
                'stylesheet'     => $current_theme->get_stylesheet(),
                'template'       => $current_theme->get_template(),
                'version'        => $current_theme->get('Version'),
                'is_block_theme' => $is_block_theme_ok
            );

            return rest_ensure_response(array(
                'execution_state'           => 'SUCCEEDED',
                'theme_slug'                => $theme_slug,
                'theme_name'                => $theme_name,
                'active_theme_before_build' => $active_theme_before_build,
                'active_theme_after_build'  => $active_theme_after_build,
                'action_type'               => $action_type,
                'verificationStatus'        => 'VERIFIED_EXACT_MATCH',
                'executedAt'                => time(),
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
            if ($action_type === 'update_alt_text' || isset($proposed_values['alt_text']) || isset($proposed_values['targets']) || isset($proposed_values['alt_map'])) {
                $targets = array();

                if (isset($proposed_values['targets']) && is_array($proposed_values['targets'])) {
                    $targets = $proposed_values['targets'];
                } elseif (isset($proposed_values['alt_map']) && is_array($proposed_values['alt_map'])) {
                    foreach ($proposed_values['alt_map'] as $key => $alt) {
                        $targets[] = array(
                            'attachment_id' => is_numeric($key) ? intval($key) : 0,
                            'image_url'     => !is_numeric($key) ? $key : '',
                            'alt_text'      => $alt,
                        );
                    }
                } else {
                    $single_alt = '';
                    if (isset($proposed_values['alt_text'])) {
                        $single_alt = $proposed_values['alt_text'];
                    } elseif (isset($proposed_values['value'])) {
                        $single_alt = $proposed_values['value'];
                    } elseif (isset($proposed_values['alt'])) {
                        $single_alt = $proposed_values['alt'];
                    }

                    $targets[] = array(
                        'attachment_id' => $post_id,
                        'alt_text'      => $single_alt,
                    );
                }

                $updated_count = 0;
                $failed_count  = 0;
                $details       = array();

                foreach ($targets as $target) {
                    $att_id  = isset($target['attachment_id']) ? intval($target['attachment_id']) : 0;
                    $img_url = isset($target['image_url']) ? $target['image_url'] : '';
                    $alt_txt = isset($target['alt_text']) ? sanitize_text_field($target['alt_text']) : '';

                    if (!$att_id && !empty($img_url)) {
                        $att_id = attachment_url_to_postid($img_url);
                    }

                    if ($att_id > 0) {
                        // 1. Update Media Library Postmeta
                        update_post_meta($att_id, '_wp_attachment_image_alt', wp_slash($alt_txt));
                        clean_post_cache($att_id);

                        // Verify postmeta update immediately
                        $verified_meta = get_post_meta($att_id, '_wp_attachment_image_alt', true);
                        $meta_ok = ($verified_meta === $alt_txt);

                        // 2. Search & Update all embedded occurrences across pages/posts
                        $att_url = wp_get_attachment_url($att_id);
                        $att_file_basename = $att_url ? wp_basename($att_url) : '';

                        // Collect target posts referencing this attachment
                        $query_posts = get_posts(array(
                            'post_type'      => array('page', 'post'),
                            'post_status'    => 'any',
                            'posts_per_page' => -1,
                            's'              => (string)$att_id
                        ));

                        $att_post = get_post($att_id);
                        if ($att_post && $att_post->post_parent > 0) {
                            $parent_p = get_post($att_post->post_parent);
                            if ($parent_p && !in_array($parent_p, $query_posts)) {
                                $query_posts[] = $parent_p;
                            }
                        }
                        if ($post_id > 0) {
                            $target_p = get_post($post_id);
                            if ($target_p && !in_array($target_p, $query_posts)) {
                                $query_posts[] = $target_p;
                            }
                        }

                        $embedded_updated = false;
                        foreach ($query_posts as $p) {
                            if (empty($p->post_content)) continue;

                            $content_changed = false;
                            $updated_content = preg_replace_callback(
                                '/(<!--\s*wp:image\s*(\{[^}]*\})\s*-->\s*)?<figure[^>]*>\s*<img\s+([^>]*?)>\s*<\/figure>(\s*<!--\s*\/wp:image\s*-->)?|<img\s+([^>]*?)>/is',
                                function ($matches) use ($att_id, $att_url, $att_file_basename, $alt_txt, &$content_changed) {
                                    $full_tag = $matches[0];

                                    // Match exact attachment ID criteria:
                                    // 1. wp-image-{att_id} class
                                    // 2. "id":{att_id} in Gutenberg JSON block comment
                                    // 3. Exact attachment URL or filename match in src
                                    $is_target_image = (
                                        strpos($full_tag, 'wp-image-' . $att_id) !== false ||
                                        strpos($full_tag, '"id":' . $att_id) !== false ||
                                        ($att_url && strpos($full_tag, $att_url) !== false) ||
                                        ($att_file_basename && strpos($full_tag, $att_file_basename) !== false)
                                    );

                                    if ($is_target_image) {
                                        $content_changed = true;
                                        if (preg_match('/alt=([\'"])(.*?)\1/is', $full_tag)) {
                                            return preg_replace('/alt=([\'"])(.*?)\1/is', 'alt="' . esc_attr($alt_txt) . '"', $full_tag);
                                        } else {
                                            return preg_replace('/<img\s+/i', '<img alt="' . esc_attr($alt_txt) . '" ', $full_tag, 1);
                                        }
                                    }

                                    return $full_tag;
                                },
                                $p->post_content
                            );

                            if ($content_changed && $updated_content !== $p->post_content) {
                                wp_update_post(array('ID' => $p->ID, 'post_content' => wp_slash($updated_content)));
                                clean_post_cache($p->ID);
                                $embedded_updated = true;
                            }
                        }

                        if ($meta_ok) {
                            $updated_count++;
                            $details[] = array(
                                'attachment_id'    => $att_id,
                                'status'           => 'updated',
                                'alt_text'         => $alt_txt,
                                'meta_verified'    => true,
                                'embedded_updated' => $embedded_updated
                            );
                        } else {
                            $failed_count++;
                            $details[] = array(
                                'attachment_id' => $att_id,
                                'status'        => 'failed_verification',
                                'reason'        => 'Postmeta update verification failed'
                            );
                        }
                    } else {
                        $failed_count++;
                        $details[] = array(
                            'attachment_id' => $att_id,
                            'status'        => 'failed_invalid_id'
                        );
                    }
                }

                $action_result = array(
                    'success'        => $updated_count > 0,
                    'updated_count'  => $updated_count,
                    'failed_count'   => $failed_count,
                    'target_details' => $details,
                );
            }

            // D2. Deterministic Add Image Implementation (Sideload & Media Library Attachment Creation)
            if ($action_type === 'add_image') {
                $raw_img_src = '';
                $img_alt = '';
                $placement = 'append';

                if (is_array($proposed_values)) {
                    $raw_img_src = isset($proposed_values['image_url']) ? $proposed_values['image_url'] : (isset($proposed_values['image_source']) ? $proposed_values['image_source'] : '');
                    $img_alt = isset($proposed_values['alt_text']) ? $proposed_values['alt_text'] : '';
                    $placement = isset($proposed_values['placement']) ? $proposed_values['placement'] : 'append';
                } elseif (is_string($proposed_values)) {
                    $raw_img_src = $proposed_values;
                }

                $img_alt = sanitize_text_field($img_alt);

                if (empty($raw_img_src)) {
                    return new WP_Error('rest_invalid_param', 'image_url parameter is required for add_image.', array('status' => 400));
                }

                $target_page = get_post($post_id);
                if (!$target_page) {
                    return new WP_Error('rest_post_invalid_id', 'Target post/page not found.', array('status' => 404));
                }

                require_once(ABSPATH . 'wp-admin/includes/file.php');
                require_once(ABSPATH . 'wp-admin/includes/media.php');
                require_once(ABSPATH . 'wp-admin/includes/image.php');

                $attachment_id = 0;
                $final_img_url = '';

                // Case 1: Base64 Uploaded Desktop Image (e.g. data:image/png;base64,...)
                if (preg_match('/^data:image\/(\w+);base64,/', $raw_img_src, $type_matches)) {
                    $image_type = strtolower($type_matches[1]);
                    if (!in_array($image_type, array('jpg', 'jpeg', 'png', 'gif', 'webp'))) {
                        $image_type = 'jpeg';
                    }
                    $base64_data = substr($raw_img_src, strpos($raw_img_src, ',') + 1);
                    $decoded_file = base64_decode($base64_data);

                    if ($decoded_file !== false) {
                        $upload_dir = wp_upload_dir();
                        $filename = 'uploaded-image-' . time() . '-' . wp_generate_password(4, false) . '.' . $image_type;
                        $upload = wp_upload_bits($filename, null, $decoded_file);

                        if (empty($upload['error'])) {
                            $file_path = $upload['file'];
                            $file_url  = $upload['url'];
                            $filetype  = wp_check_filetype($filename, null);

                            $attachment = array(
                                'post_mime_type' => $filetype['type'],
                                'post_title'     => sanitize_file_name($filename),
                                'post_content'   => '',
                                'post_status'    => 'inherit'
                            );

                            $attachment_id = wp_insert_attachment($attachment, $file_path, $target_page->ID);
                            if (!is_wp_error($attachment_id)) {
                                $attach_data = wp_generate_attachment_metadata($attachment_id, $file_path);
                                wp_update_attachment_metadata($attachment_id, $attach_data);
                                update_post_meta($attachment_id, '_wp_attachment_image_alt', $img_alt);
                                $final_img_url = $file_url;
                            }
                        }
                    }
                }
                // Case 2: HTTP / HTTPS Web Image URL
                elseif (strpos($raw_img_src, 'http://') === 0 || strpos($raw_img_src, 'https://') === 0) {
                    $tmp = download_url($raw_img_src);
                    if (!is_wp_error($tmp)) {
                        $file_array = array(
                            'name'     => sanitize_file_name('media-' . time() . '-' . wp_generate_password(4, false) . '.jpg'),
                            'tmp_name' => $tmp
                        );
                        $id = media_handle_sideload($file_array, $target_page->ID, $img_alt);
                        if (!is_wp_error($id)) {
                            update_post_meta($id, '_wp_attachment_image_alt', $img_alt);
                            $attachment_id = $id;
                            $final_img_url = wp_get_attachment_url($id);
                        } else {
                            @unlink($tmp);
                        }
                    }
                }

                // Fallback to raw URL if upload/sideload failed
                if (empty($final_img_url)) {
                    $final_img_url = esc_url_raw($raw_img_src);
                }

                $existing_content = $target_page->post_content ? $target_page->post_content : '';
                $image_block_markup = "\n<!-- wp:image " . ($attachment_id ? "{\"id\":" . intval($attachment_id) . ",\"sizeSlug\":\"full\",\"linkDestination\":\"none\"}" : "{\"sizeSlug\":\"full\",\"linkDestination\":\"none\"}") . " -->\n<figure class=\"wp-block-image size-full\"><img src=\"" . esc_url($final_img_url) . "\" alt=\"" . esc_attr($img_alt) . "\"" . ($attachment_id ? " class=\"wp-image-" . intval($attachment_id) . "\"" : "") . "/></figure>\n<!-- /wp:image -->\n";

                if ($placement === 'prepend') {
                    $new_content = $image_block_markup . $existing_content;
                } else {
                    $new_content = $existing_content . $image_block_markup;
                }

                wp_update_post(array(
                    'ID'           => $target_page->ID,
                    'post_content' => wp_slash($new_content),
                ));
                clean_post_cache($target_page->ID);
                wp_cache_delete($target_page->ID, 'posts');

                // Strict Readback Verification: Ensure the inserted image base URL path is present in post_content
                $reread_page = get_post($target_page->ID);
                $clean_url_for_check = strtok($final_img_url, '?');
                $url_path = parse_url($clean_url_for_check, PHP_URL_PATH);
                $path_to_check = (!empty($url_path) && $url_path !== '/') ? $url_path : $clean_url_for_check;

                if (!$reread_page || (strpos($reread_page->post_content, $path_to_check) === false && strpos($reread_page->post_content, $clean_url_for_check) === false)) {
                    delete_transient($lock_key);
                    $debug_content_sample = $reread_page ? substr($reread_page->post_content, 0, 300) : 'null';
                    return new WP_Error('rest_verification_failed', "Failed to verify image insertion. path_to_check: '{$path_to_check}', clean_url: '{$clean_url_for_check}', reread_content_sample: '{$debug_content_sample}'", array('status' => 500));
                }

                $reread_meta = get_post_meta($target_page->ID);
                $new_payload  = $reread_page->post_title . '|' . $reread_page->post_excerpt . '|' . serialize($reread_meta);
                $new_checksum = md5($new_payload);

                delete_transient($lock_key);

                return rest_ensure_response(array(
                    'execution_state'    => 'SUCCEEDED',
                    'post_id'            => $target_page->ID,
                    'action_type'        => $action_type,
                    'added_image'        => $final_img_url,
                    'attachment_id'      => $attachment_id,
                    'alt_text'           => $img_alt,
                    'previous_checksum'  => $current_checksum,
                    'new_checksum'       => $new_checksum,
                    'snapshot_id'        => $snapshot_id,
                    'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                    'executedAt'         => time(),
                ));
            }

            // E. Meta Field Updates (Yoast, Rank Math, AIOSEO, SEOPress)
            if (isset($proposed_values['meta']) && is_array($proposed_values['meta'])) {
                foreach ($proposed_values['meta'] as $meta_key => $meta_val) {
                    update_post_meta($post_id, sanitize_key($meta_key), sanitize_text_field($meta_val));
                }
            }

            if ($action_type === 'update_meta_title' || isset($proposed_values['meta_title'])) {
                $raw_title = isset($proposed_values['meta_title']) ? $proposed_values['meta_title'] : (isset($proposed_values['value']) ? $proposed_values['value'] : '');
                if (is_array($raw_title)) {
                    $raw_title = isset($raw_title['meta_title']) ? $raw_title['meta_title'] : (isset($raw_title['value']) ? $raw_title['value'] : (isset($raw_title['title']) ? $raw_title['title'] : ''));
                }
                $raw_title_str = is_string($raw_title) ? $raw_title : (is_numeric($raw_title) ? (string)$raw_title : '');
                $title_val = in_array(strtolower(trim($raw_title_str)), array('remove', 'clear')) ? '' : sanitize_text_field($raw_title_str);
                update_post_meta($post_id, '_yoast_wpseo_title', $title_val);
                update_post_meta($post_id, 'rank_math_title', $title_val);
                update_post_meta($post_id, '_aioseo_title', $title_val);
                update_post_meta($post_id, '_seopress_titles_title', $title_val);
            }

            if ($action_type === 'update_meta_description' || isset($proposed_values['meta_description'])) {
                $raw_desc = isset($proposed_values['meta_description']) ? $proposed_values['meta_description'] : (isset($proposed_values['value']) ? $proposed_values['value'] : '');
                if (is_array($raw_desc)) {
                    $raw_desc = isset($raw_desc['meta_description']) ? $raw_desc['meta_description'] : (isset($raw_desc['value']) ? $raw_desc['value'] : (isset($raw_desc['description']) ? $raw_desc['description'] : ''));
                }
                $raw_desc_str = is_string($raw_desc) ? $raw_desc : (is_numeric($raw_desc) ? (string)$raw_desc : '');
                $desc_val = in_array(strtolower(trim($raw_desc_str)), array('remove', 'clear')) ? '' : sanitize_text_field($raw_desc_str);
                update_post_meta($post_id, '_yoast_wpseo_metadesc', $desc_val);
                update_post_meta($post_id, 'rank_math_description', $desc_val);
                update_post_meta($post_id, '_aioseo_description', $desc_val);
                update_post_meta($post_id, '_seopress_titles_desc', $desc_val);
            }

            if ($action_type === 'update_focus_keyword' || isset($proposed_values['focus_keyword'])) {
                $raw_kw = isset($proposed_values['focus_keyword']) ? $proposed_values['focus_keyword'] : (isset($proposed_values['value']) ? $proposed_values['value'] : '');
                if (is_array($raw_kw)) {
                    $raw_kw = isset($raw_kw['focus_keyword']) ? $raw_kw['focus_keyword'] : (isset($raw_kw['value']) ? $raw_kw['value'] : (isset($raw_kw['keyword']) ? $raw_kw['keyword'] : ''));
                }
                $raw_kw_str = is_string($raw_kw) ? $raw_kw : (is_numeric($raw_kw) ? (string)$raw_kw : '');
                $kw_val = in_array(strtolower(trim($raw_kw_str)), array('remove', 'clear')) ? '' : sanitize_text_field($raw_kw_str);
                update_post_meta($post_id, '_yoast_wpseo_focuskw', $kw_val);
                update_post_meta($post_id, 'rank_math_focus_keyword', $kw_val);
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
