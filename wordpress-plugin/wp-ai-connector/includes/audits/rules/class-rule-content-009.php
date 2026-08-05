<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_009 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_009'; }
    public function get_title() { return 'Duplicate Page or Post Titles'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Having multiple published pages or posts with identical titles causes content cannibalization and confuses visitors attempting to find specific topics.';
    }
    public function get_remediation() {
        return 'Ensure every published page and post possesses a unique, distinctive title.';
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
            $t = isset($e['title']) ? trim(mb_strtolower($e['title'])) : '';
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
                        'id'             => 'finding_content_009_' . $e['id'],
                        'rule_id'        => $this->get_id(),
                        'category'       => $this->get_category(),
                        'severity'       => $this->get_severity(),
                        'entity_id'      => $e['id'],
                        'entity_type'    => isset($e['categories']) ? 'post' : 'page',
                        'entity_title'   => $e['title'],
                        'entity_url'     => isset($e['slug']) ? '/' . $e['slug'] : '',
                        'field_name'     => 'post_title',
                        'current_value'  => $e['title'],
                        'expected_value' => 'Unique title across site',
                        'evidence'       => 'Entity "' . $e['title'] . '" (ID: ' . $e['id'] . ') shares a duplicate title with ' . (count($group) - 1) . ' other entity(s).',
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
