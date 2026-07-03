import { Metadata } from "next";
import CareersPageClient from "@/components/CareersPageClient";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Careers at Black Zero | Join Our Creative & Tech Team",
  description: "Looking for IT jobs in Lahore? Join Black Zero! We are hiring App Developers, Animators, and creative minds to build the future of digital marketing.",
  keywords: ["jobs in Lahore", "creative agency careers", "animator jobs", "app developer jobs", "Black Zero careers", "IT jobs Pakistan", "software house recruitment"],
  
  alternates: {
    canonical: "https://www.blackzero.org/careers",
  },

  openGraph: {
    title: "Careers at Black Zero | Join Our Creative & Tech Team",
    description: "Looking for IT jobs in Lahore? Join Black Zero! We are hiring App Developers, Animators, and creative minds to build the future of digital marketing.",
    url: "https://www.blackzero.org/careers",
    type: "website",
    images: [
      {
        url: "/careers.webp",
        width: 1200,
        height: 630,
        alt: "Black Zero Team Culture and Office Life",
      },
    ],
  },
};

export default function CareersPage() {
  return <CareersPageClient />;
}