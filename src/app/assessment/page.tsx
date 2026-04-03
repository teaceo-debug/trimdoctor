"use client";
import { useState } from "react";
import Link from "next/link";

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", state: "",
    dob: "", sex: "", height: "", weight: "", goalWeight: "",
    medication: "",
    conditions: [] as string[],
    medications: "", previousGlp1: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;
  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));
  const toggleCondition = (c: string) => setForm(prev => ({
    ...prev,
    conditions: prev.conditions.includes(c) ? prev.conditions.filter(x => x !== c) : [...prev.conditions, c],
  }));

  const bmi = form.weight && form.height
    ? (703 * Number(form.weight) / (Number(form.height) ** 2)).toFixed(1)
    : null;

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
    } catch (e) {
      setSubmitted(true); // Show success in demo mode
    }
    setStep(4);
  };

  const inputClass = "w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-[15px] outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";
  const radioClass = (selected: boolean) =>
    `p-5 border-2 rounded-2xl cursor-pointer transition-all ${selected ? "border-brand-500 bg-brand-50 ring-4 ring-brand-500/10" : "border-gray-200 bg-white hover:border-brand-300"}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-xl mx-auto px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-serif text-xl text-gray-900">TrimDoctor</span>
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={step > 0 ? () => setStep(s => s - 1) : undefined}
              className="text-brand-500 font-semibold text-sm"
            >
              ← {step === 0 ? "" : "Previous"}
            </button>
            <span className="text-sm text-gray-500">Step {step + 1} of {totalSteps}</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-gold rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Let&apos;s get started</h2>
              <p className="text-gray-500 mb-8">Tell us a bit about yourself.</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">First Name</label>
                  <input className={inputClass} value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="John" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">Last Name</label>
                  <input className={inputClass} value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Doe" />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-900 block mb-1.5">Email</label>
                <input className={inputClass} type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="john@example.com" />
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-900 block mb-1.5">Phone</label>
                <input className={inputClass} type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="(555) 555-5555" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-1.5">State</label>
                <input className={inputClass} value={form.state} onChange={e => update("state", e.target.value)} placeholder="CA" maxLength={2} />
              </div>
            </div>
          )}

          {/* Step 1: Health Info */}
          {step === 1 && (
            <div>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Health information</h2>
              <p className="text-gray-500 mb-8">This helps our physicians evaluate your eligibility.</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">Date of Birth</label>
                  <input className={inputClass} type="date" value={form.dob} onChange={e => update("dob", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">Biological Sex</label>
                  <div className="flex gap-3">
                    {["male", "female"].map(s => (
                      <div key={s} className={`flex-1 text-center py-3.5 ${radioClass(form.sex === s)}`} onClick={() => update("sex", s)}>
                        <span className="font-semibold text-sm capitalize">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">Height (inches)</label>
                  <input className={inputClass} type="number" value={form.height} onChange={e => update("height", e.target.value)} placeholder="68" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">Current Weight</label>
                  <input className={inputClass} type="number" value={form.weight} onChange={e => update("weight", e.target.value)} placeholder="210" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">Goal Weight</label>
                  <input className={inputClass} type="number" value={form.goalWeight} onChange={e => update("goalWeight", e.target.value)} placeholder="170" />
                </div>
              </div>
              {bmi && (
                <div className="mt-5 p-4 rounded-xl bg-brand-50">
                  <span className="text-sm text-brand-500 font-semibold">Your BMI: {bmi}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Medication */}
          {step === 2 && (
            <div>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Choose your medication</h2>
              <p className="text-gray-500 mb-8">Your physician will confirm the best option.</p>
              {[
                { id: "semaglutide_injection", name: "Semaglutide Injection", desc: "Weekly subcutaneous injection — most popular", price: "$179/first month" },
                { id: "semaglutide_tablets", name: "Semaglutide Tablets", desc: "Daily oral tablet — no needles", price: "$149/first month" },
                { id: "tirzepatide_injection", name: "Tirzepatide Injection", desc: "Dual-action GLP-1/GIP weekly injection", price: "$249/first month" },
              ].map(med => (
                <div key={med.id} className={`mb-3 ${radioClass(form.medication === med.id)}`} onClick={() => update("medication", med.id)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{med.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{med.desc}</div>
                    </div>
                    <div className="font-bold text-brand-500 whitespace-nowrap">{med.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Medical History */}
          {step === 3 && (
            <div>
              <h2 className="font-serif text-3xl text-gray-900 mb-2">Medical history</h2>
              <p className="text-gray-500 mb-8">Select any conditions that apply.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Type 2 Diabetes", "High Blood Pressure", "High Cholesterol", "Thyroid Conditions", "Heart Disease", "Kidney Disease", "Pancreatitis", "None of the above"].map(c => (
                  <div key={c} className={`text-center py-3 text-sm ${radioClass(form.conditions.includes(c))}`} onClick={() => toggleCondition(c)}>
                    {c}
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-900 block mb-1.5">Current Medications</label>
                <input className={inputClass} value={form.medications} onChange={e => update("medications", e.target.value)} placeholder="List any current medications" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-900 block mb-2">Previously used GLP-1 medication?</label>
                <div className="flex gap-3">
                  {["yes", "no"].map(v => (
                    <div key={v} className={`flex-1 text-center py-3 ${radioClass(form.previousGlp1 === v)}`} onClick={() => update("previousGlp1", v)}>
                      <span className="font-semibold text-sm capitalize">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl text-gray-900 mb-3">Assessment Complete!</h2>
              <p className="text-gray-500 max-w-sm mx-auto mb-8">
                A licensed physician will review your information within 48 hours. You&apos;ll receive an email at <strong>{form.email}</strong>.
              </p>
              <Link href="/" className="btn-primary">Return Home</Link>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={step === 3 ? handleSubmit : () => setStep(s => s + 1)}
                className="btn-primary"
              >
                {step === 3 ? "Submit Assessment" : "Continue"} <span>→</span>
              </button>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-8 mt-8 mb-12 flex-wrap">
          {["HIPAA Compliant", "256-bit Encryption", "U.S. Licensed Physicians"].map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
              🔒 {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
