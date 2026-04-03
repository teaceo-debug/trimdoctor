"use client";
import { useState } from "react";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText("https://trimdoctor.com/ref/MICHAEL50"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Refer & Earn</h1>
      <p className="text-sm text-gray-500 mb-6">Give $50, get $50 for every friend who joins</p>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-dashed border-brand-500 rounded-2xl p-8 text-center mb-6">
        <div className="text-5xl mb-4">💰</div>
        <h2 className="font-serif text-3xl text-gray-900 mb-2">Give $50, Get $50</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">Share your link. When a friend signs up and pays, you both get $50 off.</p>
        <div className="flex gap-2 max-w-md mx-auto">
          <div className="flex-1 px-4 py-3 rounded-xl bg-white border-2 border-brand-500 font-mono text-sm font-semibold text-gray-900">
            trimdoctor.com/ref/MICHAEL50
          </div>
          <button onClick={copy} className="btn-primary px-6 py-3 text-sm">
            {copied ? "Copied! ✓" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { value: "3", label: "Friends Referred", color: "text-brand-500" },
          { value: "$150", label: "Total Earned", color: "text-amber-500" },
          { value: "$50", label: "Per Referral", color: "text-blue-500" },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
            <div className={`font-mono text-3xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-gray-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Referral History</h3>
        {[
          { name: "Sarah M.", date: "Mar 12", status: "Credit Applied", amount: "$50" },
          { name: "Derek J.", date: "Feb 28", status: "Credit Applied", amount: "$50" },
          { name: "Chloe W.", date: "Feb 15", status: "Credit Applied", amount: "$50" },
        ].map((r, i) => (
          <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
            <div>
              <div className="font-semibold text-sm text-gray-900">{r.name}</div>
              <div className="text-xs text-gray-400">Signed up {r.date}</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">{r.status}</span>
              <div className="font-mono text-sm font-semibold text-brand-500 mt-1">{r.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
