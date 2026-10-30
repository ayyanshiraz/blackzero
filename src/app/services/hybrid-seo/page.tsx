import { Metadata } from "next";
import ServiceClientView from "@/components/ServiceClientView";

const hybridSeoData = {
  title: "Hybrid SEO Services (Traditional + AI)",
  slug: "hybrid-seo",
  imageUrl: "/seo.webp",
  imgAltText: "Hybrid SEO architecture combining technical search optimization with AI answer engine visibility",
  description:
    "Capture high-intent organic demand across traditional search engines and AI answer platforms. We combine technical crawl engineering, semantic entity authority, and Generative Engine Optimization (GEO) to drive qualified pipeline growth.",
  subSections: [
    {
      title: "Search Engine Optimization (SEO)",
      slug: "search-engine-optimization",
      description:
        "Sustainable organic rankings begin with flawless technical foundations. Our search engine optimization services start with a deep forensic audit of your site architecture, server-side rendering, XML sitemaps, and Core Web Vitals (LCP, INP, and CLS) to eliminate every crawl bottleneck.\n\nWe restructure internal link graphs, resolve canonicalization conflicts, and deploy rich JSON-LD schema markup so search engine bots index your commercial pages with zero friction. Every campaign is backed by transparent keyword movement tracking and qualified organic lead attribution.",
      imageUrl: "/seo.webp",
      imgAltText: "Technical SEO audit dashboard showing Core Web Vitals and crawl efficiency metrics",
    },
    {
      title: "Traditional SEO Meets AI-Powered Growth",
      slug: "traditional-ai-seo",
      description:
        "Modern search algorithms evaluate topical depth and entity relationships rather than isolated keyword density. We merge proven on-page SEO fundamentals with natural language processing (NLP) topic clustering to map the entire buyer journey across your industry.\n\nBy analyzing thousands of SERP competitors and semantic co-occurrence patterns, our strategists build authoritative pillar pages and supporting content hubs. This dual methodology satisfies human buyer intent while signaling complete subject-matter authority to Google ranking systems.",
      imageUrl: "/tsm.webp",
      imgAltText: "Semantic topic cluster mapping and AI-assisted keyword research workflow",
    },
    {
      title: "Rank Higher with Smart SEO + AI",
      slug: "smart-seo-ai",
      description:
        "Decision-makers increasingly rely on Google AI Overviews, ChatGPT Search, Perplexity, and Claude to shortlist B2B vendors. Our Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) frameworks structure your content so large language models cite your brand as the primary source.\n\nWe engineer concise direct-answer blocks, verifiable comparative tables, and entity-disambiguated knowledge graphs that match conversational search prompts. Your brand captures high-converting visibility across both traditional blue links and generative AI responses.",
      imageUrl: "/rhw.webp",
      imgAltText: "Generative Engine Optimization and Answer Engine Optimization citation visibility framework",
    },
    {
      title: "Data-Driven SEO for the Modern Web",
      slug: "data-driven-seo",
      description:
        "Guesswork has no place in organic growth strategy. We utilize Google Search Console API telemetry, log-file crawl analysis, and SERP volatility monitoring to identify high-margin ranking opportunities before competitors react.\n\nEvery content brief and technical sprint is prioritized by search volume, commercial conversion intent, and ranking difficulty. We track organic performance all the way to closed-won pipeline revenue, ensuring your search investment delivers compounding customer acquisition returns.",
      imageUrl: "/dds.webp",
      imgAltText: "Search telemetry analytics tracking organic impressions, click-through rates, and pipeline attribution",
    },
    {
      title: "Smarter Rankings. Faster Results.",
      slug: "smarter-rankings",
      description:
        "Accelerate time-to-rank across competitive national and regional US markets. We combine automated IndexNow ping protocols, programmatic location-page architectures, and high-authority digital PR link acquisition to compress traditional SEO timelines.\n\nWhether scaling multi-state Google Business Profile visibility or securing editorial backlinks from respected industry publications, our workflows build durable domain authority that withstands core algorithm updates.",
      imageUrl: "/sr.webp",
      imgAltText: "National and regional US search ranking velocity and domain authority growth chart",
    },
  ],
};

export const metadata: Metadata = {
  title: "Hybrid SEO, GEO & AEO Services USA | Black Zero Technologies",
  description:
    "Dominate Google search and AI answer engines with Hybrid SEO services. Technical SEO audits, Generative Engine Optimization (GEO), and semantic content strategy.",
  keywords: [
    "hybrid SEO services USA",
    "Generative Engine Optimization agency",
    "Answer Engine Optimization services",
    "technical SEO audit services",
    "B2B enterprise SEO company",
    "AI search optimization",
    "semantic SEO content strategy",
  ],
  alternates: {
    canonical: "https://www.blackzero.org/services/hybrid-seo",
  },
  openGraph: {
    title: "Hybrid SEO, GEO & AEO Services USA | Black Zero Technologies",
    description:
      "Rank across Google and AI answer engines with technical SEO engineering, semantic topic clusters, and Generative Engine Optimization.",
    url: "https://www.blackzero.org/services/hybrid-seo",
    siteName: "Black Zero Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.blackzero.org/seo.webp",
        width: 1200,
        height: 630,
        alt: "Hybrid SEO architecture combining technical search optimization with AI answer engine visibility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hybrid SEO, GEO & AEO Services USA | Black Zero Technologies",
    description:
      "Capture high-intent organic traffic across Google, ChatGPT Search, and Perplexity with Black Zero Technologies.",
    images: ["https://www.blackzero.org/seo.webp"],
  },
};

export default function HybridSeoPage() {
  // Structured data for Hybrid SEO, GEO, and AEO Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Hybrid SEO, GEO, and Answer Engine Optimization Services",
    serviceType: "Search Engine Optimization and Generative Engine Optimization",
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
      "Technical SEO audits, Core Web Vitals optimization, semantic topic clustering, and Generative Engine Optimization (GEO & AEO) for US businesses.",
    url: "https://www.blackzero.org/services/hybrid-seo",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Search and Answer Engine Optimization Capabilities",
      itemListElement: hybridSeoData.subSections.map((sub, index) => ({
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
      <ServiceClientView service={hybridSeoData} />
    </>
  );
}