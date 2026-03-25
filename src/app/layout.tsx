import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samyen Lee Andriatiana | Software Engineer Fullstack",
  description:
    "Portfolio de Samyen Lee Andriatiana – Software Engineer Fullstack .NET / React / Node avec 5 ans d'expérience. Expertise en développement web, DevOps et IA générative.",
  keywords: [
    "Software Engineer",
    "Fullstack Developer",
    "React",
    "Next.js",
    ".NET",
    "Portfolio",
    "Samyen Lee",
  ],
  authors: [{ name: "Samyen Lee Andriatiana" }],
  openGraph: {
    title: "Samyen Lee Andriatiana | Software Engineer Fullstack",
    description:
      "Portfolio interactif – Software Engineer Fullstack .NET / React / Node",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body
        className="min-h-screen bg-background text-foreground overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
