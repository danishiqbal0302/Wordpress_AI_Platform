<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_010 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_010'; }
    public function get_title() { return 'Missing Twitter/X Card Metadata'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'info'; }
    public function get_rationale() {
        return 'Twitter Card meta tags (twitter:card, twitter:title, twitter:description) ensure rich media card previews are generated when content is shared on Twitter/X.';
    }
    public function get_remediation() {
        return 'Enable Twitter Card metadata generation in your active SEO plugin.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $tw_title = isset($entity['twitter_title']) ? trim($entity['twitter_title']) : '';
            $tw_desc  = isset($entity['twitter_description']) ? trim($entity['twitter_description']) : '';

            if ($status === 'publish' && (empty($tw_title) || empty($tw_desc))) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_010_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'twitter_metadata',
                    'current_value'  => '(missing twitter card title or description)',
                    'expected_value' => 'Populated twitter:title and twitter:description tags',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') does not specify Twitter/X Card metadata.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
