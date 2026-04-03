"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Mail, Lock, Shield, ArrowRight, Sparkles } from "lucide-react";

// ─── Logo ─────────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1B4332" />
        <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".92" />
        <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520" />
      </svg>
      <span className="font-serif text-2xl font-bold text-[#1A1A1A] tracking-tight">
        TrimDoctor
      </span>
    </Link>
  );
}

// ─── Login Form ───────────────────────────────────────
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBF8F3] via-[#F5F0E8] to-[#D8F3DC]/30 p-6 relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#1B4332]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-gradient-radial from-[#DAA520]/[0.04] to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Card */}
        <div className="bg-white rounded-[22px] border border-[#EDE6D9] p-9 sm:p-10 shadow-xl shadow-black/[0.03]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          {sent ? (
            /* ─── Check Your Email State ───────────── */
            <div className="text-center anim-scale-in">
              {/* Animated mail icon */}
              <div className="w-20 h-20 rounded-full bg-[#D8F3DC] flex items-center justify-center mx-auto mb-6 anim-mail-bounce">
                <Mail size={34} className="text-[#1B4332]" strokeWidth={1.5} />
              </div>

              <h2 className="font-serif text-[28px] text-[#1A1A1A] mb-3 leading-tight">
                Check your email
              </h2>
              <p className="text-[#8A8A8A] text-[15px] leading-relaxed mb-2">
                We sent a secure sign-in link to
              </p>
              <p className="font-semibold text-[#1B4332] text-[15px] mb-6">
                {email || "your email address"}
              </p>

              {/* Tip card */}
              <div className="bg-[#F5F0E8] rounded-xl p-4 text-left mb-6">
                <div className="flex items-start gap-3">
                  <Sparkles size={16} className="text-[#DAA520] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#3D3D3D] font-medium mb-1">
                      Didn&apos;t receive it?
                    </p>
                    <p className="text-xs text-[#8A8A8A] leading-relaxed">
                      Check your spam folder. The link expires in 24 hours for security.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSent(false)}
                className="text-[#40916C] text-sm font-semibold hover:text-[#1B4332] transition-colors"
              >
                Use a different email
              </button>
            </div>
          ) : (
            /* ─── Sign In Form ─────────────────────── */
            <>
              <div className="text-center mb-8">
                <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1A1A1A] mb-2 leading-tight">
                  Welcome back
                </h2>
                <p className="text-[#8A8A8A] text-[15px]">
                  Sign in to access your patient portal
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                  <Mail size={14} className="text-[#40916C]" />
                  Email address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-4 border-2 border-[#EDE6D9] rounded-xl text-[15px] outline-none transition-all focus:border-[#1B4332] focus:shadow-[0_0_0_4px_rgba(27,67,50,0.07)] bg-white text-[#1A1A1A] placeholder-[#8A8A8A] mb-5"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending link...
                    </span>
                  ) : (
                    <>
                      Send magic link
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Trust line */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <Lock size={12} className="text-[#8A8A8A]" />
                <p className="text-xs text-[#8A8A8A]">
                  No password needed. Secure magic link sent to your email.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Trust badges below card */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {[
            { icon: Shield, text: "HIPAA Compliant" },
            { icon: Lock, text: "256-bit Encrypted" },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[#B0A898]">
              <badge.icon size={13} strokeWidth={1.5} />
              <span className="text-[11px] font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
          <div className="w-8 h-8 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
