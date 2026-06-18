<<<<<<< HEAD
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Script from 'next/script';
// 👇 NEW: Import SchemaMarkup
import SchemaMarkup from '@/components/SchemaMarkup'; 

const GTM_ID = 'GTM-MP4L5KDH';
const GA4_MEASUREMENT_ID = 'G-CV880G5R1G';
const CLIENT_GA4_ID = 'G-Y0CHQLBF3P';
const GOOGLE_ADS_ID = 'AW-17679136193';
const NEW_TRACKING_ID = 'AW-16532310584'; // ✅ Added your new Tag ID
const CONTACT_CONVERSION_ID = 'AW-17679136193/M2glCPjItMUbEMHriO5B';
const PURCHASE_EVENT_NAME = 'ads_conversion_Purchase_1';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.almadinahijamacenter.com'),
  title: "Best Hijama Center Lahore | 24/7 Home Service & Lady Staff",
  description: "Looking for the Best Hijama Center in Lahore? Get 24/7 Home Service by certified Male & Female staff. Book today!",
  keywords: ["Best hijama centre near me", "Hijama in Bahria Town Lahore", "Hijama Center in Lahore", "Sunnah Hijama Lahore", "Best Hijama Service in Lahore"],
  alternates: {
    canonical: './',
  },
  verification: {
    google: 'l7_HgOjYrV0g16QKEpV7oTW4pam3hJL5R08NeeZqemg',
  },
  openGraph: {
    title: "Best Hijama Center Lahore | 24/7 Home Service & Lady Staff",
    description: "Looking for the Best Hijama Center in Lahore? Get 24/7 Home Service by certified Male & Female staff. Safe cupping for pain & detox. Book Appointment!",
    url: 'https://www.almadinahijamacenter.com/',
    siteName: 'Al Madina Hijama Center',
    images: [
      {
        url: 'https://www.almadinahijamacenter.com/ceo.webp',
        width: 400,
        height: 450,
        alt: 'Mr Jameel ur Rehman, Expert Hijama Therapist',
      },
    ],
    locale: 'en_PK',
    type: 'website',
=======
import "./globals.css";

import React from "react";
import GlobalNavbar from "@/components/GlobalNavbar";
import FooterSection from "@/sections/FooterSection";
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
    default: "Black Zero: IT Consulting and Digital Solutions",
    template: "%s",
  },
  description: "Grow your business with Black Zero. We provide outstanding IT consulting, custom app development, and scalable digital solutions customized for the USA market.",
  verification: {
    google: "1HfyejT0xZl6FqT0DJLA59GxpsyCsDe5Ii3KFuvhDmg",
  },
  openGraph: {
    title: "Black Zero: Strategic IT Consulting Solutions",
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
>>>>>>> aa0485d (Fix hero section layout and padding)
  },
};

export default function RootLayout({
  children,
<<<<<<< HEAD
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-ads-config"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
          gtag('config', '${CLIENT_GA4_ID}');
          gtag('config', '${GOOGLE_ADS_ID}');
          gtag('config', '${NEW_TRACKING_ID}'); // ✅ Configured your new tracking ID
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': '${CONTACT_CONVERSION_ID}',
                'event_callback': callback
            });
            return false;
          }
          function gtagSendEvent(url) {
            var callback = function () {
              if (typeof url === 'string') {
                window.location = url;
              }
            };
            gtag('event', '${PURCHASE_EVENT_NAME}', {
              'event_callback': callback,
              'event_timeout': 2000,
            });
            return false;
          }
          `,
        }}
        strategy="afterInteractive"
      />
      
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased border-0`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <SchemaMarkup />

        <Navbar />
        {children}
        <FloatingWhatsApp />
        <Footer />
        <CookieBanner />
      </body>
=======
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
       
        {/* 1. Hide Navbar on Dashboard */}
        <HideOnDashboard>
          <GlobalNavbar />
        </HideOnDashboard>
        <main>{children}</main>
         <FooterSection />

        {/* 3. Hide all these marketing/footer elements on Dashboard */}
        <HideOnDashboard>
          <CookieBanner />
        </HideOnDashboard>  
        <Analytics />
        <WhatsAppButton />
      </body>
      <GoogleAnalytics gaId="G-V4V0EPZTPQ" />
>>>>>>> aa0485d (Fix hero section layout and padding)
    </html>
  );
}