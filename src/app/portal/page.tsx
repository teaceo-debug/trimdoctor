"use client";
import { useEffect, useState, useCallback } from "react";
import {
  TrendingDown,
  Scale,
  Target,
  Percent,
  Package,
  CalendarCheck,
  PartyPopper,
  Pill,
  Activity,
  ArrowDownRight,
} from "lucide-react";

const WEIGHT_LOG = [
  { date: "Jan 14", weight: 238 }, { date: "Jan 21", weight: 236 }, { date: "Jan 28", weight: 234 },
  { date: "Feb 4", weight: 231 }, { date: "Feb 11", weight: 229 }, { date: "Feb 18", weight: 227 },
  { date: "Feb 25", weight: 225 }, { date: "Mar 4", weight: 222 }, { date: "Mar 11", weight: 220 },
  { date: "Mar 18", weight: 218 }, { date: "Mar 25", weight: 216 }, { date: "Apr 1", weight: 214 },
];

function AnimatedNumber({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span className={className}>{display}{suffix}</span>;
}

function WeightChart({ data }: { data: typeof WEIGHT_LOG }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const padding = { top: 20, right: 16, bottom: 30, left: 44 };
  const width = 700;
  const height = 220;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minW = Math.min(...data.map(d => d.weight)) - 4;
  const maxW = Math.max(...data.map(d => d.weight)) + 4;
  const range = maxW - minW;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + (1 - (d.weight - minW) / range) * chartH,
    ...d,
  }));

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    return `${acc} C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const w = minW + (range / 4) * i;
    const y = padding.top + (1 - (w - minW) / range) * chartH;
    return { w: Math.round(w), y };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B4332" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1B4332" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#1B4332" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={padding.left} y1={g.y} x2={width - padding.right} y2={g.y} stroke="#E8E2D6" strokeWidth="1" strokeDasharray="4 3" />
          <text x={padding.left - 8} y={g.y + 4} textAnchor="end" className="fill-[#8A8A8A]" fontSize="10" fontFamily="JetBrains Mono, monospace">{g.w}</text>
        </g>
      ))}

      {/* X-axis labels */}
      {points.filter((_, i) => i % 3 === 0 || i === points.length - 1).map((p, i) => (
        <text key={i} x={p.x} y={height - 4} textAnchor="middle" className="fill-[#8A8A8A]" fontSize="10" fontFamily="JetBrains Mono, monospace">{p.date}</text>
      ))}

      {/* Area fill */}
      <path
        d={areaD}
        fill="url(#chartGrad)"
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ strokeDasharray: loaded ? "none" : "1000", strokeDashoffset: loaded ? "0" : "1000" }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <g
          key={i}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="cursor-pointer"
        >
          <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
          <circle
            cx={p.x}
            cy={p.y}
            r={hoveredIdx === i ? 5 : i === points.length - 1 ? 4 : 3}
            fill={i === points.length - 1 ? "#1B4332" : hoveredIdx === i ? "#1B4332" : "#2D6A4F"}
            stroke="white"
            strokeWidth="2"
            className={`transition-all duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
          {hoveredIdx === i && (
            <g>
              <rect x={p.x - 44} y={p.y - 36} width="88" height="26" rx="8" fill="#1A1A1A" />
              <text x={p.x} y={p.y - 19} textAnchor="middle" fill="white" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                {p.date}: {p.weight}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function PortalDashboard() {
  const start = 238, current = 214, goal = 185;
  const lost = start - current;
  const progressPct = Math.round((lost / (start - goal)) * 100);
  const bmi = (703 * current / (71 * 71)).toFixed(1);

  const metrics = [
    { label: "Weight Lost", value: lost, suffix: " lbs", sub: `${((lost / start) * 100).toFixed(1)}% of start weight`, icon: TrendingDown, color: "text-[#1B4332]", accent: "bg-[#D8F3DC]", iconColor: "text-[#2D6A4F]" },
    { label: "Current Weight", value: current, suffix: " lbs", sub: `BMI: ${bmi}`, icon: Scale, color: "text-[#1A1A1A]", accent: "bg-[#F5F0E8]", iconColor: "text-[#8A8A8A]" },
    { label: "Goal Weight", value: goal, suffix: " lbs", sub: `${start - goal - lost} lbs remaining`, icon: Target, color: "text-blue-600", accent: "bg-blue-50", iconColor: "text-blue-500" },
    { label: "Progress", value: progressPct, suffix: "%", sub: "toward goal weight", icon: Percent, color: "text-[#DAA520]", accent: "bg-amber-50", iconColor: "text-[#DAA520]" },
  ];

  const notifications = [
    { icon: Package, text: "April medication being prepared", time: "2h ago", color: "text-[#2D6A4F]", bg: "bg-[#D8F3DC]" },
    { icon: CalendarCheck, text: "Monthly check-in available", time: "1d ago", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: PartyPopper, text: "Milestone: 24 lbs lost!", time: "3d ago", color: "text-[#DAA520]", bg: "bg-amber-50" },
    { icon: Pill, text: "Dosage increase approved: 0.5 to 1.0mg", time: "5d ago", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-1">
          Welcome back, Michael
        </h1>
        <p className="text-sm text-[#8A8A8A]">3 months into your weight loss journey — here&apos;s your progress.</p>
      </div>

      {/* Medication alert */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#D8F3DC]/60 to-blue-50/60 border border-[#95D5B2]/30 mb-6 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-xl bg-[#D8F3DC] flex items-center justify-center flex-shrink-0">
          <Package className="w-[18px] h-[18px] text-[#1B4332]" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-[#1A1A1A] text-sm">Your April medication is being prepared</span>
          <span className="text-[#8A8A8A] text-sm"> — Est. ship date: Apr 5</span>
        </div>
        <span className="hidden sm:inline-flex text-xs font-semibold text-[#1B4332] bg-[#D8F3DC] px-3 py-1.5 rounded-full whitespace-nowrap">
          In Progress
        </span>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-[#E8E2D6] p-5 hover:shadow-md hover:shadow-black/[0.03] transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider">{m.label}</div>
                <div className={`w-8 h-8 rounded-lg ${m.accent} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-4 h-4 ${m.iconColor}`} />
                </div>
              </div>
              <div className={`font-mono text-2xl sm:text-3xl font-bold ${m.color} leading-none`}>
                <AnimatedNumber value={m.value} suffix={m.suffix} />
              </div>
              <div className="text-[11px] text-[#8A8A8A] mt-2">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Weight Chart */}
      <div className="bg-white rounded-2xl border border-[#E8E2D6] p-6 mb-6 hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
          <div>
            <h3 className="font-bold text-[#1A1A1A] text-base">Weight Trend</h3>
            <p className="text-xs text-[#8A8A8A]">Weekly weigh-in history</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1B4332] bg-[#D8F3DC] px-3 py-1.5 rounded-full">
              <ArrowDownRight className="w-3.5 h-3.5" />
              {lost} lbs total
            </span>
          </div>
        </div>
        <WeightChart data={WEIGHT_LOG} />
      </div>

      {/* Treatment + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current Treatment */}
        <div className="bg-white rounded-2xl border border-[#E8E2D6] p-6 hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-4 h-4 text-[#2D6A4F]" />
            <h3 className="font-bold text-[#1A1A1A] text-[15px]">Current Treatment</h3>
          </div>
          <div className="space-y-0">
            {[
              { label: "Medication", value: "Semaglutide Injection" },
              { label: "Current Dose", value: "0.5mg weekly" },
              { label: "Next Dose", value: "1.0mg (titration scheduled)" },
              { label: "Provider", value: "Dr. Sarah Williams, MD" },
              { label: "Pharmacy", value: "Belmar Pharma Solutions" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm py-3 border-b border-[#E8E2D6]/60 last:border-0">
                <span className="text-[#8A8A8A] text-[13px]">{item.label}</span>
                <span className="font-semibold text-[#1A1A1A] text-[13px] text-right max-w-[55%]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-[#E8E2D6] p-6 hover:shadow-md hover:shadow-black/[0.03] transition-shadow">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[#1A1A1A] text-[15px]">Recent Activity</h3>
            <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white text-[10px] font-bold flex items-center justify-center">4</span>
          </div>
          <div className="space-y-0">
            {notifications.map((n, i) => {
              const Icon = n.icon;
              return (
                <div key={i} className="flex gap-3 py-3 border-b border-[#E8E2D6]/60 last:border-0">
                  <div className={`w-8 h-8 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${n.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-[#1A1A1A]">{n.text}</div>
                    <div className="text-[11px] text-[#8A8A8A]">{n.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
