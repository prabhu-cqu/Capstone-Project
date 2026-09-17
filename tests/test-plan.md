# SmartShop AI - Test Plan

## 1. Purpose

This test plan defines the testing approach for the SmartShop AI web application.

The purpose of testing is to verify that implemented functionality behaves according to the project requirements and that the frontend, backend and MySQL database work together correctly.

Testing is completed progressively as each functional requirement is implemented.

---

## 2. Test Environment

The current development test environment includes:

- React frontend
- Vite development server
- Node.js / Express backend
- MySQL database
- Local development environment
- Web browser for frontend testing
- MySQL Workbench for database verification
- PowerShell for backend/API testing where required

---

## 3. Testing Approach

SmartShop AI uses a combination of:

- Manual functional testing
- Frontend user-interface testing
- Backend API testing
- Database verification
- Authentication testing
- Integration testing
- Negative/error-condition testing
- Retesting after defects are corrected

A requirement should only be marked as fully tested when its relevant test cases have been executed and the results have been recorded.

---

## 4. Requirements Traceability

| Requirement | Feature | Test Documentation | Current Test Status |
|---|---|---|---|
| FR1 | Product catalogue | `catalogue-test-cases.md` | Prepared - Not Run |
| FR2 | Product search, filter and sort | `catalogue-test-cases.md` | Prepared - Not Run |
| FR3 | Product details | `catalogue-test-cases.md` | Prepared - Not Run |
| FR4 | Customer registration, login and logout | `authentication-test-cases.md` | Tested - Pass |
| FR5 | Persistent shopping cart | `cart-test-cases.md` | Tested - Pass |
| FR6 | Simulated checkout | To be updated/created | Retesting Required |
| FR7 | Customer order history | To be created | Not Implemented |
| FR8 | AI catalogue product Q&A | To be created | Not Implemented |
| FR9 | AI guided recommendations | To be created | Not Implemented |
| FR10 | AI review summaries | To be created | Not Implemented |
| FR11 | Admin catalogue management | To be created | Not Implemented |
| FR12 | Admin review moderation | To be created | Not Implemented |
| FR13 | Admin stock and order management | To be created | Not Implemented |

---

## 5. Product Catalogue Testing - FR1 to FR3

Catalogue test cases have been prepared for:

- Displaying products
- Displaying products from the database
- Category filtering
- Product searching
- Price filtering
- Product sorting
- Product details
- Stock information
- Product specifications
- Invalid or empty results
- Catalogue API behaviour

The current SmartShop AI development database contains 14 active catalogue products.

The frontend retrieves catalogue information through the backend API rather than using independent hard-coded frontend mock products for the active catalogue.

### Current Status

**Prepared - Not Run**

The existing catalogue test cases should be executed against the current 14-product database before FR1-FR3 are marked as formally tested.

---

## 6. Authentication Testing - FR4

Authentication testing verifies:

- Customer registration
- Customer persistence in MySQL
- Login with valid credentials
- Login with an incorrect password
- Login with an unknown email address
- Duplicate email handling
- Minimum password length validation
- Customer logout
- Secure password storage using bcrypt

Detailed authentication test cases and actual results are documented in:

`authentication-test-cases.md`

### Authentication Test Results

| Test Case | Description | Status |
|---|---|---|
| TC-AUTH-001 | Register new customer | Pass |
| TC-AUTH-002 | Verify registered customer in MySQL | Pass |
| TC-AUTH-003 | Login with valid credentials | Pass |
| TC-AUTH-004 | Login with incorrect password | Pass |
| TC-AUTH-005 | Login with unknown email | Pass |
| TC-AUTH-006 | Duplicate email registration | Pass |
| TC-AUTH-007 | Password minimum length validation | Pass |
| TC-AUTH-008 | Customer logout | Pass |
| TC-AUTH-009 | Verify password storage in MySQL | Pass |

### Authentication Test Summary

| Result | Number of Tests |
|---|---:|
| Pass | 9 |
| Fail | 0 |
| Not Run | 0 |
| Total | 9 |

Testing confirmed that new customers can register successfully and are stored in the MySQL `users` table.

Registered customers can log in using valid credentials. Incorrect passwords and unknown email addresses are rejected.

Duplicate email registrations are prevented, and passwords shorter than 8 characters are rejected by validation.

Customers can successfully log out of the application.

MySQL verification also confirmed that customer passwords are stored as bcrypt hashes rather than plain-text passwords.

### Current Status

**Tested - Pass**

All 9 authentication test cases were executed successfully. FR4 authentication testing is complete for the current implementation.

---

## 7. Shopping Cart Testing - FR5

Persistent shopping cart testing verifies:

- Add product to cart
- Database persistence of cart items
- Adding the same product again
- Updating product quantities
- Cart subtotal calculations
- Cart persistence after page refresh
- Removing products from the cart
- Available stock restrictions
- Authentication requirements

Detailed shopping cart test cases and actual results are documented in:

`cart-test-cases.md`

### Shopping Cart Test Results

| Test Case | Description | Status |
|---|---|---|
| TC-CART-001 | Add product to cart | Pass after defect fix |
| TC-CART-002 | Verify cart item in MySQL | Pass |
| TC-CART-003 | Add same product again | Pass |
| TC-CART-004 | Update cart quantity | Pass |
| TC-CART-005 | Verify cart total calculation | Pass |
| TC-CART-006 | Cart persists after page refresh | Pass |
| TC-CART-007 | Remove product from cart | Pass |
| TC-CART-008 | Prevent quantity exceeding available stock | Pass |
| TC-CART-009 | Authentication required for cart | Pass |

### Shopping Cart Test Summary

| Result | Number of Tests |
|---|---:|
| Pass | 9 |
| Fail | 0 |
| Not Run | 0 |
| Total | 9 |

During TC-CART-001, the initial cart request failed because the cart API service was configured to use port `5001` while the backend was running on port `5000`.

The API configuration was corrected in `frontend/src/services/cartApi.js` and TC-CART-001 was retested successfully.

Testing confirmed that cart items are persisted in MySQL, quantities can be updated, totals are calculated correctly, cart contents remain after page refresh, products can be removed, stock limits are enforced and unauthenticated customers are required to log in before using the persistent cart.

### Current Status

**Tested - Pass**

All 9 FR5 shopping cart test cases passed for the current implementation.

---

## 8. Simulated Checkout Testing - FR6

The simulated checkout process should be retested after the current catalogue and authentication integration.

Testing should verify:

- Checkout can be started with valid cart items
- Customer information is handled correctly
- Order information is created as expected
- Product stock is updated correctly where implemented
- Invalid checkout conditions are handled
- Checkout does not process real payment information

### Current Status

**Retesting Required**

---

## 9. Authentication Security Testing

Authentication security testing included:

- Passwords are not stored in plain text
- bcrypt password hashes are stored in MySQL
- Invalid passwords do not authenticate customers
- Unknown email addresses do not authenticate customers
- Duplicate customer email addresses are rejected
- Password minimum length validation is enforced
- Authentication state is cleared during logout

The MySQL `users` table was inspected during TC-AUTH-009. Stored password values were bcrypt hashes beginning with `$2b$12$`, rather than the passwords originally entered by customers.

Sensitive values stored in `.env` must not be committed to Git.

### Current Status

**Tested - Pass for implemented authentication security tests**

---

## 10. Database Integration Testing

Database integration testing verifies that the frontend does not operate from separate mock product records when database-backed functionality is expected.

The current catalogue flow is:

`MySQL → Backend API → Frontend Product Catalogue`

The current authentication registration flow is:

`Frontend Register Form → Authentication API → Backend → bcrypt Password Hashing → MySQL users Table`

The current login flow is:

`Frontend Login Form → Authentication API → Backend → MySQL User Lookup → bcrypt Password Verification → Authentication Response`

Current development verification confirms that the product catalogue is database-backed and customer registration/login uses the MySQL `users` table.

---

## 11. Defect Reporting

When a test fails, the following information should be recorded:

- Test case ID
- Feature/requirement
- Date tested
- Expected result
- Actual result
- Pass/Fail result
- Description of defect
- Steps to reproduce
- Correction made
- Retest result

A failed test should not be changed to Pass until the defect has been corrected and the test has been executed again.

---

## 12. Retesting

After a defect is corrected:

1. Run the failed test again.
2. Confirm the expected result.
3. Check related functionality for regression issues.
4. Record the retest result.
5. Change the test status only when the expected behaviour has been confirmed.

---

## 13. Current Testing Summary

| Area | Current State |
|---|---|
| Product catalogue implementation | Implemented |
| Catalogue formal testing | Prepared - Not Run |
| Database-backed products | Development Verified |
| Customer registration | Tested - Pass |
| Customer database persistence | Tested - Pass |
| Customer login | Tested - Pass |
| Invalid login handling | Tested - Pass |
| Duplicate email handling | Tested - Pass |
| Password length validation | Tested - Pass |
| Customer logout | Tested - Pass |
| Password hashing | Tested - Pass |
| FR4 authentication test documentation | Complete |
| Persistent cart | Retesting Required |
| Simulated checkout | Retesting Required |
| AI functionality | Future testing required |
| Admin functionality | Future testing required |

---

## 14. Next Testing Activities

The next testing activities are:

1. Retest FR6 simulated checkout functionality.

2. Create and execute tests for customer order history when FR7 is implemented.

3. Create tests for AI functionality as FR8-FR10 are implemented.

4. Create tests for administrator functionality as FR11-FR13 are implemented.

5. Record defects and retest results whenever failures are identified.