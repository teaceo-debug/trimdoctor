"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronUp } from "lucide-react";

const sections = [
  { id: "platform-services", title: "I. Platform Services vs. Healthcare Services" },
  { id: "eligibility", title: "II. Eligibility" },
  { id: "account", title: "III. Your Account" },
  { id: "billing", title: "IV. Billing & Subscriptions" },
  { id: "compounded-medications", title: "V. Compounded Medications" },
  { id: "telehealth-consent", title: "VI. Telehealth Consent" },
  { id: "intellectual-property", title: "VII. Intellectual Property" },
  { id: "limitation-liability", title: "VIII. Limitation of Liability" },
  { id: "arbitration", title: "IX. Mandatory Arbitration" },
  { id: "termination", title: "X. Termination" },
  { id: "contact", title: "XI. Contact" },
];

export default function TermsPage() {
  const [activeId, setActiveId] = useState<string>("");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF8F3" }}>
      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: "#1B4332", color: "#FBF8F3" }}
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors hover:opacity-80"
          style={{ color: "#1B4332" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-12 xl:gap-16">
          {/* ── Sidebar TOC (sticky on desktop) ────────── */}
          <aside className="hidden lg:block">
            <nav className="sticky top-8">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#DAA520" }}
              >
                On this page
              </p>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="block text-[13px] py-1.5 pl-3 border-l-2 transition-all"
                      style={{
                        borderColor:
                          activeId === s.id ? "#1B4332" : "transparent",
                        color: activeId === s.id ? "#1B4332" : "#6B7280",
                        fontWeight: activeId === s.id ? 600 : 400,
                      }}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ── Content ────────────────────────────────── */}
          <main className="max-w-3xl">
            <header className="mb-10">
              <h1
                className="text-4xl lg:text-5xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "#1A1A1A",
                }}
              >
                Terms of Service
              </h1>
              <p
                className="text-sm"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "#9CA3AF",
                }}
              >
                Last updated: April 1, 2026
              </p>
            </header>

            <div style={{ fontFamily: "var(--font-sans)" }}>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#4B5563" }}>
                This User Agreement (collectively with TrimDoctor&apos;s{" "}
                <Link href="/legal/privacy" className="underline underline-offset-2" style={{ color: "#1B4332" }}>
                  Privacy Policy
                </Link>
                ) applies to your use of all sites and services offered by TrimDoctor, LLC
                (&quot;TrimDoctor,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), a Delaware limited liability company
                located at 131 Continental Dr, Suite 305, Newark, DE 19713.
              </p>

              {/* Section I */}
              <section id="platform-services" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  I. Platform Services vs. Healthcare Services
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  TrimDoctor provides a technology platform that facilitates access to telehealth
                  services.{" "}
                  <strong style={{ color: "#1A1A1A" }}>
                    TrimDoctor does not provide medical care and is not licensed to practice
                    medicine.
                  </strong>{" "}
                  Medical evaluations, prescriptions, and treatment decisions are made solely by
                  independently licensed healthcare providers contracted through our partner
                  network.
                </p>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  TrimDoctor&apos;s role is limited to: operating the digital platform, patient
                  intake coordination, administrative support, customer service, billing and
                  payment processing, and communication facilitation between patients and
                  providers.
                </p>
              </section>

              {/* Section II */}
              <section id="eligibility" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  II. Eligibility
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  To use our Services, you must:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] mb-4" style={{ color: "#4B5563" }}>
                  <li>Be at least 18 years of age</li>
                  <li>Reside in the United States in a state where Services are available</li>
                  <li>Be capable of forming a binding contract</li>
                  <li>Agree to be legally bound by these Terms</li>
                </ul>
              </section>

              {/* Section III */}
              <section id="account" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  III. Your Account
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  You are responsible for maintaining the confidentiality of your account
                  credentials and for all activities that occur under your account. You must
                  provide accurate, current, and complete information during registration. You
                  agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              {/* Section IV */}
              <section id="billing" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  IV. Billing & Subscriptions
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  By subscribing to a TrimDoctor plan, you authorize us to charge your payment
                  method on a recurring monthly basis. Your first month may be charged at a
                  promotional rate. Subsequent months will be charged at the standard plan rate.
                  You may cancel at any time through your patient portal.
                </p>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  Refunds are issued at TrimDoctor&apos;s discretion. If a provider determines
                  you are not eligible for treatment, you will receive a full refund of any
                  medication charges.
                </p>
              </section>

              {/* Section V */}
              <section id="compounded-medications" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  V. Compounded Medications
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  Medications dispensed through TrimDoctor are compounded by FDA-regulated
                  compounding pharmacies. While produced in regulated facilities, compounded
                  medications are not FDA-approved as finished products. The decision to prescribe
                  compounded medications is made by your licensed provider based on medical
                  judgment.
                </p>
              </section>

              {/* Section VI */}
              <section id="telehealth-consent" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  VI. Telehealth Consent
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  By using our platform, you consent to receiving healthcare services via
                  telehealth. You understand that telehealth consultations may have limitations
                  compared to in-person visits and that your provider may recommend in-person
                  evaluation when clinically appropriate.
                </p>
              </section>

              {/* Section VII */}
              <section id="intellectual-property" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  VII. Intellectual Property
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  All content on the TrimDoctor platform, including text, graphics, logos, and
                  software, is the property of TrimDoctor, LLC or its licensors. You may not
                  reproduce, distribute, or create derivative works without our written consent.
                </p>
              </section>

              {/* Section VIII */}
              <section id="limitation-liability" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  VIII. Limitation of Liability
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  To the maximum extent permitted by law, TrimDoctor shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages arising from
                  your use of the platform. Our total liability shall not exceed the amount paid
                  by you in the twelve (12) months preceding the claim.
                </p>
              </section>

              {/* Section IX */}
              <section id="arbitration" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  IX. Mandatory Arbitration
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  Any dispute arising from these Terms shall be resolved through binding
                  arbitration in accordance with the rules of the American Arbitration
                  Association. You agree to waive your right to a jury trial and to participate in
                  any class action lawsuit.
                </p>
              </section>

              {/* Section X */}
              <section id="termination" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  X. Termination
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  We may terminate or suspend your account at any time for violation of these
                  Terms. Upon termination, your right to use the platform ceases immediately. Any
                  provisions that by their nature should survive termination shall survive,
                  including limitations of liability and arbitration provisions.
                </p>
              </section>

              {/* Section XI */}
              <section id="contact" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  XI. Contact
                </h2>
                <div
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "#F5F0E8", border: "1px solid #E8E0D4" }}
                >
                  <p className="text-[15px] mb-2" style={{ color: "#4B5563" }}>
                    <strong style={{ color: "#1A1A1A" }}>Email:</strong>{" "}
                    help@trimdoctor.com
                  </p>
                  <p className="text-[15px] mb-2" style={{ color: "#4B5563" }}>
                    <strong style={{ color: "#1A1A1A" }}>Phone:</strong>{" "}
                    (323) 690-1564
                  </p>
                  <p className="text-[15px]" style={{ color: "#4B5563" }}>
                    <strong style={{ color: "#1A1A1A" }}>Address:</strong>{" "}
                    TrimDoctor, LLC &middot; 131 Continental Dr, Suite 305, Newark, DE 19713
                  </p>
                </div>
              </section>

              {/* Disclaimer */}
              <div
                className="rounded-2xl p-5 text-xs"
                style={{
                  backgroundColor: "#FEF3C7",
                  border: "1px solid #FDE68A",
                  color: "#92400E",
                }}
              >
                <p className="font-semibold mb-1">Legal Disclaimer</p>
                <p>
                  This is a template document. Have a licensed healthcare attorney review and
                  customize these terms before publication.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
