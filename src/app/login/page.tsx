"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const verify = searchParams.get("verify");
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(!!verify);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("postmark", { email, callbackUrl, redirect: false });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">
      <div className="bg-white rounded-3xl border border-gray-200 p-10 max-w-md w-full shadow-xl">
        <div className="flex items-center gap-2.5 mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-serif text-xl text-gray-900">TrimDoctor</span>
          </Link>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-gray-900 mb-3">Check your email</h2>
            <p className="text-gray-500 text-sm">
              We sent a sign-in link to <strong>{email || "your email"}</strong>.
              Click the link to access your patient portal.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-brand-500 text-sm font-semibold mt-6 hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-3xl text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500 mb-8">Sign in with your email to access your patient portal.</p>

            <form onSubmit={handleSubmit}>
              <label className="text-sm font-semibold text-gray-900 block mb-1.5">Email address</label>
              <input
                type="email"
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-[15px] outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 mb-6"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full justify-center text-base py-4 ${loading ? "opacity-70 cursor-wait" : ""}`}
              >
                {loading ? "Sending link..." : "Send magic link"}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              No password needed. We&apos;ll email you a secure sign-in link.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
