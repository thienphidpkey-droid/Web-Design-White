# FEN — Digital Work Portfolio

> A high-performance, dark luxury editorial portfolio archiving 32+ web design and development projects across healthcare, education, fashion, beauty, real estate, and creative studio industries.

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://white-web-design.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-green?style=flat-square&logo=greensock)](https://greensock.com/)

---

## 🌐 Live URLs

- **Primary Deployment:** [https://white-web-design.vercel.app/](https://white-web-design.vercel.app/)
- **Custom Domains:** `heonamedia.com` / `fen.studio`

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 18 (TypeScript) + Vite 5 (Zero-config build)
- **Styling Architecture:** Vanilla CSS Custom Properties + CSS Modules + Tailwind CSS
- **Animation Engine:** GSAP 3 (ScrollTrigger) with hardware-accelerated transforms
- **Typography:** Space Grotesk (Display / Sans-serif) + Space Mono (Metadata / Monospace)
- **Asset Optimization:** WebP format (Quality 82) with preloaded high-priority hero image
- **Security & Headers:** Strict CSP, HSTS, X-Frame-Options: DENY, Referrer-Policy, Cache-Control via `vercel.json`

---

## 📁 Repository Structure

```
Web-Design-White/
├── App.tsx                      # Root layout, IntersectionObserver section tracker, modal state
├── index.html                   # Master HTML, SEO meta tags, Open Graph, Twitter Cards, 6 JSON-LD schemas
├── index.css                    # Design tokens (--bg, --purple, --surface, etc.), custom scrollbar, layout reset
├── data.ts                      # Central database for all 32 portfolio projects & categories
├── components/
│   ├── Sidebar.tsx              # Fixed left navigation rail (01-05 nav, active dots) + Mobile top nav
│   ├── Hero.tsx                 # Split hero, browser mockup preview, GSAP staggered typography entrance
│   ├── FeaturedWork.tsx         # 5 selected project cards with hover zoom & border reveal
│   ├── ProjectModal.tsx         # Full-screen project detail overlay (ESC key & backdrop close)
│   ├── About.tsx                # Split portrait image section, personality statement, stats grid
│   ├── Contact.tsx              # Minimal contact form with focus-activated purple underline
│   ├── Footer.tsx               # Minimal single-line footer
│   ├── ProjectArchive.tsx       # Coordinator component managing archive state & transition timers
│   └── archive/                 # Modular archive sub-components
│       ├── ArchiveHeader.tsx        # Section header, project counts, desktop tabs & mobile dropdown
│       ├── ArchiveDesktopView.tsx   # 42/58 split view (list + sticky preview with actions)
│       └── ArchiveMobileView.tsx    # Responsive mobile layout (featured card + thumbnail list)
├── public/
│   ├── llms.txt                 # AI discovery summary (llmstxt.org standard)
│   ├── llms-full.txt            # Full plaintext AI document for one-shot retrieval
│   ├── sitemap.xml              # XML sitemap with image metadata
│   ├── robots.txt               # Configured for 13 AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, etc.)
│   ├── manifest.json            # PWA manifest
│   ├── favicon.svg              # Brand SVG favicon
│   └── *.webp                   # Optimized portfolio WebP images
├── vercel.json                  # Edge security headers & SPA rewrite rules
├── convert-webp.mjs             # Image optimization script (Sharp)
└── package.json                 # Clean production dependencies
```

---

## 🎨 Visual Identity & Design Tokens

- **Background:** `#07070A` (`var(--bg)`)
- **Primary Accent:** `#8B5CF6` (`var(--purple)`)
- **Surface:** `#0D0D12` (`var(--surface)`)
- **Surface Alt:** `#111117` (`var(--surface-2)`)
- **Border:** `rgba(255, 255, 255, 0.06)` (`var(--border)`)
- **Border Hover:** `rgba(139, 92, 246, 0.4)` (`var(--border-hover)`)
- **Text Primary:** `#F2F2F4` (`var(--text)`)
- **Text Muted:** `#5A5A6E` (`var(--muted)`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation & Development

```bash
# 1. Clone repository
git clone https://github.com/thienphidpkey-droid/Web-Design-White.git

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Typecheck without emitting
npx tsc --noEmit

# 5. Production build
npm run build

# 6. Preview production build locally
npm run preview
```

---

## 🔍 SEO, GEO & AI Crawlers

- **Structured Data:** 6 comprehensive Schema.org JSON-LD graphs in `index.html`: `Person`, `WebSite`, `ProfessionalService`, `ItemList` (32 projects), `BreadcrumbList`, `FAQPage`.
- **AI Crawlers:** Fully allowed in `robots.txt` for 13 AI discovery crawlers including GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended.
- **LLM Summary:** Full plain text context provided at `/llms.txt` and `/llms-full.txt`.

---

## 📄 License

MIT © FEN Studio. All rights reserved.
