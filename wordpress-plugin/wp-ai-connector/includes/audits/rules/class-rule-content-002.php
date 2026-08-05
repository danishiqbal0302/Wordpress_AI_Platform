<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_002 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_002'; }
    public function get_title() { return 'Empty Page Body'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Publishing completely empty pages creates dead ends for website visitors and wastes search engine crawl budget on blank URLs.';
    }
    public function get_remediation() {
        return 'Add descriptive body content to the page or convert the page status to Draft.';
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

            if ($status === 'publish' && $wc === 0) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_002_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_content',
                    'current_value'  => '0 words (empty body)',
                    'expected_value' => 'Populated body content',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') has an empty content body with 0 words.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => false,
                ));
            }
        }

        return $findings;
    }
}
