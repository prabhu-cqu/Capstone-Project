
# SmartShop AI - Non-Functional Test Cases

## 1. Purpose

This document records the non-functional requirements testing of the SmartShop AI e-commerce application.

The purpose of testing is to evaluate system performance, reliability, security, privacy, usability, accessibility, maintainability and AI integrity.

The testing covers eight non-functional requirements:

- NFR1 - Performance
- NFR2 - Reliability and Data Integrity
- NFR3 - Security
- NFR4 - Privacy
- NFR5 - Usability
- NFR6 - Accessibility and Compatibility
- NFR7 - Maintainability
- NFR8 - AI Integrity

The results are based on project implementation, recorded testing activities and reported user-testing outcomes.

## 2. Test Case Summary

| Test ID | Requirement | Test Scenario | Status |
|---|---|---|---|
| TC-NFR-001 | NFR1 | Catalogue page loading performance | PASS |
| TC-NFR-002 | NFR1 | AI response-time performance | PARTIAL |
| TC-NFR-003 | NFR2 | Checkout and database integrity | PASS |
| TC-NFR-004 | NFR2 | Transaction rollback during checkout failure | NOT VERIFIED |
| TC-NFR-005 | NFR3 | Registration validation and password security | PASS |
| TC-NFR-006 | NFR3 | JWT authentication and administrator protection | PASS |
| TC-NFR-007 | NFR4 | Simulated checkout and payment privacy | PASS |
| TC-NFR-008 | NFR5 | Five-user usability testing | PARTIAL |
| TC-NFR-009 | NFR6 | Keyboard navigation and accessibility | PASS |
| TC-NFR-010 | NFR6 | Browser compatibility | PASS |
| TC-NFR-011 | NFR6 | Responsive interface testing | PASS |
| TC-NFR-012 | NFR7 | Code structure and maintainability | PARTIAL |
| TC-NFR-013 | NFR8 | AI recommendation integrity | PARTIAL |
| TC-NFR-014 | NFR8 | AI review-summary integrity | PASS  |

## 3. Detailed Test Cases

### TC-NFR-001 - Catalogue Loading Performance

**Requirement:** NFR1 - Performance

**Objective:** Verify that the product catalogue loads within the expected response time.

**Preconditions:**
- Frontend and backend servers are running.
- MySQL database is connected.
- Product catalogue data is available.

**Test Steps:**
1. Open SmartShop AI in Google Chrome.
2. Navigate to the product catalogue.
3. Open Developer Tools.
4. Select the Network tab.
5. Reload the catalogue page.
6. Record the page loading time.

**Expected Result:**
The catalogue should load within 3 seconds under normal testing conditions.

**Actual Result:**
The recorded catalogue loading time was approximately 0.87 seconds, with DOMContentLoaded at approximately 0.40 seconds and Load at approximately 0.47 seconds.

**Status:** PASS 

**Remarks:** The observed result meets the target for the recorded run. Additional measurements are required to establish the overall 90% performance acceptance criterion.

---

### TC-NFR-002 - AI Response-Time Performance

**Requirement:** NFR1 - Performance

**Objective:** Evaluate the response time of the AI features.

**Preconditions:**
- Gemini AI integration is configured.
- Catalogue and review data are available.

**Test Steps:**
1. Open the AI catalogue assistant.
2. Submit a product-related question.
3. Record the response time.
4. Test AI product recommendations.
5. Generate an AI review summary.
6. Compare recorded response times with the 10-second target.

**Expected Result:**
At least 90% of available-service AI responses should complete within 10 seconds.

**Actual Result:**
The recorded AI evaluation includes:
- FR8 catalogue Q&A: 8/8 functional passes, with an average response time of approximately 4.11 seconds.
- FR9 recommendations: 8/8 functional passes, with one response taking 10.171 seconds.
- FR10 review summaries: 8/8 functional passes, with recorded slow responses of 11.069 and 26.927 seconds.

The AI features functioned for the tested inputs, but some response times exceeded the target.

**Status:** PARTIAL

**Remarks:** Functional success does not establish full response-time compliance.

---

### TC-NFR-003 - Checkout and Database Integrity

**Requirement:** NFR2 - Reliability and Data Integrity

**Objective:** Verify that simulated checkout correctly creates orders and updates database records.

**Preconditions:**
- Customer account is available.
- Product stock is sufficient.
- Shopping cart contains a product.

**Test Steps:**
1. Log in using a customer account.
2. Add a product to the shopping cart.
3. Check the available stock quantity.
4. Complete simulated checkout.
5. Open My Orders.
6. Verify the order record and updated stock.

**Expected Result:**
- Order is successfully created.
- Order appears in customer order history.
- Stock is reduced by the purchased quantity.
- Cart is marked completed.

**Actual Result:**
A recorded Apple iPad checkout reduced stock from 12 to 11 and created Order #6.

An additional checkout test on 13 October 2026 used cart #9 and created Order #11 for one Logitech K380 Keyboard costing $69.95. The cart status changed from active to completed.

**Status:** PASS

**Remarks:** Positive checkout and database persistence were demonstrated.

---

### TC-NFR-004 - Checkout Failure and Transaction Rollback

**Requirement:** NFR2 - Reliability and Data Integrity

**Objective:** Verify that checkout failures do not create incomplete orders or incorrect stock changes.

**Preconditions:**
- Customer account is available.
- Product stock can be controlled for testing.

**Test Steps:**
1. Add a product to the shopping cart.
2. Attempt checkout when the requested quantity exceeds available stock.
3. Observe the response.
4. Inspect order records.
5. Check stock quantities.
6. Confirm no partial transaction was committed.

**Expected Result:**
Checkout should be rejected and the database should remain consistent.

**Actual Result:**
The backend implementation includes database transactions and rollback handling. However, a complete executed failure test with matching before-and-after database records has not been established.

**Status:** NOT VERIFIED

**Remarks:** Additional negative testing is required.

---

### TC-NFR-005 - Registration Validation and Password Security

**Requirement:** NFR3 - Security

**Objective:** Verify customer registration validation and password protection.

**Preconditions:**
- Registration page is available.
- Backend authentication API is running.

**Test Steps:**
1. Open the registration page.
2. Enter invalid registration information.
3. Attempt registration using an existing email.
4. Test password length validation.
5. Inspect password storage and login verification logic.

**Expected Result:**
- Invalid registration information is rejected.
- Duplicate email addresses are rejected.
- Passwords are hashed.
- Passwords are not stored as plaintext.

**Actual Result:**
Registration validation, duplicate-email checking, minimum password length and bcrypt password hashing were recorded in the project testing and implementation evidence.

**Status:** PASS

---

### TC-NFR-006 - JWT Authentication and Administrator Protection

**Requirement:** NFR3 - Security

**Objective:** Verify that authentication and administrative functions use access controls.

**Preconditions:**
- Customer and administrator accounts are available.
- Protected API routes are configured.

**Test Steps:**
1. Log in with valid credentials.
2. Inspect JWT token generation.
3. Check token expiry configuration.
4. Inspect protected administrator routes.
5. Confirm that authentication and role middleware are configured.

**Expected Result:**
Protected administrator functions should require valid authentication and administrator authorization.

**Actual Result:**
JWT authentication is implemented with a server-side secret and a two-hour token expiry. Administrator routes use authentication and role-checking middleware.

**Status:** PASS

**Remarks:** Complete unauthorized-access testing remains necessary for full security acceptance.

---

### TC-NFR-007 - Simulated Checkout Privacy

**Requirement:** NFR4 - Privacy

**Objective:** Verify that checkout does not collect real payment information.

**Preconditions:**
- Customer account is logged in.
- Shopping cart contains a product.

**Test Steps:**
1. Open the shopping cart.
2. Proceed to simulated checkout.
3. Inspect the checkout information.
4. Check whether banking or card information is requested.
5. Complete the simulated purchase.

**Expected Result:**
The system should clearly indicate that checkout is simulated and should not request real payment credentials.

**Actual Result:**
The checkout interface explains that no real payment is processed and does not request bank account or card details.

**Status:** PASS

**Remarks:** This confirms the simulated-payment privacy check, not every privacy requirement.

---

### TC-NFR-008 - Five-User Usability Testing

**Requirement:** NFR5 - Usability

**Objective:** Evaluate the usability of SmartShop AI through five customer test users.

**Preconditions:**
- SmartShop AI is running.
- Five test accounts are available.
- Product, cart, review and AI features are accessible.

**Test Steps:**
1. Create five customer test accounts.
2. Ask users to browse products and view product details.
3. Test cart and simulated checkout functionality.
4. Test product review submission.
5. Test AI product recommendations.
6. Record completed activities.
7. Evaluate customer journey completion and satisfaction.

**Expected Result:**
- At least 4 out of 5 users (80%) complete the customer shopping journey.
- Average satisfaction rating is at least 4 out of 5.

**Actual Result:**

Five test user accounts were created in the MySQL database.

The following user activities were reported:

| Testing Activity | Number of Users | Result |
|---|---:|---|
| Customer test accounts | 5 | Created |
| Customer shopping journey | 5 | Completed  |
| Product review submission | 2 | Completed  |
| AI recommendation testing | 3 | Completed  |
| Satisfaction rating | 5 targeted | Not recorded |

The reported customer journey completion rate was:

Completion Rate = (5 / 5) x 100 = 100%

The reported completion rate meets the minimum 80% target.

However, individual completion records and numerical satisfaction ratings have not been consolidated.

**Status:** PARTIAL

**Remarks:** Task completion was reported as successful, but full NFR5 acceptance cannot be confirmed without satisfaction results.

---

### TC-NFR-009 - Keyboard Navigation and Accessibility

**Requirement:** NFR6 - Accessibility and Compatibility

**Objective:** Verify that core application controls are accessible through keyboard navigation.

**Preconditions:**
- SmartShop AI is running in a supported browser.

**Test Steps:**
1. Open the product catalogue.
2. Use the Tab key to navigate.
3. Check visible keyboard focus.
4. Navigate through product and order controls.
5. Check whether core interactions remain accessible.

**Expected Result:**
Core controls should be reachable through keyboard navigation with visible focus indicators.

**Actual Result:**
Keyboard navigation and visible focus indicators were recorded as functioning in the original testing activities.

**Status:** PASS 

---

### TC-NFR-010 - Browser Compatibility

**Requirement:** NFR6 - Accessibility and Compatibility

**Objective:** Verify application compatibility with Google Chrome and Microsoft Edge.

**Preconditions:**
- Both browsers are available.
- Application servers are running.

**Test Steps:**
1. Open SmartShop AI in Chrome.
2. Test catalogue browsing and authentication.
3. Test cart and checkout.
4. Open SmartShop AI in Edge.
5. Test catalogue and administrative interfaces.
6. Check layout and interaction behaviour.

**Expected Result:**
The tested features should remain usable in both browsers.

**Actual Result:**
Chrome and Edge compatibility checks were recorded as passing.

**Status:** PASS

---

### TC-NFR-011 - Responsive Interface Testing

**Requirement:** NFR6 - Accessibility and Compatibility

**Objective:** Verify that the catalogue remains usable at different screen sizes.

**Preconditions:**
- Application is open in a browser.
- Browser responsive testing tools are available.

**Test Steps:**
1. Open the product catalogue.
2. Activate responsive device emulation.
3. Change viewport sizes.
4. Inspect product cards.
5. Test search and filtering controls.
6. Check whether important interface elements remain accessible.

**Expected Result:**
Core catalogue functions should remain usable across tested viewport sizes.

**Actual Result:**
The responsive catalogue testing record reports that product cards and controls remained accessible in the tested layouts.

**Status:** PASS

---

### TC-NFR-012 - Code Structure and Maintainability

**Requirement:** NFR7 - Maintainability

**Objective:** Evaluate whether SmartShop AI uses a maintainable code structure.

**Preconditions:**
- Source code and GitHub repository are available.

**Test Steps:**
1. Review frontend component organization.
2. Inspect backend routes and controllers.
3. Review database schema files.
4. Inspect service and API separation.
5. Review GitHub commit history.
6. Check documentation and traceability of requirements.

**Expected Result:**
The application should use separated modules, documented interfaces, understandable naming and traceable development records.

**Actual Result:**
SmartShop AI uses separate frontend components, backend routes, controllers, services and database files.

The GitHub repository records development and integration changes.

However, a complete maintainability acceptance review covering all defined criteria has not been documented.

**Status:** PARTIAL

---

### TC-NFR-013 - AI Recommendation Integrity

**Requirement:** NFR8 - AI Integrity

**Objective:** Evaluate whether AI recommendations are grounded in available catalogue products.

**Preconditions:**
- AI recommendation service is running.
- Product information is available in MySQL.

**Test Steps:**
1. Open AI product recommendations.
2. Enter a product requirement and budget.
3. Generate recommendations.
4. Compare suggested products with the catalogue.
5. Check displayed prices and stock.
6. Evaluate recommendation relevance.

**Expected Result:**
- Recommended products should exist in the catalogue.
- AI should not invent unsupported product prices or stock.
- At least 80% of evaluated recommendations should be relevant.

**Actual Result:**
Eight functional recommendation tests were recorded as passing.

Three test users also reportedly interacted with the AI recommendation feature.

The backend applies product and budget filtering before generating recommendations.

However, a separate quantitative evaluation of the 80% relevance threshold and all grounding conditions has not been established.

**Status:** PARTIAL

---

### TC-NFR-014 - AI Review Summary Integrity

**Requirement:** NFR8 - AI Integrity

**Objective:** Verify that AI review summaries use approved customer reviews.

**Preconditions:**
- Products have approved reviews.
- Review-summary functionality is available.

**Test Steps:**
1. Open a product with approved customer reviews.
2. Generate an AI review summary.
3. Compare the summary with the approved reviews.
4. Check that pending reviews are not treated as approved public feedback.
5. Review the output for unsupported claims.

**Expected Result:**
The AI should summarise approved customer feedback without inventing unsupported review information.

**Actual Result:**
Eight functional review-summary tests were recorded as passing.

The application includes review moderation, and recorded examples demonstrate summaries based on approved reviews.

However, these functional results do not independently establish every NFR8 integrity criterion.

**Status:** PASS

**Remarks:** Overall NFR8 acceptance remains partially verified.

## 4. Requirements Traceability

| Requirement | Test Cases | Evaluation |
|---|---|---|
| NFR1 - Performance | TC-NFR-001, TC-NFR-002 | Partial acceptance; AI timing overruns |
| NFR2 - Reliability | TC-NFR-003, TC-NFR-004 | Positive checkout passed; rollback unverified |
| NFR3 - Security | TC-NFR-005, TC-NFR-006 | Recorded security controls passed; broader testing remains |
| NFR4 - Privacy | TC-NFR-007 | Simulated-payment privacy check passed |
| NFR5 - Usability | TC-NFR-008 | Five-user completion reported; satisfaction pending |
| NFR6 - Accessibility | TC-NFR-009, TC-NFR-010, TC-NFR-011 | Recorded checks passed |
| NFR7 - Maintainability | TC-NFR-012 | Partial |
| NFR8 - AI Integrity | TC-NFR-013, TC-NFR-014 | Functional checks passed; full acceptance unverified |

## 5. Execution Summary

The following summary distinguishes recorded test passes from partially verified or unverified scenarios.

| Status | Number of Test Cases |
|---|---:|
| PASS | 8 |
| PARTIAL | 5 |
| NOT VERIFIED | 1 |
| **TOTAL** | **14** |

**Note:** The eight PASS results include recorded implementation or functional checks with the qualifications stated in the individual cases. They do not mean that eight complete non-functional requirements have been accepted.

## 6. Conclusion

Non-functional testing of SmartShop AI covered performance, reliability, security, privacy, usability, accessibility, maintainability and AI integrity.

The recorded testing demonstrated successful catalogue loading, positive checkout transactions, password-security controls, simulated-payment privacy, keyboard navigation, browser compatibility and responsive layouts.

Five customer test accounts were created. Two users reportedly submitted product reviews, three tested AI recommendations, and all five were reported to have completed the shopping journey.

The reported shopping journey completion rate was 100%, meeting the 80% usability completion target. However, numerical satisfaction ratings were not recorded, so overall NFR5 acceptance remains partially verified.

Additional work is required to establish complete acceptance of AI response-time performance, checkout rollback reliability, maintainability and AI integrity.

Overall, the test results support the implementation of SmartShop AI while identifying remaining verification requirements before production deployment.
