// src/pages/ServicePage.jsx
//
// One template for every service page in src/data/servicePages.js.
// Each page gets its own title, description, and structured data
// (Service, FAQ, breadcrumbs) so search engines and AI tools can cite it.
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useHead } from "@unhead/react";
import { useLocation, Link } from "react-router-dom";
import { MobileMenu, Nav, Footer, Container, HeroBlend } from "../components/SiteChrome";
import { SERVICE_PAGES, getServicePage } from "../data/servicePages.js";
import { LICENSES } from "../data/licenses.js";
import { PROJECTS } from "../data/projects.js";

const SITE = "https://aimconstructionmgt.com";

function FloatSection({ children, tone = "light" }) {
  const toneCls =
    tone === "dark"
      ? "dark-surface bg-[var(--ink)] text-white border-white/12"
      : "bg-white text-[var(--ink)] border-black/10";
  return (
    <div className="py-6 md:py-8">
      <Container>
        <div
          className={`rounded-[26px] border overflow-hidden shadow-[0_22px_70px_rgba(0,0,0,0.18)] ${toneCls}`}
        >
          <div className="p-6 md:p-10">{children}</div>
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
    <main className="full-viewport safe-bottom relative bg-[var(--sand)] text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[var(--sand)]" />
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 [background:linear-gradient(180deg,var(--sand)_0%,var(--sand-2)_70%,var(--sand)_100%)]" />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] -z-10 hidden md:block">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_20%_30%,rgba(233,151,19,0.22),transparent_62%)]" />
        </div>
        <div className="relative z-10 overflow-hidden rounded-b-[56px] bg-[var(--sand)] shadow-[0_70px_180px_rgba(0,0,0,0.35)]">
          <div className="relative">{children}</div>
        </div>
        <Footer />
      </div>
    </main>
  );
}

function structuredData(page) {
  const url = SITE + page.path;
  const parent =
    page.side === "commercial"
      ? { name: "Commercial Services", url: SITE + "/services" }
      : { name: "Residential", url: SITE + "/residential" };
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.nav,
      serviceType: page.nav,
      description: page.metaDescription,
      url,
      provider: { "@id": SITE + "/#business" },
      areaServed:
        page.side === "commercial"
          ? ["Florida"]
          : ["Miami Lakes, FL", "South Florida"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: parent.name, item: parent.url },
        { "@type": "ListItem", position: 3, name: page.nav, item: url },
      ],
    },
  ];
}

export default function ServicePage() {
  const { pathname } = useLocation();
  const page = getServicePage(pathname.replace(/\/$/, ""));
  const canonical = page ? SITE + page.path : SITE + "/";

  useHead({
    title: page?.metaTitle ?? "AIM Construction Management",
    meta: page
      ? [
          { name: "description", content: page.metaDescription },
          { property: "og:title", content: page.metaTitle },
          { property: "og:description", content: page.metaDescription },
          { property: "og:type", content: "website" },
          { property: "og:url", content: canonical },
          {
            property: "og:image",
            content: SITE + (page.side === "residential" ? "/img/og-residential.jpg" : "/img/og-aim.jpg"),
          },
        ]
      : [],
    link: [{ rel: "canonical", href: canonical }],
    script: page
      ? structuredData(page).map((d) => ({
          type: "application/ld+json",
          innerHTML: JSON.stringify(d),
        }))
      : [],
  });

  if (!page) return null;

  const residential = page.side === "residential";
  const projects = (page.projects || [])
    .map((id) => PROJECTS.find((pr) => pr.id === id))
    .filter(Boolean);
  const siblings = SERVICE_PAGES.filter((p) => p.side === page.side && p.slug !== page.slug);
  const cta = residential
    ? { href: "/residential#estimate", label: "Request an estimate" }
    : { href: "/contact", label: "Request a quote" };
  const backLink = residential
    ? { href: "/residential", label: "All residential services" }
    : { href: "/services", label: "All commercial services" };

  return (
    <PageShell>
      <Nav />

      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <a href="/" aria-label="Home" className="inline-flex items-center justify-center">
          <img src="/img/logo.png" alt="Aim Construction" className="h-16 w-auto opacity-90" />
        </a>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* HERO */}
      <header className="hero-round relative min-h-[64svh] md:min-h-[64vh] bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('${page.image}')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.88)_100%)]" />

        <div className="relative z-10 pt-44 pb-16 md:pt-52">
          <Container>
            <div className="max-w-[920px] mx-auto text-center">
              <FadeIn delay={0.05}>
                <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-white/70">
                  <Link to={backLink.href} className="hover:text-[var(--brand-orange)] transition">
                    {page.kicker}
                  </Link>
                  <span className="mx-2 text-white/40">/</span>
                  <span>{page.nav}</span>
                </nav>
              </FadeIn>
              <FadeIn delay={0.12} className="mt-5">
                <h1 className="text-[clamp(2rem,4.8vw,3.8rem)] leading-[0.98] font-extrabold tracking-tight text-white">
                  {page.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.2} className="mt-8 flex flex-wrap gap-3 justify-center">
                <a
                  href={cta.href}
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  {cta.label}
                </a>
                <a
                  href="tel:3053315759"
                  className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Call (305) 331-5759
                </a>
              </FadeIn>
            </div>
          </Container>
        </div>
        <HeroBlend height={100} />
      </header>

      <section className="pt-6 pb-10">
        {/* Intro + what we do */}
        <FloatSection tone="light">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                Overview
              </div>
              <p className="mt-3 text-lg text-black/75 font-semibold leading-relaxed">
                {page.intro}
              </p>
            </div>
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)]">What we do</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {page.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-2xl border border-black/10 px-4 py-3 font-bold text-[var(--ink)]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FloatSection>

        {/* Why AIM */}
        <FloatSection tone="dark">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Why <span className="text-[var(--brand-orange)]">AIM</span>
          </h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {page.why.map((w) => (
              <li
                key={w}
                className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 font-bold text-white/90"
              >
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-semibold text-white/60">
            {LICENSES.map((l) => `${l.label} ${l.number}`).join(" • ")}
          </p>
        </FloatSection>

        {/* Real projects from the Projects page */}
        {projects.length > 0 && (
          <FloatSection tone="light">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)]">
              Recent <span className="text-[var(--brand-orange)]">projects</span>
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((pr) => (
                <a
                  key={pr.id}
                  href={`/project?id=${pr.id}`}
                  className="group block rounded-[22px] overflow-hidden border border-black/10 bg-white shadow-[0_14px_50px_rgba(0,0,0,0.10)] hover:border-[var(--brand-orange)] transition"
                >
                  <div className="aspect-[16/10] bg-[var(--ink)] overflow-hidden">
                    <img
                      src={pr.img}
                      alt={pr.title}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-extrabold text-[var(--ink)] leading-snug">{pr.title}</div>
                    <div className="mt-1 text-sm font-semibold text-black/55">
                      {pr.location} • {pr.year}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <a
              href="/projects"
              className="mt-5 inline-flex text-sm font-extrabold uppercase tracking-wider text-[var(--brand-orange)] hover:opacity-80 transition"
            >
              See all projects →
            </a>
          </FloatSection>
        )}

        {/* FAQ */}
        <FloatSection tone="light">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)]">
            Common questions
          </h2>
          <div className="mt-5 grid gap-3">
            {page.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-black/10 px-5 py-4">
                <h3 className="text-lg font-extrabold text-[var(--ink)]">{f.q}</h3>
                <p className="mt-1.5 text-black/70 font-semibold leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </FloatSection>

        {/* Related + CTA */}
        <FloatSection tone="dark">
          <div className="grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                {residential ? "Planning a project?" : "Have a scope to price?"}
              </h2>
              <p className="mt-2 text-white/70 font-semibold">
                {residential
                  ? "Send the address, what you want done and a few photos, and we'll set up a site visit."
                  : "Send plans, a scope or photos and we'll review your project."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={cta.href}
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  {cta.label}
                </a>
                <Link
                  to={backLink.href}
                  className="rounded-full border border-white/18 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  {backLink.label}
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/55">
                Related services
              </div>
              <ul className="mt-3 grid gap-2">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={s.path}
                      className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/5 px-4 py-3 font-bold text-white/90 hover:border-[var(--brand-orange)] transition"
                    >
                      {s.nav}
                      <span aria-hidden="true" className="text-[var(--brand-orange)]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FloatSection>
      </section>
    </PageShell>
  );
}
