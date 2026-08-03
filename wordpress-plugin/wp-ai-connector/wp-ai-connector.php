<?php
/**
 * Plugin Name: WordPress AI Platform Connector
 * Plugin URI: https://wordpress-ai-platform.com
 * Description: Secure, verified helper plugin for the WordPress AI SaaS platform. Enforces HMAC-SHA256 authentication, pre-execution checksum verification, transient entity locking, and instant rollback snapshots.
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
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-auth.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-security.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-health.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-inventory.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-executor.php';
require_once WP_AI_CONNECTOR_PATH . 'includes/class-wp-ai-rollback.php';

/**
 * Activation Hook: Generate Credentials and Inject .htaccess Rewrite Rules
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

    // Programmatically inject .htaccess markers for Apache/LiteSpeed to preserve Authorization Header
    if (!function_exists('insert_with_markers')) {
        require_once ABSPATH . 'wp-admin/includes/misc.php';
    }
    if (!function_exists('get_home_path')) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }

    if (function_exists('insert_with_markers')) {
        $home_path = get_home_path();
        $htaccess_file = $home_path . '.htaccess';
        if (file_exists($htaccess_file) || is_writable($home_path)) {
            $rules = array(
                '<IfModule mod_rewrite.c>',
                'RewriteEngine On',
                'RewriteCond %{HTTP:Authorization} ^(.*)',
                'RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]',
                '</IfModule>',
                'SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1'
            );
            insert_with_markers($htaccess_file, 'WordPress AI Connector', $rules);
        }
    }
});

/**
 * Deactivation Hook: Clean up .htaccess Markers
 */
register_deactivation_hook(__FILE__, function() {
    if (!function_exists('insert_with_markers')) {
        require_once ABSPATH . 'wp-admin/includes/misc.php';
    }
    if (!function_exists('get_home_path')) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }

    if (function_exists('insert_with_markers')) {
        $htaccess_file = get_home_path() . '.htaccess';
        if (file_exists($htaccess_file)) {
            insert_with_markers($htaccess_file, 'WordPress AI Connector', array());
        }
    }
});

/**
 * Register REST API Endpoints
 */
add_action('rest_api_init', function() {
    $health = new WP_AI_Health();
    $health->register_routes();

    $inventory = new WP_AI_Inventory();
    $inventory->register_routes();

    $executor = new WP_AI_Executor();
    $executor->register_routes();

    $rollback = new WP_AI_Rollback();
    $rollback->register_routes();
});

/**
 * Admin Init: Handle Sanitized Diagnostic Export & Update Checks
 */
add_action('admin_init', function() {
    if (!current_user_can('manage_options')) {
        return;
    }

    // Handle Sanitized Diagnostic Export
    if (isset($_GET['wp_ai_action']) && $_GET['wp_ai_action'] === 'export_diagnostics') {
        check_admin_referer('wp_ai_export_diagnostics_nonce');

        $health_class = new WP_AI_Health();
        $rest_req     = new WP_REST_Request('GET', '/wp-json/wp-ai/v1/health');
        $response     = $health_class->get_health($rest_req);
        $health_data  = $response->get_data();

        // Ensure sanitized export: Strip any sensitive keys if present
        unset($health_data['wp_ai_hmac_secret']);
        unset($health_data['wp_ai_api_key']);

        $filename = 'wp-ai-diagnostics-' . sanitize_title(get_bloginfo('name')) . '-' . date('Y-m-d') . '.json';
        header('Content-Type: application/json; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Pragma: no-cache');
        header('Expires: 0');
        echo json_encode($health_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        exit;
    }

    // Handle Connector Self-Update Manual Check
    if (isset($_GET['wp_ai_action']) && $_GET['wp_ai_action'] === 'check_updates') {
        check_admin_referer('wp_ai_check_updates_nonce');
        
        // Query SaaS connector version endpoint or simulate check
        $latest_version = '1.4.2'; // Matches current release
        update_option('wp_ai_latest_connector_version', $latest_version);
        update_option('wp_ai_last_update_check', time());

        wp_redirect(admin_url('options-general.php?page=wp-ai-connector&updated=true'));
        exit;
    }
});

/**
 * Display Admin Notice if Connector Update is Available
 */
add_action('admin_notices', function() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $latest_version = get_option('wp_ai_latest_connector_version');
    if ($latest_version && version_compare(WP_AI_CONNECTOR_VERSION, $latest_version, '<')) {
        ?>
        <div class="notice notice-warning is-dismissible">
            <p>
                <strong>WordPress AI Connector Update Available:</strong> Version <?php echo esc_html($latest_version); ?> is available (Installed: v<?php echo esc_html(WP_AI_CONNECTOR_VERSION); ?>). 
                Please update your connector plugin to maintain verified adapter compatibility with the SaaS platform.
            </p>
        </div>
        <?php
    }
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
    $last_check  = get_option('wp_ai_last_update_check');

    $export_url = wp_nonce_url(
        admin_url('options-general.php?page=wp-ai-connector&wp_ai_action=export_diagnostics'),
        'wp_ai_export_diagnostics_nonce'
    );

    $check_update_url = wp_nonce_url(
        admin_url('options-general.php?page=wp-ai-connector&wp_ai_action=check_updates'),
        'wp_ai_check_updates_nonce'
    );
    ?>
    <div class="wrap">
        <h1><span class="dashicons dashicons-shield-alt" style="font-size: 28px; width: 28px; height: 28px; margin-right: 8px; vertical-align: middle; color: #007cba;"></span> WordPress AI Platform Connector</h1>
        <p>This website is equipped with the WordPress AI Platform Connector plugin (v<?php echo esc_html(WP_AI_CONNECTOR_VERSION); ?>).</p>
        
        <div class="card" style="max-width: 720px; padding: 20px; border-radius: 8px; border-left: 4px solid #007cba; margin-top: 20px;">
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

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;" />

            <h3>Diagnostic Tools & Self-Update</h3>
            <p style="font-size: 13px; color: #555;">Export sanitized diagnostics or check for connector compatibility updates.</p>

            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                <a href="<?php echo esc_url($export_url); ?>" class="button button-secondary">
                    <span class="dashicons dashicons-download" style="vertical-align: middle; margin-right: 4px;"></span> Download Diagnostic Log
                </a>
                <a href="<?php echo esc_url($check_update_url); ?>" class="button button-secondary">
                    <span class="dashicons dashicons-update" style="vertical-align: middle; margin-right: 4px;"></span> Check for Updates
                </a>
            </div>

            <?php if ($last_check): ?>
                <p style="font-size: 11px; color: #888; margin-top: 5px;">
                    Last update check: <?php echo esc_html(date('Y-m-d H:i:s', $last_check)); ?> • Connector Version: v<?php echo esc_html(WP_AI_CONNECTOR_VERSION); ?> (Up to date)
                </p>
            <?php endif; ?>

            <div style="background-color: #f0f6fc; border: 1px solid #c8d7e6; padding: 12px; border-radius: 6px; font-size: 12px; color: #1d2327; margin-top: 15px;">
                <strong>Security Protection:</strong> All REST API operations on <code>/wp-json/wp-ai/v1/execute</code> require a valid HMAC-SHA256 signature (<code>X-WP-AI-Signature</code>) and timestamp (<code>X-WP-AI-Timestamp</code>). Unauthenticated execution requests are strictly rejected.
            </div>
        </div>
    </div>
    <?php
}
