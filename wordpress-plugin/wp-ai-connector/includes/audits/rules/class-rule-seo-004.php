<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_004 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_004'; }
    public function get_title() { return 'Missing SEO Title Tag'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Title tags are the single most important on-page SEO signal used by search engines to index and rank web pages in search engine results pages (SERPs).';
    }
    public function get_remediation() {
        return 'Enter a descriptive title tag for the affected page or post.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $title = isset($entity['title']) ? trim($entity['title']) : '';
            if (empty($title) && isset($entity['status']) && $entity['status'] === 'publish') {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_004_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => '(Untitled)',
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_title',
                    'current_value'  => '(empty title)',
                    'expected_value' => 'Descriptive title string (30-60 characters)',
                    'evidence'       => 'Published entity (ID: ' . $entity['id'] . ') has an empty title tag.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
