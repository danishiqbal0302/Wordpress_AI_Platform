<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Content_010 extends WP_AI_Audit_Rule {
    public function get_id() { return 'CONTENT_010'; }
    public function get_title() { return 'Unformatted Wall of Text'; }
    public function get_category() { return 'content_quality'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Long articles (> 500 words) lacking subheadings or structural paragraph breaks create unreadable walls of text that impair user engagement and readability metrics.';
    }
    public function get_remediation() {
        return 'Break long text sections with H2/H3 subheadings, bullet lists, or shorter paragraphs every 150-200 words.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $wc     = isset($entity['word_count']) ? intval($entity['word_count']) : 0;
            $struct = isset($entity['content_structure']) ? $entity['content_structure'] : null;
            $h_count= $struct && isset($struct['heading_levels']) ? count($struct['heading_levels']) : 0;
            $p_count= $struct && isset($struct['paragraph_count']) ? intval($struct['paragraph_count']) : 0;

            if ($status === 'publish' && $wc > 500 && ($h_count === 0 || $p_count <= 1)) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_content_010_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'post_content',
                    'current_value'  => $wc . ' words with ' . $h_count . ' subheadings',
                    'expected_value' => 'Subheadings & paragraph breaks every 150-200 words',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') contains ' . $wc . ' words with zero subheadings or paragraph breaks.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => false,
                ));
            }
        }

        return $findings;
    }
}
