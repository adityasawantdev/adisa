import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADISA | Aditya Sawant - Founder Portfolio",
  description: "Building Businesses. Building Systems. Building The Future. Official portfolio of Aditya Sawant, founder of ADISA.",
  keywords: ["Aditya Sawant", "ADISA", "Founder", "Entrepreneur", "Developer", "Builder", "Systems"],
  authors: [{ name: "Aditya Sawant" }],
  creator: "Aditya Sawant",
  openGraph: {
    title: "ADISA | Aditya Sawant",
    description: "Building Businesses. Building Systems. Building The Future.",
    type: "website",
    siteName: "ADISA",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADISA | Aditya Sawant",
    description: "Building Businesses. Building Systems. Building The Future.",
    creator: "@adityasawant",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-space-900 text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
