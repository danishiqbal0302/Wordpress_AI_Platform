<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_001 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_001'; }
    public function get_title() { return 'Thin Content Body'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Pages or posts with fewer than 300 words often lack sufficient depth to satisfy user search intent, leading to higher bounce rates and poor search indexing.';
    }
    public function get_remediation() {
        return 'Expand body text content with detailed explanations, media, or structured headings to exceed 300 words.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $wc     = isset($entity['word_count']) ? intval($entity['word_count']) : 0;

            if ($status === 'publish' && $wc < 300) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_001_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_content',
                    'current_value'  => $wc . ' words',
                    'expected_value' => '>= 300 words for published content',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" contains only ' . $wc . ' words (minimum recommended threshold is 300 words).',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => false,
                ));
            }
        }

        return $findings;
    }
}
