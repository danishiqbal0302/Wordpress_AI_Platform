<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_012 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_012'; }
    public function get_title() { return 'Duplicate Permalink Slugs'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Duplicate permalink slugs across different post types or page hierarchies cause routing ambiguity and indexation conflicts in WordPress.';
    }
    public function get_remediation() {
        return 'Update permalink slugs so every published page, post, and custom post type possesses a unique URL slug.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        $slug_groups = array();
        foreach ($entities as $e) {
            $slug = isset($e['slug']) ? trim(mb_strtolower($e['slug'])) : '';
            if (!empty($slug)) {
                if (!isset($slug_groups[$slug])) {
                    $slug_groups[$slug] = array();
                }
                $slug_groups[$slug][] = $e;
            }
        }

        foreach ($slug_groups as $slug => $group) {
            if (count($group) > 1) {
                foreach ($group as $e) {
                    $findings[] = new WP_AI_Audit_Finding(array(
                        'id'             => 'finding_seo_012_' . $e['id'],
                        'rule_id'        => $this->get_id(),
                        'category'       => $this->get_category(),
                        'severity'       => $this->get_severity(),
                        'entity_id'      => $e['id'],
                        'entity_type'    => isset($e['categories']) ? 'post' : 'page',
                        'entity_title'   => $e['title'],
                        'entity_url'     => '/' . $slug,
                        'field_name'     => 'post_name',
                        'current_value'  => $slug,
                        'expected_value' => 'Unique slug across site',
                        'evidence'       => 'Entity "' . $e['title'] . '" (ID: ' . $e['id'] . ') shares a duplicate permalink slug "' . $slug . '" with ' . (count($group) - 1) . ' other URL(s).',
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
