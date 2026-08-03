<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_001 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_001'; }
    public function get_title() { return 'Missing Meta Description'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Meta descriptions provide search engines and users with a concise summary of page content in SERPs. Missing descriptions force search engines to extract random page snippets, resulting in lower click-through rates.';
    }
    public function get_remediation() {
        return 'Add a compelling, unique meta description between 120 and 160 characters for the affected page or post.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $meta_desc = isset($entity['meta_description']) ? trim($entity['meta_description']) : '';
            if (empty($meta_desc)) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_001_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'meta_description',
                    'current_value'  => '(empty)',
                    'expected_value' => 'String (120-160 characters)',
                    'evidence'       => 'Meta description field is empty for published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ').',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
