"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        scrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-brand-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="font-serif text-[22px] text-gray-900 tracking-tight">TrimDoctor</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/#how-it-works" className="hidden md:block text-gray-700 font-medium text-[15px] hover:text-brand-500 transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="hidden md:block text-gray-700 font-medium text-[15px] hover:text-brand-500 transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="hidden md:block text-gray-700 font-medium text-[15px] hover:text-brand-500 transition-colors">
            FAQ
          </Link>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 text-white font-semibold text-sm rounded-full hover:bg-brand-700 transition-all hover:shadow-lg"
          >
            Get Started <span>→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
