// src/pages/Services.jsx
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MobileMenu, Nav, Footer, Container, HeroBlend } from "../components/SiteChrome";

/* ---------------------------------------------
   Small primitives (match Home/About/Projects vibe)
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

function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
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
   Helpers
---------------------------------------------- */

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------------------------------------------
   Main Page
---------------------------------------------- */

export default function Services() {
  useEffect(() => {
    document.title = "Services | AIM Construction Management";
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
      <header className="relative min-h-[72svh] md:min-h-[72vh] bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/img/projects-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />

        <div className="relative z-10 pt-44 pb-16 md:pt-52">
          <Container>
            <div className="max-w-[920px] mx-auto text-center">
              <FadeIn delay={0.05}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                  Capabilities
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5">
                <h1 className="text-[clamp(2.2rem,5.2vw,4.2rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  Underground Utility{" "}
                  <span className="text-[var(--brand-orange)]">&amp; Restoration</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4">
                <p className="text-white/72 font-semibold leading-relaxed">
                  Directional drilling • Duct bank • Concrete • Asphalt
                </p>
              </FadeIn>

              <FadeIn delay={0.24} className="mt-8 flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => scrollToId("utility")}
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Explore Services
                </button>
                <a
                  href="tel:3053315759"
                  className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Call Now
                </a>
              </FadeIn>
            </div>
          </Container>
        </div>
        <HeroBlend height={100} />
      </header>

      {/* CONTENT */}
      <section className="pt-6">
        {/* Quick jump links */}
        <FloatSection tone="light">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: "utility", label: "Underground Utility" },
              { id: "drilling", label: "Directional Drilling" },
              { id: "restoration", label: "Restoration" },
              { id: "equipment", label: "Equipment" },
            ].map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => scrollToId(x.id)}
                className="rounded-full border border-black/15 bg-white px-5 py-2.5 font-extrabold uppercase tracking-wider text-xs text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
              >
                {x.label}
              </button>
            ))}
          </div>
        </FloatSection>

        {/* Split grid: LEFT services, RIGHT equipment */}
        <div className="pb-6">
          <Container>
            <div className="grid gap-6 md:grid-cols-12">
              {/* LEFT */}
              <div className="md:col-span-7" id="utility">
                <div className="rounded-[26px] border border-black/10 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.14)] overflow-hidden">
                  <div className="p-6 md:p-10">
                    <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                      Services
                    </div>

                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[var(--ink)] leading-tight">
                      Underground Utility{" "}
                      <span className="text-[var(--brand-orange)]">and Restoration</span>
                    </h2>

                    <p className="mt-4 text-black/70 font-semibold leading-relaxed">
                      Field-proven crews delivering fast, safe, and dependable
                      infrastructure work across Florida and beyond.
                    </p>

                    {/* Directional Drilling */}
                    <div className="mt-8" id="boring">
                      <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                        Directional Drilling
                      </div>
                      <ul className="mt-3 grid gap-3">
                        {[
                          `Bore from 2” to 24”`,
                          `Completed projects in Virginia, North Carolina, South Carolina, and Georgia`,
                          `Numerous jobs across Florida — from Orlando to the Florida Keys`,
                        ].map((t) => (
                          <li
                            key={t}
                            className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 px-4 py-3 font-bold text-[var(--ink)]"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Underground Utility */}
                    <div className="mt-8">
                      <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                        Underground Utility
                      </div>
                      <ul className="mt-3 grid gap-3">
                        {[
                          "Ductbank work",
                          "Open cut trench",
                          "Install water or sewer line",
                          "Pull any cable",
                        ].map((t) => (
                          <li
                            key={t}
                            className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 px-4 py-3 font-bold text-[var(--ink)]"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Restoration */}
                    <div className="mt-8" id="restoration">
                      <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                        Restoration
                      </div>
                      <ul className="mt-3 grid gap-3">
                        {["Concrete work", "Asphalt restoration", "Bridge attachments"].map((t) => (
                          <li
                            key={t}
                            className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 px-4 py-3 font-bold text-[var(--ink)]"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      <a
                        href="/contact.html"
                        className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                      >
                        Request a Quote
                      </a>
                      <a
                        href="/projects.html"
                        className="rounded-full border border-black/15 bg-white px-7 py-3 font-bold uppercase tracking-wider text-sm text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                      >
                        View Projects
                      </a>
                      <a
                        href="tel:3053315759"
                        className="rounded-full border border-black/15 bg-white px-7 py-3 font-bold uppercase tracking-wider text-sm text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                      >
                        Call (305) 331-5759
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="md:col-span-5" id="equipment">
                <div className="rounded-[26px] border border-black/10 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.14)] overflow-hidden">
                  <div className="p-6 md:p-10">
                    <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                      Equipment
                    </div>
                    <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-[var(--ink)]">
                      Fleet &amp; Capabilities
                    </h3>
                    <p className="mt-3 text-black/70 font-semibold leading-relaxed">
                      The right machines, support trucks, and tooling to keep production moving.
                    </p>

                    <ul className="mt-6 grid gap-3">
                      {[
                        "23x30 Vermeer directional bore machine",
                        "24x40 Vermeer directional bore machine",
                        "80x100 Vermeer directional bore machine",
                        "250x300 Vermeer directional bore machine",
                        "Vacuum truck",
                        "Trailers",
                        "Reclaimers",
                        "Excavators",
                        "Loaders",
                        "Dump trucks",
                        "Mixing unit",
                      ].map((t) => (
                        <li
                          key={t}
                          className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 px-4 py-3 font-bold text-[var(--ink)]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 grid gap-3">
                      <a
                        className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition text-center"
                        href="mailto:aimconstructionmgt@gmail.com?subject=Request%20a%20Quote"
                      >
                        Email for Quote
                      </a>
                      <a
                        className="rounded-full border border-black/15 bg-white px-7 py-3 font-bold uppercase tracking-wider text-sm text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition text-center"
                        href="tel:3053315759"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* CTA band */}
        <FloatSection tone="dark">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                Ready to move?
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Need underground utility or restoration handled right?
              </h2>
              <p className="mt-2 text-white/75 font-semibold">
                Send scope + photos and we’ll review quickly.
              </p>
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
                View Projects
              </a>
            </div>
          </div>
        </FloatSection>
      </section>
    </PageShell>
  );
}
