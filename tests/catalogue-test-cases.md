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