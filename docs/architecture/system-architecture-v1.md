# SmartShop AI – System Architecture


**Project:** SmartShop AI – AI-Enhanced E-Commerce Platform  
**Unit:** COIT13230 – Application Development Project  
**Author:** Prabhu Ram Khadka  
**Role:** Backend Development, Database, Security and Integration  
**Document Version:** v1.0  
**Date:** 16/08/2026  


---


## 1. Purpose


This document defines the initial system architecture for the SmartShop AI application.


The architecture describes how the frontend, backend API, database and AI service communicate to provide the required e-commerce and AI-assisted functionality.


The architecture is designed to support secure communication, separation of responsibilities, maintainability and future integration of additional services.


---


## 2. Architectural Style


SmartShop AI will use a client-server architecture with a layered backend design.


The main architectural components are:


- React web application
- Node.js and Express backend API
- MySQL relational database
- External AI service
- Rule-based AI fallback mechanism


The React application acts as the client. The Node.js/Express server provides the main backend services and controls access to the database and external AI service.


---


## 3. High-Level Architecture


The proposed architecture follows this communication flow:

docs\architecture\High-Level Architecture.png

## 4 Frontend Layer

The frontend will be implemented using React.

The frontend is responsible for:

-Displaying product information
-Product searching and filtering
-Customer registration and login interfaces
-Shopping cart management
-Checkout interaction
-Order history
-AI-assisted product recommendations
-AI assistant interaction
-Review-related interfaces
-Administrative interfaces where applicable

The frontend communicates with the backend through REST API requests.

The frontend will not directly access the MySQL database or expose sensitive AI credentials.

## 5. Backend API Layer

The backend will use Node.js with Express.

The backend provides the main application services and acts as the intermediary between the frontend, database and AI service.

The backend responsibilities include:

-Authentication
-Authorisation
-Customer management
-Product management
-Category management
-Shopping cart operations
-Order processing
-Review management
-API validation
-Database access
-AI service integration
-AI response validation
-Error handling
-Security controls

The backend will expose REST-style endpoints under the /api base path.

Example:

-GET /api/products
-POST /api/auth/register
-POST /api/auth/login

## 6. Database Layer

MySQL will be used as the relational database management system.

The database stores application information including:

-Users
-Categories
-Products
-Shopping carts
-Cart items
-Orders
-Order items
-Reviews

The database will use primary keys and foreign keys to maintain relationships and data integrity.

The initial database design is documented separately in:

-docs/database/database-analysis-v1.md

The initial ERD is stored in:

-docs/database/erd/DB01_SmartShop_Initial_ERD.png

## 7. AI Service Integration

SmartShop AI will use an external AI service to support controlled AI-assisted functionality.

AI functionality may include:

-Product recommendations
-Natural-language product assistance
-Product and compatibility questions
-Review summarisation

-The backend will control communication with the AI service.

-The frontend will not communicate directly with the external AI service.

-This approach helps protect API credentials and allows the backend to validate information before it is presented to customers.

-AI responses should be grounded in approved product and catalogue information.

## 8. AI Fallback Mechanism

-The system will include a rule-based fallback mechanism.

-If the external AI service is unavailable, fails, or cannot provide an acceptable response, the backend can use predefined rules or return an appropriate service message.

-The fallback mechanism reduces the dependency on continuous availability of the external AI service.

-The system will not allow the AI service to perform autonomous purchases.

## 9. Authentication and Authorisation

-Authentication will be handled by the backend.

-Customer authentication will use the authentication API.

-Protected operations will require an authenticated user.

-Administrative operations will require appropriate authorisation based on the user's role.

-Passwords will not be stored as plain text.

-Password hashes will be stored in the database instead.

-Sensitive credentials and AI API keys must not be exposed through frontend code or API responses.

## 10. Security Architecture

Security controls will be applied across the system.

The main controls include:

-Password hashing
-Authentication
-Role-based authorisation
-Server-side validation
-Protected API endpoints
-Secure handling of API credentials
-Input validation
-Controlled database access
-Appropriate HTTP status codes
-Protection of sensitive information
-Validation of AI-generated responses

The backend acts as the security boundary between the frontend, database and external AI service.

## 11. Communication Flow

The normal customer request flow is:

-The customer interacts with the React frontend.
-The frontend sends a REST API request to the Node.js/Express backend.
-The backend authenticates and validates the request where required.
-The backend performs the required business logic.
-The backend accesses MySQL when database information is required.
-For AI-assisted functionality, the backend communicates with the external AI service.
-The backend validates and processes the result.
-The backend sends a JSON response to the React frontend.
-The frontend displays the result to the customer.

## 12. Separation of Responsibilities

The system separates responsibilities between the main layers.

-Layer	Main Responsibility
-React Frontend	User interface and user interaction
-Node.js/Express API	Business logic, API processing, authentication and integration
-MySQL	Persistent relational data storage
-AI Service	Controlled AI-assisted functionality
-AI Fallback	Rule-based response when AI service is unavailable

This separation improves maintainability and allows individual components to be developed and tested independently.

## 13. Scalability and Maintainability

-The architecture is designed so that frontend, backend and database responsibilities remain separated.

-The backend can be extended with additional API modules without requiring direct database access from the frontend.

-The database can be extended with additional entities as project requirements evolve.

-AI integration is isolated through the backend so that the external AI provider can potentially be changed without redesigning the frontend.

-The architecture therefore provides a foundation for future extension while remaining appropriate for the current university project scope.

## 14. Architectural Constraints

The architecture is subject to the following project constraints:

-The project has a limited development schedule.
-The system uses realistic fictional data for demonstration.
-Real payment processing is outside the project scope.
-AI service availability and latency may affect the application.
-AI functionality must remain controlled and grounded in approved catalogue information.
-The application must not perform autonomous purchasing.
-The system is designed primarily as a web application.

## 15. Architecture Summary

The SmartShop AI architecture uses a React client communicating with a Node.js/Express backend API.

The backend provides controlled access to the MySQL database and external AI service.

This architecture provides:

-Clear separation of responsibilities
-Secure backend-controlled integration
-Relational data management
-REST API communication
-Authentication and authorisation
-Controlled AI integration
-AI fallback capability
-Maintainability and future extensibility

The architecture provides the technical foundation for the SmartShop AI e-commerce platform and supports integration between the components developed by the project team.

## 16. Related Technical Documents

The following technical documents support this architecture:

-docs/database/database-analysis-v1.md
-docs/database/erd/DB01_SmartShop_Initial_ERD.png
-docs/api/api-requirements-v1.md
-docs/api/api-design-v1.md