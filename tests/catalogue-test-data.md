# SmartShop AI – Product Catalogue Test Data

## 1. Purpose

This document defines reusable test data for testing the SmartShop AI Product Catalogue.

The test data supports the FR1–FR3 catalogue test cases and provides consistent inputs for catalogue display, search, filtering, sorting and product detail testing.

The values below are controlled test data and can be adjusted to match the implemented database before test execution.

## 2. Product Test Data

| Product ID | Product Name | Category | Brand | Price | Stock |
|---|---|---|---|---:|---:|
| P001 | Wireless Mouse | Computer Accessories | TechPro | 29.95 | 20 |
| P002 | Mechanical Keyboard | Computer Accessories | KeyMaster | 89.95 | 10 |
| P003 | USB-C Charger | Mobile Accessories | PowerGo | 39.95 | 15 |
| P004 | Phone Stand | Mobile Accessories | MobileMate | 19.95 | 25 |
| P005 | Study Headphones | Study Accessories | SoundLearn | 59.95 | 8 |
| P006 | Laptop Stand | Study Accessories | DeskPro | 49.95 | 12 |

## 3. Search Test Data

| Search Input | Expected Behaviour | Related Test |
|---|---|---|
| Wireless Mouse | Wireless Mouse should be returned | TC-CAT-005 |
| Keyboard | Mechanical Keyboard should be returned | TC-CAT-005 |
| Mouse | Wireless Mouse should match the partial keyword | TC-CAT-006 |
| Charger | USB-C Charger should match the partial keyword | TC-CAT-006 |
| XYZ123Product | No matching products should be returned | TC-CAT-007 |

## 4. Category Filter Test Data

| Category | Expected Products | Related Test |
|---|---|---|
| Computer Accessories | Wireless Mouse, Mechanical Keyboard | TC-CAT-008 |
| Mobile Accessories | USB-C Charger, Phone Stand | TC-CAT-008 |
| Study Accessories | Study Headphones, Laptop Stand | TC-CAT-008 |

## 5. Price Sorting Test Data

For ascending price order, the expected sequence is:

1. Phone Stand – $19.95
2. Wireless Mouse – $29.95
3. USB-C Charger – $39.95
4. Laptop Stand – $49.95
5. Study Headphones – $59.95
6. Mechanical Keyboard – $89.95

For descending price order, the expected sequence is the reverse.

This data supports TC-CAT-009.

## 6. Product Details Test Data

For TC-CAT-011 and TC-CAT-012, the tester should select a known product and compare the Product Details page with the corresponding controlled product record.

Example:

**Product ID:** P001  
**Product Name:** Wireless Mouse  
**Category:** Computer Accessories  
**Brand:** TechPro  
**Price:** $29.95  
**Stock:** 20

The displayed information should match the stored test record.

## 7. Invalid Test Data

The following values can be used to test invalid or unavailable catalogue requests:

| Input | Purpose | Related Test |
|---|---|---|
| XYZ123Product | Search with no matching product | TC-CAT-007 |
| INVALID-PRODUCT-ID | Invalid Product Details request | TC-CAT-013 |

## 8. Test Data Usage

This test data is intended to make Product Catalogue testing repeatable and consistent.

Before executing the test cases, the test data should be compared with the implemented database. Where necessary, the values will be updated to match the final catalogue dataset.