# SmartShop AI - Shopping Cart Test Cases

## 1. Purpose

This document records the test cases and execution results for the Persistent Shopping Cart functionality of SmartShop AI.

The current testing scope focuses on:

- FR5 - Persistent Shopping Cart
- Adding products to the cart
- Database persistence
- Updating product quantities
- Cart total calculations
- Cart persistence after refresh
- Removing products
- Stock quantity restrictions
- Authentication requirements

Testing was performed using the React frontend, Node.js/Express backend and MySQL database.

---

## 2. Test Case Summary

| Test ID | Requirement | Test Scenario | Status |
|---|---|---|---|
| TC-CART-001 | FR5 | Add product to cart | Pass after defect fix |
| TC-CART-002 | FR5 | Verify cart item in MySQL | Pass |
| TC-CART-003 | FR5 | Add same product again | Pass |
| TC-CART-004 | FR5 | Update cart quantity | Pass |
| TC-CART-005 | FR5 | Verify cart total calculation | Pass |
| TC-CART-006 | FR5 | Cart persists after page refresh | Pass |
| TC-CART-007 | FR5 | Remove product from cart | Pass |
| TC-CART-008 | FR5 | Prevent quantity exceeding available stock | Pass |
| TC-CART-009 | FR5 | Authentication required for cart | Pass |

---

## 3. Detailed Test Cases

### TC-CART-001 - Add Product to Cart

**Requirement:** FR5

**Preconditions:**

- SmartShop AI frontend is running.
- Backend server is running.
- Customer is logged in.
- Anker 65W USB-C Charger is available in the catalogue.

**Steps:**

1. Open the SmartShop AI product catalogue.
2. Locate the Anker 65W USB-C Charger.
3. Select Add to Cart.
4. Open the shopping cart.

**Expected Result:**

The selected product should be added to the customer's cart with quantity 1 and the correct price.

**Initial Actual Result:**

The cart displayed a `Failed to fetch` error.

Investigation identified that `frontend/src/services/cartApi.js` was using port `5001`, while the SmartShop AI backend was running on port `5000`.

**Correction:**

The cart API base URL was corrected to use the backend running on port `5000`.

**Retest Result:**

The Anker 65W USB-C Charger was successfully added to the cart with:

- Quantity: 1
- Unit price: $79.95
- Subtotal: $79.95

**Status:** Pass after defect fix.

---

### TC-CART-002 - Verify Cart Item in MySQL

**Requirement:** FR5

**Preconditions:**

- Customer is logged in.
- A product has been added to the cart.

**Steps:**

1. Add the Anker 65W USB-C Charger to the cart.
2. Open MySQL Workbench.
3. Query the `carts` table.
4. Query the `cart_items` table.
5. Verify the stored cart item.

**Expected Result:**

The customer's cart and cart item should be persisted in MySQL.

**Actual Result:**

The `cart_items` table contained the cart item with:

- `cart_item_id`: 1
- `cart_id`: 1
- `product_id`: 4
- `quantity`: 1

This confirmed that the shopping cart was persisted in the database.

**Status:** Pass.

---

### TC-CART-003 - Add Same Product Again

**Requirement:** FR5

**Preconditions:**

- The Anker 65W USB-C Charger already exists in the customer's cart with quantity 1.

**Steps:**

1. Return to the product catalogue.
2. Select Add to Cart for the same product again.
3. Open the shopping cart.
4. Check the quantity.

**Expected Result:**

The existing cart item's quantity should increase rather than creating a duplicate cart entry.

**Actual Result:**

The Anker 65W USB-C Charger quantity increased from 1 to 2.

The subtotal changed from $79.95 to $159.90.

**Status:** Pass.

---

### TC-CART-004 - Update Cart Quantity

**Requirement:** FR5

**Preconditions:**

- The cart contains the Anker 65W USB-C Charger.

**Steps:**

1. Open the shopping cart.
2. Select the `+` quantity control.
3. Verify that the quantity increases.
4. Select the `-` quantity control.
5. Verify that the quantity decreases.

**Expected Result:**

The customer should be able to increase and decrease the quantity of a cart item.

**Actual Result:**

The quantity successfully changed between 2 and 3 using the cart quantity controls.

**Status:** Pass.

---

### TC-CART-005 - Verify Cart Total Calculation

**Requirement:** FR5

**Preconditions:**

- The Anker 65W USB-C Charger is in the cart.
- Unit price is $79.95.

**Steps:**

1. Set the cart quantity to 3.
2. Observe the subtotal.
3. Reduce the quantity to 2.
4. Observe the updated subtotal.

**Expected Result:**

The subtotal should equal the unit price multiplied by the selected quantity.

**Actual Result:**

At quantity 3:

`$79.95 x 3 = $239.85`

The displayed subtotal was $239.85.

After reducing the quantity to 2:

`$79.95 x 2 = $159.90`

The displayed subtotal updated to $159.90.

**Status:** Pass.

---

### TC-CART-006 - Cart Persistence After Page Refresh

**Requirement:** FR5

**Preconditions:**

- Customer is logged in.
- The cart contains the Anker 65W USB-C Charger with quantity 2.

**Steps:**

1. Confirm that the cart contains quantity 2.
2. Refresh the browser page.
3. Reopen the shopping cart.
4. Check the product, quantity and subtotal.

**Expected Result:**

The cart contents should remain available after the page is refreshed.

**Actual Result:**

After refreshing the page, the cart still contained:

- Anker 65W USB-C Charger
- Quantity: 2
- Unit price: $79.95
- Subtotal: $159.90

**Status:** Pass.

---

### TC-CART-007 - Remove Product From Cart

**Requirement:** FR5

**Preconditions:**

- The shopping cart contains at least one product.

**Steps:**

1. Open the shopping cart.
2. Select Remove for the Anker 65W USB-C Charger.
3. Observe the cart.

**Expected Result:**

The selected product should be removed from the cart.

If no other products remain, the cart should display an empty-cart message.

**Actual Result:**

The product was successfully removed.

The cart displayed:

`Your cart is empty`

and:

`Add a product from the catalogue to get started.`

**Status:** Pass.

---

### TC-CART-008 - Prevent Quantity Exceeding Available Stock

**Requirement:** FR5

**Preconditions:**

- Customer is logged in.
- Anker 65W USB-C Charger has 30 units available.
- The product exists in the customer's cart.

**Steps:**

1. Attempt to update the Anker 65W USB-C Charger quantity to 31 through the cart API.
2. Observe the backend response.

**Expected Result:**

The backend should reject a quantity greater than the available stock.

The cart quantity should not be allowed to exceed 30 units.

**Actual Result:**

An attempt was made to update the quantity to 31.

The backend returned:

`HTTP 400 Bad Request`

The request was rejected and the quantity was not allowed to exceed available stock.

**Status:** Pass.

---

### TC-CART-009 - Authentication Required for Cart

**Requirement:** FR5

**Preconditions:**

- Customer has logged out of SmartShop AI.

**Steps:**

1. Log out of the customer account.
2. Locate a product in the catalogue.
3. Select Add to Cart.
4. Observe the application response.

**Expected Result:**

An unauthenticated customer should not be allowed to use the persistent shopping cart.

The application should request authentication.

**Actual Result:**

After logout, selecting Add to Cart opened the Login/Register authentication panel.

The product was not added to the authenticated persistent cart while the customer was logged out.

**Status:** Pass.

---

## 4. Defect and Retesting Summary

During TC-CART-001, the initial Add to Cart test failed with a `Failed to fetch` error.

The issue was traced to the cart API configuration in:

`frontend/src/services/cartApi.js`

The cart service was configured to use port `5001`, while the backend server was running on port `5000`.

The API configuration was corrected and TC-CART-001 was executed again.

The retest passed successfully and subsequent cart functionality operated correctly.

---

## 5. FR5 Test Results

| Result | Number of Tests |
|---|---:|
| Pass | 9 |
| Fail | 0 |
| Not Run | 0 |
| Total | 9 |

All nine FR5 shopping cart test cases passed for the current SmartShop AI implementation.

TC-CART-001 required a defect correction before the successful retest.

---

## 6. FR5 Current Status

**Tested - Pass**

Testing confirms that the current persistent shopping cart implementation supports:

- Adding products
- Database-backed cart persistence
- Updating quantities
- Correct subtotal calculations
- Persistence after page refresh
- Removing products
- Stock quantity restrictions
- Authentication protection

FR5 is therefore considered tested and passed for the current implementation.