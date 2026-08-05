<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_006 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_006'; }
    public function get_title() { return 'Excessively Long Page or Post Title'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Post or page titles exceeding 70 characters are truncated on search result snippet titles and look unorganized in navigation lists.';
    }
    public function get_remediation() {
        return 'Shorten the post title string to under 70 characters while maintaining core keywords.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $title  = isset($entity['title']) ? trim($entity['title']) : '';
            $len    = mb_strlen($title);

            if ($status === 'publish' && $len > 70) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_006_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $title,
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_title',
                    'current_value'  => $len . ' chars',
                    'expected_value' => '<= 70 characters',
                    'evidence'       => 'Title for "' . $title . '" (ID: ' . $entity['id'] . ') is ' . $len . ' characters long (recommended maximum is 70 characters).',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
