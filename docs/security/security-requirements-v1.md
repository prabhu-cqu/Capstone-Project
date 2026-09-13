# SmartShop AI – Security Requirements and Design

**Project:** SmartShop AI – AI-Enhanced E-Commerce Platform  
**Unit:** COIT13230 – Application Development Project  
**Author:** Prabhu Ram Khadka  
**Role:** Backend Development, Database, Security and Integration  
**Document Version:** v1.0  
**Date:** 17/08/2026

---

## 1. Purpose

This document defines the initial security requirements and security design for the SmartShop AI application.

The security design focuses on protecting customer accounts, application data, API endpoints, database access and external AI service credentials.

---

## 2. Security Objectives

The main security objectives are:

- Protect customer account information.
- Protect authentication credentials.
- Prevent unauthorised access to protected resources.
- Protect database information.
- Protect administrative functions.
- Protect external AI service credentials.
- Validate user input.
- Reduce the risk of malicious or invalid requests.
- Prevent sensitive information from being exposed through API responses.
- Maintain appropriate access control between customers and administrators.

---

## 3. Authentication Requirements

The system must provide authentication for customer accounts.

Required authentication functions include:

- Customer registration.
- Customer login.
- Customer logout.
- Authentication of protected requests.
- Secure password handling.

Passwords must not be stored as plain text.

Passwords should be stored using secure password hashing.

---

## 4. Authorisation Requirements

The application must distinguish between different access levels.

### Customer

Customers may access:

- Their own account information.
- Their own shopping cart.
- Their own orders.
- Product catalogue information.
- Product reviews.
- AI shopping assistance.
- Guided recommendations.

### Administrator

Administrators may access authorised management functions including:

- Product management.
- Stock management.
- Order status management.
- Review management.

A customer must not be able to access another customer's private information or orders.

---

## 5. API Security

The backend API will act as the security boundary between the frontend and protected services.

Security controls include:

- Authentication for protected endpoints.
- Authorisation for administrative endpoints.
- Server-side input validation.
- Consistent error handling.
- Protection of sensitive information.
- Appropriate HTTP status codes.
- Controlled database access.

The frontend must not directly access the database.

---

## 6. Input Validation

All user-supplied input should be validated by the backend.

Validation should be applied to:

- Registration information.
- Login information.
- Product search parameters.
- Cart quantities.
- Checkout information.
- Review ratings.
- Review text.
- AI assistant questions.
- Recommendation requirements.
- Administrative inputs.

Invalid or malformed input should be rejected with an appropriate error response.

---

## 7. Password Security

Customer passwords must not be stored as plain text.

The backend should use secure password hashing.

Password hashes must not be returned through API responses.

Authentication responses must not expose sensitive password information.

---

## 8. Database Security

Database access must be controlled through the backend.

The frontend must never connect directly to MySQL.

Database security requirements include:

- Controlled database credentials.
- Server-side database access.
- Validation of database requests.
- Protection of customer information.
- Protection of order information.
- Protection of authentication data.
- Appropriate database permissions.

Database credentials must not be committed to the public repository.

---

## 9. AI Service Security

External AI service credentials must be protected.

The frontend must not contain the external AI API key.

AI requests should be made through the backend.

The backend should control the information provided to the AI service.

AI responses should be checked before being returned to customers.

The AI service must not be allowed to perform autonomous purchases.

---

## 10. Sensitive Information Protection

The following information must not be unnecessarily exposed through API responses:

- Passwords.
- Password hashes.
- Database credentials.
- AI API keys.
- Internal server information.
- Stack traces.
- Other sensitive security information.

Error messages should provide useful information without exposing internal implementation details.

---

## 11. Session and Access Protection

Protected resources should require successful authentication.

A customer should only be able to access resources belonging to their own account.

For example:

```text
Customer A
    ↓
GET /api/orders
    ↓
Only Customer A's orders
```
A customer must not be able to retrieve another customer's private orders by changing an order ID.

## 12. Administrative Security

Administrative endpoints must require administrator authorisation.

Examples include:

-POST /api/admin/products
-PUT /api/admin/products/{productId}
-PATCH /api/admin/products/{productId}/stock
-PATCH /api/admin/orders/{orderId}/status
-PATCH /api/admin/reviews/{reviewId}/status

Unauthorised customers must not be able to access these endpoints.

## 13. Error Handling

The API should use consistent error responses.

Example:
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication is required."
  }
}
```
The API should not expose:

-Stack traces.
-Database connection information.
-Internal file paths.
-API keys.
-Password information.

## 14. Security Testing Requirements

Security testing should include:

-Test	Expected Result
-Access protected endpoint without authentication	Request rejected
-Access another customer's order	Access rejected
-Customer accesses admin endpoint	Access rejected
-Invalid login credentials	Authentication rejected
-Invalid registration data	Request rejected
-Invalid cart quantity	Request rejected
-Missing required API fields	Request rejected
-Sensitive information in API response	Information not exposed
-AI API key exposed to frontend	Must not be exposed

## 15. Security Traceability

The security design supports the project's functional and non-functional requirements relating to:

-Customer authentication.
-Role-based access.
-Secure API communication.
-Data protection.
-API security.
-Reliability.
-Maintainability.
-Controlled AI integration.

The security requirements will be refined during implementation and security testing.

## 16. Security Design Summary

The SmartShop AI security architecture places the Node.js/Express backend between the frontend, database and external AI service.

The backend is responsible for:

-Authentication.
-Authorisation.
-Input validation.
-Secure database access.
-AI credential protection.
-Sensitive information protection.
-Error handling.

This design provides a security boundary around the application's protected resources and supports secure integration between the components developed by the project team.

## 17. Future Security Refinement

Security controls may be refined during implementation based on:

-Backend implementation.
-Authentication technology selected by the team.
-Testing results.
-Integration requirements.
-Identified security risks.
-Team review.

Any significant security design changes should be documented through updated technical documentation and Git commits.