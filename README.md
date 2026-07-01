# ✦ LetterForge — AI Cover Letter Generator

> **Prodesk IT Internship · Sprint 4 · AI Engineering Module**

LetterForge is a SaaS-style AI-powered cover letter generator that takes a candidate's details and uses Google's Gemini API to craft professional, tailored cover letters in seconds.

---

## 🚀 Live Demo

🔗 [prodesk-sprint-4.vercel.app](https://prodesk-sprint-4.vercel.app)

---

## ✨ Features

- **AI-Powered Generation** — Uses Google Gemini 2.5 Flash to generate professional, context-aware cover letters
- **Secure API Architecture** — API key stored exclusively in server-side environment variables, never exposed to the browser
- **Serverless Backend** — Vercel serverless function handles all API communication
- **Cinematic UI** — Animated intro sequence with glassmorphism design
- **Paragraph Cascade** — Generated letter renders with a staggered fade-in animation
- **Copy to Clipboard** — One-click copy of the full generated letter
- **Loading State** — Dedicated "Generating..." UI handles LLM latency gracefully
- **Full Error Handling** — Covers empty fields, API failures, and network errors
- **Fully Responsive** — Works seamlessly on mobile and desktop

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| AI Model | Google Gemini 2.5 Flash |
| Backend | Vercel Serverless Function (Node.js) |
| Deployment | Vercel |
| Fonts | Syne, Space Grotesk (Google Fonts) |

---

## 📁 Project Structure

```
prodesk-sprint-4/
│
├── api/
│   └── generate.js       # Serverless function — Gemini API call lives here
│
├── index.html            # App UI & structure
├── style.css             # Styling, animations, glassmorphism
├── script.js             # State management, fetch logic, DOM rendering
│
├── .gitignore            # Ensures .env is never committed
└── README.md
```

---

## 🔐 Security Architecture

The Gemini API key is **never exposed to the client**. Here's how it works:

```
Browser (no key)
     ↓  POST /api/generate  { name, role, company, skills }
Vercel Serverless Function  ← GEMINI_API_KEY lives here only
     ↓  Gemini API call
Google Gemini 2.5 Flash
     ↓  Generated letter text
Browser renders result
```

The API key is stored exclusively in **Vercel's Environment Variables dashboard** and accessed via `process.env.GEMINI_API_KEY` server-side only.

---

Get your free Gemini API key at → [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## 📋 Sprint Deliverables

| Phase | Requirement | Status |
|---|---|---|
| P0 | Form UI — Name, Role, Company, Skills | ✅ Done |
| P0 | State management via onChange | ✅ Done |
| P0 | Output render + Copy to Clipboard | ✅ Done |
| P1 | Gemini API integration | ✅ Done |
| P1 | Programmatic prompt engineering | ✅ Done |
| P1 | Secure API key via environment variables | ✅ Done |
| P1 | Loading / generating UI state | ✅ Done |

---

## 👨‍💻 Author

**Arpit Kumar** · Frontend Development Intern @ Prodesk IT  
GitHub: [@arpit7806](https://github.com/arpit7806)
