import { Metadata } from "next";
import EcommerceSuccessClient from "@/components/EcommerceSuccessClient";

export const metadata: Metadata = {
  title: "Ecommerce Success Formula | Launch Your Business in 9 Steps",
  description: "Discover the proven 9-step ecommerce success formula by Black Zero. From niche hunting and sourcing to branding and marketing, we build your business end-to-end.",
  keywords: ["ecommerce success formula", "niche hunting service", "product sourcing", "ecommerce branding", "website development", "store management", "business analysis", "Black Zero ecommerce"],
  
  alternates: {
    canonical: "https://www.blackzero.org/ecommerce-success",
  },

  openGraph: {
    title: "Ecommerce Success Formula | Launch Your Business in 9 Steps",
    description: "Discover the proven 9-step ecommerce success formula by Black Zero. From niche hunting and sourcing to branding and marketing, we build your business end-to-end.",
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