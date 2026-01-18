// src/pages/Contact.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MobileMenu,
  Nav,
  Footer,
  Container,
  HeroBlend,
} from "../components/SiteChrome";

/* ---------------------------------------------
   Small primitives (match Home/Projects vibe)
---------------------------------------------- */

function FloatSection({ children, tone = "light" }) {
  const shell =
    // ✅ force shell to never exceed viewport due to child min-width
    "w-full max-w-full min-w-0 rounded-[26px] border overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.18)]";

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
          {/* ✅ allow all descendants to shrink */}
          <div className={`min-w-0 max-w-full p-4 sm:p-6 md:p-10 ${innerOverlay}`}>
            {children}
          </div>
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
    <main className="full-viewport safe-bottom relative bg-[var(--sand)] text-[var(--ink)] overflow-x-hidden">
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

        <div className="relative z-10 overflow-hidden overflow-x-hidden rounded-b-[56px] bg-[var(--sand)] shadow-[0_70px_180px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.40),transparent_60%)]" />
          <div className="relative">{children}</div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

/* ---------------------------------------------
   Form (clean submit UX - UI only)
---------------------------------------------- */

function FormCard({ emailHref, email }) {
  const [state, setState] = useState("idle"); // idle | sending | sent

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (state === "sending" || state === "sent") return;
        setState("sending");
        setTimeout(() => setState("sent"), 700);
      }}
      className="rounded-[22px] border border-white/12 bg-white/5 backdrop-blur-xl p-5 md:p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
            Name <span className="text-white/30">*</span>
          </label>
          <input
            required
            className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
            Email <span className="text-white/30">*</span>
          </label>
          <input
            required
            type="email"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
            placeholder="you@email.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
            Phone (optional)
          </label>
          <input
            type="tel"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
            placeholder="(###) ###-####"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
            Project location (optional)
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
            placeholder="City, State"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
            Message <span className="text-white/30">*</span>
          </label>
          <textarea
            required
            rows={5}
            className="mt-2 w-full resize-none rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
            placeholder="Scope, timeline, constraints, and what you need from us…"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state !== "idle"}
          className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition disabled:opacity-60 disabled:hover:opacity-60"
        >
          {state === "idle" ? "Send Message" : state === "sending" ? "Sending…" : "Sent ✓"}
        </button>

        <span className="text-white/55 font-semibold text-sm">
          For attachments/photos, email{" "}
          <a className="underline decoration-white/30 hover:decoration-white/70" href={emailHref}>
            {email}
          </a>
          .
        </span>
      </div>

      {state === "sent" && (
        <div className="mt-4 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/75">
          Thanks — we received your message. If it’s urgent, call and we’ll help faster.
        </div>
      )}
    </form>
  );
}

/* ---------------------------------------------
   Main Page
---------------------------------------------- */

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | AIM Construction Management";
  }, []);

  const contacts = useMemo(
    () => [
      {
        role: "President",
        name: "Anthony Munoz",
        phoneLabel: "(305) 331-5759",
        phoneHref: "tel:3053315759",
        phoneDigits: "3053315759",
        imgSrc: "/img/Anthony.webp",
      },
      {
        role: "Director of Operations",
        name: "Ulises Munoz",
        phoneLabel: "(305) 970-9975",
        phoneHref: "tel:3059709975",
        phoneDigits: "3059709975",
        imgSrc: "/img/Ulises.webp",
      },
    ],
    []
  );

  const email = "aimconstructionmgt@gmail.com";
  const emailHref = `mailto:${email}?subject=Website%20Inquiry`;
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
        <a href="/" aria-label="Home" className="inline-flex items-center justify-center">
          <img src="/img/logo.png" alt="Aim Construction" className="h-16 w-auto opacity-90" />
        </a>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* HERO */}
      <header className="relative min-h-[68svh] md:min-h-[68vh] bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/img/projects-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />

        <div className="relative z-10 pt-44 pb-14 md:pt-52">
          <Container>
            <div className="max-w-[920px]">
              <FadeIn delay={0.05}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                  Fast response
                  <span className="ml-3 text-white/50 font-bold">• usually within 1 business day</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5">
                <h1 className="text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  Contact <span className="text-[var(--brand-orange)]">Us</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4">
                <p className="max-w-[70ch] text-white/72 font-semibold leading-relaxed">
                  Share your scope, timeline, and site constraints. We’ll reply quickly with next steps.
                </p>
              </FadeIn>

              <FadeIn delay={0.24} className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Send a Message
                </button>
              </FadeIn>
            </div>
          </Container>
        </div>

        <HeroBlend height={100} />
      </header>

      {/* CONTENT */}
      <section className="pt-6">
        <FloatSection tone="light">
          {/* ✅ critical: min-w-0/max-w-full on the layout root */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start min-w-0 max-w-full">
            {/* LEFT */}
            <div className="lg:col-span-7 min-w-0 max-w-full">
              <div className="flex flex-wrap items-center gap-3 min-w-0 max-w-full">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/50">
                  Direct contact
                </div>
                <div className="h-[1px] flex-1 bg-black/10 min-w-0" />
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-bold text-black/60">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]" />
                  Fast replies
                </div>
              </div>

              <h2 className="mt-4 text-[28px] md:text-[36px] font-extrabold tracking-tight text-[var(--ink)]">
                Reach the right person{" "}
                <span className="bg-[linear-gradient(90deg,var(--brand-orange),#ffcf7a)] bg-clip-text text-transparent">
                  instantly
                </span>
                .
              </h2>

              <p className="mt-2 max-w-[62ch] text-[15px] font-semibold text-black/60 leading-relaxed">
                Tap a contact card to call or text. For photos/attachments, email is best.
              </p>

              {/* EMAIL */}
              <div className="mt-6 grid gap-4 min-w-0 max-w-full">
                <a
                  href={emailHref}
                  className="group w-full max-w-full min-w-0 overflow-hidden rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_14px_50px_rgba(0,0,0,0.10)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
                >
                  {/* ✅ grid w/ minmax(0,1fr) ensures left column can shrink */}
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 min-w-0 w-full">
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                        Email
                      </div>

                      {/* ✅ strongest, clean wrap on mobile */}
                      <div className="mt-1 text-[18px] md:text-[20px] font-extrabold text-[var(--ink)] break-words [overflow-wrap:anywhere]">
                        {email}
                      </div>

                      <div className="mt-1 text-sm font-semibold text-black/55">
                        Best for scope + photos
                      </div>
                    </div>

                    <div className="shrink-0 flex-none grid place-items-center h-11 w-11 rounded-full border border-black/10 bg-[var(--sand)]/40 text-black/65 group-hover:border-[var(--brand-orange)] group-hover:text-[var(--brand-orange)] transition">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 text-[12px] font-semibold text-black/55">
                    Include location + timeline for the quickest turnaround.
                  </div>
                </a>
              </div>

              {/* PEOPLE */}
              <div className="mt-7 min-w-0 max-w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                    Who you’ll hear from
                  </div>
                  <div className="h-[1px] flex-1 bg-black/10 min-w-0" />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 min-w-0 max-w-full">
                  {contacts.map((c) => (
                    <div key={c.name} className="w-full max-w-full min-w-0">
                      {/* Use an anchor for the whole card so it behaves predictably on mobile */}
                      <a
                        href={c.phoneHref}
                        className="
                          group block w-full max-w-full min-w-0 text-left
                          rounded-[22px] border border-black/10 bg-white
                          shadow-sm hover:shadow-[0_18px_60px_rgba(0,0,0,0.12)]
                          transition hover:-translate-y-0.5
                          overflow-hidden
                        "
                      >
                        <div className="h-[6px] w-full bg-[linear-gradient(90deg,var(--brand-orange),rgba(233,151,19,0.10),transparent)]" />

                        <div className="p-5 sm:p-6 min-w-0">
                          <div className="flex items-start gap-4 min-w-0">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-black/10 bg-black/5">
                              <img
                                src={c.imgSrc}
                                alt={c.name}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                                {c.role}
                              </div>

                              <div className="mt-1 text-[18px] sm:text-[20px] font-extrabold text-[var(--ink)] leading-tight">
                                {c.name}
                              </div>

                              <div className="mt-1 text-[13px] font-semibold text-black/60">
                                Tap to call or text
                              </div>
                            </div>

                            <div className="shrink-0">
                              <div className="grid place-items-center h-11 w-11 rounded-full border border-black/10 bg-[var(--sand)]/40 text-black/60 group-hover:border-[var(--brand-orange)] group-hover:text-[var(--brand-orange)] transition">
                                →
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0">
                            <div className="text-[13px] font-semibold text-black/60">
                              <span className="text-black/75">{c.phoneLabel}</span>
                            </div>

                            {/* keep these wrapped and shrink-safe */}
                            <div className="flex flex-wrap items-center gap-2 min-w-0">
                              <span
                                onClick={(e) => e.preventDefault()}
                                className="sr-only"
                              />
                              <a
                                href={c.phoneHref}
                                onClick={(e) => e.stopPropagation()}
                                className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-black/60 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                              >
                                Call
                              </a>
                              <a
                                href={`sms:${c.phoneDigits}`}
                                onClick={(e) => e.stopPropagation()}
                                className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-black/60 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                              >
                                Text
                              </a>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5 grid gap-4 min-w-0 max-w-full">
              <div className="relative w-full max-w-full overflow-hidden rounded-[24px] border border-black/10 bg-white/80 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.12)] backdrop-blur-md">
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-35 [background:radial-gradient(circle,rgba(233,151,19,0.22),transparent_60%)]" />

                <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/50">
                  Office
                </div>
                <div className="mt-2 text-2xl font-extrabold text-[var(--ink)]">
                  Miami Lakes, FL
                </div>

                <div className="mt-4 rounded-[18px] border border-black/10 bg-white px-4 py-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                    Address
                  </div>
                  <div className="mt-2 font-extrabold text-[var(--ink)] leading-relaxed">
                    {officeLines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-[13px] font-semibold text-black/60">
                  For attachments/photos, email is usually fastest.
                </div>

                <div className="mt-5 h-[2px] w-full rounded-full bg-[linear-gradient(90deg,var(--brand-orange),transparent)]" />
              </div>

              <div className="w-full max-w-full rounded-[24px] border border-black/10 bg-[var(--ink)] text-white p-6 shadow-[0_18px_70px_rgba(0,0,0,0.12)]">
                <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60">
                  Helpful details
                </div>
                <div className="mt-2 text-white font-extrabold text-[18px] leading-tight">
                  Faster quotes
                </div>
                <div className="mt-2 text-sm font-semibold text-white/70">
                  Add location, timeline, scope summary, and any constraints.
                </div>
                <div className="mt-4 h-[2px] w-full rounded-full bg-[linear-gradient(90deg,var(--brand-orange),transparent)]" />
              </div>
            </div>
          </div>
        </FloatSection>

        {/* Form section */}
        <div id="contact-form">
          <FloatSection tone="dark">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start min-w-0 max-w-full">
              <div className="lg:col-span-5 min-w-0">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                  Message
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Send us the details.
                </h2>
                <p className="mt-3 text-white/75 font-semibold leading-relaxed">
                  Share the essentials and we’ll follow up with next steps. If you need to attach photos,
                  email them to{" "}
                  <a className="underline decoration-white/30 hover:decoration-white/70" href={emailHref}>
                    {email}
                  </a>
                  .
                </p>

                <div className="mt-6 text-sm font-semibold text-white/60">
                  Prefer a call? Tap a contact card above.
                </div>
              </div>

              <div className="lg:col-span-7 min-w-0">
                <FormCard emailHref={emailHref} email={email} />
              </div>
            </div>
          </FloatSection>
        </div>
      </section>
    </PageShell>
  );
}
