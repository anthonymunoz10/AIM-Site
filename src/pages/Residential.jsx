// src/pages/Residential.jsx
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useHead } from "@unhead/react";
import { Link } from "react-router-dom";
import {
  MobileMenu,
  Nav,
  Footer,
  Container,
  HeroBlend,
} from "../components/SiteChrome";
import FileAttachments from "../components/FileAttachments.jsx";
import { appendFiles } from "../lib/attachments.js";
import { LICENSES } from "../data/licenses.js";
import { trackLead } from "../lib/analytics.js";

/* ---------------------------------------------
   Small primitives (match the rest of the site)
---------------------------------------------- */

function FloatSection({ children, tone = "light", id, keepDark = false }) {
  const shell =
    "w-full max-w-full min-w-0 rounded-[26px] border overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.18)]";

  const toneCls =
    tone === "dark"
      ? `${keepDark ? "" : "dark-surface "}bg-[var(--ink)] text-white border-white/12`
      : "bg-white text-[var(--ink)] border-black/10";

  const innerOverlay =
    tone === "dark"
      ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.00))]"
      : "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.86))]";

  return (
    <div id={id} className="py-10 md:py-14 scroll-mt-24">
      <Container>
        <div className={`${shell} ${toneCls}`}>
          <div className={`min-w-0 max-w-full p-5 sm:p-6 md:p-10 ${innerOverlay}`}>
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

function PageShell({ children }) {
  return (
    <main className="full-viewport safe-bottom relative bg-[var(--sand)] text-[var(--ink)] overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[var(--sand)]" />

      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 [background:linear-gradient(180deg,var(--sand)_0%,var(--sand-2)_70%,var(--sand)_100%)]" />
        <div className="absolute inset-0 noise opacity-[0.06] mix-blend-multiply" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] -z-10 hidden md:block">
          <div className="absolute inset-0 bg-black" />
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

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------------------------------------------
   Content
---------------------------------------------- */

// Edit this list to change what shows on the page.
// `trade: true` = work performed by Florida-licensed trade contractors.
const SERVICES = [
  {
    key: "kitchens",
    title: "Kitchens",
    page: "/residential/kitchen-remodeling",
    desc: "Full kitchen remodels: layout changes, cabinets, countertops, backsplash, lighting and appliances.",
  },
  {
    key: "bathrooms",
    title: "Bathrooms",
    page: "/residential/bathroom-remodeling",
    desc: "Bathroom remodels from tub-to-shower conversions to complete gut renovations.",
  },
  {
    key: "flooring",
    title: "Flooring",
    desc: "Tile, luxury vinyl, laminate and wood flooring, including demo and subfloor prep.",
  },
  {
    key: "painting",
    title: "Painting & Drywall",
    desc: "Interior and exterior painting, drywall repair, texture and trim.",
  },
  {
    key: "remodels",
    title: "Remodels & Additions",
    page: "/residential/home-remodeling",
    desc: "Whole-home renovations, room additions, and structural changes, permitted and inspected.",
  },
  {
    key: "roofing",
    title: "Roofing",
    page: "/residential/roofing",
    desc: "Roof replacements and repairs: shingle, tile, metal and flat roofs.",
    trade: true,
  },
  {
    key: "plumbing",
    title: "Plumbing",
    desc: "Fixture swaps, repipes, water heaters and remodel plumbing.",
    trade: true,
  },
  {
    key: "hvac",
    title: "HVAC",
    desc: "AC replacement, ductwork and ventilation as part of your project.",
    trade: true,
  },
  {
    key: "electrical",
    title: "Electrical",
    desc: "Panel upgrades, lighting, outlets and remodel wiring.",
    trade: true,
  },
];

const STEPS = [
  {
    n: "01",
    t: "Tell us about it",
    d: "Send the address, what you want done, and a few photos.",
  },
  {
    n: "02",
    t: "Site visit + estimate",
    d: "We walk the job with you and give you a clear written estimate.",
  },
  {
    n: "03",
    t: "Permits + build",
    d: "We pull the permits, schedule the trades, and keep you updated.",
  },
  {
    n: "04",
    t: "Final walkthrough",
    d: "Inspections passed, site cleaned up, and a walkthrough with you.",
  },
];

const PROJECT_TYPES = [
  "Kitchen remodel",
  "Bathroom remodel",
  "Flooring",
  "Painting / drywall",
  "Roofing",
  "Plumbing",
  "HVAC",
  "Electrical",
  "Whole-home remodel / addition",
  "Other",
];

/* ---------------------------------------------
   Quote form (Netlify Forms, supports a photo)
---------------------------------------------- */

const inputCls =
  "mt-2 w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 font-semibold text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]";
const labelCls =
  "block text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/60";

function QuoteForm() {
  const [state, setState] = useState("idle"); // idle | sending | sent
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [compressing, setCompressing] = useState(false);

  return (
    <form
      name="residential-quote"
      method="POST"
      encType="multipart/form-data"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={async (e) => {
        e.preventDefault();
        if (state !== "idle" || fileError || compressing) return;
        setState("sending");

        const form = e.currentTarget;
        const formData = new FormData(form);
        appendFiles(formData, files);

        try {
          // multipart body so the optional photo uploads too
          const res = await fetch("/", { method: "POST", body: formData });
          if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
          setState("sent");
          trackLead("residential-quote"); // counted only after Netlify accepted it
          form.reset();
          setFiles([]);
        } catch (err) {
          console.error(err);
          setState("idle");
          alert("Couldn’t send your request. Please try again or call us.");
        }
      }}
      className="rounded-[22px] border border-white/12 bg-white/5 backdrop-blur-xl p-5 md:p-6"
    >
      <input type="hidden" name="form-name" value="residential-quote" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input type="text" name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>
            Name <span className="text-white/30">*</span>
          </label>
          <input required name="name" className={inputCls} placeholder="Your name" />
        </div>

        <div>
          <label className={labelCls}>
            Phone <span className="text-white/30">*</span>
          </label>
          <input
            required
            name="phone"
            type="tel"
            className={inputCls}
            placeholder="(###) ###-####"
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>Email</label>
          <input name="email" type="email" className={inputCls} placeholder="you@email.com" />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>
            Property address <span className="text-white/30">*</span>
          </label>
          <input
            required
            name="address"
            className={inputCls}
            placeholder="Street, city, ZIP"
          />
        </div>

        <div>
          <label className={labelCls}>
            Project type <span className="text-white/30">*</span>
          </label>
          <select required name="project-type" defaultValue="" className={inputCls}>
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p} className="text-black">
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Timeline</label>
          <select name="timeline" defaultValue="" className={inputCls}>
            <option value="" disabled>
              When to start?
            </option>
            {["As soon as possible", "Within 1–3 months", "3+ months", "Just getting prices"].map(
              (t) => (
                <option key={t} value={t} className="text-black">
                  {t}
                </option>
              )
            )}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>
            Tell us about the project <span className="text-white/30">*</span>
          </label>
          <textarea
            required
            name="message"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="What do you want done? Rough size, materials you like, anything we should know…"
          />
        </div>

        <div className="md:col-span-2">
          <FileAttachments
            files={files}
            setFiles={setFiles}
            fileError={fileError}
            setFileError={setFileError}
            compressing={compressing}
            setCompressing={setCompressing}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state !== "idle" || Boolean(fileError) || compressing}
          className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : state === "sent" ? "Sent ✓" : compressing ? "Preparing photos…" : "Request Estimate"}
        </button>
        <span className="text-white/55 font-semibold text-sm">
          Or call{" "}
          <a className="underline decoration-white/30 hover:decoration-white/70" href="tel:3053315759">
            (305) 331-5759
          </a>
        </span>
      </div>

      {state === "sent" && (
        <div className="mt-4 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/75">
          Thanks, we got your request and will reach out to set up a visit.
        </div>
      )}
    </form>
  );
}

/* ---------------------------------------------
   Page
---------------------------------------------- */

export default function Residential() {
  const title = "Home Remodeling, Kitchens, Bathrooms & Roofing | AIM Construction Management";
  const description =
    "Kitchen, bathroom and home remodeling plus roofing in South Florida. Written estimates, permits handled and every trade coordinated by AIM Construction Management (CBC1263235).";
  const canonicalUrl = "https://aimconstructionmgt.com/residential";

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: "https://aimconstructionmgt.com/img/og-residential.jpg" },
    ],
    link: [{ rel: "canonical", href: canonicalUrl }],
  });

  return (
    <PageShell>
      <Nav />

      {/* mobile logo + menu */}
      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <a href="/" aria-label="Home" className="inline-flex items-center justify-center">
          <img src="/img/logo.png" alt="Aim Construction" className="logo-on-dark h-16 w-auto opacity-90" />
          <img src="/img/logo-dark.png" alt="" aria-hidden="true" className="logo-on-light h-16 w-auto" />
        </a>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* HERO: warm and homeowner-focused; commercial background as supporting credibility */}
      <header className="res-hero dark-surface hero-round relative overflow-hidden">
        <div className="relative z-10 pt-44 pb-14 md:pt-44 md:pb-20">
          <Container>
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7 text-center md:text-left">
                <FadeIn delay={0.05}>
                  <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                    Residential remodeling • South Florida
                  </div>
                </FadeIn>

                <FadeIn delay={0.12} className="mt-5">
                  <h1 className="text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] font-extrabold tracking-tight text-white">
                    The remodel you want,{" "}
                    <span className="text-[var(--brand-orange)]">handled start to finish.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.18} className="mt-4">
                  <p className="mx-auto md:mx-0 max-w-[56ch] text-white/75 font-semibold leading-relaxed">
                    Kitchens, bathrooms, renovations and roofing. We walk your home with you, give you a
                    clear written estimate, pull the permits and coordinate every trade through the
                    final walkthrough.
                  </p>
                </FadeIn>

                <FadeIn delay={0.24} className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => scrollToId("estimate")}
                    className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                  >
                    Get an Estimate
                  </button>
                  <a
                    href="tel:3053315759"
                    className="rounded-full border border-white/18 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                  >
                    Call (305) 331-5759
                  </a>
                </FadeIn>

                <FadeIn delay={0.3} className="mt-6">
                  <p className="mx-auto md:mx-0 max-w-[56ch] text-sm font-semibold text-white/60">
                    Backed by AIM&apos;s licensed commercial construction work across Florida.
                    Florida Certified Building Contractor CBC1263235.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.2} className="md:col-span-5">
                <div className="rounded-[26px] border border-white/12 bg-white/[0.06] p-6 md:p-7 text-left">
                  <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                    What you can count on
                  </div>
                  <ul className="mt-4 grid gap-3">
                    {[
                      ["Written estimate", "After a site visit, before any work starts."],
                      ["Permits handled", "We pull permits and schedule inspections."],
                      ["One point of contact", "We coordinate every trade on your job."],
                      ["Licensed trades", "Roofing, plumbing, HVAC and electrical by Florida-licensed contractors."],
                    ].map(([t, d]) => (
                      <li key={t} className="flex gap-3">
                        <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand-orange)]" />
                        <div>
                          <div className="font-extrabold text-white">{t}</div>
                          <div className="text-sm font-semibold text-white/65 leading-snug">{d}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </Container>
        </div>
        <HeroBlend height={100} />
      </header>

      <section className="pt-6">
        {/* SERVICES */}
        <FloatSection tone="light" id="services">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
              What we do
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-[var(--ink)] leading-tight">
              Home services, <span className="text-[var(--brand-orange)]">one contractor</span>
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.key}
                className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_14px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="h-[4px] w-12 rounded-full bg-[var(--brand-orange)]" />
                <h3 className="mt-4 text-xl font-extrabold text-[var(--ink)]">{s.title}</h3>
                <p className="mt-2 text-black/65 font-semibold leading-relaxed">{s.desc}</p>
                {s.page && (
                  <Link
                    to={s.page}
                    className="mt-4 inline-flex text-sm font-extrabold uppercase tracking-wider text-[var(--brand-orange)] hover:opacity-80 transition"
                  >
                    Learn more →
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm font-semibold text-black/55">
            Roofing, plumbing, HVAC and electrical work is performed by Florida-licensed trade
            contractors under permit.
          </p>
        </FloatSection>

        {/* PROCESS */}
        <FloatSection tone="dark">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
              How it works
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-white">
              Straightforward from start to finish
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {STEPS.map((p) => (
              <div key={p.n} className="rounded-2xl border border-white/14 bg-white/5 p-6">
                <div className="text-[var(--brand-orange)] font-extrabold text-xl">{p.n}</div>
                <div className="mt-3 font-extrabold text-white text-lg">{p.t}</div>
                <p className="mt-2 text-white/75 font-semibold">{p.d}</p>
              </div>
            ))}
          </div>
        </FloatSection>

        {/* ESTIMATE FORM */}
        <FloatSection tone="dark" id="estimate" keepDark>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start min-w-0">
            <div className="lg:col-span-5 min-w-0">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                Free estimate
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Tell us about your project.
              </h2>
              <p className="mt-3 text-white/75 font-semibold leading-relaxed">
                Send the basics and a photo if you have one. We’ll call you to set up a site
                visit.
              </p>

              <div className="mt-6 grid gap-2 text-sm font-semibold text-white/60">
                {LICENSES.map((l) => (
                  <div key={l.number}>
                    {l.label}: <span className="text-white/85">{l.number}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0">
              <QuoteForm />
            </div>
          </div>
        </FloatSection>

        {/* COMMERCIAL TRACK RECORD (supporting credibility, real projects only) */}
        <FloatSection tone="light">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                The company behind your remodel
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-[var(--ink)] leading-tight">
                The same team that builds for ports, utilities and public agencies.
              </h2>
              <p className="mt-3 text-black/65 font-semibold leading-relaxed">
                AIM&apos;s commercial work includes ductbank at the Port of Miami, the Virginia Key
                wastewater plant and FPL Turkey Point. That experience with schedules, permits and
                inspections is what we bring to your home.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
              <a
                href="/projects"
                className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
              >
                See Our Projects
              </a>
              <a
                href="/services"
                className="rounded-full border border-black/15 bg-white px-7 py-3 font-bold uppercase tracking-wider text-sm text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
              >
                Commercial Services
              </a>
            </div>
          </div>
        </FloatSection>
      </section>
    </PageShell>
  );
}
