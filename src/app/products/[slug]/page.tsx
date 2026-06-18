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
        title: product.seoTitle,
        description: product.metaDescription,
        keywords: product.seoKeywords,
        alternates: {
            canonical: `https://www.blackzero.org/products/${slug}`,
        },
        openGraph: {
            title: product.seoTitle,
            description: product.metaDescription,
            url: `https://www.blackzero.org/products/${slug}`,
            type: 'website',
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