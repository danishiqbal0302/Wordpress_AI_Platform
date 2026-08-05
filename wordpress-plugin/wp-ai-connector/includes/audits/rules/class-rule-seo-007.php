<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_007 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_007'; }
    public function get_title() { return 'Suboptimal Meta Description Length'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Meta descriptions under 120 characters underutilize Google SERP snippet space, while descriptions over 160 characters risk truncated text displays with trailing ellipses (...).';
    }
    public function get_remediation() {
        return 'Adjust meta description character count to be strictly between 120 and 160 characters.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $meta_desc = isset($entity['meta_description']) ? trim($entity['meta_description']) : '';
            if (!empty($meta_desc)) {
                $len = mb_strlen($meta_desc);
                if ($len < 120 || $len > 160) {
                    $findings[] = new WP_AI_Audit_Finding(array(
                        'id'             => 'finding_seo_007_' . $entity['id'],
                        'rule_id'        => $this->get_id(),
                        'category'       => $this->get_category(),
                        'severity'       => $this->get_severity(),
                        'entity_id'      => $entity['id'],
                        'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                        'entity_title'   => $entity['title'],
                        'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                        'field_name'     => 'meta_description',
                        'current_value'  => $len . ' chars',
                        'expected_value' => 'String between 120 and 160 characters',
                        'evidence'       => 'Meta description for "' . $entity['title'] . '" is ' . $len . ' characters (optimal SERP range is 120-160 characters).',
                        'rationale'      => $this->get_rationale(),
                        'remediation'    => $this->get_remediation(),
                        'auto_fixable'   => true,
                    ));
                }
            }
        }

        return $findings;
    }
}
