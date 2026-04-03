"use client";
import { useState } from "react";
import {
  Gift,
  Copy,
  Check,
  Users,
  DollarSign,
  Sparkles,
  Share2,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

const REFERRALS = [
  { name: "Sarah M.", date: "Mar 12, 2026", status: "credited" as const, amount: "$50" },
  { name: "Derek J.", date: "Feb 28, 2026", status: "credited" as const, amount: "$50" },
  { name: "Chloe W.", date: "Feb 15, 2026", status: "credited" as const, amount: "$50" },
];

const statusConfig = {
  credited: { label: "Credit Applied", icon: CheckCircle2, color: "text-[#1B4332]", bg: "bg-[#D8F3DC]" },
  pending: { label: "Pending", icon: Clock, color: "text-amber-700", bg: "bg-amber-50" },
};

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const refLink = "https://trimdoctor.com/ref/MICHAEL50";
  const refCode = "MICHAEL50";

  const copyLink = () => {
    navigator.clipboard?.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-1">Refer & Earn</h1>
        <p className="text-sm text-[#8A8A8A]">Share the journey and earn rewards together</p>
      </div>

      {/* Hero card */}
      <div className="relative bg-gradient-to-br from-[#D8F3DC]/80 via-white to-blue-50/60 border-2 border-dashed border-[#95D5B2] rounded-2xl p-6 sm:p-8 text-center mb-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-6 text-[#95D5B2]/30">
          <Sparkles className="w-16 h-16" />
        </div>

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1B4332]/20">
            <Gift className="w-7 h-7 text-white" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2">
            Give <span className="text-[#DAA520]">$50</span>, Get <span className="text-[#DAA520]">$50</span>
          </h2>
          <p className="text-[#8A8A8A] text-sm max-w-md mx-auto mb-6">
            Share your personal link. When a friend signs up and completes their first payment, you both receive $50 off.
          </p>

          {/* Referral link */}
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <div className="flex-1 flex items-center px-4 py-3 rounded-xl bg-white border-2 border-[#1B4332] font-mono text-sm font-semibold text-[#1A1A1A] overflow-hidden">
              <span className="truncate">trimdoctor.com/ref/{refCode}</span>
            </div>
            <button
              onClick={copyLink}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                copied
                  ? "bg-[#D8F3DC] text-[#1B4332] border-2 border-[#95D5B2]"
                  : "bg-[#1B4332] text-white hover:bg-[#2D6A4F] border-2 border-[#1B4332]"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          {/* Share options */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-xs text-[#8A8A8A]">Share via</span>
            {["Twitter", "Facebook", "Email"].map((platform) => (
              <button
                key={platform}
                className="text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] hover:underline underline-offset-2 transition-colors"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: "3", label: "Friends Referred", icon: Users, color: "text-[#1B4332]", iconBg: "bg-[#D8F3DC]", iconColor: "text-[#2D6A4F]" },
          { value: "$150", label: "Total Earned", icon: DollarSign, color: "text-[#DAA520]", iconBg: "bg-amber-50", iconColor: "text-[#DAA520]" },
          { value: "$50", label: "Per Referral", icon: Sparkles, color: "text-blue-600", iconBg: "bg-blue-50", iconColor: "text-blue-500" },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E8E2D6] p-5 text-center hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
            <div className={`w-9 h-9 rounded-xl ${m.iconBg} flex items-center justify-center mx-auto mb-3`}>
              <m.icon className={`w-4 h-4 ${m.iconColor}`} />
            </div>
            <div className={`font-mono text-2xl sm:text-3xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-[11px] text-[#8A8A8A] mt-1 font-medium">{m.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-[#FBF8F3] rounded-2xl border border-[#E8E2D6] p-6 mb-6">
        <h3 className="font-bold text-[#1A1A1A] text-[15px] mb-4">How It Works</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
          {[
            { step: "1", text: "Share your unique link" },
            { step: "2", text: "Friend signs up & pays" },
            { step: "3", text: "You both get $50 off" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#1B4332] flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0">
                {s.step}
              </div>
              <span className="text-sm text-[#1A1A1A] font-medium">{s.text}</span>
              {i < 2 && <ArrowRight className="hidden sm:block w-4 h-4 text-[#8A8A8A] ml-auto" />}
            </div>
          ))}
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-2xl border border-[#E8E2D6] overflow-hidden hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <h3 className="font-bold text-[#1A1A1A] text-[15px]">Referral History</h3>
          <span className="font-mono text-xs text-[#8A8A8A]">
            <strong className="text-[#1B4332]">{REFERRALS.length}</strong> referrals
          </span>
        </div>

        <div className="px-6 pb-4 space-y-0">
          {REFERRALS.map((r, i) => {
            const status = statusConfig[r.status];
            const StatusIcon = status.icon;
            return (
              <div key={i} className="flex justify-between items-center py-4 border-b border-[#E8E2D6]/60 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D8F3DC] to-[#95D5B2] flex items-center justify-center text-[#1B4332] text-xs font-bold">
                    {r.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1A1A1A]">{r.name}</div>
                    <div className="text-xs text-[#8A8A8A]">Signed up {r.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${status.color} ${status.bg} px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1B4332]">{r.amount}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
