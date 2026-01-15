// src/pages/Contact.jsx
import React, { useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MobileMenu, Nav, Footer, Container } from "../components/SiteChrome";

/* ---------------------------------------------
   Small primitives (match Home/Projects vibe)
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
   Main Page
---------------------------------------------- */

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | AIM Construction Management";
  }, []);

  // Core info from old HTML
  const contacts = useMemo(
    () => [
      {
        role: "President",
        name: "Anthony Munoz",
        phoneLabel: "(305) 331-5759",
        phoneHref: "tel:3053315759",
        primary: true,
      },
      {
        role: "Director of Operations",
        name: "Ulises Munoz",
        phoneLabel: "(305) 970-9975",
        phoneHref: "tel:3059709975",
      },
    ],
    []
  );

  const email = "aimconstructionmgt@gmail.com";
  const emailQuoteHref =
    "mailto:aimconstructionmgt@gmail.com?subject=Request%20a%20Quote";
  const emailGeneralHref =
    "mailto:aimconstructionmgt@gmail.com?subject=Website%20Inquiry";

  const officeLines = ["7900 Oak Lane, Suite 479", "Miami Lakes, FL 33016"];

  const scrollToForm = () => {
    const el = document.querySelector("#contact-form");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell>
      <Nav />

      {/* mobile logo + menu */}
      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <a
          href="/"
          aria-label="Home"
          className="inline-flex items-center justify-center"
        >
          <img
            src="/img/logo.png"
            alt="Aim Construction"
            className="h-16 w-auto opacity-90"
          />
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
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />

        <div className="relative z-10 pt-44 pb-16 md:pt-52">
          <Container>
            <div className="max-w-[920px]">
              <FadeIn delay={0.05}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                  Fast response
                  <span className="ml-3 text-white/50 font-bold">
                    • phone or email
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5">
                <h1 className="text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  Contact <span className="text-[var(--brand-orange)]">Us</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4">
                <p className="max-w-[70ch] text-white/72 font-semibold leading-relaxed">
                  Tell us what you’re building. Share scope, schedule, and site
                  constraints — we’ll respond quickly with next steps.
                </p>
              </FadeIn>

              <FadeIn delay={0.24} className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:3053315759"
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Call Now
                </a>
                <a
                  href={emailQuoteHref}
                  className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Email for Quote
                </a>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Send a Message
                </button>
              </FadeIn>
            </div>
          </Container>
        </div>
      </header>

      {/* CONTENT */}
      <section className="pt-6">
        {/* Contact + Office cards */}
        <FloatSection tone="light">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left: people + quick actions */}
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                Contact
              </div>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold text-[var(--ink)]">
                Let’s talk about your{" "}
                <span className="text-[var(--brand-orange)]">project</span>
              </div>

              <div className="mt-6 grid gap-3">
                {contacts.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-4"
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                          {c.role}
                        </div>
                        <div className="mt-1 text-xl md:text-2xl font-extrabold text-[var(--ink)]">
                          {c.name}
                        </div>
                        <a
                          href={c.phoneHref}
                          className="mt-2 inline-flex items-center gap-2 font-extrabold text-black/70 hover:text-[var(--brand-orange)] transition"
                        >
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white">
                            ☎
                          </span>
                          {c.phoneLabel}
                        </a>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={c.phoneHref}
                          className={`rounded-full px-5 py-2.5 font-extrabold uppercase tracking-wider text-xs transition ${
                            c.primary
                              ? "bg-[var(--brand-orange)] text-white hover:opacity-90"
                              : "border border-black/15 bg-white text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]"
                          }`}
                        >
                          Call
                        </a>
                        <a
                          href={emailQuoteHref}
                          className="rounded-full border border-black/15 bg-white px-5 py-2.5 font-extrabold uppercase tracking-wider text-xs text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                        >
                          Quote
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Email block */}
                <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                    Email
                  </div>
                  <a
                    href={emailGeneralHref}
                    className="mt-2 inline-flex items-center gap-2 text-lg md:text-xl font-extrabold text-[var(--ink)] hover:text-[var(--brand-orange)] transition"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white">
                      ✉
                    </span>
                    {email}
                  </a>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={emailQuoteHref}
                      className="rounded-full bg-[var(--brand-orange)] px-5 py-2.5 font-extrabold uppercase tracking-wider text-xs text-white hover:opacity-90 transition"
                    >
                      Request a Quote
                    </a>
                    <a
                      href={emailGeneralHref}
                      className="rounded-full border border-black/15 bg-white px-5 py-2.5 font-extrabold uppercase tracking-wider text-xs text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                    >
                      General Inquiry
                    </a>
                    <a
                      href="/projects.html"
                      className="rounded-full border border-black/15 bg-white px-5 py-2.5 font-extrabold uppercase tracking-wider text-xs text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                    >
                      View Work
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: office + note */}
            <div className="lg:col-span-5">
              <div className="rounded-[22px] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.10)] overflow-hidden">
                <div className="p-5 md:p-6">
                  <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                    Office
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-[var(--ink)]">
                    Miami Lakes, FL
                  </div>

                  <div className="mt-4 rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                      Address
                    </div>
                    <div className="mt-2 font-extrabold text-[var(--ink)] leading-relaxed">
                      {officeLines.map((l) => (
                        <div key={l}>{l}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-black/65 font-semibold leading-relaxed">
                    For the fastest turnaround, email scope details and photos.
                  </div>

                  <div className="mt-5 grid gap-2">
                    <a
                      href={emailQuoteHref}
                      className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-extrabold uppercase tracking-wider text-sm text-white hover:opacity-90 transition text-center"
                    >
                      Email a Quote Request
                    </a>
                    <a
                      href={emailGeneralHref}
                      className="rounded-full border border-black/15 bg-white px-6 py-3 font-extrabold uppercase tracking-wider text-sm text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition text-center"
                    >
                      General Inquiry
                    </a>
                  </div>
                </div>

                {/* subtle accent band */}
                <div className="h-2 bg-[var(--brand-orange)]" />
              </div>
            </div>
          </div>
        </FloatSection>

        {/* Modern “message” section (frontend-only) */}
        <div id="contact-form">
          <FloatSection tone="dark">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                  Quick message
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Send details — we’ll respond fast.
                </h2>
                <p className="mt-3 text-white/75 font-semibold leading-relaxed">
                  Include location, timeline, and a short scope summary. If you
                  have photos, emailing them is best.
                </p>

                <div className="mt-6 grid gap-2">
                  <a
                    href="tel:3053315759"
                    className="rounded-full border border-white/18 bg-white/0 px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition text-center"
                  >
                    Call (305) 331-5759
                  </a>
                  <a
                    href={emailQuoteHref}
                    className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition text-center"
                  >
                    Email Quote Request
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                {/* This is UI only. If you want real submissions, we'll wire it to Formspree/Netlify later */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // keep it simple for now
                    alert(
                      "Thanks! For the fastest response, email scope + photos to aimconstructionmgt@gmail.com."
                    );
                  }}
                  className="rounded-[22px] border border-white/12 bg-white/5 backdrop-blur-xl p-5 md:p-6"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
                        Name
                      </label>
                      <input
                        required
                        className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
                        Phone or Email
                      </label>
                      <input
                        required
                        className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
                        placeholder="Best way to reach you"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
                        Project location
                      </label>
                      <input
                        className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
                        placeholder="City, State"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
                        placeholder="Scope, schedule, constraints, and what you need from us…"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                    >
                      Send Message
                    </button>
                    <a
                      href="/projects.html"
                      className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                    >
                      View Projects
                    </a>
                    <span className="text-white/55 font-semibold text-sm">
                      For photos/attachments, email{" "}
                      <a
                        className="underline decoration-white/30 hover:decoration-white/70"
                        href={emailQuoteHref}
                      >
                        {email}
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </FloatSection>
        </div>
      </section>
    </PageShell>
  );
}
