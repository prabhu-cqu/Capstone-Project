# SmartShop AI – API Requirements

**Project:** SmartShop AI – AI-Enhanced E-Commerce Platform  
**Unit:** COIT13230 – Application Development Project  
**Author:** Prabhu Ram Khadka  
**Role:** Backend Development, Database, Security and Integration  
**Document Version:** v1.0  
**Date:** 15/08/2026

---

## 1. Purpose

This document defines the initial API requirements for the SmartShop AI application.

The API will provide communication between the frontend application, backend services, database and AI-assisted functionality. The requirements are derived from the approved project scope and the planned application features.

The API design will support the core e-commerce functionality while maintaining clear separation between frontend presentation, backend business logic, database operations and AI integration.

---

## 2. API Scope

The API will support the following major application areas:

- Product catalogue
- Product search and filtering
- Product details
- Customer accounts
- Shopping cart
- Simulated checkout
- Order history
- Catalogue-grounded AI assistant
- Guided recommendations
- Review summaries
- Administration

---

## 3. Product Catalogue Requirements

The API shall provide endpoints that allow the frontend to:

- Retrieve available products.
- Retrieve an individual product by its identifier.
- Retrieve product categories.
- Search products using relevant search terms.
- Filter products by supported catalogue attributes.
- Retrieve product information required for the product-details page.
- Provide product information to approved AI functionality.

Product responses should contain the information required by the frontend, including product name, description, price, stock quantity, category and specifications where applicable.

---

## 4. Customer Account Requirements

The API shall support customer account functionality.

The API should provide functionality for:

- Customer registration.
- Customer authentication.
- Retrieval of authenticated customer information.
- Account status management.
- Secure handling of customer credentials.
- Authentication of protected requests.

Passwords must not be returned through API responses.

---

## 5. Shopping Cart Requirements

The API shall support shopping cart operations.

The API should allow an authenticated customer to:

- Retrieve their cart.
- Add a product to the cart.
- Update product quantity.
- Remove an item from the cart.
- Clear the cart.
- Retrieve the current cart total.

The backend shall validate product availability and quantity before updating cart information.

---

## 6. Checkout Requirements

The application will use a simulated checkout process.

The API shall support:

- Submitting the current cart for checkout.
- Validating cart contents before checkout.
- Calculating the order total.
- Creating an order record.
- Updating relevant order status.
- Clearing or completing the customer's active cart after a successful simulated checkout.

The system shall not process real financial payments.

---

## 7. Order History Requirements

The API shall allow authenticated customers to:

- Retrieve their previous orders.
- Retrieve details of an individual order.
- View order items.
- View order status.
- View order totals and relevant order dates.

Customers must only be able to access their own order information.

---

## 8. Review Requirements

The API shall support product review functionality required by the project.

The API should allow the system to:

- Retrieve reviews for a product.
- Associate reviews with customers and products.
- Store review ratings and review text.
- Store review dates and review status.
- Provide review information to the AI review-summary functionality.

Review data should be validated before being stored.

---

## 9. Catalogue-Grounded AI Assistant Requirements

The API shall provide controlled access to catalogue information for the AI shopping assistant.

The AI assistant should be able to:

- Receive a customer question.
- Retrieve relevant catalogue information.
- Generate a response grounded in available catalogue data.
- Avoid relying on unsupported product information.
- Return an appropriate response to the frontend.

The AI functionality should not directly modify product, customer, cart or order records unless explicitly authorised through backend business logic.

---

## 10. Guided Recommendation Requirements

The API shall support guided product recommendations.

The recommendation functionality should:

- Receive relevant customer preferences or requirements.
- Retrieve matching catalogue information.
- Identify suitable products.
- Return recommendation results to the frontend.
- Provide sufficient product information for the customer to understand the recommendation.

Recommendations should be based on available catalogue information rather than unsupported product claims.

---

## 11. Review Summary Requirements

The API shall support review-summary functionality.

The system should:

- Retrieve relevant product reviews.
- Provide appropriate review information to the summarisation component.
- Generate a concise summary of common customer feedback.
- Return the summary to the frontend.
- Avoid presenting unsupported claims as customer feedback.

---

## 12. Administration Requirements

The API shall provide protected functionality for authorised administrators.

Administrative functionality should support:

- Product management.
- Category management where required.
- Stock information management.
- Order status management.
- Review status management where required.

Administrative endpoints must require appropriate authorisation.

---

## 13. Authentication and Authorisation Requirements

The API shall implement authentication for protected customer functionality.

The API shall distinguish between:

- Unauthenticated users.
- Authenticated customers.
- Authorised administrators.

Protected resources shall require authentication.

Administrative operations shall require appropriate administrator privileges.

The backend shall prevent customers from accessing other customers' private information.

---

## 14. Validation Requirements

The API shall validate incoming requests before processing them.

Validation should include:

- Required fields.
- Valid identifiers.
- Valid product quantities.
- Valid review ratings.
- Valid account information.
- Valid request formats.
- Appropriate business rules.

Invalid requests should return clear error responses without exposing sensitive backend information.

---

## 15. Error Handling Requirements

The API shall provide consistent error responses.

Errors should communicate:

- The HTTP status.
- A clear error message.
- The relevant validation or processing problem where appropriate.

The API should use appropriate HTTP status codes for successful requests, invalid requests, authentication failures, authorisation failures, missing resources and server-side errors.

---

## 16. Frontend Integration Requirements

The API shall provide predictable responses that can be consumed by the frontend application.

The API should:

- Use consistent endpoint naming.
- Use consistent request and response structures.
- Return appropriate HTTP status codes.
- Support JSON-based communication.
- Separate presentation concerns from backend business logic.

---

## 17. Database Integration Requirements

The backend API shall interact with the application database through appropriate backend services.

API operations should support the database entities identified during the initial database analysis, including:

- User
- Product
- Category
- Review
- Cart
- Cart Item
- Order
- Order Item

The API shall apply business rules before creating, updating or deleting database records.

---

## 18. Security Requirements

The API shall follow basic application security principles.

The implementation should:

- Protect authenticated endpoints.
- Protect administrator endpoints.
- Avoid returning passwords or password hashes.
- Validate and sanitise input where appropriate.
- Prevent unauthorised access to customer data.
- Avoid exposing unnecessary internal system information.
- Protect sensitive configuration such as API credentials and AI service keys.

---

## 19. AI Integration Requirements

AI-related API functionality shall be separated from core e-commerce business logic where practical.

AI service credentials must not be exposed to the frontend.

The backend should control:

- AI requests.
- Catalogue data supplied to AI functionality.
- Relevant response validation.
- Error handling for unavailable AI services.

---

## 20. API Traceability

| Application Feature | API Requirement Area | Related Data |
|---|---|---|
| Product catalogue | Product Catalogue | Product, Category |
| Search/filter | Product Catalogue | Product, Category |
| Product details | Product Catalogue | Product |
| Customer accounts | Customer Accounts | User |
| Shopping cart | Shopping Cart | Cart, Cart Item, Product |
| Simulated checkout | Checkout | Order, Order Item |
| Order history | Order History | User, Order, Order Item |
| AI assistant | Catalogue-grounded AI Assistant | Product, Category, Review |
| Guided recommendations | Recommendations | Product, Category |
| Review summaries | Review Summaries | Review, Product |
| Administration | Administration | Product, Category, Order, Review |

---

## 21. Initial API Design Direction

The detailed endpoint design will be documented separately in:

`api-design-v1.md`

The API design will define the proposed endpoint paths, HTTP methods, request parameters, request bodies, response structures, authentication requirements and error handling.

This requirements document establishes the initial API baseline before detailed endpoint design and implementation.