"use client";
import Link from "next/link";

const plans = [
  {
    name: "Semaglutide Injection",
    subtitle: "Most Popular",
    firstMonth: 179,
    ongoing: 299,
    features: ["Compounded semaglutide vial", "Syringes & supplies included", "Licensed physician consultation", "24/7 provider messaging", "Free priority shipping", "Monthly dosage adjustments"],
    featured: true,
  },
  {
    name: "Semaglutide Tablets",
    subtitle: "Needle-Free",
    firstMonth: 149,
    ongoing: 249,
    features: ["Oral semaglutide tablets", "Easy daily dosing", "Licensed physician consultation", "24/7 provider messaging", "Free standard shipping", "Monthly check-ins"],
    featured: false,
  },
  {
    name: "Tirzepatide Injection",
    subtitle: "Dual-Action",
    firstMonth: 249,
    ongoing: 399,
    features: ["Compounded tirzepatide vial", "GLP-1 + GIP dual receptor", "Licensed physician consultation", "24/7 provider messaging", "Free priority shipping", "Enhanced weight loss potential"],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-500 rounded-full text-[13px] font-semibold tracking-wide uppercase mb-4">
            Transparent Pricing
          </div>
          <h2 className="font-serif text-[44px] text-gray-900 tracking-tight">Choose your plan</h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">No hidden fees. No insurance required. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-3xl border-2 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                plan.featured ? "border-brand-500" : "border-gray-200"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-gold rounded-t-3xl" />
              )}
              <div className="text-xs font-bold text-gold uppercase tracking-wider mb-2">{plan.subtitle}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-5">{plan.name}</h3>

              <div className="mb-2">
                <span className="text-sm text-gray-500">First month</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-5xl text-brand-500">${plan.firstMonth}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-7 pb-7 border-b border-gray-200">
                Then ${plan.ongoing}/month
              </div>

              <div className="flex flex-col gap-3.5 mb-8">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.667 5L7.5 14.167 3.333 10" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>

              <Link
                href="/assessment"
                className={`w-full justify-center ${plan.featured ? "btn-primary" : "btn-outline"}`}
              >
                Get Started <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
