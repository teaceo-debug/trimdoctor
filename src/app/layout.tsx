import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrimDoctor — Doctor-Guided Weight Loss | GLP-1 Medication | Starting at $179/mo",
  description: "Doctor-prescribed compounded semaglutide delivered to your door. No insurance needed. No waiting rooms. Board-certified physicians. Free shipping.",
  openGraph: {
    title: "TrimDoctor — Doctor-guided weight loss, delivered.",
    description: "Compounded GLP-1 medication starting at $179/month. Board-certified physicians. Free shipping. Cancel anytime.",
    url: "https://trimdoctor.com",
    siteName: "TrimDoctor",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased text-[#1A1A1A] bg-[#FBF8F3]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
