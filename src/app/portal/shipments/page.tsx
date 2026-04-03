"use client";

export default function ShipmentsPage() {
  const steps = ["Rx Sent", "Compounding", "QC Check", "Shipping", "Delivered"];
  const currentStep = 1; // 0-indexed, "Compounding" active

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Shipments</h1>
      <p className="text-sm text-gray-500 mb-6">Track your medication deliveries</p>

      {/* Current Order */}
      <div className="bg-white rounded-2xl border-2 border-brand-500 p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-brand-500 bg-brand-50 px-2 py-0.5 rounded mb-2 inline-block">Upcoming</span>
            <h3 className="text-lg font-bold text-gray-900">April — Semaglutide 1.0mg/mL</h3>
            <p className="text-sm text-gray-500">New dosage per Dr. Williams</p>
          </div>
          <span className="font-mono text-sm font-semibold text-brand-500">Preparing</span>
        </div>

        <div className="flex gap-0 mb-4">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`h-1 rounded-full mb-2 ${i <= currentStep ? "bg-brand-500" : "bg-gray-200"}`} />
              <span className={`text-xs ${i <= currentStep ? "text-brand-500 font-semibold" : "text-gray-400"}`}>{step}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500">Estimated delivery: <strong className="text-gray-900">Apr 8-10, 2026</strong></p>
      </div>

      {/* Past Orders */}
      {[
        { id: "ORD-10234", date: "Mar 12", med: "Semaglutide 0.5mg/mL", delivered: "Mar 16", tracking: "1Z999AA10123456784" },
        { id: "ORD-10189", date: "Feb 12", med: "Semaglutide 0.25mg/mL", delivered: "Feb 16", tracking: "1Z999AA10123456721" },
        { id: "ORD-10098", date: "Jan 14", med: "Semaglutide 0.25mg/mL", delivered: "Jan 18", tracking: "1Z999AA10123456698" },
      ].map((order, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 mb-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-blue-500">{order.id}</span>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">Delivered</span>
              </div>
              <div className="font-semibold text-sm text-gray-900">{order.med}</div>
              <div className="text-xs text-gray-400">Belmar Pharma — Delivered {order.delivered}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[11px] text-gray-400">{order.tracking}</div>
              <div className="text-xs text-gray-400">Ordered {order.date}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
