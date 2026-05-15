import "./globals.css";
import Preloader from "../components/Preloader";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClientSlideshow } from "@/components/ClientSlideshow";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";
import HideOnDashboard from '@/components/HideOnDashboard';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blackzero.org"),
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: {
    default: "Black Zero: IT Consulting and Digital Solutions USA",
    template: "%s | Black Zero",
  },
  description: "Grow your business with Black Zero. We provide outstanding IT consulting, custom app development, and scalable digital solutions customized for the USA market.",
  verification: {
    google: "1HfyejT0xZl6FqT0DJLA59GxpsyCsDe5Ii3KFuvhDmg",
  },
  openGraph: {
    title: "Black Zero: Strategic IT Consulting Solutions USA",
    description: "Grow your business with Black Zero. We provide outstanding IT consulting, custom app development, and scalable digital solutions customized for the USA market.",
    url: "https://www.blackzero.org/",
    siteName: "Black Zero",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Black Zero - Strategic IT Consulting Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Zero: Strategic IT Consulting Solutions USA",
    description: "Grow your business with Black Zero. We provide outstanding IT consulting, custom app development, and scalable digital solutions customized for the USA market.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Preloader />
        {/* 1. Hide Navbar on Dashboard */}
        <HideOnDashboard>
          <Navbar />
        </HideOnDashboard>

        {/* 2. ALWAYS show the main content (This is your actual page/dashboard) */}
        <main>{children}</main>
         <Footer />

        {/* 3. Hide all these marketing/footer elements on Dashboard */}
        <HideOnDashboard>
          
          <CookieBanner />
        </HideOnDashboard>  

        {/* 4. Analytics run in the background everywhere */}
        <Analytics />
        
        {/* 5. Floating WhatsApp Button */}
        <WhatsAppButton />
      </body>
      <GoogleAnalytics gaId="G-V4V0EPZTPQ" />
    </html>
  );
}