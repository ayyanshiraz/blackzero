//@ts-ignore
import "./globals.css";
import React from "react";
import GlobalNavbar from "@/components/GlobalNavbar";
import FooterSection from "@/sections/FooterSection";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";
import HideOnDashboard from "@/components/HideOnDashboard";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blackzero.org"),
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
    default: "Custom ERP, CRM & AI Software Development USA | Black Zero",
    template: "%s",
  },
  description:
    "Custom ERP, CRM, and AI software for US mid-market and enterprise teams. Cut per-seat SaaS fees, own 100% of your code, work in US time zones.",
  keywords: [
    "custom software development company USA",
    "enterprise AI development services",
    "custom ERP software development",
    "custom omnichannel CRM development",
    "private LLM and RAG engineering",
    "Next.js enterprise web portals",
    "B2B data analytics consulting",
    "hybrid SEO and AEO agency USA",
    "Black Zero Technologies",
  ],
  verification: {
    google: "1HfyejT0xZl6FqT0DJLA59GxpsyCsDe5Ii3KFuvhDmg",
    other: {
      "p:domain_verify": "a6cdee704c5206f996e6508521a011bc",
    },
  },
  openGraph: {
    title: "Custom Software, Enterprise AI & ERP Development USA | Black Zero",
    description:
      "Replace bloated SaaS fees with 100% proprietary software. We engineer custom ERP/CRM systems, private AI pipelines, Next.js portals, and Hybrid SEO for US businesses.",
    url: "https://www.blackzero.org",
    siteName: "Black Zero Technologies",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Black Zero Technologies - Custom Software, Enterprise AI, ERP & Digital Growth Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software, Enterprise AI & ERP Development USA | Black Zero",
    description:
      "Custom ERP & CRM platforms, private LLM/RAG AI agents, Next.js web applications, data analytics, and Hybrid SEO built for US mid-market and enterprise teams.",
    images: ["/opengraph-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.blackzero.org/#organization",
      name: "Black Zero Technologies",
      alternateName: "Black Zero",
      url: "https://www.blackzero.org",
      logo: {
        "@type": "ImageObject",
        url: "https://www.blackzero.org/opengraph-image.png",
      },
      image: "https://www.blackzero.org/opengraph-image.png",
      description:
        "US-aligned enterprise software engineering, private AI development, custom ERP/CRM systems, data analytics, and Hybrid SEO agency.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gulberg III",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        postalCode: "54660",
        addressCountry: "PK",
      },
      areaServed: [
        {
          "@type": "Country",
          name: "United States",
        },
        {
          "@type": "AdministrativeArea",
          name: "North America",
        },
      ],
      knowsAbout: [
        "Custom Enterprise ERP Software Development",
        "Custom Omnichannel CRM Engineering",
        "Private Large Language Models (LLMs) and RAG Pipelines",
        "Next.js and TypeScript Full-Stack Web Applications",
        "Automated Python ETL and Business Intelligence Analytics",
        "Hybrid SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO)",
        "Full-Funnel B2B Performance Marketing",
        "2D/3D Product Animation and SaaS Explainer Videos",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales and customer support",
        email: "info@blackzero.org",
        availableLanguage: ["English"],
        areaServed: "US",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Black Zero Enterprise Technology & Digital Growth Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI and Software Hub",
              url: "https://www.blackzero.org/services/custom-ai-software-development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Resource Planning (ERP)",
              url: "https://www.blackzero.org/services/custom-erp-development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Customer Relationship Management (CRM)",
              url: "https://www.blackzero.org/services/custom-crm-development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Advanced Website and Portal Systems",
              url: "https://www.blackzero.org/services/web-portal-development",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Data Analytics & Business Intelligence",
              url: "https://www.blackzero.org/services/data-analytics",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hybrid SEO Services (Traditional + AI)",
              url: "https://www.blackzero.org/services/hybrid-seo",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "B2B Performance Marketing",
              url: "https://www.blackzero.org/services/marketing",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Creative Design and Animation Studio",
              url: "https://www.blackzero.org/services/3d-animation-explainer-videos",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.blackzero.org/#website",
      url: "https://www.blackzero.org",
      name: "Black Zero Technologies",
      publisher: {
        "@id": "https://www.blackzero.org/#organization",
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <HideOnDashboard>
          <GlobalNavbar />
        </HideOnDashboard>
        <main>
          {children}
          <WhatsAppButton />
        </main>
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