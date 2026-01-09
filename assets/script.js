(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");
  const copyBtn = document.getElementById("copyEmailBtn");

  // Year
  if (year) year.textContent = new Date().getFullYear();

  // Theme: saved choice > system preference
  const saved = localStorage.getItem("theme");
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

  function setTheme(mode) {
    const icon = toggle ? toggle.querySelector(".icon") : null;

    if (mode === "light") {
      root.classList.add("theme-light");
      localStorage.setItem("theme", "light");
      if (icon) icon.textContent = "☼";
      return;
    }

    root.classList.remove("theme-light");
    localStorage.setItem("theme", "dark");
    if (icon) icon.textContent = "☾";
  }

  setTheme(saved || (prefersLight ? "light" : "dark"));

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isLight = root.classList.contains("theme-light");
      setTheme(isLight ? "dark" : "light");
    });
  }

  // Copy email
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email") || "";
      try {
        await navigator.clipboard.writeText(email);
        const old = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = old), 900);
      } catch {
        alert("Copy failed. Email: " + email);
      }
    });
  }
})();
