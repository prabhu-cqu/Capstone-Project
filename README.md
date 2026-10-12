# SmartShop AI — Capstone Project

**COIT13230 — Application Development Project**  
**Term 2, 2026**  
**Project Status:** Completed Academic Prototype

## 1. Project Overview

SmartShop AI is an AI-enhanced e-commerce web application developed for a fictional small Australian retailer selling computers, mobile devices and study accessories.

The application combines traditional online shopping features with AI-powered assistance to help customers discover products, compare options and make informed purchasing decisions.

## 2. Main Features

### Customer Features
- User registration and login
- Product catalogue, search, filtering and sorting
- Product details and specifications
- Shopping cart and simulated checkout
- Order history
- AI-powered product question answering
- Budget-aware product recommendations
- AI summaries of approved customer reviews

### Administrator Features
- Product and stock management
- Order management
- Customer and user management
- Customer review moderation

## 3. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js, Vite, JavaScript, HTML, CSS |
| Backend | Node.js, Express.js |
| Database | MySQL 8 |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Artificial Intelligence | Google Gemini API |
| Version Control | Git and GitHub |

## 4. Prerequisites

Before running the application, install:

- Node.js and npm compatible with the project's Vite version
- MySQL Server 8.x
- MySQL Workbench (recommended)
- Git (optional, for cloning the repository)
- A valid Google Gemini API key for AI functionality

## 5. Installation and Setup

### Step 1 — Download the Project

Clone the repository:

```bash
git clone https://github.com/prabhu-cqu/Capstone-Project.git
```

Alternatively, download the project ZIP from GitHub and extract it.

Open a terminal in the project root folder.

### Step 2 — Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3 — Configure Backend Environment Variables

Create a file named `.env` inside the `backend` folder.

Add the following configuration:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=smartshop_ai
JWT_SECRET=YOUR_LONG_RANDOM_JWT_SECRET
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Replace the placeholder values with your own local configuration.

**Security:** Never upload the `.env` file, API keys, database passwords or JWT secrets to GitHub.

### Step 4 — Set Up the MySQL Database

Open MySQL Workbench and connect to your local MySQL server.

Create the database:

```sql
CREATE DATABASE IF NOT EXISTS smartshop_ai;
USE smartshop_ai;
```

Import the final database dump from:

`database/smartshop_ai_final_dump.sql`

Using MySQL Workbench:

1. Select **Server → Data Import**.
2. Choose **Import from Self-Contained File**.
3. Select `smartshop_ai_final_dump.sql`.
4. Select `smartshop_ai` as the target schema.
5. Click **Start Import**.

Alternatively, use the MySQL command line:

```bash
mysql -u root -p smartshop_ai < database/smartshop_ai_final_dump.sql
```

Run the command from the project root folder.

**Warning:** The final dump contains table creation and data insertion statements. Import it into a fresh database or a backed-up database because existing tables may be replaced.

The repository also contains earlier schema and seed files. Do not import those over the final database dump unless intentionally rebuilding the database.

### Step 5 — Start the Backend

Open a terminal:

```bash
cd backend
npm run dev
```

Alternatively:

```bash
npm start
```

The backend should run at:

`http://localhost:5000`

Check the backend:

`http://localhost:5000/api/health`

Check the database connection:

`http://localhost:5000/api/health/db`

Both endpoints should return successful responses when configured correctly.

### Step 6 — Install Frontend Dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### Step 7 — Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal, typically:

`http://localhost:5173`

Keep both the frontend and backend terminals running while using the application.

## 6. AI Functionality

SmartShop AI integrates the Google Gemini API to provide three AI-assisted features:

**AI Product Q&A:** Answers product-related questions using catalogue information.

**AI Product Recommendations:** Suggests suitable catalogue products based on customer requirements and budget.

**AI Review Intelligence:** Summarises approved written customer reviews, identifying positive feedback and potential concerns.

AI features require a configured Gemini API key and an available network connection to the AI service. If an AI request fails, the application may display a fallback message.

## 7. Testing and Validation

The project includes functional and integration testing covering:

- Authentication and access control
- Product catalogue operations
- Shopping cart and order processing
- Admin management functions
- AI catalogue question answering
- AI product recommendations
- AI review summarisation

The project's documented results include 24 AI functional test cases passed and six integration checks.

Testing documentation is available in the `tests/` and `ai/evaluation/` directories.

## 8. Project Limitations

SmartShop AI is an academic minimum viable product (MVP), not a production e-commerce service.

Current limitations include:

- Simulated checkout without real payment processing
- Dependence on the external Gemini API
- Possible delays or failures in AI responses
- Limited demonstration product catalogue
- No delivery-provider integration
- Further security, performance and scalability testing required before production deployment

## 9. Future Improvements

- Integrate a secure payment gateway
- Improve AI response reliability through caching and retry handling
- Expand the product catalogue
- Improve mobile responsiveness and accessibility
- Add more advanced administrative analytics
- Deploy the application to a managed cloud environment

## 10. Project Documentation

Additional project materials are available in the repository:

- `docs/` — Requirements, architecture and design documentation
- `tests/` — Testing plans, cases and results
- `ai/evaluation/` — AI evaluation evidence
- `backend/database/` — Earlier database schema, sample data and ERD resources
- `database/` — Final database export and supporting setup files

## 11. Project Team

- Daler Abdukarimov — Frontend Development
- Prabhu Ram Khadka — Backend Development
- Jeet Patel — Database and AI Integration

## 12. GitHub Repository

https://github.com/prabhu-cqu/Capstone-Project

**CQUniversity Australia — COIT13230 Application Development Project, 2026**
