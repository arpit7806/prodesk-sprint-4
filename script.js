/* ==========================================
   INTRO ANIMATION — zoom from infinity
   ========================================== */
(function () {
  const ov = document.createElement('div');
  ov.id = 'intro';
  ov.innerHTML =
    '<div id="iLogo">' +
    '<span id="iMark">✦</span>' +
    '<span id="iName">LetterForge</span>' +
    '</div>';
  document.body.prepend(ov);

  // Phase 2: zoom done → slide up
  setTimeout(() => {
    document.getElementById('iLogo').classList.add('moveUp');
  }, 1050);

  // Phase 3: fade out overlay
  setTimeout(() => {
    ov.classList.add('introGone');
    setTimeout(() => ov.remove(), 600);
  }, 1750);
})();

/* ==========================================
   UI SETUP — runs after DOM ready
   ========================================== */
window.addEventListener('DOMContentLoaded', () => {
  // Init Lucide icons
  lucide.createIcons();

  // Scroll progress bar + navbar blur
  const bar = document.getElementById('progressBar');
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = ((window.scrollY / total) * 100) + '%';
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Mouse-following radial glow
  const glow = document.querySelector('.mouse-glow');
  document.addEventListener('mousemove', e => {
    glow.style.setProperty('--mx', e.clientX + 'px');
    glow.style.setProperty('--my', e.clientY + 'px');
  });

  // Scroll-reveal via IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

/* ==========================================
   SCROLL TO APP
   ========================================== */
function scrollToApp() {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================
   STATE
   ========================================== */
const state = { name: '', role: '', company: '', skills: '' };
let generatedLetter = '';

/* ==========================================
   DOM REFERENCES
   ========================================== */
const nameInput        = document.getElementById('name');
const roleInput        = document.getElementById('role');
const companyInput     = document.getElementById('company');
const skillsInput      = document.getElementById('skills');
const generateBtn      = document.getElementById('generateBtn');
const btnText          = generateBtn.querySelector('.btn-text');
const copyBtn          = document.getElementById('copyBtn');
const copyLabel        = document.getElementById('copyText');
const errorMsg         = document.getElementById('errorMsg');
const placeholderState = document.getElementById('placeholderState');
const loadingState     = document.getElementById('loadingState');
const resultState      = document.getElementById('resultState');
const resultText       = document.getElementById('resultText');

/* ==========================================
   INPUT HANDLERS
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
    if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
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

  const paras = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  paras.forEach((para, i) => {
    const p = document.createElement('p');
    p.classList.add('result-para', 'para-hidden');
    p.innerHTML = para
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    resultText.appendChild(p);
    setTimeout(() => p.classList.remove('para-hidden'), 100 + i * 150);
  });

  const delay = 100 + paras.length * 150 + 250;
  setTimeout(() => copyBtn.classList.remove('hidden'), delay);
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
function showError(msg) { errorMsg.textContent = msg; errorMsg.classList.remove('hidden'); }
function clearError()   { errorMsg.textContent = ''; errorMsg.classList.add('hidden'); }
