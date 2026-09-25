# ARSF 01 — MASTER SECURITY REPORT
**Workflow ID:** MASTER (v3.0)  
**Project:** FEN — Digital Work Portfolio (`Web-Design-White`)  
**Mode:** AUDIT_ONLY  
**Date:** 2026-09-25  
**Candidate Revision:** `5a38f3f` (main branch, clean tree)  
**Scope:** Client SPA, Static Assets, Routing, Configuration, Dependency Supply Chain, Secrets Scanning  

---

## 1. Architecture & Trust Boundary Model

```
[Public Internet / Crawlers / Users]
               │
               ▼
[Vercel CDN Edge Network] (HTTP Security Headers, CSP, Cache Rules)
               │
               ▼
[React 18 SPA Client] (Space Grotesk/Mono, GSAP 3, Lucide)
   ├── Routing / Navigation: Hash-based / Smooth-scroll IDs (#intro, #featured, #archive, #about, #contact)
   ├── Data Store: Static client-side repository (`data.ts` - 32 projects)
   ├── Forms: Client-controlled input state (no persistent backend API attached)
   └── Three.js / Drei: Standalone Canvas rendering (ProjectCarousel - unlinked)
```

- **Server Boundary:** Pure static Single Page Application hosted on Vercel CDN. No persistent Node/Python server or dynamic database API is active.
- **Client State:** Ephemeral in React `useState`/`useRef`. No sensitive PII or authentication sessions stored in `localStorage`/cookies.

---

## 2. Endpoint & Attack Surface Inventory

| Resource / Surface | Protocol / Handler | Intended Access | Observed Control | Risk Rating |
| :--- | :--- | :--- | :--- | :--- |
| `/*` (Vite SPA) | HTTPS / Vercel Edge | Public | HSTS, CSP, X-Frame-Options DENY | LOW |
| `/#contact` (Form) | Client DOM | Public | React controlled state, no backend POST | LOW |
| `.env.local` | Git tracked file | Private | **EXPOSED IN GIT REPO** (commit `9289a4f`) | **HIGH** |
| `services/geminiService.ts` | Client TS module | Unused (Orphan) | Reads `process.env.API_KEY` (client bundle leak risk if wired) | **MEDIUM** |
| `public/*` | Static HTTP GET | Public | WebP/JPG/SVG, immutable assets | LOW |

---

## 3. Security Findings & Vulnerability Evidence

### `SEC-01`: Tracked Secret File in Git Repository
- **Severity:** HIGH
- **Release Priority:** P1 (Pre-launch blocker)
- **Status:** CONFIRMED
- **Evidence Type:** STATIC (`git ls-files .env.local`)
- **Violated Invariant:** ARSF Section "Secret protection" (Rule 85: Exclude secret-bearing files from version control).
- **Observed Behavior:** `.env.local` is tracked by git and committed in commit `9289a4f`. Although `.gitignore` contains `*.local`, git tracks already committed files until explicitly removed with `git rm --cached`. The file contains a `GEMINI_API_KEY` variable.
- **Impact:** Any entity with read access to the git repository can read the secret key.
- **Remediation:** Remove `.env.local` from git tracking (`git rm --cached .env.local`), add `.env*.local` and `.env.local` to `.gitignore`, and rotate the credential in Google AI Studio.

### `SEC-02`: Client-Side API Key Architecture in Orphan Service
- **Severity:** MEDIUM
- **Release Priority:** P2
- **Status:** CONFIRMED
- **Evidence Type:** STATIC ([geminiService.ts](file:///g:/project/GIT%20liquid-automation/Web-Design-White/services/geminiService.ts#L7))
- **Violated Invariant:** ARSF Section "Trusted boundaries and integrity" (Rule 94: Keep identity, credentials, and authoritative state at trusted server boundary).
- **Observed Behavior:** `geminiService.ts` instantiates `new GoogleGenAI({ apiKey })` directly in client-side code using `process.env.API_KEY`. While currently unlinked to `App.tsx`, connecting this service in Vite would embed the API key into the public JavaScript bundle or fail with `process is not defined`.
- **Impact:** Direct client-side exposure of LLM API quota and keys if chatbot is wired up.
- **Remediation:** If the AI Assistant feature is activated, route prompts through a serverless API proxy (e.g. Vercel Serverless Function `/api/chat`) with server-side environment variables and rate limiting.

### `SEC-03`: CSP `unsafe-inline` and `unsafe-eval` Allowance
- **Severity:** LOW
- **Release Priority:** P3
- **Status:** HARDENING / JUSTIFIED
- **Evidence Type:** STATIC ([vercel.json](file:///g:/project/GIT%20liquid-automation/Web-Design-White/vercel.json#L32))
- **Observed Behavior:** CSP contains `script-src 'self' 'unsafe-inline' 'unsafe-eval'`.
- **Justification:** Required for GSAP inline transforms, Vite bootstrapping, and Three.js runtime shader compilation as documented in [AGENTS.md](file:///g:/project/GIT%20liquid-automation/Web-Design-White/AGENTS.md). Non-eval/strict CSP would break WebGL/GSAP animation.
- **Mitigation:** Strict `object-src 'none'`, `frame-ancestors 'none'`, and `base-uri 'self'` are enforced.

---

## 4. Supply Chain & Dependency Security Review

- **Package Manager:** npm (v10+), lockfile v3 (`package-lock.json` present and consistent).
- **Dependencies (Total: 8 prod, 11 dev):**
  - `@google/genai` (prod): Wildcard `*` in `package.json` — creates non-deterministic resolution risk on reinstall.
  - `gsap` (3.15.0), `@gsap/react` (2.1.2): Verified official GreenSock packages.
  - `react` / `react-dom` (18.3.1): Official stable releases.
  - `three` (0.160.0), `@react-three/fiber` (8.15.16), `@react-three/drei` (9.99.0): Verified packages.
- **Recommendation:** Pin `@google/genai` to an exact semver version (e.g. `^0.1.2`) or remove if ChatBot remains unused.

---

## 5. Security Verdict (Advisory)
- **Status:** **BLOCKED (P1 Action Required)**
- **Blocker:** `SEC-01` (`.env.local` tracked in git).
- **Remediation Required:** Untrack `.env.local`, update `.gitignore`, rotate API key.
