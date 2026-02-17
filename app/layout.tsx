import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://warehousemarketplace.com"),
  title: {
    default: "FlexiSpace | Flexible Warehousing Solutions",
    template: "%s | FlexiSpace",
  },
  description:
    "Connect with flexible warehousing solutions or monetize your warehouse space. Verified listings, competitive pricing, and quick deployment.",
  keywords: [
    "warehouse",
    "warehousing",
    "storage",
    "logistics",
    "warehouse rental",
    "warehouse space",
  ],
  authors: [{ name: "FlexiSpace" }],
  creator: "FlexiSpace",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://warehousemarketplace.com",
    siteName: "FlexiSpace",
    title: "FlexiSpace | Flexible Warehousing Solutions",
    description:
      "Connect with flexible warehousing solutions or monetize your warehouse space.",
    images: [
      {
        url: "https://warehousemarketplace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FlexiSpace",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
