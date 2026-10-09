// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import AppLoader from "./components/AppLoader.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Projects from "./pages/Projects.jsx";
import Project from "./pages/Project.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import DeleteAccount from "./pages/DeleteAccount.jsx";
import SmsOptIn from "./pages/SmsOptIn.jsx";
import Residential from "./pages/Residential.jsx";

function Page({ children }) {
  return (
    <motion.div
      style={{ position: "relative" }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

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
  }, [location.pathname]);

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
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="/about"
            element={
              <Page>
                <About />
              </Page>
            }
          />
          <Route
            path="/services"
            element={
              <Page>
                <Services />
              </Page>
            }
          />
          <Route
            path="/residential"
            element={
              <Page>
                <Residential />
              </Page>
            }
          />
          <Route
            path="/projects"
            element={
              <Page>
                <Projects />
              </Page>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <Page>
                <Project />
              </Page>
            }
          />
          <Route
            path="/project"
            element={
              <Page>
                <Project />
              </Page>
            }
          />
          <Route
            path="/contact"
            element={
              <Page>
                <Contact />
              </Page>
            }
          />
          <Route
            path="/privacy"
            element={
              <Page>
                <Privacy />
              </Page>
            }
          />
          <Route
            path="/sms-opt-in"
            element={
              <Page>
                <SmsOptIn />
              </Page>
            }
          />
          <Route
            path="/terms"
            element={
              <Page>
                <Terms />
              </Page>
            }
          />
          <Route path="/delete-account" element={<DeleteAccount />} />

          {/* old urls */}
          <Route
            path="/about.html"
            element={<Navigate to="/about" replace />}
          />
          <Route
            path="/services.html"
            element={<Navigate to="/services" replace />}
          />
          <Route
            path="/projects.html"
            element={<Navigate to="/projects" replace />}
          />
          <Route
            path="/project.html"
            element={<Navigate to="/project" replace />}
          />
          <Route
            path="/contact.html"
            element={<Navigate to="/contact" replace />}
          />
          <Route
            path="/privacy.html"
            element={<Navigate to="/privacy" replace />}
          />
          <Route
            path="/terms.html"
            element={<Navigate to="/terms" replace />}
          />
          <Route
            path="/sms-opt-in.html"
            element={<Navigate to="/sms-opt-in" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
