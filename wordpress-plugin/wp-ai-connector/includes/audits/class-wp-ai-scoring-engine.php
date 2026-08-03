<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(__FILE__) . '/class-wp-ai-scoring-config.php';

class WP_AI_Scoring_Engine {
    /**
     * Compute category scores and weighted overall health score exclusively from findings
     *
     * @param WP_AI_Audit_Finding[] $findings
     * @return array
     */
    public static function calculate_scores(array $findings) {
        $category_weights    = WP_AI_Scoring_Config::get_category_weights();
        $severity_deductions = WP_AI_Scoring_Config::get_severity_deductions();
        $rule_modifiers      = WP_AI_Scoring_Config::get_rule_deduction_modifiers();

        $category_deductions = array(
            'seo_metadata'        => 0,
            'content_quality'     => 0,
            'media_accessibility' => 0,
            'technical_structure' => 0,
        );

        $explainable_deductions = array();

        foreach ($findings as $finding) {
            $cat = $finding->category;
            if (!isset($category_deductions[$cat])) {
                $category_deductions[$cat] = 0;
            }

            // Determine deduction points from rule modifier or severity default
            $points = isset($rule_modifiers[$finding->rule_id])
                ? $rule_modifiers[$finding->rule_id]
                : (isset($severity_deductions[$finding->severity]) ? $severity_deductions[$finding->severity] : 5);

            $category_deductions[$cat] += $points;

            $explainable_deductions[] = array(
                'finding_id'       => $finding->id,
                'rule_id'          => $finding->rule_id,
                'category'         => $cat,
                'severity'         => $finding->severity,
                'entity_title'     => $finding->entity_title,
                'deduction_points' => $points,
                'reason'           => $finding->evidence,
            );
        }

        // Calculate 0-100 Category Scores
        $category_scores = array();
        foreach ($category_deductions as $cat => $total_deduction) {
            $max_cap = isset($max_caps[$cat]) ? $max_caps[$cat] : 100;
            $capped_deduction = min($max_cap, $total_deduction);
            $category_scores[$cat] = max(0, 100 - $capped_deduction);
        }

        // Calculate Weighted Overall Health Score
        $overall_score_raw = 0;
        foreach ($category_weights as $cat => $weight) {
            $cat_score = isset($category_scores[$cat]) ? $category_scores[$cat] : 100;
            $overall_score_raw += ($cat_score * $weight);
        }

        $overall_health_score = round($overall_score_raw);

        return array(
            'overall_health_score' => $overall_health_score,
            'category_scores'      => array(
                'seo_score'       => isset($category_scores['seo_metadata']) ? $category_scores['seo_metadata'] : 100,
                'content_score'   => isset($category_scores['content_quality']) ? $category_scores['content_quality'] : 100,
                'media_score'     => isset($category_scores['media_accessibility']) ? $category_scores['media_accessibility'] : 100,
                'technical_score' => isset($category_scores['technical_structure']) ? $category_scores['technical_structure'] : 100,
            ),
            'scoring_methodology'  => array(
                'weights'               => $category_weights,
                'explainable_deductions'=> $explainable_deductions,
                'total_deduction_count' => count($explainable_deductions),
            ),
        );
    }
}
