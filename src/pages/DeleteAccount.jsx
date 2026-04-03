// src/pages/DeleteAccount.jsx
import React, { useRef } from "react";
import { useHead } from "@unhead/react";
import { motion, useInView } from "framer-motion";
import {
  MobileMenu,
  Nav,
  Footer,
  Container,
  HeroBlend,
} from "../components/SiteChrome";
import { Link } from "react-router-dom";

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

function FadeIn({ children, className = "", delay = 0, alwaysShow = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={alwaysShow || inView ? { opacity: 1, y: 0 } : {}}
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

        <div className="relative z-10 rounded-b-[56px] bg-[var(--sand)] shadow-[0_70px_180px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.40),transparent_60%)]" />
          <div className="relative">{children}</div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

export default function DeleteAccount() {
  useHead({
    title: "Delete Account | AIM Project Management",
    meta: [
      {
        name: "description",
        content:
          "How to request deletion of your AIM Project Management account and associated data.",
      },
      {
        property: "og:title",
        content: "Delete Account | AIM Project Management",
      },
      {
        property: "og:description",
        content:
          "Learn how to request deletion of your AIM Project Management account and associated data.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://aimconstructionmgt.com/delete-account",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://aimconstructionmgt.com/delete-account",
      },
    ],
  });

  return (
    <PageShell>
      <Nav />

      <div className="md:hidden absolute top-24 left-1/2 -translate-x-1/2 z-20">
        <Link
          to="/"
          aria-label="Home"
          className="inline-flex items-center justify-center"
        >
          <img
            src="/img/logo.png"
            alt="AIM Project Management"
            className="h-16 w-auto opacity-90"
          />
        </Link>
      </div>

      <div className="md:hidden">
        <MobileMenu />
      </div>

      <header className="relative min-h-[56svh] md:min-h-[56vh] bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/img/projects-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 [background:radial-gradient(900px_520px_at_18%_18%,rgba(233,151,19,0.28),transparent_60%)]" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_700px_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_70%,rgba(0,0,0,0.90)_100%)]" />
        <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />

        <div className="relative z-10 pt-60 pb-14 md:pt-44">
          <Container>
            <div className="max-w-[920px]">
              <FadeIn delay={0.05} alwaysShow>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] font-extrabold text-white/75">
                  Account
                  <span className="ml-3 text-white/50 font-bold">
                    • deletion request
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5" alwaysShow>
                <h1 className="text-[clamp(2.2rem,5.2vw,4.0rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  Delete{" "}
                  <span className="text-[var(--brand-orange)]">Account</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4" alwaysShow>
                <p className="max-w-[70ch] text-white/72 font-semibold leading-relaxed">
                  You can request deletion of your AIM Project Management
                  account and associated data at any time.
                </p>
              </FadeIn>
            </div>
          </Container>
        </div>

        <HeroBlend height={100} />
      </header>

      <section className="pt-6">
        <FloatSection tone="light">
          <div className="grid gap-6">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Option 1
              </div>
              <div className="mt-3 text-black/85 font-extrabold">
                Request deletion in the app
              </div>
              <ol className="mt-3 list-decimal pl-5 text-black/70 font-semibold leading-relaxed grid gap-2">
                <li>Open the AIM Project Management app</li>
                <li>Sign in to your account</li>
                <li>Go to Settings</li>
                <li>Select Delete Account</li>
                <li>Follow the confirmation steps</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Option 2
              </div>
              <div className="mt-3 text-black/85 font-extrabold">
                Request deletion by email
              </div>
              <p className="mt-3 text-black/70 font-semibold leading-relaxed">
                Email{" "}
                <a
                  className="font-extrabold text-[var(--brand-orange)] hover:opacity-90"
                  href="mailto:support@aimconstructionmgt.com?subject=Delete%20Account%20Request"
                >
                  support@aimconstructionmgt.com
                </a>{" "}
                from the email associated with your account and request
                deletion.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                What will be deleted
              </div>
              <ul className="mt-3 list-disc pl-5 text-black/70 font-semibold leading-relaxed grid gap-2">
                <li>Name and profile information</li>
                <li>Email address and account details</li>
                <li>
                  Tasks, notes, and activity data associated with your account
                </li>
                <li>
                  Uploaded files and attachments associated with your account
                </li>
                <li>Project associations where applicable</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Temporary retention
              </div>
              <p className="mt-3 text-black/70 font-semibold leading-relaxed">
                Certain information may be retained for a limited period where
                necessary for legal compliance, fraud prevention, dispute
                resolution, security, or enforcement of our agreements.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Questions
              </div>
              <p className="mt-3 text-black/70 font-semibold leading-relaxed">
                For questions about account deletion, contact{" "}
                <a
                  className="font-extrabold text-[var(--brand-orange)] hover:opacity-90"
                  href="mailto:support@aimconstructionmgt.com?subject=Account%20Deletion%20Question"
                >
                  support@aimconstructionmgt.com
                </a>
                .
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/privacy"
                  className="rounded-full bg-[var(--brand-orange)] px-6 py-3 font-extrabold uppercase tracking-wider text-sm text-white hover:opacity-90 transition"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/contact"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 font-extrabold uppercase tracking-wider text-sm text-black/70 hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)] transition"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </FloatSection>
      </section>
    </PageShell>
  );
}
