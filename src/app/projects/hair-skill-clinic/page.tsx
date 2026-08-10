import { Metadata } from "next";
import ProjectClientView from "@/components/ProjectClientView";

const projectData = {
    slug: "hair-skill-clinic",
    title: "Hair Skill Clinic",
    category: "Healthcare & Aesthetics",
    imageUrl: "/Projects/hair2.webp",
    className: "md:col-span-1",
    description: "Hair Skill Clinic is a premier medical facility specializing in advanced hair restoration and aesthetic treatments. To enhance their digital footprint, we designed and developed a highly professional, user-friendly website that perfectly highlights their medical expertise and treatment options.<br/><br/>Beyond the website, we implemented a comprehensive marketing strategy featuring dedicated social media management and targeted digital ads. This combined approach successfully boosted patient inquiries, increased clinic bookings, and established a strong, trustworthy brand presence in a highly competitive market.",
    services: ["Website Development", "Social Media Management", "Ads"],
    gallery: [
        "/Clients/16.webp",
        "/Projects/hair5.webp",
        "/Projects/hair6.webp",
        "/Projects/hair7.webp",
        "/Projects/hair8.webp",
        "/Projects/hair9.webp",
        "/Projects/hair10.webp",
        "/Projects/hair11.webp",
        "/Projects/hair12.webp",
        "/Projects/hair13.webp",
        "/Projects/hair14.webp",
        "/Projects/hair15.webp",
        "/Projects/hair16.webp",
        "/Projects/hair17.webp",
        "/Projects/hair18.webp",
        "/Projects/hair19.webp",
    ],
    details: [
        {
            title: "Website Development",
            description: "We built a secure, responsive, and modern web platform tailored for the healthcare industry. The website features seamless navigation, detailed treatment pages, and an integrated booking system to provide an excellent user experience for prospective patients.",
            imageUrl: "/Projects/hair2.webp"
        },
        {
            title: "Social Media Management",
            description: "To build patient trust and showcase successful results, we managed their social media profiles with engaging content. We focused on educational posts, before-and-after transformations, and clinic updates to foster a strong community online.",
            imageUrl: "/Projects/hair3.webp"
        },
        {
            title: "Targeted Ads",
            description: "We designed and launched high-converting digital advertising campaigns across multiple platforms. By targeting specific demographics interested in hair restoration, we maximized the return on investment and drove a consistent stream of qualified leads to the clinic.",
            imageUrl: "/Projects/hair4.webp"
        }
    ],
    testimonial: {
        quote: "Black Zero completely transformed our online presence. The new website is fantastic, and their ad campaigns have significantly increased our daily patient consultations. Highly recommended for any medical practice looking to grow.",
        author: "Muhammad Arif",
        image: "",
        rating: 5
    }
};

export const metadata: Metadata = {
    title: "Hair Skill Clinic | Web Development & Ads | Black Zero",
    description: "Discover how Black Zero transformed the digital presence of Hair Skill Clinic with a custom website, social media management, and targeted ads.",
    keywords: ["hair skill clinic", "website development", "social media management", "healthcare marketing", "clinic ads", "Black Zero projects"],
    alternates: {
        canonical: "/projects/hair-skill-clinic",
    },
    openGraph: {
        title: "Hair Skill Clinic | Web Development & Ads | Black Zero",
        description: "Discover how Black Zero transformed the digital presence of Hair Skill Clinic with a custom website, social media management, and targeted ads.",
        url: "/projects/hair-skill-clinic",
        siteName: "Black Zero",
        locale: "en_US",
        type: "website",
        images: [{ url: "/Projects/hair-skill1.webp", alt: "Hair Skill Clinic Digital Marketing Showcase" }],
    },
};

export default function HairSkillClinicPage() {
    return <ProjectClientView project={projectData} />;
}