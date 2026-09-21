# SmartShop AI - AI Evaluation Results

## 1. Purpose

This document records the execution results for the SmartShop AI evaluation cases covering FR8, FR9 and FR10.

FR8 - Catalogue-Grounded AI Q&A has been implemented and evaluated.

FR9 - AI Guided Product Recommendations has been implemented and evaluated.

FR10 - Review Summaries remains to be implemented and evaluated.

---

## 2. Evaluation Summary

| AI Feature | Requirement | Cases Prepared | Passed | Failed | Not Run |
|---|---|---:|---:|---:|---:|
| Catalogue Q&A | FR8 | 8 | 8 | 0 | 0 |
| Guided Recommendations | FR9 | 8 | 8 | 0 | 0 |
| Review Summaries | FR10 | 8 | 0 | 0 | 8 |
| **Total** | **FR8-FR10** | **24** | **16** | **0** | **8** |

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

## 6. FR9 Guided Recommendation Results

All eight planned FR9 Guided Product Recommendation evaluation cases were executed.

| ID | Evaluation Focus | Result | Response Time |
|---|---|---|---:|
| FR9-AI-01 | Budget + use case | Pass | 6.864 s |
| FR9-AI-02 | Budget + intended use | Pass | 7.594 s |
| FR9-AI-03 | Category + budget | Pass | 9.724 s |
| FR9-AI-04 | Intended use | Pass | 8.848 s |
| FR9-AI-05 | Budget + category | Pass | 8.235 s |
| FR9-AI-06 | Device requirement | Pass | 7.873 s |
| FR9-AI-07 | No suitable match | Pass | 5.758 s |
| FR9-AI-08 | Non-catalogue request | Pass | 10.171 s |

All eight FR9 cases produced the expected functional behaviour.

The recommendation assistant successfully recommended products stored in the SmartShop catalogue, respected stated customer budgets, considered intended use and product requirements, and provided appropriate explanations.

The assistant also correctly handled requests where no suitable catalogue product was available. It did not invent a gaming laptop under $500 and did not recommend a PlayStation 5 that was not stored in the catalogue.

Seven of the eight recorded FR9 responses were returned within 10 seconds. FR9-AI-08 returned the correct functional response in 10.171 seconds.

Therefore, 87.5% of the recorded FR9 responses were returned within 10 seconds.

---

## 7. FR9 Budget and Catalogue Controls

FR9 includes server-side budget control.

When a customer specifies a maximum budget, the SmartShop backend identifies the budget and filters catalogue products before they are supplied to the AI recommendation service.

Examples tested included:

- Laptop under $800
- Laptop with a budget of $1,000
- Wireless headphones under $100
- Tablet under $400
- Gaming laptop under $500

This control prevents products above the customer's stated maximum budget from being supplied as recommendation candidates.

The recommendation service is also instructed to use only the supplied SmartShop catalogue information and avoid inventing products, prices, stock levels, specifications or unsupported compatibility information.

---

## 8. AI Service Failure Handling

During FR9 testing, the external AI service temporarily returned a 503 UNAVAILABLE response because the model was experiencing high demand.

SmartShop handled the external service failure and returned the controlled fallback message:

"AI recommendations are currently unavailable. Please browse the product catalogue."

This demonstrates controlled fallback behaviour when the external AI service is temporarily unavailable.

---

## 9. FR10 Status

FR10 - Review Summaries has eight prepared evaluation cases.

These cases have not yet been executed because FR10 implementation and integration are still pending.

The existing `review-summary-evaluation.md` file will be used when FR10 is implemented.

---

## 10. Defects and Testing Observations

FR8 testing identified a minor frontend presentation issue involving raw Markdown formatting characters in some AI responses. This did not affect catalogue grounding or factual accuracy.

During FR9 development, budget filtering was strengthened so that stated maximum budgets are enforced by the backend before catalogue products are supplied to the recommendation service.

A temporary external AI service availability error was also observed during FR9 testing. The application's controlled fallback behaviour operated correctly.

No unsupported product recommendation was identified in the final eight FR9 evaluation results.

---

## 11. Current Status

**FR8: Implemented and Evaluated - 8/8 Passed**

**FR9: Implemented and Evaluated - 8/8 Passed**

**FR10: Prepared - Not Run**

A total of 24 AI evaluation cases are defined across FR8-FR10.

Sixteen cases have now been executed across FR8 and FR9, with all 16 producing the expected functional results.

The remaining eight FR10 evaluation cases will be executed after the Review Summaries feature is implemented.