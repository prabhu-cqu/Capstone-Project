# SmartShop AI - System Architecture

## Architecture Overview

SmartShop AI will use a client-server web architecture. Customers and administrators will access the application through a web browser. The frontend will communicate with the backend server through API requests.

The backend will manage the main application logic, authentication, database operations and communication with the AI service.

This architecture separates the user interface, application logic, data storage and AI functionality so that the main components can be developed, tested and maintained separately.

## Main Components

### 1. Client / Web Browser

Customers and administrators will access SmartShop AI using a web browser.

The client will allow users to:

- browse and search products;
- view product details;
- register and log in;
- manage a shopping cart;
- complete a simulated checkout;
- view order history;
- interact with the AI shopping assistant; and
- access authorised administration functions.

### 2. Frontend Application

The frontend will provide the user interface for SmartShop AI.

It will display product information, forms, shopping functions and AI interactions. User actions will be sent to the backend through API requests.

### 3. Backend Server

The backend server will process requests received from the frontend.

Its main responsibilities will include:

- user authentication and authorisation;
- product and catalogue operations;
- shopping cart management;
- simulated checkout;
- order management;
- input validation;
- database communication; and
- communication with the AI service.

### 4. Database

The database will store the structured information required by SmartShop AI.

This may include:

- users;
- products;
- categories;
- shopping carts;
- cart items;
- orders;
- order items;
- reviews; and
- stock information.

The frontend will not directly access the database. Database operations will be controlled through the backend.

### 5. AI Service

The AI service will support the three planned AI capabilities:

- catalogue-based shopping assistance;
- guided product recommendations; and
- summaries of approved customer reviews.

The backend will control communication between SmartShop AI and the AI service.

## High-Level Architecture

```text
        Customers / Administrators
                  |
                  v
             Web Browser
                  |
                  v
        Frontend Application
                  |
             API Requests
                  |
                  v
           Backend Server
          /       |       \
         v        v        v
    Database  Authentication  AI Service