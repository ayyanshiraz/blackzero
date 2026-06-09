import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'unique-studio',
  title: 'Unique Studio',
  category: "Creative Services",
  imageUrl: "/Projects/15.jpg",
  className: 'md:col-span-1',
  description: `Unique Studio, a prominent Lahore-based firm found on Instagram at <a href='https://www.instagram.com/uniquestudio181/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@uniquestudio181</a>, specializes in the art of architecture, interiors, and construction. They have carved a niche by blending timeless classic design with bold, modern aesthetics, creating spaces that are both elegant and functional. Their digital presence serves as a meticulously curated professional portfolio, showcasing a diverse range of high-end residential and commercial projects. Each post highlights their keen eye for detail, from grand, sweeping exteriors to sophisticated interior finishes. Operating from their office in Johar Town, Lahore, Unique Studio caters to a discerning clientele, turning ambitious architectural visions into tangible, breathtaking realities and building a strong reputation for excellence in the design community.`,
  services: ['Branding', 'Design', 'Marketing'],
  gallery: [ "/Projects/unique.png", "/Projects/13.jpg", "/Projects/14.jpg", "/Projects/15.jpg", "/Projects/16.jpg", "/Projects/17.jpg", "/Projects/18.jpg", "/Projects/19.jpg", "/Projects/20.jpg","/Projects/14.jpg" ],
  details: [
      { title: "Campaigns", description: "Our primary goal was to generate high-quality leads for their architectural and interior design services. We designed and executed targeted ad campaigns on Instagram and Facebook, showcasing their most visually stunning projects to a curated audience of high-net-worth individuals, real estate developers, and businesses in Lahore and surrounding areas. The campaigns focused on driving traffic to their social profiles and encouraging direct messages for consultations, resulting in a significant increase in qualified project inquiries.", imageUrl: "/Projects/s17.webp" },
      { title: "Social Media Handling", description: "We managed Unique Studio's social media channels to reflect their status as a premium design firm. This involved creating a cohesive and aesthetically pleasing feed, writing engaging captions that detailed the design process and material choices, and actively managing community engagement. By consistently showcasing their expertise and responding promptly to inquiries, we built their online brand authority and fostered a community of design admirers and potential clients.", imageUrl: "/Projects/s18.webp" }
  ],
  testimonial: { quote: "Black Zero transformed our digital presence, expertly translating our architectural vision into a compelling online brand that truly resonates. Their strategic marketing amplified our portfolio, connecting us with a high-caliber clientele and driving significant growth in project inquiries.", author: "Nauman Arshad", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'Unique Studio | Arch & Interior Marketing | Black Zero',
  description: 'Discover how Black Zero helped Unique Studio showcase architectural excellence and generate high-quality leads in Dubai via targeted social media.',
  keywords: ['architecture marketing', 'interior design branding', 'lead generation for architects', 'social media for designers', 'Unique Studio'],
  alternates: {
    canonical: '/projects/unique-studio',
  },
  openGraph: {
    title: 'Unique Studio | Arch & Interior Marketing | Black Zero',
    description: 'Discover how Black Zero helped Unique Studio showcase architectural excellence and generate high-quality leads in Dubai via targeted social media.',
    url: '/projects/unique-studio',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/15.jpg', alt: 'Unique Studio architecture project' }],
  },
};

export default function UniqueStudioPage() {
  return <ProjectClientView project={projectData} />;
}