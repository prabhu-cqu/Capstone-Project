<<<<<<< HEAD
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
| FR1 | Product catalogue | `catalogue-test-cases.md` | Partially Tested - 3 Pass, 1 Not Run |
| FR2 | Product search, filter and sort | `catalogue-test-cases.md` | Tested - Pass |
| FR3 | Product details | `catalogue-test-cases.md` | Tested - Pass |
| FR4 | Customer registration, login and logout | `authentication-test-cases.md` | Tested - Pass |
| FR5 | Persistent shopping cart | To be updated/created | Retesting Required |
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

Detailed catalogue test cases and actual results are documented in:

`catalogue-test-cases.md`

Testing was performed against the current MySQL-backed catalogue containing 14 active products.

The frontend retrieves catalogue information through the backend API rather than using independent hard-coded frontend mock products for the active catalogue.

Catalogue testing covered:

- Product Catalogue loading
- Product information display
- Multiple product display
- Valid product-name search
- Partial-keyword search
- Nonexistent-product search
- Category filtering
- Price sorting
- Clearing search and filters
- Opening Product Details
- Product Details information
- Invalid product requests

### Catalogue Test Results

| Test Case | Requirement | Description | Status |
|---|---|---|---|
| TC-CAT-001 | FR1 | Product Catalogue loads successfully | Pass |
| TC-CAT-002 | FR1 | Product information displays correctly | Pass |
| TC-CAT-003 | FR1 | Multiple products display correctly | Pass |
| TC-CAT-004 | FR1 | Empty catalogue handling | Not Run |
| TC-CAT-005 | FR2 | Search using valid product name | Pass |
| TC-CAT-006 | FR2 | Search using partial keyword | Pass |
| TC-CAT-007 | FR2 | Search for nonexistent product | Pass |
| TC-CAT-008 | FR2 | Filter products by category | Pass |
| TC-CAT-009 | FR2 | Sort products by price | Pass |
| TC-CAT-010 | FR2 | Clear search and filters | Pass |
| TC-CAT-011 | FR3 | Open Product Details | Pass |
| TC-CAT-012 | FR3 | Correct Product Details displayed | Pass |
| TC-CAT-013 | FR3 | Invalid product request | Pass |

### Catalogue Test Summary

| Requirement | Passed | Failed | Not Run | Total |
|---|---:|---:|---:|---:|
| FR1 | 3 | 0 | 1 | 4 |
| FR2 | 6 | 0 | 0 | 6 |
| FR3 | 3 | 0 | 0 | 3 |
| **Total** | **12** | **0** | **1** | **13** |

### FR1 Status

**Partially Tested - 3 Pass, 1 Not Run**

TC-CAT-001, TC-CAT-002 and TC-CAT-003 passed.

TC-CAT-004 remains Not Run because its precondition requires an environment with no available catalogue products. The current development database contains 14 active products and the catalogue data was not removed solely for this test.

### FR2 Status

**Tested - Pass**

All six FR2 test cases, TC-CAT-005 to TC-CAT-010, were executed and passed.

Testing confirmed valid search, partial-keyword search, no-result handling, category filtering, price sorting and clearing catalogue criteria.

### FR3 Status

**Tested - Pass**

All three FR3 test cases, TC-CAT-011 to TC-CAT-013, were executed and passed.

Testing confirmed that Product Details can be opened, the selected product information is displayed correctly and invalid product requests return an appropriate Product not found response.

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

The shopping cart implementation should be retested using products retrieved from the current MySQL catalogue.

Testing should verify:

- Add product to cart
- Remove product from cart
- Change product quantity
- Cart item count
- Cart totals
- Cart persistence
- Cart behaviour after login/logout
- Stock-related restrictions where applicable

### Current Status

**Retesting Required**

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

`MySQL -> Backend API -> Frontend Product Catalogue`

The current authentication registration flow is:

`Frontend Register Form -> Authentication API -> Backend -> bcrypt Password Hashing -> MySQL users Table`

The current login flow is:

`Frontend Login Form -> Authentication API -> Backend -> MySQL User Lookup -> bcrypt Password Verification -> Authentication Response`

Current development verification and catalogue testing confirm that the Product Catalogue is database-backed.

Product information displayed by the frontend was compared with MySQL catalogue data during TC-CAT-002.

Customer registration and login use the MySQL `users` table.

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

No defects were identified during the 12 executed catalogue test cases or the 9 executed authentication test cases.

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
| FR1 catalogue testing | Partially Tested - 3 Pass, 1 Not Run |
| FR2 search, filter and sort | Tested - Pass |
| FR3 Product Details | Tested - Pass |
| Database-backed products | Verified |
| Customer registration | Tested - Pass |
| Customer database persistence | Tested - Pass |
| Customer login | Tested - Pass |
| Invalid login handling | Tested - Pass |
| Duplicate email handling | Tested - Pass |
| Password length validation | Tested - Pass |
| Customer logout | Tested - Pass |
| Password hashing | Tested - Pass |
| FR4 authentication testing | Tested - Pass |
| Persistent cart | Retesting Required |
| Simulated checkout | Retesting Required |
| AI functionality | Future testing required |
| Admin functionality | Future testing required |

### Overall Executed Test Results

| Test Area | Passed | Failed | Not Run |
|---|---:|---:|---:|
| Catalogue FR1-FR3 | 12 | 0 | 1 |
| Authentication FR4 | 9 | 0 | 0 |
| **Total** | **21** | **0** | **1** |

---

## 14. Next Testing Activities

The next testing activities are:

1. Execute TC-CAT-004 using a controlled empty-catalogue test environment when appropriate.
2. Retest FR5 persistent shopping cart functionality using database-backed products.
3. Retest FR6 simulated checkout functionality.
4. Create and execute tests for customer order history when FR7 is implemented.
5. Create tests for AI functionality as FR8-FR10 are implemented.
6. Create tests for administrator functionality as FR11-FR13 are implemented.
7. Record defects and retest results whenever failures are identified.
=======
# SmartShop AI – Product Catalogue Test Cases

## 1. Purpose

This document defines detailed test cases for the Product Catalogue increment of SmartShop AI.

The current testing scope focuses on:

- FR1 – Product Catalogue Display
- FR2 – Product Search, Filter and Sort
- FR3 – Product Details

The test cases will be executed when the relevant Product Catalogue functionality is available for testing.

## 2. Test Case Summary

| Test ID | Requirement | Test Scenario | Status |
|---|---|---|---|
| TC-CAT-001 | FR1 | Product Catalogue loads successfully | Not Run |
| TC-CAT-002 | FR1 | Product information displays correctly | Not Run |
| TC-CAT-003 | FR1 | Multiple products display correctly | Not Run |
| TC-CAT-004 | FR1 | Empty catalogue is handled correctly | Not Run |
| TC-CAT-005 | FR2 | Search using a valid product name | Not Run |
| TC-CAT-006 | FR2 | Search using a partial keyword | Not Run |
| TC-CAT-007 | FR2 | Search for a nonexistent product | Not Run |
| TC-CAT-008 | FR2 | Filter products by category | Not Run |
| TC-CAT-009 | FR2 | Sort products by price | Not Run |
| TC-CAT-010 | FR2 | Clear search and filter options | Not Run |
| TC-CAT-011 | FR3 | Open Product Details page | Not Run |
| TC-CAT-012 | FR3 | Correct product details are displayed | Not Run |
| TC-CAT-013 | FR3 | Invalid product request is handled correctly | Not Run |

## 3. Detailed Test Cases

### TC-CAT-001 – Product Catalogue Loads Successfully

**Requirement:** FR1

**Preconditions:**
- SmartShop AI is running.
- Product data is available.

**Steps:**
1. Open SmartShop AI.
2. Navigate to the Product Catalogue.
3. Observe the catalogue.

**Expected Result:**  
The Product Catalogue loads successfully and displays available products.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-002 – Product Information Displays Correctly

**Requirement:** FR1

**Preconditions:**
- Products are available in the catalogue.

**Steps:**
1. Open the Product Catalogue.
2. Review the displayed products.
3. Check the information shown for each product.

**Expected Result:**  
Each product displays the required catalogue information correctly.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-003 – Multiple Products Display Correctly

**Requirement:** FR1

**Preconditions:**
- Multiple product records are available.

**Steps:**
1. Open the Product Catalogue.
2. Review the displayed product list.
3. Check that multiple products are displayed correctly.

**Expected Result:**  
Available products are displayed without missing or overlapping required information.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-004 – Empty Catalogue Handling

**Requirement:** FR1

**Preconditions:**
- No products are available in the test environment.

**Steps:**
1. Open the Product Catalogue.
2. Observe the catalogue when no products are available.

**Expected Result:**  
An appropriate message is displayed and the application does not crash.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-005 – Search Using Valid Product Name

**Requirement:** FR2

**Preconditions:**
- The selected test product exists.

**Steps:**
1. Open the Product Catalogue.
2. Enter a valid product name.
3. Apply the search.

**Expected Result:**  
The matching product is displayed.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-006 – Search Using Partial Keyword

**Requirement:** FR2

**Preconditions:**
- Matching products exist.

**Steps:**
1. Enter part of a product name in the search field.
2. Apply the search.
3. Review the results.

**Expected Result:**  
Products matching the partial keyword are displayed.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-007 – Search for Nonexistent Product

**Requirement:** FR2

**Steps:**
1. Enter a product name that does not exist.
2. Apply the search.
3. Observe the result.

**Expected Result:**  
An appropriate no-results message is displayed and the application remains functional.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-008 – Filter Products by Category

**Requirement:** FR2

**Preconditions:**
- Products from multiple categories are available.

**Steps:**
1. Open the Product Catalogue.
2. Select a category.
3. Apply the filter.

**Expected Result:**  
Only products belonging to the selected category are displayed.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-009 – Sort Products by Price

**Requirement:** FR2

**Preconditions:**
- Products with different prices are available.

**Steps:**
1. Open the Product Catalogue.
2. Select a price sorting option.
3. Review the displayed order.

**Expected Result:**  
Products are displayed according to the selected price order.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-010 – Clear Search and Filters

**Requirement:** FR2

**Preconditions:**
- Search or filter criteria have been applied.

**Steps:**
1. Apply a search or category filter.
2. Select the clear/reset option.
3. Review the catalogue.

**Expected Result:**  
The applied criteria are removed and the full catalogue is displayed again.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-011 – Open Product Details

**Requirement:** FR3

**Preconditions:**
- At least one product is available.

**Steps:**
1. Open the Product Catalogue.
2. Select a product.
3. Observe the resulting page.

**Expected Result:**  
The Product Details page for the selected product opens successfully.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-012 – Correct Product Details Are Displayed

**Requirement:** FR3

**Preconditions:**
- A valid product exists.

**Steps:**
1. Open a product from the catalogue.
2. Review its details.
3. Compare the displayed information with the product record.

**Expected Result:**  
The correct information for the selected product is displayed.

**Actual Result:** Not executed.

**Status:** Not Run.

---

### TC-CAT-013 – Invalid Product Request

**Requirement:** FR3

**Steps:**
1. Attempt to access an invalid or unavailable product.
2. Observe the response.

**Expected Result:**  
An appropriate product-not-found or error message is displayed without crashing the application.

**Actual Result:** Not executed.

**Status:** Not Run.

## 4. Execution Status

The Product Catalogue test cases are currently prepared for FR1, FR2 and FR3.

Test execution will begin when the relevant functionality is available. Failed tests will be documented as defects and executed again after fixes are implemented.
>>>>>>> origin/main
