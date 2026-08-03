<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Tech_001 extends WP_AI_Audit_Rule {
    public function get_id() { return 'TECH_001'; }
    public function get_title() { return 'Duplicate Page Title'; }
    public function get_category() { return 'technical_structure'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Duplicate title tags cause keyword cannibalization, making it difficult for search engines to determine which URL is authoritative for a given query.';
    }
    public function get_remediation() {
        return 'Ensure every published page and post possesses a distinct, unique title tag.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        $title_counts = array();
        foreach ($entities as $e) {
            $t = isset($e['title']) ? trim(mb_strtolower($e['title'])) : '';
            if (!empty($t)) {
                if (!isset($title_counts[$t])) {
                    $title_counts[$t] = array();
                }
                $title_counts[$t][] = $e;
            }
        }

        foreach ($title_counts as $norm_title => $group) {
            if (count($group) > 1) {
                foreach ($group as $e) {
                    $findings[] = new WP_AI_Audit_Finding(array(
                        'id'             => 'finding_tech_001_' . $e['id'],
                        'rule_id'        => $this->get_id(),
                        'category'       => $this->get_category(),
                        'severity'       => $this->get_severity(),
                        'entity_id'      => $e['id'],
                        'entity_type'    => isset($e['categories']) ? 'post' : 'page',
                        'entity_title'   => $e['title'],
                        'entity_url'     => isset($e['slug']) ? '/' . $e['slug'] : '',
                        'field_name'     => 'post_title',
                        'current_value'  => $e['title'],
                        'expected_value' => 'Unique title string across site',
                        'evidence'       => 'Entity "' . $e['title'] . '" shares an identical title with ' . (count($group) - 1) . ' other item(s).',
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
