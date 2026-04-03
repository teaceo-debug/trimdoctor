"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Semaglutide Tablets",
    subtitle: "Needle-Free",
    firstMonth: 149,
    ongoing: 249,
    savings: "Save vs. $1,200+/mo brand-name",
    features: [
      "Oral semaglutide tablets",
      "Easy daily dosing",
      "Licensed physician consultation",
      "24/7 care team messaging",
      "Free standard shipping",
    ],
    featured: false,
  },
  {
    name: "Semaglutide Injection",
    subtitle: "Most Popular",
    firstMonth: 179,
    ongoing: 299,
    savings: "Save vs. $1,500+/mo brand-name",
    features: [
      "Compounded semaglutide vial",
      "Syringes & supplies included",
      "Licensed physician consultation",
      "24/7 care team messaging",
      "Free priority shipping",
      "Monthly dosage optimization",
    ],
    featured: true,
  },
  {
    name: "Tirzepatide Injection",
    subtitle: "Maximum Results",
    firstMonth: 249,
    ongoing: 399,
    savings: "Save vs. $1,100+/mo brand-name",
    features: [
      "Dual-action GLP-1/GIP",
      "Compounded tirzepatide vial",
      "Licensed physician consultation",
      "24/7 care team messaging",
      "Free priority shipping",
      "Enhanced weight loss potential",
    ],
    featured: false,
  },
];

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

export default function Pricing() {
  const sectionRef = useScrollReveal();

  return (
    <section id="pricing" className="py-[120px] px-6 md:px-8 bg-[#FBF8F3]">
      <div ref={sectionRef} className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-[72px]">
          <div className="animate-on-scroll">
            <div className="gold-divider mb-5" />
          </div>
          <h2 className="animate-on-scroll stagger-1 font-serif text-[36px] md:text-[44px] text-[#1A1A1A] tracking-tight font-bold">
            Transparent Pricing
          </h2>
          <p className="animate-on-scroll stagger-2 text-[#8A8A8A] mt-3 text-[17px] max-w-md mx-auto">
            No hidden fees. No insurance required. Cancel anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} ${
                plan.featured ? "featured-card p-[2px]" : ""
              }`}
            >
              <div
                className={`card-lift h-full flex flex-col p-8 md:p-10 rounded-3xl bg-white ${
                  plan.featured ? "" : "border border-[#E8E3DA]"
                }`}
              >
                {/* Subtitle badge */}
                <div className="text-[11px] font-extrabold text-[#DAA520] tracking-[2px] uppercase mb-1.5">
                  {plan.subtitle}
                </div>
                <h3 className="text-[20px] font-bold text-[#1A1A1A] mb-6">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-[13px] text-[#8A8A8A]">
                    First month
                  </span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-mono text-[48px] md:text-[52px] font-bold text-[#1B4332] tracking-tight leading-none">
                      ${plan.firstMonth}
                    </span>
                    <span className="text-[#8A8A8A] text-[14px]">/mo</span>
                  </div>
                </div>
                <div className="text-[13px] text-[#8A8A8A] mb-2">
                  Then ${plan.ongoing}/month
                </div>
                <div className="text-[11px] font-semibold text-[#40916C] bg-[#D8F3DC] rounded-full px-3 py-1 inline-flex w-fit mb-7 pb-1">
                  {plan.savings}
                </div>
                <div className="border-b border-[#E8E3DA] mb-7" />

                {/* Features */}
                <div className="flex flex-col gap-3.5 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2.5 text-[14px] text-[#3D3D3D]"
                    >
                      <Check
                        size={18}
                        className="text-[#40916C] flex-shrink-0"
                        strokeWidth={2.5}
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/assessment"
                  className={`w-full justify-center text-center ${
                    plan.featured ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Get Started <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-[13px] text-[#8A8A8A] mt-10 max-w-lg mx-auto">
          All plans include a licensed physician consultation. If you are not
          approved, you will not be charged.
        </p>
      </div>
    </section>
  );
}
