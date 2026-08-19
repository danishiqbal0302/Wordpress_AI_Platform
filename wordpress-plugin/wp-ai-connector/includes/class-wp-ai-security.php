<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Security {
    /**
     * Validate HMAC-SHA256 Signature and Timestamp Freshness
     *
     * @param WP_REST_Request $request
     * @return true|WP_Error
     */
    public static function verify_request(WP_REST_Request $request) {
        $headers = $request->get_headers();
        $received_signature = $request->get_header('X-WP-AI-Signature');
        $received_timestamp = $request->get_header('X-WP-AI-Timestamp');
        $api_key_header     = $request->get_header('X-WP-AI-API-Key');

        if (empty($api_key_header)) {
            $auth_header = $request->get_header('Authorization');
            if (!empty($auth_header) && strpos($auth_header, 'Bearer ') === 0) {
                $api_key_header = substr($auth_header, 7);
            }
        }

        $stored_api_key = get_option('wp_ai_api_key');
        $hmac_secret = get_option('wp_ai_hmac_secret');
        $raw_body = $request->get_body();
        $payload_to_sign = $received_timestamp . '.' . $raw_body;
        $expected_signature = hash_hmac('sha256', $payload_to_sign, $hmac_secret);

        $log_data = "=========================================\n";
        $log_data .= "Time: " . date('Y-m-d H:i:s') . "\n";
        $log_data .= "Method: " . $request->get_method() . "\n";
        $log_data .= "Received Signature: " . $received_signature . "\n";
        $log_data .= "Expected Signature: " . $expected_signature . "\n";
        $log_data .= "Stored Key: " . $stored_api_key . "\n";
        $log_data .= "Header Key: " . $api_key_header . "\n";
        $log_data .= "HMAC Secret: " . $hmac_secret . "\n";
        $log_data .= "Payload to sign: " . $payload_to_sign . "\n";
        $log_data .= "Raw Body: " . $raw_body . "\n";
        @file_put_contents(WP_CONTENT_DIR . '/uploads/wp-ai-headers.txt', $log_data, FILE_APPEND);

        // 1. API Key Fallback Authentication
        $stored_api_key = get_option('wp_ai_api_key');
        if (!empty($stored_api_key) && !empty($api_key_header) && hash_equals($stored_api_key, $api_key_header)) {
            return true;
        }

        // 2. HMAC-SHA256 Timestamp Verification
        if (empty($received_signature) || empty($received_timestamp)) {
            return new WP_Error(
                'rest_forbidden_security_headers_missing',
                'Security authentication headers (API Key or HMAC Signature/Timestamp) are required.',
                array('status' => 401)
            );
        }

        $current_time = time();
        $timestamp = intval($received_timestamp);

        if (abs($current_time - $timestamp) > 300) {
            return new WP_Error(
                'rest_forbidden_timestamp_expired',
                'Request timestamp expired or out of sync window (300s max).',
                array('status' => 401)
            );
        }

        $hmac_secret = get_option('wp_ai_hmac_secret');
        if (empty($hmac_secret)) {
            return new WP_Error(
                'rest_internal_error_missing_secret',
                'HMAC secret key is uninitialized on server.',
                array('status' => 500)
            );
        }

        $raw_body = $request->get_body();
        $payload_to_sign = $timestamp . '.' . $raw_body;
        $expected_signature = hash_hmac('sha256', $payload_to_sign, $hmac_secret);

        if (!hash_equals($expected_signature, $received_signature)) {
            return new WP_Error(
                'rest_forbidden_invalid_signature',
                'Invalid HMAC signature verification failed.',
                array('status' => 403)
            );
        }

        return true;
    }
}
