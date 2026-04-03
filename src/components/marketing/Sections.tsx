"use client";
import { useState } from "react";

// ─── HOW IT WORKS ─────────────────────────────────────────
export function HowItWorks() {
  const steps = [
    { num: "01", title: "Complete Your Assessment", desc: "Answer a few health questions online. Takes about 5 minutes — no appointment needed." },
    { num: "02", title: "Physician Review", desc: "A U.S.-licensed doctor reviews your health profile and determines if GLP-1 medication is right for you." },
    { num: "03", title: "Get Your Medication", desc: "Your compounded semaglutide is prepared by a licensed pharmacy and shipped directly to your door." },
    { num: "04", title: "Ongoing Support", desc: "Unlimited messaging with your care team, monthly check-ins, and dosage adjustments as needed." },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-500 rounded-full text-[13px] font-semibold tracking-wide uppercase mb-4">
            Simple Process
          </div>
          <h2 className="font-serif text-[44px] text-gray-900 tracking-tight">How it works</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[13px] font-bold text-gold tracking-wider">{step.num}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2.5">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────
const faqs = [
  { q: "How does compounded semaglutide differ from brand-name Ozempic?", a: "Compounded semaglutide contains the same active ingredient as Ozempic and Wegovy. It's produced by FDA-regulated compounding pharmacies. While the active ingredient is identical, compounded versions are not FDA-approved as finished products. Your physician will discuss the specific risks and benefits during your consultation." },
  { q: "Do I need insurance?", a: "No insurance is required. All pricing is transparent and paid out-of-pocket. No prior authorizations, no coverage denials, no surprise bills." },
  { q: "How quickly will I receive my medication?", a: "Most patients receive their prescription within 48 hours of physician approval. Medications typically arrive within 3-5 business days via priority shipping at no additional cost." },
  { q: "What if I'm not approved?", a: "If our physician determines GLP-1 medication isn't appropriate for you, you won't be charged. Approval depends on meeting medical criteria during your evaluation." },
  { q: "Can I cancel at any time?", a: "Absolutely. No long-term contracts or commitments. Cancel through your patient portal or by contacting support." },
  { q: "What side effects should I expect?", a: "Common side effects include nausea, decreased appetite, and occasional digestive discomfort. These typically subside within the first few weeks. Your care team is available 24/7 to help manage any side effects." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-500 rounded-full text-[13px] font-semibold tracking-wide uppercase mb-4">
            FAQ
          </div>
          <h2 className="font-serif text-[44px] text-gray-900 tracking-tight">Common questions</h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 py-5 cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex justify-between items-center gap-4">
                <h3 className="text-[17px] font-semibold text-gray-900">{faq.q}</h3>
                <span className={`text-2xl text-brand-500 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </div>
              <div className={`overflow-hidden transition-all duration-400 ${open === i ? "max-h-48 pt-3" : "max-h-0"}`}>
                <p className="text-[15px] leading-relaxed text-gray-500">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="py-24 px-6 bg-gray-900 relative overflow-hidden">
      <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="font-serif text-5xl text-white tracking-tight mb-4">Ready to transform your health?</h2>
        <p className="text-lg text-gray-400 max-w-md mx-auto mb-10">
          Join over 100,000 patients who have started their weight loss journey with physician-guided GLP-1 therapy.
        </p>
        <a href="/assessment" className="btn-primary text-lg px-10 py-5">Start Your Free Assessment <span>→</span></a>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-serif text-xl text-white">TrimDoctor</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/legal/hipaa" className="hover:text-white transition-colors">HIPAA Notice</a>
            <a href="mailto:help@trimdoctor.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <p className="text-xs text-gray-600 max-w-4xl leading-relaxed">
          TrimDoctor, LLC provides the digital platform, patient intake, and administrative coordination. Medical evaluations and prescribing decisions are conducted by independently licensed healthcare providers. TrimDoctor does not provide medical care and is not licensed to practice medicine. Compounded medications are produced in FDA-regulated facilities but are not FDA-approved. Results may vary. This is not medical advice.
        </p>
      </div>
    </footer>
  );
}
