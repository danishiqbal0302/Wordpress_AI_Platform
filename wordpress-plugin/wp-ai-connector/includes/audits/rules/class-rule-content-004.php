<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_004 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_004'; }
    public function get_title() { return 'Multiple H1 Heading Elements'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Using multiple H1 tags within a single page content layout dilutes main topic focus and confuses assistive technologies regarding page hierarchy.';
    }
    public function get_remediation() {
        return 'Convert secondary H1 headings into H2 or H3 subheadings, preserving a single H1 for the page title.';
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

            if ($status === 'publish' && $h1_cnt > 1) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_004_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_content',
                    'current_value'  => $h1_cnt . ' H1 headings',
                    'expected_value' => 'Exactly 1 H1 heading element',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') contains ' . $h1_cnt . ' H1 heading elements in content layout.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
