"use client";
import { useState } from "react";
import {
  Package,
  FileText,
  FlaskConical,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  Clock,
} from "lucide-react";

const STEPS = [
  { label: "Rx Sent", icon: FileText },
  { label: "Compounding", icon: FlaskConical },
  { label: "QC Check", icon: ShieldCheck },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: CheckCircle2 },
];

const PAST_ORDERS = [
  { id: "ORD-10234", date: "Mar 12, 2026", med: "Semaglutide 0.5mg/mL", delivered: "Mar 16, 2026", tracking: "1Z999AA10123456784", pharmacy: "Belmar Pharma" },
  { id: "ORD-10189", date: "Feb 12, 2026", med: "Semaglutide 0.25mg/mL", delivered: "Feb 16, 2026", tracking: "1Z999AA10123456721", pharmacy: "Belmar Pharma" },
  { id: "ORD-10098", date: "Jan 14, 2026", med: "Semaglutide 0.25mg/mL", delivered: "Jan 18, 2026", tracking: "1Z999AA10123456698", pharmacy: "Belmar Pharma" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-[11px] font-medium text-[#8A8A8A] hover:text-[#1B4332] transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-[#1B4332]" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function ShipmentsPage() {
  const currentStep = 1; // 0-indexed: "Compounding" is active

  // Step color logic
  const stepColor = (i: number) => {
    if (i < currentStep) return "completed";
    if (i === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-1">Shipments</h1>
        <p className="text-sm text-[#8A8A8A]">Track your medication deliveries</p>
      </div>

      {/* Current Order */}
      <div className="bg-white rounded-2xl border-2 border-[#1B4332] p-6 mb-6 relative overflow-hidden">
        {/* Subtle top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#95D5B2]" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Preparing
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A]">April — Semaglutide 1.0mg/mL</h3>
            <p className="text-sm text-[#8A8A8A]">New dosage per Dr. Williams &middot; Belmar Pharma Solutions</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-sm text-[#8A8A8A]">
              <MapPin className="w-3.5 h-3.5" />
              Est. delivery
            </div>
            <div className="font-semibold text-[#1A1A1A] text-sm">Apr 8-10, 2026</div>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-[#E8E2D6] mx-[10%]" />
          <div
            className="absolute top-5 left-0 h-[2px] bg-[#1B4332] mx-[10%] transition-all duration-500"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 80}%` }}
          />

          <div className="relative flex justify-between">
            {STEPS.map((step, i) => {
              const state = stepColor(i);
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2 z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      state === "completed"
                        ? "bg-[#1B4332] border-[#1B4332] text-white"
                        : state === "active"
                        ? "bg-amber-50 border-amber-400 text-amber-600 shadow-md shadow-amber-100"
                        : "bg-white border-[#E8E2D6] text-[#8A8A8A]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[11px] font-medium text-center max-w-[60px] leading-tight ${
                      state === "completed"
                        ? "text-[#1B4332] font-semibold"
                        : state === "active"
                        ? "text-amber-700 font-semibold"
                        : "text-[#8A8A8A]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Past Orders */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-[#1A1A1A] text-[15px]">Past Orders</h3>
        <span className="text-xs text-[#8A8A8A]">{PAST_ORDERS.length} deliveries</span>
      </div>

      <div className="space-y-3">
        {PAST_ORDERS.map((order, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E8E2D6] p-5 hover:shadow-md hover:shadow-black/[0.03] transition-all">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs text-blue-600 font-medium">{order.id}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1B4332] bg-[#D8F3DC] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Delivered
                  </span>
                </div>
                <div className="font-semibold text-sm text-[#1A1A1A]">{order.med}</div>
                <div className="text-xs text-[#8A8A8A] mt-0.5">
                  {order.pharmacy} &middot; Delivered {order.delivered}
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#8A8A8A] bg-[#FBF8F3] px-2 py-1 rounded border border-[#E8E2D6]">
                    {order.tracking}
                  </span>
                  <CopyButton text={order.tracking} />
                </div>
                <span className="text-[11px] text-[#8A8A8A]">Ordered {order.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
