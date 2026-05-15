import { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";


export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Black Zero | IT & Marketing Solutions",
  description: "Contact Black Zero for expert IT and Marketing solutions. Reach us for web development, digital marketing, and business analytics services in Lahore and beyond.",
  keywords: ["contact us", "digital marketing agency contact", "IT company Lahore", "web development inquiry", "business analytics consultation", "Black Zero support", "hire software developers"],
  
  alternates: {
    canonical: "https://www.blackzero.org/contact",
  },

  openGraph: {
    title: "Contact Us | Get in Touch with Black Zero",
    description: "Ready to transform your business? Contact Black Zero today for a custom quotation on IT and Marketing services.",
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