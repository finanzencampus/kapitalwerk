import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kapitalwerk – Moderne Finanzbildung",
  description:
    "Verstehe Geld. Baue Vermögen. Triff bessere Entscheidungen. Interaktive Finanzbildung: Zinseszins-Simulator, Risiko-Labor, 400 Jahre Börsengeschichte, ETF-Wissen und Anlegerpsychologie – evidenzbasiert, ohne Tracking, ohne Produktverkauf.",
  keywords: [
    "Finanzbildung", "Investieren lernen", "ETF", "Zinseszins", "Vermögensaufbau",
    "Börse", "Aktien", "Diversifikation", "Anlegerpsychologie", "MSCI World",
    "Sparplan", "Abgeltungsteuer", "Freistellungsauftrag", "Risikomanagement",
  ],
  authors: [{ name: "Kapitalwerk" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Kapitalwerk – Moderne Finanzbildung",
    description: "Evidenzbasierte, interaktive Finanzbildung für die nächste Generation von Investoren.",
    type: "website",
    locale: "de_DE",
    siteName: "Kapitalwerk",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className="dark">
      <body className={`${sora.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
