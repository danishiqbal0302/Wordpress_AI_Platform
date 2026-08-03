<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Scoring_Config {
    /**
     * Centralized Category Weights for Overall Health Score Calculation
     * Total sum equals 1.0 (100%)
     */
    public static function get_category_weights() {
        return array(
            'seo_metadata'               => 0.35, // 35% Weight
            'content_quality'            => 0.30, // 30% Weight
            'media_accessibility'        => 0.20, // 20% Weight
            'technical_structure'        => 0.15, // 15% Weight
        );
    }

    /**
     * Centralized Deduction Points per Severity Level
     */
    public static function get_severity_deductions() {
        return array(
            'critical' => 12,
            'warning'  => 6,
            'info'     => 2,
        );
    }

    /**
     * Permanent Rule-Specific Deduction Modifiers (Overrides severity default if specified)
     */
    public static function get_rule_deduction_modifiers() {
        return array(
            'SEO_001'     => 10, // Missing Meta Description
            'SEO_002'     => 5,  // Suboptimal Title Length
            'SEO_003'     => 4,  // Missing Focus Keyword
            'CONTENT_001' => 12, // Thin Content Body
            'CONTENT_002' => 6,  // Heading Hierarchy Skip
            'MEDIA_001'   => 5,  // Missing Alt Text
            'TECH_001'    => 15, // Duplicate Page Title
            'TECH_002'    => 4,  // Empty ACF Field
            'LINK_001'    => 8,  // Orphan Page
        );
    }

    /**
     * Maximum Score Deduction Cap per Category (to prevent score underflows)
     */
    public static function get_max_category_deductions() {
        return array(
            'seo_metadata'        => 100,
            'content_quality'     => 100,
            'media_accessibility' => 100,
            'technical_structure' => 100,
        );
    }
}
