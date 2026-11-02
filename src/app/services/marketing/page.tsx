import { Metadata } from "next";
import ServiceClientView from "@/components/ServiceClientView";

const marketingData = {
  title: "Turn Clicks Into Customers",
  slug: "marketing",
  imageUrl: "/brand-strategy.webp",
  imgAltText: "Marketing strategists mapping full-funnel internet marketing strategies for small business and mid-market brands",
  description:
    "Scaling a brand in a crowded market requires more than random ad spend. We engineer custom internet marketing strategies for small business owners and growing enterprises ready to turn attention into measurable revenue.",
  subSections: [
    {
      title: "Digital Marketing",
      slug: "digital-marketing",
      description:
        "Standing out in a saturated market takes a clear message that reaches buyers at the exact moment they are evaluating solutions. We deliver full-funnel digital marketing services for small businesses and scaling commercial brands, connecting every campaign directly to qualified pipeline growth.\n\nInstead of chasing vanity impressions, our strategists pair conversion-focused landing pages with authority-building content marketing services that answer real buyer questions. Every channel is tracked from first click to closed sale so you know exactly which campaigns drive customer acquisition across competitive US markets.",
      imageUrl: "/digitalmarketing.webp",
      imgAltText: "Analytics dashboard tracking conversions from digital marketing services and content marketing services",
    },
    {
      title: "Design and Branding",
      slug: "design-and-branding",
      description:
        "First impressions shape how buyers judge your pricing power and credibility before a sales conversation ever begins. We partner with ambitious companies to build cohesive visual systems through strategic brand identity design—covering typography, color architecture, messaging guidelines, and packaging.\n\nWhether launching a new venture or repositioning an established company, our custom logo design services and brand books ensure your visual identity looks sharp across web applications, pitch decks, and physical retail touchpoints. You walk away with a distinct corporate identity that commands immediate trust.",
      imageUrl: "/designandbranding.webp",
      imgAltText: "Brand strategist developing custom logo design services and visual brand identity guidelines",
    },
    {
      title: "PR Campaigns",
      slug: "pr-campaigns",
      description:
        "A single media mention or search result can define how investors, partners, and customers perceive your company. We shape public narrative through targeted media relations, executive thought-leadership placements, and proactive online reputation management.\n\nRather than blasting generic press releases into the void, our PR services connect your founders and product milestones with relevant trade journalists, podcasts, and national business publications. We monitor brand sentiment continuously to protect your credibility and position your leadership team as a trusted industry voice.",
      imageUrl: "/pr-campaigns.webp",
      imgAltText: "Public relations campaign manager coordinating media placements and online reputation management",
    },
    {
      title: "Traditional Marketing",
      slug: "traditional-marketing",
      description:
        "Offline touchpoints still carry unmatched weight when building regional familiarity and high-trust buyer relationships. We execute targeted traditional marketing in the US—spanning high-impact out-of-home billboards, trade show booth experiences, print collateral, and localized direct mail drops.\n\nTo bridge the gap between physical campaigns and digital attribution, we pair offline placements with custom QR routing, dedicated vanity URLs, and call-tracking numbers. Your brand captures attention in the real world while maintaining clear visibility into campaign return on investment.",
      imageUrl: "/traditional marketing.webp",
      imgAltText: "Creative team reviewing print collateral and direct mail layouts for traditional marketing campaigns",
    },
    {
      title: "Data-Driven Ads",
      slug: "data-driven-ads",
      description:
        "Paid media budgets evaporate quickly without strict audience segmentation and creative testing. We design, launch, and optimize data-driven ads across search, social, and programmatic display networks to capture high-intent buyers at a predictable cost per acquisition.\n\nBy feeding server-side conversion events and CRM deal outcomes back into ad platform algorithms, our media buyers cut wasted spend on low-quality clicks. We continuously test ad hooks, visual formats, and bidding strategies to scale your return on ad spend.",
      imageUrl: "/dda.webp",
      imgAltText: "Performance marketing specialist optimizing data-driven ads and return on ad spend metrics",
    },
  ],
};

export const metadata: Metadata = {
  title: "Full-Funnel Marketing & Brand Strategy USA | Black Zero",
  description:
    "Scale your business in the USA with Black Zero Technologies. Custom internet marketing strategies, brand identity design, PR campaigns, and data-driven ads.",
  keywords: [
    "internet marketing strategies for small business",
    "digital marketing services for small business",
    "content marketing services",
    "brand identity design",
    "logo design services",
    "online reputation management",
    "pr services",
    "traditional marketing in usa",
    "data driven ads",
  ],
  alternates: {
    canonical: "https://www.blackzero.org/services/marketing",
  },
  openGraph: {
    title: "Full-Funnel Marketing & Brand Strategy USA | Black Zero Technologies",
    description:
      "Turn clicks into customers with custom internet marketing strategies, cohesive brand identity design, PR media relations, and data-driven paid advertising.",
    url: "https://www.blackzero.org/services/marketing",
    siteName: "Black Zero Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.blackzero.org/brand-strategy.webp",
        width: 1200,
        height: 630,
        alt: "Marketing strategists mapping full-funnel internet marketing strategies for small business and mid-market brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Funnel Marketing & Brand Strategy USA | Black Zero Technologies",
    description:
      "Drive measurable customer acquisition with digital marketing, brand identity design, PR campaigns, and data-driven ad management.",
    images: ["https://www.blackzero.org/brand-strategy.webp"],
  },
};

export default function MarketingPage() {
  // Structured data for Full-Funnel Marketing and Brand Strategy Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Full-Funnel Marketing and Brand Strategy Services",
    serviceType: "Digital Marketing, Brand Identity Design, and Public Relations",
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
      "Full-funnel internet marketing strategies, content marketing, brand identity design, PR reputation management, traditional offline campaigns, and data-driven paid advertising for US businesses.",
    url: "https://www.blackzero.org/services/marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketing and Brand Growth Capabilities",
      itemListElement: marketingData.subSections.map((sub, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: sub.title,
          description: sub.description.replace(/\n+/g, " "),
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
      <ServiceClientView service={marketingData} />
    </>
  );
}