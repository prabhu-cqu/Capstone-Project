# SmartShop AI - Catalogue Q&A Evaluation

## 1. Purpose

This document defines and records evaluation cases for FR8 - Catalogue-Grounded AI Q&A.

The purpose of this evaluation is to verify that the SmartShop AI assistant answers customer questions using approved product information from the SmartShop catalogue and does not invent unsupported product, price, stock or specification information.

The evaluation cases were prepared before execution and were tested after the AI service was integrated with the SmartShop backend and frontend.

## 2. Evaluation Requirements

The catalogue assistant should:

- Answer questions using products stored in the SmartShop MySQL catalogue.
- Use accurate product names, prices, stock and specifications.
- Avoid inventing products or unsupported product information.
- Clearly handle questions when requested information is unavailable.
- Keep current price and stock controlled by the server.
- Provide a controlled fallback when the AI service is unavailable.
- Return responses within the agreed project response-time target.

## 3. Evaluation Cases

| ID | Test Prompt | Evaluation Focus | Expected Behaviour | Status |
|---|---|---|---|---|
| FR8-AI-01 | How much is the Anker 65W USB-C Charger? | Price accuracy | Assistant should identify the stored product and use the catalogue price of $79.95. | Pass |
| FR8-AI-02 | Is the HP Pavilion 15 currently in stock? | Stock accuracy | Assistant should use the current stock information supplied by the server and must not invent availability. | Pass |
| FR8-AI-03 | Tell me about the Logitech K380 Keyboard. | Catalogue grounding | Assistant should describe the product using approved catalogue information. | Pass |
| FR8-AI-04 | What laptops do you currently sell? | Product retrieval | Assistant should only identify laptop products that exist in the SmartShop catalogue. | Pass |
| FR8-AI-05 | Do you sell a PlayStation 5? | Unsupported product handling | Assistant should indicate that the requested product is not available in the current catalogue rather than inventing it. | Pass |
| FR8-AI-06 | Is the ASUS VivoBook 15 under $1,000? | Numerical accuracy | Assistant should use the stored price of $1,199.00 and explain that it is not under $1,000. | Pass |
| FR8-AI-07 | Compare the HP Pavilion 15 and Lenovo IdeaPad Slim 3. | Product comparison | Assistant should compare only information available in the catalogue and avoid unsupported claims. | Pass |
| FR8-AI-08 | What warranty does the Anker 65W USB-C Charger have? | Unsupported information | If warranty information is not stored in the approved catalogue data, the assistant should state that the information is unavailable rather than inventing a warranty. | Pass |

## 4. Evaluation Results

| ID | Actual Result | Response Time | Result |
|---|---|---:|---|
| FR8-AI-01 | Correctly returned the Anker 65W USB-C Charger price as $79.95. | 3.05 s | Pass |
| FR8-AI-02 | Correctly reported that the HP Pavilion 15 is in stock with 12 units available. | 3.51 s | Pass |
| FR8-AI-03 | Correctly returned catalogue details for the Logitech K380 Keyboard, including price, stock and stored specifications. | 3.27 s | Pass |
| FR8-AI-04 | Correctly identified the HP Pavilion 15, Lenovo IdeaPad Slim 3 and ASUS VivoBook 15 as the laptops available in the catalogue. | 6.78 s | Pass |
| FR8-AI-05 | Correctly stated that the PlayStation 5 is not available in the SmartShop catalogue and did not invent product information. | 4.04 s | Pass |
| FR8-AI-06 | Correctly used the stored ASUS VivoBook 15 price of $1,199.00 and stated that it is not under $1,000. | 3.83 s | Pass |
| FR8-AI-07 | Correctly compared the HP Pavilion 15 and Lenovo IdeaPad Slim 3 using catalogue price, RAM, screen size, storage, stock and stored descriptions. | 4.96 s | Pass |
| FR8-AI-08 | Correctly stated that warranty information is not available in the catalogue rather than inventing a warranty. | 3.45 s | Pass |

## 5. Evaluation Summary

All eight planned FR8 Catalogue-Grounded AI Q&A evaluation cases were executed successfully.

The assistant correctly used product information supplied from the SmartShop MySQL catalogue for product names, prices, stock and specifications. It correctly retrieved products belonging to the requested category and compared products using available catalogue information.

The assistant also correctly handled unsupported requests. When asked about a PlayStation 5, which was not available in the SmartShop catalogue, it stated that the product was unavailable instead of inventing product information. When asked about warranty information that was not present in the catalogue, it stated that the information was unavailable rather than generating an unsupported warranty claim.

All eight tested responses were returned within the project's 10-second response-time target.

The recorded response times were:

- FR8-AI-01: 3.05 seconds
- FR8-AI-02: 3.51 seconds
- FR8-AI-03: 3.27 seconds
- FR8-AI-04: 6.78 seconds
- FR8-AI-05: 4.04 seconds
- FR8-AI-06: 3.83 seconds
- FR8-AI-07: 4.96 seconds
- FR8-AI-08: 3.45 seconds

The average response time across the eight evaluation cases was approximately 4.11 seconds.

Screenshot evidence was captured during frontend testing for each evaluation case.

A minor presentation issue was observed during testing. Some longer AI responses contained Markdown formatting characters such as ** that were displayed as plain text by the current frontend. This issue affects presentation only and did not affect catalogue grounding or response accuracy. It can be addressed as a future frontend presentation improvement.

## 6. Current Status

FR8 - Catalogue-Grounded AI Q&A has been implemented and evaluated successfully.

The SmartShop catalogue assistant is integrated with the React frontend, Express backend, SmartShop MySQL catalogue and external AI service.

All eight planned FR8 evaluation cases passed during the current evaluation run.

The evaluation demonstrated that the assistant can provide catalogue-grounded product information, correctly handle unavailable products and unsupported information, and return responses within the project's response-time target.