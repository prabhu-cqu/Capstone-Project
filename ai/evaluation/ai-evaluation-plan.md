# SmartShop AI - AI Evaluation Plan

## 1. Purpose

This document defines how the AI features of SmartShop AI will be evaluated during development and testing.

The evaluation is designed to verify that AI-generated assistance is grounded in approved SmartShop catalogue and review data, provides relevant results, avoids unsupported claims and behaves appropriately when the AI service is unavailable.

---

## 2. AI Features to Evaluate

The project evaluates three AI capabilities:

1. FR8 - Catalogue-Grounded AI Q&A
2. FR9 - AI Guided Product Recommendations
3. FR10 - AI Customer Review Summaries

---

## 3. Evaluation Areas

| Evaluation Area | What Will Be Checked | Status |
|---|---|---|
| Catalogue Grounding | AI responses use products and information available in the SmartShop catalogue | Cases Prepared |
| Recommendation Relevance | Recommendations match the user's stated needs, budget and intended use | Cases Prepared |
| Product Accuracy | Product information matches approved catalogue information | Cases Prepared |
| Response Time | AI responses meet the agreed project response-time target | Cases Prepared |
| Unsupported Claims | AI does not invent unsupported price, stock, product or review information | Cases Prepared |
| Fallback Behaviour | The system provides a controlled response when the AI service is unavailable | Cases Prepared |
| Review Summary Faithfulness | AI summaries accurately represent approved source reviews | Cases Prepared |

---

## 4. Evaluation Dataset

A total of 24 evaluation cases have been prepared:

| Requirement | AI Feature | Cases |
|---|---|---:|
| FR8 | Catalogue Q&A | 8 |
| FR9 | Guided Recommendations | 8 |
| FR10 | Review Summaries | 8 |
| **Total** | | **24** |

The detailed cases are documented in:

- `catalogue-qa-evaluation.md`
- `recommendation-evaluation.md`
- `review-summary-evaluation.md`

---

## 5. Evaluation Targets

The SmartShop AI evaluation uses the following project targets:

- Every AI recommendation must map to a product stored in the SmartShop catalogue.
- At least 80% recommendation relevance should be achieved across the agreed evaluation cases.
- Unsupported price or stock claims are not acceptable.
- At least 90% of available-service AI responses should be returned within 10 seconds.
- A controlled fallback should be provided when the AI service fails.

---

## 6. Evaluation Method

For each evaluation case:

1. Run the specified test prompt or scenario.
2. Record the actual AI response.
3. Measure and record response time where applicable.
4. Compare the response with the approved catalogue or review source data.
5. Check grounding, accuracy, relevance and unsupported claims.
6. Record the result as Pass or Fail.
7. Capture appropriate test evidence.
8. Correct identified defects and execute the affected case again.

---

## 7. Current Status

**Evaluation Setup - Prepared**

The FR8-FR10 evaluation cases have been prepared but have not yet been executed.

Actual AI outputs, response times and Pass/Fail results will be recorded after the external AI service and the required AI functionality are integrated into SmartShop AI.