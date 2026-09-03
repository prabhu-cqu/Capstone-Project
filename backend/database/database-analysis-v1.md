# SmartShop AI – Database Analysis

**Project:** SmartShop AI – AI-Enhanced E-Commerce Platform  
**Unit:** COIT13230 – Application Development Project  
**Author:** Prabhu Ram Khadka  
**Role:** Database Lead / Backend Development  
**Document Version:** v1.0  
**Date:** 15/08/2026

---

## 1. Purpose

This document analyses the initial database requirements for the SmartShop AI application based on the approved project requirements.

The purpose is to identify the main data entities, their important attributes and relationships before creating the database schema and Entity Relationship Diagram (ERD).

---

## 2. Database Requirements

The database must support the application's approved e-commerce functionality, including:

- Product catalogue
- Product search and filtering
- Product details
- Customer accounts
- Shopping cart
- Simulated checkout
- Order history
- Product reviews
- Administration
- Catalogue-related AI functionality

The database design will be refined as the requirements and technical design develop.

---

## 3. Initial Database Entities

The following entities have been identified for further analysis:

| Entity | Purpose |
|---|---|
| User | Stores customer and administrator account information |
| Product | Stores product information used by the catalogue |
| Category | Organises products into categories |
| Review | Stores customer reviews associated with products |
| Cart | Represents a customer's shopping cart |
| Cart Item | Represents products and quantities within a cart |
| Order | Stores simulated customer orders |
| Order Item | Represents products and quantities belonging to an order |

---

## 4. Initial Entity Analysis

### 4.1 User

The User entity is required to support customer accounts and administrative access.

Potential information includes:

- User ID
- Name
- Email
- Password hash
- Role
- Account status
- Created date

---

### 4.2 Product

The Product entity represents products displayed in the catalogue.

Potential information includes:

- Product ID
- Product name
- Description
- Price
- Stock quantity
- Category
- Product specifications
- Product status

---

### 4.3 Category

The Category entity organises products into logical product groups.

Potential information includes:

- Category ID
- Category name
- Category description
- Category status

---

### 4.4 Review

The Review entity stores customer feedback associated with products.

Potential information includes:

- Review ID
- Product ID
- User ID
- Rating
- Review text
- Review date
- Review status

---

### 4.5 Cart

The Cart entity represents a customer's current shopping cart.

Potential information includes:

- Cart ID
- User ID
- Cart status
- Created date
- Updated date

---

### 4.6 Cart Item

The Cart Item entity represents individual products placed in a cart.

Potential information includes:

- Cart item ID
- Cart ID
- Product ID
- Quantity

---

### 4.7 Order

The Order entity represents an order created during the simulated checkout process.

Potential information includes:

- Order ID
- User ID
- Order date
- Order status
- Total amount

---

### 4.8 Order Item

The Order Item entity represents the products contained within an order.

Potential information includes:

- Order item ID
- Order ID
- Product ID
- Quantity
- Unit price
- Subtotal

---

## 5. Initial Relationships

The initial relationships require further validation during ERD design.

Potential relationships include:

- A User can have multiple Reviews.
- A Product can have multiple Reviews.
- A Category can contain multiple Products.
- A User can have a Cart.
- A Cart can contain multiple Cart Items.
- A Product can appear in multiple Cart Items.
- A User can have multiple Orders.
- An Order can contain multiple Order Items.
- A Product can appear in multiple Order Items.

These relationships will be represented and validated in the initial ERD.

---

## 6. Initial ERD

An initial Entity Relationship Diagram (ERD) was developed from the database requirements identified in this document.

The ERD represents the relationships between users, products, categories, reviews, shopping carts, cart items, orders and order items.

The current ERD is an initial design and may be refined during implementation and team review.

**ERD file:** `SmartShop_AI_Database_ERD_v1.drawio`

**ERD export:** `SmartShop_AI_Database_ERD_v1.png`

**Evidence:** `DB01_SmartShop_Initial_ERD.png`