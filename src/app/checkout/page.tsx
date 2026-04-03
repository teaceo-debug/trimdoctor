"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Shield, Lock, CreditCard, Check, ArrowRight, Package,
  Truck, Clock, BadgeCheck, Syringe, Tablets, Star,
} from "lucide-react";

// ─── Logo ─────────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1B4332" />
        <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".92" />
        <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520" />
      </svg>
      <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">
        TrimDoctor
      </span>
    </Link>
  );
}

// ─── Plan config ──────────────────────────────────────
const PLANS: Record<string, {
  name: string;
  desc: string;
  price: number;
  ongoing: number;
  icon: typeof Syringe;
  features: string[];
}> = {
  semaglutide_injection: {
    name: "Semaglutide Injection",
    desc: "Weekly subcutaneous injection",
    price: 179,
    ongoing: 299,
    icon: Syringe,
    features: [
      "Compounded semaglutide vial",
      "Syringes & supplies included",
      "Physician consultation",
      "24/7 care messaging",
      "Free priority shipping",
    ],
  },
  semaglutide_tablets: {
    name: "Semaglutide Tablets",
    desc: "Daily oral tablet",
    price: 149,
    ongoing: 249,
    icon: Tablets,
    features: [
      "Oral semaglutide tablets",
      "Easy daily dosing",
      "Physician consultation",
      "24/7 care messaging",
      "Free shipping",
    ],
  },
  tirzepatide_injection: {
    name: "Tirzepatide Injection",
    desc: "Dual-action GLP-1/GIP weekly injection",
    price: 249,
    ongoing: 399,
    icon: Syringe,
    features: [
      "Dual-action GLP-1/GIP",
      "Compounded tirzepatide vial",
      "Physician consultation",
      "24/7 care messaging",
      "Free priority shipping",
    ],
  },
};

// ─── Checkout Form ────────────────────────────────────
function CheckoutForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "semaglutide_injection";
  const success = searchParams.get("checkout") === "success";
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const selected = PLANS[plan] || PLANS.semaglutide_injection;
  const PlanIcon = selected.icon;

  const handlePay = async () => {
    setProcessing(true);
    setError("");
    try {
      const res = await fetch("/api/billing/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong");
        setProcessing(false);
      }
    } catch {
      setError("Failed to connect. Please try again.");
      setProcessing(false);
    }
  };

  // ─── Success State ──────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBF8F3] via-[#F5F0E8] to-[#D8F3DC]/30 p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[22px] border border-[#EDE6D9] p-9 sm:p-10 shadow-xl shadow-black/[0.03] text-center anim-up">
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-[#D8F3DC] flex items-center justify-center mx-auto mb-6 anim-scale-in">
              <Check size={36} className="text-[#1B4332]" strokeWidth={2.5} />
            </div>

            <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1A1A1A] mb-2">
              Payment Successful!
            </h2>
            <p className="text-[#8A8A8A] mb-6 text-[15px]">Your order has been confirmed</p>

            {/* Order details */}
            <div className="bg-[#F5F0E8] rounded-2xl p-5 mb-6 text-left">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8A8A8A]">Plan</span>
                  <span className="font-semibold text-[#1A1A1A]">{selected.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8A8A]">Charged today</span>
                  <span className="font-mono font-bold text-[#1B4332]">${selected.price}.00</span>
                </div>
                <div className="border-t border-[#EDE6D9] pt-3 flex justify-between">
                  <span className="text-[#8A8A8A]">Next steps</span>
                  <span className="font-semibold text-[#1B4332]">Physician review (24-48 hrs)</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#8A8A8A] mb-6 leading-relaxed">
              A confirmation email has been sent. Your physician will review your profile within 24-48 hours.
            </p>

            <Link href="/portal" className="btn-primary w-full justify-center">
              Go to Patient Portal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Checkout View ──────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8F3] via-[#F5F0E8] to-[#D8F3DC]/20 p-6 relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#1B4332]/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A] font-medium">
            <Lock size={12} />
            <span>Secured by Stripe</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[22px] border border-[#EDE6D9] overflow-hidden shadow-xl shadow-black/[0.03]">
          {/* Medication header */}
          <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] p-6 sm:p-7 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                <PlanIcon size={24} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-widest text-[#95D5B2] mb-1">
                  Your Plan
                </div>
                <h2 className="font-serif text-xl font-bold mb-1">{selected.name}</h2>
                <p className="text-sm text-white/70">{selected.desc}</p>
              </div>
            </div>
          </div>

          {/* Order breakdown */}
          <div className="p-6 sm:p-7">
            {/* Features */}
            <div className="mb-6">
              <div className="text-[11px] font-bold text-[#DAA520] uppercase tracking-widest mb-3">
                What&apos;s Included
              </div>
              <div className="space-y-2.5">
                {selected.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#D8F3DC] flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#1B4332]" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-[#3D3D3D]">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className="bg-[#F5F0E8] rounded-2xl p-5 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8A8A8A]">Medication + Consultation</span>
                  <span className="font-mono font-semibold text-[#1A1A1A]">${selected.price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A8A8A]">Shipping</span>
                  <span className="font-mono font-semibold text-[#40916C]">FREE</span>
                </div>
                <div className="border-t border-[#EDE6D9] pt-3 flex justify-between items-center">
                  <span className="font-bold text-[#1A1A1A] text-base">Total today</span>
                  <span className="font-mono font-bold text-xl text-[#1B4332]">${selected.price}.00</span>
                </div>
              </div>
              <p className="text-xs text-[#8A8A8A] mt-3">
                Then ${selected.ongoing}/month. Cancel anytime.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-4 flex items-center gap-2 border border-red-100">
                <span className="text-red-400">&#9888;</span>
                {error}
              </div>
            )}

            {/* Pay button */}
            <button
              onClick={handlePay}
              disabled={processing}
              className="btn-primary w-full justify-center text-base py-4"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Redirecting to Stripe...
                </span>
              ) : (
                <>
                  <CreditCard size={18} />
                  Pay ${selected.price}.00
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="text-xs text-[#8A8A8A] text-center mt-4 leading-relaxed">
              You&apos;ll be redirected to Stripe&apos;s secure checkout to complete payment.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
            {[
              { icon: Shield, text: "HIPAA Compliant" },
              { icon: Lock, text: "256-bit SSL" },
              { icon: CreditCard, text: "PCI-DSS Certified" },
              { icon: BadgeCheck, text: "FDA-Regulated Pharmacy" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[#B0A898]">
                <badge.icon size={14} strokeWidth={1.5} />
                <span className="text-[11px] font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Satisfaction */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#DAA520" className="text-[#DAA520]" />
            ))}
          </div>
          <p className="text-xs text-[#8A8A8A]">
            Rated 4.8/5 by 100,000+ patients
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
          <div className="w-8 h-8 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutForm />
    </Suspense>
  );
}
