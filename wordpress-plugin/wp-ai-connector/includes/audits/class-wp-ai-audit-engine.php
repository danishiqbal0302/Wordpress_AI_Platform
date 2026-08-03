<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(__FILE__) . '/class-wp-ai-audit-rule.php';
require_once dirname(__FILE__) . '/class-wp-ai-audit-finding.php';
require_once dirname(__FILE__) . '/class-wp-ai-scoring-config.php';
require_once dirname(__FILE__) . '/class-wp-ai-scoring-engine.php';

// Include default modular rules
require_once dirname(__FILE__) . '/rules/class-rule-seo-001.php';
require_once dirname(__FILE__) . '/rules/class-rule-seo-002.php';
require_once dirname(__FILE__) . '/rules/class-rule-content-001.php';
require_once dirname(__FILE__) . '/rules/class-rule-media-001.php';
require_once dirname(__FILE__) . '/rules/class-rule-tech-001.php';

class WP_AI_Audit_Engine {
    private $rules = array();

    public function __construct() {
        $this->register_default_rules();
    }

    /**
     * Register core default rules
     */
    private function register_default_rules() {
        $this->register_rule(new WP_AI_Rule_SEO_001());
        $this->register_rule(new WP_AI_Rule_SEO_002());
        $this->register_rule(new WP_AI_Rule_Content_001());
        $this->register_rule(new WP_AI_Rule_Media_001());
        $this->register_rule(new WP_AI_Rule_Tech_001());

        // Allow third-party or extended rule registration via WordPress filter
        $custom_rules = apply_filters('wp_ai_register_audit_rules', array());
        if (is_array($custom_rules)) {
            foreach ($custom_rules as $rule) {
                if ($rule instanceof WP_AI_Audit_Rule) {
                    $this->register_rule($rule);
                }
            }
        }
    }

    /**
     * Register a new audit rule instance
     * @param WP_AI_Audit_Rule $rule
     */
    public function register_rule(WP_AI_Audit_Rule $rule) {
        $this->rules[$rule->get_id()] = $rule;
    }

    /**
     * Execute full audit evaluation against collected inventory data
     *
     * @param array $context Verified site inventory data
     * @return array Complete structured audit report
     */
    public function run_audit(array $context) {
        $all_findings = array();
        $rules_evaluated = array();

        foreach ($this->rules as $rule_id => $rule) {
            $rules_evaluated[] = array(
                'rule_id'  => $rule->get_id(),
                'title'    => $rule->get_title(),
                'category' => $rule->get_category(),
                'severity' => $rule->get_severity(),
            );

            // Execute pure rule evaluation (Rules do NOT calculate scores)
            $findings = $rule->evaluate($context);
            if (is_array($findings)) {
                foreach ($findings as $f) {
                    if ($f instanceof WP_AI_Audit_Finding) {
                        $all_findings[] = $f;
                    }
                }
            }
        }

        // Delegate score calculation exclusively to centralized scoring engine
        $scores_data = WP_AI_Scoring_Engine::calculate_scores($all_findings);

        // Map findings to array format
        $findings_array = array();
        foreach ($all_findings as $f) {
            $findings_array[] = $f->to_array();
        }

        return array(
            'overall_health_score' => $scores_data['overall_health_score'],
            'category_scores'      => $scores_data['category_scores'],
            'rules_evaluated_count'=> count($rules_evaluated),
            'total_findings_count' => count($findings_array),
            'scoring_methodology'  => $scores_data['scoring_methodology'],
            'findings'             => $findings_array,
            'rules_evaluated'      => $rules_evaluated,
            'timestamp'            => time(),
        );
    }
}
