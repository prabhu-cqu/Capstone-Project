# SmartShop AI - AI Evaluation Plan

## 1. Purpose

This document defines how the AI features of SmartShop AI were evaluated during development and testing.

The evaluation verifies that AI-generated assistance is grounded in approved SmartShop catalogue and review data, provides relevant results, avoids unsupported claims, and behaves correctly when the external AI service is unavailable.

---

## 2. AI Features Evaluated

The project evaluates three AI capabilities:

1. FR8 - Catalogue-Grounded AI Q&A
2. FR9 - AI Guided Product Recommendations
3. FR10 - AI Customer Review Summaries

---

## 3. Evaluation Areas

| Evaluation Area | What Will Be Checked | Status |
|---|---|---|
| Catalogue Grounding | AI responses use products and information available in the SmartShop catalogue | Implemented and Verified |
| Recommendation Relevance | Recommendations match the user's stated needs, budget and intended use | Implemented and Verified |
| Product Accuracy | Product information matches approved catalogue information | Implemented and Verified |
| Response Time | AI responses meet the agreed project response-time target | Implemented and Verified |
| Unsupported Claims | AI does not invent unsupported price, stock, product or review information | Implemented and Verified |
| Fallback Behaviour | The system provides a controlled response when the AI service is unavailable | Implemented and Verified |
| Review Summary Faithfulness | AI summaries accurately represent approved source reviews | Implemented and Verified |

---

## 4. Evaluation Dataset

A total of 24 evaluation cases were prepared and executed:

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

**Evaluation Complete - Implemented and Verified**

The FR8-FR10 evaluation cases were executed successfully. The AI features are implemented, evaluated, and documented with recorded pass/fail results and performance observations.

The SmartShop AI features successfully demonstrated catalogue-grounded Q&A, catalogue-based guided recommendations, and source-grounded customer review summaries.
