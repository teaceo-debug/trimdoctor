"use client";

const WEIGHT_LOG = [
  { date: "Jan 14", weight: 238 }, { date: "Jan 21", weight: 236 }, { date: "Jan 28", weight: 234 },
  { date: "Feb 4", weight: 231 }, { date: "Feb 11", weight: 229 }, { date: "Feb 18", weight: 227 },
  { date: "Feb 25", weight: 225 }, { date: "Mar 4", weight: 222 }, { date: "Mar 11", weight: 220 },
  { date: "Mar 18", weight: 218 }, { date: "Mar 25", weight: 216 }, { date: "Apr 1", weight: 214 },
];

export default function PortalDashboard() {
  const start = 238, current = 214, goal = 185;
  const lost = start - current;
  const progressPct = Math.round((lost / (start - goal)) * 100);
  const bmi = (703 * current / (71 * 71)).toFixed(1);
  const minW = Math.min(...WEIGHT_LOG.map(w => w.weight));
  const maxW = Math.max(...WEIGHT_LOG.map(w => w.weight));
  const range = maxW - minW || 1;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Welcome back, Michael</h1>
      <p className="text-sm text-gray-500 mb-6">3 months into your journey — here&apos;s your progress.</p>

      {/* Alert Banner */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200/50 mb-6">
        <span className="text-xl">📦</span>
        <div className="flex-1">
          <span className="font-semibold text-gray-900 text-sm">Your April medication is being prepared</span>
          <span className="text-gray-500 text-sm"> — Est. ship: Apr 5</span>
        </div>
        <span className="text-xs font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">In Progress</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Lost", value: `${lost} lbs`, sub: `${((lost/start)*100).toFixed(1)}% of start`, color: "text-brand-500" },
          { label: "Current", value: `${current} lbs`, sub: `BMI: ${bmi}`, color: "text-gray-900" },
          { label: "Goal", value: `${goal} lbs`, sub: `${start - goal - lost} lbs to go`, color: "text-blue-500" },
          { label: "Progress", value: `${progressPct}%`, sub: "toward goal", color: "text-amber-500" },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{m.label}</div>
            <div className={`font-mono text-3xl font-bold ${m.color}`}>{m.value}</div>
            <div className="text-xs text-gray-400 mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Weight Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Weight Trend</h3>
          <span className="text-xs font-semibold text-brand-500 bg-brand-50 px-3 py-1 rounded-full">↓ {lost} lbs total</span>
        </div>
        <div className="flex items-end gap-1 h-32">
          {WEIGHT_LOG.map((w, i) => {
            const h = ((w.weight - minW + 3) / (range + 6)) * 100;
            const isLast = i === WEIGHT_LOG.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="hidden group-hover:block absolute bottom-full mb-1 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {w.date}: {w.weight} lbs
                </div>
                <div
                  className={`w-full rounded-t transition-all ${isLast ? "bg-brand-500" : "bg-brand-500/30"}`}
                  style={{ height: `${h}%`, minHeight: 4 }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400">
          <span>{WEIGHT_LOG[0].date}</span>
          <span>{WEIGHT_LOG[WEIGHT_LOG.length - 1].date}</span>
        </div>
      </div>

      {/* Treatment + Notifications */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Current Treatment</h3>
          <div className="space-y-3">
            {[
              { label: "Medication", value: "Semaglutide Injection" },
              { label: "Current Dose", value: "0.5mg weekly" },
              { label: "Next Dose", value: "1.0mg (titration scheduled)" },
              { label: "Provider", value: "Dr. Sarah Williams, MD" },
              { label: "Pharmacy", value: "Belmar Pharma Solutions" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-semibold text-gray-900 text-right max-w-[60%]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            {[
              { icon: "📦", text: "April medication being prepared", time: "2h ago" },
              { icon: "📅", text: "Monthly check-in available", time: "1d ago" },
              { icon: "🎉", text: "Milestone: 24 lbs lost!", time: "3d ago" },
              { icon: "💊", text: "Dosage increase approved: 0.5→1.0mg", time: "5d ago" },
            ].map((n, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
                <span className="text-lg">{n.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{n.text}</div>
                  <div className="text-xs text-gray-400">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
