'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Star, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- DATA ---
export interface ProjectDetail {
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
}

export interface Project {
    slug: string;
    title: string;
    category: string;
    imageUrl: string;
    className: string;
    description: string;
    services: string[];
    gallery: string[];
    details?: ProjectDetail[];
    testimonial?: {
        quote: string;
        author: string;
        image: string;
        rating: number;
    };
}

export const projectsData: Project[] = [
    {
        slug: 'ever-smart-emporium',
        title: 'Ever Smart Emporium',
        category: "E-commerce",
        imageUrl: "/Projects/1.jpg",
        className: 'md:col-span-1 md:row-span-2',
        description: `Ever Smart Emporium stands as a premier luxury retailer in Lahore, curating high-end international brands for a discerning clientele. Operating through their influential Instagram page, <a href="https://www.instagram.com/eversmart_emporium/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@eversmart_emporium</a>, they have cultivated a significant online community of over 27,000 followers. This digital showroom serves as a one-stop destination, showcasing an exquisite collection of goods for both men and women. Their offerings range from the latest arrivals and exclusive fragrances to bespoke suits and designer accessories. By sourcing exclusive items from renowned brands globally, they bring a unique taste of international luxury to the local market. Complementing their strong digital presence, their physical store on Ghalib Road cements their status as a key destination for luxury retail in the heart of Lahore.`,
        services: ['Branding & Design', 'Web Development', 'E-commerce Strategy'],
        gallery: [ "/Projects/ever.png", "/Projects/2.jpg", "/Projects/3.jpg", "/Projects/4.jpg", "/Projects/5.jpg", "/Projects/6.jpg", "/Projects/11.jpg", "/Projects/8.jpg", "/Projects/9.jpg", "/Projects/10.jpg", "/Projects/1.jpg", "/Projects/7.jpg" ],
        details: [
            {
                title: "Social Media Handling",
                description: `We took complete ownership of the <a href="https://www.instagram.com/eversmart_emporium/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@eversmart_emporium</a> Instagram account, ensuring a consistent and high-end digital presence. Our team managed daily content posting, story updates, and direct community engagement. By responding to inquiries and fostering conversations with their 27.6k followers, we cultivated a loyal community and solidified the brand's reputation as a responsive and prestigious luxury source.`,
                imageUrl: "/Projects/s1.png"
            },
            {
                title: "Social Media Marketing",
                description: "Our strategy focused on transforming their Instagram page into a powerful sales funnel. We developed a content marketing plan that highlighted new arrivals and brand stories. Through targeted promotions, we expanded their reach to a qualified audience of luxury shoppers, driving significant traffic and converting followers into paying customers.",
                imageUrl: "/Projects/s2.png"
            },
            {
                title: "Photography",
                description: "To capture the essence of the luxury products, we conducted professional photoshoots that emphasized quality and detail. Each image was carefully styled, lit, and edited to create a visually stunning and cohesive feed. Our high-quality photography established a premium aesthetic for the brand, making each product feel exclusive and desirable.",
                imageUrl: "/Projects/s3.png"
            },
            {
                title: "Videography",
                description: "We brought the products to life through dynamic videography, creating engaging Instagram Reels and Stories. Short-form video content allowed us to showcase the texture, craftsmanship, and real-world appeal of the luxury items. These videos captured user attention, increased engagement rates, and provided a more immersive shopping experience.",
                imageUrl: "/Projects/s5.png"
            },
            {
                title: "Campaigns",
                description: "We designed and executed targeted campaigns for key moments like 'New Arrivals' and promotions for specific high-end brands. These campaigns combined compelling visuals, persuasive copy, and strategic ad placements to generate excitement and urgency, successfully boosting sales for featured collections.",
                imageUrl: "/Projects/s4.png"
            }
        ],
        testimonial: {
            quote: "Partnering with Black Zero was a game-changer, transforming our digital presence to perfectly capture our luxury brand's essence. Their strategic approach to social media and advertising dramatically increased our engagement and, most importantly, our sales. We couldn't be happier and highly recommend Black Zero for their professionalism, creativity, and incredible results.",
            author: "Habib Rafique",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
    {
        slug: 'bizvibez-property',
        title: 'BizVibez Property',
        category: "Media Coverage",
        imageUrl: "/Projects/59.jpg",
        className: 'md:col-span-1',
        description: `BizVibez Properties operates as a premier real estate platform, specializing in luxury homes and exclusive listings within Dubai's most prestigious neighborhoods, including the renowned Dubai Hills. Their primary digital gateway, <a href="https://bizvibezproperties.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">bizvibezproperties.com</a>, immediately engages potential clients with a powerful and intuitive search tool. This allows users to seamlessly browse properties for rent, for sale, or exclusive off-plan opportunities.
        <br/><br/>
        The user-friendly interface is designed for a sophisticated audience, featuring a prominent search bar to filter by property type, location, or specific title. This commitment to a seamless user journey is further enhanced by comprehensive area guides, offering deep insights into the communities they serve. With the tagline, 'Truly local, truly expert!', the company firmly positions itself as a leading authority in the highly competitive Dubai real estate market.
        <br/><br/>
        This specialized property portal is part of the broader BizVibez consultancy, whose main site can be found at <a href="https://www.bizvibez.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">www.bizvibez.com</a>. Together, these platforms offer a comprehensive suite of services for clients looking to invest and live in Dubai, backed by a team with unparalleled local knowledge and expertise.`,
        services: ['Social Media', 'Web Development', 'Media Coverage'],
        gallery: [ "/Clients/2.png", "/Projects/55.jpg", "/Projects/56.jpg", "/Projects/57.jpg", "/Projects/58.jpg", "/Projects/59.jpg", "/Projects/60.jpg", "/Projects/61.jpg", "/Projects/62.jpg", "/Projects/63.jpg", "/Projects/64.jpg", "/Projects/65.jpg", "/Projects/66.jpg" ],
        details: [
            {
                title: "Social Media Marketing",
                description: "Our campaigns targeted high-net-worth individuals and investors interested in Dubai's luxury real estate market. We utilized sophisticated ad targeting on platforms like Instagram and LinkedIn to showcase premium properties, generating a consistent stream of qualified leads and inquiries for the BizVibez sales team.",
                imageUrl: "/Projects/s6.png"
            },
            {
                title: "Search Engine Optimization (SEO)",
                description: "We implemented a comprehensive SEO strategy to increase organic visibility for high-value keywords such as 'luxury villas in Dubai Hills' and 'off-plan properties Dubai'. This involved on-page optimization for all property listings and creating authoritative content about Dubai's most exclusive neighborhoods, establishing BizVibez as a top result in search engines.",
                imageUrl: "/Projects/s7.png"
            },
            {
                title: "Website Development",
                description: `We developed two core digital assets: the primary consultancy site at <a href="https://www.bizvibez.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">bizvibez.com</a> and the specialized real estate portal at <a href="https://bizvibezproperties.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">bizvibezproperties.com</a>. The property site features a powerful and intuitive search function, allowing users to effortlessly filter listings and explore the finest homes in Dubai.`,
                imageUrl: "/Projects/s8.png"
            },
            {
                title: "Social Media Handling",
                description: "Our team managed the day-to-day operations of BizVibez's social media channels, curating a feed of stunning property photos and videos. We engaged with the community, answered questions promptly, and built a brand presence that reflected the luxury and professionalism of their real estate services, growing their following and fostering trust.",
                imageUrl: "/Projects/s9.png"
            },
            {
                title: "Campaigns",
                description: "We launched targeted digital campaigns to promote exclusive listings and new off-plan projects. These campaigns utilized a mix of video tours, high-end photography, and compelling ad copy to create a sense of urgency and exclusivity, leading to successful property viewings and sales.",
                imageUrl: "/Projects/s10.png"
            },
            {
                title: "Scroll Stopper",
                description: "To capture attention in busy social media feeds, we created 'Scroll Stopper' animations for BizVibez. These short, visually striking videos were designed to be thumb-stopping, using dynamic motion and quick cuts to highlight the most luxurious features of their properties, significantly boosting engagement rates.",
                imageUrl: "/Projects/s11.png"
            },
            {
                title: "Explanatory Videos",
                description: "We produced a series of explanatory videos to simplify the property buying process in Dubai for international clients. These videos covered topics like legal requirements, financing options, and neighborhood guides, positioning BizVibez as a trusted and knowledgeable expert in the field.",
                imageUrl: "/Projects/s12.png"
            },
            {
                title: "Animation 2D / 3D",
                description: "For off-plan properties, we created stunning 3D architectural visualizations and animated walkthroughs. These animations allowed potential buyers to experience the property before it was built, providing a powerful sales tool that showcased the design, layout, and lifestyle of future developments.",
                imageUrl: "/Projects/s13.png"
            }
        ],
        testimonial: {
            quote: "Black Zero was pivotal in establishing our digital footprint, perfectly capturing the prestige of our luxury Dubai real estate portfolio. Their expertise drove unprecedented traffic to our website and generated a substantial increase in high-quality client inquiries.",
            author: "Emran Ahmed",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
     {
        slug: 'coronet-gold',
        title: 'Coronet Gold',
        category: "Luxury Goods",
        imageUrl: "/Projects/32.jpg",
        className: 'md:col-span-1',
        description: `Coronet Gold Guest House, accessible on Instagram at <a href="https://www.instagram.com/coronetgold/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@coronetgold</a>, establishes itself as a premier accommodation choice in Lahore, embodying its tagline, 'Your home away from home.' The brand is tailored for travelers and professionals seeking a blend of modern comfort, style, and personalized service. Our strategy involved curating a visually rich digital presence that showcases their impeccably designed rooms, highlighted by elegant gold and blue accents. Each post is crafted to convey a sense of luxury and tranquility, inviting potential guests to envision their stay. By focusing on high-quality photography and a direct call to action for bookings, the Instagram feed acts as a primary channel for inquiries, solidifying Coronet Gold's reputation as a top-tier guest house in the city.`,
        services: ['Photography', 'Ad Creatives', 'Performance Marketing'],
        gallery: [ "/Projects/cg.png", "/Projects/47.jpg", "/Projects/48.jpg", "/Projects/49.jpg", "/Projects/50.jpg", "/Projects/51.jpg", "/Projects/52.jpg" ],
        details: [
            {
                title: "Social Media Marketing",
                description: "Our marketing strategy centered on reaching potential travelers and local clients looking for premium accommodation in Lahore. We launched targeted ad campaigns on Instagram and Facebook, utilizing stunning visuals from our photoshoots to capture attention. By focusing on location-based and interest-based targeting, we successfully drove a consistent stream of booking inquiries and increased brand awareness among a relevant audience.",
                imageUrl: "/Projects/s15.png"
            },
            {
                title: "Social Media Handling",
                description: `We took full control of the <a href="https://www.instagram.com/coronetgold" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@coronetgold</a> Instagram page, managing all aspects of its daily operations. This included developing a content calendar, posting high-quality images and stories consistently, and engaging directly with the community. Our team handled all inquiries via comments and direct messages promptly, ensuring a professional and welcoming brand voice that converts followers into guests.`,
                imageUrl: "/Projects/s16.png"
            },
            {
                title: "Listing & Booking Platform Management",
                description: "To maximize occupancy, we managed Coronet Gold's presence on major online travel agencies (OTAs) and hotel booking platforms. This service included creating and optimizing their listings with professional photos and compelling descriptions, managing room availability and pricing strategies, and actively monitoring and responding to guest reviews. This ensured high visibility and maintained a stellar reputation across all critical booking channels.",
                imageUrl: "/Projects/s14.png"
            }
        ],
        testimonial: {
            quote: "Black Zero was instrumental in launching our guest house, creating a sophisticated brand identity that truly set us apart. Their targeted digital marketing campaigns filled our rooms faster than we ever imagined was possible.",
            author: "Fakhra Batool",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
    {
        slug: 'unique-studio',
        title: 'Unique Studio',
        category: "Creative Services",
        imageUrl: "/Projects/15.jpg",
        className: 'md:col-span-1',
        description: `Unique Studio, a prominent Lahore-based firm found on Instagram at <a href='https://www.instagram.com/uniquestudio181/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@uniquestudio181</a>, specializes in the art of architecture, interiors, and construction. They have carved a niche by blending timeless classic design with bold, modern aesthetics, creating spaces that are both elegant and functional. Their digital presence serves as a meticulously curated professional portfolio, showcasing a diverse range of high-end residential and commercial projects. Each post highlights their keen eye for detail, from grand, sweeping exteriors to sophisticated interior finishes. Operating from their office in Johar Town, Lahore, Unique Studio caters to a discerning clientele, turning ambitious architectural visions into tangible, breathtaking realities and building a strong reputation for excellence in the design community.`,
        services: ['Branding', 'Design', 'Marketing'],
        gallery: [ "/Projects/unique.png", "/Projects/13.jpg", "/Projects/14.jpg", "/Projects/15.jpg", "/Projects/16.jpg", "/Projects/17.jpg", "/Projects/18.jpg", "/Projects/19.jpg", "/Projects/20.jpg","/Projects/14.jpg" ],
        details: [
            {
                title: "Campaigns",
                description: "Our primary goal was to generate high-quality leads for their architectural and interior design services. We designed and executed targeted ad campaigns on Instagram and Facebook, showcasing their most visually stunning projects to a curated audience of high-net-worth individuals, real estate developers, and businesses in Lahore and surrounding areas. The campaigns focused on driving traffic to their social profiles and encouraging direct messages for consultations, resulting in a significant increase in qualified project inquiries.",
                imageUrl: "/Projects/s17.png"
            },
            {
                title: "Social Media Handling",
                description: "We managed Unique Studio's social media channels to reflect their status as a premium design firm. This involved creating a cohesive and aesthetically pleasing feed, writing engaging captions that detailed the design process and material choices, and actively managing community engagement. By consistently showcasing their expertise and responding promptly to inquiries, we built their online brand authority and fostered a community of design admirers and potential clients.",
                imageUrl: "/Projects/s18.png"
            }
        ],
        testimonial: {
            quote: "Black Zero transformed our digital presence, expertly translating our architectural vision into a compelling online brand that truly resonates. Their strategic marketing amplified our portfolio, connecting us with a high-caliber clientele and driving significant growth in project inquiries.",
            author: "Nauman Arshad",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
    {
        slug: 'hotel-mayfair',
        title: 'Hotel MayFair',
        category: "Hospitality",
        imageUrl: "/Projects/34.jpg",
        className: 'md:col-span-1 md:row-span-2',
        description: `Hotel Mayfair Lahore offers a comprehensive hospitality experience, strategically marketed through two distinct digital identities. The primary hotel page, <a href='https://www.instagram.com/hotelmayfairlhr/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@hotelmayfairlhr</a>, is dedicated to showcasing world-class lodging and the promise of a "Stay In Comfort." This platform targets travelers and business professionals by highlighting its luxurious deluxe rooms, premium amenities, and prime location in Lahore's commercial hub. In parallel, the <a href='https://www.instagram.com/hotelmayfairkitchen/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@hotelmayfairkitchen</a> page focuses entirely on its culinary offerings, serving as a vibrant digital menu. It tempts local food enthusiasts with professionally shot images of their freshly prepared meals, driving orders exclusively through a strategic partnership with Foodpanda. This dual approach allows Hotel Mayfair to cater specifically to different customer segments, building a strong brand for both its accommodation and its delicious dining experiences.`,
        services: ['Performance Marketing', 'Social Media', 'Ad Creatives'],
        gallery: [ "/Projects/mayfair.png", "/Projects/35.jpg", "/Projects/36.jpg", "/Projects/37.jpg", "/Projects/38.jpg", "/Projects/39.jpg", "/Projects/40.jpg", "/Projects/41.jpg", "/Projects/42.jpg", "/Projects/46.jpg" ],
        details: [
            {
                title: "Website Development",
                description: "We designed and developed a comprehensive website for Hotel Mayfair, creating an elegant digital hub for both the hotel and its kitchen. The site features a seamless online booking engine, stunning galleries of the rooms and amenities, and integrated menus for the restaurant. The platform was built to be fully responsive, providing a premium user experience for guests booking a stay or ordering a meal.",
                imageUrl: "/Projects/s25.png"
            },
            {
                title: "Campaign Management",
                description: "Our team managed distinct digital advertising campaigns for both the hotel and the kitchen. For lodging, we targeted travelers and business professionals searching for accommodation in Lahore. For the kitchen, we ran geo-targeted campaigns promoting their delivery service on Foodpanda, successfully driving food orders from the local community.",
                imageUrl: "/Projects/s26.png"
            },
            {
                title: "Website Handling",
                description: "We provided continuous website handling and maintenance to ensure the digital presence of Hotel Mayfair remained current and effective. This included updating room rates and availability, refreshing the kitchen's menu with new items, posting special offers, and performing regular security and performance audits to guarantee a smooth and secure user experience.",
                imageUrl: "/Projects/s27.png"
            },
            {
                title: "Photography",
                description: "Our visual strategy involved two separate professional photoshoots. For the hotel, we captured high-end interior photographs of the deluxe rooms, lobby, and other facilities to convey luxury and comfort. For the kitchen, we conducted professional food photography, styling each dish to look vibrant and appetizing for social media and delivery platforms.",
                imageUrl: "/Projects/s28.png"
            },
            {
                title: "Videography",
                description: "We produced a suite of video content to engage audiences for both brands. This included elegant video tours of the hotel rooms and facilities, dynamic promotional videos for new dishes from the kitchen, and engaging short-form content for Instagram Reels to showcase the complete Mayfair experience.",
                imageUrl: "/Projects/s29.png"
            },
            {
                title: "Listing on Hotel Apps",
                description: "To maximize bookings and reach a global audience, we managed Hotel Mayfair's listings on major hotel booking apps and Online Travel Agencies (OTAs). Our work involved optimizing their profile, managing dynamic pricing, ensuring calendar synchronization across platforms, and actively responding to guest reviews to maintain a high rating and attract more visitors.",
                imageUrl: "/Projects/s30.png"
            }
        ],
        testimonial: {
            quote: "Black Zero masterfully unified the digital presence for both our luxury lodging and our specialized kitchen, creating a cohesive brand story. Their targeted strategies significantly boosted our online visibility, leading to a direct increase in both room bookings and food orders.",
            author: "Mian Asad",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
    {
        slug: 'pakistan-academy',
        title: 'Pakistan Academy',
        category: "Education",
        imageUrl: "/Projects/26.jpg",
        className: 'md:col-span-1',
        description: `Pakistan Academy, a leading educational institution accessible online at <a href='https://pakistanacademy.org/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>pakistanacademy.org</a> and on Instagram at <a href='https://www.instagram.com/pakistanacademy10/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@pakistanacademy10</a>, is dedicated to academic excellence. Positioning itself as the "Best Online Academy & Home Tutors in Pakistan," the academy provides top-tier tutoring services for crucial qualifications, including O/A Levels and IELTS. Their flexible hybrid model offers both personalized in-home tuition and comprehensive online learning options, making quality education accessible to students nationwide. Their digital strategy focuses on building a trustworthy and professional brand image, showcasing their experienced faculty and student success stories. Through a robust online presence, Pakistan Academy effectively connects with students and parents, providing them with the resources and support needed to achieve their academic goals.`,
        services: ['Web Development', 'Content Management', 'SEO'],
        gallery: [ "/Projects/pa.png", "/Projects/22.jpg", "/Projects/23.jpg", "/Projects/24.jpg", "/Projects/25.jpg", "/Projects/26.jpg", "/Projects/27.jpg", "/Projects/28.jpg", "/Projects/29.jpg", "/Projects/30.jpg" ],
        details: [
            {
                title: "Website Management",
                description: "We provided ongoing management for the <a href='https://pakistanacademy.org/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>pakistanacademy.org</a> portal, ensuring all course information, tutor profiles, and schedules were kept up-to-date. Our role included regular security checks, performance optimization, and content updates to maintain a professional and reliable online resource for students and parents.",
                imageUrl: "/Projects/s19.png"
            },
            {
                title: "Website Development",
                description: "Our team developed their educational website, <a href='https://pakistanacademy.org/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>pakistanacademy.org</a>, from the ground up, focusing on a clean, user-friendly interface. The site was built to be fully responsive and SEO-friendly, featuring easy navigation, a clear presentation of their course offerings, and a streamlined process for student inquiries and enrollment.",
                imageUrl: "/Projects/s20.png"
            },
            {
                title: "Social Media Marketing",
                description: "We executed targeted social media marketing campaigns during key admission cycles. These campaigns on Facebook and Instagram were designed to reach parents and students searching for quality tutoring for O/A Levels and IELTS. By promoting success stories and highlighting their unique teaching methods, we generated a significant volume of qualified leads.",
                imageUrl: "/Projects/s21.png"
            },
            {
                title: "Social Media Handling",
                description: "Our team managed the day-to-day operations of the Pakistan Academy social media profiles. This involved creating and scheduling a consistent stream of informative and engaging content, from educational tips to student testimonials. We also handled all community interactions, promptly responding to inquiries to build a supportive and trusted online presence.",
                imageUrl: "/Projects/s22.png"
            },
            {
                title: "Photography",
                description: "To build a visual identity of trust and professionalism, we conducted photoshoots to create a bank of high-quality images. This included professional headshots of the tutors and branded graphics used across their website and social media, ensuring a cohesive and reputable brand image.",
                imageUrl: "/Projects/s23.png"
            },
            {
                title: "Videography",
                description: "We produced a range of video content to enhance their marketing efforts. This included an introductory video explaining the academy's mission and teaching philosophy, short, engaging educational clips for social media, and powerful video testimonials from past students to build credibility and attract new enrollments.",
                imageUrl: "/Projects/s24.png"
            }
        ],
        testimonial: {
            quote: "Black Zero's targeted marketing strategies significantly boosted our online visibility, connecting us with students across Pakistan seeking quality education. Their team understood our mission and crafted a digital campaign that dramatically increased our student enrollment.",
            author: "Mirza Zahid Baig",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    }
];

// --- BREADCRUMBS COMPONENT ---
interface BreadcrumbItem {
    href: string;
    label: string;
}

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="bg-white py-4">
            <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                    {items.map((item, index) => (
                        <li key={item.href} className="flex items-center">
                            {index > 0 && (
                                <svg className="w-4 h-4 mx-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                            )}
                            {index === items.length - 1 ? (
                                <span className="font-semibold text-gray-800" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <a href={item.href} className="hover:underline hover:text-gray-800 transition-colors">
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};

// --- Reusable Animated Section for Project Details ---
const ProjectDetailSection = ({ detail, isReversed }: { detail: ProjectDetail, isReversed: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => { if (currentRef) observer.disconnect(); };
    }, []);

    const imageAnimation = isReversed ? 'animate-slide-in-right' : 'animate-slide-in-left';
    const textAnimation = isReversed ? 'animate-slide-in-left' : 'animate-slide-in-right';

    return (
        <div ref={ref} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-16 perspective-[1000px] ${isReversed ? 'md:flex-row-reverse' : ''}`}>
            <div className={`md:w-2/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${imageAnimation}` : 'opacity-0'}`}>
                <div className="relative group overflow-hidden rounded-lg shadow-2xl">
                    {detail.videoUrl ? (
                        <video
                            src={detail.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                        />
                    ) : (
                        <img 
                            src={detail.imageUrl} 
                            alt={detail.title} 
                            className="w-full h-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-105" 
                        />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
            </div>
            <div className={`md:w-3/5 transition-opacity duration-1000 ${isVisible ? `opacity-100 ${textAnimation}` : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                <h3 className="text-3xl font-bold text-black mb-4">{detail.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: detail.description }}></p>
            </div>
        </div>
    );
};

// --- IMAGE MODAL COMPONENT ---
interface ImageModalProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}
const ImageModal: React.FC<ImageModalProps> = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage(e as any);
            if (e.key === 'ArrowLeft') prevImage(e as any);
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [images.length]);


    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="Full screen project gallery"
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                />
            </AnimatePresence>

            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                aria-label="Close image view"
            >
                <X size={32} />
            </button>
            <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors z-50"
                aria-label="Previous image"
            >
                <ArrowLeft size={24} />
            </button>
            <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors z-50"
                aria-label="Next image"
            >
                <ArrowRight size={24} />
            </button>
        </motion.div>
    );
};


// --- TESTIMONIAL CARD COMPONENT ---
interface TestimonialProps {
    quote: string;
    author: string;
    image: string;
    rating: number;
}
const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, rating }) => (
    <div className="relative max-w-4xl mx-auto pt-12 pb-12 px-8">
        <div className="relative">
            <div className="absolute inset-0 bg-black -m-4"></div>
            <div className="relative border-2 border-white p-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 flex items-center gap-4">
                    <div className="h-0.5 w-12 bg-white"></div>
                    <svg width="40" height="30" viewBox="0 0 40 30" fill="white"><path d="M0 30V15.2174C0 10.1522 1.44928 6.19565 4.34783 3.34783C7.24638 0.5 10.942 0 15.4348 0V7.17391C12.4348 7.17391 10.1304 7.91304 8.52174 9.3913C6.91304 10.8696 6.1087 12.8261 6.1087 15.2609V16.3043H16.5217V30H0ZM23.4783 30V15.2174C23.4783 10.1522 24.9275 6.19565 27.8261 3.34783C30.7246 0.5 34.4203 0 38.913 0V7.17391C35.913 7.17391 33.6087 7.91304 32 9.3913C30.3913 10.8696 29.587 12.8261 29.587 15.2609V16.3043H40V30H23.4783Z"/></svg>
                    <div className="h-0.5 w-12 bg-white"></div>
                </div>
                <div className="text-xl font-medium text-white leading-relaxed my-8 text-center">
                    <p>"{quote}"</p>
                </div>
                <div className="flex justify-center items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className={`w-6 h-6 ${index < rating ? 'text-white fill-current' : 'text-gray-600'}`} />
                    ))}
                </div>
                <p className="text-lg font-semibold text-white text-center mt-4">- {author}</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black px-4 flex items-center gap-4">
                    <div className="h-0.5 w-12 bg-white"></div>
                    <svg width="40" height="30" viewBox="0 0 40 30" fill="white" className="transform rotate-180"><path d="M0 30V15.2174C0 10.1522 1.44928 6.19565 4.34783 3.34783C7.24638 0.5 10.942 0 15.4348 0V7.17391C12.4348 7.17391 10.1304 7.91304 8.52174 9.3913C6.91304 10.8696 6.1087 12.8261 6.1087 15.2609V16.3043H16.5217V30H0ZM23.4783 30V15.2174C23.4783 10.1522 24.9275 6.19565 27.8261 3.34783C30.7246 0.5 34.4203 0 38.913 0V7.17391C35.913 7.17391 33.6087 7.91304 32 9.3913C30.3913 10.8696 29.587 12.8261 29.587 15.2609V16.3043H40V30H23.4783Z"/></svg>
                    <div className="h-0.5 w-12 bg-white"></div>
                </div>
            </div>
        </div>
    </div>
);


// --- PROJECT CAROUSEL COMPONENT ---
const ProjectCarousel = ({ images, onImageClick }: { images: string[], onImageClick: (index: number) => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        if (!isHovering) {
            timeoutRef.current = setTimeout(
                () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length),
                4000 
            );
        }
        return () => {
            resetTimeout();
        };
    }, [currentIndex, isHovering, images.length]);


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    const getSlideStyle = (index: number): React.CSSProperties => {
        const total = images.length;
        let offset = index - currentIndex;

        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        if (offset === 0) {
            return {
                transform: 'translateX(-50%) translateY(-50%) scale(1.2)',
                opacity: 1,
                zIndex: 20,
            };
        } else if (offset === 1 || (currentIndex === total - 1 && index === 0 && total > 2)) {
            return {
                transform: 'translateX(30%) translateY(-50%) scale(0.9)',
                opacity: 0.6,
                zIndex: 10,
            };
        } else if (offset === -1 || (currentIndex === 0 && index === total - 1 && total > 2)) {
            return {
                transform: 'translateX(-130%) translateY(-50%) scale(0.9)',
                opacity: 0.6,
                zIndex: 10,
            };
        } else {
            return {
                transform: `translateX(-50%) translateY(-50%) scale(0.8)`,
                opacity: 0,
                zIndex: 0,
            };
        }
    };
    
    return (
        <div 
            className="relative w-full"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative" style={{ paddingTop: '40%' }}>
                <div className="absolute inset-0">
                    {images.map((img, index) => (
                        <div 
                            key={index}
                            className="absolute left-1/2 top-1/2 w-1/3 transition-all duration-500 ease-in-out"
                            style={getSlideStyle(index)}
                            onClick={() => {
                                if (index === currentIndex) {
                                    onImageClick(index);
                                } else {
                                    setCurrentIndex(index);
                                }
                            }}
                        >
                            <div className="aspect-square">
                                <img 
                                    src={img} 
                                    alt={`Project gallery image ${index + 1}`} 
                                    className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer" 
                                />
                            </div>
                        </div>
                    ))}
                    <button 
                        onClick={prevSlide} 
                        className="absolute top-1/2 left-0 md:-left-8 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-30"
                        aria-label="Previous image"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <button 
                        onClick={nextSlide} 
                        className="absolute top-1/2 right-0 md:-right-8 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-30"
                        aria-label="Next image"
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Animation Variants ---
const introContainerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const textItemVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.7 } } };
const imageItemVariants: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.7, delay: 0.2 } } };
const testimonialVariants: Variants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { ease: "easeOut", duration: 0.8, delayChildren: 0.3, staggerChildren: 0.2 } } };
const testimonialHeaderVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } } };
const testimonialCardVariants: Variants = { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { ease: "easeOut", duration: 0.7 } } };


// --- MAIN PROJECT DETAIL PAGE ---
export default function ProjectDetailPage() {
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pathParts = window.location.pathname.split('/');
            const slug = pathParts[pathParts.length - 1];
            const foundProject = projectsData.find(p => p.slug === slug);

            if (foundProject) {
                setProject(foundProject);
                setIsLoading(false);
            } else {
                router.push('/projects');
            }
        }
    }, [router]);

    if (isLoading) {
        return <div className="bg-white min-h-screen" />; // Render a blank screen during load/redirect
    }

    if (!project) {
        return null; // Should not be reached due to redirect, but good practice
    }

    const breadcrumbItems = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: `/projects/${project.slug}`, label: project.title },
    ];
    
    const remainingImages = project.gallery.slice(1);

    return (
        <div className="bg-white text-black font-sans">
              <style jsx>{`
                  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) rotateY(15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                  @keyframes slideInRight { from { opacity: 0; transform: translateX(40px) rotateY(-15deg); } to { opacity: 1; transform: translateX(0) rotateY(0); } }
                  .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
                  .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
              `}</style>
            
            <div className="pt-32">
                <Breadcrumbs items={breadcrumbItems} />
                <main className="py-16 md:py-20">
                    <div className="container mx-auto px-6 sm:px-12 lg:px-24">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                            variants={introContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={textItemVariants} className="text-left">
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{project.title}</h1>
                                <p className="text-base text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.description }}></p>
                            </motion.div>
                            <motion.div variants={imageItemVariants} className="flex items-center justify-center">
                                <img 
                                    src={project.gallery[0]} 
                                    alt={`${project.title} main image`} 
                                    className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[500px]"
                                />
                            </motion.div>
                        </motion.div>

                        {/* PROJECT DETAILS SUB-SECTIONS */}
                        {project.details && project.details.length > 0 && (
                            <div className="py-20 md:py-28 space-y-24">
                                {project.details.map((detail, index) => (
                                    <ProjectDetailSection
                                        key={index}
                                        detail={detail}
                                        isReversed={index % 2 !== 0}
                                    />
                                ))}
                            </div>
                        )}

                        {/* PROJECT GALLERY SECTION */}
                        {remainingImages.length > 0 && (
                            <div className="mt-16 mb-32">
                                 <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16">Project Gallery</h2>
                                 <ProjectCarousel images={remainingImages} onImageClick={(index) => setSelectedImageIndex(index)} />
                            </div>
                        )}

                        {project.testimonial && (
                            <motion.div
                                className="my-24 bg-black text-white py-20"
                                variants={testimonialVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.4 }}
                            >
                                <motion.h2
                                    className="text-3xl md:text-4xl font-extrabold text-center mb-4"
                                    variants={testimonialHeaderVariants}
                                >
                                    What Our Client Said
                                </motion.h2>
                                <motion.div variants={testimonialCardVariants}>
                                    <TestimonialCard 
                                        quote={project.testimonial.quote}
                                        author={project.testimonial.author}
                                        image={project.testimonial.image}
                                        rating={project.testimonial.rating}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                        
                        <div className="text-center mt-24">
                            <a href="/projects" className="inline-flex items-center gap-2 bg-black text-white font-bold py-4 px-10 rounded-lg hover:bg-gray-800 transition-colors text-lg">
                                <ArrowLeft size={20} />
                                Back to All Projects
                            </a>
                        </div>
                    </div>
                </main>
            </div>
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <ImageModal 
                        images={remainingImages}
                        initialIndex={selectedImageIndex}
                        onClose={() => setSelectedImageIndex(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}