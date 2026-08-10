import { Metadata } from "next";
import ProjectClientView from "@/components/ProjectClientView";

const projectData = {
    slug: "kb-dispatch-tools-services",
    title: "KB Dispatch Tools Services",
    category: "Custom Software",
    imageUrl: "/Projects/kb1.webp",
    className: "md:col-span-1",
    description: "KB Dispatch Tools Services required a robust and highly tailored digital solution to streamline their complex logistics and dispatch operations. To meet this need, we developed a powerful custom software platform designed specifically to optimize routing, fleet management, and real-time tracking.<br/><br/>This fully customized application enhances overall operational efficiency and provides comprehensive analytics. It empowers the management team to make data-driven decisions with maximum precision and ease, ensuring smooth daily operations.",
    services: ["Custom Software"],
    gallery: [
        "/Clients/18.png",
    ],
    details: [
        {
            title: "Custom Software Development",
            description: "We engineered a fully customized software suite from the ground up. The system integrates advanced dispatching algorithms, automated scheduling, and real-time communication tools to meet the specific operational demands of the business.",
            imageUrl: "/Projects/kb2.webp"
        },
    ],
    testimonial: {
        quote: "Black Zero delivered a phenomenal custom software solution that completely revolutionized our dispatch process. The efficiency and reliability of the platform are truly outstanding.",
        author: "Operations Manager, KB Dispatch Tools Services",
        image: "",
        rating: 5
    }
};

export const metadata: Metadata = {
    title: "KB Dispatch Tools Services | Custom Software | Black Zero",
    description: "Explore the custom software development project for KB Dispatch Tools Services by Black Zero. We engineered a tailored solution for dispatch and logistics management.",
    keywords: ["kb dispatch tools services", "custom software", "software development", "dispatch software", "logistics platform", "Black Zero projects"],
    alternates: {
        canonical: "/projects/kb-dispatch-tools-services",
    },
    openGraph: {
        title: "KB Dispatch Tools Services | Custom Software | Black Zero",
        description: "Explore the custom software development project for KB Dispatch Tools Services by Black Zero. We engineered a tailored solution for dispatch and logistics management.",
        url: "/projects/kb-dispatch-tools-services",
        siteName: "Black Zero",
        locale: "en_US",
        type: "website",
        images: [{ url: "/Projects/kb1.webp", alt: "KB Dispatch Tools Services Custom Software Showcase" }],
    },
};

export default function KbDispatchToolsServicesPage() {
    return <ProjectClientView project={projectData} />;
}