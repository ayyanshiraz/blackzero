import { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Black Zero | Get a Custom Software Estimate",
  description: "Remove “GCC”. Say: “Tell us about your ERP, CRM, or AI project and get a scoped estimate.",
  keywords: ["contact us", "digital marketing agency contact", "IT company Lahore", "web development inquiry", "business analytics consultation", "Black Zero support", "hire software developers"],
  
  alternates: {
    canonical: "https://www.blackzero.org/contact",
  },

  openGraph: {
    title: "Contact Black Zero | Get a Custom Software Estimate",
    description: "Remove “GCC”. Say: “Tell us about your ERP, CRM, or AI project and get a scoped estimate.",
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
  twitter: {
    card: "summary_large_image",
    title: "Contact Black Zero | Get a Custom Software Estimate",
    description: "Remove “GCC”. Say: “Tell us about your ERP, CRM, or AI project and get a scoped estimate.",
    images: ["/contact4.webp"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}