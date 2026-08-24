import { Metadata } from "next";
import ProjectClientView from "@/components/ProjectClientView";

const projectData = {
    slug: "hsv-associates",
    title: "HSV Associates",
    category: "Business Consulting",
    imageUrl: "/Projects/hsv1.webp",
    className: "md:col-span-1",
    description: "HSV Associates is a distinguished firm dedicated to providing top-tier consulting and real estate solutions for their clients. To elevate their digital presence, we developed a highly professional and robust website tailored to their specific business requirements.<br/><br/>In addition to comprehensive web development, we executed a strategic social media management plan. This dual approach ensured maximum online visibility, enhanced user engagement, and built a strong digital footprint that aligns perfectly with their corporate identity.",
    services: ["Website Development", "Social Media Management"],
    gallery: [
        "/Clients/17.png",
    ],
    details: [
        {
            title: "Website Development",
            description: "We built a modern, responsive, and fully optimized website that serves as a powerful digital storefront for HSV Associates. The platform features intuitive navigation and lightning-fast loading speeds to ensure a seamless user experience across all devices.",
            imageUrl: "/Projects/hsv2.webp"
        },
        
    ],
    testimonial: {
        quote: "The team at Black Zero delivered beyond our expectations. The new website is flawless, and their social media strategies have brought incredible value and growth to our business.",
        author: "Hamza Sadaqtum Virk",
        image: "",
        rating: 5
    }
};

export const metadata: Metadata = {
    title: "HSV Associates | Web Development & Social Media | Black Zero",
    description: "Explore the HSV Associates project by Black Zero, featuring a custom-built website and comprehensive social media management solutions.",
    keywords: ["hsv associates", "website development", "social media management", "business consulting website", "Black Zero projects"],
    alternates: {
        canonical: "/projects/hsv-associates",
    },
    openGraph: {
        title: "HSV Associates | Web Development & Social Media | Black Zero",
        description: "Explore the HSV Associates project by Black Zero, featuring a custom-built website and comprehensive social media management solutions.",
        url: "/projects/hsv-associates",
        siteName: "Black Zero",
        locale: "en_US",
        type: "website",
        images: [{ url: "/Projects/hsv1.webp", alt: "HSV Associates Project Showcase" }],
    },
};

export default function HsvAssociatesPage() {
    return <ProjectClientView project={projectData} />;
}