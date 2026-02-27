(() => {
  const runTypewriter = () => {
    const greeting = document.querySelector("[data-typewriter]");
    if (!greeting || greeting.dataset.typed === "true") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const text = greeting.textContent?.trim();
    if (prefersReduced || !text) return;

    greeting.dataset.typed = "true";
    greeting.classList.add("is-typing");
    greeting.textContent = "";

    let index = 0;
    const charDelay = 82;
    const startDelay = 260;

    const step = () => {
      index += 1;
      greeting.textContent = text.slice(0, index);
      if (index < text.length) {
        setTimeout(step, charDelay);
      } else {
        greeting.classList.remove("is-typing");
      }
    };

    setTimeout(step, startDelay);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runTypewriter, { once: true });
  } else {
    runTypewriter();
  }

  document.addEventListener("astro:page-load", runTypewriter);
})();
