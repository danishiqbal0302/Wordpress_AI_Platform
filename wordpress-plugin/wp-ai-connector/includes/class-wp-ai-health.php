<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Health {
    public function register_routes() {
        register_rest_route('wp-ai/v1', '/health', array(
            'methods'             => 'GET',
            'callback'            => array($this, 'get_health'),
            'permission_callback' => '__return_true', // Unauthenticated diagnostic probe
        ));
    }

    public function get_health(WP_REST_Request $request) {
        $yoast_active = is_plugin_active('wordpress-seo/wp-seo.php') || defined('WPSEO_VERSION');
        $rankmath_active = is_plugin_active('seo-by-rank-math/rank-math.php') || defined('RANK_MATH_VERSION');

        $seo_provider = array(
            'name'                 => $yoast_active ? 'Yoast SEO' : ($rankmath_active ? 'Rank Math SEO' : 'WordPress Core'),
            'version'              => defined('WPSEO_VERSION') ? WPSEO_VERSION : (defined('RANK_MATH_VERSION') ? RANK_MATH_VERSION : 'Core'),
            'adapterSupportLevel'  => ($yoast_active || $rankmath_active) ? 'verified' : 'core_fallback',
        );

        return rest_ensure_response(array(
            'status'            => 'healthy',
            'connectorVersion'  => WP_AI_CONNECTOR_VERSION,
            'wordpressVersion'  => get_bloginfo('version'),
            'phpVersion'        => PHP_VERSION,
            'sslStatus'         => is_ssl(),
            'restReachable'     => true,
            'activeTheme'       => wp_get_theme()->get('Name'),
            'seoProvider'       => $seo_provider,
            'timestamp'         => time(),
        ));
    }
}
