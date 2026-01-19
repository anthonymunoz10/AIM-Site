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

function Page({ children }) {
  return (
    <motion.div
      // ✅ IMPORTANT: framer-motion projection warnings happen if parent is "static"
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

export default function App() {
  const location = useLocation();

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

  // ✅ Keep Lenis instance in a ref so we can control it on route changes
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  // ✅ init Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    const loop = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current = null;
    };
  }, []);

  // ✅ Scroll to top on every route change
  useEffect(() => {
    if (lenisRef.current) {
      // immediate prevents visible smooth-scroll during navigation
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname]);

  return (
    <>
      {/* ✅ Loader overlay */}
      <AppLoader done={bootDone} />

      <AnimatePresence mode="wait">
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
            path="/terms"
            element={
              <Page>
                <Terms />
              </Page>
            }
          />

          {/* Back-compat: old multi-page urls → new SPA routes */}
          <Route path="/about.html" element={<Navigate to="/about" replace />} />
          <Route path="/services.html" element={<Navigate to="/services" replace />} />
          <Route path="/projects.html" element={<Navigate to="/projects" replace />} />
          <Route path="/project.html" element={<Navigate to="/project" replace />} />
          <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
          <Route path="/privacy.html" element={<Navigate to="/privacy" replace />} />
          <Route path="/terms.html" element={<Navigate to="/terms" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
