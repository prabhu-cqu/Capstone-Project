# SmartShop AI - AI Evaluation Results

## 1. Purpose

This document records the execution results for the SmartShop AI evaluation cases covering FR8, FR9 and FR10.

The evaluation will be completed after the external AI service is integrated with the SmartShop AI backend.

---

## 2. Evaluation Summary

| AI Feature | Requirement | Cases Prepared | Passed | Failed | Not Run |
|---|---|---:|---:|---:|---:|
| Catalogue Q&A | FR8 | 8 | 0 | 0 | 8 |
| Guided Recommendations | FR9 | 8 | 0 | 0 | 8 |
| Review Summaries | FR10 | 8 | 0 | 0 | 8 |
| **Total** | **FR8-FR10** | **24** | **0** | **0** | **24** |

---

## 3. Evaluation Measures

The AI evaluation will measure:

- Catalogue grounding
- Product information accuracy
- Recommendation relevance
- Mapping recommendations to stored products
- Review-summary faithfulness
- Unsupported claims
- Response time
- Fallback behaviour

---

## 4. Project Targets

The evaluation will use the targets defined for the SmartShop AI project:

- Every recommendation must map to a product stored in the SmartShop catalogue.
- At least 80% recommendation relevance should be achieved across the agreed evaluation cases.
- Unsupported price or stock claims are not acceptable.
- At least 90% of available-service AI responses should be returned within 10 seconds.
- A controlled fallback should be provided when the AI service fails.

---

## 5. Detailed Results

Detailed results will be recorded after execution of:

- `catalogue-qa-evaluation.md`
- `recommendation-evaluation.md`
- `review-summary-evaluation.md`

Actual AI responses, response times, grounding results, relevance results, unsupported claims and Pass/Fail outcomes will be recorded during testing.

---

## 6. Defects and Retesting

Any AI evaluation failure will be documented before correction.

After a defect is corrected:

1. The failed evaluation case will be executed again.
2. The new AI output will be compared with the expected behaviour.
3. Related AI cases will be checked for regression issues.
4. The retest result will be recorded.

---

## 7. Current Status

**Prepared - Not Run**

A total of 24 AI evaluation cases have been prepared across FR8-FR10.

Execution will begin after the external AI service and required AI functionality have been integrated into SmartShop AI.