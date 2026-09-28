import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MobileMenu, Nav, Footer, Container, HeroBlend } from "../components/SiteChrome";
import { useHead } from "@unhead/react";


/** Floating rounded section wrapper */
function FloatSection({ children, tone = "light" }) {
  const shell =
    "rounded-[26px] border overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.18)]";

  const toneCls =
    tone === "dark"
      ? "bg-[var(--ink)] text-white border-white/12"
      : "bg-white text-[var(--ink)] border-black/10";

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

function RevealLines({ lines = [], as: Tag = "h2", className = "", delay = 0 }) {
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
  const [ready, setReady] = React.useState(false);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <header
      ref={heroRef}
      className="relative min-h-[100svh] bg-[var(--black)] overflow-hidden"
    >
      {/* Background video layer */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {/* Poster layer (shows instantly) */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
          style={{
            backgroundImage: "url('/img/hero-poster.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <video
          className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img/hero-poster.webp"
          onCanPlay={() => setReady(true)}
        >
          <source src="/video/hero-vid.webm" type="video/webm" />
          <source src="/video/hero-vid.web.mp4" type="video/mp4" />
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

      {/* ✅ Mobile top-centered logo */}
      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <a href="/" aria-label="Home" className="inline-flex items-center justify-center">
          <img
            src="/img/logo.png"
            alt="Aim Construction"
            className="h-16 w-auto opacity-90"
          />
        </a>
      </div>

      {/* ✅ Mobile pull-down menu (SiteChrome Option A: hide only at bottom) */}
      <div className="md:hidden">
        <MobileMenu />
      </div>

      <div className="relative z-10 min-h-[100svh]">
        <Container>
          {/* MOBILE */}
          <div className="md:hidden flex min-h-[100svh] flex-col pt-44 pb-24 text-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-4 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75"
              >
                Underground Utility • Directional Drilling • Restoration
              </motion.div>
            </div>

            <div className="flex-1" />

            <div>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mx-auto max-w-[48ch] text-white/72 font-medium text-[15px] leading-relaxed"
              >
                Safety-first crews delivering fast, dependable underground utility,
                directional drilling, and restoration work across Florida and beyond.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-6 flex flex-wrap justify-center gap-3"
              >
                <a
                  href="/projects"
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  See Our Work
                </a>
                <a
                  href="/contact"
                  className="rounded-full border border-white/20 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block pt-40">
            <div className="max-w-[720px] text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mt-2 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] font-extrabold text-white/75"
              >
                Underground Utility • Directional Drilling • Restoration
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-5 text-[clamp(2.6rem,5.2vw,4.5rem)] leading-[0.95] font-extrabold tracking-tight text-white"
              >
                Plan. Build. <span className="text-[var(--brand-orange)]">Deliver.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 max-w-[60ch] text-white/72 font-medium text-base leading-relaxed"
              >
                Safety-first crews delivering fast, dependable underground utility,
                directional drilling, and restoration work across Florida and beyond.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a
                  href="/projects"
                  className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  See Our Work
                </a>
                <a
                  href="/contact"
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
    {
      left: "Email",
      right: "aimconstructionmgt@gmail.com",
      href: "mailto:aimconstructionmgt@gmail.com?subject=Website%20Inquiry",
    },
    { left: "Quote", right: "Request a Quote →", href: "/contact" },
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

function TwoSides() {
  const sides = [
    {
      tag: "Commercial & Utility",
      title: "Underground utility, drilling & restoration",
      desc: "Ductbank, water and sewer, directional drilling (2”–24”), and concrete/asphalt restoration for GCs, utilities and agencies.",
      big: "Commercial",
      href: "/services",
      cta: "View Commercial",
    },
    {
      tag: "Residential",
      title: "Remodeling, roofing & home services",
      desc: "Kitchens, bathrooms, flooring, painting, roofing and full remodels, permitted and managed start to finish.",
      big: "Residential",
      href: "/residential",
      cta: "View Residential",
    },
  ];

  return (
    <FloatSection tone="light">
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/60">
          What are you building?
        </div>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-brand-ink leading-tight">
          Two sides, <span className="text-[var(--brand-orange)]">one standard</span>
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {sides.map((x) => (
          <a
            key={x.href}
            href={x.href}
            className="group block rounded-[22px] overflow-hidden border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.16)]"
          >
            <div className="relative h-36 md:h-44 overflow-hidden bg-[var(--ink)]">
              <div className="absolute inset-0 [background:radial-gradient(600px_260px_at_15%_20%,rgba(233,151,19,0.35),transparent_60%)] group-hover:scale-[1.05] transition duration-500" />
              <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
              <div className="absolute left-6 bottom-4 text-[clamp(2.2rem,6vw,3.4rem)] font-extrabold tracking-tight text-white/90 leading-none">
                {x.big}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-extrabold text-brand-ink">{x.title}</h3>
              <p className="mt-2 text-black/65 font-semibold">{x.desc}</p>
              <div className="mt-5 inline-flex rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white group-hover:opacity-90 transition">
                {x.cta} →
              </div>
            </div>
          </a>
        ))}
      </div>
    </FloatSection>
  );
}

function StatRow() {
  const stats = useMemo(
    () => [
      { top: "24+", bottom: "Years Experience" },
      { top: "2”–24”", bottom: "Directional Drilling" },
      { top: "FL + SE", bottom: "Regional Coverage" },
      { top: "Safety", bottom: "First Operations" },
    ],
    []
  );

  return (
    <FloatSection tone="dark">
      <div id="stats" className="grid gap-4 md:grid-cols-4">
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
    <main className="full-viewport safe-bottom relative bg-[var(--sand)] text-[var(--ink)]">
      {/* sand background */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[var(--sand)]" />

      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 [background:linear-gradient(180deg,var(--sand)_0%,var(--sand-2)_70%,var(--sand)_100%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(0,0,0,0.16)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-0 noise opacity-[0.06] mix-blend-multiply" />
      </div>

      <div className="relative">
        {/* footer black zone */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] -z-10 hidden md:block">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 opacity-[0.55] [background:radial-gradient(1100px_520px_at_20%_20%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(900px_420px_at_80%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_20%_30%,rgba(233,151,19,0.26),transparent_62%)]" />
          <div className="absolute left-0 right-0 top-[150px] h-[88px] opacity-[0.18] [background:repeating-linear-gradient(135deg,rgba(233,151,19,1)_0px,rgba(233,151,19,1)_14px,rgba(0,0,0,1)_14px,rgba(0,0,0,1)_28px)]" />
          <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
        </div>

        {/* page shell */}
        <div className="relative z-10 overflow-hidden rounded-b-[56px] bg-[var(--sand)] shadow-[0_70px_180px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.40),transparent_60%)]" />

          <div className="relative">
            <Hero />
            <QuickActions />
            <TwoSides />
            <StatRow />

            {/* WHO WE ARE */}
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
                      "Directional drilling (2”–24”)",
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
                      href="/about"
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

            {/* SERVICES */}
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
                    desc: "Ductbank, trenching, water/sewer install, cable pulls, and open cut scope.",
                  },
                  {
                    img: "/img/service-maintenance.webp",
                    title: "Directional Drilling",
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
                  href="/services"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 font-bold uppercase tracking-wider text-sm text-brand-ink hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                >
                  Browse Services
                </a>
                <a
                  href="/contact"
                  className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Request a Quote
                </a>
              </div>
            </FloatSection>

            {/* HOW WE WORK */}
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
                  <div key={p.n} className="rounded-2xl border border-white/14 bg-white/8 p-6">
                    <div className="text-[var(--brand-orange)] font-extrabold text-xl">{p.n}</div>
                    <div className="mt-3 font-extrabold text-white text-lg">{p.t}</div>
                    <p className="mt-2 text-white/75 font-semibold">{p.d}</p>
                  </div>
                ))}
              </div>
            </FloatSection>

            {/* RECENT WORK */}
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
                  { img: "/img/virginia-key-phase3.webp", tag: "Infrastructure", title: "WWTP Virginia Key – Phase 3", loc: "Virginia Key, FL", href: "/project?id=virginia-key-phase3" },
                  { img: "/img/miami-beach-ductbank.webp", tag: "Infrastructure", title: "Miami Beach Ductbank", loc: "Miami Beach, FL", href: "/project?id=miami-beach-ductbank" },
                  { img: "/img/port-of-miami.webp", tag: "Infrastructure", title: "Port of Miami Ductbank", loc: "Miami, FL", href: "/project?id=port-of-miami" },
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
                  href="/projects"
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
  useHead({
    title: "AIM Construction Management | Home",
    meta: [
      {
        name: "description",
        content:
          "AIM Construction Management delivers safety-first underground utility, directional drilling (2”–24”), and concrete/asphalt restoration across Florida and beyond.",
      },

      // Open Graph
      { property: "og:title", content: "AIM Construction Management" },
      {
        property: "og:description",
        content:
          "Safety-first crews delivering underground utility, directional drilling, and restoration—fast, dependable execution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://aimconstructionmgt.com/" },
      { property: "og:image", content: "https://aimconstructionmgt.com/img/hero-poster.webp" },
    ],
    link: [{ rel: "canonical", href: "https://aimconstructionmgt.com/" }],
  });

  return <HomeContent />;
}

