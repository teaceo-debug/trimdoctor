"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const NAV = [
  { href: "/portal", label: "Dashboard", icon: "◉" },
  { href: "/portal/messages", label: "Messages", icon: "💬" },
  { href: "/portal/shipments", label: "Shipments", icon: "📦" },
  { href: "/portal/billing", label: "Billing", icon: "💳" },
  { href: "/portal/referral", label: "Refer & Earn", icon: "🎁" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Patient";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="font-serif text-xl text-gray-900">TrimDoctor</span>
          </Link>
          <div className="text-xs text-gray-400 mt-2">Patient Portal</div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-50 text-brand-500 font-semibold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center text-sm">👤</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">{userName}</div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-[260px] flex-1 p-8 max-w-4xl">
        {children}
      </main>
    </div>
  );
}
