(() => {
  const root = document.documentElement;
  let revealObserver;
  let sectionObserver;
  let resizeBound = false;

  const isReduced = () =>
    root.dataset.motion === "reduced" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getAnchorOffset = () => {
    const navShell = document.querySelector(".site-nav-shell");
    if (!(navShell instanceof HTMLElement)) return 112;
    return Math.ceil(navShell.getBoundingClientRect().height + 10);
  };

  const applyAnchorOffset = () => {
    const offset = getAnchorOffset();
    root.style.setProperty("--anchor-offset", `${offset}px`);
    return offset;
  };

  const scrollToElement = (element, behavior = "smooth") => {
    if (!(element instanceof HTMLElement)) return;
    const offset = applyAnchorOffset();
    const top = Math.max(0, window.scrollY + element.getBoundingClientRect().top - offset);
    window.scrollTo({ top, behavior });
  };

  const scrollToHash = (hash, { behavior = "smooth", emphasize = false } = {}) => {
    const id = hash.replace(/^#/, "");
    if (!id) return null;
    const target = document.getElementById(id);
    if (!(target instanceof HTMLElement)) return null;
    scrollToElement(target, behavior);
    if (emphasize) emphasizeSection(target);
    return target;
  };

  const bindResize = () => {
    if (resizeBound) return;
    resizeBound = true;
    window.addEventListener(
      "resize",
      () => {
        applyAnchorOffset();
      },
      { passive: true }
    );
    window.addEventListener("orientationchange", applyAnchorOffset, { passive: true });
  };

  const revealNow = (element) => {
    element.classList.add("is-visible");
  };

  const emphasizeSection = (section) => {
    if (!(section instanceof HTMLElement)) return;
    if (isReduced()) return;

    section.classList.remove("section-emphasis");
    window.requestAnimationFrame(() => {
      section.classList.add("section-emphasis");
    });

    if (section.dataset.emphasisTimer) {
      window.clearTimeout(Number(section.dataset.emphasisTimer));
    }
    const timer = window.setTimeout(() => {
      section.classList.remove("section-emphasis");
      section.dataset.emphasisTimer = "";
    }, 700);
    section.dataset.emphasisTimer = String(timer);
  };

  const applyStagger = (container) => {
    if (!(container instanceof HTMLElement)) return;
    if (!container.hasAttribute("data-stagger")) return;
    if (container.dataset.staggerReady === "true") return;

    const baseDelay = Number(container.dataset.staggerBase ?? "70");
    const selector = container.dataset.staggerSelector ?? ":scope > *";
    const items = Array.from(container.querySelectorAll(selector));

    items.forEach((item, index) => {
      if (!(item instanceof HTMLElement)) return;
      if (!item.hasAttribute("data-reveal")) item.setAttribute("data-reveal", "");
      if (!item.dataset.revealDelay) {
        item.dataset.revealDelay = String(baseDelay * index);
      }
    });

    container.dataset.staggerReady = "true";
  };

  const observeReveal = (element) => {
    if (!(element instanceof HTMLElement)) return;
    if (element.dataset.revealBound === "true") return;
    element.dataset.revealBound = "true";

    const delay = Number(element.dataset.revealDelay ?? "0");
    element.style.setProperty("--reveal-delay", `${delay}ms`);

    if (isReduced()) {
      revealNow(element);
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            if (!(target instanceof HTMLElement)) return;
            revealNow(target);
            revealObserver?.unobserve(target);
          });
        },
        {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.12,
        }
      );
    }

    revealObserver.observe(element);
  };

  const initSectionNav = () => {
    const links = Array.from(document.querySelectorAll("[data-nav-section]")).filter(
      (node) => node instanceof HTMLAnchorElement
    );
    if (!links.length) return;

    const sections = links
      .map((link) => {
        const id = link.getAttribute("data-nav-section");
        if (!id) return null;
        const section = document.getElementById(id);
        return section ? { id, link, section } : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    const visibility = new Map(sections.map(({ id }) => [id, 0]));

    const setActive = (id) => {
      sections.forEach(({ id: sectionId, link }) => {
        const isActive = sectionId === id;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const clearActive = () => {
      sections.forEach(({ link }) => {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      });
    };

    sections.forEach(({ id, link, section }) => {
      if (link.dataset.sectionBound === "true") return;
      link.dataset.sectionBound = "true";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setActive(id);
        scrollToElement(section, isReduced() ? "auto" : "smooth");
        emphasizeSection(section);
        window.history.pushState(null, "", `#${id}`);
      });
    });

    if (sectionObserver) {
      sectionObserver.disconnect();
    }

    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) return;
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = "";
        let bestRatio = 0;

        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio < 0.2) {
          clearActive();
          return;
        }

        setActive(bestId);
      },
      {
        rootMargin: "-24% 0px -52% 0px",
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65],
      }
    );

    sections.forEach(({ section }) => sectionObserver?.observe(section));
    clearActive();

    const hashId = window.location.hash?.replace("#", "");
    if (hashId) {
      const target = sections.find(({ id }) => id === hashId);
      if (target) {
        setActive(target.id);
        scrollToElement(target.section, "auto");
        emphasizeSection(target.section);
      }
    }
  };

  const initGlobalHashAnchors = () => {
    const hashLinks = Array.from(document.querySelectorAll('a[href^="#"]')).filter(
      (node) => node instanceof HTMLAnchorElement
    );

    hashLinks.forEach((link) => {
      if (link.hasAttribute("data-nav-section")) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      if (link.dataset.hashBound === "true") return;
      link.dataset.hashBound = "true";

      link.addEventListener("click", (event) => {
        const target = scrollToHash(hash, {
          behavior: isReduced() ? "auto" : "smooth",
          emphasize: true,
        });
        if (!target) return;
        event.preventDefault();
        window.history.pushState(null, "", hash);
      });
    });
  };

  const initMotion = () => {
    applyAnchorOffset();
    bindResize();
    document.querySelectorAll("[data-stagger]").forEach(applyStagger);
    document.querySelectorAll("[data-reveal]").forEach(observeReveal);
    initSectionNav();
    initGlobalHashAnchors();
    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        scrollToHash(window.location.hash, { behavior: "auto", emphasize: true });
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMotion, { once: true });
  } else {
    initMotion();
  }

  document.addEventListener("astro:page-load", initMotion);
})();
