// src/lib/theme.js
//
// Light / dark mode. The visitor's choice is remembered; otherwise the site
// follows their phone or computer setting. Pages listed in LIGHT_READY_PATHS
// have been designed for light mode; every other page stays dark for now.

export const LIGHT_READY_PATHS = ["/", "/services"];

const KEY = "aim-theme";
export const THEME_EVENT = "aim-theme-change";

// service detail pages (/services/..., /residential/...) are built light-ready
const LIGHT_READY_PATTERN = /^\/(services|residential)\/[a-z-]+\/?$/;

export function isLightReady(pathname) {
  return LIGHT_READY_PATHS.includes(pathname) || LIGHT_READY_PATTERN.test(pathname);
}

export function getPreferredTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage blocked: fall back to device setting */
  }
  try {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  } catch {
    /* very old browser */
  }
  return "dark";
}

export function setPreferredTheme(theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage blocked: choice lasts for this page view only */
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

export function applyTheme(pathname, preferred = getPreferredTheme()) {
  const theme = preferred === "light" && isLightReady(pathname) ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
}
