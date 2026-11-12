import { Metadata } from "next";
import ServicesPageClient from "@/components/ServicesPageClient";

const servicesData = [
  {
    title: `AI and Software Hub`,
    slug: `ai-software-hub`,
    imageUrl: `/development.webp`,
    imgAltText: `Enterprise AI software engineering hub for custom LLM agents and scalable backend systems`,
    description: `Deploy private LLM pipelines, Retrieval-Augmented Generation (RAG) workflows, and bespoke enterprise software built in Python, FastAPI, and Node.js. We engineer secure, high-concurrency digital systems tailored to your operational logic with full IP ownership.`,
  },
  {
    title: `Data Analytics`,
    slug: `data-analytics`,
    imageUrl: `/business-analytics.webp`,
    imgAltText: `Executive business intelligence dashboard displaying real-time ETL data analytics and revenue metrics`,
    description: `Transform fragmented operational databases into real-time executive decision engines. We build automated Python and SQL ETL pipelines, cloud data warehouses, and interactive BI dashboards that uncover revenue trends and eliminate reporting bottlenecks.`,
  },
  {
    title: `Advanced Website and Portal Systems`,
    slug: `advanced-websites`,
    imageUrl: `/web.webp`,
    imgAltText: `High-concurrency Next.js web application, interactive 3D platform, and enterprise client portal`,
    description: `Architect sub-second, conversion-focused web applications, interactive 3D digital experiences, and secure B2B client portals using Next.js, React, and TypeScript. Built for Core Web Vitals performance, multi-tenant scalability, and API extensibility.`,
  },
  {
    title: `Hybrid SEO Services (Traditional + AI)`,
    slug: `hybrid-seo`,
    imageUrl: `/seo.webp`,
    imgAltText: `Hybrid SEO and Answer Engine Optimization analytics for Google Search and AI Overviews`,
    description: `Capture high-intent US commercial buyers across Google Search, AI Overviews, ChatGPT Search, and Perplexity. We combine deep technical SEO audits, JSON-LD entity schema, and authoritative B2B content to drive compounding organic pipeline.`,
  },
  {
    title: `Marketing`,
    slug: `marketing`,
    imageUrl: `/brand-strategy.webp`,
    imgAltText: `Full-funnel B2B performance marketing and multi-channel demand generation strategy`,
    description: `Execute data-driven paid acquisition and full-funnel demand generation across Google Search, LinkedIn B2B, and Meta. We align creative testing, server-side GA4 attribution, and landing page CRO to lower customer acquisition costs and scale qualified leads.`,
  },
  {
    title: `Creative Design and Animation Studio`,
    slug: `creative-design-and-animation-studio`,
    imageUrl: `/animation.webp`,
    imgAltText: `2D and 3D product animation, motion graphics, and B2B SaaS explainer video production`,
    description: `Distill complex enterprise software and hardware products into high-converting visual stories. Our studio produces photorealistic 3D product renders, 2D motion graphics, B2B SaaS explainer videos, and scroll-stopping social video assets.`,
  },
  {
    title: `Enterprise Resource Planning (ERP)`,
    slug: `custom-erp-development`,
    imageUrl: `/erp.webp`,
    imgAltText: `Custom Enterprise Resource Planning software showing multi-warehouse inventory and financial ledgers`,
    description: `Modernize your supply chain, inventory, and HR with Custom ERP software designed specifically for US mid-market operations. Full IP ownership and no per-seat SaaS fees.`,
  },
  {
    title: `Customer Relationship Management (CRM)`,
    slug: `custom-crm-development`,
    imageUrl: `/crm.webp`,
    imgAltText: `Custom omnichannel CRM platform consolidating sales pipelines, WhatsApp, and email communications`,
    description: `Unify WhatsApp, email, and social inbox with AI lead routing. Build a customized CRM software for your US revenue team with seamless ERP synchronization.`,
  },
];

export const metadata: Metadata = {
  title: `Enterprise AI, Custom Software & B2B Marketing Services | Black Zero`,
  description: `Explore Black Zero Technologies enterprise services for US businesses: Custom AI & Software Engineering, ERP & CRM Development, Data Analytics, Advanced Next.js Portals, Hybrid SEO, and 2D/3D Animation.`,
  keywords: [
    `custom software development company USA`,
    `enterprise AI development services`,
    `custom ERP software development`,
    `custom CRM development solutions`,
    `B2B data analytics consulting`,
    `advanced Next.js web portal systems`,
    `hybrid SEO and AEO services`,
    `B2B digital marketing and 3D animation studio`,
  ],
  alternates: {
    canonical: `https://www.blackzero.org/services`,
  },
  openGraph: {
    title: `Enterprise AI, Custom Software & B2B Marketing Services | Black Zero`,
    description: `Explore Black Zero Technologies enterprise services: Custom AI & Software Hub, ERP/CRM Systems, Data Analytics, Advanced Web Portals, Hybrid SEO, and Creative 2D/3D Animation.`,
    url: `https://www.blackzero.org/services`,
    siteName: `Black Zero Technologies`,
    locale: `en_US`,
    type: `website`,
    images: [
      {
        url: `https://www.blackzero.org/services2.webp`,
        width: 1200,
        height: 630,
        alt: `Black Zero Technologies Enterprise Software, AI, and Digital Marketing Services Overview`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    title: `Enterprise AI, Custom Software & B2B Marketing Services | Black Zero`,
    description: `Custom AI & Software Engineering, ERP & CRM Systems, Data Analytics, Next.js Web Portals, Hybrid SEO, and 2D/3D Animation built for US business growth.`,
    images: [`https://www.blackzero.org/services2.webp`],
  },
};

export default function ServicesPage() {
  // JSON-LD Structured Data for Service Catalog & ItemList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Enterprise AI, Custom Software & B2B Marketing Services | Black Zero Technologies",
    url: "https://www.blackzero.org/services",
    description:
      "Comprehensive B2B technology and growth services by Black Zero Technologies including custom AI development, ERP and CRM engineering, data analytics, web portals, Hybrid SEO, and 2D/3D animation.",
    provider: {
      "@type": "Organization",
      name: "Black Zero Technologies",
      url: "https://www.blackzero.org",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: servicesData.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          url: `https://www.blackzero.org/services/${service.slug}`,
          description: service.description,
          image: `https://www.blackzero.org${service.imageUrl}`,
          provider: {
            "@type": "Organization",
            name: "Black Zero Technologies",
            url: "https://www.blackzero.org",
          },
          areaServed: {
            "@type": "Country",
            name: "United States",
          },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageClient services={servicesData} />
    </>
  );
}