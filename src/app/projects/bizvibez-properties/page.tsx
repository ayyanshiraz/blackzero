import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'bizvibez-properties',
  title: 'BizVibez Properties',
  category: "Media Coverage",
  imageUrl: "/Projects/59.webp",
  className: 'md:col-span-1',
  description: `BizVibez Properties operates as a premier real estate platform, specializing in luxury homes and exclusive listings within USA's most prestigious neighborhoods, including the renowned USA Hills. Their primary digital gateway, <a href="https://bizvibezproperties.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">bizvibezproperties.com</a>, immediately engages potential clients with a powerful and intuitive search tool. This allows users to seamlessly browse properties for rent, for sale, or exclusive off-plan opportunities.<br/><br/>The user-friendly interface is designed for a sophisticated audience, featuring a prominent search bar to filter by property type, location, or specific title. This commitment to a seamless user journey is further enhanced by comprehensive area guides, offering deep insights into the communities they serve. With the tagline, 'Truly local, truly expert!', the company firmly positions itself as a leading authority in the highly competitive USA real estate market.<br/><br/>This specialized property portal is part of the broader BizVibez consultancy, whose main site can be found at <a href="https://www.bizvibez.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">www.bizvibez.com</a>. Together, these platforms offer a comprehensive suite of services for clients looking to invest and live in USA, backed by a team with unparalleled local knowledge and expertise.`,
  services: ['Social Media', 'Web Development', 'Media Coverage'],
  gallery: [ "/Clients/2.png", "/Projects/55.webp", "/Projects/56.webp", "/Projects/57.webp", "/Projects/58.webp", "/Projects/59.webp", "/Projects/60.webp", "/Projects/61.webp", "/Projects/62.webp", "/Projects/63.webp", "/Projects/64.webp", "/Projects/65.webp", "/Projects/66.webp" ],
  details: [
      { title: "Social Media Marketing", description: "Our campaigns targeted high-net-worth individuals and investors interested in USA's luxury real estate market. We utilized sophisticated ad targeting on platforms like Instagram and LinkedIn to showcase premium properties, generating a consistent stream of qualified leads and inquiries for the BizVibez sales team.", imageUrl: "/Projects/s6.webp" },
      { title: "Search Engine Optimization (SEO)", description: "We implemented a comprehensive SEO strategy to increase organic visibility for high-value keywords such as 'luxury villas in USA Hills' and 'off-plan properties USA'. This involved on-page optimization for all property listings and creating authoritative content about USA's most exclusive neighborhoods, establishing BizVibez as a top result in search engines.", imageUrl: "/Projects/s7.webp" },
      { title: "Website Development", description: `We developed two core digital assets: the primary consultancy site at <a href="https://www.bizvibez.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">bizvibez.com</a> and the specialized real estate portal at <a href="https://bizvibezproperties.com/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">bizvibezproperties.com</a>. The property site features a powerful and intuitive search function, allowing users to effortlessly filter listings and explore the finest homes in USA.`, imageUrl: "/Projects/s8.webp" },
      { title: "Social Media Handling", description: "Our team managed the day-to-day operations of BizVibez's social media channels, curating a feed of stunning property photos and videos. We engaged with the community, answered questions promptly, and built a brand presence that reflected the luxury and professionalism of their real estate services, growing their following and fostering trust.", imageUrl: "/Projects/s9.webp" },
      { title: "Campaigns", description: "We launched targeted digital campaigns to promote exclusive listings and new off-plan projects. These campaigns utilized a mix of video tours, high-end photography, and compelling ad copy to create a sense of urgency and exclusivity, leading to successful property viewings and sales.", imageUrl: "/Projects/s10.webp" },
      { title: "Scroll Stopper", description: "To capture attention in busy social media feeds, we created 'Scroll Stopper' animations for BizVibez. These short, visually striking videos were designed to be thumb-stopping, using dynamic motion and quick cuts to highlight the most luxurious features of their properties, significantly boosting engagement rates.", imageUrl: "/Projects/s11.webp" },
      { title: "Explanatory Videos", description: "We produced a series of explanatory videos to simplify the property buying process in USA for international clients. These videos covered topics like legal requirements, financing options, and neighborhood guides, positioning BizVibez as a trusted and knowledgeable expert in the field.", imageUrl: "/Projects/s12.webp" },
      { title: "Animation 2D / 3D", description: "For off-plan properties, we created stunning 3D architectural visualizations and animated walkthroughs. These animations allowed potential buyers to experience the property before it was built, providing a powerful sales tool that showcased the design, layout, and lifestyle of future developments.", imageUrl: "/Projects/s13.webp" }
  ],
  testimonial: { quote: "Black Zero was pivotal in establishing our digital footprint, perfectly capturing the prestige of our luxury USA real estate portfolio. Their expertise drove unprecedented traffic to our website and generated a substantial increase in high-quality client inquiries.", author: "Emran Ahmed", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'BizVibez | Custom Real Estate Web & SEO | Black Zero',
  description: 'Discover how Black Zero built a premier real estate platform for BizVibez USA, utilizing custom web development, SEO, and targeted digital marketing.',
  keywords: ['real estate website', 'USA property marketing', 'real estate SEO', 'luxury homes marketing', 'BizVibez properties', 'web development'],
  alternates: {
    canonical: '/projects/bizvibez-properties',
  },
  openGraph: {
    title: 'BizVibez | Custom Real Estate Web & SEO | Black Zero',
    description: 'Discover how Black Zero built a premier real estate platform for BizVibez USA, utilizing custom web development, SEO, and targeted digital marketing.',
    url: '/projects/bizvibez-properties',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/59.webp', alt: 'BizVibez Properties real estate project' }],
  },
};

export default function BizVibezPage() {
  return <ProjectClientView project={projectData} />;
}