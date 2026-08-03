<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(__FILE__) . '/class-wp-ai-auth.php';

class WP_AI_Health {
    public function register_routes() {
        register_rest_route('wp-ai/v1', '/health', array(
            'methods'             => 'GET',
            'callback'            => array($this, 'get_health'),
            'permission_callback' => '__return_true', // Public diagnostic probe
        ));
    }

    /**
     * Check if a specific plugin is currently active in WordPress
     */
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

    public function get_health(WP_REST_Request $request) {
        $yoast_active    = self::check_plugin_active('wordpress-seo/wp-seo.php');
        $rankmath_active = self::check_plugin_active('seo-by-rank-math/rank-math.php');
        $aioseo_active   = self::check_plugin_active('all-in-one-seo-pack/all_in_one_seo_pack.php');
        $seopress_active = self::check_plugin_active('wp-seopress/seopress.php');

        // Test Authorization Header presence across 5-level fallback hierarchy
        $auth_header = WP_AI_Auth::has_authorization_header();

        // Available Auth Methods
        $auth_methods = array('hmac_signature');
        if (function_exists('wp_is_application_passwords_available') && wp_is_application_passwords_available()) {
            $auth_methods[] = 'application_passwords';
        }
        if (self::check_plugin_active('jwt-authentication-for-wp-rest-api/jwt-auth.php')) {
            $auth_methods[] = 'jwt_bearer';
        }

        // Firewall Detection
        $firewalls = array();
        if (defined('WORDFENCE_VERSION') || self::check_plugin_active('wordfence/wordfence.php')) {
            $firewalls[] = 'Wordfence Security';
        }
        if (isset($_SERVER['HTTP_CF_RAY']) || isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            $firewalls[] = 'Cloudflare WAF';
        }
        if (defined('SUCURI_VERSION') || self::check_plugin_active('sucuri-scanner/sucuri.php')) {
            $firewalls[] = 'Sucuri Firewall';
        }
        if (isset($_SERVER['HTTP_MOD_SECURITY']) || isset($_SERVER['REDIRECT_HTTP_MOD_SECURITY'])) {
            $firewalls[] = 'ModSecurity';
        }
        $firewall_detected = !empty($firewalls) ? implode(', ', $firewalls) : null;

        // Filesystem Write Method
        if (!function_exists('get_filesystem_method')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }
        $filesystem_method = get_filesystem_method(array(), ABSPATH);

        // Required Capabilities Check
        $capabilities_pass = false;
        if (is_user_logged_in()) {
            $capabilities_pass = current_user_can('edit_posts') && current_user_can('edit_pages');
        } else {
            // Check if administrator role possesses required capabilities
            $admin_role = get_role('administrator');
            $capabilities_pass = $admin_role ? ($admin_role->has_cap('edit_posts') && $admin_role->has_cap('edit_pages')) : false;
        }

        // Test Harmless Database I/O
        $db_io_test = $this->test_database_io();

        $active_name = $yoast_active ? 'Yoast SEO' : ($rankmath_active ? 'Rank Math' : ($aioseo_active ? 'AIOSEO' : ($seopress_active ? 'SEOPress' : 'None / Custom')));
        $active_ver  = ($yoast_active && defined('WPSEO_VERSION')) ? WPSEO_VERSION : (($rankmath_active && defined('RANK_MATH_VERSION')) ? RANK_MATH_VERSION : (($aioseo_active && defined('AIOSEO_VERSION')) ? AIOSEO_VERSION : (($seopress_active && defined('SEOPRESS_VERSION')) ? SEOPRESS_VERSION : 'Core')));
        $support_lvl = ($yoast_active || $rankmath_active) ? 'verified' : ($aioseo_active ? 'compatible' : 'read_only');

        $seo_provider_info = array(
            'name'                => $active_name,
            'version'             => $active_ver,
            'adapterSupportLevel' => $support_lvl,
        );

        return rest_ensure_response(array(
            'connector_installed'     => true,
            'connector_version'       => WP_AI_CONNECTOR_VERSION,
            'wp_version'              => get_bloginfo('version'),
            'php_version'             => PHP_VERSION,
            'rest_availability'       => true,
            'https_status'            => is_ssl(),
            'auth_methods_available'  => $auth_methods,
            'auth_header_status'      => $auth_header,
            'app_password_status'     => function_exists('wp_is_application_passwords_available') && wp_is_application_passwords_available(),
            'multisite_status'        => is_multisite(),
            'firewall_detection'      => $firewall_detected,
            'filesystem_write_method' => $filesystem_method ? $filesystem_method : 'direct',
            'capabilities_status'     => $capabilities_pass,
            'database_io_test'        => $db_io_test,
            'seo_provider'            => $seo_provider_info,
            'active_theme'            => wp_get_theme()->get('Name'),
            'timestamp'               => time(),
        ));
    }

    /**
     * Perform a harmless database read/write test via WordPress options API
     */
    private function test_database_io() {
        $test_key = 'wp_ai_io_test_tmp';
        $test_val = 'test_' . time();
        
        $start_time = microtime(true);
        $write_pass = update_option($test_key, $test_val, false);
        $read_val   = get_option($test_key);
        $delete_pass= delete_option($test_key);
        $end_time   = microtime(true);

        $read_pass  = ($read_val === $test_val);
        $latency_ms = round(($end_time - $start_time) * 1000, 2);

        return array(
            'pass'       => ($write_pass || $read_pass) && $delete_pass,
            'read_pass'  => $read_pass,
            'delete_pass'=> $delete_pass,
            'latency_ms' => $latency_ms,
        );
    }
}
