"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  CreditCard,
  Gift,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/messages", label: "Messages", icon: MessageSquare, badge: 1 },
  { href: "/portal/shipments", label: "Shipments", icon: Package },
  { href: "/portal/billing", label: "Billing", icon: CreditCard },
  { href: "/portal/referral", label: "Refer & Earn", icon: Gift },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Patient";
  const initials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/portal") return pathname === "/portal";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <>
      {/* Logo */}
      <div className="px-6 pb-6 border-b border-[#E8E2D6]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1B4332] flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".92"/>
              <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520"/>
            </svg>
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-[#1A1A1A] tracking-tight">TrimDoctor</span>
            <div className="text-[10px] font-medium text-[#8A8A8A] -mt-0.5 tracking-wide uppercase">Patient Portal</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map(item => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                active
                  ? "bg-[#D8F3DC] text-[#1B4332] font-semibold shadow-sm"
                  : "text-[#8A8A8A] hover:bg-[#FBF8F3] hover:text-[#1A1A1A]"
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#1B4332] rounded-r-full" />
              )}
              <Icon className={`w-[18px] h-[18px] ${active ? "text-[#1B4332]" : "text-[#8A8A8A] group-hover:text-[#40916C]"} transition-colors`} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {active && (
                <ChevronRight className="w-3.5 h-3.5 text-[#40916C]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-4 pt-4 pb-2 border-t border-[#E8E2D6]">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FBF8F3] transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[#1A1A1A] truncate">{userName}</div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1 text-[11px] text-[#8A8A8A] hover:text-red-500 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-[#E8E2D6] pt-6 flex-col z-40">
        {sidebar}
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-xl border-b border-[#E8E2D6] z-50 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#FBF8F3] transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[#1A1A1A]" /> : <Menu className="w-5 h-5 text-[#1A1A1A]" />}
        </button>
        <div className="ml-3 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1B4332] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
              <path d="M10 10h4v16h10v4H10V10z" fill="white" fillOpacity=".92"/>
              <path d="M28 10h4v4h-4v4h-4v-4h-4v-4h4V6h4v4z" fill="#DAA520"/>
            </svg>
          </div>
          <span className="font-serif text-base font-bold text-[#1A1A1A]">TrimDoctor</span>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white pt-16 flex flex-col shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="lg:ml-[260px] min-h-screen pt-14 lg:pt-0">
        <div className="p-5 sm:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
