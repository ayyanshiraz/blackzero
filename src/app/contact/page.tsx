import { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";


export const metadata: Metadata = {
  title: "Contact Us | AI, Analytics & Custom Development",
  description: "Contact Black Zero for expert AI, custom development, and data analytics solutions. Reach out to build scalable tech for your enterprise in the USA and GCC.",
  keywords: ["contact us", "digital marketing agency contact", "IT company Lahore", "web development inquiry", "business analytics consultation", "Black Zero support", "hire software developers"],
  
  alternates: {
    canonical: "https://www.blackzero.org/contact",
  },

  openGraph: {
    title: "Contact Us | AI, Analytics & Custom Development",
    description: "Contact Black Zero for expert AI, custom development, and data analytics solutions. Reach out to build scalable tech for your enterprise in the USA and GCC.",
    url: "https://www.blackzero.org/contact",
    type: "website",
    images: [
      {
        url: "/contact4.webp",
        width: 1200,
        height: 630,
        alt: "Contact Black Zero support team for digital marketing and IT services",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}