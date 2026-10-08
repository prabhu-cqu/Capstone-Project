# SmartShop AI - Review Summary Evaluation

## 1. Purpose

This document records the evaluation of FR10 - AI Customer Review Summaries.

The purpose is to verify that SmartShop AI summarises approved customer reviews accurately without inventing opinions, strengths, concerns or product information that are not supported by the source reviews.

FR10 has been implemented using approved reviews stored in the SmartShop MySQL database. The backend retrieves the approved reviews for a selected product and provides them as controlled source information to the AI review-summary service.

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

## 3. Evaluation Results

| ID | Evaluation Scenario | Evaluation Focus | Expected Behaviour | Status |
|---|---|---|---|---|
| FR10-AI-01 | Product has several positive approved reviews. | Positive feedback | Summarise recurring positive points supported by the reviews. | Pass |
| FR10-AI-02 | Product has several negative approved reviews. | Concerns | Summarise recurring concerns without exaggerating the negative feedback. | Pass |
| FR10-AI-03 | Product has both positive and negative reviews. | Mixed feedback | Present both strengths and concerns fairly based on the source reviews. | Pass |
| FR10-AI-04 | Multiple reviews mention the same strength. | Recurring themes | Identify the recurring strength without adding unsupported information. | Pass |
| FR10-AI-05 | Only one approved review is available. | Limited evidence | Provide a cautious summary based only on the available review. | Pass |
| FR10-AI-06 | No approved reviews are available for the product. | No review data | Clearly indicate that there is insufficient approved review information to generate a meaningful summary. | Pass |
| FR10-AI-07 | Reviews do not mention product warranty. | Unsupported claims | Do not introduce warranty information or other claims that are absent from the source reviews. | Pass |
| FR10-AI-08 | Reviews contain different opinions about the same product. | Faithfulness | Represent differing customer views without presenting one opinion as a universal conclusion. | Pass |

## 4. Evaluation Evidence

### FR10-AI-01 - Positive Feedback

The Logitech K380 Keyboard was evaluated using two approved 5-star customer reviews.

Both reviews identified the keyboard's compact size and portability as positive characteristics. The generated summary correctly identified compact size and portability as the recurring strength and did not introduce unsupported concerns.

Response time: 5.788 seconds.

Result: Pass.

### FR10-AI-02 - Negative Feedback

The JBL Tune 520BT Headphones were evaluated using three approved reviews with ratings of 2, 2 and 1 stars.

The generated summary correctly identified discomfort during long periods of use as the recurring concern across the reviews. It also reported that one reviewer considered the fit too tight and that another described the sound as acceptable.

These points were supported by the source reviews and the summary did not introduce unsupported product problems.

Response time: 26.927 seconds.

Result: Pass.

The functional evaluation passed; however, this response exceeded the project's 10-second response-time target.

### FR10-AI-03 - Mixed Feedback

The HP Pavilion 15 was evaluated using four approved reviews containing both positive and negative feedback.

The summary identified positive feedback relating to performance, university work, multitasking and the clear screen. It also identified concerns relating to battery life and portability.

The generated summary represented both positive and negative feedback without presenting either view as universal.

Response time: 11.069 seconds.

Result: Pass.

The functional evaluation passed; however, this response exceeded the project's 10-second response-time target.

### FR10-AI-04 - Recurring Themes

Two approved reviews for the Logitech K380 Keyboard both referred to its compact size and portability.

The generated summary correctly identified compact size and portability as a recurring strength without adding unsupported information.

Response time: 5.788 seconds.

Result: Pass.

### FR10-AI-05 - Limited Evidence

The Anker 65W USB-C Charger had one approved review.

The generated response explicitly stated that the summary was based on limited customer feedback and a single review. It reported only that the charger worked well and charged the reviewer's device quickly.

Response time: 5.778 seconds.

Result: Pass.

### FR10-AI-06 - No Review Data

The Samsung Galaxy Tab A9 had no approved customer reviews.

The backend returned the controlled response:

"There is insufficient approved review information to generate a meaningful summary for this product."

The AI service was not called when no approved review information was available.

Response time: 0 seconds.

Result: Pass.

### FR10-AI-07 - Unsupported Claims

The approved source reviews used during testing did not provide warranty information.

The generated review summaries did not introduce unsupported warranty information or other unsupported product claims.

Result: Pass.

### FR10-AI-08 - Faithfulness to Different Opinions

The HP Pavilion 15 reviews contained different customer opinions. Customers reported positive performance and study use, while individual reviewers raised concerns about battery life and weight.

The generated summary preserved these differing views and did not incorrectly present one customer's concern as the opinion of all customers.

Result: Pass.

## 5. Evaluation Method

For each evaluation case, testing recorded:

- Source reviews used
- Actual AI-generated summary
- Recurring strengths identified
- Recurring concerns identified
- Whether the summary was supported by the source reviews
- Any unsupported claims
- Response time
- Pass or Fail result
- Test evidence

The FR10 endpoint also returns the approved source reviews used to create the summary, allowing the generated output to be compared directly with its source information.

## 6. Evaluation Criteria

A review summary was considered successful when it accurately reflected the approved source reviews and did not introduce unsupported product information or customer opinions.

Where insufficient approved review data was available, the system was expected to provide a controlled response rather than generate unsupported content.

All eight FR10 evaluation cases satisfied their functional evaluation criteria.

## 7. Response-Time Observation

The AI service response time varied between evaluation cases.

Recorded response times included:

- Logitech K380 Keyboard: 5.788 seconds
- Anker 65W USB-C Charger: 5.778 seconds
- HP Pavilion 15: 11.069 seconds
- JBL Tune 520BT Headphones: 26.927 seconds
- No-review controlled response: 0 seconds

Some AI-generated responses exceeded the project's 10-second response-time target. This does not affect the faithfulness or functional correctness of the generated summaries, but response time remains an area for performance improvement.

During testing, the external AI service also temporarily returned a quota/rate-limit error. SmartShop AI responded with the controlled fallback message directing the customer to read the original reviews directly. Testing continued successfully once the external service became available again.

## 8. Current Status

**FR10: Implemented and Evaluated - 8/8 Functional Cases Passed**

The review-summary feature successfully used approved database reviews, represented positive, negative and mixed feedback, identified recurring themes, handled limited and missing review data, preserved access to source reviews, and avoided unsupported claims.

The functional evaluation target was achieved. Response-time performance remains an area for further improvement because some external AI responses exceeded the project's 10-second target.