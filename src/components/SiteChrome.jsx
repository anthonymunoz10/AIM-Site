import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Container = ({ children }) => (
  <div className="mx-auto w-[92%] max-w-[1200px]">{children}</div>
);

/* ----------------------------
   MOBILE MENU (hide only at page bottom) — Option A
---------------------------- */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef(null);
  const [sheetH, setSheetH] = useState(0);

  const PEEK = 28;

  // ✅ hide the whole menu only when user reaches bottom of the page
  const [hideAtBottom, setHideAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = doc.scrollHeight - 8; // small buffer
      setHideAtBottom(scrollBottom >= pageBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!sheetRef.current) return;
    const el = sheetRef.current;

    const ro = new ResizeObserver(() => {
      setSheetH(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    setSheetH(el.getBoundingClientRect().height);

    return () => ro.disconnect();
  }, []);

  // lock scroll when open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about.html", label: "Who We Are" },
    { href: "/services.html", label: "Services" },
    { href: "/projects.html", label: "Projects" },
    { href: "/contact.html", label: "Contact" },
  ];

  // closed position: slide up so only the TOP "peek" area shows
  const closedY = Math.min(0, -(sheetH - PEEK));
  // fully hidden above viewport (when at bottom)
  const hiddenY = -sheetH - 40;

  const targetY = hideAtBottom ? hiddenY : open ? 0 : closedY;

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        className={[
          "fixed inset-0 z-[60] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      </div>

      {/* Sheet */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70]"
        initial={false}
        animate={{ y: targetY }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        drag={hideAtBottom ? false : "y"}
        dragDirectionLock
        dragElastic={0.06}
        dragConstraints={{ top: closedY, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (hideAtBottom) return;

          const draggedDownFar = info.point.y > window.innerHeight * 0.18;
          const fastDown = info.velocity.y > 600;
          const fastUp = info.velocity.y < -600;

          if (fastDown || draggedDownFar) setOpen(true);
          else if (fastUp) setOpen(false);
          else {
            const midpoint = closedY / 2;
            setOpen(info.offset.y > midpoint);
          }
        }}
        style={{ paddingTop: "max(env(safe-area-inset-top),14px)" }}
      >
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <div
            ref={sheetRef}
            className="relative overflow-hidden rounded-[26px] border border-white/12 bg-black/70 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
          >
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_360px_at_20%_0%,rgba(255,255,255,0.10),transparent_60%)]" />

            <div className="relative flex items-center justify-between gap-4 px-6 py-5 border-b border-white/10">
              <a href="/" onClick={() => setOpen(false)} className="flex items-center" aria-label="Home">
                <img src="/img/logo.png" alt="Aim Construction" className="h-10 w-auto" />
              </a>

              <a
                href="/contact.html"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[var(--brand-orange)] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white hover:opacity-90 transition"
              >
                Quote
              </a>
            </div>

            <div className="relative px-6 py-2">
              <nav className="grid">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-5 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-white/90 font-extrabold uppercase tracking-[0.14em] text-base">
                      {l.label}
                    </span>
                    <span className="text-white/35 group-hover:text-[var(--brand-orange)] transition">→</span>
                  </a>
                ))}
              </nav>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative w-full flex items-center justify-center gap-2 py-4 border-t border-white/10"
              aria-label="Toggle menu"
              aria-expanded={open}
              disabled={hideAtBottom}
            >
              <span className="h-1.5 w-12 rounded-full bg-white/22" />
              <span className="h-1.5 w-8 rounded-full bg-white/14" />
            </button>
          </div>

          <div className="h-[max(env(safe-area-inset-bottom),14px)]" />
        </div>
      </motion.div>
    </div>
  );
}

/* ----------------------------
   DESKTOP NAV
---------------------------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hidden md:block fixed inset-x-0 top-0 z-50">
      <Container>
        <div className="pt-5">
          <div
            className={[
              "rounded-2xl border transition-all duration-300",
              "shadow-[0_20px_80px_rgba(0,0,0,0.45)]",
              scrolled
                ? "border-white/10 bg-black/60 backdrop-blur-xl"
                : "border-white/10 bg-black/25 backdrop-blur-md",
            ].join(" ")}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <a href="/" className="flex items-center gap-3">
                <img src="/img/logo.png" alt="Aim Construction" className="h-11 w-auto" />
              </a>

              <div className="flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-semibold text-white/85">
                <a className="hover:text-[var(--brand-orange)]" href="/about.html">Who We Are</a>
                <a className="hover:text-[var(--brand-orange)]" href="/services.html">Services</a>
                <a className="hover:text-[var(--brand-orange)]" href="/projects.html">Projects</a>
                <a className="hover:text-[var(--brand-orange)]" href="/contact.html">Contact</a>
              </div>

              <a
                href="/contact.html"
                className="rounded-full bg-[var(--brand-orange)] px-5 py-2.5 font-bold uppercase tracking-wider text-xs text-white hover:opacity-90 transition"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ----------------------------
   FOOTER (latest version)
---------------------------- */
export function Footer() {
  const year = new Date().getFullYear();

  const [pop, setPop] = useState(null); // "phone" | "email" | null

  const phoneValue = "(305) 331-5759";
  const emailValue = "aimconstructionmgt@gmail.com";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setPop(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (pop) {
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }
  }, [pop]);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLink =
    "relative inline-flex w-fit font-semibold text-black/70 hover:text-black transition " +
    "after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full after:origin-left after:scale-x-0 " +
    "after:bg-black/50 after:transition-transform after:duration-300 after:ease-out " +
    "hover:after:scale-x-100";

  return (
    <footer
      id="site-footer"
      className="relative bg-[var(--brand-orange)] text-black -mt-[22vh] pt-[26vh] min-h-[92vh] md:min-h-[88vh] pb-[18vh]"
    >
      {/* soft top fade so page blends into footer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 [background:linear-gradient(to_bottom,rgba(0,0,0,0.32),rgba(0,0,0,0))]" />

      {/* subtle depth in orange */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background:radial-gradient(900px_420px_at_20%_10%,rgba(0,0,0,0.22),transparent_60%),radial-gradient(900px_420px_at_80%_30%,rgba(255,255,255,0.14),transparent_60%)]" />

      {/* BIG watermark text (bottom-leak only, full width visible) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            right-[max(2vw,16px)]
            bottom-[max(env(safe-area-inset-bottom),0px)]
            translate-y-[0.22em]
            text-[clamp(240px,30vw,820px)]
            font-extrabold tracking-tight opacity-[0.10]
            select-none leading-none whitespace-nowrap
          "
        >
          AIM
        </div>
      </div>

      <Container>
        <div className="relative grid gap-12 md:grid-cols-12 text-black/85">
          {/* Left */}
          <div className="md:col-span-5">
            <img
              src="/img/logo.png"
              alt="Aim Construction"
              className="h-12 w-auto"
              style={{
                filter: "brightness(0) saturate(100%)",
                WebkitFilter: "brightness(0) saturate(100%)",
              }}
            />

            <p className="mt-6 max-w-[46ch] text-[16px] md:text-[17px] text-black/75 font-semibold leading-relaxed">
              Safety-first operations and dependable delivery for underground utility, directional boring, and
              restoration work.
            </p>

            <div className="mt-8 h-1 w-28 rounded-full bg-black/25" />
          </div>

          {/* Right */}
          <div className="md:col-span-7 md:col-start-6">
            {/* 3 columns on desktop: | Navigate | Connect + Top button | */}
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1fr_1fr_auto] items-start">
              {/* Navigate column (with left divider + mid divider) */}
              <div className="relative pl-6">
                {/* left divider (to the left of Navigate) */}
                <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-px bg-black/15" />

                <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/60">
                  Navigate
                </div>

                <div className="mt-5 grid gap-3 font-semibold">
                  <a className={footerLink} href="/services.html">
                    Services
                  </a>
                  <a className={footerLink} href="/about.html">
                    Company
                  </a>
                  <a className={footerLink} href="/projects.html">
                    Projects
                  </a>
                  <a className={footerLink} href="/contact.html">
                    Work with us
                  </a>
                </div>

                {/* divider between Navigate and Connect (sits on Navigate's right edge) */}
                <div className="hidden sm:block absolute -right-5 top-0 bottom-0 w-px bg-black/15" />
              </div>

              {/* Connect column */}
              <div className="relative pl-6">
                <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/60">
                  Connect
                </div>

                <div className="mt-5 grid gap-3 font-semibold">
                  <button type="button" onClick={() => setPop("phone")} className={footerLink}>
                    Phone
                  </button>

                  <button type="button" onClick={() => setPop("email")} className={footerLink}>
                    Email
                  </button>
                </div>
              </div>

              {/* Back to top button (to the right of Connect links) */}
              <div className="sm:justify-self-end md:pt-[28px]">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 text-black/70 hover:text-black transition font-semibold"
                  aria-label="Back to top"
                >
                  <span className="h-10 w-10 rounded-full border border-black/20 bg-black/5 backdrop-blur grid place-items-center">
                    ↑
                  </span>
                  <span className="uppercase tracking-[0.22em] text-xs font-extrabold">Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* bottom row — pinned to the bottom edge */}
        <div className="absolute inset-x-0 bottom-0 pb-[max(env(safe-area-inset-bottom),2.5vh)]">
          <div className="border-t border-black/15 pt-8 text-sm font-semibold text-black/65">
            <Container>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>© {year} AIM Construction Management. All rights reserved.</div>
                <div className="flex items-center gap-6">
                  <a className="hover:underline underline-offset-4" href="/privacy.html">
                    Privacy
                  </a>
                  <a className="hover:underline underline-offset-4" href="/terms.html">
                    Terms
                  </a>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Container>

      {/* Popup modal */}
      {pop && (
        <div className="fixed inset-0 z-[999]">
          {/* backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => setPop(null)}
            aria-label="Close popup"
          />

          {/* modal */}
          <div className="absolute inset-0 grid place-items-center p-5">
            <div className="relative w-full max-w-[520px] overflow-hidden rounded-[22px] border border-white/12 bg-black/80 text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(900px_380px_at_20%_0%,rgba(255,255,255,0.10),transparent_60%)]" />

              <div className="relative p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-white/60">
                      {pop === "phone" ? "Phone" : "Email"}
                    </div>
                    <div className="mt-3 text-2xl font-extrabold text-white leading-tight break-words">
                      {pop === "phone" ? phoneValue : emailValue}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPop(null)}
                    className="shrink-0 h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition grid place-items-center text-white/80"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pop === "phone" ? (
                    <>
                      <a
                        href={`tel:${phoneValue.replace(/[^\d+]/g, "")}`}
                        className="rounded-full bg-[var(--brand-orange)] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white hover:opacity-90 transition text-center"
                      >
                        Call now
                      </a>
                      <button
                        type="button"
                        onClick={() => copy(phoneValue)}
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white/90 hover:bg-white/10 transition"
                      >
                        Copy
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={`mailto:${emailValue}`}
                        className="rounded-full bg-[var(--brand-orange)] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white hover:opacity-90 transition text-center"
                      >
                        Compose email
                      </a>
                      <button
                        type="button"
                        onClick={() => copy(emailValue)}
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white/90 hover:bg-white/10 transition"
                      >
                        Copy
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-5 text-sm font-semibold text-white/60">
                  Press <span className="text-white/80">Esc</span> to close.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
