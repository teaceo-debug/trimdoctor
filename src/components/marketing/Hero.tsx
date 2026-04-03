"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-green-50/80 via-white to-amber-50/40">
      {/* Decorative blurs */}
      <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-brand-500/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 pt-28 relative z-10">
        <div className="max-w-[720px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-500 rounded-full text-[13px] font-semibold tracking-wide uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            Now Accepting New Patients
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[56px] md:text-[64px] leading-[1.08] text-gray-900 tracking-tight mb-6">
            Lose weight with <br />
            <span className="shimmer-text">clinically proven</span> <br />
            GLP-1 medication
          </h1>

          {/* Subhead */}
          <p className="text-[19px] leading-relaxed text-gray-500 max-w-[520px] mb-10">
            Doctor-prescribed compounded semaglutide delivered to your door.
            No insurance needed. No waiting rooms. Starting at{" "}
            <strong className="text-gray-900">$179/month</strong>.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap mb-12">
            <Link href="/assessment" className="btn-primary">
              Start Your Assessment <span>→</span>
            </Link>
            <a href="#how-it-works" className="btn-outline">
              Learn More
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex gap-8 flex-wrap text-gray-500 text-sm">
            {[
              { icon: "🛡️", text: "Board-certified physicians" },
              { icon: "🚚", text: "Free discreet shipping" },
              { icon: "💬", text: "24/7 provider messaging" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-gray-200">
          {[
            { value: "100K+", label: "Patients treated" },
            { value: "25 lbs", label: "Avg. weight lost in 3 months" },
            { value: "4.7★", label: "Patient satisfaction" },
            { value: "48 hrs", label: "Prescription turnaround" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-serif text-4xl text-brand-500 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
