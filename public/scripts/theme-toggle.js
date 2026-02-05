(() => {
  const THEME_KEY = "theme";

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.themeReady = "true";
  };

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
      // If storage is blocked, we still apply the theme for this session.
    }
  };

  const initThemeToggle = () => {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
    }

    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    toggle.setAttribute(
      "aria-pressed",
      document.documentElement.dataset.theme === "dark"
    );

    toggle.addEventListener("click", () => {
      const next =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      setStoredTheme(next);
      toggle.setAttribute("aria-pressed", next === "dark");
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeToggle, { once: true });
  } else {
    initThemeToggle();
  }

  document.addEventListener("astro:page-load", initThemeToggle);
})();
