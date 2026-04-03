"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Shield, Lock, ArrowRight, ArrowLeft, Check, User, Heart,
  Pill, ClipboardList, Syringe, Tablets, ChevronRight,
  Activity, Scale, Ruler, Calendar, Phone, Mail, MapPin,
  BadgeCheck, Stethoscope, TrendingDown
} from "lucide-react";

// ─── Types ────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  dob: string;
  sex: string;
  height: string;
  weight: string;
  goalWeight: string;
  medication: string;
  conditions: string[];
  medications: string;
  previousGlp1: string;
}

// ─── Step config ──────────────────────────────────────
const STEPS = [
  { label: "Personal", icon: User },
  { label: "Health", icon: Heart },
  { label: "Medication", icon: Pill },
  { label: "History", icon: ClipboardList },
  { label: "Complete", icon: Check },
];

const CONDITIONS = [
  { label: "Type 2 Diabetes", icon: "💉" },
  { label: "High Blood Pressure", icon: "❤️" },
  { label: "High Cholesterol", icon: "🩸" },
  { label: "Thyroid Conditions", icon: "🦋" },
  { label: "Heart Disease", icon: "🫀" },
  { label: "Kidney Disease", icon: "🫘" },
  { label: "Pancreatitis", icon: "⚠️" },
  { label: "None of the above", icon: "✓" },
];

const MEDICATIONS = [
  {
    id: "semaglutide_injection",
    name: "Semaglutide Injection",
    desc: "Weekly subcutaneous injection",
    detail: "Most popular",
    price: "$179",
    period: "first month",
    popular: true,
    icon: Syringe,
  },
  {
    id: "semaglutide_tablets",
    name: "Semaglutide Tablets",
    desc: "Daily oral tablet — no needles",
    detail: "Needle-free",
    price: "$149",
    period: "first month",
    popular: false,
    icon: Tablets,
  },
  {
    id: "tirzepatide_injection",
    name: "Tirzepatide Injection",
    desc: "Dual-action GLP-1/GIP weekly injection",
    detail: "Maximum results",
    price: "$249",
    period: "first month",
    popular: false,
    icon: Syringe,
  },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

// ─── Logo ─────────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1B4332" />
        <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".92" />
        <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520" />
      </svg>
      <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">
        TrimDoctor
      </span>
    </Link>
  );
}

// ─── BMI Gauge ────────────────────────────────────────
function BmiGauge({ bmi }: { bmi: number }) {
  // BMI ranges: <18.5 underweight, 18.5-24.9 normal, 25-29.9 overweight, 30+ obese
  const label =
    bmi < 18.5 ? "Underweight" :
    bmi < 25 ? "Normal" :
    bmi < 30 ? "Overweight" : "Obese";
  const color =
    bmi < 18.5 ? "#DAA520" :
    bmi < 25 ? "#40916C" :
    bmi < 30 ? "#DAA520" : "#C0392B";

  // Position on gauge (15-45 range mapped to 0-100%)
  const pct = Math.min(100, Math.max(0, ((bmi - 15) / 30) * 100));

  return (
    <div className="mt-6 p-5 rounded-2xl bg-[#F5F0E8] border border-[#EDE6D9]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[#40916C]" />
          <span className="text-sm font-semibold text-[#1A1A1A]">Your BMI</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-2xl font-bold" style={{ color }}>
            {bmi.toFixed(1)}
          </span>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${color}18`, color }}
          >
            {label}
          </span>
        </div>
      </div>
      {/* Gauge bar */}
      <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-[#DAA520] via-[#40916C] via-[50%] to-[#C0392B]">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-[3px] shadow-md transition-all duration-700 ease-out"
          style={{ borderColor: color, left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] font-medium text-[#8A8A8A]">
        <span>15</span>
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
        <span>45</span>
      </div>
    </div>
  );
}

// ─── Progress Indicator ───────────────────────────────
function ProgressSteps({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-between w-full max-w-lg mx-auto">
      {STEPS.map((step, i) => {
        const StepIcon = step.icon;
        const isComplete = i < current;
        const isCurrent = i === current;
        const isUpcoming = i > current;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            {/* Step dot + label */}
            <div className="flex flex-col items-center gap-1.5 relative">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                  ${isComplete
                    ? "bg-[#1B4332] text-white shadow-md shadow-[#1B4332]/20"
                    : isCurrent
                      ? "bg-[#1B4332] text-white shadow-lg shadow-[#1B4332]/30 ring-4 ring-[#1B4332]/10"
                      : "bg-[#F5F0E8] text-[#8A8A8A] border-2 border-[#EDE6D9]"
                  }
                `}
              >
                {isComplete ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <StepIcon size={16} strokeWidth={isCurrent ? 2.5 : 1.5} />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold transition-colors hidden sm:block ${
                  isCurrent ? "text-[#1B4332]" : isComplete ? "text-[#40916C]" : "text-[#8A8A8A]"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 rounded-full bg-[#EDE6D9] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1B4332] to-[#40916C] rounded-full transition-all duration-700 ease-out"
                  style={{ width: isComplete ? "100%" : isCurrent ? "50%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Trust Footer ─────────────────────────────────────
function TrustFooter() {
  return (
    <div className="mt-10 mb-8 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        {[
          { icon: Shield, text: "HIPAA Compliant" },
          { icon: Lock, text: "256-bit Encryption" },
          { icon: Stethoscope, text: "U.S. Licensed Physicians" },
        ].map((badge, i) => (
          <div key={i} className="flex items-center gap-2 text-[#8A8A8A]">
            <badge.icon size={15} strokeWidth={1.5} />
            <span className="text-xs font-medium">{badge.text}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] text-[#B0A898] mt-4">
        Your health information is protected and never shared without your consent.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey] = useState(0);
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", state: "",
    dob: "", sex: "", height: "", weight: "", goalWeight: "",
    medication: "",
    conditions: [],
    medications: "", previousGlp1: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;

  const update = useCallback((key: keyof FormData, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
  }, []);

  const toggleCondition = useCallback((c: string) => {
    setForm(prev => {
      if (c === "None of the above") {
        return { ...prev, conditions: prev.conditions.includes(c) ? [] : [c] };
      }
      const without = prev.conditions.filter(x => x !== "None of the above");
      return {
        ...prev,
        conditions: without.includes(c)
          ? without.filter(x => x !== c)
          : [...without, c],
      };
    });
  }, []);

  const bmi = form.weight && form.height
    ? (703 * Number(form.weight) / (Number(form.height) ** 2))
    : null;

  const goNext = () => {
    if (step === 3) {
      handleSubmit();
    } else {
      setDirection("forward");
      setAnimKey(k => k + 1);
      setStep(s => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection("back");
      setAnimKey(k => k + 1);
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          state: form.state,
          dateOfBirth: form.dob,
          sex: form.sex,
          heightInches: Number(form.height),
          weight: Number(form.weight),
          goalWeight: Number(form.goalWeight),
          medication: form.medication,
          conditions: form.conditions,
          currentMedications: form.medications,
          previousGlp1: form.previousGlp1 === "yes",
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true); // Show success in demo mode
    }
    setDirection("forward");
    setAnimKey(k => k + 1);
    setStep(4);
  };

  // ─── Shared classes ─────────────────────────────────
  const inputClass =
    "input-brand w-full px-4 py-3.5 border-2 border-[#EDE6D9] rounded-xl text-[15px] outline-none transition-all focus:border-[#1B4332] focus:shadow-[0_0_0_4px_rgba(27,67,50,0.07)] bg-white text-[#1A1A1A] placeholder-[#8A8A8A]";

  const selectClass =
    "input-brand w-full px-4 py-3.5 border-2 border-[#EDE6D9] rounded-xl text-[15px] outline-none transition-all focus:border-[#1B4332] focus:shadow-[0_0_0_4px_rgba(27,67,50,0.07)] bg-white text-[#1A1A1A] appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Decorative background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#1B4332]/[0.03] to-transparent" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#DAA520]/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 pt-8 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Logo />
          <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A] font-medium">
            <Lock size={12} />
            <span>Secure Form</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <ProgressSteps current={step} total={totalSteps} />
        </div>

        {/* Form Card */}
        <div
          key={animKey}
          className="bg-white rounded-[22px] border border-[#EDE6D9] p-7 sm:p-9 shadow-sm anim-up"
        >
          {/* ─── Step 0: Personal Info ───────────────── */}
          {step === 0 && (
            <div>
              <div className="mb-7">
                <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1A1A1A] leading-tight mb-2">
                  Let&apos;s get started
                </h2>
                <p className="text-[#8A8A8A] text-[15px]">
                  Tell us a bit about yourself so we can personalize your care.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                      <User size={14} className="text-[#40916C]" />
                      First Name
                    </label>
                    <input
                      className={inputClass}
                      value={form.firstName}
                      onChange={e => update("firstName", e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                      Last Name
                    </label>
                    <input
                      className={inputClass}
                      value={form.lastName}
                      onChange={e => update("lastName", e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                    <Mail size={14} className="text-[#40916C]" />
                    Email Address
                  </label>
                  <input
                    className={inputClass}
                    type="email"
                    value={form.email}
                    onChange={e => update("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                    <Phone size={14} className="text-[#40916C]" />
                    Phone Number
                  </label>
                  <input
                    className={inputClass}
                    type="tel"
                    value={form.phone}
                    onChange={e => update("phone", e.target.value)}
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                    <MapPin size={14} className="text-[#40916C]" />
                    State
                  </label>
                  <div className="relative">
                    <select
                      className={selectClass}
                      value={form.state}
                      onChange={e => update("state", e.target.value)}
                    >
                      <option value="">Select your state</option>
                      {US_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 1: Health Info ─────────────────── */}
          {step === 1 && (
            <div>
              <div className="mb-7">
                <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1A1A1A] leading-tight mb-2">
                  Health information
                </h2>
                <p className="text-[#8A8A8A] text-[15px]">
                  This helps our physicians evaluate your eligibility for treatment.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                      <Calendar size={14} className="text-[#40916C]" />
                      Date of Birth
                    </label>
                    <input
                      className={inputClass}
                      type="date"
                      value={form.dob}
                      onChange={e => update("dob", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#1A1A1A] mb-2 block">
                      Biological Sex
                    </label>
                    <div className="flex gap-3">
                      {["male", "female"].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update("sex", s)}
                          className={`
                            flex-1 py-3.5 rounded-xl border-2 text-sm font-semibold capitalize transition-all duration-200
                            ${form.sex === s
                              ? "border-[#1B4332] bg-[#D8F3DC] text-[#1B4332] shadow-[0_0_0_4px_rgba(27,67,50,0.08)]"
                              : "border-[#EDE6D9] bg-white text-[#3D3D3D] hover:border-[#40916C] hover:bg-[#D8F3DC]/40"
                            }
                          `}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                      <Ruler size={14} className="text-[#40916C]" />
                      Height (in)
                    </label>
                    <input
                      className={inputClass}
                      type="number"
                      value={form.height}
                      onChange={e => update("height", e.target.value)}
                      placeholder="68"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                      <Scale size={14} className="text-[#40916C]" />
                      Weight (lbs)
                    </label>
                    <input
                      className={inputClass}
                      type="number"
                      value={form.weight}
                      onChange={e => update("weight", e.target.value)}
                      placeholder="210"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                      <TrendingDown size={14} className="text-[#40916C]" />
                      Goal (lbs)
                    </label>
                    <input
                      className={inputClass}
                      type="number"
                      value={form.goalWeight}
                      onChange={e => update("goalWeight", e.target.value)}
                      placeholder="170"
                    />
                  </div>
                </div>

                {bmi !== null && bmi > 0 && bmi < 100 && (
                  <BmiGauge bmi={bmi} />
                )}
              </div>
            </div>
          )}

          {/* ─── Step 2: Medication Selection ────────── */}
          {step === 2 && (
            <div>
              <div className="mb-7">
                <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1A1A1A] leading-tight mb-2">
                  Choose your medication
                </h2>
                <p className="text-[#8A8A8A] text-[15px]">
                  Your physician will confirm the best option for your profile.
                </p>
              </div>

              <div className="space-y-3">
                {MEDICATIONS.map(med => {
                  const MedIcon = med.icon;
                  const selected = form.medication === med.id;
                  return (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => update("medication", med.id)}
                      className={`
                        w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden
                        ${selected
                          ? "border-[#1B4332] bg-[#D8F3DC] shadow-[0_0_0_4px_rgba(27,67,50,0.08)]"
                          : "border-[#EDE6D9] bg-white hover:border-[#40916C] hover:bg-[#D8F3DC]/30"
                        }
                      `}
                    >
                      {/* Popular badge */}
                      {med.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-[#DAA520] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                            Most Popular
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors
                          ${selected ? "bg-[#1B4332] text-white" : "bg-[#F5F0E8] text-[#40916C]"}
                        `}>
                          <MedIcon size={22} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-bold text-[#1A1A1A] text-[15px]">{med.name}</div>
                              <div className="text-sm text-[#8A8A8A] mt-0.5">{med.desc}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-mono font-bold text-lg text-[#1B4332]">{med.price}</div>
                              <div className="text-[11px] text-[#8A8A8A]">{med.period}</div>
                            </div>
                          </div>
                        </div>

                        {/* Radio indicator */}
                        <div className={`
                          w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center transition-all
                          ${selected
                            ? "border-[#1B4332] bg-[#1B4332]"
                            : "border-[#C5BFB3]"
                          }
                        `}>
                          {selected && <Check size={12} className="text-white" strokeWidth={3} />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Subtle info */}
              <div className="mt-5 flex items-start gap-2.5 text-xs text-[#8A8A8A] bg-[#F5F0E8] rounded-xl p-4">
                <BadgeCheck size={16} className="text-[#40916C] shrink-0 mt-0.5" />
                <span>
                  All medications are compounded by FDA-regulated pharmacies and shipped free with discreet packaging.
                </span>
              </div>
            </div>
          )}

          {/* ─── Step 3: Medical History ─────────────── */}
          {step === 3 && (
            <div>
              <div className="mb-7">
                <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1A1A1A] leading-tight mb-2">
                  Medical history
                </h2>
                <p className="text-[#8A8A8A] text-[15px]">
                  Select any conditions that apply. This helps ensure safe treatment.
                </p>
              </div>

              {/* Condition pills */}
              <div className="flex flex-wrap gap-2.5 mb-7">
                {CONDITIONS.map(c => {
                  const selected = form.conditions.includes(c.label);
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => toggleCondition(c.label)}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-200
                        ${selected
                          ? "border-[#1B4332] bg-[#D8F3DC] text-[#1B4332] shadow-[0_0_0_3px_rgba(27,67,50,0.06)]"
                          : "border-[#EDE6D9] bg-white text-[#3D3D3D] hover:border-[#40916C] hover:bg-[#D8F3DC]/40"
                        }
                      `}
                    >
                      <span className="text-base">{c.icon}</span>
                      {c.label}
                      {selected && <Check size={14} strokeWidth={2.5} className="text-[#1B4332]" />}
                    </button>
                  );
                })}
              </div>

              {/* Current meds */}
              <div className="mb-5">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] mb-2">
                  <Pill size={14} className="text-[#40916C]" />
                  Current Medications
                </label>
                <input
                  className={inputClass}
                  value={form.medications}
                  onChange={e => update("medications", e.target.value)}
                  placeholder="List any current medications (or type 'none')"
                />
              </div>

              {/* Previous GLP-1 */}
              <div>
                <label className="text-sm font-semibold text-[#1A1A1A] mb-3 block">
                  Have you previously used GLP-1 medication?
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "yes", label: "Yes, I have" },
                    { value: "no", label: "No, first time" },
                  ].map(v => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => update("previousGlp1", v.value)}
                      className={`
                        flex-1 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all duration-200
                        ${form.previousGlp1 === v.value
                          ? "border-[#1B4332] bg-[#D8F3DC] text-[#1B4332] shadow-[0_0_0_4px_rgba(27,67,50,0.08)]"
                          : "border-[#EDE6D9] bg-white text-[#3D3D3D] hover:border-[#40916C] hover:bg-[#D8F3DC]/40"
                        }
                      `}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 4: Confirmation ────────────────── */}
          {step === 4 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-20 h-20 rounded-full bg-[#D8F3DC] flex items-center justify-center mx-auto mb-6 anim-scale-in">
                <Check size={36} className="text-[#1B4332]" strokeWidth={2.5} />
              </div>
              <h2 className="font-serif text-[28px] sm:text-[32px] text-[#1A1A1A] mb-3">
                Assessment Complete!
              </h2>
              <p className="text-[#8A8A8A] max-w-sm mx-auto mb-3 text-[15px]">
                A licensed physician will review your information within 24-48 hours.
              </p>
              <p className="text-sm text-[#40916C] font-medium mb-8">
                You&apos;ll receive an email at <strong className="text-[#1B4332]">{form.email}</strong>
              </p>

              {/* Next steps */}
              <div className="bg-[#F5F0E8] rounded-2xl p-6 text-left max-w-sm mx-auto mb-8">
                <div className="text-[11px] font-bold text-[#DAA520] uppercase tracking-widest mb-4">
                  What happens next
                </div>
                {[
                  { n: "1", t: "Physician reviews your profile" },
                  { n: "2", t: "You receive your treatment plan" },
                  { n: "3", t: "Medication ships to your door" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                    <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {item.n}
                    </div>
                    <span className="text-sm text-[#3D3D3D] font-medium">{item.t}</span>
                  </div>
                ))}
              </div>

              <Link href="/" className="btn-primary">
                Return Home <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* ─── Navigation ──────────────────────────── */}
          {step < 4 && (
            <div className="mt-9 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className={`
                  flex items-center gap-1.5 text-sm font-semibold transition-colors
                  ${step === 0
                    ? "text-[#C5BFB3] cursor-default"
                    : "text-[#40916C] hover:text-[#1B4332] cursor-pointer"
                  }
                `}
                disabled={step === 0}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                type="button"
                onClick={goNext}
                className="btn-primary"
              >
                {step === 3 ? "Submit Assessment" : "Continue"}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Trust Footer */}
        <TrustFooter />
      </div>
    </div>
  );
}
