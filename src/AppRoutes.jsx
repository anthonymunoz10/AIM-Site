// src/AppRoutes.jsx
//
// The site's routes, shared by the browser app (App.jsx) and the build-time
// prerender (entry-server.jsx), so every page also ships as plain HTML.
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

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
import ServicePage from "./pages/ServicePage.jsx";
import { SERVICE_PAGES } from "./data/servicePages.js";

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

export default function AppRoutes({ location }) {
  return (
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
      {SERVICE_PAGES.map((sp) => (
        <Route
          key={sp.path}
          path={sp.path}
          element={
            <Page>
              <ServicePage />
            </Page>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
