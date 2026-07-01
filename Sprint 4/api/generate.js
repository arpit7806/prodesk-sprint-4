// api/generate.js
// Vercel serverless function — runs on the server, API key never exposed to browser

module.exports = async function handler(req, res) {

  // Only allow POST
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, role, company, skills } = req.body || {};

  // Validate all fields
  if (!name || !role || !company || !skills) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // API key lives in Vercel env vars — never in source code
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error. Contact the admin.' });
  }

  // Build the prompt
  const systemInstruction = `You are an expert career coach and professional cover letter writer.
Write compelling, authentic, and highly tailored cover letters.
Guidelines:
- 3 to 4 paragraphs only. No more.
- Opening paragraph: express genuine enthusiasm for the specific role and company.
- Middle paragraph(s): connect the candidate's skills directly to the role's needs.
- Closing paragraph: confident call to action.
- Tone: professional yet warm. Avoid generic filler phrases like "I am writing to apply".
- Do NOT include a subject line, date, or address headers. Start directly with "Dear Hiring Manager".
- Do NOT use markdown headers or bullet points in the letter body.`;

  const userPrompt = `Write a professional cover letter with these details:

Candidate Name: ${name}
Job Role: ${role}
Target Company: ${company}
Key Skills: ${skills}

Make it concise, impactful, and specific. Ready to send.`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: [{
            parts: [{ text: userPrompt }]
          }],
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const errData = await geminiRes.json();
      const msg = errData?.error?.message || 'Gemini API error.';
      return res.status(502).json({ error: msg });
    }

    const data = await geminiRes.json();
    const letter = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!letter) {
      return res.status(502).json({ error: 'No response generated. Please try again.' });
    }

    return res.status(200).json({ letter });

  } catch (err) {
    console.error('Gemini fetch error:', err);
    return res.status(500).json({ error: 'Failed to reach AI service. Please try again.' });
  }
};
