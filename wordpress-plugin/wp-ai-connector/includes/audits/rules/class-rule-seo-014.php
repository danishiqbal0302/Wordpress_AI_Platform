<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_SEO_014 extends WP_AI_Audit_Rule {
    public function get_id() { return 'SEO_014'; }
    public function get_title() { return 'Multiple SEO Plugins Active Simultaneously'; }
    public function get_category() { return 'seo_metadata'; }
    public function get_severity() { return 'critical'; }
    public function get_rationale() {
        return 'Running multiple SEO plugins simultaneously (e.g., Yoast SEO and Rank Math) generates duplicate title tags, double meta descriptions, conflicting canonical links, and sitemap errors.';
    }
    public function get_remediation() {
        return 'Deactivate all redundant SEO plugins so that only one primary SEO plugin is active.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $site_settings = isset($context['site_settings']) ? $context['site_settings'] : null;

        if ($site_settings && isset($site_settings['active_seo_plugins_count']) && $site_settings['active_seo_plugins_count'] > 1) {
            $plugin_names = isset($site_settings['active_seo_plugins']) ? implode(', ', $site_settings['active_seo_plugins']) : 'Multiple SEO plugins';

            $findings[] = new WP_AI_Audit_Finding(array(
                'id'             => 'finding_seo_014_system',
                'rule_id'        => $this->get_id(),
                'category'       => $this->get_category(),
                'severity'       => $this->get_severity(),
                'entity_id'      => 0,
                'entity_type'    => 'page',
                'entity_title'   => 'WordPress Environment',
                'entity_url'     => '/wp-admin/plugins.php',
                'field_name'     => 'active_plugins',
                'current_value'  => $plugin_names,
                'expected_value' => 'Exactly 1 active SEO plugin',
                'evidence'       => 'Multiple SEO plugins are active simultaneously: ' . $plugin_names . '.',
                'rationale'      => $this->get_rationale(),
                'remediation'    => $this->get_remediation(),
                'auto_fixable'   => false,
            ));
        }

        return $findings;
    }
}
