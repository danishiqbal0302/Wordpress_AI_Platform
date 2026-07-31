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
        $received_signature = $request->get_header('X-WP-AI-Signature');
        $received_timestamp = $request->get_header('X-WP-AI-Timestamp');

        if (empty($received_signature) || empty($received_timestamp)) {
            return new WP_Error(
                'rest_forbidden_security_headers_missing',
                'Security headers X-WP-AI-Signature and X-WP-AI-Timestamp are required.',
                array('status' => 401)
            );
        }

        // Timestamp Freshness Check (300 seconds window)
        $current_time = time();
        $timestamp = intval($received_timestamp);

        if (abs($current_time - $timestamp) > 300) {
            return new WP_Error(
                'rest_forbidden_timestamp_expired',
                'Request timestamp expired or out of sync window (300s max).',
                array('status' => 401)
            );
        }

        // HMAC-SHA256 Verification
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

        // Timing-attack Safe String Comparison
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
