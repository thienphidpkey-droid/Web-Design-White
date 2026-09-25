# QA 01 — BETA QA SYSTEM AUDIT (NORMAL FLOWS)
**Workflow ID:** QA_NORMAL (v3.0)  
**Project:** FEN — Digital Work Portfolio (`Web-Design-White`)  
**Mode:** QA (Independent Expected-Behavior Verification)  
**Date:** 2026-09-25  
**Candidate Revision:** `5a38f3f`  
**Evaluation Scope:** Desktop & Mobile User Journeys, Component Logic, Accessibility, Event Handling  

---

## 1. Journey & Flow Discovery Matrix

| User Journey / Flow | Implementation Path | Expected Behavior | Observed Behavior | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **J01: Navigation & Spy** | `Sidebar.tsx` $\leftrightarrow$ `App.tsx` | Active nav indicator moves to current section (01-05) via `IntersectionObserver`. | `threshold: [0.2, 0.5]`, `rootMargin: '-10% 0px -10% 0px'`. Correctly marks active section ID. | **PASS** |
| **J02: Hero Entrance** | `Hero.tsx` | Staggered GSAP entrance for labels, headline words, subtext, mockup. Smooth scroll to `#featured`. | Timeline executes smoothly with `power3.out`. Smooth scroll triggers without layout shift. | **PASS** |
| **J03: Featured Work** | `FeaturedWork.tsx` | 5 curated cards with hover zoom and external project links. | Cards render correctly from `FEATURED_PROJECTS`, links open in new tab with `target="_blank" rel="noopener noreferrer"`. | **PASS** |
| **J04: Split Archive (Desktop)** | `ProjectArchive.tsx` | 42/58 split view. Left: list with hover selection; Right: sticky preview with 220ms crossfade transition. | Smooth transition, sticky position holds while scrolling through category. | **PASS** |
| **J05: Category Filter** | `ProjectArchive.tsx` | Filter by `ALL`, `STUDIO`, `HEALTH`, `EDUCATION`, `FASHION`, `BEAUTY`, `REALESTATE`. | State updates cleanly; active item auto-resets to first project of newly selected category. | **PASS** |
| **J06: Mobile Archive** | `ProjectArchive.tsx` | Shows first 8 items; button reveals remaining items up to 32. Category dropdown menu. | `MOBILE_INITIAL_COUNT = 8`. Toggle expands full list smoothly. | **PASS** |
| **J07: Project Modal** | `ProjectModal.tsx` | Opens on card click; displays services, roles, full description, live demo link. Closes via ESC or backdrop. | Locks body scroll via `document.body.style.overflow = 'hidden'`. ESC listener safely attaches and cleans up on unmount. | **PASS** |
| **J08: Contact Submission** | `Contact.tsx` | Inputs require name, email, message. Visual focus indicator. Success message replaces form. | Clean controlled form state. HTML5 validation blocks empty submit. Shows success checkmark. | **PASS** |
| **J09: Mobile Navigation** | `Sidebar.tsx` | Fixed top header with brand logo, hamburger menu, slide-down drawer. | Mobile breakpoint `@media (max-width: 900px)` hides desktop sidebar, renders accessible mobile top bar. | **PASS** |

---

## 2. Functional & Consistency Verification

### State Consistency Check
- **Modal Lock Integrity:** Verified that `ProjectModal.tsx` restores `document.body.style.overflow = ''` upon both unmount and explicit close.
- **Data Source Integrity:** 32 projects in `data.ts` match the 32 projects advertised in `index.html` schema (`ItemList` count: 32) and `public/llms.txt`.
- **Anchor Target Security:** All external anchor tags (`<a>`) targeting live client deployments include `target="_blank"` and `rel="noopener noreferrer"`.

### Accessibility & Semantic Structure
- Form fields contain visible labels tied to `<input>` and `<textarea>` elements.
- Clean semantic HTML layout: `<aside>`, `<main>`, `<section>`, `<footer>`, `<header>`.
- Skip-to-content: Currently missing explicit skip link (noted for P3 enhancement).

---

## 3. QA Normal Findings Table

| Finding ID | Flow / Area | Severity | Priority | Description | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **QA-01** | Contact Form | LOW | P3 | No backend email dispatch; submission only toggles local state `submitted = true`. | Expected for static portfolio unless form service (e.g. Formspree / Resend) is configured. |
| **QA-02** | Accessibility | LOW | P4 | Missing explicit `<a href="#featured" class="skip-link">` for keyboard-only screen readers. | Non-blocking cosmetic accessibility item. |

---

## 4. QA Normal Decision

**Status:** **CONDITIONAL GO (for QA Normal Scope)**  
- All 9 critical user journeys execute correctly without JavaScript runtime crashes.
- Normal flows, navigation, modal lifecycle, and responsive breakpoints are functionally sound.
