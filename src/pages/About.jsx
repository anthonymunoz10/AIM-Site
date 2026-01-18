// src/pages/About.jsx
import React, { useEffect, useMemo, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MobileMenu, Nav, Footer, Container, HeroBlend } from "../components/SiteChrome";

/* ---------------------------------------------
   Shared primitives (matches Home/Projects)
---------------------------------------------- */

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

function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------
   Page shell (same sand + curved shell)
---------------------------------------------- */

function PageShell({ children }) {
  return (
    <main className="full-viewport safe-bottom relative bg-[var(--sand)] text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[var(--sand)]" />

      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 [background:linear-gradient(180deg,var(--sand)_0%,var(--sand-2)_70%,var(--sand)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]
          [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
          [background-size:48px_48px]"
        />
        <div className="absolute inset-0 noise opacity-[0.06] mix-blend-multiply" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] -z-10 hidden md:block">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 opacity-[0.55] [background:radial-gradient(1100px_520px_at_20%_20%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(900px_420px_at_80%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_20%_30%,rgba(233,151,19,0.22),transparent_62%)]" />
          <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
        </div>

        <div className="relative z-10 overflow-hidden rounded-b-[56px] bg-[var(--sand)] shadow-[0_70px_180px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.40),transparent_60%)]" />
          <div className="relative">{children}</div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

/* ---------------------------------------------
   HERO (black like other pages)
---------------------------------------------- */

function AboutHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <header
      ref={heroRef}
      className="relative min-h-[72svh] md:min-h-[72vh] bg-black overflow-hidden"
    >
      {/* Background image (subtle) */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/img/about-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* orange bloom */}
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />
        {/* vignette */}
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.64)_70%,rgba(0,0,0,0.90)_100%)]" />
        {/* grain */}
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 pt-44 pb-16 md:pt-52">
        <Container>
          <div className="max-w-[860px]">
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                Who We Are
              </div>
            </FadeIn>

            <FadeIn delay={0.12} className="mt-5">
              <h1 className="text-[clamp(2.2rem,5.0vw,4.1rem)] leading-[0.98] font-extrabold tracking-tight text-white">
                Built on experience.{" "}
                <span className="text-[var(--brand-orange)]">Focused on delivery.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18} className="mt-4">
              <p className="max-w-[72ch] text-white/72 font-semibold leading-relaxed">
                AIM Construction Management is a licensed General Contractor and licensed Underground Utility Contractor founded on decades of underground utility
                and electrical experience—executing fiber, electrical, water & sewer, and ductbank infrastructure with
                safety-first operations and clean restoration.
              </p>
            </FadeIn>

            <FadeIn delay={0.24} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#background"
                className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
              >
                Our Background
              </a>
              <a
                href="/projects.html"
                className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
              >
                See Work
              </a>
            </FadeIn>
          </div>
        </Container>
      </div>
    </header>
  );
}

/* ---------------------------------------------
   MOBILE-SAFE collage + bento
   (fixes horizontal overflow)
---------------------------------------------- */

function IntroImageCollage() {
  const left1 = useRef(null);
  const left2 = useRef(null);

  const { scrollYProgress: p1 } = useScroll({
    target: left1,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: p2 } = useScroll({
    target: left2,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(p1, [0, 1], ["6%", "-6%"]);
  const y2 = useTransform(p2, [0, 1], ["-6%", "6%"]);

  return (
    <section className="pb-8 pt-6">
      <Container>
        {/* ✅ MOBILE ONLY: move the headline ABOVE images + show only top-view-site.webp */}
        <div className="md:hidden">
          <div className="mx-auto max-w-[860px] text-center">
            <FadeIn>
              <RevealLines
                as="h2"
                className="text-[clamp(1.85rem,6.2vw,2.4rem)] leading-[1.05] font-extrabold text-white"
                lines={[
                  "Built for fast, safe execution—",
                  <span className="text-[var(--brand-orange)]" key="o">
                    without cutting corners.
                  </span>,
                ]}
              />
            </FadeIn>

            <FadeIn delay={0.12} className="mt-4">
              <p className="mx-auto max-w-[66ch] text-white/65 font-semibold">
                In a fast-moving world, work has to be done quickly and efficiently—without sacrificing safety or
                finish. We’re based in South Florida and travel where the work demands.
              </p>
            </FadeIn>
          </div>

          <div className="mt-6 rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
            <img
              src="/img/top-view-site.webp"
              alt="Construction planning"
              className="h-[280px] w-full object-cover"
            />
          </div>
        </div>

        {/* ✅ DESKTOP/TABLET (md+): keep your current 3-image collage layout */}
        <div className="hidden md:block">
          <div className="grid gap-5 md:grid-cols-12 md:items-stretch">
            <div className="md:col-span-5 grid gap-5">
              <motion.div
                ref={left1}
                style={{ y: y1 }}
                className="rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.14)]"
              >
                <img
                  src="/img/Hero_Comp1.webp"
                  alt="Field work"
                  className="h-[200px] sm:h-[220px] md:h-[260px] w-full object-cover"
                />
              </motion.div>

              <motion.div
                ref={left2}
                style={{ y: y2 }}
                className="rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.14)]"
              >
                <img
                  src="/img/hero-bg.avif"
                  alt="Restoration"
                  className="h-[200px] sm:h-[220px] md:h-[260px] w-full object-cover"
                />
              </motion.div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.16)] h-full">
                <img
                  src="/img/top-view-site.webp"
                  alt="Construction planning"
                  className="h-[280px] sm:h-[360px] md:h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


function BentoRail() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white w-full max-w-full">
      <div className="h-40 overflow-hidden">
        <img src="/img/bw-exca.webp" alt="AIM" className="h-full w-full object-cover" />
      </div>

      <div className="border-t border-black/10 bg-[var(--ink)] py-3 overflow-hidden">
        <div className="relative overflow-hidden">
          {/* NOTE: avoid whitespace-nowrap overflow issues by clipping + giving padding */}
          <div className="animate-[marquee_16s_linear_infinite] whitespace-nowrap text-white/85 font-extrabold uppercase tracking-[0.22em] text-[11px] px-2">
            <span className="mx-6 inline-block">
              Safety First • Speed + Precision • Clean Restoration • Communication
            </span>
            <span className="mx-6 inline-block">
              Safety First • Speed + Precision • Clean Restoration • Communication
            </span>
            <span className="mx-6 inline-block">
              Safety First • Speed + Precision • Clean Restoration • Communication
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

function BentoBlock() {
  const stats = [
    { big: "24+", small: "Years Experience" },
    { big: '2”–24”', small: "Directional Drilling" },
    { big: "FL + SE", small: "Regional Coverage" },
    { big: "Safety", small: "First Operations" },
  ];

  return (
    <section id="background" className="pt-6">
      <Container>
        <div className="mx-auto max-w-[860px] text-center hidden md:block">
          <FadeIn>
            <RevealLines
              as="h2"
              className="text-[clamp(1.85rem,4vw,3.0rem)] leading-[1.05] font-extrabold text-white"
              lines={[
                "Built for fast, safe execution—",
                <span className="text-[var(--brand-orange)]" key="o">
                  without cutting corners.
                </span>,
              ]}
            />
          </FadeIn>

          <FadeIn delay={0.12} className="mt-4">
            <p className="mx-auto max-w-[66ch] text-white/65 font-semibold">
              In a fast-moving world, work has to be done quickly and efficiently—without sacrificing safety or finish.
              We’re based in South Florida and travel where the work demands.
            </p>
          </FadeIn>
        </div>

        {/* IMPORTANT: prevent any accidental horizontal overflow */}
        <div className="mt-10 grid gap-5 md:grid-cols-12 overflow-x-hidden">
          {/* Card: built on */}
          <div className="md:col-span-5 rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.12)] overflow-hidden w-full min-w-0">
            <div className="p-6 md:p-7">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/55">
                What we’re built on
              </div>
              <p className="mt-3 text-xl md:text-2xl font-extrabold text-[var(--ink)] leading-tight">
                “Scope clarity, safety-first operations, and clean restoration to spec.”
              </p>
              <div className="mt-6 h-1 w-20 rounded-full bg-[var(--brand-orange)]" />
              <div className="mt-4 text-sm font-semibold text-black/60">AIM Construction Management</div>

              <div className="mt-6 grid gap-3">
                {[
                  "Proactive communication + scheduling discipline",
                  "Field-proven equipment and crews",
                  "Closeout documentation and clean finishes",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 px-4 py-3 font-bold text-[var(--ink)] w-full min-w-0 break-words"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="md:col-span-7 rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.14)] bg-white w-full min-w-0">
            <div className="h-[260px] sm:h-[320px] md:h-full overflow-hidden">
              <img
                src="/img/3d-view-camera-shutter.webp"
                alt="AIM work"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Rail */}
          <div className="md:col-span-7 w-full min-w-0">
            <BentoRail />
          </div>

          {/* Quick facts */}
          <div className="md:col-span-5 rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.12)] bg-[var(--ink)] text-white w-full min-w-0">
            <div className="p-6 md:p-7">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-white/55">
                Quick facts
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.small} className="rounded-2xl border border-white/12 bg-white/6 p-4 min-w-0">
                    <div className="text-2xl md:text-3xl font-extrabold text-white">{s.big}</div>
                    <div className="mt-1 text-xs md:text-sm font-semibold text-white/70 break-words">
                      {s.small}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-white/75 font-semibold">
                From utility install to final restoration, we keep production moving while protecting safety and finish.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ValuesAccordion() {
  const values = useMemo(
    () => [
      {
        t: "Safety First",
        d: "Planning, permits, and site discipline that protect crews, the public, and the schedule.",
      },
      {
        t: "Speed + Precision",
        d: "Field-proven production with the equipment and crew to keep work moving—without sacrificing finish.",
      },
      {
        t: "Clean Restoration",
        d: "Concrete and asphalt restoration finished to spec, expectations, and closeout requirements.",
      },
      {
        t: "Communication",
        d: "Clear updates, responsive scheduling, and documentation that makes closeout easy.",
      },
      {
        t: "Own the Outcome",
        d: "We take accountability from mobilization to closeout, solving problems before they become delays.",
      },
    ],
    []
  );

  const [openIndex, setOpenIndex] = React.useState(0); // open first by default (or null)

  return (
    <section className="pt-10">
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          <FadeIn>
            <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
              How We Work
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-3">
            <RevealLines
              as="h2"
              className="text-4xl md:text-5xl font-extrabold text-white"
              lines={["Simple process.", "Serious execution."]}
            />
          </FadeIn>
        </div>

        <div className="mt-10 mx-auto max-w-[920px]">
          <div className="rounded-[26px] overflow-hidden border border-black/10 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.14)]">
            {values.map((v, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={v.t}
                  className="border-b border-black/10 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left cursor-pointer select-none px-6 md:px-8 py-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="text-[11px] md:text-xs font-extrabold uppercase tracking-[0.22em] text-black/45 w-10 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="text-lg md:text-xl font-extrabold text-[var(--ink)] truncate">
                        {v.t}
                      </div>
                    </div>

                    <div className="h-9 w-9 shrink-0 rounded-full border border-black/10 bg-[var(--sand)] grid place-items-center">
                      <span
                        className={`text-white/70 font-extrabold leading-none transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </div>
                  </button>

                  {/* Smooth open/close */}
                  <div
                    className={`
                      grid transition-[grid-template-rows] duration-300 ease-out
                      ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                    `}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`
                          px-6 md:px-8 pb-6 -mt-1
                          transition-all duration-300 ease-out
                          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
                        `}
                      >
                        <p className="text-black/65 font-semibold leading-relaxed max-w-[70ch]">
                          {v.d}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}


function CulturePush() {
  return (
    <section className="pt-12 pb-6">
      <Container>
        <div className="grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <FadeIn>
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">Our culture</div>
            </FadeIn>

            <FadeIn delay={0.08} className="mt-3">
              <RevealLines
                as="h3"
                className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
                lines={[
                  "Professional crews,",
                  <span className="text-[var(--brand-orange)]" key="x">
                    clean outcomes.
                  </span>,
                ]}
              />
            </FadeIn>

            <FadeIn delay={0.14} className="mt-4">
              <p className="text-white/65 font-semibold leading-relaxed">
                We operate with a safety-first mindset, respect for the site and the public, and a commitment to
                restoration that looks right when we leave. The goal is simple: do it right, communicate clearly, and
                finish strong.
              </p>
            </FadeIn>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.14)] bg-white">
              <img
                src="/img/working-site.webp"
                alt="Directional drilling"
                className="h-[300px] sm:h-[340px] md:h-[440px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------
   Main About Page
---------------------------------------------- */

export default function About() {
  useEffect(() => {
    document.title = "Who We Are | AIM Construction Management";
  }, []);

  return (
    <PageShell>
      <Nav />

      {/* mobile logo + menu */}
      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <a href="/" aria-label="Home" className="inline-flex items-center justify-center">
          <img src="/img/logo.png" alt="Aim Construction" className="h-16 w-auto opacity-90" />
        </a>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* HERO */}
      <AboutHero />

      {/* Seam blend between hero and first section (doesn't shrink hero) */}
      <div className="relative -mt-[240px] h-[240px] overflow-hidden">
        <HeroBlend height={100} />
      </div>

      {/* NOTE: prevent any stray overflow on mobile */}
      <div className="relative overflow-x-hidden">
        <IntroImageCollage />
        <BentoBlock />
        <ValuesAccordion />

        <div
          className="mx-auto my-10 h-[10px] w-[92%] max-w-[1200px] rounded-full
          bg-[repeating-linear-gradient(135deg,var(--brand-orange)_0_10px,rgba(255,255,255,0.08)_10px_20px)]
          opacity-70"
        />

        <CulturePush />

        <FloatSection tone="dark">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">Ready to move?</div>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Need underground utility or restoration handled right?
              </h2>
              <p className="mt-2 text-white/75 font-semibold">Send scope + photos and we’ll review quickly.</p>
            </div>

            <div className="md:col-span-5 flex flex-wrap md:justify-end gap-3">
              <a
                className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                href="/contact.html"
              >
                Request a Quote
              </a>
              <a
                className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                href="/projects.html"
              >
                See Our Work
              </a>
            </div>
          </div>
        </FloatSection>
      </div>
    </PageShell>
  );
}
