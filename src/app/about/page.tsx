import { Metadata } from "next";
import AboutPageClient from "@/components/AboutPageClient";

// --- PAGE CONTENT WITH SEO ALT TEXT ---
const aboutPageContent = {
    hero: { 
        imageUrl: "/team.webp", 
        alt: "Black Zero team collaboration in a creative digital studio setting" 
    },
    ceo: { 
        imageUrl: "/Team/CEO[1].webp", 
        alt: "Mian Hashim Haroon, CEO of Black Zero delivering a message" 
    },
    story: { 
        imageUrl: "/ourstory.webp", 
        alt: "The story of Black Zero digital agency journey" 
    },
    vision: { 
        imageUrl: "/ourvision.webp", 
        alt: "Black Zero vision for the future of IT and marketing" 
    },
    mission: { 
        imageUrl: "/ourmission.webp", 
        alt: "Our mission to empower businesses through digital innovation" 
    },
    approach: { 
        imageUrl: "/ourapproach.webp", 
        alt: "Our strategic approach to digital marketing and development" 
    },
    values: { 
        imageUrl: "/ourvalues.webp", 
        alt: "Core values of Black Zero: Innovation, Creativity, Integrity" 
    }
};

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "About Us | Multidisciplinary Creative & Digital Studio | Black Zero",
  description: "Learn about Black Zero, a leading IT and Marketing company. Discover our story, vision, and mission to transform businesses through innovation and creativity.",
  keywords: ["about Black Zero", "digital studio Lahore", "IT company profile", "marketing agency story", "CEO message", "company values", "creative team"],
  
  // Self-referencing canonical to resolve SEO report issue
  alternates: {
    canonical: "https://www.blackzero.org/about",
  },

  openGraph: {
    title: "About Us | Multidisciplinary Creative & Digital Studio | Black Zero",
    description: "We are your partner in building brands and transforming businesses. Read about our journey, doctrine, and the values that drive us.",
    url: "https://www.blackzero.org/about",
    type: "website",
    images: [
      {
        url: "/team.webp",
        width: 1200,
        height: 630,
        alt: "Black Zero Team and Studio Culture",
      },
    ],
  },
};

export default function AboutPage() {
    return <AboutPageClient content={aboutPageContent} />;
}