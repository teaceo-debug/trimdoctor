"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileOpen(false);

  const navLinks = [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-6 md:px-8 ${
        scrolled
          ? "bg-[#FDFAF5]/92 backdrop-blur-2xl border-b border-[#E8E3DA]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[76px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="#1B4332" />
            <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity="0.9" />
            <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520" />
          </svg>
          <span className="font-serif text-[22px] text-[#1A1A1A] tracking-tight font-bold">
            TrimDoctor
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#8A8A8A] text-[14px] font-semibold hover:text-[#1B4332] transition-colors duration-200 no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            className="btn-primary !py-3 !px-7 !text-[14px]"
          >
            Get Started
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#1B4332]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[320px] pb-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block py-3 px-4 text-[#3D3D3D] text-[15px] font-semibold hover:bg-[#1B4332]/5 rounded-xl transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            onClick={handleNavClick}
            className="btn-primary mt-3 justify-center !text-[15px]"
          >
            Get Started &rarr;
          </Link>
        </div>
      </div>
    </nav>
  );
}
