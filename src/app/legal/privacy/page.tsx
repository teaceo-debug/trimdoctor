"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronUp } from "lucide-react";

const sections = [
  { id: "information-collected", title: "I. Information We Collect" },
  { id: "how-we-use", title: "II. How We Use Your Information" },
  { id: "phi", title: "III. Protected Health Information" },
  { id: "data-sharing", title: "IV. Data Sharing & Third Parties" },
  { id: "data-security", title: "V. Data Security" },
  { id: "your-rights", title: "VI. Your Rights" },
  { id: "ccpa", title: "VII. California Residents (CCPA)" },
  { id: "cookies", title: "VIII. Cookies & Tracking" },
  { id: "children", title: "IX. Children's Privacy" },
  { id: "changes", title: "X. Changes to This Policy" },
  { id: "contact", title: "XI. Contact" },
];

export default function PrivacyPage() {
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
                Privacy Policy
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
                TrimDoctor, LLC (&quot;TrimDoctor,&quot; &quot;we,&quot; &quot;us&quot;) is
                committed to protecting your privacy. This policy describes how we collect, use,
                and protect your personal and health information when you use our platform and
                services. This policy should be read in conjunction with our{" "}
                <Link href="/legal/terms" className="underline underline-offset-2" style={{ color: "#1B4332" }}>
                  Terms of Service
                </Link>
                .
              </p>

              {/* Section I */}
              <section id="information-collected" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  I. Information We Collect
                </h2>
                <h3 className="text-base font-semibold mb-2" style={{ color: "#1A1A1A" }}>
                  Personal Information
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  Name, email, phone number, date of birth, mailing address, and payment
                  information provided during registration and checkout.
                </p>
                <h3 className="text-base font-semibold mb-2" style={{ color: "#1A1A1A" }}>
                  Protected Health Information (PHI)
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  Medical history, current medications, health conditions, weight, height, BMI,
                  and other health data submitted during your assessment and ongoing treatment.
                </p>
                <h3 className="text-base font-semibold mb-2" style={{ color: "#1A1A1A" }}>
                  Usage Data
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  IP address, browser type, device information, pages visited, and interactions
                  with our platform, collected via cookies and analytics tools.
                </p>
              </section>

              {/* Section II */}
              <section id="how-we-use" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  II. How We Use Your Information
                </h2>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: "#4B5563" }}>
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] mb-4" style={{ color: "#4B5563" }}>
                  <li>Facilitate medical consultations with licensed providers</li>
                  <li>Process prescriptions and coordinate pharmacy fulfillment</li>
                  <li>Manage billing and subscriptions</li>
                  <li>Provide customer support</li>
                  <li>Send transactional and safety-related communications</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </section>

              {/* Section III */}
              <section id="phi" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  III. Protected Health Information (PHI)
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  Your PHI is handled in accordance with HIPAA regulations. We maintain Business
                  Associate Agreements (BAAs) with all vendors who access PHI, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] mb-4" style={{ color: "#4B5563" }}>
                  <li>Our physician network (OpenLoop Health)</li>
                  <li>Compounding pharmacies (Belmar Pharmacy)</li>
                  <li>Cloud hosting provider (AWS)</li>
                  <li>Payment processor (Stripe)</li>
                </ul>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  PHI is encrypted at rest (AES-256) and in transit (TLS 1.3). Access to PHI is
                  logged in our HIPAA audit trail. We conduct regular security assessments and
                  maintain incident response procedures.
                </p>
              </section>

              {/* Section IV */}
              <section id="data-sharing" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  IV. Data Sharing & Third Parties
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  We do not sell your personal information. We may share data with third parties
                  only as necessary to provide our services, comply with legal obligations, or
                  protect our rights. All third-party service providers are bound by
                  confidentiality agreements and, where applicable, BAAs.
                </p>
              </section>

              {/* Section V */}
              <section id="data-security" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  V. Data Security
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  We implement industry-standard security measures including encryption, access
                  controls, regular security audits, and employee training. While no system is
                  100% secure, we take reasonable and appropriate steps to protect your
                  information.
                </p>
              </section>

              {/* Section VI */}
              <section id="your-rights" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  VI. Your Rights
                </h2>
                <p className="text-[15px] leading-relaxed mb-3" style={{ color: "#4B5563" }}>
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[15px] mb-4" style={{ color: "#4B5563" }}>
                  <li>Access your health records</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your data (subject to legal retention requirements)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Receive an accounting of disclosures of your PHI</li>
                  <li>
                    File a complaint with the U.S. Department of Health and Human Services (HHS)
                    if you believe your privacy rights have been violated
                  </li>
                </ul>
              </section>

              {/* Section VII */}
              <section id="ccpa" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  VII. California Residents (CCPA)
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  If you are a California resident, you have additional rights under the
                  California Consumer Privacy Act, including the right to know what personal
                  information we collect, the right to delete, and the right to opt out of the
                  sale of personal information. We do not sell your personal information.
                </p>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  To exercise your CCPA rights, contact us at privacy@trimdoctor.com. We will
                  respond within 45 days as required by law.
                </p>
              </section>

              {/* Section VIII */}
              <section id="cookies" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  VIII. Cookies & Tracking
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  We use essential cookies for platform functionality and optional analytics
                  cookies to improve our services. You can manage cookie preferences through your
                  browser settings. Disabling essential cookies may affect platform functionality.
                </p>
              </section>

              {/* Section IX */}
              <section id="children" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  IX. Children&apos;s Privacy
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  Our services are not intended for individuals under 18 years of age. We do not
                  knowingly collect personal information from children. If we become aware that
                  we have collected data from a minor, we will take steps to delete it promptly.
                </p>
              </section>

              {/* Section X */}
              <section id="changes" className="mb-10 scroll-mt-20">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#1A1A1A" }}
                >
                  X. Changes to This Policy
                </h2>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4B5563" }}>
                  We may update this Privacy Policy from time to time. We will notify you of
                  material changes via email or through a notice on our platform. Your continued
                  use of the services after changes constitutes acceptance of the updated policy.
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
                    <strong style={{ color: "#1A1A1A" }}>Privacy questions:</strong>{" "}
                    privacy@trimdoctor.com
                  </p>
                  <p className="text-[15px] mb-2" style={{ color: "#4B5563" }}>
                    <strong style={{ color: "#1A1A1A" }}>General support:</strong>{" "}
                    help@trimdoctor.com
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
                  customize this privacy policy before publication.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
