# SmartShop AI – Backend Requirements Analysis

**Project:** SmartShop AI – AI-Enhanced E-Commerce Platform  
**Unit:** COIT13230 – Application Development Project  
**Author:** Prabhu Ram Khadka  
**Role:** Backend Development, Database Lead, Security and Integration  
**Document Version:** v1.0  
**Date:** 15/08/2026

---

## 1. Purpose

This document analyses the approved SmartShop AI project requirements from Assessment 1 and identifies the backend, database, API, authentication, security and integration requirements relevant to my assigned responsibilities.

The purpose is to establish a technical foundation before implementation begins.

---

## 2. My Approved Technical Responsibilities

My approved responsibilities include:

- Backend architecture
- Database design and implementation
- RESTful API development
- Administration functionality
- Authentication
- Security
- Deployment
- Technical integration

---

## 3. Backend Functional Requirements

### 3.1 Product Catalogue

The backend must provide the data and API functionality required to support the product catalogue.

Backend considerations:

- Product data storage
- Product retrieval
- Product categories
- Product information
- Price information
- Stock information
- API response structure
- Data validation

---

### 3.2 Search and Filtering

The backend must support the approved search/filter functionality.

Backend considerations:

- Searchable product information
- Filtering criteria
- Database queries
- Input validation
- Appropriate API responses

---

### 3.3 Product Details

The backend must provide the information required for the product details view.

Backend considerations:

- Product identification
- Product specifications
- Price
- Stock information
- Category information
- Review-related data where required

---

### 3.4 Customer Accounts

The backend must support customer account functionality.

Backend considerations:

- User records
- Registration
- Login
- Password handling
- Authentication
- Account data validation
- Protected account information

---

### 3.5 Shopping Cart

The backend must support persistent shopping-cart functionality.

Backend considerations:

- Cart ownership
- Product references
- Quantities
- Cart retrieval
- Cart updates
- Data validation

---

### 3.6 Simulated Checkout

The backend must support the approved simulated checkout process.

Backend considerations:

- Order creation
- Customer information
- Cart-to-order conversion
- Order totals
- Validation
- No real payment processing

---

### 3.7 Order History

The backend must provide access to a customer's order history.

Backend considerations:

- Customer/order relationship
- Order retrieval
- Order status
- Order details
- Authorisation

---

### 3.8 Administration

The backend must support approved administrative functionality.

Backend considerations:

- Product management
- Stock management
- Review management where applicable
- Order status management
- Administrator authorisation
- Protected administrative endpoints

---

### 3.9 AI Integration

The backend must support controlled integration between the application and approved AI functionality.

Backend considerations:

- Secure communication with the AI service
- Catalogue data grounding
- Product identification
- Validation of AI-related data
- Protection of API credentials
- Controlled error handling
- Fallback behaviour

---

## 4. Non-Functional Requirements Relevant to My Role

The backend should support:

- Security
- Reliability
- Maintainability
- Data integrity
- Appropriate validation
- Protected credentials
- Role-based access control
- Secure handling of customer information
- Controlled error responses

---

## 5. Authentication and Security Requirements

Security requirements relevant to my role include:

- Password hashing
- Server-side validation
- Role-based access control
- Protected API credentials
- Authentication for protected resources
- Authorisation for administrative functionality
- Controlled error messages
- Protection of sensitive application data

---

## 6. Database Requirements

The database must support the approved application functionality.

Initial entities requiring investigation include:

- Users
- Products
- Categories
- Reviews
- Orders
- Order items
- Shopping carts
- Inventory/stock

The final database structure will be refined during database analysis and ERD development.

---

## 7. API Requirements

The backend will expose APIs required by the approved application functionality.

Initial API areas include:

- Authentication
- Products
- Search/filter
- Product details
- Cart
- Orders
- Order history
- Administration
- AI integration where required

The detailed API contract will be developed after requirements and database analysis.

---

## 8. Frontend Integration Dependencies

The frontend requires stable backend contracts for:

- Product data
- Search/filter results
- Product details
- Authentication
- Cart operations
- Checkout/order creation
- Order history
- Administration

API contracts will therefore be agreed with the frontend lead before major implementation.

---

## 9. AI Integration Dependencies

The backend must provide controlled access to approved catalogue information for AI-related functionality.

Important controls include:

- Product information must come from approved catalogue data.
- Price and stock information must remain controlled by the server/database.
- AI responses must not be allowed to perform purchases.
- Unsupported requests should receive appropriate fallback/limitation behaviour.

---

## 10. Requirement Traceability

| Requirement Area | Backend Responsibility | Planned Artefact | Future Evidence |
|---|---|---|---|
| Product catalogue | Product data/API | API + database design | GitHub/API evidence |
| Search/filter | Query/API | API design | API tests |
| Product details | Product API | API contract | API tests |
| Customer accounts | Authentication/API | Auth design | Security tests |
| Shopping cart | Cart API/database | Database + API | Integration tests |
| Simulated checkout | Order API | Database + API | Test evidence |
| Order history | Order API | API design | Test evidence |
| Administration | Admin API/security | API + security design | Authorisation tests |
| AI integration | Backend/AI integration | Integration design | AI/integration tests |

---

## 11. Dependencies and Collaboration

### Daler

I need to coordinate with Daler regarding:

- Frontend data requirements
- API response structures
- Authentication requirements
- Product information
- Cart and order data
- Integration points

### Jeet

I need to coordinate with Jeet regarding:

- AI integration requirements
- Backend data supplied to AI functionality
- Testing requirements
- Security and integration testing
- AI-related validation

---

## 12. Open Questions

The following items require confirmation or further design before implementation:

- Final database schema
- Final API endpoint list
- Exact request/response structures
- Authentication implementation details
- Administrative role structure
- AI service integration details
- Error and fallback handling

---

## 13. Next Steps

1. Refine the backend requirements.
2. Create the technical architecture.
3. Identify database entities and relationships.
4. Create the ERD.
5. Define API contracts.
6. Design authentication and security controls.
7. Begin backend implementation.
8. Integrate with the frontend.
9. Support AI integration and testing.