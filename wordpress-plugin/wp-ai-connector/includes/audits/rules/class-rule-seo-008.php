<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_008 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_008'; }
    public function get_title() { return 'Missing Canonical URL Tag'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Canonical tags explicitly indicate the primary authoritative URL for a page, preventing duplicate content issues arising from URL parameters, pagination, or trailing slashes.';
    }
    public function get_remediation() {
        return 'Ensure self-referencing or custom canonical tags are properly configured for all published URLs.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $canonical = isset($entity['canonical_url']) ? trim($entity['canonical_url']) : '';

            if ($status === 'publish' && empty($canonical)) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_008_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'canonical_url',
                    'current_value'  => '(empty canonical URL)',
                    'expected_value' => 'Valid permalink URL string',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') is missing a canonical meta tag.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
