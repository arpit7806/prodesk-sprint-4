# 💬 Prompt Log — LetterForge

> Prompts used during the ideation, design, and development of LetterForge.
> Ideas and direction were defined by the developer — AI assisted with implementation and code execution.

---

1. "I want to build an AI-powered cover letter generator for my Sprint 4. Explain the full architecture — what should the data flow look like, what API makes sense, and how do I keep the key secure without a full backend?"
---

2. "Instead of building a basic version first and upgrading it later, I want to go straight to the final architecture in one pass — serverless function for the backend, real Gemini API from day one, no throwaway code. Plan this out for me."
---

3. "Explain the difference between a system instruction and a user prompt in Gemini's API. I want to use both layers — one to define the AI's behavior, one to dynamically inject the form data."
---

4. "For the form, I'm thinking four fields — Full Name, Job Role, Target Company, and Key Skills. What's the cleanest way to track all four in a single state object and keep the UI in sync?"
---

5. "I want the API key to never touch the browser at any point. Walk me through exactly how a Vercel serverless function solves this — how does the request flow from the frontend to Gemini without exposing anything?"
---

6. "Design the UI with a light pastel color scheme — lavender, pink, soft purples. I want it to feel airy and premium, not dark. The background should feel like it's glowing softly."
---

7. "I want LetterForge to zoom in from a distance when the page loads — like the logo starts tiny and flies toward the viewer, lands at the center, then animates upward to its fixed position in the header. After that the rest of the content fades in. Make this the opening experience."
---

8. "While the AI is generating the letter, show a dedicated loading state with a spinner. Once the response comes in, I want each paragraph to fade in one by one with a stagger delay — not all at once."
---

9. "What Gemini model should I use? I need it to be on the free tier, fast enough for a real-time UI, and capable enough to write professional copy. Compare the options."
---

10. "The temperature and token limit for the generation config — what values make sense specifically for cover letter output? Explain the tradeoff between creativity and professionalism."
---

11. "I want the navbar to be minimal — just the LetterForge logo centered, nothing else. No links, no CTA button in the header. Clean and focused."
---

12. "Upgrade the overall UI to look like a premium AI SaaS — think Vercel, Linear, Notion AI. I want a hero section with big heading, gradient text, floating blobs, stats row, and feature pills. Keep it in vanilla HTML/CSS/JS only, no frameworks."
---

13. "Add a scroll progress bar at the top in the brand orange gradient, a mouse-following radial glow effect, and scroll-reveal animations for each section using IntersectionObserver."
---

14. "The copy button should only appear after the letter has fully rendered. When clicked, show a 'Copied ✓' confirmation with a green state, then reset after 2 seconds."
---

15. "Make sure every error case is handled gracefully — empty fields, Gemini API failure, network timeout. Each should show a specific inline message, not just a generic error."
---

16. "Write the README covering the project overview, full tech stack, security architecture with a request flow diagram, folder structure, local setup instructions, and sprint deliverable checklist."
---

17. "The font pairing should feel editorial and modern — Syne for display and headings, Plus Jakarta Sans for body text. Apply this across the entire UI with a proper typographic hierarchy."
---

> LetterForge · Sprint 4 · Prodesk IT · Built by Arpit Kumar
