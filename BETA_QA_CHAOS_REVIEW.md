# QA 02 — INDEPENDENT CHAOS & STRESS VERIFICATION
**Workflow ID:** QA_CHAOS (v3.0)  
**Project:** FEN — Digital Work Portfolio (`Web-Design-White`)  
**Mode:** QA (Adversarial, Asynchronous, and Concurrency Chaos Testing)  
**Date:** 2026-09-25  
**Candidate Revision:** `5a38f3f`  
**Test Environment:** Node / Vite Local Simulation & Headless DOM Stress  

---

## 1. Chaos Scenarios & Stress Vector Matrix

| Test ID | Scenario Description | Chaos Injection Vector | Observed Outcome | Resiliency Rating |
| :--- | :--- | :--- | :--- | :--- |
| **C01** | Rapid Category Switching | User rapidly clicks between 5 categories within 300ms. | Category state updates synchronously; the `setTimeout(..., 220)` transition timer causes minor visual jump if multiple clicks arrive within 220ms, but state does not deadlock or crash. | **PASS (Minor Jitter)** |
| **C02** | Modal Double Click / Spam | User double-clicks card or spams ESC while modal is animating in. | Modal state is binary (`selectedProject: Project | null`). No duplicate modal instances mount. Body overflow correctly restored. | **PASS** |
| **C03** | Scroll Thrashing | Continuous rapid scrolling up and down across the entire 6000px page height. | `IntersectionObserver` handles rapid unobserve/observe callbacks cleanly. GSAP ScrollTrigger pins and markers don't accumulate memory leaks. | **PASS** |
| **C04** | Input Extreme Payloads | Contact form subjected to: (a) 5000-char message, (b) Vietnamese Unicode `Tiếng Việt có dấu phức tạp ₫`, (c) `<script>alert(1)</script>`, (d) Emoji `🚀🔥💻`. | React standard JSX interpolation auto-escapes string payloads. Textarea handles 5000 chars without layout break. No DOM XSS possible. | **PASS** |
| **C05** | Viewport Flip Chaos | Rapid viewport resizing between 320px (iPhone SE), 768px (iPad), 1024px (Laptop), 2560px (4K). | Fluid CSS `clamp()` and media query `@media (max-width: 900px)` gracefully rearrange grid from 2 columns to 1 column. No horizontal overflow scroll detected. | **PASS** |
| **C06** | Stale / Unmounted Timers | Rapidly unmounting components while GSAP timelines or transition timeouts are active. | GSAP instances are scoped to refs. `ProjectArchive.tsx` `setTimeout` timer does not check mount status (minor unmounted callback warning potential). | **PASS (Hardening Opportunity)** |

---

## 2. Invariant & Edge Case Analysis

### Timer Race Condition in Archive Transition
- In `ProjectArchive.tsx`:
  ```typescript
  const selectProject = (project: Project) => {
    if (project.id === activeProject.id) return;
    setActiveProject(project);
    setIsTransitioning(true);
    setTimeout(() => {
      setDisplayedProject(project);
      setIsTransitioning(false);
    }, 220);
  };
  ```
- **Observed Behavior:** If the user hovers over Project A and then Project B in under 220ms, two timeouts fire. The second timeout resolves later, correctly showing the latest project, but during the transition `isTransitioning` may toggle rapidly.
- **Severity:** LOW (cosmetic only, zero data loss or application freeze).

---

## 3. Chaos Findings Table

| Finding ID | Domain | Severity | Priority | Description | Remediation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CHAOS-01** | Async Timers | LOW | P3 | Uncancelled `setTimeout` in `ProjectArchive.tsx` upon category reset or rapid hover. | Store timeout in `useRef` and clear previous timer before initiating new transition. |
| **CHAOS-02** | Error Boundaries | LOW | P3 | No root React Error Boundary around main content tree. | Wrap `App.tsx` with a lightweight `<ErrorBoundary>` fallback to prevent white screen on unexpected WebGL/GSAP crash. |

---

## 4. QA Chaos Decision

**Status:** **GO (for Chaos Scope)**  
- No fatal concurrency locks, memory runaway, or unhandled promise rejections detected under rapid stress conditions.
- System exhibits high client-side durability.
