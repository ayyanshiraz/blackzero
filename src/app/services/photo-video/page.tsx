import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const photoVideoData = { 
  title: "Photography / Videography", 
  slug: "photo-video",
  imageUrl: "/photo-video.webp",
  imgAltText: "Professional camera gear set up for a product photography shoot",
  description: "High-quality visuals are essential. We capture your products, team, and story in the best light for all your marketing channels.",
  subSections: [
      { 
          title: "Product Shoot", 
          slug: "product-shoot",
          description: "We create clean, crisp, and compelling images of your products that drive sales. Whether you need minimalist e-commerce shots on a pure white background or dynamic lifestyle photos that show your product in action, our team handles the entire process. We focus on expert lighting, precise staging, and professional retouching to ensure your inventory looks its absolute best and stands out in a crowded marketplace.", 
          imageUrl: "/productshoot.webp" 
      },
      { 
          title: "Article Shoot", 
          slug: "article-shoot",
          description: "Enhance your articles, blog posts, and editorial content with custom, high-quality photography that tells a story. We collaborate with you to create a series of images that perfectly complement your narrative, whether it's for a feature story, an interview, or a case study. Our editorial style focuses on capturing authentic moments and creating a strong visual theme that elevates your written content and engages your readers.", 
          imageUrl: "/articleshoot.webp" 
      },
      { 
          title: "Portfolio Shoot", 
          slug: "portfolio-shoot",
          description: "Build a professional portfolio that showcases your talent and opens doors to new opportunities. We specialize in creating high-end portfolio shoots for models, artists, designers, and other creative professionals. We work closely with you to understand your personal brand and career goals, directing a shoot that captures your unique style and produces a stunning collection of images for your website, social media, and professional submissions.", 
          imageUrl: "/portfolioshoot.webp" 
      },
      { 
          title: "Business Opening Ceremony", 
          slug: "business-opening-ceremony",
          description: "Capture the excitement and key moments of your grand opening with our professional event photography and videography. We document every aspect of your business opening ceremony, from the ribbon-cutting and guest speakers to candid interactions and the overall atmosphere. Our team works discreetly to create a comprehensive visual record of your milestone event, providing you with a powerful set of assets for press releases, social media, and future marketing.", 
          imageUrl: "/boc.webp" 
      },
  ]
};

export const metadata: Metadata = {
  title: 'Professional Photography & Videography Services | Product & Event Shoots | Black Zero',
  description: 'Capture your brand\'s best moments with Black Zero. Professional product photography, corporate videography, event coverage, and portfolio shoots.',
  keywords: ['photography services', 'videography', 'product photography', 'event coverage', 'corporate shoots', 'portfolio photography', 'commercial video'],
  alternates: {
    canonical: '/services/photo-video',
  },
  openGraph: {
    title: 'Professional Photography & Videography Services | Product & Event Shoots | Black Zero',
    description: 'Capture your brand\'s best moments with Black Zero. Professional product photography, corporate videography, event coverage, and portfolio shoots.',
    url: '/services/photo-video',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/photo-video.webp', alt: 'Professional camera gear set up for a product photography shoot' }],
  },
};

export default function PhotoVideoPage() {
  return <ServiceClientView service={photoVideoData} />;
}