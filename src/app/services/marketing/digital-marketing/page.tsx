import { Metadata } from "next";
import SubSectionClientView from "@/components/SubSectionClientView";

const parentServiceInfo = {
  title: "Marketing",
  slug: "marketing",
};

const currentSubSection = {
  title: "Digital Marketing",
  slug: "digital-marketing",
  description:
    "Partnering with the right digital marketing company for small businesses and mid-market brands is the fastest path to predictable customer acquisition. We engineer channel-specific campaigns built around buyer intent, clear attribution, and measurable return on ad spend.",
  imageUrl: "/digitalmarketing.webp",
  imgAltText: "Performance marketing strategists analyzing multi-channel customer acquisition metrics for US businesses",
};

const digitalMarketingDetails = [
  {
    title: "Social Media Marketing",
    description:
      "Organic reach alone rarely sustains aggressive revenue targets. We combine high-converting social media content creation services with precision social media advertising across Meta, Instagram, and emerging video networks to capture demand where your buyers spend their time.\n\nInstead of boosting random posts, our media buyers structure full-funnel campaigns—pairing scroll-stopping creative hooks for cold prospecting with dynamic retargeting sequences that recover abandoned carts and book qualified sales calls. Every campaign is tracked against customer acquisition cost (CAC) and net revenue contribution.",
    imageUrl: "/smm.webp",
    imgAltText: "Paid social media advertising funnel showing conversion growth and return on ad spend",
  },
  {
    title: "Social Media Handling",
    description:
      "Active, responsive social profiles build immediate buyer confidence when prospects research your company. Our account managers oversee your daily presence using enterprise social media management platforms—handling publishing queues, comment moderation, direct message triage, and real-time reputation monitoring.\n\nWe establish clear brand voice guidelines and rapid response workflows so customer inquiries never sit unanswered in your inbox. While your leadership team focuses on core operations, we keep your digital storefronts active, credible, and consistently aligned with your commercial calendar.",
    imageUrl: "/smh.webp",
    imgAltText: "Unified social media management platform displaying community engagement and inbox response queues",
  },
  {
    title: "Google Ads",
    description:
      "Capture high-intent buyers at the exact moment they search for your solution. Working with a dedicated Google Ads consultant ensures your budget goes toward commercial-intent keywords rather than irrelevant informational clicks. Our Google Ads management services cover Search, Performance Max, YouTube, and Shopping feeds.\n\nWe structure tightly themed ad groups, negative keyword guardrails, and conversion-optimized landing pages to improve your Quality Score and lower cost per click. By syncing offline CRM deal stages back into Google Ads, we train bidding algorithms to optimize for closed revenue rather than raw form fills.",
    imageUrl: "/googleads.webp",
    imgAltText: "Google Ads consultant reviewing search campaign Quality Scores and cost per acquisition metrics",
  },
  {
    title: "Content Calendar",
    description:
      "Inconsistent posting erodes audience trust and creates last-minute creative bottlenecks for internal teams. Our content calendar services give your brand a structured 30-to-90-day publishing roadmap aligned with product launches, seasonal promotions, and industry events.\n\nUsing collaborative social media scheduling platforms, we map out copy, visual assets, video scripts, and approval stages weeks in advance. Your marketing stakeholders get a single transparent view of every upcoming campaign, ensuring on-time execution across all channels without daily fire drills.",
    imageUrl: "/cc2.webp",
    imgAltText: "Multi-channel editorial calendar interface on a social media scheduling platform",
  },
  {
    title: "Pinterest Marketing",
    description:
      "Reach shoppers early in their planning phase when they are actively curating ideas and comparing products, long before they commit to a specific brand. Our Pinterest marketing specialists turn your product catalog into a visual discovery engine using Pinterest for Business, Rich Pins, and verified merchant feeds.\n\nWe research high-converting visual search terms, design vertical pin creatives built for high save rates, and manage promoted shopping campaigns that send ready-to-buy traffic directly to your checkout pages. Because pins maintain a long shelf life in search feeds, your visual assets continue driving compounding referral traffic months after publication.",
    imageUrl: "/pinterest.webp",
    imgAltText: "Pinterest marketing strategist optimizing visual shopping boards and product pins for e-commerce conversion",
  },
  {
    title: "TikTok Marketing",
    description:
      "Short-form vertical video is one of the fastest channels for product discovery and rapid brand awareness. We help commercial brands leverage TikTok for Business through native, creator-style video production that holds viewer attention past the critical first three seconds.\n\nAs a performance-focused TikTok Ads company, we pair Spark Ads, user-generated content (UGC) frameworks, and TikTok Shop integrations with granular audience testing. We monitor thumb-stop ratios, average watch time, and checkout conversions daily to scale winning creatives before ad fatigue sets in.",
    imageUrl: "/tiktok.webp",
    imgAltText: "Short-form video performance dashboard from a TikTok Ads campaign showing engagement and conversion rates",
  },
  {
    title: "LinkedIn Marketing",
    description:
      "Reaching C-suite executives, VPs, and procurement committees requires authoritative B2B positioning rather than consumer-style gimmicks. As a specialized B2B marketing company, we build executive thought-leadership programs and account-based marketing (ABM) funnels tailored to complex sales cycles.\n\nThrough precision LinkedIn Ads management—including Sponsored Content, Lead Gen Forms, and Conversation Ads—we target prospects by exact job title, company headcount, industry vertical, and seniority. Your sales team receives pre-qualified decision-makers directly in their pipeline without wasting ad spend on unverified traffic.",
    imageUrl: "/linkedin.webp",
    imgAltText: "B2B marketing team configuring account-based LinkedIn Ads management targeting enterprise decision-makers",
  },
];

const contactOptions = [
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "traditional-marketing", label: "Traditional Marketing" },
  { value: "pr-campaigns", label: "PR Campaigns" },
  { value: "design-and-branding", label: "Design and Branding" },
  { value: "data-driven-ads", label: "Data-Driven Ads" },
];

export const metadata: Metadata = {
  title: "Performance Digital Marketing Services USA | Black Zero",
  description:
    "Drive qualified leads and measurable ROAS with Black Zero Technologies. Expert Google Ads management, B2B LinkedIn marketing, paid social, and content strategy.",
  keywords: [
    "digital marketing company for small business",
    "social media advertising",
    "social media content creation services",
    "social media management platforms",
    "Google Ads consultant",
    "Google Ads management services",
    "social media scheduling platforms",
    "content calendar services in usa",
    "Pinterest marketing expert",
    "Pinterest for business",
    "TikTok ads company",
    "TikTok for business",
    "LinkedIn ads management",
    "B2B marketing company",
  ],
  alternates: {
    canonical: "https://www.blackzero.org/services/marketing/digital-marketing",
  },
  openGraph: {
    title: "Performance Digital Marketing Services USA | Black Zero Technologies",
    description:
      "Scale customer acquisition with Google Ads management, B2B LinkedIn campaigns, TikTok & Meta paid social, and structured content calendars.",
    url: "https://www.blackzero.org/services/marketing/digital-marketing",
    siteName: "Black Zero Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.blackzero.org/digitalmarketing.webp",
        width: 1200,
        height: 630,
        alt: "Performance marketing strategists analyzing multi-channel customer acquisition metrics for US businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Digital Marketing Services USA | Black Zero Technologies",
    description:
      "Full-funnel paid search, B2B LinkedIn advertising, and social media management engineered for measurable ROI.",
    images: ["https://www.blackzero.org/digitalmarketing.webp"],
  },
};

export default function DigitalMarketingPage() {
  // Structured data for Performance Digital Marketing Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Performance Digital Marketing Services",
    serviceType: "Paid Search, Paid Social, and B2B Digital Marketing",
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
      "Multi-channel digital marketing services including Google Ads management, B2B LinkedIn advertising, TikTok and Pinterest growth, paid social media marketing, and editorial content calendars.",
    url: "https://www.blackzero.org/services/marketing/digital-marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Channel Capabilities",
      itemListElement: digitalMarketingDetails.map((item, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description.replace(/\n+/g, " "),
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
      <SubSectionClientView
        serviceTitle={parentServiceInfo.title}
        serviceSlug={parentServiceInfo.slug}
        subSection={currentSubSection}
        details={digitalMarketingDetails}
        contactOptions={contactOptions}
      />
    </>
  );
}