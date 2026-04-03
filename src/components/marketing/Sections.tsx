"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Stethoscope,
  Package,
  HeartPulse,
  Star,
  ChevronDown,
  Shield,
  Lock,
  Check,
} from "lucide-react";

// ─── Scroll Reveal Hook ──────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) {
      el.querySelectorAll(".animate-on-scroll").forEach((child) =>
        observer.observe(child)
      );
    }
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── MARQUEE TICKER ─────────────────────────────────────
const marqueeItems = [
  "Affordable pricing",
  "No hidden fees",
  "Personalized to your needs",
  "Ongoing support",
  "FDA-regulated pharmacies",
  "Unlimited provider messaging",
  "Free shipping",
  "Cancel anytime",
];

export function MarqueeTicker() {
  return (
    <section className="py-4 bg-[#F5F0E8] overflow-hidden">
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-4 shrink-0">
              <span className="w-[6px] h-[6px] rounded-full bg-[#1B4332]" />
              <span className="text-[14px] font-semibold text-[#1B4332]/80 tracking-wide whitespace-nowrap">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF BAR ────────────────────────────────────
export function SocialProof() {
  return (
    <section className="py-8 px-6 bg-white border-b border-[#E8E3DA]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-8 md:gap-12 flex-wrap">
        <span className="text-[11px] font-semibold text-[#8A8A8A] tracking-[2px] uppercase">
          As seen in
        </span>
        {["Forbes Health", "Healthline", "GQ", "Women&apos;s Health", "USA Today"].map(
          (pub, i) => (
            <span
              key={i}
              className="text-[15px] font-bold text-black/[0.12] tracking-wide"
            >
              {pub}
            </span>
          )
        )}
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Complete Your Assessment",
    desc: "Answer a few health questions online. Takes about 5 minutes — no appointment needed. We screen for eligibility before you pay.",
    icon: ClipboardList,
  },
  {
    num: "02",
    title: "Physician Review",
    desc: "A U.S.-licensed, board-certified doctor reviews your profile within 48 hours and creates a personalized treatment plan.",
    icon: Stethoscope,
  },
  {
    num: "03",
    title: "Medication Delivered",
    desc: "Your compounded GLP-1 medication is prepared by an FDA-regulated pharmacy and shipped free, directly to your door.",
    icon: Package,
  },
  {
    num: "04",
    title: "Ongoing Support",
    desc: "Unlimited messaging with your care team. Monthly check-ins. Dosage adjustments. We're with you every step of the way.",
    icon: HeartPulse,
  },
];

export function HowItWorks() {
  const sectionRef = useScrollReveal();

  return (
    <section id="how-it-works" className="py-[120px] px-6 md:px-8 bg-white">
      <div ref={sectionRef} className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[72px]">
          <div className="animate-on-scroll">
            <div className="gold-divider mb-5" />
          </div>
          <h2 className="animate-on-scroll stagger-1 font-serif text-[36px] md:text-[44px] text-[#1A1A1A] tracking-tight font-bold">
            How TrimDoctor Works
          </h2>
          <p className="animate-on-scroll stagger-2 text-[#8A8A8A] mt-3 text-[17px] max-w-[460px] mx-auto">
            From assessment to your doorstep in as little as 5 days.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`animate-on-scroll stagger-${i + 1} card-lift p-8 md:p-9 rounded-3xl bg-[#FBF8F3] border border-[#E8E3DA]`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[12px] font-extrabold text-[#DAA520] tracking-[2px]">
                    {step.num}
                  </span>
                  <Icon size={28} className="text-[#40916C]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[19px] font-bold text-[#1A1A1A] mb-2.5 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.75] text-[#8A8A8A]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────
const reviews = [
  {
    name: "Sarah M.",
    lost: "32 lbs in 3 months",
    text: "The process was so easy. I had my medication within a week and the support team has been incredible every step of the way. I finally feel like myself again.",
    rating: 5,
  },
  {
    name: "James R.",
    lost: "28 lbs in 10 weeks",
    text: "I was skeptical about online prescriptions, but my doctor was thorough and genuinely cared about my health goals. Best decision I've made in years.",
    rating: 5,
  },
  {
    name: "Maria L.",
    lost: "45 lbs in 5 months",
    text: "The needle-free tablets changed everything for me. No injections, just a daily pill. And the price compared to what my insurance wanted? No contest.",
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-[120px] px-6 md:px-8 bg-white">
      <div ref={sectionRef} className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[72px]">
          <div className="animate-on-scroll">
            <div className="gold-divider mb-5" />
          </div>
          <h2 className="animate-on-scroll stagger-1 font-serif text-[36px] md:text-[44px] text-[#1A1A1A] tracking-tight font-bold">
            Real Patients, Real Results
          </h2>
          <p className="animate-on-scroll stagger-2 text-[#8A8A8A] mt-3 text-[17px]">
            Individual results may vary. These are self-reported outcomes.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} card-lift relative p-9 rounded-3xl border border-[#E8E3DA] bg-[#FBF8F3]`}
            >
              {/* Decorative quote */}
              <span className="absolute top-3 left-6 font-serif text-[72px] text-[#1B4332]/[0.06] leading-none select-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(review.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={15}
                    fill="#DAA520"
                    stroke="none"
                  />
                ))}
              </div>

              <p className="text-[15px] leading-[1.75] text-[#3D3D3D] mb-6 relative z-10">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-[15px] text-[#1A1A1A]">
                    {review.name}
                  </div>
                  <div className="text-[12px] text-[#8A8A8A]">
                    Verified Patient
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[#D8F3DC] text-[#1B4332] text-[12px] font-bold">
                  {review.lost}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────
const faqs = [
  {
    q: "How does compounded semaglutide differ from brand-name Ozempic?",
    a: "Compounded semaglutide uses the same active ingredient as Ozempic and Wegovy. It's produced by FDA-regulated compounding pharmacies. While the active ingredient is identical, compounded versions are not FDA-approved as finished products. Your physician will discuss the specific risks and benefits.",
  },
  {
    q: "Do I need insurance?",
    a: "No. All pricing is transparent and paid out-of-pocket. No prior authorizations, no coverage denials, no surprise bills. Many patients find our pricing significantly lower than brand-name alternatives, even with insurance.",
  },
  {
    q: "How quickly will I receive my medication?",
    a: "Most prescriptions are reviewed within 48 hours. Once approved, medication ships priority and typically arrives within 3-5 business days. Total time from assessment to medication in hand: about 5-7 days.",
  },
  {
    q: "What if I'm not approved for medication?",
    a: "If our physician determines GLP-1 medication isn't appropriate for your health profile, you won't be charged. Approval is based on meeting specific medical criteria during your evaluation.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No long-term contracts, no commitments. Cancel anytime through your patient portal or by contacting our care team. We also offer a free 30-day pause if you just need a break.",
  },
  {
    q: "What side effects should I expect?",
    a: "The most common side effects include mild nausea, decreased appetite, and occasional digestive discomfort. These typically subside within the first 1-2 weeks as your body adjusts. Your care team is available 24/7 to help manage any side effects.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useScrollReveal();

  return (
    <section id="faq" className="py-[120px] px-6 md:px-8 bg-[#FBF8F3]">
      <div ref={sectionRef} className="max-w-[720px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[72px]">
          <div className="animate-on-scroll">
            <div className="gold-divider mb-5" />
          </div>
          <h2 className="animate-on-scroll stagger-1 font-serif text-[36px] md:text-[44px] text-[#1A1A1A] tracking-tight font-bold">
            Common Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="animate-on-scroll border-b border-[#E8E3DA] cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="flex justify-between items-center gap-4 py-6">
                  <h3 className="text-[17px] font-semibold text-[#1A1A1A] leading-[1.4]">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`text-[#1B4332] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="text-[15px] leading-[1.75] text-[#8A8A8A] pb-6">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────
export function CTASection() {
  return (
    <section className="py-[120px] px-6 md:px-8 bg-[#1B4332] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
      <div className="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(218,165,32,0.06)_0%,transparent_70%)]" />

      <div className="max-w-[700px] mx-auto text-center relative z-10">
        <h2 className="font-serif text-[36px] md:text-[48px] text-white tracking-tight leading-[1.1] mb-4 font-bold">
          Ready to start your
          <br />
          weight loss journey?
        </h2>
        <p className="text-[18px] text-white/50 max-w-[460px] mx-auto mb-10 leading-[1.7]">
          Join over 100,000 patients who trust TrimDoctor for physician-guided
          GLP-1 weight loss therapy.
        </p>
        <Link
          href="/assessment"
          className="btn-primary !bg-white !text-[#1B4332] hover:!bg-white/90 text-[18px] !px-12 !py-5"
        >
          Start Your Free Assessment
        </Link>

        {/* Sub-trust signals */}
        <div className="flex justify-center gap-6 md:gap-8 mt-10 flex-wrap">
          {[
            "No credit card required",
            "5-minute assessment",
            "48-hour physician review",
          ].map((text, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-[13px] text-white/35 font-medium"
            >
              <Check size={14} strokeWidth={2.5} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────
export function Footer() {
  const footerLinks = {
    Product: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
      { label: "Get Started", href: "/assessment" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "mailto:help@trimdoctor.com" },
      { label: "Careers", href: "/careers" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "HIPAA Notice", href: "/legal/hipaa" },
      { label: "Refund Policy", href: "/legal/refunds" },
    ],
  };

  return (
    <footer className="bg-[#1A1A1A] pt-16 pb-10 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Top: Logo + Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Logo Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="#1B4332" />
                <path
                  d="M10 10h4v16h10v4H10V10z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <path
                  d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z"
                  fill="#DAA520"
                />
              </svg>
              <span className="font-serif text-[18px] text-white font-bold">
                TrimDoctor
              </span>
            </div>
            <p className="text-[14px] text-white/30 leading-relaxed max-w-[280px]">
              Doctor-guided weight loss, delivered. Compounded GLP-1 medication
              from board-certified physicians.
            </p>
            {/* Compliance badges */}
            <div className="flex gap-3 mt-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06]">
                <Shield size={14} className="text-[#40916C]" />
                <span className="text-[11px] text-white/40 font-semibold">
                  HIPAA Compliant
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06]">
                <Lock size={14} className="text-[#40916C]" />
                <span className="text-[11px] text-white/40 font-semibold">
                  256-bit SSL
                </span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12px] font-bold text-white/50 tracking-[1.5px] uppercase mb-4">
                {category}
              </h4>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13px] text-white/30 hover:text-white/60 transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/[0.06] pt-8">
          <p className="text-[11px] leading-[1.9] text-white/[0.15] max-w-[900px]">
            TrimDoctor, LLC provides the digital platform, patient intake, and
            administrative coordination. Medical evaluations and prescribing
            decisions are conducted by independently licensed healthcare
            providers through our partner network. TrimDoctor does not provide
            medical care and is not licensed to practice medicine. Compounded
            medications are produced in FDA-regulated facilities but are not
            FDA-approved as finished products. Individual results may vary. This
            website does not provide medical advice.
          </p>
          <p className="text-[11px] text-white/[0.12] mt-4">
            &copy; 2026 TrimDoctor, LLC &middot; All rights reserved &middot;
            trimdoctor.com
          </p>
        </div>
      </div>
    </footer>
  );
}
