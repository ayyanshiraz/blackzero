//@ts-ignore
import "./globals.css";
import React from "react";
import GlobalNavbar from "@/components/GlobalNavbar";
import FooterSection from "@/sections/FooterSection";
import { ClientSlideshow } from "@/components/ClientSlideshow";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";
import HideOnDashboard from "@/components/HideOnDashboard";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppChat from "@/components/WhatsAppChat";

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
    default: "IT Consulting & Custom App Development USA | Black Zero",
    template: "%s",
  },
  description: "Expert IT consulting, custom app development, and scalable digital solutions to grow your USA business with Black Zero.",
  verification: {
    google: "1HfyejT0xZl6FqT0DJLA59GxpsyCsDe5Ii3KFuvhDmg",
  },
  openGraph: {
    title: "IT Consulting & Custom App Development USA | Black Zero",
    description: "Expert IT consulting, custom app development, and scalable digital solutions to grow your USA business with Black Zero.",
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
    title: "IT Consulting & Custom App Development USA | Black Zero",
    description: "Expert IT consulting, custom app development, and scalable digital solutions to grow your USA business with Black Zero.",
    images: ["/opengraph-image.png"],
  },
};

// Define the JSON-LD Schema for Organization and Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Black Zero",
  url: "https://www.blackzero.org",
  logo: "https://www.blackzero.org/opengraph-image.png",
  description: "Expert IT consulting, custom app development, and scalable digital solutions to grow your USA business with Black Zero.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Inject JSON-LD Script for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <HideOnDashboard>
          <GlobalNavbar />
        </HideOnDashboard>
        
        <main>{children}<WhatsAppButton /></main>
        <FooterSection />
        <HideOnDashboard>
          <CookieBanner />
        </HideOnDashboard>  
        <Analytics />
        
      </body>
      <GoogleAnalytics gaId="G-V4V0EPZTPQ" />
    </html>
  );
}