# SmartShop AI - AI Evaluation Results

## 1. Purpose

This document records the execution results for the SmartShop AI evaluation cases covering FR8, FR9 and FR10.

FR8 - Catalogue-Grounded AI Q&A has now been implemented and evaluated. FR9 - Guided Recommendations and FR10 - Review Summaries remain to be implemented and evaluated.

---

## 2. Evaluation Summary

| AI Feature | Requirement | Cases Prepared | Passed | Failed | Not Run |
|---|---|---:|---:|---:|---:|
| Catalogue Q&A | FR8 | 8 | 8 | 0 | 0 |
| Guided Recommendations | FR9 | 8 | 0 | 0 | 8 |
| Review Summaries | FR10 | 8 | 0 | 0 | 8 |
| **Total** | **FR8-FR10** | **24** | **8** | **0** | **16** |

---

## 3. Evaluation Measures

The AI evaluation measures:

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

The evaluation uses the targets defined for the SmartShop AI project:

- Every recommendation must map to a product stored in the SmartShop catalogue.
- At least 80% recommendation relevance should be achieved across the agreed evaluation cases.
- Unsupported price or stock claims are not acceptable.
- At least 90% of available-service AI responses should be returned within 10 seconds.
- A controlled fallback should be provided when the AI service fails.

---

## 5. FR8 Catalogue Q&A Results

All eight planned FR8 catalogue Q&A evaluation cases were executed successfully.

| ID | Evaluation Focus | Result | Response Time |
|---|---|---|---:|
| FR8-AI-01 | Price accuracy | Pass | 3.05 s |
| FR8-AI-02 | Stock accuracy | Pass | 3.51 s |
| FR8-AI-03 | Catalogue grounding | Pass | 3.27 s |
| FR8-AI-04 | Product retrieval | Pass | 6.78 s |
| FR8-AI-05 | Unsupported product handling | Pass | 4.04 s |
| FR8-AI-06 | Numerical accuracy | Pass | 3.83 s |
| FR8-AI-07 | Product comparison | Pass | 4.96 s |
| FR8-AI-08 | Unsupported information | Pass | 3.45 s |

The average response time across the eight FR8 evaluation cases was approximately 4.11 seconds.

All eight responses were returned within the 10-second response-time target.

The assistant correctly used catalogue-grounded product information for prices, stock, specifications, product retrieval and comparison. It also correctly rejected a product that was not present in the catalogue and did not invent unsupported warranty information.

Screenshot evidence was captured during frontend testing.

A minor presentation issue was observed where Markdown formatting characters such as ** were displayed as plain text in some longer AI responses. This did not affect catalogue grounding or response accuracy and can be addressed as a frontend presentation improvement.

---

## 6. FR9 and FR10 Status

FR9 - Guided Product Recommendations has 8 prepared evaluation cases. These cases have not yet been executed because FR9 implementation and integration are still pending.

FR10 - Review Summaries has 8 prepared evaluation cases. These cases have not yet been executed because FR10 implementation and integration are still pending.

The existing `recommendation-evaluation.md` and `review-summary-evaluation.md` files will be used when these features are implemented.

---

## 7. Defects and Retesting

Any AI evaluation failure will be documented before correction.

After a defect is corrected:

1. The failed evaluation case will be executed again.
2. The new AI output will be compared with the expected behaviour.
3. Related AI cases will be checked for regression issues.
4. The retest result will be recorded.

The FR8 evaluation identified a minor frontend presentation issue involving raw Markdown formatting characters. No catalogue-grounding or factual-accuracy failures were identified during the eight FR8 evaluation cases.

---

## 8. Current Status

**FR8: Implemented and Evaluated - 8/8 Passed**

**FR9: Prepared - Not Run**

**FR10: Prepared - Not Run**

A total of 24 AI evaluation cases are currently defined across FR8-FR10. Eight FR8 cases have been executed and passed, while the remaining 16 FR9 and FR10 cases will be executed after their respective features are implemented.