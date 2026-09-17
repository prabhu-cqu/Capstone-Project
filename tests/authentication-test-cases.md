# SmartShop AI - Authentication Test Cases

## Purpose

These test cases verify FR4 - Customer Registration, Login and Logout.

Authentication testing covers the SmartShop AI frontend, backend authentication API and MySQL database.

The tests verify successful and unsuccessful authentication scenarios, database integration, password validation, logout behaviour and secure password storage.

## Test Environment

| Component | Technology |
|---|---|
| Frontend | React / Vite |
| Backend | Node.js / Express |
| Database | MySQL |
| Authentication | JSON Web Token (JWT) |
| Password Security | bcrypt |
| Database Verification | MySQL Workbench |
| User Interface Testing | SmartShop AI website |

## Authentication Test Cases

| Test ID | Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| TC-AUTH-001 | Register a new customer with valid details | Account is created successfully and customer is authenticated | Registration succeeded, account was created and the welcome message was displayed | Pass |
| TC-AUTH-002 | Verify registered customer in MySQL | Registered customer appears in the `users` table with correct details | Customer was found in MySQL with the correct name, email, `customer` role and `active` status | Pass |
| TC-AUTH-003 | Login with valid credentials | Registered customer is successfully authenticated | Login succeeded and the website displayed the welcome message with the customer's name | Pass |
| TC-AUTH-004 | Login with incorrect password | Login is rejected and an error message is displayed | Login was rejected and "Invalid email or password" was displayed | Pass |
| TC-AUTH-005 | Login with unknown email | Login is rejected and an error message is displayed | Login was rejected and "Invalid email or password" was displayed | Pass |
| TC-AUTH-006 | Register using an existing email address | Duplicate registration is rejected | Registration was rejected and "An account with this email already exists" was displayed | Pass |
| TC-AUTH-007 | Register using a password shorter than 8 characters | Registration is prevented and password validation is displayed | Browser prevented submission and requested a password of at least 8 characters | Pass |
| TC-AUTH-008 | Logout authenticated customer | Customer is logged out and a logout confirmation is displayed | Customer logged out successfully and "Logged out successfully!" was displayed | Pass |
| TC-AUTH-009 | Verify password storage in MySQL | Password is stored as a bcrypt hash and not as plain text | MySQL showed password hashes beginning with `$2b$12$`; plain-text passwords were not stored | Pass |

## Test Execution Summary

A total of 9 authentication test cases were executed.

| Result | Number of Tests |
|---|---:|
| Pass | 9 |
| Fail | 0 |
| Not Run | 0 |
| Total | 9 |

All authentication test cases TC-AUTH-001 to TC-AUTH-009 passed during the current test execution.

## FR4 Verification

FR4 - Customer Registration, Login and Logout has been tested through the SmartShop AI website, backend authentication API and MySQL database.

Testing confirmed that:

- new customers can register successfully;
- registered customers are stored in the MySQL `users` table;
- valid customer credentials allow login;
- incorrect passwords are rejected;
- unknown email addresses are rejected;
- duplicate email registrations are prevented;
- passwords shorter than 8 characters are rejected;
- authenticated customers can log out successfully;
- passwords are stored as bcrypt hashes rather than plain text.

## Test Evidence

Evidence collected during authentication testing includes:

- successful customer registration through the website;
- registered customer records displayed in MySQL Workbench;
- successful login and welcome message;
- incorrect-password error message;
- unknown-email error message;
- duplicate-email registration error message;
- browser password-length validation;
- successful logout confirmation;
- bcrypt password hashes displayed in the MySQL `users` table.

## Current Status

FR4 authentication testing is complete.

**Tests Executed:** 9  
**Tests Passed:** 9  
**Tests Failed:** 0  
**Overall Status:** Pass

Testing covered customer registration, database persistence, valid login, incorrect password handling, unknown email handling, duplicate email prevention, password minimum-length validation, logout and bcrypt password storage.

**FR4 Result: Tested - Pass**