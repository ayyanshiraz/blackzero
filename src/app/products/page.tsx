import { Metadata } from 'next';
import ProductsPageClient from '@/components/ProductsPageClient';
import { productsData } from './data';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Our Products | Innovative Software Solutions | Black Zero',
  description: 'Explore Black Zero\'s suite of cutting-edge software products. From HR Tech and Finance tools to Marketing and Educational software, we accelerate business growth.',
  keywords: ['software products', 'HR technology', 'finance tools', 'marketing software', 'lead generation tool', 'SEO auditor', 'math solver', 'Black Zero products'],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Our Products | Innovative Software Solutions | Black Zero',
    description: 'Explore Black Zero\'s suite of cutting-edge software products. From HR Tech and Finance tools to Marketing and Educational software.',
    url: '/products',
    type: 'website',
    images: [
      {
        url: '/product.webp',
        width: 1200,
        height: 630,
        alt: 'Black Zero Software Products Suite',
      },
    ],
  },
};

export default function ProductsPage() {
  return <ProductsPageClient products={productsData} />;
}