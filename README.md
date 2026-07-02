# ✦ LetterForge — AI Cover Letter Generator

> **Prodesk IT Internship · Sprint 4 · AI Engineering Module**

LetterForge is a SaaS-style AI-powered cover letter generator. Users fill in their details — name, role, target company, and key skills — and the app uses Google's Gemini API to generate a professional, tailored cover letter in seconds. Built with a cinematic intro animation, premium UI, and a fully secure serverless architecture.

---

## 🚀 Live Demo

🔗 [prodesk-sprint-4.vercel.app](https://prodesk-sprint-4.vercel.app)
<img width="1917" height="1148" alt="image" src="https://github.com/user-attachments/assets/49af9e69-481b-4c39-ba8d-00ff23f13718" />
<img width="1891" height="1147" alt="image" src="https://github.com/user-attachments/assets/f72212c8-530a-4d3b-a5a9-a331059b7de1" />



---

## ✨ Features

- **Cinematic Intro** — LetterForge logo zooms in from infinity, animates to header, then the full UI reveals
- **AI-Powered Generation** — Google Gemini 2.5 Flash generates tailored, professional cover letters
- **Secure API Architecture** — API key lives exclusively in Vercel environment variables, never shipped to the browser
- **Serverless Backend** — Vercel serverless function handles all Gemini API communication server-side
- **Premium SaaS UI** — Hero section, sticky navbar, floating gradient blobs, scroll-reveal animations
- **Scroll Progress Bar** — Orange gradient indicator tracks reading position
- **Mouse Radial Glow** — Subtle cursor-following ambient light effect
- **Paragraph Cascade** — Generated letter renders paragraph by paragraph with staggered fade-in
- **Copy to Clipboard** — One-click copy with visual confirmation
- **Loading State** — Dedicated "Generating..." UI handles LLM latency gracefully
- **Full Error Handling** — Covers empty fields, API failures, and network errors
- **Fully Responsive** — Seamless across desktop, tablet, and mobile

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| AI Model | Google Gemini 2.5 Flash |
| Backend | Vercel Serverless Function (Node.js) |
| Icons | Lucide Icons (CDN) |
| Fonts | Syne, Plus Jakarta Sans (Google Fonts) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
prodesk-sprint-4/
│
├── api/
│   └── generate.js       # Serverless function — Gemini API call + key management
│
├── index.html            # Full UI: navbar, hero, features strip, generator, footer
├── style.css             # Premium SaaS design, animations, responsive layout
├── script.js             # State management, intro animation, UI effects, API fetch
│
├── .gitignore            # Ensures .env is never committed
├── PROMPT.md             # Prompt engineering log
└── README.md
```

---

## 🔐 Security Architecture

The Gemini API key is **never exposed to the client**. Request flow:

```
Browser (no key)
     ↓  POST /api/generate  { name, role, company, skills }
Vercel Serverless Function  ← GEMINI_API_KEY stored here only
     ↓  Builds prompt + calls Gemini API
Google Gemini 2.5 Flash
     ↓  Returns generated letter text
Browser renders result with cascade animation
```

API key is stored exclusively in **Vercel's Environment Variables dashboard** and accessed via `process.env.GEMINI_API_KEY` server-side only. Never committed to Git.

---

Get a free Gemini API key → [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## 📋 Sprint Deliverables

| Phase | Requirement | Status |
|---|---|---|
| P0 | Form UI — Name, Role, Company, Skills | ✅ Complete |
| P0 | State management via onChange | ✅ Complete |
| P0 | Output render + Copy to Clipboard | ✅ Complete |
| P1 | Gemini API integration | ✅ Complete |
| P1 | Programmatic prompt engineering | ✅ Complete |
| P1 | Secure API key via environment variables | ✅ Complete |
| P1 | Loading / Generating UI state | ✅ Complete |

---

## 👨‍💻 Author

**Arpit Kumar** · Frontend Development Intern @ Prodesk IT
GitHub: [@arpit7806](https://github.com/arpit7806)
