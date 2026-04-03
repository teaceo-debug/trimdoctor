import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrimDoctor — Doctor-Guided Weight Loss | GLP-1 Medication Medication | Starting at $179/mo",
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
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
