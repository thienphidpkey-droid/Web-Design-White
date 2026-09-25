# ARSF 02 — INDEPENDENT HOSTILE SECURITY REVIEW
**Workflow ID:** HOSTILE (v3.0)  
**Project:** FEN — Digital Work Portfolio (`Web-Design-White`)  
**Mode:** AUDIT_ONLY (Hostile Red-Team / Adversarial Security Review)  
**Date:** 2026-09-25  
**Candidate Revision:** `5a38f3f`  
**Threat Model Assumption:** Hostile external attacker, arbitrary HTTP client, compromised browser context, public bundle decompiler, malicious script injection attempts  

---

## 1. Threat Modeling & Attack Surface Decomposition

```
[Attacker]
    │
    ├── Vector 1: HTTP Header & Edge Bypass (Hostile framing, MIME confusion, sniffing)
    ├── Vector 2: Client DOM Exploitation (Stored/Reflected XSS, Open Redirects, Prototype Pollution)
    ├── Vector 3: Supply Chain & Repository Leakage (Git history scraping, .env harvesting)
    └── Vector 4: Denial of Service / Resource Exhaustion (Memory exhaustion, Three.js shader crash)
```

---

## 2. Adversarial Penetration Probes

### Probe 1: Clickjacking & Framing Attacks
- **Attack Payload:** Attacker embeds `https://white-web-design.vercel.app/` inside an adversarial `<iframe>` on a phishing domain to harvest user clicks or spoof brand identity.
- **Defense Mechanism:**
  - `X-Frame-Options: DENY` in `vercel.json`.
  - Content-Security-Policy: `frame-ancestors 'none'`.
- **Verdict:** **DEFEATED**. Modern and legacy browsers completely reject embedding.

### Probe 2: Cross-Site Scripting (XSS) & HTML Injection
- **Attack Payload:** Injecting malicious strings into Contact Form inputs (`<svg onload=alert(1)>`, `javascript:alert(document.domain)`).
- **Defense Mechanism:**
  - Inputs are strictly bound to React 18 state: `setFormData({ ...formData, name: e.target.value })`.
  - Values are rendered via standard React text nodes (no `dangerouslySetInnerHTML` is used in any component).
- **Verdict:** **DEFEATED**. React DOM automatically escapes dynamic content.

### Probe 3: Open Redirect via External Links
- **Attack Payload:** Modifying project URLs or target parameters to redirect users to malicious clones.
- **Defense Mechanism:**
  - All project links originate from hardcoded, static `data.ts`.
  - Links use `rel="noopener noreferrer" target="_blank"` preventing `window.opener` reverse-tabnabbing attacks.
- **Verdict:** **DEFEATED**. No dynamic query-parameter-based redirects exist.

### Probe 4: Secret Harvesting via Version Control (Repository Intelligence)
- **Attack Payload:** Attacker crawls GitHub public repository / commits for API keys, tokens, and configuration secrets.
- **Observed Vulnerability:**
  - File `.env.local` was explicitly committed in commit `9289a4f`.
  - Git tracking index includes `.env.local` containing `GEMINI_API_KEY`.
- **Verdict:** **EXPLOITABLE (CONFIRMED VULNERABILITY)**.
  - While client-side Vite currently does not bundle `.env.local` into the production output because `geminiService.ts` is unlinked, any public clone of the repository exposes the key string.

### Probe 5: Resource Exhaustion / WebGL Crash
- **Attack Payload:** Triggering infinite WebGL canvas contexts or Three.js memory allocations to crash mobile browser tabs.
- **Observed Implementation:**
  - Three.js is imported in `ProjectCarousel.tsx`, but this component is currently orphaned and never instantiated in `App.tsx`.
  - Active runtime bundle uses pure CSS + GSAP transforms (negligible GPU footprint).
- **Verdict:** **SAFE**. Zero active WebGL canvas allocations in the live user path.

---

## 3. Hostile Findings & Attack Vectors

| Finding ID | Attack Surface | Attacker Prerequisites | Exploit Path / Impact | Severity | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HOSTILE-01** | Git Repository / Secrets | Read access to repo / public clone | Scraping commit history extracts `GEMINI_API_KEY` from `.env.local`. | **HIGH** | **P1** |
| **HOSTILE-02** | CSP Script Directive | Local script injection capability | `script-src 'unsafe-inline' 'unsafe-eval'` allows execution of inline injected scripts if an XSS sink were ever introduced. | **MEDIUM** | **P2** |
| **HOSTILE-03** | NPM Package Wildcard | Malicious npm account compromise | `@google/genai: "*"` in `package.json` permits pulling an unvetted package update automatically during CI/CD. | **MEDIUM** | **P2** |

---

## 4. Hostile Security Verdict

**Status:** **NO-GO (until HOSTILE-01 is remediated)**  
- Edge, DOM, and transport defenses are robust and hold against hostile attacks.
- Release is blocked on `HOSTILE-01` (`.env.local` version control leakage).
