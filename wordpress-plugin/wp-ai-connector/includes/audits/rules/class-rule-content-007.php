<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_007 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_007'; }
    public function get_title() { return 'Very Short Page or Post Title'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Vague or single-word titles under 10 characters fail to describe the target topic effectively to searchers or search engines.';
    }
    public function get_remediation() {
        return 'Expand the title tag to at least 10 characters / 2 words to make it descriptive.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $title  = isset($entity['title']) ? trim($entity['title']) : '';
            $len    = mb_strlen($title);
            $words  = count(preg_split('/\s+/', $title));

            if ($status === 'publish' && !empty($title) && ($len < 10 || $words < 2)) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_007_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $title,
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_title',
                    'current_value'  => '"' . $title . '" (' . $len . ' chars, ' . $words . ' words)',
                    'expected_value' => '>= 10 characters and >= 2 words',
                    'evidence'       => 'Title for "' . $title . '" (ID: ' . $entity['id'] . ') is too short (' . $len . ' chars, ' . $words . ' word).',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
