// script.js

(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  const copyBtn = document.getElementById('copyEmailBtn');

  // ---- Year ----
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Theme handling ----
  const THEME_KEY = 'theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;

    const prefersLight =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;

    return prefersLight ? 'light' : 'dark';
  }

  function setTheme(mode) {
    const iconSpan = themeToggle ? themeToggle.querySelector('.icon') : null;

    if (mode === 'light') {
      root.classList.add('theme-light');
      localStorage.setItem(THEME_KEY, 'light');
      if (iconSpan) iconSpan.textContent = '☀️';
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.setAttribute('aria-label', 'Use dark theme');
      }
    } else {
      root.classList.remove('theme-light');
      localStorage.setItem(THEME_KEY, 'dark');
      if (iconSpan) iconSpan.textContent = '🌙';
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('aria-label', 'Use light theme');
      }
    }
  }

  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.classList.contains('theme-light');
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  // ---- Copy email with strong UX ----
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      if (!email) return;

      const originalText = copyBtn.textContent;
      copyBtn.disabled = true;

      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('btn--success');
      } catch {
        copyBtn.textContent = 'Copy failed';
      } finally {
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.classList.remove('btn--success');
          copyBtn.disabled = false;
        }, 1000);
      }
    });
  }

  // ---- Reveal on scroll (with reduced-motion support) ----
  const revealItems = document.querySelectorAll('.reveal');
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && revealItems.length) {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(el => observer.observe(el));
  } else {
    // If reduced motion, show everything immediately
    revealItems.forEach(el => el.classList.add('is-visible'));
  }
})();
