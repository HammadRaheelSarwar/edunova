import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edunova.ai"),
  title: {
    default: "EduNova AI — Empowering Education Through Artificial Intelligence",
    template: "%s | EduNova AI",
  },
  description:
    "EduNova AI is the all-in-one intelligent platform designed for schools, colleges, universities, and training institutes. Automate administration. Personalize learning. Unlock insights.",
  keywords: [
    "education management system",
    "AI learning platform",
    "school management software",
    "LMS",
    "edtech",
    "student information system",
    "educational SaaS",
    "EduNova",
  ],
  authors: [{ name: "Nexvora Dev Pvt Ltd", url: "https://nexvora.dev" }],
  creator: "Nexvora Dev Pvt Ltd",
  publisher: "Nexvora Dev Pvt Ltd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edunova.ai",
    siteName: "EduNova AI",
    title: "EduNova AI — The Operating System for Modern Education",
    description:
      "AI-first Educational Management Platform. Transform how your institution manages students, teachers, content, and outcomes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EduNova AI Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduNova AI — Empowering Education Through AI",
    description:
      "The all-in-one intelligent platform for modern educational institutions.",
    creator: "@edunova_ai",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563EB" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
