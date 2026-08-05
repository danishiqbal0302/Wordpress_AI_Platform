<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_011 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_011'; }
    public function get_title() { return 'Poor Permalink Slug Quality'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Suboptimal slugs containing uppercase letters, underscores (_), special characters, trailing ID numbers, or exceeding 75 characters reduce search readability and cause URL canonicalization issues.';
    }
    public function get_remediation() {
        return 'Format permalink slugs using lowercase letters, hyphens (-), concise target keywords, and keep length under 75 characters.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $slug = isset($entity['slug']) ? trim($entity['slug']) : '';
            if (empty($slug)) {
                continue;
            }

            $reasons = array();
            if (preg_match('/[A-Z]/', $slug)) {
                $reasons[] = 'contains uppercase characters';
            }
            if (strpos($slug, '_') !== false) {
                $reasons[] = 'uses underscores instead of hyphens';
            }
            if (mb_strlen($slug) > 75) {
                $reasons[] = 'exceeds 75 characters in length (' . mb_strlen($slug) . ' chars)';
            }
            if (preg_match('/[^a-z0-9\-]/', $slug)) {
                $reasons[] = 'contains special characters';
            }

            if (!empty($reasons)) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_011_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => '/' . $slug,
                    'field_name'     => 'post_name',
                    'current_value'  => $slug,
                    'expected_value' => 'Clean, lowercase, hyphen-separated slug <= 75 chars',
                    'evidence'       => 'Permalink slug "' . $slug . '" for entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') has quality issues: ' . implode('; ', $reasons) . '.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
