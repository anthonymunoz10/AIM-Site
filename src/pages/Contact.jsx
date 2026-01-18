// src/pages/Contact.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MobileMenu, Nav, Footer, Container, HeroBlend } from "../components/SiteChrome";

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
        // UI only — wire to Formspree/Netlify/server later
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
          {state === "idle"
            ? "Send Message"
            : state === "sending"
            ? "Sending…"
            : "Sent ✓"}
        </button>

        <span className="text-white/55 font-semibold text-sm">
          For attachments/photos, email{" "}
          <a
            className="underline decoration-white/30 hover:decoration-white/70"
            href={emailHref}
          >
            {email}
          </a>
          .
        </span>
      </div>

      {state === "sent" && (
        <div className="mt-4 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/75">
          Thanks — we received your message. If it’s urgent, call and we’ll help
          faster.
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
        imgSrc: "/img/Anthony.webp",
        primary: true,
      },
      {
        role: "Director of Operations",
        name: "Ulises Munoz",
        phoneLabel: "(305) 970-9975",
        phoneHref: "tel:3059709975",
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

      {/* HERO (ONE primary CTA) */}
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
                  <span className="ml-3 text-white/50 font-bold">
                    • usually within 1 business day
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5">
                <h1 className="text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  Contact{" "}
                  <span className="text-[var(--brand-orange)]">Us</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4">
                <p className="max-w-[70ch] text-white/72 font-semibold leading-relaxed">
                  Share your scope, timeline, and site constraints. We’ll reply
                  quickly with next steps.
                </p>
              </FadeIn>

              <FadeIn
                delay={0.24}
                className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Send a Message
                </button>

                {/* Secondary options as links (not more buttons) */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-white/70">
                  <a
                    href={contacts[0].phoneHref}
                    className="hover:text-white transition"
                  >
                    Call: <span className="text-white">{contacts[0].phoneLabel}</span>
                  </a>
                  <span className="text-white/35">•</span>
                  <a href={emailHref} className="hover:text-white transition">
                    Email: <span className="text-white">{email}</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </Container>
        </div>
        <HeroBlend height={200} />
      </header>

      {/* CONTENT */}
      <section className="pt-6">
        {/* Direct contact + who you'll hear from */}
        <FloatSection tone="light">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* LEFT */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/50">
                  Direct contact
                </div>
                <div className="h-[1px] flex-1 bg-black/10" />
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-bold text-black/60">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-orange)]" />
                  Fast replies
                </div>
              </div>

              <h2 className="mt-4 text-[28px] md:text-[36px] font-extrabold tracking-tight text-[var(--ink)]">
                Reach us in{" "}
                <span className="bg-[linear-gradient(90deg,var(--brand-orange),#ffcf7a)] bg-clip-text text-transparent">
                  one step
                </span>
                .
              </h2>
              <p className="mt-2 max-w-[62ch] text-[15px] font-semibold text-black/60 leading-relaxed">
                Use the form below for most requests. If it’s urgent, call. If you have photos,
                email is best.
              </p>

              {/* Modern action tiles */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* CALL */}
                <a
                  href={contacts[0].phoneHref}
                  className="group relative overflow-hidden rounded-[22px] border border-black/10 bg-white/70 p-5 shadow-[0_14px_50px_rgba(0,0,0,0.10)] backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(0,0,0,0.14)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 [background:radial-gradient(700px_280px_at_20%_0%,rgba(233,151,19,0.18),transparent_55%)]" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                        Call
                      </div>
                      <div className="mt-1 text-[18px] md:text-[20px] font-extrabold text-[var(--ink)]">
                        {contacts[0].phoneLabel}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-black/55">
                        Time-sensitive questions
                      </div>
                    </div>

                    <div className="grid place-items-center h-11 w-11 rounded-full border border-black/10 bg-white shadow-sm transition group-hover:border-[var(--brand-orange)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" className="text-black/65 group-hover:text-[var(--brand-orange)]">
                        <path
                          fill="currentColor"
                          d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 h-[1px] bg-black/10" />
                  <div className="mt-3 text-[12px] font-semibold text-black/55">
                    Prefer text details? Use the form — we’ll follow up fast.
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href={emailHref}
                  className="group relative overflow-hidden rounded-[22px] border border-black/10 bg-white/70 p-5 shadow-[0_14px_50px_rgba(0,0,0,0.10)] backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(0,0,0,0.14)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 [background:radial-gradient(700px_280px_at_20%_0%,rgba(255,255,255,0.35),transparent_55%)]" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                        Email
                      </div>
                      <div className="mt-1 text-[18px] md:text-[20px] font-extrabold text-[var(--ink)] truncate">
                        {email}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-black/55">
                        Best for scope + photos
                      </div>
                    </div>

                    <div className="grid place-items-center h-11 w-11 rounded-full border border-black/10 bg-white shadow-sm transition group-hover:border-[var(--brand-orange)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" className="text-black/65 group-hover:text-[var(--brand-orange)]">
                        <path
                          fill="currentColor"
                          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 h-[1px] bg-black/10" />
                  <div className="mt-3 text-[12px] font-semibold text-black/55">
                    Include location + timeline for the quickest turnaround.
                  </div>
                </a>
              </div>

              {/* Modern “tip” bar */}
              <div className="mt-4 rounded-[18px] border border-black/10 bg-white/60 px-4 py-3 text-[13px] font-semibold text-black/60">
                Tip: include <span className="text-black/75">location</span>,{" "}
                <span className="text-black/75">timeline</span>, and{" "}
                <span className="text-black/75">scope summary</span>.
              </div>

              {/* WHO YOU'LL HEAR FROM (modern mini profile row) */}
              <div className="mt-6 rounded-[22px] border border-black/10 bg-white/60 p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                    Who you’ll hear from
                  </div>
                  <div className="h-[1px] flex-1 bg-black/10" />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {contacts.map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-4 rounded-[18px] border border-black/10 bg-white p-4 shadow-sm"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-black/10 bg-black/5">
                        <img
                          src={c.imgSrc}
                          alt={c.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                          {c.role}
                        </div>
                        <div className="mt-1 text-[16px] font-extrabold text-[var(--ink)] truncate">
                          {c.name}
                        </div>
                        <a
                          href={c.phoneHref}
                          className="mt-1 inline-flex text-[13px] font-semibold text-black/60 hover:text-[var(--brand-orange)] transition"
                        >
                          {c.phoneLabel}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-white/70 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.12)] backdrop-blur-md">
                {/* subtle glow */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-40 [background:radial-gradient(circle,rgba(233,151,19,0.22),transparent_60%)]" />

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

                {/* modern accent line */}
                <div className="mt-5 h-[2px] w-full rounded-full bg-[linear-gradient(90deg,var(--brand-orange),transparent)]" />
              </div>
            </div>
          </div>
        </FloatSection>


        {/* Form section (single CTA + clean UX) */}
        <div id="contact-form">
          <FloatSection tone="dark">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                  Message
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Send us the details.
                </h2>
                <p className="mt-3 text-white/75 font-semibold leading-relaxed">
                  Share the essentials and we’ll follow up with next steps. If
                  you need to attach photos, email them to{" "}
                  <a
                    className="underline decoration-white/30 hover:decoration-white/70"
                    href={emailHref}
                  >
                    {email}
                  </a>
                  .
                </p>

                {/* Only one fallback option */}
                <div className="mt-6">
                  <a
                    href={contacts[0].phoneHref}
                    className="inline-flex rounded-full border border-white/18 bg-white/0 px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                  >
                    Or call {contacts[0].phoneLabel}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <FormCard emailHref={emailHref} email={email} />
              </div>
            </div>
          </FloatSection>
        </div>
      </section>
    </PageShell>
  );
}
