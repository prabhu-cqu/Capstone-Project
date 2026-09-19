# SmartShop AI - Guided Recommendation Evaluation

## 1. Purpose

This document defines evaluation cases for FR9 - AI Guided Product Recommendations.

The purpose is to verify that SmartShop AI recommends products from the stored catalogue based on customer requirements such as budget, device and intended use.

The evaluation cases are prepared before execution. Actual AI outputs and results will be recorded after the AI service has been integrated.

## 2. Evaluation Requirements

The guided recommender should:

- Recommend only products stored in the SmartShop catalogue.
- Consider the customer's stated budget.
- Consider the customer's intended use.
- Consider device or product requirements where provided.
- Explain why recommended products match the customer's needs.
- Avoid inventing products or unsupported product information.
- Provide a suitable response when no catalogue product matches.
- Achieve at least 80% relevance across the agreed evaluation cases.

## 3. Evaluation Cases

| ID | Test Prompt | Evaluation Focus | Expected Behaviour | Status |
|---|---|---|---|---|
| FR9-AI-01 | Recommend a laptop under $800 for university study. | Budget + use case | Recommend a suitable stored laptop within the stated budget, such as the Lenovo IdeaPad Slim 3 at $749.00, if it satisfies the retrieved catalogue criteria. | Not Run |
| FR9-AI-02 | I need a laptop for university study with a budget of $1,000. | Budget + intended use | Recommend only suitable stored products within the $1,000 budget and explain the match. | Not Run |
| FR9-AI-03 | Recommend wireless headphones under $100. | Category + budget | Recommend suitable stored headphones under $100 using catalogue information. | Not Run |
| FR9-AI-04 | I need a portable mouse for study and office work. | Intended use | Recommend an appropriate stored mouse when supported by catalogue information and explain the match. | Not Run |
| FR9-AI-05 | Recommend a tablet under $400 for study. | Budget + category | Recommend only suitable stored tablets within the stated budget. | Not Run |
| FR9-AI-06 | I need a USB-C accessory for my laptop. What can you recommend? | Device requirement | Recommend relevant stored USB-C accessories and explain the matching criteria without making unsupported compatibility claims. | Not Run |
| FR9-AI-07 | Recommend the best gaming laptop under $500. | No suitable match | If no stored product satisfies the request, clearly explain that no matching catalogue product is available rather than inventing one. | Not Run |
| FR9-AI-08 | Recommend a PlayStation 5 for me. | Non-catalogue request | Do not recommend a product that is not stored in the SmartShop catalogue. | Not Run |

## 4. Evaluation Method

For each case, testing will record:

- Actual AI recommendation
- Products recommended
- Whether every recommendation maps to a stored product
- Whether stated budget and requirements were respected
- Relevance of the recommendation
- Unsupported claims
- Response time
- Pass or Fail result
- Screenshot or other evidence

## 5. Relevance Target

The Assessment 1 project objective requires every recommendation to map to a stored product and at least 80% relevance across the agreed evaluation cases.

## 6. Current Status

FR9 evaluation cases have been prepared but have not yet been executed because the external AI service has not yet been integrated into SmartShop AI.

The cases will be executed after the backend AI integration is complete.