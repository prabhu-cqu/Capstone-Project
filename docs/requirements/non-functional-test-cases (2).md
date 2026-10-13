# SmartShop AI - Non-Functional Test Cases

## 1. Purpose

This document records non-functional testing scenarios and results for SmartShop AI, following the format of `catalogue-test-cases.md`.

The testing scope covers:

- NFR1 - Performance
- NFR2 - Reliability and Data Integrity
- NFR3 - Security
- NFR4 - Privacy
- NFR5 - Usability
- NFR6 - Accessibility and Compatibility
- NFR7 - Maintainability
- NFR8 - AI Integrity

**Evidence source:** `Testing (2)(4).docx`, *SmartShop AI - Integration & Non-Functional Testing Evidence* (22 pages). Results below reproduce the recorded checks in that document. NFR7 and NFR8 are not separately assessed there. Other project evidence may be needed to establish full acceptance. The document's NFR5 results are pending; a later verbal report of five completed journeys has not been incorporated into that document.

## 2. Test Case Summary

| Test ID | Requirement | Test Scenario | Status |
|---|---|---|---|
| TC-NFR-001 | NFR1 | Catalogue loads within normal-page target | Pass (recorded) |
| TC-NFR-002 | NFR1 | AI responses meet recorded 10-second target | Pass (recorded; conflicting later timings) |
| TC-NFR-003 | NFR2 | Checkout persists order and reduces stock correctly | Pass (recorded) |
| TC-NFR-004 | NFR3 | Registration validation and password security | Pass (recorded) |
| TC-NFR-005 | NFR3 | JWT authentication and admin-route protection | Pass (recorded) |
| TC-NFR-006 | NFR4 | Simulated checkout avoids real payment data | Pass (recorded) |
| TC-NFR-007 | NFR5 | Five-user shopping journey and satisfaction assessment | Pending in source |
| TC-NFR-008 | NFR6 | Keyboard navigation and visible focus | Pass (recorded) |
| TC-NFR-009 | NFR6 | Chrome and Edge compatibility | Pass (recorded) |
| TC-NFR-010 | NFR6 | Responsive catalogue layout | Pass (recorded) |
| TC-NFR-011 | NFR7 | Maintainability acceptance verification | Not documented |
| TC-NFR-012 | NFR8 | AI integrity acceptance verification | Not separately documented |

## 3. Detailed Test Cases

### TC-NFR-001 - Catalogue Load Performance

**Requirement:** NFR1

**Preconditions:** SmartShop AI is running with catalogue data available.

**Steps:**
1. Open the product catalogue in a browser.
2. Inspect browser Network timing.
3. Compare the load time with the 3-second normal-page target.

**Expected Result:** Catalogue loads within 3 seconds.

**Actual Result:** A captured run finished in approximately 0.87 seconds; DOMContentLoaded was approximately 0.40 seconds and Load approximately 0.47 seconds (source page 12, Figure 14).

**Status:** Pass (recorded)

### TC-NFR-002 - AI Response Performance

**Requirement:** NFR1

**Preconditions:** Catalogue Q&A, recommendation and review-summary features are available.

**Steps:**
1. Submit a catalogue question.
2. Request a guided recommendation.
3. Generate a review summary.
4. Compare response times with the 10-second target.

**Expected Result:** Tested AI responses complete within 10 seconds.

**Actual Result:** The source document reports the observed AI tests passed and cites 8/8 prior FR8 responses within target (page 13). A displayed out-of-scope Q&A response took 3.04 seconds (page 4, Figure 3). **Limitation:** Separate final-report evidence discussed in this project records slower AI responses, so overall NFR1 acceptance must be reconciled before claiming an unconditional pass.

**Status:** Pass (recorded in this source; overall acceptance requires reconciliation)

### TC-NFR-003 - Checkout Data Integrity

**Requirement:** NFR2

**Preconditions:** A customer can place a simulated order for an in-stock item.

**Steps:**
1. Observe the product's starting stock.
2. Add one unit to the cart.
3. Complete simulated checkout.
4. Confirm the order appears in My Orders.
5. Check the updated stock quantity.

**Expected Result:** The order persists and stock decreases by the ordered quantity.

**Actual Result:** On 5 October 2026, Apple iPad 11-inch stock decreased from 12 to 11 after Order #6 was placed and appeared in My Orders (pages 13–17, Figures 15–19). Failure rollback is not demonstrated by this scenario.

**Status:** Pass (recorded for tested transaction)

### TC-NFR-004 - Registration and Password Security

**Requirement:** NFR3

**Preconditions:** Registration and login functions are available.

**Steps:**
1. Try invalid registration details and duplicate email.
2. Inspect backend registration validation.
3. Verify password hashing and login comparison logic.

**Expected Result:** Invalid inputs are rejected and passwords are hashed rather than stored as plaintext.

**Actual Result:** Invalid email, duplicate-email checks, minimum password length, bcrypt hashing and bcrypt login comparison are documented (pages 8–10, Figures 9–11).

**Status:** Pass (recorded)

### TC-NFR-005 - JWT and Admin Protection

**Requirement:** NFR3

**Preconditions:** Authentication and admin product routes are implemented.

**Steps:**
1. Inspect successful login token creation.
2. Check token expiry configuration.
3. Inspect admin-route authentication and role middleware.

**Expected Result:** Authentication uses signed tokens and admin routes require authenticated admin access.

**Actual Result:** JWT signing with a server-side secret and two-hour expiry is shown; admin routes include `authenticateToken` and `requireAdmin` middleware (pages 10–12, Figures 12–13). The screenshots establish implementation evidence, not a complete penetration test.

**Status:** Pass (recorded controls)

### TC-NFR-006 - Simulated Checkout Privacy

**Requirement:** NFR4

**Preconditions:** A customer has an item in the cart.

**Steps:**
1. Proceed to checkout.
2. Review payment messaging and requested inputs.
3. Check whether card or banking details are requested.

**Expected Result:** Checkout makes clear that payment is simulated and does not request real payment credentials.

**Actual Result:** Checkout states that no real payment will be processed and does not request card or banking information (pages 17–18, Figure 20).

**Status:** Pass (recorded for simulated-payment privacy)

### TC-NFR-007 - Five-User Usability Assessment

**Requirement:** NFR5

**Preconditions:** Five genuine testers can use the application independently.

**Steps:**
1. Ask each tester to browse a product and view its details.
2. Have each tester add an item to the cart and complete simulated checkout.
3. Record whether the journey was completed.
4. Collect a satisfaction rating from 1 to 5.
5. Compare outcomes with the 80% completion and average 4/5 satisfaction targets.

**Expected Result:** At least 4/5 users complete the journey and average satisfaction is at least 4/5.

**Actual Result:** The source document marks all five tester rows **Pending** (pages 21–22). The project owner subsequently reported that 5/5 users completed the journey, but individual completion records and satisfaction scores are not included in this source. The satisfaction threshold cannot be verified from the supplied document.

**Status:** Pending in source; journey completion subsequently reported, satisfaction not verified

### TC-NFR-008 - Keyboard Navigation

**Requirement:** NFR6

**Preconditions:** SmartShop AI is open in a supported browser.

**Steps:**
1. Navigate interactive controls using the keyboard.
2. Inspect focus indicators on My Orders and catalogue controls.

**Expected Result:** Core interactive controls remain reachable with visible keyboard focus.

**Actual Result:** Keyboard-only navigation and visible focus indicators are reported on page 18.

**Status:** Pass (recorded)

### TC-NFR-009 - Browser Compatibility

**Requirement:** NFR6

**Preconditions:** Google Chrome and Microsoft Edge are available.

**Steps:**
1. Test catalogue, authentication, checkout and administration in Chrome.
2. Test catalogue and administration in Edge.
3. Check usability and readability.

**Expected Result:** Tested workflows remain readable and usable in both browsers.

**Actual Result:** Chrome and Edge compatibility tests are recorded as passing (pages 18–19, Figure 21).

**Status:** Pass (recorded)

### TC-NFR-010 - Responsive Catalogue

**Requirement:** NFR6

**Preconditions:** Browser responsive/device emulation is available.

**Steps:**
1. Open the catalogue in responsive emulation.
2. Change the emulated viewport size.
3. Check product cards and search/filter controls.

**Expected Result:** Core catalogue interactions remain accessible in the tested layouts.

**Actual Result:** The source reports that catalogue controls and cards remained available without preventing core interaction (page 19).

**Status:** Pass (recorded)

### TC-NFR-011 - Maintainability Verification

**Requirement:** NFR7

**Preconditions:** Architecture, repository and maintenance evidence are available.

**Steps:**
1. Review the project's defined maintainability acceptance criteria.
2. Compare architecture and repository evidence against those criteria.
3. Record the outcome.

**Expected Result:** The documented NFR7 acceptance criteria are demonstrably met.

**Actual Result:** The supplied 22-page testing document does not separately define or execute an NFR7 acceptance test.

**Status:** Not documented in source

### TC-NFR-012 - AI Integrity Verification

**Requirement:** NFR8

**Preconditions:** AI evaluation results and defined NFR8 acceptance criteria are available.

**Steps:**
1. Review catalogue Q&A for unsupported claims.
2. Review recommendation grounding and approved-review summary behaviour.
3. Compare the recorded outcomes against the NFR8 acceptance criteria.

**Expected Result:** AI integrity meets all defined NFR8 acceptance criteria.

**Actual Result:** FR8–FR10 functional integration tests are recorded as PASS (pages 4–5), including out-of-scope refusal and approved-review grounding. The supplied document does not separately assess or confirm all NFR8 acceptance criteria.

**Status:** Not separately documented in source

## 4. Requirements Traceability

| Requirement | Testing Coverage | Current Status |
|---|---|---|
| NFR1 - Performance | TC-NFR-001 to TC-NFR-002 | Recorded Pass; conflicting later AI timings require review |
| NFR2 - Reliability and Data Integrity | TC-NFR-003 | Tested transaction Pass; rollback not evidenced |
| NFR3 - Security | TC-NFR-004 to TC-NFR-005 | Recorded controls Pass; full security assurance not established |
| NFR4 - Privacy | TC-NFR-006 | Recorded simulated-payment privacy check Pass |
| NFR5 - Usability | TC-NFR-007 | Pending in source; 5/5 completion subsequently reported, satisfaction unverified |
| NFR6 - Accessibility and Compatibility | TC-NFR-008 to TC-NFR-010 | Recorded checks Pass; not a full accessibility audit |
| NFR7 - Maintainability | TC-NFR-011 | Not documented in supplied testing record |
| NFR8 - AI Integrity | TC-NFR-012 | Related FR8–FR10 checks Pass; separate NFR acceptance not documented |

## 5. Execution Summary

The counts below describe **recorded test-case statuses in the supplied testing document**, not independently rerun tests. A scenario labelled "Not documented" is a coverage gap, not a failed execution.

| Requirement | Recorded Pass | Pending | Not Documented | Total |
|---|---:|---:|---:|---:|
| NFR1 | 2 | 0 | 0 | 2 |
| NFR2 | 1 | 0 | 0 | 1 |
| NFR3 | 2 | 0 | 0 | 2 |
| NFR4 | 1 | 0 | 0 | 1 |
| NFR5 | 0 | 1 | 0 | 1 |
| NFR6 | 3 | 0 | 0 | 3 |
| NFR7 | 0 | 0 | 1 | 1 |
| NFR8 | 0 | 0 | 1 | 1 |
| **Total** | **9** | **1** | **2** | **12** |

## 6. Conclusion

The supplied integration testing record reports successful checks for NFR1, NFR2, NFR3, NFR4 and NFR6, including catalogue performance, checkout integrity, authentication controls, simulated-payment privacy and browser/keyboard compatibility.

NFR5 remains pending in that document. A subsequent report of five completed shopping journeys supports the completion component, but satisfaction ratings are not verified in the supplied evidence. NFR7 and NFR8 have no separate acceptance results in this testing record. Additionally, NFR1's recorded AI performance pass should be reconciled with slower AI timings reported elsewhere before claiming complete performance acceptance.

