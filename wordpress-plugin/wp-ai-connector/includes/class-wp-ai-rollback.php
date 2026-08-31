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
                'Requested rollback snapshot record not found or expired on WordPress site.',
                array('status' => 404)
            );
        }

        // 0. Handle New Creation Rollback (delete created posts/pages)
        if (isset($snapshot_data['is_new_creation']) && $snapshot_data['is_new_creation'] === true) {
            $ids_to_delete = isset($snapshot_data['created_ids']) && is_array($snapshot_data['created_ids']) && count($snapshot_data['created_ids']) > 0
                ? $snapshot_data['created_ids']
                : array($post_id);

            $deleted_ids = array();
            foreach ($ids_to_delete as $del_id) {
                if ($del_id > 0) {
                    wp_delete_post($del_id, true);
                    $deleted_ids[] = $del_id;
                }
            }

            delete_option($snapshot_id);

            return rest_ensure_response(array(
                'rollback_status' => 'SUCCESS',
                'action_type'     => 'create_post',
                'deleted_ids'     => $deleted_ids,
                'executedAt'      => time(),
            ));
        }

        // 1. Restore Exact Previous Post Attributes
        $rollback_post_args = array(
            'ID'           => $post_id,
            'post_title'   => isset($snapshot_data['post_title']) ? $snapshot_data['post_title'] : get_the_title($post_id),
            'post_content' => isset($snapshot_data['post_content']) ? $snapshot_data['post_content'] : get_post_field('post_content', $post_id),
            'post_excerpt' => isset($snapshot_data['post_excerpt']) ? $snapshot_data['post_excerpt'] : get_post_field('post_excerpt', $post_id),
        );
        wp_update_post($rollback_post_args);

        // 2. Restore Exact Previous Meta Fields (Yoast, Rank Math, Core Meta)
        if (isset($snapshot_data['post_meta']) && is_array($snapshot_data['post_meta'])) {
            foreach ($snapshot_data['post_meta'] as $meta_key => $meta_values) {
                if (is_array($meta_values) && count($meta_values) > 0) {
                    $single_val = maybe_unserialize($meta_values[0]);
                    update_post_meta($post_id, $meta_key, $single_val);
                } else {
                    delete_post_meta($post_id, $meta_key);
                }
            }
        }

        // 3. Restore Parent Posts & Elementor Meta if present
        if (isset($snapshot_data['parent_posts']) && is_array($snapshot_data['parent_posts'])) {
            foreach ($snapshot_data['parent_posts'] as $parent_item) {
                if (isset($parent_item['post_id']) && $parent_item['post_id'] > 0) {
                    $parent_id = intval($parent_item['post_id']);
                    if (isset($parent_item['post_content'])) {
                        wp_update_post(array(
                            'ID'           => $parent_id,
                            'post_content' => $parent_item['post_content'],
                        ));
                    }
                    if (isset($parent_item['elementor_data'])) {
                        if (!empty($parent_item['elementor_data'])) {
                            update_post_meta($parent_id, '_elementor_data', wp_slash($parent_item['elementor_data']));
                        } else {
                            delete_post_meta($parent_id, '_elementor_data');
                        }
                    }
                    clean_post_cache($parent_id);
                }
            }
        }

        // 4. Invalidate Cache Cleanly
        clean_post_cache($post_id);
        wp_cache_delete($post_id, 'posts');
        if (function_exists('wp_cache_flush')) {
            wp_cache_flush();
        }

        // 5. Post-Restoration Verification Check
        $restored_post = get_post($post_id);
        if (!$restored_post) {
            return new WP_Error(
                'rest_rollback_failed',
                'Failed to retrieve restored post record after rollback.',
                array('status' => 500)
            );
        }

        $restored_meta     = get_post_meta($post_id);
        $payload           = $restored_post->post_title . '|' . $restored_post->post_excerpt . '|' . serialize($restored_meta);
        $restored_checksum = md5($payload);

        return rest_ensure_response(array(
            'rollback_status'    => 'SUCCESS',
            'post_id'            => $post_id,
            'restored_title'     => $restored_post->post_title,
            'restored_checksum'  => $restored_checksum,
            'executedAt'         => time(),
        ));
    }
}
