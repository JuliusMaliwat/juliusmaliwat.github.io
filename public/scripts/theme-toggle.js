(() => {
  const THEME_KEY = "theme";
  const root = document.documentElement;

  const getStoredTheme = () => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch {
      return null;
    }
  };

  const setStoredTheme = (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignore storage failures; theme still works for this session.
    }
  };

  const resolveTheme = () => {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark") return stored;
    return root.dataset.theme === "light" ? "light" : "dark";
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.dataset.themeReady = "true";
  };

  const updateToggleState = () => {
    const isLight = root.dataset.theme === "light";
    document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
      toggle.setAttribute("aria-pressed", String(isLight));
      toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    });
  };

  const bindToggle = (toggle) => {
    if (!(toggle instanceof HTMLElement)) return;
    if (toggle.dataset.themeBound === "true") return;
    toggle.dataset.themeBound = "true";

    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      setStoredTheme(next);
      updateToggleState();
    });
  };

  const initThemeToggle = () => {
    applyTheme(resolveTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach(bindToggle);
    updateToggleState();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeToggle, { once: true });
  } else {
    initThemeToggle();
  }

  document.addEventListener("astro:page-load", initThemeToggle);
})();
