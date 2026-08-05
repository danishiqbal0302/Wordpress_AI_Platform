<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_005 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_005'; }
    public function get_title() { return 'Duplicate SEO Titles Across Entities'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Identical SEO title tags across multiple published pages or posts lead to keyword cannibalization and confuse search engine crawlers regarding which page to index.';
    }
    public function get_remediation() {
        return 'Differentiate the title tags for each page so every published URL possesses a unique SEO title.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        $title_groups = array();
        foreach ($entities as $e) {
            if (isset($e['status']) && $e['status'] !== 'publish') {
                continue;
            }
            $t = isset($e['seo_title']) && !empty($e['seo_title']) ? trim(mb_strtolower($e['seo_title'])) : trim(mb_strtolower($e['title']));
            if (!empty($t)) {
                if (!isset($title_groups[$t])) {
                    $title_groups[$t] = array();
                }
                $title_groups[$t][] = $e;
            }
        }

        foreach ($title_groups as $norm_title => $group) {
            if (count($group) > 1) {
                foreach ($group as $e) {
                    $findings[] = new WP_AI_Audit_Finding(array(
                        'id'             => 'finding_seo_005_' . $e['id'],
                        'rule_id'        => $this->get_id(),
                        'category'       => $this->get_category(),
                        'severity'       => $this->get_severity(),
                        'entity_id'      => $e['id'],
                        'entity_type'    => isset($e['categories']) ? 'post' : 'page',
                        'entity_title'   => $e['title'],
                        'entity_url'     => isset($e['slug']) ? '/' . $e['slug'] : '',
                        'field_name'     => 'seo_title',
                        'current_value'  => $e['title'],
                        'expected_value' => 'Unique title tag across all published pages',
                        'evidence'       => 'Entity "' . $e['title'] . '" (ID: ' . $e['id'] . ') shares a duplicate title tag with ' . (count($group) - 1) . ' other URL(s).',
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
