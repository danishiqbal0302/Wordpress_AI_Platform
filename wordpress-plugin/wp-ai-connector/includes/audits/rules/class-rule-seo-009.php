<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_009 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_009'; }
    public function get_title() { return 'Missing Open Graph Social Metadata'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Open Graph tags (og:title, og:description, og:image) control how content is rendered when shared on Facebook, LinkedIn, Slack, and social platforms.';
    }
    public function get_remediation() {
        return 'Configure Open Graph titles, descriptions, and featured social share image assets in your SEO plugin settings.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status = isset($entity['status']) ? $entity['status'] : 'publish';
            $og_title = isset($entity['og_title']) ? trim($entity['og_title']) : '';
            $og_desc  = isset($entity['og_description']) ? trim($entity['og_description']) : '';
            $og_img   = isset($entity['og_image']) ? trim($entity['og_image']) : '';

            if ($status === 'publish' && (empty($og_title) || empty($og_desc) || empty($og_img))) {
                $missing_parts = array();
                if (empty($og_title)) { $missing_parts[] = 'og:title'; }
                if (empty($og_desc))  { $missing_parts[] = 'og:description'; }
                if (empty($og_img))   { $missing_parts[] = 'og:image'; }

                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_009_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'og_metadata',
                    'current_value'  => 'Missing: ' . implode(', ', $missing_parts),
                    'expected_value' => 'Complete og:title, og:description, and og:image meta tags',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') is missing Open Graph tags: ' . implode(', ', $missing_parts) . '.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
