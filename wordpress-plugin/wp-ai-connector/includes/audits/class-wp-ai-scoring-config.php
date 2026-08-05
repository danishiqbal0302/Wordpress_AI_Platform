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
            'SEO_004'     => 12, // Missing SEO Title Tag
            'SEO_005'     => 10, // Duplicate SEO Titles Across Entities
            'SEO_006'     => 8,  // Duplicate Meta Descriptions
            'SEO_007'     => 5,  // Suboptimal Meta Description Length
            'SEO_008'     => 6,  // Missing Canonical URL Tag
            'SEO_009'     => 4,  // Missing Open Graph Social Metadata
            'SEO_010'     => 3,  // Missing Twitter/X Card Metadata
            'SEO_011'     => 5,  // Poor Permalink Slug Quality
            'SEO_012'     => 12, // Duplicate Permalink Slugs
            'SEO_013'     => 15, // Indexability Metadata Directive Issues
            'SEO_014'     => 15, // Multiple SEO Plugins Active Simultaneously
            'SEO_015'     => 15, // SEO Provider Global Configuration Inconsistency
            'CONTENT_001' => 12, // Thin Content Body (< 300 words)
            'CONTENT_002' => 15, // Empty Page Body (0 words)
            'CONTENT_003' => 12, // Missing H1 Heading Element
            'CONTENT_004' => 6,  // Multiple H1 Heading Elements
            'CONTENT_005' => 6,  // Skipped Heading Levels / Incorrect Hierarchy
            'CONTENT_006' => 5,  // Excessively Long Page or Post Title (> 70 chars)
            'CONTENT_007' => 5,  // Very Short Page or Post Title (< 10 chars)
            'CONTENT_008' => 4,  // Missing Introductory Lead Paragraph
            'CONTENT_009' => 12, // Duplicate Page or Post Titles Across Entities
            'CONTENT_010' => 6,  // Unformatted Wall of Text
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
