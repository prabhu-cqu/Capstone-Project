# SmartShop AI - Catalogue Q&A Evaluation

## 1. Purpose

This document defines evaluation cases for FR8 - Catalogue-Grounded AI Q&A.

The purpose of this evaluation is to verify that the SmartShop AI assistant answers customer questions using approved product information from the SmartShop catalogue and does not invent unsupported product, price, stock or specification information.

The evaluation cases are prepared before execution. Actual AI outputs, response times and results will be recorded after the AI service has been integrated.

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
| FR8-AI-01 | How much is the Anker 65W USB-C Charger? | Price accuracy | Assistant should identify the stored product and use the catalogue price of $79.95. | Not Run |
| FR8-AI-02 | Is the HP Pavilion 15 currently in stock? | Stock accuracy | Assistant should use the current stock information supplied by the server and must not invent availability. | Not Run |
| FR8-AI-03 | Tell me about the Logitech K380 Keyboard. | Catalogue grounding | Assistant should describe the product using approved catalogue information. | Not Run |
| FR8-AI-04 | What laptops do you currently sell? | Product retrieval | Assistant should only identify laptop products that exist in the SmartShop catalogue. | Not Run |
| FR8-AI-05 | Do you sell a PlayStation 5? | Unsupported product handling | Assistant should indicate that the requested product is not available in the current catalogue rather than inventing it. | Not Run |
| FR8-AI-06 | Is the ASUS VivoBook 15 under $1,000? | Numerical accuracy | Assistant should use the stored price of $1,199.00 and explain that it is not under $1,000. | Not Run |
| FR8-AI-07 | Compare the HP Pavilion 15 and Lenovo IdeaPad Slim 3. | Product comparison | Assistant should compare only information available in the catalogue and avoid unsupported claims. | Not Run |
| FR8-AI-08 | What warranty does the Anker 65W USB-C Charger have? | Unsupported information | If warranty information is not stored in the approved catalogue data, the assistant should state that the information is unavailable rather than inventing a warranty. | Not Run |

## 4. Results to Record During Testing

For each evaluation case, the following evidence will be recorded after AI integration:

- Actual AI response
- Response time
- Catalogue grounding
- Product information accuracy
- Unsupported claims
- Pass or Fail result
- Screenshot or other test evidence

## 5. Current Status

FR8 evaluation cases have been prepared but have not yet been executed because the external AI service has not yet been integrated into SmartShop AI.

The cases will be executed after the backend AI integration is complete.