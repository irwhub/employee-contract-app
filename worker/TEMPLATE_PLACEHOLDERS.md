# Google Docs Template Placeholders

Worker fills placeholders in Google Docs using `{{key}}` format.

## Basic
- `{{employee_name}}`
- `{{contract_type}}`
- `{{customer_name}}`
- `{{victim_or_insured}}`
- `{{beneficiary_name}}`
- `{{customer_gender}}`
- `{{customer_phone}}`
- `{{customer_dob}}`
- `{{customer_address}}`
- `{{relation_to_party}}`

## Accident
- `{{accident_date}}`
- `{{accident_location}}`
- `{{accident_summary}}`

## Delegation Checklist
- `{{delegation_auto_insurance}}`
- `{{delegation_personal_insurance}}`
- `{{delegation_workers_comp}}`
- `{{delegation_disability_pension}}`
- `{{delegation_employer_liability}}`
- `{{delegation_school_safety}}`
- `{{delegation_other}}`
- `{{delegation_other_text}}`

## Fee
- `{{upfront_fee_ten_thousand}}`
- `{{admin_fee_percent}}`
- `{{adjuster_fee_percent}}`
- `{{fee_notes}}`

## Terms / Signature
- `{{content}}`
- `{{consent_personal_info}}`
- `{{consent_required_terms}}`

## Meta
- `{{now_date}}`

## Notes
- Boolean fields are replaced as:
  - checked/true: `동의`
  - unchecked/false: `미동의`
- For checkbox-like output in template, place text blocks like:
  - `자동차보험: {{delegation_auto_insurance}}`
  - Then style as needed in Google Docs.
