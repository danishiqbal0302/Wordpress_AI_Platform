# Audit Framework Specification & Architecture

> [!IMPORTANT]
> **Authority & Strategy Alignment**: This document defines the production-grade, modular, rule-based auditing subsystem for the WordPress AI Platform. The auditing framework adheres strictly to the principles of deterministic evaluation, explainable scoring, read-only observation, and total decoupling between evaluation rules and scoring logic.

---

## 1. High-Level Subsystem Architecture

```
+---------------------------------------------------------------------------------------------------+
|                                  WordPress AI Auditing Subsystem                                  |
|                                                                                                   |
|  +---------------------------+   +-------------------------------+   +-------------------------+  |
|  | Verified Data Collector   |   | Decoupled Audit Evaluators    |   | Centralized Scoring     |  |
|  | - Pages, Posts & CPTs     |   | (WP_AI_Audit_Rule)            |   | Config & Engine         |  |
|  | - Gutenberg Blocks        |   | - SEO_001 (Missing Meta)      |   | (WP_AI_Scoring_Config)  |  |
|  | - Classic Editor HTML     |   | - SEO_002 (Title Length)      |   | - Category Weights      |  |
|  | - Media Attachments       |   | - CONTENT_001 (Thin Content)  |   | - Deduction Modifiers   |  |
|  | - ACF Custom Fields       |   | - MEDIA_001 (Alt Text)        |   | - Explainable Scores    |  |
|  | - Href Links              |   | - TECH_001 (Duplicate Title)  |   |                         |  |
|  +-------------+-------------+   +---------------+---------------+   +------------+------------+  |
+----------------|---------------------------------|--------------------------------|---------------+
                 v                                 v                                v
+---------------------------------------------------------------------------------------------------+
|                                      Audit Report DTO Output                                      |
|  - overall_health_score (0-100)                                                                   |
|  - category_scores (seo_score, content_score, media_score, technical_score)                       |
|  - findings (Rule ID, Category, Severity, Evidence, Rationale, Remediation, Entity Info)         |
|  - scoring_methodology (Category Weights & Itemized Explainable Deductions)                       |
+---------------------------------------------------------------------------------------------------+
```

---

## 2. Decoupled Rule Architecture (`WP_AI_Audit_Rule`)

Audit rules act **exclusively as deterministic evaluators**. Rules inspect verified site data and return structured findings containing concrete evidence and remediation guidance.

> [!CAUTION]
> **Rule Decoupling Directive**: Audit rules MUST NEVER assign deduction points, calculate scores, or alter category weights. All scoring parameters are reserved strictly for the Centralized Scoring Engine.

### Base Interface Definition (`class-wp-ai-audit-rule.php`)
```php
abstract class WP_AI_Audit_Rule {
    abstract public function get_id();          // Permanent ID (e.g., SEO_001)
    abstract public function get_title();       // Human-readable title
    abstract public function get_category();    // seo_metadata | content_quality | media_accessibility | technical_structure
    abstract public function get_severity();    // critical | warning | info
    abstract public function get_rationale();   // Why this check matters
    abstract public function get_remediation(); // Actionable suggestion
    abstract public function evaluate(array $context); // Returns WP_AI_Audit_Finding[]
}
```

---

## 3. Centralized & Configurable Scoring Engine

All scoring parameters, category weights, and deduction mappings are centralized inside `class-wp-ai-scoring-config.php` and computed by `class-wp-ai-scoring-engine.php`.

### Category Weights Configuration
$$\text{Overall Health Score} = (0.35 \times \text{SEO}) + (0.30 \times \text{Content}) + (0.20 \times \text{Media}) + (0.15 \times \text{Technical})$$

| Category | Weight | Key Audit Rules Evaluated |
|---|---|---|
| `seo_metadata` | 35% | `SEO_001` (Missing Meta Desc), `SEO_002` (Title Length Warning), `SEO_003` (Focus Keyword) |
| `content_quality` | 30% | `CONTENT_001` (Thin Content < 300 words), `CONTENT_002` (Heading Hierarchy Skip) |
| `media_accessibility` | 20% | `MEDIA_001` (Missing Image Alt Text) |
| `technical_structure` | 15% | `TECH_001` (Duplicate Page Title), `TECH_002` (Empty ACF Fields), `LINK_001` (Orphan Page) |

### Severity Deduction Table
| Severity Level | Default Deduction | Rule Specific Modifier Overrides |
|---|---|---|
| **Critical** | 12 points | `TECH_001` = -15, `CONTENT_001` = -12, `SEO_001` = -10 |
| **Warning** | 6 points | `CONTENT_002` = -6, `SEO_002` = -5, `MEDIA_001` = -5 |
| **Info** | 2 points | `TECH_002` = -4 |

---

## 4. Permanent Rule Catalog

| Permanent Rule ID | Category | Title | Default Severity |
|---|---|---|---|
| `SEO_001` | `seo_metadata` | Missing Meta Description | `critical` |
| `SEO_002` | `seo_metadata` | Suboptimal Title Length | `warning` |
| `SEO_003` | `seo_metadata` | Missing Focus Keyword | `warning` |
| `SEO_004` | `seo_metadata` | Missing SEO Title Tag | `critical` |
| `SEO_005` | `seo_metadata` | Duplicate SEO Titles Across Entities | `critical` |
| `SEO_006` | `seo_metadata` | Duplicate Meta Descriptions Across Entities | `critical` |
| `SEO_007` | `seo_metadata` | Suboptimal Meta Description Length | `warning` |
| `SEO_008` | `seo_metadata` | Missing Canonical URL Tag | `warning` |
| `SEO_009` | `seo_metadata` | Missing Open Graph Social Metadata | `warning` |
| `SEO_010` | `seo_metadata` | Missing Twitter/X Card Metadata | `info` |
| `SEO_011` | `seo_metadata` | Poor Permalink Slug Quality | `warning` |
| `SEO_012` | `seo_metadata` | Duplicate Permalink Slugs | `critical` |
| `SEO_013` | `seo_metadata` | Indexability Metadata Directive Issues | `critical` |
| `SEO_014` | `seo_metadata` | Multiple SEO Plugins Active Simultaneously | `critical` |
| `SEO_015` | `seo_metadata` | SEO Provider Global Configuration Inconsistency | `critical` |
| `CONTENT_001` | `content_quality` | Thin Content Body (< 300 words) | `critical` |
| `CONTENT_002` | `content_quality` | Empty Page Body (0 words) | `critical` |
| `CONTENT_003` | `content_quality` | Missing H1 Heading Element | `critical` |
| `CONTENT_004` | `content_quality` | Multiple H1 Heading Elements | `warning` |
| `CONTENT_005` | `content_quality` | Skipped Heading Levels / Incorrect Hierarchy | `warning` |
| `CONTENT_006` | `content_quality` | Excessively Long Page or Post Title (> 70 chars) | `warning` |
| `CONTENT_007` | `content_quality` | Very Short Page or Post Title (< 10 chars) | `warning` |
| `CONTENT_008` | `content_quality` | Missing Introductory Lead Paragraph | `warning` |
| `CONTENT_009` | `content_quality` | Duplicate Page or Post Titles Across Entities | `critical` |
| `CONTENT_010` | `content_quality` | Unformatted Wall of Text (> 500 words without subheadings) | `warning` |
| `MEDIA_001` | `media_accessibility` | Missing Image Alternative Text | `warning` |
| `TECH_001` | `technical_structure` | Duplicate Page Title | `critical` |
| `TECH_002` | `technical_structure` | Empty ACF Field on Published Entity | `info` |
| `LINK_001` | `technical_structure` | Orphan Page (Zero Inbound Href Links) | `warning` |

---

## 5. Adding New Audit Rules

Adding a new audit rule requires zero modifications to the core engine loop:

1. Create a new file in `wordpress-plugin/wp-ai-connector/includes/audits/rules/class-rule-XYZ.php`.
2. Extend `WP_AI_Audit_Rule` and implement `get_id()`, `get_title()`, `get_category()`, `get_severity()`, `get_rationale()`, `get_remediation()`, and `evaluate($context)`.
3. Register the instance in `WP_AI_Audit_Engine` or via WordPress filter `wp_ai_register_audit_rules`.
4. (Optional) Add custom deduction points to `WP_AI_Scoring_Config::get_rule_deduction_modifiers()`.
