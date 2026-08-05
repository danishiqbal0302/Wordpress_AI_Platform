<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_008 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_008'; }
    public function get_title() { return 'Missing Introductory Lead Paragraph'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Starting page content immediately with subheadings, banners, or images before a lead introduction paragraph degrades user orientation and search snippet extraction.';
    }
    public function get_remediation() {
        return 'Insert a 2-3 sentence introductory lead paragraph at the beginning of the body layout before starting sub-sections.';
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
            $starts_with_h = $struct && isset($struct['starts_with_heading']) ? (bool)$struct['starts_with_heading'] : false;

            if ($status === 'publish' && $starts_with_h) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_008_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_content',
                    'current_value'  => 'Content starts with a heading tag',
                    'expected_value' => 'Introductory lead paragraph before subheadings',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') starts directly with a heading tag before an introductory lead paragraph.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => false,
                ));
            }
        }

        return $findings;
    }
}
