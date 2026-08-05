<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_003 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_003'; }
    public function get_title() { return 'Missing H1 Heading Element'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'An H1 heading defines the primary topic of a page for screen readers and search crawlers. Omitting an H1 tag hurts structural accessibility and keyword topic signals.';
    }
    public function get_remediation() {
        return 'Add a single, clear H1 heading block or tag at the top of the post or page content layout.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $struct = isset($entity['content_structure']) ? $entity['content_structure'] : null;
            $h1_cnt = $struct && isset($struct['h1_count']) ? intval($struct['h1_count']) : 0;

            if ($status === 'publish' && $h1_cnt === 0) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_003_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_content',
                    'current_value'  => '0 H1 headings',
                    'expected_value' => 'Exactly 1 H1 heading element',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') contains 0 H1 heading elements in content layout.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
