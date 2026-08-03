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

        // 1. Capabilities Enforcement
        if (is_user_logged_in() && !current_user_can('edit_post', $post_id)) {
            return new WP_Error(
                'rest_forbidden_capability',
                'Executing context lacks required edit_post capability for post #' . $post_id . '.',
                array('status' => 403)
            );
        }

        // 2. Short-Lived Entity Locking (Transient Lock)
        $lock_key = 'wp_ai_lock_' . $post_id;
        $existing_lock = get_transient($lock_key);
        if ($existing_lock) {
            return new WP_Error(
                'rest_entity_locked',
                'Post #' . $post_id . ' is currently locked by a concurrent action (Lock ID: ' . $existing_lock . ').',
                array('status' => 423)
            );
        }

        // Acquire lock for 30 seconds
        $lock_id = 'lock_' . time() . '_' . wp_generate_password(6, false);
        set_transient($lock_key, $lock_id, 30);

        try {
            // Calculate Current Post MD5 Checksum
            $current_title   = $post->post_title;
            $current_excerpt = $post->post_excerpt;
            $current_meta    = get_post_meta($post_id);
            $current_payload = $current_title . '|' . $current_excerpt . '|' . serialize($current_meta);
            $current_checksum = md5($current_payload);

            // Pre-execution Checksum Lock (Hard-Fail Stale Protection)
            if (!empty($target_checksum) && $target_checksum !== $current_checksum) {
                delete_transient($lock_key);
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

            if (isset($proposed_values['post_title'])) {
                $update_post_args['post_title'] = sanitize_text_field($proposed_values['post_title']);
            }
            if (isset($proposed_values['post_excerpt'])) {
                $update_post_args['post_excerpt'] = sanitize_textarea_field($proposed_values['post_excerpt']);
            }
            if (isset($proposed_values['meta']) && is_array($proposed_values['meta'])) {
                foreach ($proposed_values['meta'] as $meta_key => $meta_val) {
                    update_post_meta($post_id, sanitize_key($meta_key), sanitize_text_field($meta_val));
                }
            }

            if (count($update_post_args) > 1) {
                wp_update_post($update_post_args);
            }

            // 3. Strict Post-Write Verification
            $reread_post = get_post($post_id);
            $mismatches  = array();

            if (isset($proposed_values['post_title'])) {
                $expected = sanitize_text_field($proposed_values['post_title']);
                if ($reread_post->post_title !== $expected) {
                    $mismatches['post_title'] = array('expected' => $expected, 'actual' => $reread_post->post_title);
                }
            }
            if (isset($proposed_values['post_excerpt'])) {
                $expected = sanitize_textarea_field($proposed_values['post_excerpt']);
                if ($reread_post->post_excerpt !== $expected) {
                    $mismatches['post_excerpt'] = array('expected' => $expected, 'actual' => $reread_post->post_excerpt);
                }
            }
            if (isset($proposed_values['meta']) && is_array($proposed_values['meta'])) {
                foreach ($proposed_values['meta'] as $meta_key => $meta_val) {
                    $expected = sanitize_text_field($meta_val);
                    $actual   = get_post_meta($post_id, sanitize_key($meta_key), true);
                    if ($actual !== $expected) {
                        $mismatches['meta'][$meta_key] = array('expected' => $expected, 'actual' => $actual);
                    }
                }
            }

            $verification_status = empty($mismatches) ? 'VERIFIED_EXACT_MATCH' : 'VERIFICATION_FAILED';

            // Calculate New Post Checksum after Execution
            $updated_meta = get_post_meta($post_id);
            $new_payload  = $reread_post->post_title . '|' . $reread_post->post_excerpt . '|' . serialize($updated_meta);
            $new_checksum = md5($new_payload);

            // Release transient entity lock
            delete_transient($lock_key);

            if ($verification_status === 'VERIFICATION_FAILED') {
                return new WP_Error(
                    'rest_verification_failed',
                    'Post-write verification failed. Database reread value did not match approved proposal payload.',
                    array(
                        'status'             => 500,
                        'verificationStatus' => 'FAILED',
                        'mismatches'         => $mismatches,
                        'snapshot_id'        => $snapshot_id,
                    )
                );
            }

            return rest_ensure_response(array(
                'execution_state'    => 'SUCCEEDED',
                'post_id'            => $post_id,
                'action_type'        => $action_type,
                'previous_checksum'  => $current_checksum,
                'new_checksum'       => $new_checksum,
                'snapshot_id'        => $snapshot_id,
                'verificationStatus' => 'VERIFIED_EXACT_MATCH',
                'executedAt'         => time(),
            ));

        } catch (Exception $e) {
            delete_transient($lock_key);
            return new WP_Error(
                'rest_execution_error',
                $e->getMessage(),
                array('status' => 500)
            );
        }
    }
}
