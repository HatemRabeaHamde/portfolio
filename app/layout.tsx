import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  Hanken_Grotesk,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Montserrat,
  Open_Sans,
} from "next/font/google";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import Reveal from "@/components/Reveal";
import Cursor from "@/components/Cursor";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: "400" });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  /** Absolute base for canonical and social-preview URLs. Set NEXT_PUBLIC_SITE_URL in production. */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Senior full-stack developer taking SaaS, marketplaces and payment products from MVP to production — Laravel, NestJS, React, Scrum.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [serif, inter, mono, hanken, geistMono, montserrat, openSans]
    .map((f) => f.variable)
    .join(" ");

  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <body>
        <Loader />
        <Nav />
        {children}
        <Reveal />
        <Cursor />
      </body>
    </html>
  );
}
