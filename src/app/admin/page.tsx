"use client";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-white">TrimDoctor</span>
              <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">ADMIN</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-semibold">LIVE</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {[
            { label: "Revenue Today", value: "$48.7K", color: "text-green-400" },
            { label: "New Patients", value: "47", color: "text-cyan-400" },
            { label: "Active Subs", value: "14,892", color: "text-white" },
            { label: "Churn Rate", value: "16.8%", color: "text-amber-400" },
            { label: "AI Resolution", value: "82.4%", color: "text-purple-400" },
            { label: "ROAS", value: "3.9x", color: "text-blue-400" },
          ].map((m, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{m.label}</div>
              <div className={`font-mono text-2xl font-bold ${m.color}`}>{m.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Pipeline */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-bold text-white text-sm mb-4">Patient Pipeline</h3>
            {[
              { stage: "Intake", count: 34, color: "bg-blue-500" },
              { stage: "Under Review", count: 28, color: "bg-amber-500" },
              { stage: "Approved", count: 22, color: "bg-green-500" },
              { stage: "At Pharmacy", count: 18, color: "bg-purple-500" },
              { stage: "Shipped", count: 31, color: "bg-cyan-500" },
              { stage: "Active", count: 67, color: "bg-green-400" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <span className="text-xs text-gray-500 w-24">{s.stage}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.count / 67) * 100}%` }} />
                </div>
                <span className="font-mono text-xs text-white w-8 text-right">{s.count}</span>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-bold text-white text-sm mb-4">Recent Activity</h3>
            {[
              { time: "2m", event: "New patient signup", detail: "Sarah Chen — Semaglutide Inj.", dot: "bg-green-400" },
              { time: "5m", event: "Prescription approved", detail: "Marcus Rivera — Dr. Williams", dot: "bg-blue-400" },
              { time: "8m", event: "Order shipped", detail: "ORD-20041 — Belmar → TX", dot: "bg-purple-400" },
              { time: "12m", event: "AI resolved ticket", detail: "TK-5022 — Shipping inquiry", dot: "bg-cyan-400" },
              { time: "15m", event: "Payment received", detail: "$299 — Emily Watson (Mo 4)", dot: "bg-green-400" },
              { time: "18m", event: "Ticket escalated", detail: "TK-5019 — Side effects", dot: "bg-amber-400" },
              { time: "22m", event: "Subscription cancelled", detail: "Nina Williams — Mo 3", dot: "bg-red-400" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${a.dot}`} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-white">{a.event}</span>
                    <span className="text-[10px] text-gray-500">{a.time} ago</span>
                  </div>
                  <span className="text-[11px] text-gray-500">{a.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fulfillment */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-4">
          <h3 className="font-bold text-white text-sm mb-4">Fulfillment Status</h3>
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "Pending Rx", count: 24, icon: "📋", color: "text-amber-400" },
              { label: "Compounding", count: 18, icon: "⚗️", color: "text-purple-400" },
              { label: "QC Check", count: 12, icon: "🔬", color: "text-blue-400" },
              { label: "Shipped", count: 31, icon: "📦", color: "text-cyan-400" },
              { label: "Delivered", count: 45, icon: "✅", color: "text-green-400" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 bg-gray-800/50 rounded-xl">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className={`font-mono text-2xl font-bold ${s.color}`}>{s.count}</div>
                <div className="text-[10px] text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
