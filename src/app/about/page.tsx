<<<<<<< HEAD
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  // 👇 Optimized Title: Main Keywords + Location + Trust Signal
  title: "About Us | Best Hijama Center Lahore | Male & Female Staff",
  
  // 👇 Optimized Description: Includes Services, Location (Bahria Town), and USP (Sunnah/Certified)
  description: "Looking for a trusted Hijama center in Lahore? Our certified male and female therapists provide authentic Sunnah Cupping for natural pain relief and detox.",
  
  alternates: {
    canonical: 'https://www.almadinahijamacenter.com/about',
  },
  
  // 👇👇👇 FIX: Ye Pura Section Missing Tha 👇👇👇
  openGraph: {
    title: "About Us | Best Hijama Center in Lahore | Certified Male & Female Staff",
    description: "Looking for a trusted Hijama center in Lahore? Our certified male and female therapists provide authentic Sunnah Cupping for natural pain relief and detox.",
    url: 'https://www.almadinahijamacenter.com/about',
    siteName: 'Al Madina Hijama Center',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://www.almadinahijamacenter.com/ceo.webp', // About page ke liye CEO ki image best hai
        width: 1200,
        height: 630,
        alt: 'Al Madina Hijama Center - Jameel ur Rehman',
=======
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
  title: "About Us | AI, Analytics & Custom Dev | Black Zero",
  description: "Discover Black Zero's mission to transform USA enterprises. We specialize in custom AI, app development, and data analytics for modern businesses.",
  keywords: ["about Black Zero", "AI", "IT company profile", "marketing agency story", "CEO message", "company values", "creative team"],
  alternates: {
    canonical: "https://www.blackzero.org/about",
  },

  openGraph: {
    title: "About Us | AI, Analytics & Custom Dev | Black Zero",
    description: "Discover Black Zero's mission to transform USA enterprises. We specialize in custom AI, app development, and data analytics for modern businesses.",
    url: "https://www.blackzero.org/about",
    type: "website",
    images: [
      {
        url: "/team.webp",
        width: 1200,
        height: 630,
        alt: "Black Zero Team and Studio Culture",
>>>>>>> aa0485d (Fix hero section layout and padding)
      },
    ],
  },
};

<<<<<<< HEAD
export default function Page() {
  return <AboutClient />;
=======
export default function AboutPage() {
    return <AboutPageClient content={aboutPageContent} />;
>>>>>>> aa0485d (Fix hero section layout and padding)
}