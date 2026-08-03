<?php
if (!defined('ABSPATH')) {
    exit;
}

require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-rule.php';
require_once dirname(dirname(__FILE__)) . '/class-wp-ai-audit-finding.php';

class WP_AI_Rule_Media_001 extends WP_AI_Audit_Rule {
    public function get_id() { return 'MEDIA_001'; }
    public function get_title() { return 'Missing Image Alternative Text'; }
    public function get_category() { return 'media_accessibility'; }
    public function get_severity() { return 'warning'; }
    public function get_rationale() {
        return 'Alternative text (alt text) is essential for screen reader accessibility (WCAG compliance) and enables search engines to parse image context for Google Image search ranking.';
    }
    public function get_remediation() {
        return 'Provide descriptive, contextually accurate alt text for all media library image assets.';
    }

    public function evaluate(array $context) {
        $findings = array();
        $media_inv = isset($context['media_inventory']) ? $context['media_inventory'] : null;
        if (!$media_inv || !isset($media_inv['sample_items']) || !is_array($media_inv['sample_items'])) {
            return $findings;
        }

        foreach ($media_inv['sample_items'] as $media) {
            $has_alt = isset($media['has_alt']) ? (bool)$media['has_alt'] : false;
            $alt     = isset($media['alt_text']) ? trim($media['alt_text']) : '';

            if (!$has_alt || empty($alt)) {
                $findings[] = new WP_AI_Audit_Finding(array(
                    'id'             => 'finding_media_001_' . $media['id'],
                    'rule_id'        => $this->get_id(),
                    'category'       => $this->get_category(),
                    'severity'       => $this->get_severity(),
                    'entity_id'      => $media['id'],
                    'entity_type'    => 'attachment',
                    'entity_title'   => $media['title'],
                    'entity_url'     => isset($media['url']) ? $media['url'] : '',
                    'field_name'     => '_wp_attachment_image_alt',
                    'current_value'  => '(empty alt text)',
                    'expected_value' => 'Descriptive text string',
                    'evidence'       => 'Media image attachment "' . $media['title'] . '" (ID: ' . $media['id'] . ') is missing alternative (alt) text.',
                    'rationale'      => $this->get_rationale(),
                    'remediation'    => $this->get_remediation(),
                    'auto_fixable'   => true,
                ));
            }
        }

        return $findings;
    }
}
