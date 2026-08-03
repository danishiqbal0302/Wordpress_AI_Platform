<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(__FILE__) . '/audits/class-wp-ai-audit-engine.php';

class WP_AI_Inventory {
    public function register_routes() {
        register_rest_route('wp-ai/v1', '/inventory', array(
            'methods'             => 'GET',
            'callback'            => array($this, 'get_inventory'),
            'permission_callback' => array('WP_AI_Security', 'verify_request'),
        ));
    }

    private static function check_plugin_active($plugin_file) {
        if (!function_exists('is_plugin_active')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        $active_plugins = (array) get_option('active_plugins', array());
        if (in_array($plugin_file, $active_plugins, true)) {
            return true;
        }
        if (is_multisite() && function_exists('is_plugin_active_for_network')) {
            if (is_plugin_active_for_network($plugin_file)) {
                return true;
            }
        }
        return function_exists('is_plugin_active') ? is_plugin_active($plugin_file) : false;
    }

    public function get_inventory(WP_REST_Request $request) {
        if (!function_exists('is_plugin_active')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        // 1. Detect SEO Providers based strictly on active plugin status
        $yoast_is_active    = self::check_plugin_active('wordpress-seo/wp-seo.php');
        $rankmath_is_active = self::check_plugin_active('seo-by-rank-math/rank-math.php');
        $aioseo_is_active   = self::check_plugin_active('all-in-one-seo-pack/all_in_one_seo_pack.php');
        $seopress_is_active = self::check_plugin_active('wp-seopress/seopress.php');

        $seo_providers = array(
            'yoast' => array(
                'name'    => 'Yoast SEO',
                'active'  => $yoast_is_active,
                'version' => ($yoast_is_active && defined('WPSEO_VERSION')) ? WPSEO_VERSION : null,
            ),
            'rank_math' => array(
                'name'    => 'Rank Math',
                'active'  => $rankmath_is_active,
                'version' => ($rankmath_is_active && defined('RANK_MATH_VERSION')) ? RANK_MATH_VERSION : null,
            ),
            'aioseo' => array(
                'name'    => 'All in One SEO',
                'active'  => $aioseo_is_active,
                'version' => ($aioseo_is_active && defined('AIOSEO_VERSION')) ? AIOSEO_VERSION : null,
            ),
            'seopress' => array(
                'name'    => 'SEOPress',
                'active'  => $seopress_is_active,
                'version' => ($seopress_is_active && defined('SEOPRESS_VERSION')) ? SEOPRESS_VERSION : null,
            ),
        );

        $active_seo_provider_name = 'None / Core';
        foreach ($seo_providers as $sp) {
            if ($sp['active']) {
                $active_seo_provider_name = $sp['name'];
                break;
            }
        }

        // 2. Pages Inventory
        $pages_raw = get_pages(array(
            'number'      => 50,
            'post_status' => array('publish', 'draft', 'pending', 'private'),
        ));

        $pages = array();
        foreach ($pages_raw as $page) {
            $seo_meta   = $this->extract_seo_meta($page->ID);
            $word_count = $this->calculate_word_count($page->post_content);
            $title_len  = mb_strlen($page->post_title);

            $pages[] = array(
                'id'               => $page->ID,
                'title'            => $page->post_title,
                'slug'             => $page->post_name,
                'status'           => $page->post_status,
                'modified_gmt'     => $page->post_modified_gmt,
                'parent'           => $page->post_parent,
                'meta_description' => $seo_meta['meta_description'],
                'focus_keyword'    => $seo_meta['focus_keyword'],
                'word_count'       => $word_count,
                'title_length'     => $title_len,
                'has_blocks'       => function_exists('has_blocks') ? has_blocks($page->post_content) : false,
            );
        }

        // 3. Posts Inventory
        $posts_raw = get_posts(array(
            'numberposts' => 50,
            'post_status' => array('publish', 'draft', 'pending', 'private'),
        ));

        $posts = array();
        foreach ($posts_raw as $post) {
            $categories = wp_get_post_categories($post->ID, array('fields' => 'names'));
            $tags       = wp_get_post_tags($post->ID, array('fields' => 'names'));
            $seo_meta   = $this->extract_seo_meta($post->ID);
            $word_count = $this->calculate_word_count($post->post_content);
            $title_len  = mb_strlen($post->post_title);

            $posts[] = array(
                'id'               => $post->ID,
                'title'            => $post->post_title,
                'slug'             => $post->post_name,
                'status'           => $post->post_status,
                'modified_gmt'     => $post->post_modified_gmt,
                'categories'       => $categories,
                'tags'             => $tags,
                'meta_description' => $seo_meta['meta_description'],
                'focus_keyword'    => $seo_meta['focus_keyword'],
                'word_count'       => $word_count,
                'title_length'     => $title_len,
                'has_blocks'       => function_exists('has_blocks') ? has_blocks($post->post_content) : false,
            );
        }

        // 4. Media Inventory
        $media_query = new WP_Query(array(
            'post_type'      => 'attachment',
            'post_status'    => 'inherit',
            'posts_per_page' => 100,
        ));

        $total_media = $media_query->found_posts;
        $missing_alt_count = 0;
        $sample_media = array();

        foreach ($media_query->posts as $media) {
            $alt_text = get_post_meta($media->ID, '_wp_attachment_image_alt', true);
            if (empty($alt_text)) {
                $missing_alt_count++;
            }
            if (count($sample_media) < 10) {
                $sample_media[] = array(
                    'id'       => $media->ID,
                    'title'    => $media->post_title,
                    'url'      => wp_get_attachment_url($media->ID),
                    'alt_text' => $alt_text ? $alt_text : '',
                    'has_alt'  => !empty($alt_text),
                );
            }
        }

        // 5. Basic ACF Field Discovery
        $acf_info = array(
            'acf_active'   => class_exists('ACF') || function_exists('acf_get_field_groups'),
            'acf_version'  => defined('ACF_VERSION') ? ACF_VERSION : null,
            'field_groups' => array(),
        );

        if ($acf_info['acf_active'] && function_exists('acf_get_field_groups')) {
            $groups = acf_get_field_groups();
            foreach ($groups as $group) {
                $fields = function_exists('acf_get_fields') ? acf_get_fields($group['key']) : array();
                $field_list = array();
                if (is_array($fields)) {
                    foreach ($fields as $f) {
                        $field_list[] = array(
                            'key'  => isset($f['key']) ? $f['key'] : '',
                            'name' => isset($f['name']) ? $f['name'] : '',
                            'label'=> isset($f['label']) ? $f['label'] : '',
                            'type' => isset($f['type']) ? $f['type'] : 'text',
                        );
                    }
                }

                $acf_info['field_groups'][] = array(
                    'key'         => $group['key'],
                    'title'       => $group['title'],
                    'fields_count'=> count($field_list),
                    'fields'      => $field_list,
                );
            }
        }

        // 6. Gutenberg Block Parsing Sample
        $parsed_blocks_sample = array();
        if (function_exists('parse_blocks')) {
            $all_sample_posts = array_merge($pages_raw, $posts_raw);
            foreach ($all_sample_posts as $p) {
                if (!empty($p->post_content) && has_blocks($p->post_content)) {
                    $blocks = parse_blocks($p->post_content);
                    $block_names = array();
                    foreach ($blocks as $b) {
                        if (!empty($b['blockName'])) {
                            $block_names[] = $b['blockName'];
                        }
                    }
                    if (!empty($block_names)) {
                        $parsed_blocks_sample[] = array(
                            'post_id'     => $p->ID,
                            'post_title'  => $p->post_title,
                            'block_names' => array_unique($block_names),
                        );
                    }
                }
                if (count($parsed_blocks_sample) >= 5) {
                    break;
                }
            }
        }

        // 7. Assemble Inventory Context for Modular Audit Engine
        $inventory_context = array(
            'pages'           => $pages,
            'posts'           => $posts,
            'media_inventory' => array(
                'total_count'       => $total_media,
                'missing_alt_count' => $missing_alt_count,
                'sample_items'      => $sample_media,
            ),
            'acf'             => $acf_info,
            'blocks'          => $parsed_blocks_sample,
            'seo_provider'    => $active_seo_provider_name,
        );

        // 8. Run Modular Audit Engine
        $audit_engine = new WP_AI_Audit_Engine();
        $audit_report = $audit_engine->run_audit($inventory_context);

        // Generate recommendations from findings
        $recommendations = array();
        if (!empty($audit_report['findings'])) {
            foreach ($audit_report['findings'] as $f) {
                if (count($recommendations) < 5) {
                    $recommendations[] = $f['remediation'];
                }
            }
        }
        if (empty($recommendations)) {
            $recommendations[] = "Site content and metadata are compliant with all active audit rules. Continue routine monitoring.";
        }

        return rest_ensure_response(array(
            'site_health_score'   => $audit_report['overall_health_score'],
            'category_scores'     => $audit_report['category_scores'],
            'site_audit_summary'  => array(
                'total_items_checked'           => count($pages) + count($posts) + $total_media,
                'missing_meta_descriptions_count'=> count(array_filter($audit_report['findings'], function($f) { return $f['rule_id'] === 'SEO_001'; })),
                'missing_alt_texts_count'       => $missing_alt_count,
                'thin_content_count'            => count(array_filter($audit_report['findings'], function($f) { return $f['rule_id'] === 'CONTENT_001'; })),
                'title_length_warnings_count'   => count(array_filter($audit_report['findings'], function($f) { return $f['rule_id'] === 'SEO_002'; })),
                'seo_provider_detected'         => $active_seo_provider_name,
            ),
            'audit_report'           => $audit_report,
            'issues'                 => $audit_report['findings'],
            'recommendations'        => array_values(array_unique($recommendations)),
            'pages'                  => $pages,
            'posts'                  => $posts,
            'media_inventory'        => array(
                'total_count'        => $total_media,
                'missing_alt_count'  => $missing_alt_count,
                'sample_items'       => $sample_media,
            ),
            'basic_acf_discovery'    => $acf_info,
            'gutenberg_block_parsing'=> $parsed_blocks_sample,
            'seo_providers'          => $seo_providers,
            'timestamp'              => time(),
        ));
    }

    private function extract_seo_meta($post_id) {
        $meta_desc = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
        $focus_kw  = get_post_meta($post_id, '_yoast_wpseo_focuskw', true);

        if (empty($meta_desc)) {
            $meta_desc = get_post_meta($post_id, 'rank_math_description', true);
        }
        if (empty($focus_kw)) {
            $focus_kw = get_post_meta($post_id, 'rank_math_focus_keyword', true);
        }
        if (empty($meta_desc)) {
            $meta_desc = get_post_meta($post_id, '_aioseo_description', true);
        }
        if (empty($meta_desc)) {
            $meta_desc = get_post_meta($post_id, '_seopress_titles_desc', true);
        }
        if (empty($focus_kw)) {
            $focus_kw = get_post_meta($post_id, '_seopress_analysis_target_kw', true);
        }
        if (empty($meta_desc)) {
            $meta_desc = get_post_meta($post_id, '_meta_description', true);
        }

        return array(
            'meta_description' => $meta_desc ? sanitize_text_field($meta_desc) : '',
            'focus_keyword'    => $focus_kw ? sanitize_text_field($focus_kw) : '',
        );
    }

    private function calculate_word_count($post_content) {
        $clean = wp_strip_all_tags($post_content);
        if (empty(trim($clean))) {
            return 0;
        }
        return count(preg_split('/\s+/', trim($clean)));
    }
}
