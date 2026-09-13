# SmartShop AI – API Design

**Project:** SmartShop AI – AI-Enhanced E-Commerce Platform  
**Unit:** COIT13230 – Application Development Project  
**Author:** Prabhu Ram Khadka  
**Role:** Backend Development, Database, Security and Integration  
**Document Version:** v1.0  
**Date:** 16/08/2026

---

## 1. Purpose

This document defines the initial REST API design for the SmartShop AI application.

The API provides communication between the frontend application, backend services and database. It also provides controlled backend integration with the AI-assisted features of the application.

This document is based on the API requirements identified in `api-requirements-v1.md`.

The design is an initial technical baseline and may be refined during implementation and team review.

---

## 2. API Design Principles

The API will follow these principles:

- REST-style endpoint structure.
- HTTP methods appropriate for the requested operation.
- JSON request and response formats.
- Consistent resource naming.
- Authentication for protected customer operations.
- Authorisation for administrative operations.
- Validation of incoming requests.
- Appropriate HTTP status codes.
- Separation between API controllers, business logic and database access.
- AI functionality accessed through controlled backend services.
- Sensitive information must not be exposed through API responses.

---

## 3. API Base Path

The proposed API base path is:

`/api`

Example:

`GET /api/products`

---

# 4. Authentication API

## 4.1 Register Customer

**Endpoint:**

`POST /api/auth/register`

**Purpose:**

Creates a new customer account.

**Authentication:** Not required.

**Request body:**

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "********"
}
```
Response:
Returns the result of account creation.
The response must not expose the customer's password or password hash.
Expected status codes:
•	201 Created 
•	400 Bad Request 
•	409 Conflict 

## 4.2 Customer Login

Endpoint:
POST /api/auth/login
Purpose:
Authenticates an existing customer.
Authentication: Not required.
Request body:
```json
{
  "email": "john@example.com",
  "password": "********"
}
```
Response:
Returns an authentication result required for subsequent protected requests.
The response must not expose the customer's password or password hash.
Expected status codes:
•	200 OK 
•	400 Bad Request 
•	401 Unauthorized 


## 5. Product Catalogue API
## 5.1 Get Products
Endpoint:
GET /api/products
Purpose:
Retrieves products for the product catalogue.
Authentication: Not required.
Optional query parameters:
search
category
minPrice
maxPrice
Example:
GET /api/products?search=laptop&category=computers
Response:
{
  "products": [
    {
      "product_id": 1,
      "name": "Example Laptop",
      "description": "Example product",
      "price": 1299.00,
      "stock_quantity": 10,
      "category_id": 2,
      "specifications": {},
      "status": "active"
    }
  ]
}
Expected status codes:
•	200 OK 
•	400 Bad Request 
•	500 Internal Server Error 

## 5.2 Get Product Details
Endpoint:
GET /api/products/{productId}
Purpose:
Retrieves detailed information about a specific product.
Authentication: Not required.
Path parameter:
productId
Expected status codes:
•	200 OK 
•	404 Not Found 

## 5.3 Get Categories
Endpoint:
GET /api/categories
Purpose:
Retrieves available product categories.
Authentication: Not required.
Expected status codes:
•	200 OK 
•	500 Internal Server Error 

## 6. Customer Account API
## 6.1 Get Current Customer
Endpoint:
GET /api/users/me
Purpose:
Retrieves information about the currently authenticated customer.
Authentication: Required.
Response must not contain:
•	Password 
•	Password hash 
•	Unnecessary security information 
Expected status codes:
•	200 OK 
•	401 Unauthorized 

## 7. Shopping Cart API
## 7.1 Get Current Cart
Endpoint:
GET /api/cart
Purpose:
Retrieves the authenticated customer's current shopping cart.
Authentication: Required.
Expected status codes:
•	200 OK 
•	401 Unauthorized 

## 7.2 Add Cart Item
Endpoint:
POST /api/cart/items
Purpose:
Adds a product to the customer's cart.
Authentication: Required.
Request body:
```json
{
  "product_id": 1,
  "quantity": 2
}
```
Backend validation:
•	Product must exist. 
•	Quantity must be valid. 
•	Requested quantity must comply with available stock. 
Expected status codes:
•	201 Created 
•	400 Bad Request 
•	401 Unauthorized 
•	404 Not Found 

## 7.3 Update Cart Item
Endpoint:
PUT /api/cart/items/{cartItemId}
Purpose:
Updates the quantity of an existing cart item.
Authentication: Required.
Request body:
```json
{
  "quantity": 3
}
```
Expected status codes:
•	200 OK 
•	400 Bad Request 
•	401 Unauthorized 
•	404 Not Found 

## 7.4 Remove Cart Item
Endpoint:
DELETE /api/cart/items/{cartItemId}
Purpose:
Removes an item from the authenticated customer's cart.
Authentication: Required.
Expected status codes:
•	204 No Content 
•	401 Unauthorized 
•	404 Not Found 

## 7.5 Clear Cart
Endpoint:
DELETE /api/cart/items
Purpose:
Removes all items from the current customer's cart.
Authentication: Required.
Expected status codes:
•	204 No Content 
•	401 Unauthorized 

## 8. Simulated Checkout API
## 8.1 Create Order From Cart
Endpoint:
POST /api/checkout
Purpose:
Processes the customer's current cart using the project's simulated checkout process.
Authentication: Required.
Request body:
```json
{
  "cart_id": 1
}
```
Backend processing should:
1.	Validate the authenticated customer. 
2.	Validate the cart. 
3.	Validate product availability. 
4.	Calculate the order total. 
5.	Create the order. 
6.	Create order items. 
7.	Update the order status. 
8.	Complete or clear the active cart. 
Important:
This is a simulated checkout. The application does not process real financial payments.
Expected status codes:
•	201 Created 
•	400 Bad Request 
•	401 Unauthorized 
•	409 Conflict 

## 9. Order History API
## 9.1 Get Customer Orders
Endpoint:
GET /api/orders
Purpose:
Retrieves orders belonging to the authenticated customer.
Authentication: Required.
Expected status codes:
•	200 OK 
•	401 Unauthorized 

## 9.2 Get Order Details
Endpoint:
GET /api/orders/{orderId}
Purpose:
Retrieves details of a specific order belonging to the authenticated customer.
Authentication: Required.
Security rule:
A customer must not be able to access another customer's order.
Expected status codes:
•	200 OK 
•	401 Unauthorized 
•	403 Forbidden 
•	404 Not Found 

## 10. Product Review API
## 10.1 Get Product Reviews
Endpoint:
GET /api/products/{productId}/reviews
Purpose:
Retrieves reviews associated with a product.
Authentication: Not required.
Expected status codes:
•	200 OK 
•	404 Not Found 

## 10.2 Create Product Review
Endpoint:
POST /api/products/{productId}/reviews
Purpose:
Allows an authenticated customer to submit a product review.
Authentication: Required.
Request body:
```json
{
  "rating": 5,
  "review_text": "Very useful product."
}
```
Validation:
•	Product must exist. 
•	Rating must be valid. 
•	Review text must satisfy application validation rules. 
Expected status codes:
•	201 Created 
•	400 Bad Request 
•	401 Unauthorized 
•	404 Not Found 

## 11. AI Shopping Assistant API
## 11.1 Catalogue-Grounded AI Assistant
Endpoint:
POST /api/ai/assistant
Purpose:
Receives a customer's catalogue-related question and returns an AI-generated response grounded in available catalogue information.
Authentication: Required.
Request body:
```json
{
  "question": "Which laptop has the highest available storage?"
}
```
Backend processing:
1.	Receive the customer question. 
2.	Identify relevant catalogue information. 
3.	Provide appropriate catalogue information to the AI service. 
4.	Generate the response. 
5.	Return the response to the frontend. 
Important design rule:
The AI assistant should not invent unsupported product information.
Expected status codes:
•	200 OK 
•	400 Bad Request 
•	401 Unauthorized 
•	503 Service Unavailable 

## 12. Guided Recommendations API
## 12.1 Generate Product Recommendations
Endpoint:
POST /api/ai/recommendations
Purpose:
Generates guided product recommendations based on customer requirements or preferences.
Authentication: Required.
Request body:
```json
{
  "requirements": {
    "category": "laptop",
    "max_price": 1500,
    "preferred_use": "study"
  }
}
```
Backend processing:
1.	Validate the request. 
2.	Retrieve relevant catalogue data. 
3.	Identify matching products. 
4.	Generate recommendation results. 
5.	Return catalogue-grounded recommendations. 
Expected status codes:
•	200 OK 
•	400 Bad Request 
•	401 Unauthorized 
•	503 Service Unavailable 

## 13. Review Summary API
## 13.1 Generate Product Review Summary
Endpoint:
GET /api/products/{productId}/review-summary
Purpose:
Provides a summary of common customer feedback from product reviews.
Authentication: Not required.
Backend processing:
1.	Retrieve reviews for the product. 
2.	Provide appropriate review information to the summarisation component. 
3.	Generate a summary. 
4.	Return the summary to the frontend. 
Expected status codes:
•	200 OK 
•	404 Not Found 
•	503 Service Unavailable 

## 14. Administration API
Administrative endpoints require authentication and administrator authorisation.
## 14.1 Create Product
POST /api/admin/products
## 14.2 Update Product
PUT /api/admin/products/{productId}
## 14.3 Deactivate Product
DELETE /api/admin/products/{productId}
## 14.4 Update Stock
PATCH /api/admin/products/{productId}/stock
## 14.5 Update Order Status
PATCH /api/admin/orders/{orderId}/status
## 14.6 Update Review Status
PATCH /api/admin/reviews/{reviewId}/status
Authentication: Required.
Authorisation: Administrator role required.

## 15. API Endpoint Summary
docs\api\API Endpoint Summary.png

## 16. Database Relationship Mapping
The proposed API endpoints map to the initial database design as follows:
docs\api\Database Relationship Mapping.png

## 17. Security and Access Control
The API will apply access control according to the user's role and authentication state.
Public endpoints
Public endpoints may include:
•	Product catalogue 
•	Product details 
•	Categories 
•	Product reviews 
•	Review summaries 
Authenticated customer endpoints
Authenticated access is required for:
•	Customer account information 
•	Shopping cart 
•	Checkout 
•	Order history 
•	Creating reviews 
•	AI assistant 
•	Guided recommendations 
Administrator endpoints
Administrator access is required for:
•	Product management 
•	Stock management 
•	Order status management 
•	Review status management 

## 18. Error Response Structure
The API should use a consistent error response structure.
Example:
```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "The requested product could not be found."
  }
}
```
Sensitive internal information such as stack traces, database credentials or service keys must not be returned to clients.

## 19. API Versioning and Future Refinement
The initial API design is version 1 of the technical design.
The endpoint structure may be refined during implementation based on:
•	Team review. 
•	Backend implementation requirements. 
•	Frontend integration requirements. 
•	Database implementation. 
•	AI integration constraints. 
•	Testing results. 
Any significant changes should be documented through Git commits and updated design artefacts.

## 20. Traceability to API Requirements
The API design provides technical endpoints for the requirements documented in:
api-requirements-v1.md
The design will be reviewed against the requirements before backend implementation begins.

