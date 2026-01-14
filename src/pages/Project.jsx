import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MobileMenu, Nav, Footer, Container } from "../components/SiteChrome";
import { PROJECTS } from "../data/projects";

/* ---------------------------------------------
   Small primitives (match Home/About vibe)
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

function prettyFromId(id) {
  return String(id || "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function YouTubeEmbed({ id }) {
  if (!id) return null;

  return (
    <div className="rounded-[22px] overflow-hidden border border-white/12 bg-white/5">
      <div className="relative w-full aspect-video">
        <iframe
          className="absolute inset-0 h-full w-full z-[2]"
          style={{ display: "block" }}
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
          title="Project video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}


function _isRemoteUrl(v) {
  return /^https?:\/\//i.test(String(v || ""));
}

function isLocalImgPath(v) {
  return String(v || "").startsWith("/img/");
}



/* ---------------------------------------------
   Auto-gallery helpers
   - tries base.webp then base.1.webp, base.2.webp...
   - stops when a number doesn't exist
---------------------------------------------- */

function imageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function buildGallery({ basePath, max = 40 }) {
  const exts = ["webp", "jpg", "jpeg", "png"];
  const out = [];

  if (!basePath) return out;

  // cover: base.webp / base.jpg / ...
  for (const ext of exts) {
    // eslint-disable-next-line no-await-in-loop
    if (await imageExists(`${basePath}.${ext}`)) {
      out.push(`${basePath}.${ext}`);
      break;
    }
  }

  // numbered: base.1.webp, base.2.webp...
  for (let i = 1; i <= max; i++) {
    let found = false;

    for (const ext of exts) {
      // eslint-disable-next-line no-await-in-loop
      if (await imageExists(`${basePath}.${i}.${ext}`)) {
        out.push(`${basePath}.${i}.${ext}`);
        found = true;
        break;
      }
    }

    // stop when we don’t find that number in any extension
    if (!found) break;
  }

  return out;
}

/* ---------------------------------------------
   Page shell (same sand + curved shell concept)
---------------------------------------------- */

function PageShell({ children }) {
  return (
    <main className="full-viewport safe-bottom relative bg-[var(--sand)] text-[var(--ink)]">
      {/* globalsand */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[var(--sand)]" />

      {/* depth + texture */}
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
        {/* footer black zone */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] -z-10 hidden md:block">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 opacity-[0.55] [background:radial-gradient(1100px_520px_at_20%_20%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(900px_420px_at_80%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
          <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_20%_30%,rgba(233,151,19,0.22),transparent_62%)]" />
          <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />
        </div>

        {/* curved shell */}
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
   Main Project Page
---------------------------------------------- */

export default function Project() {
  const [projectId, setProjectId] = useState(() => getQueryParam("id"));
  const [gallery, setGallery] = useState([]);
  const [lightbox, setLightbox] = useState(null); // { src, alt } | null

  const project = useMemo(() => {
    if (!projectId) return null;
    return PROJECTS.find((p) => p.id === projectId) || null;
  }, [projectId]);

  const fallbackTitle = projectId ? prettyFromId(projectId) : "Project";

  useEffect(() => {
    const onPop = () => setProjectId(getQueryParam("id"));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const title = project?.title || fallbackTitle;
    document.title = `${title} | AIM Construction Management`;
  }, [project, fallbackTitle]);

  // Build gallery automatically from your file naming scheme
  useEffect(() => {
    let cancelled = false;
  
    (async () => {
      if (!project) {
        setGallery([]);
        return;
      }
  
      // manual override wins
      if (Array.isArray(project.gallery) && project.gallery.length) {
        setGallery(project.gallery);
        return;
      }
  
      // If it's a remote "img" (YouTube thumb), DO NOT try numbered iteration.
      // Only auto-gallery when base is local (/img/...)
      const derivedBase =
        project.galleryBase ||
        (isLocalImgPath(project.img)
          ? project.img.replace(/\.(webp|png|jpg|jpeg)$/i, "")
          : "");
  
      // Video-only or remote-only: just show 0 photos (or you can show [project.img] if you want)
      if (!derivedBase) {
        if (!cancelled) setGallery([]); // or: setGallery(project.img ? [project.img] : []);
        return;
      }
  
      const imgs = await buildGallery({ basePath: derivedBase, max: 60 });
  
      if (!cancelled) {
        const fallback = project.img && isLocalImgPath(project.img)
          ? [project.img]
          : ["/img/hero-poster.webp"];
  
        setGallery(imgs.length ? imgs : fallback);
      }
    })();
  
    return () => {
      cancelled = true;
    };
  }, [project]);


  // Lightbox escape + scroll lock
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);

    const html = document.documentElement;
    const body = document.body;
    if (lightbox) {
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }

    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const heroImage = project?.heroImage || project?.img || "/img/projects-bg.jpg";

  return (
    <PageShell>
      <Nav />

      {/* mobile logo + menu like Home/About */}
      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <a href="/" aria-label="Home" className="inline-flex items-center justify-center">
          <img src="/img/logo.png" alt="Aim Construction" className="h-16 w-auto opacity-90" />
        </a>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* HERO */}
      <header className="relative min-h-[78svh] md:min-h-[82vh] bg-black overflow-hidden">
        {/* image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />

        <div className="relative z-10 pt-44 pb-16 md:pt-52">
          <Container>
            <div className="max-w-[920px]">
              <FadeIn delay={0.05}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                  {project?.category || project?.tag || "Project"}
                  {project?.location ? (
                    <span className="ml-3 text-white/50 font-bold">• {project.location}</span>
                  ) : null}
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5">
                <h1 className="text-[clamp(2.2rem,5.2vw,4.2rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  {project?.title || fallbackTitle}{" "}
                  <span className="text-[var(--brand-orange)]">Details</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4">
                <p className="max-w-[70ch] text-white/72 font-semibold leading-relaxed">
                  {project?.summary ||
                    "AIM Construction Management delivers safety-first underground utility, directional boring, and restoration work. This page will be updated with full scope + gallery."}
                </p>
              </FadeIn>

              <FadeIn delay={0.24} className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/projects.html"
                  className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  Back to Projects
                </a>
                <a
                  href="/contact.html"
                  className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Request a Quote
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.querySelector("#project-gallery");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                  View Gallery
                </button>
                {project?.youtubeId && (
                <button
                    type="button"
                    onClick={() => {
                    const el = document.querySelector("#project-video");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                >
                    Watch Video
                </button>
                )}

              </FadeIn>
            </div>
          </Container>
        </div>
      </header>

      {/* BODY */}
      <section className="pt-6">
        {/* quick facts + bullets */}
        <FloatSection tone="light">
          <div className="grid gap-8 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                Project snapshot
              </div>

              <div className="mt-4 grid gap-3">
                {(project?.facts || [
                  { k: "Category", v: "Underground Infrastructure" },
                  { k: "Capabilities", v: "Utility • Boring • Restoration" },
                  { k: "Coverage", v: "Florida + Southeast" },
                ]).map((f) => (
                  <div
                    key={f.k}
                    className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 px-4 py-3"
                  >
                    <div className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-black/45">
                      {f.k}
                    </div>
                    <div className="mt-1 font-extrabold text-[var(--ink)]">{f.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="text-xs uppercase tracking-[0.22em] font-bold text-black/55">
                What customers care about
              </div>

              <div className="mt-4 grid gap-3">
                {(project?.bullets || [
                  "Scope clarity and schedule alignment",
                  "Safety-first execution with field discipline",
                  "Clean restoration and closeout-ready finish",
                ]).map((t) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 font-bold text-[var(--ink)]"
                  >
                    {t}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/services.html"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 font-bold uppercase tracking-wider text-sm text-[var(--ink)] hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                >
                  View Services
                </a>
                <a
                  href="/contact.html"
                  className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Get Pricing
                </a>
              </div>
            </div>
          </div>
        </FloatSection>

        {/* Project Video (only for projects that have youtubeId) */}
        {project?.youtubeId && (
        <div id="project-video">
            <FloatSection tone="dark">
            <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                Project Video
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
                Watch the work in progress
            </h2>
            <p className="mt-2 text-white/70 font-semibold max-w-[70ch]">
                Quick field walkthrough and progress footage.
            </p>

            <div className="mt-6">
                <YouTubeEmbed id={project.youtubeId} />
            </div>
            </FloatSection>
        </div>
        )}


        {/* Gallery */}
        {gallery.length > 0 && (
        <div id="project-gallery">
          <FloatSection tone="dark">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                  Gallery
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Photos from the field
                </h2>
                <p className="mt-2 text-white/70 font-semibold max-w-[70ch]">
                  Clean restoration, disciplined crews, and production-focused execution.
                </p>
              </div>

              <a
                href="/projects.html"
                className="rounded-full border border-white/18 bg-white/0 px-6 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
              >
                Back to Projects
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(gallery.length ? gallery : ["/img/hero-poster.webp"]).map((src, i) => {
                const alt = `${project?.title || fallbackTitle} photo ${i + 1}`;
                return (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setLightbox({ src, alt })}
                    className="group text-left rounded-[22px] overflow-hidden border border-white/12 bg-white/5 hover:bg-white/8 transition"
                    aria-label="Open image"
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="h-64 w-full object-cover group-hover:scale-[1.02] transition duration-500"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            {/* CTA strip */}
            <div className="mt-10 rounded-[22px] border border-white/12 bg-white/6 p-6 md:p-7">
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <div className="text-xs uppercase tracking-[0.22em] font-bold text-white/60">
                    Ready to move?
                  </div>
                  <div className="mt-2 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    Send scope + photos — we’ll respond fast.
                  </div>
                  <div className="mt-2 text-white/75 font-semibold">
                    Underground utility, directional boring, and restoration across Florida and beyond.
                  </div>
                </div>
                <div className="md:col-span-4 md:justify-self-end flex flex-wrap gap-3">
                  <a
                    href="/contact.html"
                    className="rounded-full bg-[var(--brand-orange)] px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                  >
                    Request a Quote
                  </a>
                  <a
                    href="/services.html"
                    className="rounded-full border border-white/18 bg-white/0 px-7 py-3 font-bold uppercase tracking-wider text-sm text-white hover:bg-white/10 transition"
                  >
                    View Services
                  </a>
                </div>
              </div>
            </div>
          </FloatSection>
        </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[999]">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={() => setLightbox(null)}
            aria-label="Close image"
          />
          <div className="absolute inset-0 grid place-items-center p-5">
            <div className="relative w-full max-w-[1100px] overflow-hidden rounded-[22px] border border-white/12 bg-black/70 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition grid place-items-center text-white/80"
                aria-label="Close"
              >
                ✕
              </button>
              <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[80vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
