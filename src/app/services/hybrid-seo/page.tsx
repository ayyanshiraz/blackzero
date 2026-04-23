import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const hybridSeoData = { 
  title: `Hybrid SEO Services (Traditional + AI)`, 
  slug: `hybrid-seo`,
  imageUrl: `/seo.webp`,
  imgAltText: `Data-driven SEO and AI powered growth`,
  description: `Traditional SEO Meets AI-Powered Growth. Rank Higher with Smart SEO and AI. Data-Driven SEO for the Modern Web. Smarter Rankings. Faster Results.`,
  subSections: [
      { 
          title: `Search Engine Optimization (SEO)`, 
          slug: `search-engine-optimization`, 
          description: `Achieving high rankings in search engines is crucial for every business to achieve long-term success in the digital age. We provide comprehensive search engine optimization (SEO) services that improve your online visibility and increase organic traffic to your website. Our approach starts with an in-depth analysis of your current website structure to identify technical issues that are hindering your growth. Through professional SEO audit services, we clearly explain what needs to be fixed according to the latest algorithms. We optimize your on-page content and build high-quality backlinks so that you can establish strong authority in your specific industry. \n\nStaying ahead of the competition requires a strategy that keeps pace with the constant changes in search engine ranking factors and trends. Our team ensures that your keywords are targeted accurately so that you reach customers who are truly interested in your services or products. We pride ourselves on providing transparent reporting so that you can see for yourself the real growth and improvement in your online presence. Whether you are a local shop or a large corporation, we provide these expert digital solutions to clients across the United States.`, 
          imageUrl: `/seo.webp`
      },
      {
          title: `Traditional SEO Meets AI-Powered Growth`,
          slug: `traditional-ai-seo`,
          description: `We blend proven search engine optimization techniques with advanced artificial intelligence tools. This hybrid approach ensures your website builds a solid foundation while adapting quickly to new algorithm updates. Enjoy steady and reliable growth in your organic traffic.`,
          imageUrl: `/tsm.webp`
      },
      {
          title: `Rank Higher with Smart SEO + AI`,
          slug: `smart-seo-ai`,
          description: `Climb search engine result pages using intelligent analytics and automated content audits. We analyze vast amounts of search data to find the exact strategies that push your web pages past the competition. Secure the top positions your business deserves.`,
          imageUrl: `/rhw.webp`
      },
      {
          title: `Data-Driven SEO for the Modern Web`,
          slug: `data-driven-seo`,
          description: `Base your search strategy on solid facts and numbers. We monitor user behavior and search trends to continuously improve your website visibility and capture targeted organic visitors. Keep your brand relevant and visible in a constantly changing digital landscape.`,
          imageUrl: `/dds.webp`
      },
      {
          title: `Smarter Rankings. Faster Results.`,
          slug: `smarter-rankings`,
          description: `Accelerate your path to the first page of search results. Our streamlined optimization process targets high intent keywords and technical fixes that deliver measurable improvements and immediate impact. Gain an advantage over competitors by reaching your audience sooner.`,
          imageUrl: `/sr.webp`
      }
  ]
};

export const metadata: Metadata = {
  title: `Hybrid SEO Services | AI-Powered Growth & Traditional SEO | Black Zero`,
  description: `Traditional SEO Meets AI-Powered Growth. Rank Higher with Smart SEO and AI. Experience Data-Driven SEO for the Modern Web with Smarter Rankings and Faster Results.`,
  keywords: [`hybrid SEO services`, `AI SEO`, `traditional SEO`, `search engine optimization services`, `SEO audit services`, `modern web SEO`],
  alternates: {
    canonical: `/services/hybrid-seo`,
  },
  openGraph: {
    title: `Hybrid SEO Services | AI-Powered Growth & Traditional SEO | Black Zero`,
    description: `Traditional SEO Meets AI-Powered Growth. Rank Higher with Smart SEO and AI. Experience Data-Driven SEO for the Modern Web with Smarter Rankings and Faster Results.`,
    url: `/services/hybrid-seo`,
    siteName: `Black Zero`,
    locale: `en_US`,
    type: `website`,
    images: [{ url: `/seo.webp`, alt: `Data-driven SEO and AI powered growth` }],
  },
};

export default function HybridSeoPage() {
  return <ServiceClientView service={hybridSeoData} />;
}