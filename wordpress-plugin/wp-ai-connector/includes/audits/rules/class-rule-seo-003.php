<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_003 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_003'; }
    public function get_title() { return 'Missing Focus Keyword'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Focus keywords allow active SEO providers (Yoast, Rank Math, SEOPress) to calculate content optimization scores and ensure page text aligns with targeted search queries.';
    }
    public function get_remediation() {
        return 'Assign a primary focus keyword to the page or post within your active SEO plugin settings.';
    }

    public function evaluate(array $context) {
        $findings = array();

        // Check if an SEO provider is active permitting focus keyword tracking
        $provider = isset($context['seo_provider']) ? $context['seo_provider'] : 'None / Core';
        if ($provider === 'None / Core') {
            return $findings;
        }

        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $focus_kw = isset($entity['focus_keyword']) ? trim($entity['focus_keyword']) : '';
            if (empty($focus_kw) && isset($entity['status']) && $entity['status'] === 'publish') {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_003_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'focus_keyword',
                    'current_value'  => '(empty focus keyword)',
                    'expected_value' => 'Target search keyword phrase',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') is missing a target focus keyword in ' . $provider . '.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
