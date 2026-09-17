# SmartShop AI – Project Requirements

## Project Overview

SmartShop AI is a mock e-commerce web application designed for a small Australian retailer specialising in computer, mobile and study accessories.

The system combines standard e-commerce functionality with AI-assisted features. The application uses a React frontend, Node.js/Express backend and MySQL database.

---

## Functional Requirements

| ID | Functional Requirement | Priority | Status |
|---|---|---|---|
| FR1 | Display the product catalogue by category | Must Have | Implemented |
| FR2 | Search, filter and sort products | Must Have | Implemented |
| FR3 | Display detailed product information | Must Have | Implemented |
| FR4 | Customer registration, login and logout | Must Have | Tested - Pass |
| FR5 | Persistent shopping cart | Must Have | Implemented – Testing Required |
| FR6 | Simulated checkout | Must Have | Implemented – Testing Required |
| FR7 | Customer order history | Should Have | Planned |
| FR8 | AI catalogue product Q&A | Must Have | Planned |
| FR9 | AI guided product recommendations | Must Have | Planned |
| FR10 | AI customer review summaries | Must Have | Planned |
| FR11 | Admin product catalogue management | Must Have | Planned |
| FR12 | Admin review moderation | Should Have | Planned |
| FR13 | Admin stock and order management | Must Have | Planned |

---

## FR1 – Product Catalogue

### Requirement

The system shall allow customers to browse products available in the SmartShop AI catalogue and view products by category.

### Current Implementation

The product catalogue is connected to the SmartShop AI MySQL database.

Product information is retrieved through the backend product API and displayed by the frontend. The frontend does not rely on hard-coded mock products for the active catalogue.

The current development database contains 14 active products across the following categories:

- Laptops
- Mobile Devices
- Accessories
- Audio

Product records include information such as:

- Product name
- Description
- Category
- Price
- Stock quantity
- Specifications
- Product status
- Image URL where available

### Status

**Implemented**

### Testing

Formal FR1 catalogue test cases are prepared. Full execution and recording of the catalogue test results is still required.

---

## FR2 – Product Search, Filter and Sort

### Requirement

The system shall allow customers to search, filter and sort products to help locate suitable products.

### Current Implementation

Catalogue functionality has been implemented to support product discovery using product information retrieved through the backend API.

The catalogue supports functionality such as:

- Product searching
- Category filtering
- Price-related filtering
- Product sorting

### Status

**Implemented**

### Testing

Formal FR2 test cases have been prepared but still require execution and recording of results.

---

## FR3 – Product Details

### Requirement

The system shall allow customers to view detailed information about a selected product.

### Current Implementation

Product information is retrieved from the database through the backend API and displayed through the frontend.

Product details may include:

- Product name
- Description
- Price
- Stock
- Category
- Specifications
- Product image where available

### Status

**Implemented**

### Testing

Formal FR3 product-detail test cases have been prepared but still require execution and recording of results.

---

## FR4 – Customer Registration, Login and Logout

### Requirement

The system shall allow customers to create an account, log in using valid credentials and log out of the application.

### Current Implementation

Customer authentication is connected to the MySQL database through the backend authentication API.

Registration sends customer details from the frontend to the backend.

The backend:

1. Validates required registration information.
2. Checks whether the email address already exists.
3. Hashes the customer's password using bcrypt.
4. Stores the customer account in the MySQL `users` table.

Login:

1. Accepts the customer's email and password.
2. Retrieves the matching user from MySQL.
3. Checks that the account is active.
4. Compares the supplied password with the stored bcrypt password hash.
5. Generates a JWT after successful authentication.
6. Returns authenticated customer information to the frontend.

Logout clears the locally stored authentication information and customer session state.

The frontend also provides user feedback for successful registration, login and logout.

Examples include:

- Account created successfully and welcome message
- Login successful and welcome message
- Logged out successfully message

### Status

**Tested**

### Verified Evidence

The following authentication behaviour has been manually verified during development:

- New customer registration successfully creates a record in the MySQL `users` table.
- Customer passwords are stored as password hashes rather than plain-text passwords.
- Registered customers can log in using the correct email and password.
- Invalid authentication attempts are handled by the backend.
- Successful authentication generates a JWT.
- The logged-in customer's name is displayed by the frontend.
- Customers can successfully log out.
- Authentication/session information is removed from local storage during logout.

Additional formal authentication test cases are documented in:

`tests/authentication-test-cases.md`

---

## FR5 – Persistent Shopping Cart

### Requirement

The system shall allow customers to add products to a shopping cart and maintain cart information during the customer session.

### Status

**Implemented – Testing Required**

The cart implementation should be formally retested against the current database-backed catalogue before being marked as fully tested.

---

## FR6 – Simulated Checkout

### Requirement

The system shall provide a simulated checkout process for demonstration purposes.

The project does not process real payments.

### Status

**Implemented – Testing Required**

Formal checkout testing should be completed before changing this requirement to Tested.

---

## FR7 – Customer Order History

### Requirement

The system should allow authenticated customers to view their previous simulated orders.

### Status

**Planned**

---

## FR8 – AI Catalogue Product Q&A

### Requirement

The system shall provide an AI-assisted catalogue question-and-answer feature that responds to customer product questions using approved catalogue information.

### Status

**Planned**

---

## FR9 – AI Guided Product Recommendations

### Requirement

The system shall provide guided product recommendations based on customer requirements and catalogue information.

### Status

**Planned**

---

## FR10 – AI Customer Review Summaries

### Requirement

The system shall provide AI-generated summaries based on approved customer review information.

### Status

**Planned**

---

## FR11 – Admin Product Catalogue Management

### Requirement

An authorised administrator shall be able to manage catalogue products, including creating, editing and archiving products.

### Status

**Planned**

---

## FR12 – Admin Review Moderation

### Requirement

An authorised administrator should be able to moderate customer reviews before approved review information is used by customer-facing functionality.

### Status

**Planned**

---

## FR13 – Admin Stock and Order Management

### Requirement

An authorised administrator shall be able to manage product stock information and simulated customer order status.

### Status

**Planned**

---

# Non-Functional Requirements

## NFR1 – Usability

The application should provide a clear and consistent user interface that allows customers to navigate the catalogue, authentication, cart and other major features.

## NFR2 – Performance

The system should provide acceptable response times for normal catalogue browsing and customer operations in the development environment.

## NFR3 – Security

The application should protect customer authentication information.

Current security controls include:

- Password hashing using bcrypt
- JWT-based authentication
- Backend authentication validation
- Duplicate email checking
- Account-status checking
- Environment variables for sensitive configuration

Passwords must not be stored in plain text.

## NFR4 – Maintainability

The project should maintain separation between frontend, backend, database, documentation and testing components.

## NFR5 – Data Integrity

Product, customer, cart and order information should be managed through the backend and database rather than duplicated as independent frontend mock data for production functionality.

---

# Current Development Summary

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

The next development and verification priorities include:

- Execute FR1–FR3 catalogue test cases
- Retest FR5 cart functionality
- Retest FR6 simulated checkout
- Develop AI catalogue Q&A
- Develop guided product recommendations
- Develop review summarisation
- Develop required administrator functionality