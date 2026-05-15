import React from 'react';
import { productsData } from '../data';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-client'; 
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = productsData.find((p) => p.slug === slug);
    
    if (!product) return { title: 'Product Not Found | Black Zero' };

    return {
        title: `${product.name} | ${product.category} Solutions | Black Zero`,
        description: product.shortDescription,
        keywords: [product.name, product.category, 'software tool', 'Black Zero product', ...product.name.split(' ')],
        alternates: {
            canonical: `/products/${slug}`, // 👈 Automatic Canonical Link
        },
        openGraph: {
            title: `${product.name} - ${product.category} | Black Zero`,
            description: product.shortDescription,
            url: `/products/${slug}`, // 👈 Automatic OG URL
            type: 'website',          // 👈 OG Type Added
            images: [
                {
                    url: product.imageSrc,
                    alt: product.imgAltText || product.name,
                }
            ]
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params;
    
    const product = productsData.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}