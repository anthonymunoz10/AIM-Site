import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Container = ({ children }) => (
  <div className="mx-auto w-[92%] max-w-[1200px]">{children}</div>
);

/** Floating rounded section wrapper (what you asked for) */
function FloatSection({ children, tone = "light" }) {
  const base =
    "rounded-[24px] shadow-soft border overflow-hidden";
  const toneCls =
    tone === "dark"
      ? "bg-brand-dark text-white border-white/10"
      : "bg-white text-brand-ink border-black/5";

  return (
    <div className="py-10 md:py-14">
      <Container>
        <div className={`${base} ${toneCls}`}>
          <div className="p-6 md:p-10">{children}</div>
        </div>
      </Container>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // lock body scroll when menu open
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

  return (
    <>
      {/* Mobile toggle button (inside Nav on mobile) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/85 backdrop-blur hover:bg-white/10 transition"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <span className="grid gap-1">
          <span className="h-[2px] w-5 bg-white/80 rounded" />
          <span className="h-[2px] w-5 bg-white/80 rounded" />
          <span className="h-[2px] w-5 bg-white/80 rounded" />
        </span>
      </button>

      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-[60] transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
            "bg-black/55 backdrop-blur-[2px]",
          ].join(" ")}
        />

        {/* Slide-down sheet */}
        <div
          className={[
            "absolute left-0 right-0 top-0",
            "transition-transform duration-500",
            "will-change-transform",
            open
              ? "translate-y-0"
              : "translate-y-[calc(-100%+var(--menu-peek))]",
          ].join(" ")}
          style={{
            // how much notch peeks when closed
            ["--menu-peek"]: "0px",
          }}
        >
          <div
            className={[
              "mx-auto w-[92%] max-w-[1200px]",
              "pt-[max(env(safe-area-inset-top),14px)]",
            ].join(" ")}
          >
            <div className="relative overflow-hidden rounded-[26px] border border-white/12 bg-black/70 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
              {/* subtle highlight */}
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_360px_at_20%_0%,rgba(255,255,255,0.10),transparent_60%)]" />

              {/* header */}
              <div className="relative flex items-center justify-between gap-4 px-6 py-5 border-b border-white/10">
                <a
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                  aria-label="Home"
                >
                  <img src="/img/logo.png" alt="Aim Construction" className="h-10 w-auto" />
                  <div className="text-white/90 font-semibold tracking-wide">
                    Aim Construction
                  </div>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href="/contact.html"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[var(--brand-orange)] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white hover:opacity-90 transition"
                  >
                    Quote
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/85 hover:bg-white/10 transition"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* links */}
              <div className="relative px-6 py-4">
                <nav className="grid">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-white/10 last:border-b-0"
                    >
                      <span className="text-white/90 font-extrabold uppercase tracking-[0.14em] text-base">
                        {l.label}
                      </span>
                      <span className="text-white/40 group-hover:text-[var(--brand-orange)] transition">
                        →
                      </span>
                    </a>
                  ))}
                </nav>

                {/* quick contact row */}
                <div className="mt-5 grid gap-3">
                  <a
                    href="tel:3053315759"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85 font-semibold hover:bg-white/10 transition"
                  >
                    <span className="text-white/60">Call</span>
                    <span>(305) 331-5759</span>
                  </a>

                  <a
                    href="mailto:aimconstructionmgt@gmail.com?subject=Website%20Inquiry"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85 font-semibold hover:bg-white/10 transition"
                  >
                    <span className="text-white/60">Email</span>
                    <span className="truncate max-w-[220px] text-right">
                      aimconstructionmgt@gmail.com
                    </span>
                  </a>
                </div>
              </div>

            
            </div>

            {/* bottom safe-area spacing */}
            <div className="h-[max(env(safe-area-inset-bottom),14px)]" />
          </div>
        </div>
      </div>
    </>
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
    <div className="fixed inset-x-0 top-0 z-50">
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
                <img
                  src="/img/logo.png"
                  alt="Aim Construction"
                  className="h-11 w-auto"
                />
                <span className="hidden md:inline font-semibold tracking-wide text-white/90">
                  Aim Construction
                </span>
              </a>

              <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-semibold text-white/85">
                <a className="hover:text-[var(--brand-orange)]" href="/about.html">Who We Are</a>
                <a className="hover:text-[var(--brand-orange)]" href="/services.html">Services</a>
                <a className="hover:text-[var(--brand-orange)]" href="/projects.html">Projects</a>
                <a className="hover:text-[var(--brand-orange)]" href="/contact.html">Contact</a>
              </div>

              <a
                href="/contact.html"
                className="hidden md:inline-flex rounded-full bg-[var(--brand-orange)] px-5 py-2.5 font-bold uppercase tracking-wider text-xs text-white hover:opacity-90 transition"
              >
                Request a Quote
              </a>

              <a
                href="/contact.html"
                className="md:hidden inline-flex rounded-full bg-[var(--brand-orange)] px-4 py-2 font-bold uppercase tracking-wider text-xs text-white"
              >
                Quote
              </a>

              <MobileMenu />
            </div>
          </div>
        </div>
      </Container>
    </div>
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
    <header ref={heroRef} className="relative min-h-[100svh] bg-black overflow-hidden">
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

        {/* Orange bloom (Integrated-style) */}
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />

        {/* Secondary soft highlight */}
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_85%_25%,rgba(255,255,255,0.10),transparent_60%)]" />

        {/* Vignette (critical for “depth”) */}
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.88)_100%)]" />

        {/* Subtle grain (use CSS noise below) */}
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
      </motion.div>

      <Nav />

      {/* Content */}
      <div className="relative z-10 pt-32 md:pt-40">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-[0.28em] font-bold text-white/80"
              >
                Underground Utility • Directional Boring • Restoration
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-6 text-[clamp(2.8rem,5vw,4.4rem)] leading-[0.94] font-extrabold tracking-tight"
              >
                Plan. Build.{" "}
                <span className="text-[var(--brand-orange)]">Deliver.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 max-w-[58ch] text-white/75 font-medium"
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
                  className="rounded-full border border-white/25 bg-white/0 px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>

            {/* Right card (more “Integrated” depth) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="relative rounded-[28px] border border-white/15 bg-white/6 backdrop-blur-xl p-6 md:p-7 text-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] overflow-hidden"
            >
              {/* glass edge highlight */}
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_400px_at_20%_10%,rgba(255,255,255,0.10),transparent_60%)]" />
              <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-[28px]" />

              <div className="relative">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/70">
                  Fastest response
                </div>

                <div className="mt-4 grid gap-3 text-sm font-semibold">
                  <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-black/30 transition" href="tel:3053315759">
                    <span className="text-white/70">Call</span>
                    <span>(305) 331-5759</span>
                  </a>
                  <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-black/30 transition" href="mailto:aimconstructionmgt@gmail.com?subject=Website%20Inquiry">
                    <span className="text-white/70">Email</span>
                    <span className="truncate max-w-[240px] text-right">aimconstructionmgt@gmail.com</span>
                  </a>
                  <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-black/30 transition" href="/contact.html">
                    <span className="text-white/70">Quotes</span>
                    <span>Request a Quote →</span>
                  </a>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-2xl font-extrabold text-white">24+</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-white/65 font-bold">
                      Years
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-2xl font-extrabold text-white">2”–24”</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-white/65 font-bold">
                      Boring
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-7 left-0 right-0 z-10">
        <Container>
          <a
            href="#next"
            className="inline-flex items-center gap-2 text-white/75 hover:text-white transition font-semibold"
          >
            <span className="h-10 w-10 rounded-full border border-white/20 bg-white/5 backdrop-blur grid place-items-center">
              ↓
            </span>
            <span className="uppercase tracking-[0.22em] text-xs font-bold">Scroll</span>
          </a>
        </Container>
      </div>
    </header>
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

function HomeContent() {
  return (
    <main className="bg-[#050505]">
      <div className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(1200px_700px_at_50%_0%,rgba(233,151,19,0.12),transparent_65%)]" />
      <Hero />
      <StatRow />

      <FloatSection tone="light">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/60">
              Who We Are
            </div>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold leading-[1.02] text-brand-ink">
              Committed to <span className="text-[var(--brand-orange)]">Excellence</span>
            </h2>
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
                <div key={t} className="rounded-2xl border border-black/5 bg-black/[0.02] px-4 py-3 font-bold text-brand-ink">
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

          <div className="rounded-[22px] overflow-hidden border border-black/5 shadow-soft">
            <img src="/assets/img/about-image.webp" alt="Construction planning" className="h-full w-full object-cover" />
          </div>
        </div>
      </FloatSection>

      <FloatSection tone="light">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/60">
            Professional Services
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-brand-ink">
            Built for speed, precision, and <span className="text-[var(--brand-orange)]">safety</span>
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              img: "/assets/img/service-planning.webp",
              title: "Underground Utility",
              desc: "Ductbank, trenching, encasement, water/sewer install, cable pulls, and open cut scope.",
            },
            {
              img: "/assets/img/service-maintenance.webp",
              title: "Directional Boring",
              desc: "2”–24” bores with a fleet designed for complex runs and demanding field conditions.",
            },
            {
              img: "/assets/img/service-general.webp",
              title: "Restoration",
              desc: "Concrete and asphalt restoration, bridge attachments, finish work built to spec.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-[22px] overflow-hidden border border-black/5 shadow-soft bg-white">
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
          <a href="/services.html" className="rounded-full border border-black/10 bg-white px-6 py-3 font-bold uppercase tracking-wider text-sm text-brand-ink hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition">
            Browse Services
          </a>
          <a href="/contact.html" className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition">
            Request a Quote
          </a>
        </div>
      </FloatSection>

      <FloatSection tone="dark">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
            How We Work
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-white">
            Simple process. Serious execution.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { n: "01", t: "Scope Review", d: "We review plans, photos, constraints, and schedule needs—fast and clear." },
            { n: "02", t: "Plan + Mobilize", d: "Right equipment, right crew, right safety approach—no surprises." },
            { n: "03", t: "Build + Restore", d: "Execute the scope, then restore concrete/asphalt to spec and expectations." },
            { n: "04", t: "Closeout", d: "Clean finish, documented progress, and responsive communication." },
          ].map((p) => (
            <div key={p.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-[var(--brand-orange)] font-extrabold text-xl">{p.n}</div>
              <div className="mt-3 font-extrabold text-white text-lg">{p.t}</div>
              <p className="mt-2 text-white/70 font-semibold">{p.d}</p>
            </div>
          ))}
        </div>
      </FloatSection>

      <FloatSection tone="light">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/60">
            Recent Work
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-brand-ink">
            Featured projects
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { img: "/assets/img/virginia-key-phase3.webp", tag: "Infrastructure", title: "WWTP Virginia Key – Phase 3", loc: "Virginia Key, FL", href: "/project.html?id=virginia-key-phase3" },
            { img: "/assets/img/miami-beach-ductbank.webp", tag: "Infrastructure", title: "Miami Beach Ductbank", loc: "Miami Beach, FL", href: "/project.html?id=miami-beach-ductbank" },
            { img: "/assets/img/port-of-miami.webp", tag: "Infrastructure", title: "Port of Miami Ductbank", loc: "Miami, FL", href: "/project.html?id=port-of-miami" },
          ].map((x) => (
            <a key={x.title} href={x.href} className="group rounded-[22px] overflow-hidden border border-black/5 shadow-soft bg-white block">
              <div className="h-56 overflow-hidden">
                <img src={x.img} alt={x.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-500" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/50">{x.tag}</div>
                <div className="mt-2 text-2xl font-extrabold text-brand-ink">{x.title}</div>
                <div className="mt-1 text-black/65 font-semibold">{x.loc}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/projects.html" className="inline-flex rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition">
            View Full Portfolio
          </a>
        </div>
      </FloatSection>

      {/* Footer */}
      <footer className="py-12">
        <Container>
          <div className="rounded-[24px] border border-white/10 bg-brand-dark text-white shadow-soft overflow-hidden">
            <div className="p-8 md:p-10 grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <img src="/public/img/logo.png" alt="Aim Construction" className="h-12 w-auto" />
                <p className="mt-4 text-white/70 font-semibold max-w-[60ch]">
                  Safety-first operations and dependable delivery for underground utility, directional boring, and restoration work.
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/70">Company</div>
                <div className="mt-3 grid gap-2 font-semibold text-white/80">
                  <a className="hover:text-[var(--brand-orange)]" href="/about.html">Who We Are</a>
                  <a className="hover:text-[var(--brand-orange)]" href="/services.html">Services</a>
                  <a className="hover:text-[var(--brand-orange)]" href="/projects.html">Projects</a>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/70">Contact</div>
                <div className="mt-3 grid gap-2 font-semibold text-white/80">
                  <a className="hover:text-[var(--brand-orange)]" href="tel:3053315759">(305) 331-5759</a>
                  <a className="hover:text-[var(--brand-orange)]" href="mailto:aimconstructionmgt@gmail.com">aimconstructionmgt@gmail.com</a>
                  <a className="hover:text-[var(--brand-orange)]" href="/contact.html">Request a Quote</a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 px-8 py-5 md:px-10 flex flex-wrap items-center justify-between gap-3 text-white/60 font-semibold">
              <div>© {new Date().getFullYear()} Aim Construction Management</div>
              <div className="flex gap-4">
                <a className="hover:text-white" href="/privacy.html">Privacy</a>
                <a className="hover:text-white" href="/contact.html">Contact</a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}

export default function Home() {
  return <HomeContent />;
}
