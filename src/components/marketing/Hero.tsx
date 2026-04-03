"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Shield, Truck, MessageCircle, Star, Package } from "lucide-react";

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="font-serif text-[36px] md:text-[40px] text-[#1B4332] font-bold tracking-tight leading-none">
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-[#FBF8F3] via-[#F8F4EE] to-[#D8F3DC]/30">
      {/* Decorative blurs */}
      <div className="absolute -top-[180px] -right-[120px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(27,67,50,0.04)_0%,transparent_70%)]" />
      <div className="absolute -bottom-[100px] -left-[80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(184,134,11,0.04)_0%,transparent_70%)]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-[120px] pb-16 relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-16 lg:items-center">
          {/* Left Column — Text */}
          <div className="max-w-[680px]">
            {/* Badge */}
            <div className="anim-up inline-flex items-center gap-2 px-[18px] py-2 rounded-full bg-[#1B4332]/[0.06] border border-[#1B4332]/10 mb-7">
              <div
                className="w-[7px] h-[7px] rounded-full bg-[#40916C]"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="text-[12px] font-bold text-[#1B4332] tracking-[1.5px] uppercase">
                Now Accepting New Patients
              </span>
            </div>

            {/* Headline */}
            <h1 className="anim-up anim-d1 font-serif text-[42px] sm:text-[52px] md:text-[62px] leading-[1.06] text-[#1A1A1A] tracking-tight mb-6 font-bold">
              Doctor-guided
              <br />
              weight loss,
              <br />
              <span className="shimmer-text">delivered.</span>
            </h1>

            {/* Subheadline */}
            <p className="anim-up anim-d2 text-[17px] md:text-[19px] leading-[1.75] text-[#8A8A8A] max-w-[480px] mb-10">
              Compounded GLP-1 medication prescribed by board-certified
              physicians. Shipped to your door. No insurance needed. Starting at{" "}
              <strong className="text-[#1A1A1A] font-bold font-mono">
                $179/month
              </strong>
              .
            </p>

            {/* CTAs */}
            <div className="anim-up anim-d3 flex gap-3.5 flex-wrap mb-12">
              <Link
                href="/assessment"
                className="btn-primary text-[17px] !px-11 !py-5"
              >
                Start Your Free Assessment
              </Link>
              <a href="#how-it-works" className="btn-outline">
                See How It Works
              </a>
            </div>

            {/* Trust signals */}
            <div className="anim-up anim-d4 flex gap-7 flex-wrap">
              {[
                { icon: <Shield size={20} />, text: "Board-certified physicians" },
                { icon: <Truck size={20} />, text: "Free discreet shipping" },
                { icon: <MessageCircle size={20} />, text: "24/7 care team access" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[#8A8A8A] text-[13px] font-medium"
                >
                  <span className="text-[#40916C]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Bento Grid (desktop only) */}
          <div className="hidden lg:grid grid-cols-2 gap-3 anim-up anim-d3">
            {/* Large card — Doctor-Guided Care */}
            <div className="col-span-2 bento-card rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#52B788] p-7 flex flex-col justify-end min-h-[160px]">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={20} className="text-white/70" strokeWidth={1.5} />
                <span className="text-[11px] font-bold text-white/50 tracking-[1.5px] uppercase">
                  Your Care Team
                </span>
              </div>
              <h3 className="font-serif text-[26px] text-white font-bold leading-tight">
                Doctor-Guided Care
              </h3>
              <p className="text-[13px] text-white/50 mt-1 leading-relaxed">
                Board-certified physicians review every plan
              </p>
            </div>

            {/* Trustpilot-style rating card */}
            <div className="col-span-2 bento-card rounded-2xl bg-gradient-to-r from-[#0D3B2E] to-[#1B6B4A] p-5 flex items-center gap-4">
              <div className="flex flex-col items-center shrink-0">
                <span className="font-serif text-[28px] text-white font-bold leading-none">
                  4.8
                </span>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="#DAA520" stroke="none" />
                  ))}
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <span className="text-[14px] font-bold text-white">Excellent</span>
                <p className="text-[12px] text-white/40 mt-0.5">
                  7,147 verified patient reviews
                </p>
              </div>
            </div>

            {/* Stats card — Success Rate */}
            <div className="bento-card rounded-2xl bg-[#FBF8F3] border border-[#E8E3DA] p-5 flex flex-col justify-between min-h-[140px]">
              <span className="text-[11px] font-bold text-[#8A8A8A] tracking-[1px] uppercase">
                Success Rate
              </span>
              <div>
                <span className="font-serif text-[32px] text-[#1B4332] font-bold leading-none">
                  97.8%
                </span>
                {/* Patient avatar row */}
                <div className="flex -space-x-2 mt-3">
                  {["#DAA520", "#40916C", "#52B788", "#1B4332", "#8A8A8A"].map(
                    (color, j) => (
                      <div
                        key={j}
                        className="w-7 h-7 rounded-full border-2 border-[#FBF8F3]"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                  <div className="w-7 h-7 rounded-full border-2 border-[#FBF8F3] bg-[#E8E3DA] flex items-center justify-center">
                    <span className="text-[9px] font-bold text-[#8A8A8A]">
                      +99k
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Shipping card */}
            <div className="bento-card rounded-2xl bg-[#D8F3DC] p-5 flex flex-col items-center justify-center text-center min-h-[140px]">
              <Package
                size={28}
                className="text-[#1B4332] mb-2"
                strokeWidth={1.5}
              />
              <span className="text-[15px] font-bold text-[#1B4332]">
                Free Shipping
              </span>
              <span className="text-[11px] text-[#40916C] mt-0.5">
                Discreet packaging
              </span>
            </div>

            {/* Pricing card */}
            <div className="col-span-2 bento-card rounded-2xl bg-white border border-[#E8E3DA] p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#8A8A8A] tracking-[1px] uppercase">
                  Starting at
                </span>
                <div className="font-mono text-[28px] text-[#1B4332] font-bold leading-tight mt-0.5">
                  $179<span className="text-[16px] text-[#8A8A8A] font-semibold">/mo</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-full bg-[#1B4332]/[0.06] text-[12px] font-bold text-[#1B4332]">
                No insurance needed
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="anim-up anim-d5 grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-[#E8E3DA]">
          <div>
            <div className="flex items-center gap-1.5">
              <AnimatedNumber target={100000} suffix="+" />
            </div>
            <div className="text-[13px] text-[#8A8A8A] mt-1 font-medium">
              Patients treated
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <AnimatedNumber target={25} suffix=" lbs" />
            </div>
            <div className="text-[13px] text-[#8A8A8A] mt-1 font-medium">
              Avg. lost in 3 months
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <AnimatedNumber target={4} suffix=".8" />
              <Star size={15} fill="#DAA520" stroke="none" className="mt-1" />
            </div>
            <div className="text-[13px] text-[#8A8A8A] mt-1 font-medium">
              Patient satisfaction
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <AnimatedNumber target={48} suffix=" hrs" />
            </div>
            <div className="text-[13px] text-[#8A8A8A] mt-1 font-medium">
              Prescription turnaround
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
