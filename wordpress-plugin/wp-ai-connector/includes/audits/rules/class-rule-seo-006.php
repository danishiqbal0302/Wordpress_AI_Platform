<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_006 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_006'; }
    public function get_title() { return 'Duplicate Meta Descriptions Across Entities'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Identical meta descriptions reduce snippet differentiation in search results, lowering organic click-through rates across competing internal pages.';
    }
    public function get_remediation() {
        return 'Craft a distinct, custom meta description (120-160 characters) tailored to the unique topic of each page.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        $desc_groups = array();
        foreach ($entities as $e) {
            if (isset($e['status']) && $e['status'] !== 'publish') {
                continue;
            }
            $d = isset($e['meta_description']) ? trim(mb_strtolower($e['meta_description'])) : '';
            if (!empty($d)) {
                if (!isset($desc_groups[$d])) {
                    $desc_groups[$d] = array();
                }
                $desc_groups[$d][] = $e;
            }
        }

        foreach ($desc_groups as $norm_desc => $group) {
            if (count($group) > 1) {
                foreach ($group as $e) {
                    $findings[] = new WP_AI_Audit_Finding(array(
                        'id'             => 'finding_seo_006_' . $e['id'],
                        'rule_id'        => $this->get_id(),
                        'category'       => $this->get_category(),
                        'severity'       => $this->get_severity(),
                        'entity_id'      => $e['id'],
                        'entity_type'    => isset($e['categories']) ? 'post' : 'page',
                        'entity_title'   => $e['title'],
                        'entity_url'     => isset($e['slug']) ? '/' . $e['slug'] : '',
                        'field_name'     => 'meta_description',
                        'current_value'  => mb_substr($e['meta_description'], 0, 50) . '...',
                        'expected_value' => 'Unique meta description string',
                        'evidence'       => 'Entity "' . $e['title'] . '" (ID: ' . $e['id'] . ') shares an identical meta description with ' . (count($group) - 1) . ' other URL(s).',
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
