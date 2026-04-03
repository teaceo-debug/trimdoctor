"use client";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Phone,
  Info,
  ShieldCheck,
} from "lucide-react";

const INITIAL_MESSAGES = [
  { from: "provider", text: "Great progress, Michael! Your weight loss is right on track. I'm recommending we increase your dose to 1.0mg. Let me know if you have questions.", time: "Mar 28, 2:15 PM" },
  { from: "patient", text: "Thanks Dr. Williams! I have been feeling the appetite suppression wearing off toward end of the week so that makes sense. Any side effects at the higher dose?", time: "Mar 28, 3:02 PM" },
  { from: "provider", text: "Good observation. At 1.0mg, you may experience some temporary nausea for the first week or two. Stay hydrated, eat smaller meals, and reach out if it feels too intense.", time: "Mar 28, 4:30 PM" },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "patient", text: input.trim(), time: "Just now" }]);
    setInput("");
    inputRef.current?.focus();
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: "provider",
        text: "Thanks for your message! I'll review and get back to you within a few hours. If urgent, call (323) 690-1564.",
        time: "Just now"
      }]);
    }, 1500);
  };

  // Group messages by date
  const getDateGroup = (time: string) => {
    if (time === "Just now") return "Today";
    if (time.includes("Mar 28")) return "March 28, 2026";
    return time.split(",")[0];
  };

  let lastGroup = "";

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight mb-1">Messages</h1>
        <p className="text-sm text-[#8A8A8A]">Secure messaging with your care team</p>
      </div>

      {/* Chat container */}
      <div className="bg-white rounded-2xl border border-[#E8E2D6] overflow-hidden shadow-sm">
        {/* Provider header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E8E2D6] flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#D8F3DC] to-[#95D5B2] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#1B4332]" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-[#1A1A1A]">Dr. Sarah Williams, MD</div>
            <div className="text-xs text-[#8A8A8A]">Internal Medicine — Board Certified</div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="h-[440px] overflow-y-auto p-5 sm:p-6 bg-[#FBF8F3] space-y-1">
          {messages.map((m, i) => {
            const group = getDateGroup(m.time);
            const showGroup = group !== lastGroup;
            lastGroup = group;
            const isPatient = m.from === "patient";

            return (
              <div key={i}>
                {showGroup && (
                  <div className="flex items-center justify-center py-3">
                    <span className="text-[10px] font-semibold text-[#8A8A8A] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8E2D6]/50">
                      {group}
                    </span>
                  </div>
                )}
                <div className={`flex flex-col ${isPatient ? "items-end" : "items-start"} mb-3`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 text-[13.5px] leading-relaxed ${
                      isPatient
                        ? "bg-[#1B4332] text-white rounded-2xl rounded-br-md shadow-sm"
                        : "bg-white border border-[#E8E2D6] text-[#1A1A1A] rounded-2xl rounded-bl-md shadow-sm"
                    }`}
                  >
                    {!isPatient && (
                      <div className="text-[10px] font-bold text-[#2D6A4F] mb-1.5 uppercase tracking-wide">Dr. Williams</div>
                    )}
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#8A8A8A] mt-1 px-1">{m.time}</span>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-[#E8E2D6] bg-white">
          <div className="flex gap-2 sm:gap-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type a message to your provider..."
              className="flex-1 px-4 py-3 border border-[#E8E2D6] rounded-xl text-sm outline-none focus:border-[#95D5B2] focus:ring-2 focus:ring-[#D8F3DC]/50 transition-all bg-[#FBF8F3] placeholder:text-[#8A8A8A]"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="px-4 sm:px-5 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-[#E8E2D6] disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="mt-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-sm text-blue-700 flex items-start gap-3">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-semibold">Response times:</span> Messages are typically answered within 2-4 hours during business hours.
          For emergencies, call 911. For urgent questions, call{" "}
          <a href="tel:3236901564" className="font-semibold underline underline-offset-2 inline-flex items-center gap-1">
            <Phone className="w-3 h-3" />
            (323) 690-1564
          </a>
        </div>
      </div>
    </div>
  );
}
