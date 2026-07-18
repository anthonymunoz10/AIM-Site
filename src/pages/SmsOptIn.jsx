// src/pages/SmsOptIn.jsx
import React, { useRef, useState } from "react";
import { useHead } from "@unhead/react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MobileMenu,
  Nav,
  Footer,
  Container,
  HeroBlend,
} from "../components/SiteChrome";

/* ---------------------------------------------
   Small primitives
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

function FadeIn({ children, className = "", delay = 0, alwaysShow = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={alwaysShow || inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------
   Page shell
---------------------------------------------- */

function PageShell({ children }) {
  return (
    <main className="full-viewport safe-bottom relative bg-[var(--sand)] text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[var(--sand)]" />

      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 [background:linear-gradient(180deg,var(--sand)_0%,var(--sand-2)_70%,var(--sand)_100%)]" />

        <div
          className="
            absolute inset-0 opacity-[0.08]
            [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),
            linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
            [background-size:48px_48px]
          "
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

/* ---------------------------------------------
   Page
---------------------------------------------- */

export default function SmsOptIn() {
  const [consent, setConsent] = useState(false);

  useHead({
    title: "SMS Opt-In | AIM Project Management",
    meta: [
      {
        name: "description",
        content:
          "Review the AIM Project Management transactional SMS consent process for account invitations, verification codes, project onboarding, and account access.",
      },
      {
        property: "og:title",
        content: "SMS Opt-In | AIM Project Management",
      },
      {
        property: "og:description",
        content:
          "Information about opting in to transactional SMS messages from AIM Project Management.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://aimconstructionmgt.com/sms-opt-in",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: "https://aimconstructionmgt.com/sms-opt-in",
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
          style={{
            backgroundImage: "url('/img/projects-bg.jpg')",
          }}
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
                  Messaging
                  <span className="ml-3 text-white/50 font-bold">
                    • transactional SMS
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-5" alwaysShow>
                <h1 className="text-[clamp(2.2rem,5.2vw,4.0rem)] leading-[0.95] font-extrabold tracking-tight text-white">
                  SMS <span className="text-[var(--brand-orange)]">Opt-In</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.18} className="mt-4" alwaysShow>
                <p className="max-w-[70ch] text-white/72 font-semibold leading-relaxed">
                  Review how users voluntarily consent to receive transactional
                  account, onboarding, verification, and project-access text
                  messages from AIM Project Management.
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
                How the opt-in process works
              </div>

              <ol className="mt-4 grid gap-3 pl-5 list-decimal text-black/70 font-semibold leading-relaxed">
                <li>
                  The recipient opens an AIM Project Management account
                  onboarding or invitation link.
                </li>

                <li>
                  The recipient enters or confirms their own mobile phone
                  number.
                </li>

                <li>
                  The recipient reviews the SMS disclosure presented with the
                  phone-number field.
                </li>

                <li>
                  The recipient voluntarily checks an SMS consent box that is
                  unchecked by default.
                </li>

                <li>
                  Transactional SMS messages are sent only after consent has
                  been provided and recorded.
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Example onboarding consent
              </div>

              <p className="mt-3 max-w-[75ch] text-black/65 font-semibold leading-relaxed">
                The example below shows the disclosure presented when a user
                provides their mobile phone number during AIM account
                onboarding.
              </p>

              <div className="mt-6 overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.10)]">
                <div className="border-b border-black/10 bg-black px-5 py-4 md:px-6">
                  <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-white/55">
                    AIM Project Management
                  </div>

                  <div className="mt-1 text-lg font-extrabold text-white">
                    Complete your account
                  </div>
                </div>

                <div className="p-5 md:p-7">
                  <label
                    htmlFor="sms-mobile-number"
                    className="block text-sm font-extrabold text-black/80"
                  >
                    Mobile phone number
                  </label>

                  <input
                    id="sms-mobile-number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 555-5555"
                    className="
                      mt-2 w-full rounded-xl border border-black/15 bg-white
                      px-4 py-3 text-black font-semibold outline-none
                      transition
                      focus:border-[var(--brand-orange)]
                      focus:ring-4 focus:ring-[var(--brand-orange)]/10
                    "
                  />

                  <label className="mt-6 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand-orange)]"
                    />

                    <span className="text-sm font-semibold leading-relaxed text-black/70">
                      I agree to receive optional transactional SMS messages
                      from AIM Project Management regarding account invitations,
                      verification codes, project onboarding, and account
                      access. Message frequency varies. Message and data rates
                      may apply. Reply STOP to opt out or HELP for help. Consent
                      is not a condition of using AIM Project Management.
                    </span>
                  </label>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-extrabold">
                    <Link
                      to="/privacy"
                      className="text-[var(--brand-orange)] transition hover:opacity-80"
                    >
                      Privacy Policy
                    </Link>

                    <Link
                      to="/terms"
                      className="text-[var(--brand-orange)] transition hover:opacity-80"
                    >
                      Terms of Use
                    </Link>
                  </div>

                  <button
                    type="button"
                    disabled={!consent}
                    className="
                      mt-6 w-full rounded-full
                      bg-[var(--brand-orange)]
                      px-6 py-3
                      text-sm font-extrabold uppercase tracking-wider text-white
                      transition
                      hover:opacity-90
                      disabled:cursor-not-allowed
                      disabled:opacity-35
                      disabled:hover:opacity-35
                    "
                  >
                    Continue
                  </button>

                  <p className="mt-4 text-xs font-semibold leading-relaxed text-black/45">
                    This page demonstrates the AIM SMS consent experience. The
                    checkbox is intentionally unchecked by default.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Types of messages
              </div>

              <ul className="mt-3 grid gap-2 pl-5 list-disc text-black/70 font-semibold leading-relaxed">
                <li>Account and project invitations</li>
                <li>One-time verification codes</li>
                <li>Project onboarding information</li>
                <li>Account and project-access notifications</li>
              </ul>

              <p className="mt-4 text-black/70 font-semibold leading-relaxed">
                AIM Project Management does not use this SMS program to send
                promotional offers, advertisements, or marketing campaigns.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Message frequency and assistance
              </div>

              <div className="mt-3 grid gap-3 text-black/70 font-semibold leading-relaxed">
                <p>
                  Message frequency varies based on account onboarding,
                  verification activity, invitations, and project-access needs.
                  Message and data rates may apply.
                </p>

                <p>
                  Reply STOP to opt out of future messages. Reply HELP for
                  assistance.
                </p>

                <p>
                  For additional support, email{" "}
                  <a
                    href="mailto:support@aimconstructionmgt.com?subject=SMS%20Support"
                    className="font-extrabold text-[var(--brand-orange)] hover:opacity-90"
                  >
                    support@aimconstructionmgt.com
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Mobile information and consent
              </div>

              <p className="mt-3 text-black/70 font-semibold leading-relaxed">
                Mobile information, text-messaging originator opt-in data, and
                SMS consent will not be sold, rented, shared, or transferred to
                third parties, affiliates, or lead generators for marketing or
                promotional purposes.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-[var(--sand)]/10 p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.22em] font-extrabold text-black/50">
                Related policies
              </div>

              <p className="mt-3 text-black/70 font-semibold leading-relaxed">
                Additional information about data handling, user rights, and
                platform usage is available in our Privacy Policy and Terms of
                Use.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/privacy"
                  className="rounded-full bg-[var(--brand-orange)] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white transition hover:opacity-90"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/terms"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-black/70 transition hover:border-[var(--brand-orange)] hover:text-[var(--brand-orange)]"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </FloatSection>
      </section>
    </PageShell>
  );
}
