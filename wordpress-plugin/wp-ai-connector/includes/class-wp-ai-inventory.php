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

        // 1. Detect SEO Providers
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
        $active_seo_plugins_list  = array();
        foreach ($seo_providers as $sp) {
            if ($sp['active']) {
                $active_seo_plugins_list[] = $sp['name'];
                if ($active_seo_provider_name === 'None / Core') {
                    $active_seo_provider_name = $sp['name'];
                }
            }
        }

        // 2. Pages Inventory with Parent/Child Hierarchy
        $pages_data = $this->get_pages_inventory($active_seo_provider_name);
        $pages           = $pages_data['pages'];
        $pages_raw       = $pages_data['pages_raw'];
        $pages_hierarchy = $pages_data['pages_hierarchy'];

        // 3. Posts Inventory with Taxonomies Detail
        $posts_data = $this->get_posts_inventory($active_seo_provider_name);
        $posts      = $posts_data['posts'];
        $posts_raw  = $posts_data['posts_raw'];

        // 4. Custom Post Types (CPTs) Discovery
        $custom_post_types = $this->get_custom_post_types_inventory();

        // 5. Taxonomies Inventory (Categories, Tags, Custom Taxonomies)
        $taxonomies_inventory = $this->get_taxonomies_inventory();

        // 6. Media Library Inventory
        $media_data = $this->get_media_inventory();
        $total_media       = $media_data['total_count'];
        $missing_alt_count = $media_data['missing_alt_count'];
        $sample_media      = $media_data['sample_items'];

        // 7. Navigation Menus Inventory
        $navigation_menus = $this->get_navigation_menus_inventory();

        // 8. Basic ACF Field Discovery
        $acf_info = $this->get_acf_inventory();

        // 9. Gutenberg Block Parsing & Content Analysis
        $parsed_blocks_sample = $this->get_gutenberg_and_classic_analysis(array_merge($pages_raw, $posts_raw));

        // 10. Active Theme Specs
        $active_theme_info = $this->get_theme_inventory();

        // 11. Active Plugins Relevant to Auditing
        $auditing_plugins = $this->get_auditing_plugins_inventory();

        // Site-level SEO configuration anomalies
        $logo_id = get_theme_mod('custom_logo');
        $logo_url = $logo_id ? wp_get_attachment_url($logo_id) : '';
        $site_settings = array(
            'blog_public'              => intval(get_option('blog_public', 1)),
            'active_seo_provider'      => $active_seo_provider_name,
            'active_seo_plugins'       => $active_seo_plugins_list,
            'active_seo_plugins_count' => count($active_seo_plugins_list),
            'show_on_front'            => get_option('show_on_front', 'posts'),
            'page_on_front'            => intval(get_option('page_on_front', 0)),
            'custom_logo_id'           => intval($logo_id),
            'custom_logo_url'          => $logo_url,
            'test_sync'                => 'hello',
        );

        // Assemble Inventory Context for Modular Audit Engine
        $inventory_context = array(
            'pages'             => $pages,
            'posts'             => $posts,
            'custom_post_types' => $custom_post_types,
            'taxonomies'        => $taxonomies_inventory,
            'media_inventory'   => array(
                'total_count'       => $total_media,
                'missing_alt_count' => $missing_alt_count,
                'sample_items'      => $sample_media,
            ),
            'navigation_menus'  => $navigation_menus,
            'acf'               => $acf_info,
            'blocks'            => $parsed_blocks_sample,
            'seo_provider'      => $active_seo_provider_name,
            'active_theme'      => $active_theme_info,
            'auditing_plugins'  => $auditing_plugins,
            'site_settings'     => $site_settings,
        );

        // Run Modular Audit Engine
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
                'total_items_checked'            => count($pages) + count($posts) + $total_media,
                'missing_meta_descriptions_count' => count(array_filter($audit_report['findings'], function($f) { return $f['rule_id'] === 'SEO_001'; })),
                'missing_alt_texts_count'        => $missing_alt_count,
                'thin_content_count'             => count(array_filter($audit_report['findings'], function($f) { return $f['rule_id'] === 'CONTENT_001'; })),
                'title_length_warnings_count'    => count(array_filter($audit_report['findings'], function($f) { return $f['rule_id'] === 'SEO_002'; })),
                'seo_provider_detected'          => $active_seo_provider_name,
            ),
            'audit_report'            => $audit_report,
            'issues'                  => $audit_report['findings'],
            'recommendations'         => array_values(array_unique($recommendations)),
            'pages'                   => $pages,
            'pages_hierarchy'         => $pages_hierarchy,
            'posts'                   => $posts,
            'custom_post_types'       => $custom_post_types,
            'taxonomies'              => $taxonomies_inventory,
            'media_inventory'         => array(
                'total_count'        => $total_media,
                'missing_alt_count'  => $missing_alt_count,
                'sample_items'       => $sample_media,
            ),
            'navigation_menus'        => $navigation_menus,
            'basic_acf_discovery'     => $acf_info,
            'gutenberg_block_parsing' => $parsed_blocks_sample,
            'seo_providers'           => $seo_providers,
            'active_theme'            => $active_theme_info,
            'active_plugins_auditing' => $auditing_plugins,
            'site_settings'           => $site_settings,
            'timestamp'               => time(),
        ));
    }

    /**
     * Get Pages Inventory with parent/child hierarchy details
     */
    private function get_pages_inventory($active_provider = 'None / Core') {
        $pages_raw = get_pages(array(
            'number'      => 50,
            'post_status' => array('publish', 'draft', 'pending', 'private'),
        ));

        $pages           = array();
        $pages_hierarchy = array();

        foreach ($pages_raw as $page) {
            $seo_meta   = $this->extract_seo_meta($page->ID, $active_provider);
            $content_struct = $this->extract_content_structure($page->post_content);
            $word_count = $this->calculate_word_count($page->post_content);
            $title_len  = mb_strlen($page->post_title);
            $ancestors  = get_post_ancestors($page->ID);

            $child_pages = get_children(array(
                'post_parent' => $page->ID,
                'post_type'   => 'page',
                'fields'      => 'ids',
            ));

            $editor_type = $this->detect_editor_type($page->ID, $page->post_content);

            $page_item = array_merge(array(
                'id'                => $page->ID,
                'title'             => $page->post_title,
                'slug'              => $page->post_name,
                'status'            => $page->post_status,
                'modified_gmt'      => $page->post_modified_gmt,
                'parent'            => $page->post_parent,
                'ancestors'         => $ancestors ? $ancestors : array(),
                'depth'             => count($ancestors),
                'children'          => array_values($child_pages),
                'word_count'        => $word_count,
                'title_length'      => $title_len,
                'editor_type'       => $editor_type,
                'raw_content'       => $page->post_content,
                'content_structure' => $content_struct,
            ), $seo_meta);

            $pages[] = $page_item;

            // Hierarchy node
            if ($page->post_parent == 0) {
                $pages_hierarchy[] = array(
                    'id'          => $page->ID,
                    'title'       => $page->post_title,
                    'slug'        => $page->post_name,
                    'child_ids'   => array_values($child_pages),
                    'child_count' => count($child_pages),
                );
            }
        }

        return array(
            'pages'           => $pages,
            'pages_raw'       => $pages_raw,
            'pages_hierarchy' => $pages_hierarchy,
        );
    }

    /**
     * Helper to detect editor type for post/page
     */
    private function detect_editor_type($post_id, $post_content) {
        $edit_mode = get_post_meta($post_id, '_elementor_edit_mode', true);
        $elem_data = get_post_meta($post_id, '_elementor_data', true);
        if ($edit_mode === 'builder' || (!empty($elem_data) && is_string($elem_data) && strlen($elem_data) > 5)) {
            return 'elementor';
        }
        if (function_exists('has_blocks') && has_blocks($post_content)) {
            return 'gutenberg';
        }
        return 'classic';
    }

    /**
     * Get Posts Inventory with taxonomies details
     */
    private function get_posts_inventory($active_provider = 'None / Core') {
        $posts_raw = get_posts(array(
            'numberposts' => 50,
            'post_status' => array('publish', 'draft', 'pending', 'private'),
        ));

        $posts = array();
        foreach ($posts_raw as $post) {
            $categories_names = wp_get_post_categories($post->ID, array('fields' => 'names'));
            $tags_names       = wp_get_post_tags($post->ID, array('fields' => 'names'));

            $categories_obj = wp_get_post_categories($post->ID, array('fields' => 'all'));
            $tags_obj       = wp_get_post_tags($post->ID, array('fields' => 'all'));

            $categories_detail = array();
            if (is_array($categories_obj)) {
                foreach ($categories_obj as $c) {
                    $categories_detail[] = array(
                        'id'    => $c->term_id,
                        'name'  => $c->name,
                        'slug'  => $c->slug,
                        'count' => $c->count,
                    );
                }
            }

            $tags_detail = array();
            if (is_array($tags_obj)) {
                foreach ($tags_obj as $t) {
                    $tags_detail[] = array(
                        'id'    => $t->term_id,
                        'name'  => $t->name,
                        'slug'  => $t->slug,
                        'count' => $t->count,
                    );
                }
            }

            $seo_meta       = $this->extract_seo_meta($post->ID, $active_provider);
            $content_struct = $this->extract_content_structure($post->post_content);
            $word_count     = $this->calculate_word_count($post->post_content);
            $title_len      = mb_strlen($post->post_title);

            $post_item = array_merge(array(
                'id'                => $post->ID,
                'title'             => $post->post_title,
                'slug'              => $post->post_name,
                'status'            => $post->post_status,
                'modified_gmt'      => $post->post_modified_gmt,
                'categories'        => $categories_names,
                'tags'              => $tags_names,
                'categories_detail' => $categories_detail,
                'tags_detail'       => $tags_detail,
                'word_count'        => $word_count,
                'title_length'      => $title_len,
                'content_structure' => $content_struct,
            ), $seo_meta);

            $posts[] = $post_item;
        }

        return array(
            'posts'     => $posts,
            'posts_raw' => $posts_raw,
        );
    }

    /**
     * Discover Supported Custom Post Types (CPTs) and items
     */
    private function get_custom_post_types_inventory() {
        $cpt_objects = get_post_types(array(
            'public'   => true,
            '_builtin' => false,
        ), 'objects');

        $custom_post_types = array();
        foreach ($cpt_objects as $cpt_name => $cpt_obj) {
            $cpt_posts_raw = get_posts(array(
                'post_type'   => $cpt_name,
                'numberposts' => 50,
                'post_status' => array('publish', 'draft', 'pending', 'private'),
            ));

            $cpt_items = array();
            foreach ($cpt_posts_raw as $p) {
                $seo_meta       = $this->extract_seo_meta($p->ID);
                $content_struct = $this->extract_content_structure($p->post_content);
                $word_count     = $this->calculate_word_count($p->post_content);

                $cpt_item = array_merge(array(
                    'id'                => $p->ID,
                    'title'             => $p->post_title,
                    'slug'              => $p->post_name,
                    'status'            => $p->post_status,
                    'post_type'         => $cpt_name,
                    'modified_gmt'      => $p->post_modified_gmt,
                    'word_count'        => $word_count,
                    'content_structure' => $content_struct,
                ), $seo_meta);

                $cpt_items[] = $cpt_item;
            }

            $taxonomies = get_object_taxonomies($cpt_name, 'names');

            $custom_post_types[] = array(
                'name'         => $cpt_name,
                'label'        => $cpt_obj->label ? $cpt_obj->label : $cpt_name,
                'singular_name'=> isset($cpt_obj->labels->singular_name) ? $cpt_obj->labels->singular_name : $cpt_name,
                'has_archive'  => (bool)$cpt_obj->has_archive,
                'hierarchical' => (bool)$cpt_obj->hierarchical,
                'taxonomies'   => array_values($taxonomies),
                'total_count'  => count($cpt_items),
                'items'        => $cpt_items,
            );
        }

        return $custom_post_types;
    }

    /**
     * Discover Taxonomies (Categories, Tags, Custom Taxonomies)
     */
    private function get_taxonomies_inventory() {
        $cats_raw = get_categories(array('hide_empty' => false));
        $categories_inv = array();
        if (is_array($cats_raw)) {
            foreach ($cats_raw as $c) {
                $categories_inv[] = array(
                    'id'          => $c->term_id,
                    'name'        => $c->name,
                    'slug'        => $c->slug,
                    'description' => $c->description,
                    'parent'      => $c->parent,
                    'count'       => $c->count,
                );
            }
        }

        $tags_raw = get_tags(array('hide_empty' => false));
        $tags_inv = array();
        if (is_array($tags_raw)) {
            foreach ($tags_raw as $t) {
                $tags_inv[] = array(
                    'id'          => $t->term_id,
                    'name'        => $t->name,
                    'slug'        => $t->slug,
                    'description' => $t->description,
                    'count'       => $t->count,
                );
            }
        }

        $custom_tax_objs = get_taxonomies(array(
            'public'   => true,
            '_builtin' => false,
        ), 'objects');

        $custom_tax_inv = array();
        foreach ($custom_tax_objs as $tax_name => $tax_obj) {
            $terms = get_terms(array(
                'taxonomy'   => $tax_name,
                'hide_empty' => false,
            ));
            $term_list = array();
            if (is_array($terms) && !is_wp_error($terms)) {
                foreach ($terms as $term) {
                    $term_list[] = array(
                        'id'    => $term->term_id,
                        'name'  => $term->name,
                        'slug'  => $term->slug,
                        'count' => $term->count,
                    );
                }
            }

            $custom_tax_inv[] = array(
                'name'         => $tax_name,
                'label'        => $tax_obj->label ? $tax_obj->label : $tax_name,
                'object_type'  => array_values($tax_obj->object_type),
                'hierarchical' => (bool)$tax_obj->hierarchical,
                'terms_count'  => count($term_list),
                'terms'        => $term_list,
            );
        }

        return array(
            'categories'        => $categories_inv,
            'tags'              => $tags_inv,
            'custom_taxonomies' => $custom_tax_inv,
        );
    }

    /**
     * Discover Media Library Inventory
     */
    private function get_media_inventory() {
        $media_query = new WP_Query(array(
            'post_type'      => 'attachment',
            'post_mime_type' => 'image',
            'post_status'    => 'inherit',
            'posts_per_page' => 200,
        ));

        $total_media       = $media_query->found_posts;
        $missing_alt_count = 0;
        $sample_media      = array();

        foreach ($media_query->posts as $media) {
            $alt_text = get_post_meta($media->ID, '_wp_attachment_image_alt', true);
            $is_empty_alt = empty($alt_text) || trim($alt_text) === '';

            if ($is_empty_alt) {
                $missing_alt_count++;
            }

            $meta_data = wp_get_attachment_metadata($media->ID);
            $mime      = get_post_mime_type($media->ID);
            $url       = wp_get_attachment_url($media->ID);
            $file_path = get_attached_file($media->ID);
            $filesize  = ($file_path && file_exists($file_path)) ? filesize($file_path) : null;

            $parent_title = '';
            if ($media->post_parent > 0) {
                $parent_post = get_post($media->post_parent);
                if ($parent_post) {
                    $parent_title = $parent_post->post_title;
                }
            }

            // Include missing alt text items as priority, and up to 100 sample items
            if ($is_empty_alt || count($sample_media) < 100) {
                $sample_media[] = array(
                    'id'                => $media->ID,
                    'title'             => !empty($media->post_title) ? $media->post_title : 'Attachment #' . $media->ID,
                    'url'               => $url ? $url : '',
                    'mime_type'         => $mime ? $mime : '',
                    'filesize'          => $filesize,
                    'width'             => isset($meta_data['width']) ? $meta_data['width'] : null,
                    'height'            => isset($meta_data['height']) ? $meta_data['height'] : null,
                    'alt_text'          => $alt_text ? $alt_text : '',
                    'has_alt'           => !$is_empty_alt,
                    'parent_post_id'    => $media->post_parent,
                    'parent_post_title' => $parent_title,
                    'caption'           => $media->post_excerpt,
                    'description'       => $media->post_content,
                );
            }
        }

        return array(
            'total_count'       => $total_media,
            'missing_alt_count' => $missing_alt_count,
            'sample_items'      => $sample_media,
        );
    }

    /**
     * Discover Navigation Menus and Menu Items
     */
    private function get_navigation_menus_inventory() {
        $nav_menus = wp_get_nav_menus();
        $locations = get_nav_menu_locations();

        $menus_data = array();
        if (is_array($nav_menus)) {
            foreach ($nav_menus as $menu) {
                $assigned_locations = array();
                foreach ($locations as $loc_name => $menu_id) {
                    if ($menu_id == $menu->term_id) {
                        $assigned_locations[] = $loc_name;
                    }
                }

                $items_raw = wp_get_nav_menu_items($menu->term_id);
                $menu_items = array();

                if (is_array($items_raw)) {
                    foreach ($items_raw as $item) {
                        $menu_items[] = array(
                            'id'          => $item->ID,
                            'title'       => $item->title,
                            'url'         => $item->url,
                            'target'      => $item->target,
                            'parent_id'   => intval($item->menu_item_parent),
                            'object_type' => $item->object,
                            'object_id'   => intval($item->object_id),
                        );
                    }
                }

                $menus_data[] = array(
                    'id'                 => $menu->term_id,
                    'name'               => $menu->name,
                    'slug'               => $menu->slug,
                    'count'              => $menu->count,
                    'assigned_locations' => $assigned_locations,
                    'items_count'        => count($menu_items),
                    'items'              => $menu_items,
                );
            }
        }

        return array(
            'registered_locations' => array_keys($locations),
            'menus_count'          => count($menus_data),
            'menus'                => $menus_data,
        );
    }

    /**
     * Discover Advanced Custom Fields (ACF) Groups and Fields
     */
    private function get_acf_inventory() {
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
                            'key'      => isset($f['key']) ? $f['key'] : '',
                            'name'     => isset($f['name']) ? $f['name'] : '',
                            'label'    => isset($f['label']) ? $f['label'] : '',
                            'type'     => isset($f['type']) ? $f['type'] : 'text',
                            'required' => isset($f['required']) ? (bool)$f['required'] : false,
                        );
                    }
                }

                $acf_info['field_groups'][] = array(
                    'key'         => $group['key'],
                    'title'       => $group['title'],
                    'location'    => isset($group['location']) ? $group['location'] : array(),
                    'fields_count'=> count($field_list),
                    'fields'      => $field_list,
                );
            }
        }

        return $acf_info;
    }

    /**
     * Gutenberg Block Parsing & Classic Content Breakdown Analysis
     */
    private function get_gutenberg_and_classic_analysis(array $all_sample_posts) {
        $parsed_blocks_sample = array();
        foreach ($all_sample_posts as $p) {
            if (!empty($p->post_content)) {
                $struct = $this->extract_content_structure($p->post_content);

                $parsed_blocks_sample[] = array(
                    'post_id'         => $p->ID,
                    'post_title'      => $p->post_title,
                    'has_blocks'      => $struct['has_blocks'],
                    'heading_levels'  => $struct['heading_levels'],
                    'paragraph_count' => $struct['paragraph_count'],
                    'h1_count'        => $struct['h1_count'],
                    'has_h1'          => ($struct['h1_count'] > 0),
                );
            }

            if (count($parsed_blocks_sample) >= 10) {
                break;
            }
        }

        return $parsed_blocks_sample;
    }

    /**
     * Parse Gutenberg blocks AND Classic HTML content structure
     */
    private function extract_content_structure($post_content) {
        $has_blocks_flag = function_exists('has_blocks') ? has_blocks($post_content) : false;
        $heading_levels  = array();
        $heading_list    = array();
        $paragraph_count = 0;

        if ($has_blocks_flag && function_exists('parse_blocks')) {
            $blocks = parse_blocks($post_content);
            foreach ($blocks as $b) {
                if (!empty($b['blockName']) && $b['blockName'] === 'core/paragraph') {
                    $paragraph_count++;
                }
            }
        }

        // Extract all HTML headings (H1-H6)
        $h1_count = 0;
        preg_match_all('/<h([1-6])[^>]*>(.*?)<\/h\1>/is', $post_content, $html_headings, PREG_SET_ORDER);
        if (!empty($html_headings)) {
            foreach ($html_headings as $match) {
                $lvl = intval($match[1]);
                $txt = wp_strip_all_tags($match[2]);
                $h_tag = 'H' . $lvl;
                if (!in_array($h_tag, $heading_levels, true)) {
                    $heading_levels[] = $h_tag;
                }
                $heading_list[] = array('level' => $lvl, 'text' => $txt);
                if ($lvl === 1) {
                    $h1_count++;
                }
            }
        }

        // Paragraph count fallback for classic content
        if ($paragraph_count === 0 && !empty(trim($post_content))) {
            preg_match_all('/<p[^>]*>/i', $post_content, $p_matches);
            $paragraph_count = !empty($p_matches[0]) ? count($p_matches[0]) : (empty(trim(wp_strip_all_tags($post_content))) ? 0 : 1);
        }

        // Check if content starts with heading/media before lead intro paragraph
        $clean_trimmed = trim($post_content);
        $starts_with_heading = (bool)preg_match('/^\s*<h[1-6]/i', $clean_trimmed) || (bool)preg_match('/^\s*<!--\s*wp:heading/i', $clean_trimmed);

        return array(
            'has_blocks'          => $has_blocks_flag,
            'heading_levels'      => array_values(array_unique($heading_levels)),
            'heading_list'        => $heading_list,
            'h1_count'            => $h1_count,
            'paragraph_count'     => $paragraph_count,
            'starts_with_heading' => $starts_with_heading,
            'raw_content_length'  => strlen($clean_trimmed),
        );
    }

    /**
     * Active Theme Specifications & Supported Features
     */
    private function get_theme_inventory() {
        $theme = wp_get_theme();
        $parent = $theme->parent();

        return array(
            'name'           => $theme->get('Name'),
            'stylesheet'     => $theme->get_stylesheet(),
            'version'        => $theme->get('Version'),
            'author'         => $theme->get('Author'),
            'is_child_theme' => !empty($parent),
            'parent_theme'   => $parent ? $parent->get('Name') : null,
            'is_block_theme' => (function_exists('wp_is_block_theme') && wp_is_block_theme()),
            'theme_supports' => array(
                'responsive_embeds' => current_theme_supports('responsive-embeds'),
                'align_wide'        => current_theme_supports('align-wide'),
                'menus'             => current_theme_supports('menus'),
                'post_thumbnails'   => current_theme_supports('post-thumbnails'),
                'custom_logo'       => current_theme_supports('custom-logo'),
                'widgets'           => current_theme_supports('widgets'),
            ),
        );
    }

    /**
     * Active Plugins Relevant to SEO, Performance, Caching, Security, Builders
     */
    private function get_auditing_plugins_inventory() {
        $plugins_map = array(
            'wordpress-seo/wp-seo.php'                => array('name' => 'Yoast SEO', 'category' => 'seo'),
            'seo-by-rank-math/rank-math.php'          => array('name' => 'Rank Math', 'category' => 'seo'),
            'all-in-one-seo-pack/all_in_one_seo_pack.php'=> array('name' => 'All in One SEO', 'category' => 'seo'),
            'wp-seopress/seopress.php'                => array('name' => 'SEOPress', 'category' => 'seo'),
            'elementor/elementor.php'                 => array('name' => 'Elementor', 'category' => 'page_builder'),
            'js_composer/js_composer.php'             => array('name' => 'WPBakery Page Builder', 'category' => 'page_builder'),
            'beaver-builder-lite-version/fl-builder.php' => array('name' => 'Beaver Builder', 'category' => 'page_builder'),
            'wp-rocket/wp-rocket.php'                 => array('name' => 'WP Rocket', 'category' => 'caching'),
            'w3-total-cache/w3-total-cache.php'       => array('name' => 'W3 Total Cache', 'category' => 'caching'),
            'litespeed-cache/litespeed-cache.php'     => array('name' => 'LiteSpeed Cache', 'category' => 'caching'),
            'autoptimize/autoptimize.php'             => array('name' => 'Autoptimize', 'category' => 'caching'),
            'wordfence/wordfence.php'                 => array('name' => 'Wordfence Security', 'category' => 'security'),
            'better-wp-security/better-wp-security.php'=> array('name' => 'iThemes Security', 'category' => 'security'),
            'sucuri-scanner/sucuri.php'               => array('name' => 'Sucuri Security', 'category' => 'security'),
            'woocommerce/woocommerce.php'             => array('name' => 'WooCommerce', 'category' => 'ecommerce'),
            'contact-form-7/wp-contact-form-7.php'    => array('name' => 'Contact Form 7', 'category' => 'forms'),
            'wpforms-lite/wpforms.php'                => array('name' => 'WPForms', 'category' => 'forms'),
            'gravityforms/gravityforms.php'           => array('name' => 'Gravity Forms', 'category' => 'forms'),
            'advanced-custom-fields/acf.php'          => array('name' => 'Advanced Custom Fields', 'category' => 'fields'),
            'advanced-custom-fields-pro/acf.php'      => array('name' => 'ACF Pro', 'category' => 'fields'),
        );

        $auditing_plugins = array();
        foreach ($plugins_map as $plugin_file => $info) {
            $is_active = self::check_plugin_active($plugin_file);
            if ($is_active) {
                $auditing_plugins[] = array(
                    'plugin_file' => $plugin_file,
                    'name'        => $info['name'],
                    'category'    => $info['category'],
                    'active'      => true,
                );
            }
        }

        return $auditing_plugins;
    }

    /**
     * Extract SEO meta tags, title, canonical, OpenGraph, Twitter, and indexability flags
     */
    private function extract_seo_meta($post_id, $active_provider = 'None / Core') {
        $meta_desc   = '';
        $focus_kw    = '';
        $seo_title   = '';
        $canonical   = '';
        $og_title    = '';
        $og_desc     = '';
        $og_img      = '';
        $tw_title    = '';
        $tw_desc     = '';
        $tw_img      = '';
        $noindex_val = '';
        $nofollow_val= '';

        switch ($active_provider) {
            case 'Yoast SEO':
                $meta_desc    = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
                $focus_kw     = get_post_meta($post_id, '_yoast_wpseo_focuskw', true);
                $seo_title    = get_post_meta($post_id, '_yoast_wpseo_title', true);
                $canonical    = get_post_meta($post_id, '_yoast_wpseo_canonical', true);
                $og_title     = get_post_meta($post_id, '_yoast_wpseo_opengraph-title', true);
                $og_desc      = get_post_meta($post_id, '_yoast_wpseo_opengraph-description', true);
                $og_img       = get_post_meta($post_id, '_yoast_wpseo_opengraph-image', true);
                $tw_title     = get_post_meta($post_id, '_yoast_wpseo_twitter-title', true);
                $tw_desc      = get_post_meta($post_id, '_yoast_wpseo_twitter-description', true);
                $tw_img       = get_post_meta($post_id, '_yoast_wpseo_twitter-image', true);
                $noindex_val  = get_post_meta($post_id, '_yoast_wpseo_meta-robots-noindex', true);
                $nofollow_val = get_post_meta($post_id, '_yoast_wpseo_meta-robots-nofollow', true);
                break;

            case 'Rank Math':
                $meta_desc    = get_post_meta($post_id, 'rank_math_description', true);
                $focus_kw     = get_post_meta($post_id, 'rank_math_focus_keyword', true);
                $seo_title    = get_post_meta($post_id, 'rank_math_title', true);
                $canonical    = get_post_meta($post_id, 'rank_math_canonical', true);
                $og_title     = get_post_meta($post_id, 'rank_math_facebook_title', true);
                $og_desc      = get_post_meta($post_id, 'rank_math_facebook_description', true);
                $og_img       = get_post_meta($post_id, 'rank_math_facebook_image', true);
                $tw_title     = get_post_meta($post_id, 'rank_math_twitter_title', true);
                $tw_desc      = get_post_meta($post_id, 'rank_math_twitter_description', true);
                $tw_img       = get_post_meta($post_id, 'rank_math_twitter_image', true);
                $robots_rm    = get_post_meta($post_id, 'rank_math_robots', true);
                if (is_array($robots_rm)) {
                    if (in_array('noindex', $robots_rm, true))  { $noindex_val = '1'; }
                    if (in_array('nofollow', $robots_rm, true)) { $nofollow_val = '1'; }
                }
                break;

            case 'All in One SEO':
                $meta_desc = get_post_meta($post_id, '_aioseo_description', true);
                $seo_title = get_post_meta($post_id, '_aioseo_title', true);
                $canonical = get_post_meta($post_id, '_aioseo_canonical_url', true);
                break;

            case 'SEOPress':
                $meta_desc = get_post_meta($post_id, '_seopress_titles_desc', true);
                $focus_kw  = get_post_meta($post_id, '_seopress_analysis_target_kw', true);
                $seo_title = get_post_meta($post_id, '_seopress_titles_title', true);
                $canonical = get_post_meta($post_id, '_seopress_robots_canonical', true);
                break;

            default:
                // General fallback across providers if no specific provider is active
                $meta_desc = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
                $focus_kw  = get_post_meta($post_id, '_yoast_wpseo_focuskw', true);
                $seo_title = get_post_meta($post_id, '_yoast_wpseo_title', true);
                $canonical = get_post_meta($post_id, '_yoast_wpseo_canonical', true);

                if (empty($meta_desc)) { $meta_desc = get_post_meta($post_id, 'rank_math_description', true); }
                if (empty($focus_kw))  { $focus_kw  = get_post_meta($post_id, 'rank_math_focus_keyword', true); }
                if (empty($seo_title)) { $seo_title = get_post_meta($post_id, 'rank_math_title', true); }
                if (empty($canonical)) { $canonical = get_post_meta($post_id, 'rank_math_canonical', true); }

                if (empty($meta_desc)) { $meta_desc = get_post_meta($post_id, '_aioseo_description', true); }
                if (empty($seo_title)) { $seo_title = get_post_meta($post_id, '_aioseo_title', true); }

                if (empty($meta_desc)) { $meta_desc = get_post_meta($post_id, '_seopress_titles_desc', true); }
                if (empty($focus_kw))  { $focus_kw  = get_post_meta($post_id, '_seopress_analysis_target_kw', true); }

                if (empty($meta_desc)) { $meta_desc = get_post_meta($post_id, '_meta_description', true); }
                break;
        }

        return array(
            'seo_title'           => $seo_title ? sanitize_text_field($seo_title) : '',
            'meta_description'    => $meta_desc ? sanitize_text_field($meta_desc) : '',
            'focus_keyword'       => $focus_kw ? sanitize_text_field($focus_kw) : '',
            'canonical_url'       => $canonical ? esc_url_raw($canonical) : get_permalink($post_id),
            'og_title'            => $og_title ? sanitize_text_field($og_title) : '',
            'og_description'      => $og_desc ? sanitize_text_field($og_desc) : '',
            'og_image'            => $og_img ? esc_url_raw($og_img) : '',
            'twitter_title'       => $tw_title ? sanitize_text_field($tw_title) : '',
            'twitter_description' => $tw_desc ? sanitize_text_field($tw_desc) : '',
            'twitter_image'       => $tw_img ? esc_url_raw($tw_img) : '',
            'is_noindex'          => ($noindex_val === '1' || $noindex_val === 'yes' || $noindex_val === 'noindex'),
            'is_nofollow'         => ($nofollow_val === '1' || $nofollow_val === 'yes' || $nofollow_val === 'nofollow'),
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
