import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
    slug: 'qemaat',
    title: 'Qemaat',
    category: 'Real Estate Platform',
    imageUrl: '/Clients/15.png',
    className: 'md:col-span-1',
    // SEO FIX 1: Added "nofollow" to the external link to save your domain's SEO juice
    description: `Qemaat is a comprehensive real estate solution designed to simplify the buying, selling, and leasing experience. Their primary platform, <a href="https://www.qemaat.com" target="_blank" rel="noopener noreferrer nofollow" class="text-black font-semibold hover:underline">www.qemaat.com</a>, provides an intuitive and robust interface for property seekers to browse residential and commercial listings with ease.<br/><br/>We developed this portal to be both scalable and user-friendly, integrating advanced property listing features, interactive navigation, and a streamlined search engine. Qemaat represents a modern approach to digital property transactions, bridging the gap between property owners and clients with efficiency and precision.`,
    services: ['Website Development', 'Website Portal', 'Property Listings', 'Social Media Management', 'Ads'],
    gallery: [
        '/Clients/15.png',
    ],
    details: [
        {
            title: 'Website Portal & Development',
            description: 'We built a high-performance web portal tailored for the real estate industry, ensuring seamless browsing, intuitive navigation, and a modern aesthetic that builds trust with property seekers.',
            imageUrl: '/Projects/q2.webp'
        },
        {
            title: 'Dynamic Property Listings',
            description: 'Implemented an advanced property listing system that allows for easy categorization, high-quality media display, and detailed specifications, ensuring every property is showcased effectively.',
            imageUrl: '/Projects/q3.webp'
        },
        {
            title: 'Social Media Management & Ads',
            description: 'We launched targeted social media campaigns and paid advertisements to increase brand awareness and drive qualified leads directly to the platform, maximizing visibility in a competitive market.',
            imageUrl: '/Projects/q4.webp'
        }
    ],
    testimonial: {
        quote: 'Black Zero successfully brought our vision to life. The Qemaat platform is exactly what we needed to streamline our real estate operations, and their digital marketing strategy has been game-changing.',
        author: 'Director, Qemaat',
        image: '',
        rating: 5
    }
};

export const metadata: Metadata = {
    // SEO FIX 2: Optimized Title length (under 60 characters is best for Google)
    title: 'Qemaat | Custom Real Estate Portal & Listings | Black Zero',
    // SEO FIX 3: Trimmed description to 155 characters to prevent truncation in search results
    description: 'Explore Qemaat, a custom real estate portal by Black Zero. We delivered advanced property listings, scalable web development, and targeted digital marketing.',
    keywords: ['qemaat', 'real estate portal', 'property listings', 'custom web development', 'social media management', 'real estate ads', 'property portal development'],
    alternates: {
        // SEO FIX 4: Used absolute URL for canonical tag to prevent indexing confusion
        canonical: 'https://www.blackzero.org/projects/qemaat',
    },
    openGraph: {
        title: 'Qemaat | Custom Real Estate Portal & Listings | Black Zero',
        description: 'Explore Qemaat, a custom real estate portal by Black Zero. We delivered advanced property listings, scalable web development, and targeted digital marketing.',
        url: 'https://www.blackzero.org/projects/qemaat',
        siteName: 'Black Zero',
        locale: 'en_US',
        type: 'website',
        // Note: Please verify if 'qeemat1.webp' spelling is correct in your public folder (qemaat vs qeemat).
        images: [{ url: '/Projects/qeemat1.webp', alt: 'Qemaat Real Estate Platform' }],
    },
};

export default function QemaatPage() {
    return <ProjectClientView project={projectData} />;
}