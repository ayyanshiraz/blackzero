import { Metadata } from 'next';
import ProductsPageClient from '@/components/ProductsPageClient';
import { productsData } from './data';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Our Products | Innovative Software Solutions | BlackZero Technologies',
  description: 'Explore BlackZero Technologies\'s suite of cutting-edge software products. From HR Tech and Finance tools to Marketing and Educational software, we accelerate business growth.',
  keywords: ['software products', 'HR technology', 'finance tools', 'marketing software', 'lead generation tool', 'SEO auditor', 'math solver', 'BlackZero Technologies products'],
  alternates: {
    canonical: 'https://www.blackzero.org/products',
  },
  openGraph: {
    title: 'Our Products | Innovative Software Solutions | BlackZero Technologies',
    description: 'Explore BlackZero Technologies\'s suite of cutting-edge software products. From HR Tech and Finance tools to Marketing and Educational software.',
    url: 'https://www.blackzero.org/products',
    type: 'website',
    images: [
      {
        url: 'https://www.blackzero.org/product.webp',
        width: 1200,
        height: 630,
        alt: 'BlackZero Technologies Software Products Suite',
      },
    ],
  },
};

export default function ProductsPage() {
  return <ProductsPageClient products={productsData} />;
}