import React from "react";
import type { Metadata } from "next";
import CustomERPClient from "@/components/CustomERPClient";

export const metadata: Metadata = {
  title: "Custom ERP Software Development Services | Black Zero Technologies",
  description:
    "Architect scalable custom ERP software for mid-market and enterprise operations teams. Replace rigid NetSuite or SAP limits with Next.js and PostgreSQL.",
  alternates: {
    canonical: "https://www.blackzero.org/services/custom-erp-development",
  },
  openGraph: {
    title: "Custom ERP Software Development Services | Black Zero Technologies",
    description:
      "Bespoke ERP systems, Bill of Materials tracking, multi-warehouse inventory hubs, and automated financial ledgers for US enterprise operations.",
    url: "https://www.blackzero.org/services/custom-erp-development",
    siteName: "Black Zero Technologies",
    type: "website",
    images: [
      {
        url: "https://www.blackzero.org/Blogs/blog71.webp",
        width: 1200,
        height: 630,
        alt: "Custom Enterprise ERP Architecture by Black Zero Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom ERP Software Development Services | Black Zero Technologies",
    description:
      "Replace fragmented spreadsheets and rigid legacy ERPs with a proprietary, zero-license-tax custom ERP platform engineered for US operations.",
    images: ["https://www.blackzero.org/Blogs/blog71.webp"],
  },
};

export default function CustomERPDevelopmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Custom Enterprise ERP Development",
        serviceType: "Enterprise Resource Planning Software Development",
        provider: {
          "@type": "Organization",
          name: "Black Zero Technologies",
          url: "https://www.blackzero.org",
        },
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        description:
          "Custom enterprise ERP software development featuring automated Chart of Accounts ledgers, Bill of Materials production tracking, multi-warehouse inventory management, and legacy data migration.",
        url: "https://www.blackzero.org/services/custom-erp-development",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does custom ERP software development cost for a mid-market firm?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Focused core ERP deployments (such as unified inventory, procurement, and financial ledger automation) typically range from $45,000 to $95,000, while comprehensive multi-facility enterprise architectures range from $100,000 to $220,000+ billed across verified engineering milestones with zero recurring per-seat fees.",
            },
          },
          {
            "@type": "Question",
            name: "What is the typical timeline to build and deploy a custom ERP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A production-ready Phase 1 MVP normally ships in 12 to 16 weeks. Full enterprise rollouts involving legacy data migration, EDI/X12 integrations, and multi-warehouse cut-overs typically take 20 to 32 weeks.",
            },
          },
          {
            "@type": "Question",
            name: "When should an enterprise build a custom ERP instead of buying NetSuite or SAP?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Building a custom ERP is more cost-effective when off-the-shelf platforms force your team to maintain manual spreadsheet workarounds, charge punitive per-user license fees across hundreds of staff, or fail to support proprietary manufacturing, BOM, and multi-entity workflows.",
            },
          },
          {
            "@type": "Question",
            name: "How do you prevent operational downtime during legacy ERP data migration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We execute a phased parallel-run cut-over strategy. Automated ETL scripts extract, deduplicate, and validate records from QuickBooks, NetSuite, or SAP into a staging PostgreSQL cluster while bi-directional webhooks keep both systems synchronized until User Acceptance Testing (UAT) is signed off.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomERPClient />
    </>
  );
}