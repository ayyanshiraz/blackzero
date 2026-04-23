import { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

// --- DATA WITH SEO FIELDS ---
const homeServicesData = [
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

const teamData = [
    { imgSrc: `/Team/CEO[1].webp`, name: `MIAN HASHIM HAROON`, role: `CEO`, imgAltText: `Mian Hashim Haroon, CEO of Black Zero` },
    { imgSrc: `/Team/coo3.webp`, name: `DR. ABDULLAH HAROON`, role: `COO`, imgAltText: `Dr. Abdullah Haroon, COO of Black Zero` },
    { imgSrc: `/Team/ayyan.webp`, name: `AYYAN SHIRAZ`, role: `Marketing Head`, imgAltText: `Ayyan Shiraz, Marketing Head at Black Zero` },
    { imgSrc: `/Team/yasir.webp`, name: `YASIR IRSHAD`, role: `IT Manager`, imgAltText: `Yasir Irshad, IT Manager at Black Zero` },
    { imgSrc: `/Team/ajwa4.webp`, name: `AJWA ARSHAD`, role: `Software Architect`, imgAltText: `Ajwa Arshad, Software Architect at Black Zero` },
    { imgSrc: `/Team/alishba2.webp`, name: `ALISHBA ZIA`, role: `Project Manager`, imgAltText: `Alishba Zia, Project Manager at Black Zero` },
];

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: `Black Zero | Full-Service Marketing and Software Company`,
  description: `Black Zero is a partner in creating and growing brands. We specialize in Ecommerce success, Web Development, Digital Marketing, and Business Analytics.`,
  keywords: [`digital marketing company`, `ecommerce solutions`, `software house Lahore`, `brand building`, `web development services`, `business analytics`, `Black Zero`],
  // 👇 Added Canonical Tag (Important for Home Page)
  alternates: {
    canonical: `/`,
  },
  openGraph: {
    title: `Black Zero | Full-Service Marketing and Software Company`,
    description: `Black Zero is a partner in creating and growing brands. We specialize in Ecommerce success, Web Development, Digital Marketing, and Business Analytics.`,
    url: `/`,
    type: `website`,
    images: [
      {
        url: `/brand-strategy.webp`, 
        width: 1200,
        height: 630,
        alt: `Black Zero - Creating and Growing Brands`,
      },
    ],
  },
};

export default function HomePage() {
    return <HomePageClient services={homeServicesData} teamMembers={teamData} />;
}