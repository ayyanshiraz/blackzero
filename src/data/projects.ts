export interface Project {
    slug: string;
    title: string;
    category: string;
    imageUrl: string;
    className: string;
    description: string;
    services: string[];
    gallery: string[];
    testimonial?: {
        quote: string;
        author: string;
        image: string;
        rating: number;
    };
}

export const projectsData: Project[] = [
    // --- LEVEL 1 PROJECTS ---
    {
        slug: 'ever-smart-emporium',
        title: 'Ever Smart Emporium',
        category: "E-commerce",
        imageUrl: "/Projects/1.jpg",
        className: 'md:col-span-1 md:row-span-2',
        description: "Ever Smart Emporium is a luxury retailer based in Lahore, Pakistan, specializing in international high-end brands. Their Instagram page, @eversmart_emporium, serves as their primary digital showroom and storefront. With a substantial following of over 27,500, they have cultivated a strong online community of luxury shoppers. The page functions as a \"one-stop shop,\" showcasing a diverse and curated selection of goods for both men and women. Their collection spans from new arrivals and fragrances to bespoke suits, designer shoes, and premium accessories. They emphasize a global sourcing strategy, bringing exclusive items from renowned brands to the local market. In addition to their robust digital presence, the business also operates a physical store at 77-A/C, Ghalib Road in Lahore, solidifying their position as a key destination for luxury retail in the region.",
        services: ['Branding & Design', 'Web Development', 'E-commerce Strategy'],
        gallery: [ "/Clients/1.png", "/Projects/2.jpg", "/Projects/3.jpg", "/Projects/4.jpg", "/Projects/5.jpg", "/Projects/6.jpg", "/Projects/11.jpg", "/Projects/8.jpg", "/Projects/9.jpg", "/Projects/10.jpg" ],
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
        imageUrl: "/Clients/2.png",
        className: 'md:col-span-1',
        description: "BizVibez Properties is a real estate platform focused on luxury homes in prestigious Dubai neighborhoods, such as Dubai Hills. The website, bizvibezproperties.com, immediately presents a powerful search tool, allowing users to find properties for rent, for sale, or off-plan. With the tagline \"Truly local, truly expert!\", the company positions itself as a knowledgeable authority in the Dubai real estate market. The user-friendly interface features a prominent search bar where potential buyers or renters can filter by property type and search by location, title, or property ID. The homepage's hero image showcases a stunning view of the Dubai skyline from a beach, effectively conveying the luxurious lifestyle associated with the properties they represent. The navigation bar provides easy access to different sections of the site, including buying, renting, selling, land for sale, and area guides, offering a comprehensive resource for clients.",
        services: ['Social Media', 'Web Development', 'Media Coverage'],
        gallery: [ "/Clients/2.png", "/Projects/BizVibez/1.jpg", "/Projects/BizVibez/2.jpg" ],
        testimonial: {
            quote: "Black Zero was pivotal in establishing our digital footprint, perfectly capturing the prestige of our luxury Dubai real estate portfolio. Their expertise drove unprecedented traffic to our website and generated a substantial increase in high-quality client inquiries. For any business seeking impactful marketing that delivers measurable results, we wholeheartedly recommend Black Zero.",
            author: "Habib Rafique",
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
        description: "Coronet Gold Guest House, found on Instagram under the handle @coronetgold, presents itself as a welcoming and comfortable accommodation service. With the tagline \"Your home away from home,\" the page aims to attract guests looking for a pleasant and relaxing stay. The feed showcases professionally taken photos of their modern and well-appointed rooms, featuring stylish decor with accents of gold and blue. Although the account appears to be relatively new with a small number of posts, it effectively communicates its offering. It serves as a direct booking channel, prominently displaying contact numbers like +92 333 4556094 for reservations. The page is designed to give potential visitors a glimpse into the quality and ambiance of the guest house, encouraging them to book their stay directly.",
        services: ['Photography', 'Ad Creatives', 'Performance Marketing'],
        gallery: [ "/Clients/10.png", "/Projects/31.jpg", "/Projects/32.jpg", "/Projects/33.jpg" ],
        testimonial: {
            quote: "Black Zero was instrumental in launching our guest house, creating a sophisticated brand identity that truly set us apart. Their targeted digital marketing campaigns filled our rooms faster than we ever imagined was possible. For any hospitality business looking for impactful marketing and real results, we give Black Zero our highest recommendation.",
            author: "Habib Rafique",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
    // --- LEVEL 2 PROJECTS (REORDERED) ---
    {
        slug: 'unique-studio',
        title: 'Unique Studio',
        category: "Creative Services",
        imageUrl: "/Projects/15.jpg",
        className: 'md:col-span-1', // Standard item on the left
        description: "Unique Studio, found on Instagram at @uniquestudio181, is a Lahore-based firm specializing in architecture, interiors, and construction. Their profile serves as a professional portfolio, showcasing a range of modern and classic architectural designs. With over 1,700 followers, the page highlights their expertise in creating unique visual experiences through elegant and historical design principles. The studio provides comprehensive services from their office in Johar Town, Lahore. Their feed features high-quality images of sleek building exteriors, sophisticated interior spaces, and innovative construction projects. The page effectively communicates their brand as a provider of high-end architectural solutions, inviting potential clients to explore their work and get in touch for consultations.",
        services: ['Branding', 'Design', 'Marketing'],
        gallery: [ "/Clients/11.png", "/Projects/13.jpg", "/Projects/14.jpg", "/Projects/15.jpg", "/Projects/16.jpg", "/Projects/17.jpg", "/Projects/18.jpg", "/Projects/19.jpg", "/Projects/20.jpg","/Projects/14.jpg" ],
        testimonial: {
            quote: "Black Zero transformed our digital presence, expertly translating our architectural vision into a compelling online brand that truly resonates. Their strategic marketing amplified our portfolio, connecting us with a high-caliber clientele and driving significant growth in project inquiries. We couldn't be more impressed with their ability to blend creativity with measurable results.",
            author: "Habib Rafique",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
    {
        slug: 'hotel-mayfair',
        title: 'Hotel MayFair',
        category: "Hospitality",
        imageUrl: "/Projects/34.jpg",
        className: 'md:col-span-1 md:row-span-2', // Tall item on the right
        description: "Hotel Mayfair Lahore showcases its comprehensive hospitality experience through two specialized Instagram accounts. The @hotelmayfairlhr page is dedicated to the hotel's world-class lodging, highlighting its comfortable deluxe rooms and prime location in Gulberg, Lahore, with the inviting motto, \"Stay In Comfort.\" To feature its culinary offerings, the hotel uses the @hotelmayfairkitchen page. This account tempts food lovers with professionally photographed dishes, currently available for delivery exclusively on Foodpanda. It also builds anticipation for the future, announcing that dine-in and takeaway services will be launching soon to provide a \"delicious experience.\"",
        services: ['Performance Marketing', 'Social Media', 'Ad Creatives'],
        gallery: [ "/Clients/6.png", "/Projects/35.jpg", "/Projects/36.jpg", "/Projects/37.jpg", "/Projects/38.jpg", "/Projects/39.jpg", "/Projects/40.jpg", "/Projects/41.jpg", "/Projects/42.jpg", "/Projects/46.jpg" ],
        testimonial: {
            quote: "Black Zero masterfully unified the digital presence for both our luxury lodging and our specialized kitchen, creating a cohesive brand story. Their targeted strategies significantly boosted our online visibility, leading to a direct increase in both room bookings and food orders. We are thrilled with the tangible results and highly recommend their expert marketing services.",
            author: "Habib Rafique",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    },
    {
        slug: 'pakistan-academy',
        title: 'Pakistan Academy',
        category: "Education",
        imageUrl: "/Projects/26.jpg",
        className: 'md:col-span-1', // Standard item on the left
        description: "Pakistan Academy, accessible on Instagram via @pakistanacademy10, is an educational institution offering tutoring services. They specialize in preparing students for O/A Levels, IELTS, and other academic qualifications. The academy provides flexible learning arrangements with both home tuition and online learning options available to cater to different student needs. Their Instagram profile functions as a digital brochure, welcoming potential students and providing key contact information. It highlights their website, pakistanacademy.org, and a phone number for direct inquiries. By branding themselves as the \"Best Online Academy & Home Tutors in Pakistan,\" they aim to establish a strong reputation in the country's competitive educational landscape.",
        services: ['Web Development', 'Content Management', 'SEO'],
        gallery: [ "/Clients/7.png", "/Projects/22.jpg", "/Projects/23.jpg", "/Projects/24.jpg", "/Projects/25.jpg", "/Projects/26.jpg", "/Projects/27.jpg", "/Projects/28.jpg", "/Projects/29.jpg", "/Projects/30.jpg" ],
        testimonial: {
            quote: "Black Zero's targeted marketing strategies significantly boosted our online visibility, connecting us with students across Pakistan seeking quality education. Their team understood our mission and crafted a digital campaign that dramatically increased our student enrollment for both online and home tuition. We are incredibly pleased with the results and their professional, results-driven approach.",
            author: "Habib Rafique",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
            rating: 5,
        }
    }
];