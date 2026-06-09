import { Metadata } from "next";
import EcommerceSuccessClient from "@/components/EcommerceSuccessClient";

export const metadata: Metadata = {
  title: "Ecommerce Success Formula: 9-Step Launch | Black Zero",
  description: "Discover how Black Zero builds profitable ecommerce businesses from scratch. From niche hunting to global sourcing and scaling brands across the UAE.",
  keywords: ["ecommerce success formula", "niche hunting service", "product sourcing", "ecommerce branding", "website development", "store management", "business analysis", "Black Zero ecommerce"],
  
  alternates: {
    canonical: "https://www.blackzero.org/ecommerce-success",
  },

  openGraph: {
    title: "Ecommerce Success Formula: 9-Step Launch | Black Zero",
    description: "Discover how Black Zero builds profitable ecommerce businesses from scratch. From niche hunting to global sourcing and scaling brands across the UAE.",
    url: "https://www.blackzero.org/ecommerce-success",
    type: "website",
    images: [
      {
        url: "/es.webp",
        width: 1200,
        height: 630,
        alt: "Black Zero Ecommerce Success Strategy showing growth and business planning",
      },
    ],
  },
};

export default function EcommerceSuccessPage() {
  return <EcommerceSuccessClient />;
}