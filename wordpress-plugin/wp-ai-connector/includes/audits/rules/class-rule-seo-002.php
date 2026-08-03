<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_002 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_002'; }
    public function get_title() { return 'Suboptimal Title Length'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Title tags under 30 characters underutilize SERP real estate, while titles over 60 characters risk truncated displays on desktop and mobile search engines.';
    }
    public function get_remediation() {
        return 'Adjust the title length to be between 30 and 60 characters for optimal display in search results.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $title = isset($entity['title']) ? trim($entity['title']) : '';
            $len   = mb_strlen($title);
            if ($len < 30 || $len > 60) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_002_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $title,
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_title',
                    'current_value'  => $title . ' (' . $len . ' chars)',
                    'expected_value' => 'Title string between 30 and 60 characters',
                    'evidence'       => 'Title length for "' . $title . '" is ' . $len . ' characters (optimal range is 30-60 characters).',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
