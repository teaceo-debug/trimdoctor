"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "semaglutide_injection";
  const success = searchParams.get("checkout") === "success";
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const plans: Record<string, { name: string; price: number; ongoing: number }> = {
    semaglutide_injection: { name: "Semaglutide Injection", price: 179, ongoing: 299 },
    semaglutide_tablets: { name: "Semaglutide Tablets", price: 149, ongoing: 249 },
    tirzepatide_injection: { name: "Tirzepatide Injection", price: 249, ongoing: 399 },
  };
  const selected = plans[plan] || plans.semaglutide_injection;

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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">
        <div className="bg-white rounded-3xl border border-gray-200 p-10 max-w-md w-full shadow-xl text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-gray-900 mb-3">Payment Successful!</h2>
          <p className="text-gray-500 mb-2">Order confirmed</p>
          <div className="bg-gray-50 rounded-xl p-5 my-6 text-left text-sm">
            <div className="flex justify-between mb-2"><span className="text-gray-500">Plan</span><span className="font-semibold">{selected.name}</span></div>
            <div className="flex justify-between mb-2"><span className="text-gray-500">Charged today</span><span className="font-mono font-semibold">${selected.price}.00</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Next steps</span><span className="font-semibold text-brand-500">Physician review (24-48 hrs)</span></div>
          </div>
          <p className="text-sm text-gray-500 mb-6">A confirmation email has been sent. Your physician will review your profile within 24-48 hours.</p>
          <Link href="/portal" className="btn-primary w-full justify-center">Go to Patient Portal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">
      <div className="bg-white rounded-3xl border border-gray-200 p-10 max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-serif text-xl text-gray-900">TrimDoctor</span>
          </div>
          <span className="text-xs text-gray-400">Secured by Stripe</span>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-5 mb-7">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Order Summary</div>
          <div className="font-bold text-gray-900 mb-1">{selected.name}</div>
          <div className="text-xs text-gray-500 mb-4">Monthly subscription — First month introductory rate</div>
          <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span>Medication + Consultation</span><span className="font-mono">${selected.price}.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="font-mono text-brand-500">FREE</span></div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
              <span>Total today</span><span className="font-mono text-brand-500">${selected.price}.00</span>
            </div>
            <div className="text-xs text-gray-400">Then ${selected.ongoing}/month. Cancel anytime.</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={processing}
          className={`btn-primary w-full justify-center text-base py-4 ${processing ? "opacity-70 cursor-wait" : ""}`}
        >
          {processing ? "Redirecting to Stripe..." : `Pay $${selected.price}.00`}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          You&apos;ll be redirected to Stripe&apos;s secure checkout to complete payment.
        </p>

        <div className="flex justify-center gap-5 mt-5">
          {["HIPAA Compliant", "256-bit SSL", "PCI-DSS"].map((b, i) => (
            <span key={i} className="text-[11px] text-gray-400">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
