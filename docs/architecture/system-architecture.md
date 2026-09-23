# SmartShop AI - System Architecture

## 1. Architecture Overview

SmartShop AI will use a client-server web architecture. Customers and administrators will access the application through a web browser, while the frontend application will communicate with the backend server through API requests.

The backend server will manage the main application logic, authentication, database operations and communication with the external AI service.

This architecture separates the user interface, application logic, data storage and AI functionality so that the main components can be developed, tested and maintained independently.

---

## 2. Main Architecture Components

### 2.1 Client / Web Browser

Customers and administrators will access SmartShop AI through a web browser.

The client will allow users to:

* browse the product catalogue;
* search, filter and sort products;
* view detailed product information;
* register and log in;
* manage a shopping cart;
* complete a simulated checkout;
* view previous orders;
* interact with the AI shopping assistant;
* receive guided product recommendations;
* view AI-generated review summaries; and
* access authorised administration functions.

The web browser will not communicate directly with the database or AI service.

---

### 2.2 Frontend Application

The frontend application provides the visual user interface for SmartShop AI.

Its main responsibilities include:

* displaying the product catalogue;
* displaying product details;
* providing search and filtering controls;
* displaying registration and login forms;
* managing shopping cart interactions;
* providing the simulated checkout interface;
* displaying order history;
* providing the AI shopping assistant interface;
* displaying guided recommendations;
* displaying review summaries; and
* providing authorised administration interfaces.

User actions will be sent from the frontend to the backend server through API requests.

---

### 2.3 Backend Server

The backend server processes requests received from the frontend and contains the main application logic.

Its main responsibilities include:

* user registration and authentication;
* user authorisation;
* product and catalogue operations;
* search and filtering logic;
* shopping cart management;
* simulated checkout processing;
* order management;
* review management;
* administrator access control;
* user input validation;
* database communication;
* communication with the AI service; and
* validation of AI-generated responses.

The backend acts as the main control layer between the frontend, database and AI service.

---

### 2.4 Database

The database stores the structured information required by SmartShop AI.

The main information stored may include:

* users;
* products;
* product categories;
* stock information;
* shopping carts;
* cart items;
* orders;
* order items;
* customer reviews; and
* order status information.

The frontend will not directly access the database. All database operations will be processed through the backend server.

---

### 2.5 Authentication and Authorisation

Authentication will be managed by the backend server.

The authentication component will be responsible for:

* registering customer accounts;
* verifying login credentials;
* protecting user sessions;
* distinguishing between customer and administrator roles;
* preventing unauthorised access to administrative functions; and
* supporting secure logout.

Passwords will not be stored as plain text.

---

### 2.6 AI Service

The AI service will support the controlled AI functionality of SmartShop AI.

The three main AI capabilities are:

1. Catalogue-based shopping assistance
2. Guided product recommendations
3. Summaries of approved customer reviews

The backend will control communication with the AI service.

For catalogue-related questions, the backend will provide relevant approved product information to the AI service.

For recommendations, user requirements such as budget, device and intended use may be combined with catalogue information to produce suitable product suggestions.

For review summaries, only approved review information should be used.

The AI service should not be treated as the authoritative source for price, stock or product identifiers. These values should remain controlled by the application database.

---

## 3. High-Level System Architecture

```text
               Customers / Administrators
                         |
                         |
                         v
                    Web Browser
                         |
                         |
                         v
                Frontend Application
                         |
                    API Requests
                         |
                         v
                  Backend Server
                 /       |       \
                /        |        \
               v         v         v
          Database   Authentication   AI Service
```

The frontend is responsible for presentation and user interaction.

The backend server processes requests and controls access to application services.

The database stores verified project data.

Authentication controls access to customer and administrator functions.

The AI service provides controlled assistance, recommendations and review summarisation.

---

## 4. Basic Request Flow

A typical SmartShop AI request will follow these steps:

1. A customer or administrator interacts with the SmartShop AI interface through a web browser.
2. The frontend receives the user's input.
3. The frontend sends an API request to the backend server.
4. The backend validates the request.
5. The backend performs the required application operation.
6. If data is required, the backend communicates with the database.
7. If AI assistance is required, the backend sends controlled information to the AI service.
8. The backend processes and validates the result.
9. The response is returned to the frontend.
10. The frontend displays the result to the user.

---

## 5. Example Product Request

A normal product catalogue request may operate as follows:

```text
Customer
   |
   v
Frontend
   |
   v
Backend API
   |
   v
Database
   |
   v
Backend API
   |
   v
Frontend
   |
   v
Customer
```

The customer requests product information through the interface.

The frontend sends the request to the backend.

The backend retrieves verified product information from the database and returns it to the frontend.

---

## 6. Example AI Request

An AI shopping assistant request may operate as follows:

```text
Customer
   |
   v
Frontend
   |
   v
Backend
   |
   +------> Database
   |           |
   |     Catalogue Data
   |           |
   <-----------+
   |
   v
AI Service
   |
AI Response
   |
   v
Backend Validation
   |
   v
Frontend
   |
   v
Customer
```

The customer submits a product-related question.

The backend retrieves relevant catalogue information and sends controlled information to the AI service.

The AI service generates a response.

The backend validates the response before returning it to the customer.

---

## 7. Client-Server Communication

SmartShop AI follows a client-server communication model.

The client is responsible for displaying the application and collecting user input.

The backend server is responsible for processing requests, applying application rules and controlling access to the database and AI service.

Communication between the frontend and backend will occur through API requests.

Typical operations may include:

* retrieving products;
* searching products;
* registering users;
* authenticating users;
* updating shopping carts;
* submitting simulated orders;
* retrieving order history;
* submitting AI questions;
* requesting product recommendations; and
* requesting review summaries.

More detailed API endpoint design will be developed during later implementation activities.

---

## 8. Security Considerations

The architecture will support several security and privacy controls.

These include:

* authentication will be processed through the backend server;
* administrator functions will require authorised administrator access;
* passwords will not be stored as plain text;
* passwords should be protected using appropriate password hashing;
* user input will be validated before processing;
* the frontend will not directly access the database;
* AI API credentials will remain on the server side;
* sensitive credentials will not be stored directly in public source code;
* users will not be asked to provide real payment information;
* only information required for system functionality should be collected; and
* unsupported AI responses should be handled using controlled fallback behaviour.

---

## 9. Reliability and Failure Handling

The architecture should allow the application to respond safely when individual components fail.

Examples include:

* invalid user input should produce an appropriate validation message;
* database errors should not expose sensitive technical information;
* authentication failures should not crash the application;
* AI service failure should display a controlled fallback response;
* unsupported AI questions should receive an appropriate limitation message; and
* failures during simulated checkout should not create incomplete order information.

---

## 10. Architecture Benefits

The selected client-server architecture provides several benefits for SmartShop AI.

### Separation of Responsibilities

The frontend, backend, database and AI functionality are separated into different logical components.

### Maintainability

Individual components can be updated without redesigning the entire application.

### Security

Database and AI service credentials can remain on the server instead of being exposed to the browser.

### Testing

Frontend, backend, database and AI functionality can be tested separately before complete system integration.

### Scalability

The architecture provides a foundation that could support additional functionality in future versions.

### Controlled AI Integration

The backend can control what data is sent to the AI service and validate responses before presenting them to customers.

---

## 11. Relationship to Project Requirements

The architecture supports the main SmartShop AI requirements.

The frontend supports customer and administrator interaction.

The backend supports business logic, validation, authentication and system integration.

The database provides authoritative product, user, cart, order, stock and review information.

The AI service supports catalogue-grounded assistance, recommendations and review summaries.

The architecture also supports the project's non-functional requirements for security, privacy, performance, reliability and maintainability.

---

## 12. Current Status

The initial high-level SmartShop AI system architecture has been defined as part of the Week 4 design activities.

The current architecture identifies the main client, frontend, backend, database, authentication and AI service components and describes how they interact.

More detailed technical design work, including UML class diagrams, database ERD, user interface designs and detailed client-server communication, will be developed during the next stage of the project.
