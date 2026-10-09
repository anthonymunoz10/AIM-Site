// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./AppRoutes.jsx";

import AppLoader from "./components/AppLoader.jsx";
import { applyTheme, THEME_EVENT } from "./lib/theme.js";
import { initAnalytics, trackPageView } from "./lib/analytics.js";


// ✅ Make scroll-to-top callable from anywhere (Footer included)
function hardScrollTop() {
  try {
    if (window.__lenis && typeof window.__lenis.scrollTo === "function") {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn("hardScrollTop failed:", err);
  }

  // always also reset native scroll
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function App() {
  const location = useLocation();

  // ✅ Light / dark mode: follow saved choice or device setting, per page
  useEffect(() => {
    applyTheme(location.pathname);
    const onPref = (e) => applyTheme(location.pathname, e.detail);
    const mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
    const onDevice = () => applyTheme(location.pathname);
    window.addEventListener(THEME_EVENT, onPref);
    mql?.addEventListener?.("change", onDevice);
    return () => {
      window.removeEventListener(THEME_EVENT, onPref);
      mql?.removeEventListener?.("change", onDevice);
    };
  }, [location.pathname]);

  // ✅ Analytics (inactive unless VITE_GA_ID is set): one page_view per page change
  useEffect(() => {
    initAnalytics();
    const t = setTimeout(() => trackPageView(location.pathname + location.search), 300);
    return () => clearTimeout(t);
  }, [location.pathname, location.search]);

  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  // ✅ Loader shows only once per tab session
  const [bootDone, setBootDone] = useState(() => {
    return sessionStorage.getItem("bootDone") === "1";
  });

  useEffect(() => {
    if (bootDone) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("bootDone", "1");
      setBootDone(true);
    }, 750);
    return () => clearTimeout(t);
  }, [bootDone]);

  // ✅ Disable browser’s scroll restoration (prevents “kept scroll”)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // ✅ Init Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis; // ✅ expose globally for Footer

    const loop = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // ✅ Always go top AFTER route changes (double-RAF beats layout/animation timing)
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hardScrollTop();
      });
    });
    // links like /residential#estimate: jump to that section once the page is drawn
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
      window.scrollTo(0, y);
    }, 450);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  // ✅ Fix “mobile <-> desktop” devtools switch causing weird scroll offsets
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      // when breakpoint flips, layout height changes → reset scroll
      requestAnimationFrame(() => hardScrollTop());
    };

    // modern + fallback
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return (
    <>
      <AppLoader done={bootDone} />

      <AnimatePresence mode="wait" initial={false}>
        <AppRoutes key={location.pathname} location={location} />
      </AnimatePresence>
    </>
  );
}
