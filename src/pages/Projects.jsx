import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MobileMenu, Nav, Footer, Container } from "../components/SiteChrome";
import { PROJECTS } from "../data/projects";

/* ---------------------------------------------
   Small primitives (match Home/About)
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
    <main className="relative bg-[var(--sand)] text-[var(--ink)]">
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] -z-10">
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

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");

  useEffect(() => {
    document.title = "Projects | AIM Construction Management";
  }, []);

  const categories = useMemo(() => {
    const set = new Set(PROJECTS.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const years = useMemo(() => {
    const set = new Set(PROJECTS.map((p) => p.year));
    // sort with a little sanity: newest-ish first if numeric appears
    const arr = Array.from(set);
    arr.sort((a, b) => String(b).localeCompare(String(a)));
    return ["All", ...arr];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROJECTS.filter((p) => {
      const hay = `${p.title} ${p.location} ${p.category} ${p.year}`.toLowerCase();
      const matchesQuery = !q || hay.includes(q);
      const matchesCategory = category === "All" || p.category === category;
      const matchesYear = year === "All" || p.year === year;
      return matchesQuery && matchesCategory && matchesYear;
    });
  }, [query, category, year]);

  const scrollToGrid = () => {
    const el = document.querySelector("#projects-grid");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setYear("All");
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
            <div className="max-w-[920px]">
              <FadeIn delay={0.05}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                  Portfolio
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5">
                <h1 className="text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  Projects <span className="text-[var(--brand-orange)]">Gallery</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4">
                <p className="max-w-[70ch] text-white/72 font-semibold leading-relaxed">
                  Recent underground utility, directional boring, and restoration work—delivered with safety-first
                  operations and dependable execution.
                </p>
              </FadeIn>

              <FadeIn delay={0.24} className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={scrollToGrid}
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Browse Projects
                </button>
                <a
                  href="/contact.html"
                  className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Request a Quote
                </a>
              </FadeIn>
            </div>
          </Container>
        </div>
      </header>

      {/* TOOLBAR + GRID */}
      <section id="projects-grid" className="pt-6">
        <FloatSection tone="light">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                Search + refine
              </div>
              <div className="mt-2 text-2xl md:text-3xl font-extrabold text-[var(--ink)]">
                Find the right project
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-black/15 bg-white px-5 py-2.5 font-extrabold uppercase tracking-wider text-xs text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-12 md:items-center">
            {/* search */}
            <div className="md:col-span-6">
              <label className="sr-only" htmlFor="projectSearch">Search projects</label>
              <input
                id="projectSearch"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects (name, location, category, year…)"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold text-[var(--ink)] placeholder:text-black/35 outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
              />
            </div>

            {/* category */}
            <div className="md:col-span-3">
              <label className="sr-only" htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold text-[var(--ink)] outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* year */}
            <div className="md:col-span-3">
              <label className="sr-only" htmlFor="year">Year</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold text-[var(--ink)] outline-none focus:ring-2 focus:ring-[rgba(233,151,19,0.35)]"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* grid */}
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="text-sm font-semibold text-black/55">
                Showing <span className="text-black/80">{filtered.length}</span> of{" "}
                <span className="text-black/80">{PROJECTS.length}</span>
              </div>

              <a
                href="/contact.html"
                className="rounded-full bg-[var(--brand-orange)] px-6 py-2.5 font-extrabold uppercase tracking-wider text-xs text-white hover:opacity-90 transition"
              >
                Request a Quote
              </a>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <a
                  key={p.id}
                  href={`/project.html?id=${p.id}`}
                  className="group rounded-[22px] overflow-hidden border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.16)] bg-white block"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                        src={p.img}
                        alt={p.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-500"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                            if (p.youtubeId) {
                            e.currentTarget.src = `https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg`;
                            }
                        }}
                    />
                    {p.youtubeId && (
                    <div className="absolute inset-0 grid place-items-center">
                        <div className="rounded-full bg-black/55 backdrop-blur px-4 py-2 border border-white/15 flex items-center gap-2">
                        <span className="text-white font-extrabold text-sm">▶</span>
                        <span className="text-white/90 font-extrabold uppercase tracking-wider text-xs">
                            Watch
                        </span>
                        </div>
                    </div>
                    )}

                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/55">
                        {p.category}
                      </span>
                      <span className="text-xs font-extrabold text-black/35">
                        {p.year}
                      </span>
                    </div>

                    <div className="mt-2 text-2xl font-extrabold text-[var(--ink)] leading-tight">
                      {p.title}
                    </div>

                    <div className="mt-2 text-black/65 font-semibold">
                      {p.location}
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-[var(--brand-orange)] font-extrabold uppercase tracking-wider text-xs">
                      View project <span className="translate-x-0 group-hover:translate-x-[2px] transition">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {!filtered.length && (
              <div className="mt-8 rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-6">
                <div className="font-extrabold text-[var(--ink)] text-lg">
                  No results found.
                </div>
                <div className="mt-2 text-black/60 font-semibold">
                  Try a different search, reset filters, or browse all projects.
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </FloatSection>

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
                href="/services.html"
              >
                View Services
              </a>
            </div>
          </div>
        </FloatSection>
      </section>
    </PageShell>
  );
}
