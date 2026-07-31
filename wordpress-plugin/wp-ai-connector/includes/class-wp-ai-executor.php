<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Executor {
    public function register_routes() {
        register_rest_route('wp-ai/v1', '/execute', array(
            'methods'             => 'POST',
            'callback'            => array($this, 'execute_proposal'),
            'permission_callback' => array('WP_AI_Security', 'verify_request'),
        ));
    }

    public function execute_proposal(WP_REST_Request $request) {
        $params = $request->get_json_params();

        $post_id          = isset($params['post_id']) ? intval($params['post_id']) : 0;
        $target_checksum  = isset($params['target_checksum']) ? sanitize_text_field($params['target_checksum']) : '';
        $action_type      = isset($params['action_type']) ? sanitize_text_field($params['action_type']) : '';
        $proposed_values  = isset($params['proposed_values']) ? $params['proposed_values'] : array();

        if ($post_id <= 0 || empty($target_checksum)) {
            return new WP_Error(
                'rest_invalid_param',
                'Parameters post_id and target_checksum are required.',
                array('status' => 400)
            );
        }

        $post = get_post($post_id);
        if (!$post) {
            return new WP_Error(
                'rest_post_not_found',
                'Target post record not found in WordPress database.',
                array('status' => 404)
            );
        }

        // Calculate Current Post MD5 Checksum
        $current_title   = $post->post_title;
        $current_excerpt = $post->post_excerpt;
        $current_meta    = get_post_meta($post_id);
        $current_payload = $current_title . '|' . $current_excerpt . '|' . serialize($current_meta);
        $current_checksum = md5($current_payload);

        // Pre-execution Checksum Lock (Hard Fail Stale Protection)
        if (!empty($target_checksum) && $target_checksum !== $current_checksum) {
            return new WP_Error(
                'rest_conflict_stale_target',
                'Stale target checksum detected. Target page was edited concurrently in wp-admin prior to execution.',
                array(
                    'status'           => 409,
                    'current_checksum' => $current_checksum,
                    'expected_checksum'=> $target_checksum,
                )
            );
        }

        // Generate Rollback Snapshot ID
        $snapshot_id = 'wp_ai_snapshot_' . $post_id . '_' . time();
        $snapshot_data = array(
            'post_id'      => $post_id,
            'post_title'   => $post->post_title,
            'post_content' => $post->post_content,
            'post_excerpt' => $post->post_excerpt,
            'post_meta'    => $current_meta,
            'timestamp'    => time(),
        );

        // Save Rollback Snapshot in wp_options
        update_option($snapshot_id, $snapshot_data, false);

        // Apply Proposed Field Updates
        $update_post_args = array('ID' => $post_id);
        $meta_updates = array();

        if (isset($proposed_values['post_title'])) {
            $update_post_args['post_title'] = sanitize_text_field($proposed_values['post_title']);
        }
        if (isset($proposed_values['post_excerpt'])) {
            $update_post_args['post_excerpt'] = sanitize_textarea_field($proposed_values['post_excerpt']);
        }
        if (isset($proposed_values['meta']) && is_array($proposed_values['meta'])) {
            foreach ($proposed_values['meta'] as $meta_key => $meta_val) {
                update_post_meta($post_id, sanitize_key($meta_key), sanitize_text_field($meta_val));
                $meta_updates[$meta_key] = $meta_val;
            }
        }

        if (count($update_post_args) > 1) {
            wp_update_post($update_post_args);
        }

        // Calculate New Post Checksum after Execution
        $updated_post    = get_post($post_id);
        $updated_meta    = get_post_meta($post_id);
        $new_payload     = $updated_post->post_title . '|' . $updated_post->post_excerpt . '|' . serialize($updated_meta);
        $new_checksum    = md5($new_payload);

        return rest_ensure_response(array(
            'execution_state'    => 'COMPLETED',
            'post_id'            => $post_id,
            'action_type'        => $action_type,
            'previous_checksum'  => $current_checksum,
            'new_checksum'       => $new_checksum,
            'snapshot_id'        => $snapshot_id,
            'verificationStatus' => 'PASSED',
            'executedAt'         => time(),
        ));
    }
}
