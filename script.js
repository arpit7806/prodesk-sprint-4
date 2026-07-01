/* ==========================================
   STATE
   ========================================== */
const state = { name: '', role: '', company: '', skills: '' };
let generatedLetter = '';

/* ==========================================
   DOM REFERENCES
   ========================================== */
const nameInput       = document.getElementById('name');
const roleInput       = document.getElementById('role');
const companyInput    = document.getElementById('company');
const skillsInput     = document.getElementById('skills');
const generateBtn     = document.getElementById('generateBtn');
const btnText         = generateBtn.querySelector('.btn-text');
const copyBtn         = document.getElementById('copyBtn');
const copyLabel       = document.getElementById('copyText');
const errorMsg        = document.getElementById('errorMsg');
const placeholderState = document.getElementById('placeholderState');
const loadingState    = document.getElementById('loadingState');
const resultState     = document.getElementById('resultState');
const resultText      = document.getElementById('resultText');

/* ==========================================
   INPUT HANDLERS — keep state in sync
   ========================================== */
nameInput.addEventListener('input',    e => { state.name    = e.target.value.trim(); clearError(); });
roleInput.addEventListener('input',    e => { state.role    = e.target.value.trim(); clearError(); });
companyInput.addEventListener('input', e => { state.company = e.target.value.trim(); clearError(); });
skillsInput.addEventListener('input',  e => { state.skills  = e.target.value.trim(); clearError(); });

/* ==========================================
   GENERATE
   ========================================== */
generateBtn.addEventListener('click', handleGenerate);

async function handleGenerate() {
  clearError();
  if (!validate()) return;

  setLoading(true);

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    generatedLetter = data.letter;
    renderResult(data.letter);

  } catch (err) {
    setLoading(false);
    showError(err.message);
  }
}

/* ==========================================
   VALIDATION
   ========================================== */
function validate() {
  const { name, role, company, skills } = state;
  if (!name || !role || !company || !skills) {
    showError('Please fill in all fields before generating.');
    return false;
  }
  return true;
}

/* ==========================================
   LOADING STATE
   ========================================== */
function setLoading(on) {
  generateBtn.disabled = on;
  btnText.textContent  = on ? 'Generating...' : 'Generate Letter';

  if (on) {
    placeholderState.classList.add('hidden');
    resultState.classList.add('hidden');
    copyBtn.classList.add('hidden');
    loadingState.classList.remove('hidden');
  }
}

/* ==========================================
   RENDER RESULT — paragraph cascade
   ========================================== */
function renderResult(text) {
  loadingState.classList.add('hidden');
  resultState.classList.remove('hidden');
  generateBtn.disabled = false;
  btnText.textContent  = 'Generate Letter';

  resultText.innerHTML = '';

  const paragraphs = text
    .split('\n\n')
    .map(p => p.trim())
    .filter(Boolean);

  paragraphs.forEach((para, i) => {
    const p = document.createElement('p');
    p.classList.add('result-para', 'para-hidden');
    p.innerHTML = para
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    resultText.appendChild(p);

    // Stagger fade-in: 100ms base + 150ms per paragraph
    setTimeout(() => p.classList.remove('para-hidden'), 100 + i * 150);
  });

  // Show copy button after all paragraphs have faded in
  const totalDelay = 100 + paragraphs.length * 150 + 250;
  setTimeout(() => copyBtn.classList.remove('hidden'), totalDelay);
}

/* ==========================================
   COPY TO CLIPBOARD
   ========================================== */
copyBtn.addEventListener('click', async () => {
  if (!generatedLetter) return;

  try {
    await navigator.clipboard.writeText(generatedLetter);
    copyLabel.textContent = 'Copied ✓';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyLabel.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    }, 2200);
  } catch {
    showError('Copy failed — please select the text and copy manually.');
  }
});

/* ==========================================
   ERROR HELPERS
   ========================================== */
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}

function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
}
