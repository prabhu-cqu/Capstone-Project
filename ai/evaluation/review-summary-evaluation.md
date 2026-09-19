# SmartShop AI - Review Summary Evaluation

## 1. Purpose

This document defines evaluation cases for FR10 - AI Customer Review Summaries.

The purpose is to verify that SmartShop AI can summarise approved customer reviews accurately without inventing opinions, strengths, concerns or product information that are not supported by the source reviews.

The evaluation cases are prepared before execution. Actual AI outputs and results will be recorded after the AI service has been integrated.

## 2. Evaluation Requirements

The review summary feature should:

- Use approved customer reviews as the source information.
- Identify recurring strengths and positive feedback.
- Identify recurring concerns and limitations.
- Accurately represent mixed customer feedback.
- Avoid adding unsupported claims.
- Avoid changing the meaning of customer reviews.
- Preserve access to the original source reviews.
- Provide a controlled response when insufficient review information is available.

## 3. Evaluation Cases

| ID | Evaluation Scenario | Evaluation Focus | Expected Behaviour | Status |
|---|---|---|---|---|
| FR10-AI-01 | Product has several positive approved reviews. | Positive feedback | Summarise the recurring positive points supported by the reviews. | Not Run |
| FR10-AI-02 | Product has several negative approved reviews. | Concerns | Summarise recurring concerns without exaggerating the negative feedback. | Not Run |
| FR10-AI-03 | Product has both positive and negative reviews. | Mixed feedback | Present both strengths and concerns fairly based on the source reviews. | Not Run |
| FR10-AI-04 | Multiple reviews mention the same strength. | Recurring themes | Identify the recurring strength without adding unsupported information. | Not Run |
| FR10-AI-05 | Only one approved review is available. | Limited evidence | Provide a cautious summary based only on the available review. | Not Run |
| FR10-AI-06 | No approved reviews are available for the product. | No review data | Clearly indicate that there is insufficient approved review information to generate a meaningful summary. | Not Run |
| FR10-AI-07 | Reviews do not mention product warranty. | Unsupported claims | Do not introduce warranty information or other claims that are absent from the source reviews. | Not Run |
| FR10-AI-08 | Reviews contain different opinions about the same product. | Faithfulness | Represent the differing customer views without presenting one opinion as a universal conclusion. | Not Run |

## 4. Evaluation Method

For each evaluation case, testing will record:

- Source reviews used
- Actual AI-generated summary
- Recurring strengths identified
- Recurring concerns identified
- Whether the summary is supported by the source reviews
- Any unsupported claims
- Response time
- Pass or Fail result
- Screenshot or other test evidence

## 5. Evaluation Criteria

A review summary will be considered successful when it accurately reflects the approved source reviews and does not introduce unsupported product information or customer opinions.

Where there is insufficient approved review data, the system should provide a controlled response rather than generating unsupported content.

## 6. Current Status

FR10 evaluation cases have been prepared but have not yet been executed because the external AI service has not yet been integrated into SmartShop AI.

The cases will be executed after the backend AI integration is complete.