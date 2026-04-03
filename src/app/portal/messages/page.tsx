"use client";
import { useState, useRef, useEffect } from "react";

const INITIAL_MESSAGES = [
  { from: "provider", text: "Great progress, Michael! Your weight loss is right on track. I'm recommending we increase your dose to 1.0mg. Let me know if you have questions.", time: "Mar 28, 2:15 PM" },
  { from: "patient", text: "Thanks Dr. Williams! I have been feeling the appetite suppression wearing off toward end of the week so that makes sense. Any side effects at the higher dose?", time: "Mar 28, 3:02 PM" },
  { from: "provider", text: "Good observation. At 1.0mg, you may experience some temporary nausea for the first week or two. Stay hydrated, eat smaller meals, and reach out if it feels too intense.", time: "Mar 28, 4:30 PM" },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "patient", text: input.trim(), time: "Just now" }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "provider", text: "Thanks for your message! I'll review and get back to you within a few hours. If urgent, call (323) 690-1564.", time: "Just now" }]);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Messages</h1>
      <p className="text-sm text-gray-500 mb-6">Direct messaging with Dr. Sarah Williams, MD</p>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">👩‍⚕️</div>
          <div>
            <div className="font-bold text-sm text-gray-900">Dr. Sarah Williams, MD</div>
            <div className="text-xs text-gray-400">Internal Medicine — Board Certified</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-green-500">Available</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[420px] overflow-y-auto p-6 bg-gray-50 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.from === "patient" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.from === "patient"
                  ? "bg-brand-500 text-white rounded-br-sm"
                  : "bg-white border border-gray-200 text-gray-700 rounded-bl-sm"
              }`}>
                {m.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type a message to your provider..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-500"
          />
          <button onClick={send} className="btn-primary px-6 py-3 text-sm">Send</button>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-600 flex gap-2">
        <span>ℹ️</span>
        For emergencies call 911. For urgent questions call (323) 690-1564. Messages answered within 2-4 hours.
      </div>
    </div>
  );
}
