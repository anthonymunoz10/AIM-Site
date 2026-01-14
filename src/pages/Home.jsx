import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Container = ({ children }) => (
  <div className="mx-auto w-[92%] max-w-[1200px]">{children}</div>
);

/** Floating rounded section wrapper (what you asked for) */
function FloatSection({ children, tone = "light" }) {
  const shell =
    "rounded-[26px] border overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.18)]";

  const toneCls =
    tone === "dark"
      ? "bg-[var(--ink)] text-white border-white/12"
      : "bg-white text-[var(--ink)] border-black/10";

  // ✅ IMPORTANT: different overlay per tone (no more white-washing dark sections)
  const innerOverlay =
    tone === "dark"
      ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.00))]"
      : "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.86))]";

  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className={`${shell} ${toneCls}`}>
          <div className={`p-6 md:p-10 ${innerOverlay}`}>{children}</div>
        </div>
      </Container>
    </div>
  );
}


function MobileMenu() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef(null);
  const [sheetH, setSheetH] = useState(0);

  // how much of the sheet peeks when "closed" (top peek only)
  const PEEK = 28;

  // ✅ Hide only when the footer is in view (near bottom)
  const [hideNearBottom, setHideNearBottom] = useState(false);

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

  // ✅ Observe the footer entering the viewport to hide the menu only near bottom
  useEffect(() => {
    const footerEl = document.querySelector("#site-footer");
    if (!footerEl) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const isNearBottom = entry.isIntersecting;
        setHideNearBottom(isNearBottom);

        // optional: auto-close if footer is coming in so nothing overlaps
        if (isNearBottom) setOpen(false);
      },
      {
        root: null,
        threshold: 0.01,
        // tune this:
        // - smaller negative (ex: -10%) => hides later (closer to bottom)
        // - larger negative (ex: -50%) => hides earlier
        rootMargin: "0px 0px -35% 0px",
      }
    );

    obs.observe(footerEl);
    return () => obs.disconnect();
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

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
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

  // fully hidden position (push the whole sheet up beyond the top)
  const hiddenY = Math.min(0, -(sheetH + 24));

  // if we're near the footer, hide completely; otherwise use the peek
  const effectiveY = open ? 0 : hideNearBottom ? hiddenY : closedY;

  // if hidden, disable drag (so you don't accidentally pull it down over footer)
  const canDrag = !(hideNearBottom && !open);

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
        animate={{ y: effectiveY }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
        drag={canDrag ? "y" : false}
        dragDirectionLock
        dragElastic={0.06}
        dragConstraints={{ top: hideNearBottom ? hiddenY : closedY, bottom: 0 }}
        onDragEnd={(_, info) => {
          const draggedDownFar = info.point.y > window.innerHeight * 0.18;
          const fastDown = info.velocity.y > 600;
          const fastUp = info.velocity.y < -600;

          if (fastDown || draggedDownFar) setOpen(true);
          else if (fastUp) setOpen(false);
          else {
            const midpoint = (hideNearBottom ? hiddenY : closedY) / 2;
            setOpen(info.offset.y > midpoint);
          }
        }}
        style={{
          paddingTop: "max(env(safe-area-inset-top),14px)",
        }}
      >
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <div
            ref={sheetRef}
            className="relative overflow-hidden rounded-[26px] border border-white/12 bg-black/70 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
          >
            {/* subtle highlight */}
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_360px_at_20%_0%,rgba(255,255,255,0.10),transparent_60%)]" />

            {/* header (logo only) */}
            <div className="relative flex items-center justify-between gap-4 px-6 py-5 border-b border-white/10">
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center"
                aria-label="Home"
              >
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

            {/* links */}
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
                    <span className="text-white/35 group-hover:text-[var(--brand-orange)] transition">
                      →
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* BOTTOM NOTCH / HANDLE (tap toggles, also a drag affordance) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative w-full flex items-center justify-center gap-2 py-4 border-t border-white/10"
              aria-label="Toggle menu"
              aria-expanded={open}
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




function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // ✅ Desktop-only nav (completely hidden on mobile)
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

function RevealLines({
  lines = [],
  as: Tag = "h2",
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.08,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}



function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <header ref={heroRef} className="relative min-h-[100svh] bg-[var(--black)] overflow-hidden">

      {/* Background video layer */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/hero-poster.webp"
        >
          <source src="/video/hero-vid.webm" type="video/webm" />
          <source src="/video/hero-vid.mp4" type="video/mp4" />
        </video>

        {/* Base darkening */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Orange bloom */}
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />

        {/* Secondary soft highlight */}
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_85%_25%,rgba(255,255,255,0.10),transparent_60%)]" />

        {/* Vignette */}
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.88)_100%)]" />

        {/* Grain */}
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
      </motion.div>
      <Nav />

      
      
      {/* ✅ Mobile top-centered logo (clean, always visible) */}
        <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
          <a href="/" aria-label="Home" className="inline-flex items-center justify-center">
            <img
              src="/img/logo.png"
              alt="Aim Construction"
              className="h-16 w-auto opacity-90"
            />
          </a>
        </div>

        {/* ✅ Mobile pull-down menu (only on mobile) */}
        <div className="md:hidden">
          <MobileMenu />
      </div>


      <div className="relative z-10 min-h-[100svh]">
        <Container>
          {/* MOBILE: logo -> headline -> pill, then bottom text+CTAs near scroll */}
          <div className="md:hidden flex min-h-[100svh] flex-col pt-44 pb-24 text-center">
            {/* top stack */}
            <div className="flex flex-col items-center">

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75"
              >
                Underground Utility • Directional Boring • Restoration
              </motion.div>
            </div>

            {/* pushes the bottom content down */}
            <div className="flex-1" />

            {/* bottom stack */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mx-auto max-w-[48ch] text-white/72 font-medium text-[15px] leading-relaxed"
              >
                Safety-first crews delivering fast, dependable underground utility,
                directional boring, and restoration work across Florida and beyond.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-6 flex flex-wrap justify-center gap-3"
              >
                <a
                  href="/projects.html"
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  See Our Work
                </a>
                <a
                  href="/contact.html"
                  className="rounded-full border border-white/20 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </div>

          {/* DESKTOP: keep your original desktop spacing/left align */}
          <div className="hidden md:block pt-40">
            <div className="max-w-[720px] text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mt-2 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] font-extrabold text-white/75"
              >
                Underground Utility • Directional Boring • Restoration
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-5 text-[clamp(2.6rem,5.2vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight text-white"
              >
                Plan. Build.{" "}
                <span className="text-[var(--brand-orange)]">Deliver.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 max-w-[60ch] text-white/72 font-medium text-base leading-relaxed"
              >
                Safety-first crews delivering fast, dependable underground utility,
                directional boring, and restoration work across Florida and beyond.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a
                  href="/projects.html"
                  className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  See Our Work
                </a>
                <a
                  href="/contact.html"
                  className="rounded-full border border-white/20 bg-white/0 px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>


      {/* Scroll */}
      <div className="absolute bottom-7 left-0 right-0 z-10">
        <Container>
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector("#next");
              if (!el) return;
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition font-semibold"
          >
            <span className="h-10 w-10 rounded-full border border-white/18 bg-white/5 backdrop-blur grid place-items-center">
              ↓
            </span>
            <span className="uppercase tracking-[0.22em] text-xs font-bold">Scroll</span>
          </button>
        </Container>
      </div>

    </header>
  );
}

function QuickActions() {
  const items = [
    { left: "Call", right: "(305) 331-5759", href: "tel:3053315759" },
    { left: "Email", right: "aimconstructionmgt@gmail.com", href: "mailto:aimconstructionmgt@gmail.com?subject=Website%20Inquiry" },
    { left: "Quote", right: "Request a Quote →", href: "/contact.html" },
  ];

  return (
    <div id="next" className="py-8 md:py-10">
      <Container>
        <div className="rounded-[22px] border border-white/12 bg-[rgba(0,0,0,0.72)] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="grid md:grid-cols-3">
            {items.map((x) => (
              <a
                key={x.left}
                href={x.href}
                className="group flex items-center justify-between px-5 py-4 border-b border-white/10 md:border-b-0 md:border-r md:border-white/10 last:border-r-0 hover:bg-white/5 transition"
              >
                <span className="text-white/55 font-bold uppercase tracking-[0.18em] text-[11px]">
                  {x.left}
                </span>
                <span className="text-white/85 font-semibold text-sm group-hover:text-white transition">
                  {x.right}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}



function StatRow() {
  const stats = useMemo(
    () => [
      { top: "24+", bottom: "Years Experience" },
      { top: "2”–24”", bottom: "Directional Boring" },
      { top: "FL + SE", bottom: "Regional Coverage" },
      { top: "Safety", bottom: "First Operations" },
    ],
    []
  );

  return (
    <FloatSection tone="dark">
      <div id="next" className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.bottom}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-center"
          >
            <div className="text-3xl font-extrabold text-white">{s.top}</div>
            <div className="mt-2 text-sm font-semibold text-white/70">{s.bottom}</div>
          </div>
        ))}
      </div>
    </FloatSection>
  );
}

function Footer() {
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
    <footer id="site-footer" className="relative bg-[var(--brand-orange)] text-black -mt-[22vh] pt-[26vh] min-h-[92vh] md:min-h-[88vh] pb-[18vh]">

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
                  <a className={footerLink} href="/services.html">Services</a>
                  <a className={footerLink} href="/about.html">Company</a>
                  <a className={footerLink} href="/projects.html">Projects</a>
                  <a className={footerLink} href="/contact.html">Work with us</a>
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
                  <span className="uppercase tracking-[0.22em] text-xs font-extrabold">
                    Top
                  </span>
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
            <div className="w-full max-w-[520px] overflow-hidden rounded-[22px] border border-white/12 bg-black/80 text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
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

function HomeContent() {
  return (
    <main className="relative bg-[var(--sand)] text-[var(--ink)]">
      {/* ✅ SAND / EGGSHELL BACKGROUND (global + obvious) */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[var(--sand)]" />

      {/* subtle sand depth + texture */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        {/* soft banding */}
        <div className="absolute inset-0 [background:linear-gradient(180deg,var(--sand)_0%,var(--sand-2)_70%,var(--sand)_100%)]" />
        {/* light speckle */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(0,0,0,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
        {/* grain */}
        <div className="absolute inset-0 noise opacity-[0.06] mix-blend-multiply" />
      </div>

      <div className="relative">
        {/* ✅ FOOTER BLACK ZONE (this is the actual footer “area” background) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] -z-10">
          {/* true black base */}
          <div className="absolute inset-0 bg-black" />

          {/* subtle steel sheen so black isn’t flat */}
          <div className="absolute inset-0 opacity-[0.55] [background:radial-gradient(1100px_520px_at_20%_20%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(900px_420px_at_80%_40%,rgba(255,255,255,0.06),transparent_60%)]" />

          {/* orange industrial glow */}
          <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_20%_30%,rgba(233,151,19,0.26),transparent_62%)]" />

          {/* hazard stripe band (visible but not obnoxious) */}
          <div className="absolute left-0 right-0 top-[150px] h-[88px] opacity-[0.18] [background:repeating-linear-gradient(135deg,rgba(233,151,19,1)_0px,rgba(233,151,19,1)_14px,rgba(0,0,0,1)_14px,rgba(0,0,0,1)_28px)]" />

          {/* grain */}
          <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
        </div>

        {/* ✅ PAGE SHELL (shadow clipped to curve — no sharp rectangle edge line) */}
        <div className="relative z-10 overflow-hidden rounded-b-[56px] bg-[var(--sand)] shadow-[0_70px_180px_rgba(0,0,0,0.35)]">
          {/* top soft highlight */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.40),transparent_60%)]" />

          <div className="relative">
            <Hero />
            <QuickActions />
            <StatRow />

            {/* ✅ WHO WE ARE */}
            <FloatSection tone="light">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/60">
                    Who We Are
                  </div>

                  <RevealLines
                    as="h2"
                    className="mt-3 text-4xl md:text-5xl font-extrabold leading-[1.02] text-brand-ink"
                    lines={[
                      "Committed to",
                      <span className="text-[var(--brand-orange)]" key="ex">
                        Excellence
                      </span>,
                    ]}
                  />

                  <p className="mt-4 text-black/65 font-semibold max-w-[58ch]">
                    AIM Construction Management is a licensed general contractor built on decades of underground utility
                    and electrical experience. We deliver scope clarity, safety-first operations, and dependable execution.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {[
                      "Underground utility & ductbank",
                      "Directional boring (2”–24”)",
                      "Concrete & asphalt restoration",
                    ].map((t) => (
                      <div
                        key={t}
                        className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 font-bold text-brand-ink"
                      >
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <a
                      href="/about.html"
                      className="inline-flex rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                <div className="rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                  <img
                    src="/img/about-image.webp"
                    alt="Construction planning"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </FloatSection>

            {/* ✅ SERVICES */}
            <FloatSection tone="light">
              <div className="text-center">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/60">
                  Professional Services
                </div>

                <RevealLines
                  as="h2"
                  className="mt-3 text-4xl md:text-5xl font-extrabold text-brand-ink"
                  lines={[
                    "Built for speed, precision,",
                    <span className="text-[var(--brand-orange)]" key="s">
                      and safety
                    </span>,
                  ]}
                />
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  {
                    img: "/img/service-planning.webp",
                    title: "Underground Utility",
                    desc: "Ductbank, trenching, encasement, water/sewer install, cable pulls, and open cut scope.",
                  },
                  {
                    img: "/img/service-maintenance.webp",
                    title: "Directional Boring",
                    desc: "2”–24” bores with a fleet designed for complex runs and demanding field conditions.",
                  },
                  {
                    img: "/img/service-general.webp",
                    title: "Restoration",
                    desc: "Concrete and asphalt restoration, bridge attachments, finish work built to spec.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.16)] bg-white"
                  >
                    <div className="h-52">
                      <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                        Service
                      </div>
                      <h3 className="mt-2 text-2xl font-extrabold text-brand-ink">{c.title}</h3>
                      <p className="mt-2 text-black/65 font-semibold">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/services.html"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 font-bold uppercase tracking-wider text-sm text-brand-ink hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                >
                  Browse Services
                </a>
                <a
                  href="/contact.html"
                  className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Request a Quote
                </a>
              </div>
            </FloatSection>

            {/* ✅ HOW WE WORK (fix visibility) */}
            <FloatSection tone="dark">
              <div className="text-center">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                  How We Work
                </div>

                <RevealLines
                  as="h2"
                  className="mt-3 text-4xl md:text-5xl font-extrabold text-white"
                  lines={["Simple process.", "Serious execution."]}
                />
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-4">
                {[
                  { n: "01", t: "Scope Review", d: "We review plans, photos, constraints, and schedule needs—fast and clear." },
                  { n: "02", t: "Plan + Mobilize", d: "Right equipment, right crew, right safety approach—no surprises." },
                  { n: "03", t: "Build + Restore", d: "Execute the scope, then restore concrete/asphalt to spec and expectations." },
                  { n: "04", t: "Closeout", d: "Clean finish, documented progress, and responsive communication." },
                ].map((p) => (
                  <div
                    key={p.n}
                    className="rounded-2xl border border-white/14 bg-white/8 p-6"
                  >
                    <div className="text-[var(--brand-orange)] font-extrabold text-xl">{p.n}</div>
                    <div className="mt-3 font-extrabold text-white text-lg">{p.t}</div>
                    <p className="mt-2 text-white/75 font-semibold">{p.d}</p>
                  </div>
                ))}
              </div>
            </FloatSection>

            {/* ✅ RECENT WORK */}
            <FloatSection tone="light">
              <div className="text-center">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/60">
                  Recent Work
                </div>

                <RevealLines
                  as="h2"
                  className="mt-3 text-4xl md:text-5xl font-extrabold text-brand-ink"
                  lines={["Featured projects"]}
                />
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  { img: "/img/virginia-key-phase3.webp", tag: "Infrastructure", title: "WWTP Virginia Key – Phase 3", loc: "Virginia Key, FL", href: "/project.html?id=virginia-key-phase3" },
                  { img: "/img/miami-beach-ductbank.webp", tag: "Infrastructure", title: "Miami Beach Ductbank", loc: "Miami Beach, FL", href: "/project.html?id=miami-beach-ductbank" },
                  { img: "/img/port-of-miami.webp", tag: "Infrastructure", title: "Port of Miami Ductbank", loc: "Miami, FL", href: "/project.html?id=port-of-miami" },
                ].map((x) => (
                  <a
                    key={x.title}
                    href={x.href}
                    className="group rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.16)] bg-white block"
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={x.img}
                        alt={x.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">{x.tag}</div>
                      <div className="mt-2 text-2xl font-extrabold text-brand-ink">{x.title}</div>
                      <div className="mt-1 text-black/65 font-semibold">{x.loc}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a
                  href="/projects.html"
                  className="inline-flex rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  View Full Portfolio
                </a>
              </div>
            </FloatSection>
          </div>
        </div>

        <Footer />

      </div>
    </main>
  );
}



export default function Home() {
  return <HomeContent />;
}
