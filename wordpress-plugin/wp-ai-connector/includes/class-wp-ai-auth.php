<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Auth {
    /**
     * Resolve Authorization Header/Token across 5 fallback layers:
     * 1. $_SERVER['HTTP_AUTHORIZATION']
     * 2. $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
     * 3. $_SERVER['HTTP_X_WP_AI_AUTHORIZATION']
     * 4. $_SERVER['HTTP_X_WP_AI_TOKEN']
     * 5. $_GET['wp_ai_token']
     *
     * @return string|false
     */
    public static function get_authorization_token() {
        // 1. Standard HTTP Authorization
        if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
            return trim($_SERVER['HTTP_AUTHORIZATION']);
        }
        // 2. Redirected HTTP Authorization (Apache mod_rewrite)
        if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            return trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
        }
        // 3. Custom X-WP-AI-Authorization Header
        if (!empty($_SERVER['HTTP_X_WP_AI_AUTHORIZATION'])) {
            return trim($_SERVER['HTTP_X_WP_AI_AUTHORIZATION']);
        }
        // 4. Custom X-WP-AI-Token Header
        if (!empty($_SERVER['HTTP_X_WP_AI_TOKEN'])) {
            return trim($_SERVER['HTTP_X_WP_AI_TOKEN']);
        }
        // 5. Query Parameter Fallback (?wp_ai_token=...)
        if (!empty($_GET['wp_ai_token'])) {
            return sanitize_text_field($_GET['wp_ai_token']);
        }
        // Server PHP_AUTH_USER fallback
        if (!empty($_SERVER['PHP_AUTH_USER'])) {
            return trim($_SERVER['PHP_AUTH_USER']);
        }

        return false;
    }

    /**
     * Check if any authorization header, custom header, or token parameter is present
     *
     * @return bool
     */
    public static function has_authorization_header() {
        $token = self::get_authorization_token();
        return !empty($token);
    }
}
