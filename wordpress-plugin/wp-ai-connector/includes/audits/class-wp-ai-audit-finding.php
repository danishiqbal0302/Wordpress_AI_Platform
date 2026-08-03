<?php
if (!defined('ABSPATH')) {
    exit;
}

class WP_AI_Audit_Finding {
    public $id;
    public $rule_id;
    public $category;
    public $severity;
    public $entity_id;
    public $entity_type;
    public $entity_title;
    public $entity_url;
    public $field_name;
    public $current_value;
    public $expected_value;
    public $evidence;
    public $rationale;
    public $remediation;
    public $auto_fixable;

    public function __construct(array $data) {
        $this->id             = isset($data['id']) ? $data['id'] : 'finding_' . uniqid();
        $this->rule_id        = isset($data['rule_id']) ? $data['rule_id'] : 'UNKNOWN_000';
        $this->category       = isset($data['category']) ? $data['category'] : 'technical_structure';
        $this->severity       = isset($data['severity']) ? $data['severity'] : 'warning';
        $this->entity_id      = isset($data['entity_id']) ? intval($data['entity_id']) : 0;
        $this->entity_type    = isset($data['entity_type']) ? $data['entity_type'] : 'page';
        $this->entity_title   = isset($data['entity_title']) ? $data['entity_title'] : '';
        $this->entity_url     = isset($data['entity_url']) ? $data['entity_url'] : '';
        $this->field_name     = isset($data['field_name']) ? $data['field_name'] : '';
        $this->current_value  = isset($data['current_value']) ? $data['current_value'] : '';
        $this->expected_value = isset($data['expected_value']) ? $data['expected_value'] : '';
        $this->evidence       = isset($data['evidence']) ? $data['evidence'] : '';
        $this->rationale      = isset($data['rationale']) ? $data['rationale'] : '';
        $this->remediation    = isset($data['remediation']) ? $data['remediation'] : '';
        $this->auto_fixable   = isset($data['auto_fixable']) ? (bool)$data['auto_fixable'] : false;
    }

    public function to_array() {
        return array(
            'id'             => $this->id,
            'rule_id'        => $this->rule_id,
            'category'       => $this->category,
            'severity'       => $this->severity,
            'entity_id'      => $this->entity_id,
            'entity_type'    => $this->entity_type,
            'entity_title'   => $this->entity_title,
            'entity_url'     => $this->entity_url,
            'field_name'     => $this->field_name,
            'current_value'  => $this->current_value,
            'expected_value' => $this->expected_value,
            'evidence'       => $this->evidence,
            'rationale'      => $this->rationale,
            'remediation'    => $this->remediation,
            'auto_fixable'   => $this->auto_fixable,
        );
    }
}
