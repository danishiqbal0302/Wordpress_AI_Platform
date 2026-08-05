<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_015 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_015'; }
    public function get_title() { return 'SEO Provider Global Configuration Inconsistency'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Discouraging search engines from indexing the site in WordPress Reading Settings (blog_public = 0) overrides all page-level SEO configurations, causing complete site de-indexation.';
    }
    public function get_remediation() {
        return 'Uncheck "Discourage search engines from indexing this site" in WordPress Admin > Settings > Reading.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $site_settings = isset($context['site_settings']) ? $context['site_settings'] : null;

        if ($site_settings && isset($site_settings['blog_public']) && $site_settings['blog_public'] === 0) {
            $findings[] = new WP_AI_Audit_Finding(array(
                'id'             => 'finding_seo_015_system',
                'rule_id'        => $this->get_id(),
                'category'       => $this->get_category(),
                'severity'       => $this->get_severity(),
                'entity_id'      => 0,
                'entity_type'    => 'page',
                'entity_title'   => 'WordPress Reading Settings',
                'entity_url'     => '/wp-admin/options-reading.php',
                'field_name'     => 'blog_public',
                'current_value'  => '0 (Search Engines Discouraged)',
                'expected_value' => '1 (Search Engines Allowed)',
                'evidence'       => 'WordPress reading setting "blog_public" is set to 0 ("Discourage search engines from indexing this site").',
                'rationale'      => $this->get_rationale(),
                'remediation'    => $this->get_remediation(),
                'auto_fixable'   => true,
            ));
        }

        return $findings;
    }
}
