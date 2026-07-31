<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Rollback {
    public function register_routes() {
        register_rest_route('wp-ai/v1', '/rollback', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'execute_rollback'),
            'permission_callback' => array('WP_AI_Security', 'verify_request'),
        ));
    }

    public function execute_rollback(WP_REST_Request $request) {
        $params = $request->get_json_params();

        $post_id     = isset($params['post_id']) ? intval($params['post_id']) : 0;
        $snapshot_id = isset($params['snapshot_id']) ? sanitize_text_field($params['snapshot_id']) : '';

        if ($post_id <= 0 || empty($snapshot_id)) {
            return new WP_Error(
                'rest_invalid_param',
                'Parameters post_id and snapshot_id are required for rollback.',
                array('status' => 400)
            );
        }

        $snapshot_data = get_option($snapshot_id);
        if (!$snapshot_data || !is_array($snapshot_data)) {
            return new WP_Error(
                'rest_snapshot_not_found',
                'Requested rollback snapshot record not found or expired.',
                array('status' => 404)
            );
        }

        // Restore Exact Previous Post Fields
        $rollback_post_args = array(
            'ID'           => $post_id,
            'post_title'   => $snapshot_data['post_title'],
            'post_content' => $snapshot_data['post_content'],
            'post_excerpt' => $snapshot_data['post_excerpt'],
        );
        wp_update_post($rollback_post_args);

        // Restore Exact Previous Meta Fields
        if (isset($snapshot_data['post_meta']) && is_array($snapshot_data['post_meta'])) {
            foreach ($snapshot_data['post_meta'] as $meta_key => $meta_values) {
                delete_post_meta($post_id, $meta_key);
                foreach ((array)$meta_values as $val) {
                    add_post_meta($post_id, $meta_key, maybe_unserialize($val));
                }
            }
        }

        // Calculate Post Checksum after Rollback
        $restored_post  = get_post($post_id);
        $restored_meta  = get_post_meta($post_id);
        $payload        = $restored_post->post_title . '|' . $restored_post->post_excerpt . '|' . serialize($restored_meta);
        $restored_checksum = md5($payload);

        return rest_ensure_response(array(
            'rollback_status'    => 'SUCCESS',
            'post_id'            => $post_id,
            'snapshot_id'        => $snapshot_id,
            'restored_checksum'  => $restored_checksum,
            'timestamp'          => time(),
        ));
    }
}
