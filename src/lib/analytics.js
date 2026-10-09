// src/lib/analytics.js
//
// Google Analytics 4, off until a measurement ID is set in Netlify as the
// environment variable VITE_GA_ID (looks like G-XXXXXXXXXX). With no ID,
// nothing loads and nothing is tracked.
//
// What gets recorded (each separately):
//   page_view       every page change
//   phone_click     someone tapped a phone number (a tap, not a confirmed call)
//   email_click     someone tapped an email link
//   generate_lead   a quote form was ACTUALLY submitted and Netlify accepted it
//                   (only fired after a successful response, never on a button click)

const GA_ID = import.meta.env.VITE_GA_ID;
let started = false;

export function analyticsOn() {
  return Boolean(GA_ID) && typeof window !== "undefined";
}

export function initAnalytics() {
  if (!analyticsOn() || started) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  // phone and email taps anywhere on the site
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      trackEvent(href.startsWith("tel:") ? "phone_click" : "email_click", {
        link_url: href,
        page_path: window.location.pathname,
      });
    },
    { capture: true }
  );
}

export function trackEvent(name, params = {}) {
  if (!analyticsOn() || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function trackPageView(path) {
  trackEvent("page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

// call only after the form submission succeeded
export function trackLead(form) {
  trackEvent("generate_lead", { form_name: form, page_path: window.location.pathname });
}
