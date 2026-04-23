import { Metadata } from 'next';
import ServicesPageClient from '@/components/ServicesPageClient';

const servicesData = [
    { 
        title: `AI and Software Hub`, 
        slug: `ai-software-hub`,
        imageUrl: `/development.webp`,
        imgAltText: `AI and Software Hub providing complete ERP solutions`,
        description: `Building Intelligent Systems for Tomorrow. AI-Powered Software, Built for Growth. From Idea to Intelligent Execution. Custom Software. Smarter Results. Providing complete ERP solutions and individual systems.`,
    },
    { 
        title: `Data Analytics`, 
        slug: `data-analytics`,
        imageUrl: `/business-analytics.webp`,
        imgAltText: `Data analytics dashboard displaying growth metrics and data insights`,
        description: `Unlock the power of your data. We provide comprehensive analytics to help you make informed decisions for sustainable growth.`,
    },
    { 
        title: `Advanced Website and Portal Systems`, 
        slug: `advanced-websites`,
        imageUrl: `/web.webp`,
        imgAltText: `Advanced website and scalable portal systems`,
        description: `Custom Websites, 3D Experiences and Scalable Portals. We Build Interactive Web and 3D Digital Platforms. From Websites to Advanced Portal Systems. Next-Level Web Development with 3D Innovation.`,
    },
    { 
        title: `Hybrid SEO Services (Traditional + AI)`, 
        slug: `hybrid-seo`,
        imageUrl: `/seo.webp`,
        imgAltText: `Data-driven SEO and AI powered growth`,
        description: `Traditional SEO Meets AI-Powered Growth. Rank Higher with Smart SEO and AI. Data-Driven SEO for the Modern Web. Smarter Rankings. Faster Results.`,
    },
    { 
        title: `Marketing`, 
        slug: `marketing`,
        imageUrl: `/brand-strategy.webp`,
        imgAltText: `Strategic marketing planning and digital brand growth visualization`,
        description: `Data driven ads of all sorts across every platform. We create data-driven strategies that build brand awareness, drive traffic, and generate leads to elevate your digital footprint.`,
    },
    { 
        title: `Creative Design and Animation Studio`, 
        slug: `creative-design-and-animation-studio`,
        imageUrl: `/animation.webp`,
        imgAltText: `Creative 2D and 3D animation character and motion graphics design`,
        description: `Bringing Ideas to Life in 2D and 3D. Creative Designs. Stunning Animations. From Graphics to Motion We Create It All. Visual Stories, Perfectly Animated. Includes explanatory videos and scroll stoppers.`,
    },
];

export const metadata: Metadata = {
  title: `Our Services | AI, Digital Marketing, Analytics and Development | Black Zero`,
  description: `Explore Black Zeros comprehensive services: AI and Software Hub, Data Analytics, Advanced Websites, Hybrid SEO, Marketing, and Creative Design.`,
  keywords: [`AI and software hub`, `data analytics`, `advanced portal systems`, `hybrid SEO services`, `marketing`, `creative design animation`, `Black Zero services`],
  alternates: {
    canonical: `/services`,
  },
  openGraph: {
    title: `Our Services | AI, Digital Marketing, Analytics and Development | Black Zero`,
    description: `Explore Black Zeros comprehensive services: AI and Software Hub, Data Analytics, Advanced Websites, Hybrid SEO, Marketing, and Creative Design.`,
    url: `/services`,
    type: `website`,
    images: [
      {
        url: `/services2.webp`,
        width: 1200,
        height: 630,
        alt: `Black Zero Digital Services Overview`,
      },
    ],
  },
};

export default function ServicesPage() {
    return <ServicesPageClient services={servicesData} />;
}