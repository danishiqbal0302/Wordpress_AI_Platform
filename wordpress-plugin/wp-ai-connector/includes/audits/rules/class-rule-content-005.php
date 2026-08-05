<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_005 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_005'; }
    public function get_title() { return 'Skipped Heading Levels / Incorrect Hierarchy'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Skipping heading levels (e.g., jumping directly from H2 to H4 without an intervening H3) breaks logical outline structure for screen reader navigation and SEO crawlers.';
    }
    public function get_remediation() {
        return 'Nest heading tags sequentially (H1 -> H2 -> H3 -> H4) without skipping levels.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $struct = isset($entity['content_structure']) ? $entity['content_structure'] : null;
            $h_list = $struct && isset($struct['heading_list']) ? $struct['heading_list'] : array();

            if ($status === 'publish' && !empty($h_list)) {
                $prev_level = 1;
                $skipped_gaps = array();

                foreach ($h_list as $h) {
                    $curr_level = intval($h['level']);
                    if ($curr_level > $prev_level + 1) {
                        $skipped_gaps[] = 'H' . $prev_level . ' -> H' . $curr_level;
                    }
                    $prev_level = $curr_level;
                }

                if (!empty($skipped_gaps)) {
                    $findings[] = new WP_AI_Audit_Finding(array(
                        'id'             => 'finding_content_005_' . $entity['id'],
                        'rule_id'        => $this->get_id(),
                        'category'       => $this->get_category(),
                        'severity'       => $this->get_severity(),
                        'entity_id'      => $entity['id'],
                        'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                        'entity_title'   => $entity['title'],
                        'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                        'field_name'     => 'post_content',
                        'current_value'  => implode(', ', array_unique($skipped_gaps)),
                        'expected_value' => 'Sequential heading levels (H1 -> H2 -> H3)',
                        'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') skips heading levels: ' . implode(', ', array_unique($skipped_gaps)) . '.',
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
