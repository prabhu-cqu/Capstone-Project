# SmartShop AI - Initial Test Plan

## Purpose

This document outlines the initial testing approach for the SmartShop AI application. Testing activities will be expanded as individual system features are developed and integrated.

## Planned Testing Areas

| Testing Area | Purpose | Status |
|---|---|---|
| Functional Testing | Verify that individual application features operate according to the project requirements | Planned |
| Integration Testing | Verify that the frontend, backend, database and AI components work together correctly | Planned |
| System Testing | Evaluate the complete SmartShop AI application against the defined requirements | Planned |
| AI Testing | Evaluate catalogue grounding, recommendation relevance, accuracy and fallback behaviour | Planned |
| Usability Testing | Evaluate whether users can complete the main shopping tasks successfully | Planned |
| Security Testing | Check authentication, access control, input validation and protection of sensitive information | Planned |
| Performance Testing | Evaluate application and AI response times against the project targets | Planned |

## Test Evidence

As development progresses, testing evidence will include:

- test cases and expected results;
- actual test results;
- screenshots of successful and failed tests;
- identified defects;
- fixes and retesting results;
- GitHub commits related to testing and issue resolution.

## Current Status

The initial testing structure has been established. Detailed test cases will be created as the corresponding SmartShop AI features become available for testing.


## Product Catalogue Test Execution

The current testing increment focuses on the Product Catalogue requirements FR1, FR2 and FR3.

Detailed test cases have been prepared in `catalogue-test-cases.md`. These test cases cover catalogue display, search, filtering, sorting and Product Details functionality.

Reusable controlled test inputs are documented in `catalogue-test-data.md`. The test data provides consistent inputs for search, category filtering, price sorting and Product Details verification.

Any failures identified during test execution will be recorded using the process documented in `catalogue-defect-report.md`. Each defect will be linked to its related test case and requirement.

After a defect is fixed, the original test case will be executed again. The retest result and supporting evidence will be recorded to verify whether the issue has been resolved.

### Requirements Traceability

| Requirement | Testing Coverage | Current Status |
|---|---|---|
| FR1 - Product Catalogue Display | TC-CAT-001 to TC-CAT-004 | Prepared - Not Run |
| FR2 - Search, Filter and Sort | TC-CAT-005 to TC-CAT-010 | Prepared - Not Run |
| FR3 - Product Details | TC-CAT-011 to TC-CAT-013 | Prepared - Not Run |

Test statuses will only be changed after the corresponding functionality has been executed and verified.