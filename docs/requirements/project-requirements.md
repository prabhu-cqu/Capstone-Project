# SmartShop AI - Project Requirements

## 1. Purpose

This document defines the functional and non-functional requirements for the SmartShop AI web application.

SmartShop AI is designed as an e-commerce web application for a small Australian retailer selling computer, mobile and study accessories.

The system combines standard e-commerce functionality with AI-assisted shopping features.

Development and testing are completed progressively as individual requirements are implemented.

---

## 2. Functional Requirements Summary

| Requirement | Feature | Priority | Current Status |
|---|---|---|---|
| FR1 | Product catalogue | Must Have | Partially Tested - 3 Pass, 1 Not Run |
| FR2 | Product search, filter and sort | Must Have | Tested - Pass |
| FR3 | Product details | Must Have | Tested - Pass |
| FR4 | Customer registration, login and logout | Must Have | Tested - Pass |
| FR5 | Persistent shopping cart | Must Have | Implemented - Retesting Required |
| FR6 | Simulated checkout | Must Have | Implemented - Retesting Required |
| FR7 | Customer order history | Should Have | Planned |
| FR8 | AI catalogue product Q&A | Must Have | Implemented and Evaluated - Pass (8/8) |
| FR9 | AI guided recommendations | Must Have | Implemented and Evaluated - Pass (8/8) |
| FR10 | AI review summaries | Must Have | Planned |
| FR11 | Admin catalogue management | Should Have | Planned |
| FR12 | Admin review moderation | Should Have | Planned |
| FR13 | Admin stock and order management | Should Have | Planned |

---

# 3. Functional Requirements

## FR1 - Product Catalogue

### Requirement

The system shall allow customers to browse products available in the SmartShop AI catalogue.

The Product Catalogue shall retrieve product information from the backend API and MySQL database.

Product catalogue information includes relevant information such as:

- Product name
- Category
- Brand
- Price
- Stock availability
- Product image where available
- Product actions

The active frontend catalogue shall not depend on independent hard-coded frontend mock product records.

### Current Implementation

The Product Catalogue is implemented using:

`MySQL -> Backend API -> React Frontend`

The current development database contains 14 active catalogue products.

The catalogue successfully displays multiple database-backed products.

### Testing

Catalogue testing is documented in:

`tests/catalogue-test-cases.md`

The following FR1 test cases were prepared:

- TC-CAT-001 - Product Catalogue loads successfully
- TC-CAT-002 - Product information displays correctly
- TC-CAT-003 - Multiple products display correctly
- TC-CAT-004 - Empty catalogue handling

TC-CAT-001 to TC-CAT-003 were executed and passed.

TC-CAT-004 remains Not Run because its precondition requires a test environment containing no available catalogue products. The current development database contains 14 active products, and the catalogue data was not removed solely to execute this test.

### Status

**Partially Tested - 3 Pass, 1 Not Run**

---

## FR2 - Product Search, Filter and Sort

### Requirement

The system shall allow customers to locate and organise catalogue products using search, filtering and sorting functionality.

The catalogue shall support relevant functionality including:

- Product-name search
- Partial-keyword search
- Category filtering
- Brand filtering where available
- Price criteria
- Product sorting
- Clearing applied search and filter criteria
- Appropriate handling when no matching products are found

### Testing

FR2 testing is documented in:

`tests/catalogue-test-cases.md`

The following test cases were executed:

- TC-CAT-005 - Search using a valid product name
- TC-CAT-006 - Search using a partial keyword
- TC-CAT-007 - Search for a nonexistent product
- TC-CAT-008 - Filter products by category
- TC-CAT-009 - Sort products by price
- TC-CAT-010 - Clear search and filter options

All six FR2 test cases passed.

Testing confirmed:

- Valid product-name searching
- Partial-keyword searching
- Appropriate zero-result handling
- Category filtering
- Price sorting
- Clearing search and filter criteria

### Status

**Tested - Pass**

---

## FR3 - Product Details

### Requirement

The system shall allow customers to open Product Details for a selected catalogue product.

Product Details shall display relevant available information such as:

- Product name
- Category
- Brand
- Description
- Price
- Stock availability
- Product specifications
- Compatibility information where available
- Product image where available

The system shall also handle invalid or unavailable product requests appropriately.

### Testing

FR3 testing is documented in:

`tests/catalogue-test-cases.md`

The following test cases were executed:

- TC-CAT-011 - Open Product Details
- TC-CAT-012 - Correct Product Details are displayed
- TC-CAT-013 - Invalid product request

All three FR3 test cases passed.

Testing confirmed that:

- Product Details opens successfully for a selected product.
- The selected product's information is displayed correctly.
- An invalid product request returns an appropriate `Product not found` response.

### Status

**Tested - Pass**

---

## FR4 - Customer Registration, Login and Logout

### Requirement

The system shall allow customers to:

- Register a customer account
- Log in using valid credentials
- Remain authenticated using the application's authentication mechanism
- Log out successfully

The authentication system shall integrate the React frontend, Node.js/Express backend and MySQL database.

### Current Implementation

Customer authentication currently includes:

- Customer registration
- Customer login
- Customer logout
- MySQL customer persistence
- bcrypt password hashing
- JWT authentication
- Duplicate email handling
- Invalid login handling
- Minimum password-length validation
- Authentication success/error feedback

### Security Behaviour

Passwords are hashed using bcrypt before being stored in MySQL.

Plain-text passwords are not stored in the `users` table.

Successful authentication generates a JWT for the authenticated customer.

Authentication information is cleared from the frontend during logout.

### Testing

Detailed authentication testing is documented in:

`tests/authentication-test-cases.md`

The following test cases were executed:

- TC-AUTH-001 - Register new customer
- TC-AUTH-002 - Verify registered customer in MySQL
- TC-AUTH-003 - Login with valid credentials
- TC-AUTH-004 - Login with incorrect password
- TC-AUTH-005 - Login with unknown email
- TC-AUTH-006 - Duplicate email registration
- TC-AUTH-007 - Password minimum length validation
- TC-AUTH-008 - Customer logout
- TC-AUTH-009 - Verify password storage in MySQL

### Formal Test Results

A total of 9 authentication test cases were executed:

- Tests executed: 9
- Tests passed: 9
- Tests failed: 0

Testing covered customer registration, database persistence, valid login, incorrect password handling, unknown email handling, duplicate email prevention, password minimum-length validation, logout and bcrypt password storage.

### Status

**Tested - Pass**

---

## FR5 - Persistent Shopping Cart

### Requirement

The system shall allow customers to manage products in a shopping cart.

Cart functionality should include:

- Add product to cart
- Remove product from cart
- Change product quantity
- Display cart item count
- Calculate cart totals
- Preserve cart information as required
- Apply appropriate stock restrictions

### Current Implementation

Persistent shopping cart functionality has been implemented.

Because the catalogue and authentication functionality have since been integrated with the current MySQL-backed implementation, the cart should be retested against the current product data and authentication behaviour.

### Status

**Implemented - Retesting Required**

---

## FR6 - Simulated Checkout

### Requirement

The system shall provide a simulated checkout process for development and demonstration purposes.

The checkout process shall:

- Use products currently in the customer's cart
- Process the simulated order without a real payment transaction
- Handle relevant customer/order information
- Update stock where implemented
- Handle invalid checkout conditions appropriately

Real payment processing is outside the current project scope.

### Current Implementation

Simulated checkout functionality has been implemented.

The checkout functionality should be retested against the current database-backed catalogue and authentication implementation.

### Status

**Implemented - Retesting Required**

---

## FR7 - Customer Order History

### Requirement

The system should allow an authenticated customer to view relevant information about previous orders.

### Status

**Planned**

---

## FR8 - AI Catalogue Product Q&A

### Requirement

The system shall provide an AI-assisted catalogue question-and-answer feature.

The AI assistant should answer customer questions using available catalogue information.

Responses should be grounded in SmartShop AI product data where applicable.

### Current Implementation

FR8 - AI Catalogue Product Q&A has been implemented.

The current implementation integrates:

`React Frontend -> Express Backend -> MySQL Catalogue -> External AI Service`

The catalogue assistant:

- Accepts customer catalogue questions through the React frontend.
- Retrieves approved product information from the SmartShop MySQL catalogue.
- Uses the backend AI service to generate catalogue-grounded responses.
- Uses current catalogue information for product names, prices, stock and specifications.
- Handles products that are not available in the catalogue.
- Avoids inventing unsupported information when requested information is not available.
- Provides controlled error handling when AI assistance is unavailable.

The frontend catalogue page includes an AI assistant interface where customers can enter catalogue questions and receive responses.

### Testing

FR8 evaluation is documented in:

`ai/evaluation/catalogue-qa-evaluation.md`

and the overall AI evaluation results are recorded in:

`ai/evaluation/ai-evaluation-results.md`

The following eight FR8 evaluation cases were executed:

- FR8-AI-01 - Catalogue price accuracy
- FR8-AI-02 - Stock accuracy
- FR8-AI-03 - Catalogue grounding
- FR8-AI-04 - Product retrieval
- FR8-AI-05 - Unsupported product handling
- FR8-AI-06 - Numerical accuracy
- FR8-AI-07 - Product comparison
- FR8-AI-08 - Unsupported information handling

All eight FR8 evaluation cases passed.

Testing confirmed that the assistant:

- Correctly returned catalogue prices.
- Correctly returned current stock information supplied by the system.
- Used stored catalogue product details.
- Retrieved products from the requested catalogue category.
- Did not invent a product that was not present in the catalogue.
- Correctly handled numerical price comparisons.
- Compared products using available catalogue information.
- Did not invent unsupported warranty information.

All eight tested responses were returned within the project's 10-second response-time target.

The average response time across the eight evaluation cases was approximately 4.11 seconds.

Screenshot evidence was captured during frontend testing.

A minor frontend presentation issue was observed where Markdown formatting characters were displayed as plain text in some longer AI responses. This did not affect catalogue grounding or factual accuracy.

### Status

**Implemented and Evaluated - Pass (8/8)**
## FR9 - AI Guided Recommendations

### Requirement

The system shall provide guided product recommendations based on customer requirements.

The recommendation feature should consider relevant catalogue information such as:

- Product category
- Price
- Product specifications
- Intended use
- Customer requirements

### Current Implementation

FR9 - AI Guided Product Recommendations has been implemented.

The current implementation integrates:

`Customer Request -> Express Backend -> MySQL Catalogue -> Budget Filtering -> External AI Service`

The recommendation feature:

- Accepts customer recommendation requests through the backend API.
- Retrieves active products from the SmartShop MySQL catalogue.
- Retrieves product category information using the categories table.
- Detects stated maximum customer budgets.
- Filters products against the customer's maximum budget before supplying catalogue information to the AI service.
- Considers product category, intended use and customer requirements.
- Recommends only products supplied from the SmartShop catalogue.
- Avoids inventing products, prices, stock levels and specifications.
- Avoids unsupported compatibility claims.
- Provides an appropriate response when no suitable catalogue product is available.
- Provides controlled fallback behaviour when the external AI service is unavailable.
- Records AI response time for evaluation.

The backend endpoint for the recommendation feature is:

`POST /api/ai/recommend`

### Testing

FR9 evaluation is documented in:

`ai/evaluation/recommendation-evaluation.md`

and the overall AI evaluation results are recorded in:

`ai/evaluation/ai-evaluation-results.md`

The following eight FR9 evaluation cases were executed:

- FR9-AI-01 - Budget + use case
- FR9-AI-02 - Budget + intended use
- FR9-AI-03 - Category + budget
- FR9-AI-04 - Intended use
- FR9-AI-05 - Budget + category
- FR9-AI-06 - Device requirement
- FR9-AI-07 - No suitable match
- FR9-AI-08 - Non-catalogue request

All eight FR9 evaluation cases produced the expected functional behaviour.

Testing confirmed that the recommendation assistant:

- Recommended products stored in the SmartShop catalogue.
- Respected stated customer budgets.
- Considered product categories and intended use.
- Explained why recommended products matched customer requirements.
- Did not recommend products above stated maximum budgets.
- Correctly handled requests where no suitable catalogue product was available.
- Did not invent a PlayStation 5 or other non-catalogue product.
- Avoided unsupported compatibility claims.

Seven of the eight recorded responses were returned within the project's 10-second response-time target.

FR9-AI-08 returned the correct functional response in 10.171 seconds.

This means 87.5% of the recorded FR9 responses were returned within 10 seconds.

### Status

**Implemented and Evaluated - Pass (8/8)**

---

## FR10 - AI Review Summaries

### Requirement

The system shall provide AI-generated summaries of available product review information.

The feature should summarise relevant review content without presenting unsupported product claims.

### Status

**Planned**

---

## FR11 - Admin Catalogue Management

### Requirement

The system should provide authorised administrator functionality for managing catalogue information.

Relevant functionality may include:

- Add products
- Edit products
- Update product information
- Manage catalogue status
- Manage product images where applicable

### Status

**Planned**

---

## FR12 - Admin Review Moderation

### Requirement

The system should allow authorised administrators to manage or moderate product review content where required.

### Status

**Planned**

---

## FR13 - Admin Stock and Order Management

### Requirement

The system should allow authorised administrators to manage relevant stock and order information.

Relevant functionality may include:

- Review stock levels
- Update stock information
- Review customer orders
- Update appropriate order information or status

### Status

**Planned**

---

# 4. Non-Functional Requirements

## NFR1 - Usability

The SmartShop AI interface should provide clear navigation and allow customers to complete common shopping activities without unnecessary complexity.

The interface should provide clear feedback for successful and unsuccessful actions.

---

## NFR2 - Performance

The application should provide acceptable response times in the intended development and demonstration environment.

Performance testing should be completed as development progresses.

---

## NFR3 - Security

The system shall apply appropriate security controls to customer authentication and sensitive information.

Current authentication security includes:

- bcrypt password hashing
- Password minimum-length validation
- Duplicate email prevention
- Invalid credential rejection
- JWT-based authentication
- Logout authentication-state clearing

Sensitive configuration values stored in `.env` must not be committed to Git.

---

## NFR4 - Data Integrity

Product, customer, cart and order information should remain consistent between the frontend, backend and database.

Database-backed functionality should use the backend API rather than maintaining independent conflicting frontend data.

---

## NFR5 - Maintainability

The project should maintain separation between:

- Frontend components
- Frontend services
- Backend routes/controllers/services where applicable
- Database functionality
- AI functionality
- Test documentation

Source code and documentation should be maintained using Git and GitHub.

---

# 5. Requirements Testing Summary

| Requirement | Test Coverage | Result |
|---|---|---|
| FR1 | TC-CAT-001 to TC-CAT-004 | Partially Tested - 3 Pass, 1 Not Run |
| FR2 | TC-CAT-005 to TC-CAT-010 | Tested - Pass (6/6) |
| FR3 | TC-CAT-011 to TC-CAT-013 | Tested - Pass (3/3) |
| FR4 | TC-AUTH-001 to TC-AUTH-009 | Tested - Pass (9/9) |
| FR5 | Testing to be updated | Retesting Required |
| FR6 | Testing to be updated | Retesting Required |
| FR7 | Future testing | Planned |
| FR8 | FR8-AI-01 to FR8-AI-08 | Implemented and Evaluated - Pass (8/8) |
| FR9 | FR9-AI-01 to FR9-AI-08 | Implemented and Evaluated - Pass (8/8) |
| FR10 | Future testing | Planned |
| FR11 | Future testing | Planned |
| FR12 | Future testing | Planned |
| FR13 | Future testing | Planned |

---

# 6. Current Development Summary

The following major functionality is currently implemented:

- MySQL-backed product catalogue
- 14 active development catalogue products
- Backend product API
- Frontend catalogue integration
- Product images for selected catalogue products
- Customer registration
- Customer login
- bcrypt password hashing
- JWT authentication
- Customer logout
- Persistent cart implementation
- Simulated checkout implementation
- AI catalogue product Q&A
- Catalogue-grounded AI backend service
- Frontend catalogue AI assistant
- AI guided product recommendation backend
- Server-side recommendation budget filtering
- Catalogue-grounded recommendation service
- Controlled AI recommendation fallback handling
Current formal testing includes:

- FR1: 3 tests passed and 1 test remains Not Run
- FR2: 6 tests passed
- FR3: 3 tests passed
- FR4: 9 tests passed
- FR8: 8 AI evaluation cases passed
Across the currently evaluated requirements, 37 tests have been executed and passed, with 1 catalogue test remaining Not Run.

The next development and verification priorities include:

- Complete TC-CAT-004 empty catalogue testing in a controlled test environment
- Retest FR5 cart functionality
- Retest FR6 simulated checkout


- Develop review summarisation
- Develop required administrator functionality