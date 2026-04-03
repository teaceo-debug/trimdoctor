"use client";

import {
  DollarSign,
  Users,
  ClipboardCheck,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  UserPlus,
  PackageCheck,
  Pill,
  Truck,
  Activity,
  RefreshCw,
  FileText,
  Settings,
  BarChart3,
  ChevronRight,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
  CreditCard,
  Headphones,
  Shield,
} from "lucide-react";

/* ── mock data ─────────────────────────────────────────────── */

const kpis = [
  {
    label: "Revenue (MTD)",
    value: "$142.8K",
    change: "+12.4%",
    up: true,
    icon: DollarSign,
    spark: [28, 35, 32, 40, 38, 44, 50, 48, 55, 52, 58, 62],
  },
  {
    label: "Active Patients",
    value: "14,892",
    change: "+3.2%",
    up: true,
    icon: Users,
    spark: [80, 82, 81, 84, 85, 86, 88, 87, 90, 91, 93, 94],
  },
  {
    label: "New Assessments",
    value: "347",
    change: "+18.7%",
    up: true,
    icon: ClipboardCheck,
    spark: [12, 18, 15, 22, 20, 28, 24, 30, 26, 32, 35, 38],
  },
  {
    label: "Churn Rate",
    value: "4.2%",
    change: "-0.8%",
    up: false,
    icon: TrendingDown,
    spark: [6.2, 5.8, 5.5, 5.6, 5.2, 5.0, 4.8, 4.9, 4.6, 4.5, 4.3, 4.2],
  },
];

const pipeline = [
  { stage: "Pending Review", count: 34, color: "#DAA520", icon: Clock },
  { stage: "Approved", count: 52, color: "#95D5B2", icon: CheckCircle2 },
  { stage: "Shipped", count: 31, color: "#60A5FA", icon: Truck },
  { stage: "Active", count: 147, color: "#4ADE80", icon: Activity },
];

const recentActivity = [
  {
    time: "2m ago",
    event: "New patient signup",
    detail: "Sarah Chen -- Semaglutide Inj.",
    icon: UserPlus,
    color: "#4ADE80",
  },
  {
    time: "5m ago",
    event: "Prescription approved",
    detail: "Marcus Rivera -- Dr. Williams",
    icon: CheckCircle2,
    color: "#60A5FA",
  },
  {
    time: "8m ago",
    event: "Order shipped",
    detail: "ORD-20041 -- Belmar \u2192 TX",
    icon: PackageCheck,
    color: "#A78BFA",
  },
  {
    time: "12m ago",
    event: "AI resolved ticket",
    detail: "TK-5022 -- Shipping inquiry",
    icon: Zap,
    color: "#22D3EE",
  },
  {
    time: "15m ago",
    event: "Payment received",
    detail: "$299 -- Emily Watson (Mo 4)",
    icon: CreditCard,
    color: "#4ADE80",
  },
  {
    time: "18m ago",
    event: "Ticket escalated",
    detail: "TK-5019 -- Side effects concern",
    icon: AlertCircle,
    color: "#FBBF24",
  },
  {
    time: "22m ago",
    event: "Subscription cancelled",
    detail: "Nina Williams -- Mo 3",
    icon: XCircle,
    color: "#F87171",
  },
  {
    time: "28m ago",
    event: "Rx refill processed",
    detail: "ORD-20038 -- Tirzepatide 5mg",
    icon: Pill,
    color: "#C084FC",
  },
];

const quickActions = [
  { label: "Review Assessments", icon: FileText, count: 34 },
  { label: "Pending Prescriptions", icon: Pill, count: 12 },
  { label: "Support Queue", icon: Headphones, count: 8 },
  { label: "Compliance Alerts", icon: Shield, count: 2 },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

/* ── sparkline component ───────────────────────────────────── */

function Sparkline({
  data,
  color,
  up,
}: {
  data: number[];
  color: string;
  up: boolean;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 32;
  const w = 80;
  const step = w / (data.length - 1);

  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const gradientId = `spark-${up ? "up" : "down"}`;
  const fillPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── main dashboard ────────────────────────────────────────── */

export default function AdminDashboard() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const pipelineTotal = pipeline.reduce((sum, s) => sum + s.count, 0);

  return (
    <div
      className="min-h-screen text-gray-300"
      style={{ backgroundColor: "#0F1A14", fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* ── Header ───────────────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#1B4332" }}
              >
                <span
                  className="font-bold text-sm"
                  style={{ color: "#DAA520" }}
                >
                  T
                </span>
              </div>
              <span className="text-lg font-semibold text-white">
                TrimDoctor
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{
                  color: "#DAA520",
                  backgroundColor: "rgba(218,165,32,0.12)",
                  letterSpacing: "0.08em",
                }}
              >
                OPS
              </span>
            </div>
            <h1
              className="text-2xl lg:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Good{" "}
              {now.getHours() < 12
                ? "morning"
                : now.getHours() < 17
                  ? "afternoon"
                  : "evening"}
              , Michael
            </h1>
            <p className="text-sm text-gray-500 mt-1">{dateStr}</p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(74,222,128,0.08)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-xs font-semibold"
                style={{
                  color: "#4ADE80",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.05em",
                }}
              >
                LIVE
              </span>
              <span
                className="text-xs text-gray-500"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {timeStr}
              </span>
            </div>
            <button
              className="p-2 rounded-lg transition-colors hover:bg-white/5"
              aria-label="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </header>

        {/* ── KPI Cards ────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            const changeColor = kpi.label === "Churn Rate"
              ? (kpi.up ? "#F87171" : "#4ADE80")
              : (kpi.up ? "#4ADE80" : "#F87171");
            const ChangeArrow = kpi.label === "Churn Rate"
              ? (kpi.up ? ArrowUpRight : ArrowDownRight)
              : (kpi.up ? ArrowUpRight : ArrowDownRight);
            return (
              <div
                key={kpi.label}
                className="rounded-2xl p-5 transition-colors hover:border-gray-700/80"
                style={{
                  backgroundColor: "#111",
                  border: "1px solid #1A1A1A",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "rgba(27,67,50,0.4)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#95D5B2" }} />
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {kpi.label}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: changeColor }}
                  >
                    <ChangeArrow className="w-3 h-3" />
                    <span style={{ fontFamily: "var(--font-mono)" }}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {kpi.value}
                  </span>
                  <Sparkline
                    data={kpi.spark}
                    color={changeColor}
                    up={kpi.up}
                  />
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Patient Pipeline (Funnel) ────────────────── */}
        <section
          className="rounded-2xl p-5 lg:p-6 mb-8"
          style={{ backgroundColor: "#111", border: "1px solid #1A1A1A" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Patient Pipeline
            </h2>
            <span
              className="text-xs text-gray-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {pipelineTotal} total
            </span>
          </div>
          {/* Desktop: horizontal funnel */}
          <div className="hidden sm:grid grid-cols-4 gap-3">
            {pipeline.map((stage, i) => {
              const Icon = stage.icon;
              const pct = Math.round((stage.count / pipelineTotal) * 100);
              return (
                <div key={stage.stage} className="relative group">
                  <div
                    className="rounded-xl p-4 text-center transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: `1px solid ${stage.color}22`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 mx-auto mb-2"
                      style={{ color: stage.color }}
                    />
                    <div
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {stage.count}
                    </div>
                    <div className="text-xs text-gray-500">{stage.stage}</div>
                    {/* progress bar */}
                    <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: stage.color,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                    <div
                      className="text-[10px] text-gray-600 mt-1"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {pct}%
                    </div>
                  </div>
                  {/* Arrow connector */}
                  {i < pipeline.length - 1 && (
                    <ChevronRight
                      className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 z-10 hidden lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
          {/* Mobile: vertical stack */}
          <div className="sm:hidden space-y-3">
            {pipeline.map((stage) => {
              const Icon = stage.icon;
              const pct = Math.round((stage.count / pipelineTotal) * 100);
              return (
                <div
                  key={stage.stage}
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: `1px solid ${stage.color}22`,
                  }}
                >
                  <Icon
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: stage.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">
                      {stage.stage}
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: stage.color,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                  <span
                    className="text-lg font-bold text-white flex-shrink-0"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {stage.count}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Activity + Quick Actions ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Activity Feed */}
          <section
            className="lg:col-span-2 rounded-2xl p-5 lg:p-6"
            style={{ backgroundColor: "#111", border: "1px solid #1A1A1A" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-base font-semibold text-white"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Recent Activity
              </h2>
              <button className="text-xs font-medium hover:text-white transition-colors" style={{ color: "#DAA520" }}>
                View all
              </button>
            </div>
            <div className="space-y-1">
              {recentActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white/[0.02] group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${item.color}12`,
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-white truncate">
                          {item.event}
                        </span>
                        <span
                          className="text-[11px] text-gray-600 flex-shrink-0"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {item.time}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 truncate block mt-0.5">
                        {item.detail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Actions */}
          <section
            className="rounded-2xl p-5 lg:p-6"
            style={{ backgroundColor: "#111", border: "1px solid #1A1A1A" }}
          >
            <h2
              className="text-base font-semibold text-white mb-5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Quick Actions
            </h2>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/[0.04] group text-left"
                    style={{ border: "1px solid transparent" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#1A1A1A")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "transparent")
                    }
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(27,67,50,0.3)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#95D5B2" }} />
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">
                      {action.label}
                    </span>
                    {action.count !== undefined && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "#DAA520",
                          backgroundColor: "rgba(218,165,32,0.1)",
                        }}
                      >
                        {action.count}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-500 transition-colors" />
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
