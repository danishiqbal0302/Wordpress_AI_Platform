<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_013 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_013'; }
    public function get_title() { return 'Indexability Metadata Directive Issues'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Accidentally applying "noindex" or "nofollow" robots meta tags to published pages prevents Google and search engine bots from indexing your primary site content.';
    }
    public function get_remediation() {
        return 'Remove "noindex" or "nofollow" directives from published pages that should be indexed in search results.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $entities = array_merge(
            isset($context['pages']) ? $context['pages'] : array(),
            isset($context['posts']) ? $context['posts'] : array()
        );

        foreach ($entities as $entity) {
            $status     = isset($entity['status']) ? $entity['status'] : 'publish';
            $is_noindex  = isset($entity['is_noindex']) ? (bool)$entity['is_noindex'] : false;
            $is_nofollow = isset($entity['is_nofollow']) ? (bool)$entity['is_nofollow'] : false;

            if ($status === 'publish' && ($is_noindex || $is_nofollow)) {
                $directives = array();
                if ($is_noindex)  { $directives[] = 'noindex'; }
                if ($is_nofollow) { $directives[] = 'nofollow'; }

                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_seo_013_' . $entity['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $entity['id'],
                    'entity_type'    => isset($entity['categories']) ? 'post' : 'page',
                    'entity_title'   => $entity['title'],
                    'entity_url'     => isset($entity['slug']) ? '/' . $entity['slug'] : '',
                    'field_name'     => 'robots_meta',
                    'current_value'  => implode(', ', $directives),
                    'expected_value' => 'index, follow (for published content)',
                    'evidence'       => 'Published entity "' . $entity['title'] . '" (ID: ' . $entity['id'] . ') explicitly blocks search engines with ' . implode(', ', $directives) . ' directive(s).',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
