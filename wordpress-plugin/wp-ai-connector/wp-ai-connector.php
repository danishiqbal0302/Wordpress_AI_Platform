<?php
/**
 * Plugin Name: WordPress AI Platform Connector
 * Plugin URI: https://wordpress-ai-platform.com
 * Description: Secure, verified helper plugin for the WordPress AI SaaS platform. Enforces HMAC-SHA256 authentication, pre-execution checksum verification, and instant rollback snapshots.
 * Version: 1.4.2
 * Author: WordPress AI Platform
 * Author URI: https://wordpress-ai-platform.com
 * License: GPLv2 or later
 * Text Domain: wp-ai-connector
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('WP_AI_CONNECTOR_VERSION', '1.4.2');
define('WP_AI_CONNECTOR_PATH', plugin_dir_path(__FILE__));

// Require Core Classes
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-security.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-health.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-executor.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-rollback.php';

/**
 * Activation Hook: Generate API Key and HMAC Secret
 */
register_activation_hook(__FILE__, function() {
    if (!get_option('wp_ai_api_key')) {
        $api_key = 'wp_ai_' . bin2hex(random_bytes(16));
        update_option('wp_ai_api_key', $api_key);
    }
    if (!get_option('wp_ai_hmac_secret')) {
        $hmac_secret = bin2hex(random_bytes(32));
        update_option('wp_ai_hmac_secret', $hmac_secret);
    }
});

/**
 * Register REST API Endpoints
 */
add_action('rest_api_init', function() {
    $health = new WP_AI_Health();
    $health->register_routes();

    $executor = new WP_AI_Executor();
    $executor->register_routes();

    $rollback = new WP_AI_Rollback();
    $rollback->register_routes();
});

/**
 * Register WP Admin Settings Page
 */
add_action('admin_menu', function() {
    add_options_page(
        'WordPress AI Connector',
        'WordPress AI Connector',
        'manage_options',
        'wp-ai-connector',
        'wp_ai_render_admin_page'
    );
});

function wp_ai_render_admin_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $api_key = get_option('wp_ai_api_key', 'Not Generated');
    $hmac_secret = get_option('wp_ai_hmac_secret', 'Not Generated');
    ?>
    <div class="wrap">
        <h1><span class="dashicons dashicons-shield-alt" style="font-size: 28px; width: 28px; height: 28px; margin-right: 8px; vertical-align: middle; color: #007cba;"></span> WordPress AI Platform Connector</h1>
        <p>This website is equipped with the WordPress AI Platform Connector plugin (v1.4.2).</p>
        
        <div class="card" style="max-width: 680px; padding: 20px; border-radius: 8px; border-left: 4px solid #007cba; margin-top: 20px;">
            <h2 style="margin-top: 0;">SaaS Pair Credentials</h2>
            <p style="color: #666; font-size: 13px;">Use these credentials to pair this website in your WordPress AI SaaS Dashboard.</p>
            
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="wp_ai_api_key">Platform API Key</label></th>
                    <td>
                        <input type="text" id="wp_ai_api_key" value="<?php echo esc_attr($api_key); ?>" class="large-text code" readonly onclick="this.select();" />
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="wp_ai_hmac_secret">HMAC Secret Key</label></th>
                    <td>
                        <input type="text" id="wp_ai_hmac_secret" value="<?php echo esc_attr($hmac_secret); ?>" class="large-text code" readonly onclick="this.select();" />
                    </td>
                </tr>
            </table>

            <div style="background-color: #f0f6fc; border: 1px solid #c8d7e6; padding: 12px; border-radius: 6px; font-size: 12px; color: #1d2327; margin-top: 15px;">
                <strong>Security Protection:</strong> All REST API operations on <code>/wp-json/wp-ai/v1/execute</code> require a valid HMAC-SHA256 signature (<code>X-WP-AI-Signature</code>) and timestamp (<code>X-WP-AI-Timestamp</code>). Unauthenticated execution requests are strictly rejected.
            </div>
        </div>
    </div>
    <?php
}
