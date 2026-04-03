"use client";
import {
  CreditCard,
  Download,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Shield,
} from "lucide-react";

const INVOICES = [
  { id: "INV-3042", date: "Mar 14, 2026", amount: 299, status: "paid" as const, card: "4242" },
  { id: "INV-2891", date: "Feb 14, 2026", amount: 299, status: "paid" as const, card: "4242" },
  { id: "INV-2710", date: "Jan 14, 2026", amount: 179, status: "paid" as const, card: "4242" },
];

const statusConfig = {
  paid: { label: "Paid", icon: CheckCircle2, color: "text-[#1B4332]", bg: "bg-[#D8F3DC]" },
  pending: { label: "Pending", icon: Clock, color: "text-amber-700", bg: "bg-amber-50" },
};

export default function BillingPage() {
  const totalPaid = INVOICES.reduce((s, inv) => s + inv.amount, 0);

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-1">Billing</h1>
        <p className="text-sm text-[#8A8A8A]">Manage your subscription and payment method</p>
      </div>

      {/* Plan + Payment grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Current Plan */}
        <div className="bg-white rounded-2xl border border-[#E8E2D6] p-6 hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider">Current Plan</div>
            <span className="text-[10px] font-bold text-[#1B4332] bg-[#D8F3DC] px-2.5 py-1 rounded-full uppercase tracking-wider">Active</span>
          </div>
          <div className="text-base font-bold text-[#1A1A1A] mb-2">Semaglutide Injection</div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="font-mono text-4xl font-bold text-[#1B4332]">$299</span>
            <span className="text-sm text-[#8A8A8A]">/month</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#8A8A8A] mb-5">
            <Calendar className="w-3.5 h-3.5" />
            Next billing: <strong className="text-[#1A1A1A]">Apr 14, 2026</strong>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E8E2D6]">
            <button className="px-4 py-2 text-sm font-semibold border border-[#E8E2D6] rounded-xl text-[#1A1A1A] hover:border-[#95D5B2] hover:bg-[#D8F3DC]/30 transition-all">
              Change Plan
            </button>
            <button className="px-4 py-2 text-sm font-semibold border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-all">
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-[#E8E2D6] p-6 hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
          <div className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider mb-4">Payment Method</div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FBF8F3] border border-[#E8E2D6] mb-4">
            <div className="w-14 h-9 rounded-lg bg-gradient-to-br from-[#1a1f71] to-[#2d4bb5] flex items-center justify-center shadow-sm">
              <span className="text-white text-[10px] font-bold tracking-wider">VISA</span>
            </div>
            <div className="flex-1">
              <div className="font-mono font-semibold text-sm text-[#1A1A1A]">**** **** **** 4242</div>
              <div className="text-xs text-[#8A8A8A]">Expires 12/2027</div>
            </div>
            <CreditCard className="w-5 h-5 text-[#8A8A8A]" />
          </div>
          <button className="px-4 py-2 text-sm font-semibold border border-[#E8E2D6] rounded-xl text-[#1A1A1A] hover:border-[#95D5B2] hover:bg-[#D8F3DC]/30 transition-all">
            Update Card
          </button>
          <div className="flex items-center gap-1.5 mt-4 text-[11px] text-[#8A8A8A]">
            <Shield className="w-3 h-3" />
            Payments secured by Stripe. We never store your card details.
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl border border-[#E8E2D6] overflow-hidden hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <h3 className="font-bold text-[#1A1A1A] text-[15px]">Payment History</h3>
          <span className="font-mono text-xs text-[#8A8A8A]">
            Total: <strong className="text-[#1A1A1A]">${totalPaid.toLocaleString()}.00</strong>
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider border-y border-[#E8E2D6]">
                <th className="py-3 px-6">Invoice</th>
                <th className="py-3">Date</th>
                <th className="py-3 text-right">Amount</th>
                <th className="py-3 pl-6">Status</th>
                <th className="py-3">Card</th>
                <th className="py-3 pr-6"></th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv, i) => {
                const status = statusConfig[inv.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={i} className="border-b border-[#E8E2D6]/60 last:border-0 hover:bg-[#FBF8F3] transition-colors">
                    <td className="py-4 px-6 font-mono text-sm text-blue-600 font-medium">{inv.id}</td>
                    <td className="py-4 text-sm text-[#1A1A1A]">{inv.date}</td>
                    <td className="py-4 text-sm text-right font-mono font-bold text-[#1A1A1A]">${inv.amount}.00</td>
                    <td className="py-4 pl-6">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${status.color} ${status.bg} px-2.5 py-1 rounded-full`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="py-4 font-mono text-sm text-[#8A8A8A]">**** {inv.card}</td>
                    <td className="py-4 pr-6">
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#8A8A8A] hover:text-[#1B4332] border border-[#E8E2D6] px-3 py-1.5 rounded-lg hover:border-[#95D5B2] transition-all">
                        <Download className="w-3 h-3" />
                        Receipt
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden px-4 pb-4 space-y-3">
          {INVOICES.map((inv, i) => {
            const status = statusConfig[inv.status];
            const StatusIcon = status.icon;
            return (
              <div key={i} className="p-4 rounded-xl bg-[#FBF8F3] border border-[#E8E2D6]/60">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-mono text-xs text-blue-600 font-medium">{inv.id}</span>
                    <div className="text-sm text-[#1A1A1A] mt-0.5">{inv.date}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${status.color} ${status.bg} px-2 py-0.5 rounded-full`}>
                    <StatusIcon className="w-2.5 h-2.5" />
                    {status.label}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-lg font-bold text-[#1A1A1A]">${inv.amount}.00</span>
                  <button className="flex items-center gap-1 text-xs font-semibold text-[#8A8A8A] hover:text-[#1B4332] transition-colors">
                    <Download className="w-3 h-3" />
                    Receipt
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
