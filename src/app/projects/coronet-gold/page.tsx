import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'coronet-gold',
  title: 'Coronet Gold',
  category: "Luxury Goods",
  imageUrl: "/Projects/32.jpg",
  className: 'md:col-span-1',
  description: `Coronet Gold Guest House, accessible on Instagram at <a href="https://www.instagram.com/coronetgold/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@coronetgold</a>, establishes itself as a premier accommodation choice in Lahore, embodying its tagline, 'Your home away from home.' The brand is tailored for travelers and professionals seeking a blend of modern comfort, style, and personalized service. Our strategy involved curating a visually rich digital presence that showcases their impeccably designed rooms, highlighted by elegant gold and blue accents. Each post is crafted to convey a sense of luxury and tranquility, inviting potential guests to envision their stay. By focusing on high-quality photography and a direct call to action for bookings, the Instagram feed acts as a primary channel for inquiries, solidifying Coronet Gold's reputation as a top-tier guest house in the city.`,
  services: ['Photography', 'Ad Creatives', 'Performance Marketing'],
  gallery: [ "/Projects/cg.png", "/Projects/47.jpg", "/Projects/48.jpg", "/Projects/49.jpg", "/Projects/50.jpg", "/Projects/51.jpg", "/Projects/52.jpg" ],
  details: [
      { title: "Social Media Marketing", description: "Our marketing strategy centered on reaching potential travelers and local clients looking for premium accommodation in Lahore. We launched targeted ad campaigns on Instagram and Facebook, utilizing stunning visuals from our photoshoots to capture attention. By focusing on location-based and interest-based targeting, we successfully drove a consistent stream of booking inquiries and increased brand awareness among a relevant audience.", imageUrl: "/Projects/s15.webp" },
      { title: "Social Media Handling", description: `We took full control of the <a href="https://www.instagram.com/coronetgold" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@coronetgold</a> Instagram page, managing all aspects of its daily operations. This included developing a content calendar, posting high-quality images and stories consistently, and engaging directly with the community. Our team handled all inquiries via comments and direct messages promptly, ensuring a professional and welcoming brand voice that converts followers into guests.`, imageUrl: "/Projects/s16.webp" },
      { title: "Listing & Booking Platform Management", description: "To maximize occupancy, we managed Coronet Gold's presence on major online travel agencies (OTAs) and hotel booking platforms. This service included creating and optimizing their listings with professional photos and compelling descriptions, managing room availability and pricing strategies, and actively monitoring and responding to guest reviews. This ensured high visibility and maintained a stellar reputation across all critical booking channels.", imageUrl: "/Projects/s14.webp" }
  ],
  testimonial: { quote: "Black Zero was instrumental in launching our guest house, creating a sophisticated brand identity that truly set us apart. Their targeted digital marketing campaigns filled our rooms faster than we ever imagined was possible.", author: "Fakhra Batool", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'Coronet Gold | Hospitality Brand Marketing | Black Zero',
  description: 'Case study: How Black Zero established Coronet Gold as a premier guest house in Lahore through photography, social media marketing, and OTA management.',
  keywords: ['hospitality marketing', 'hotel social media', 'guest house branding', 'booking management', 'Coronet Gold', 'travel marketing'],
  alternates: {
    canonical: '/projects/coronet-gold', // Bina Slash ke
  },
  openGraph: {
    title: 'Coronet Gold | Hospitality Brand Marketing | Black Zero',
    description: 'Case study: How Black Zero established Coronet Gold as a premier guest house in Lahore through photography, social media marketing, and OTA management.',
    url: '/projects/coronet-gold', // Bina Slash ke
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/32.jpg', alt: 'Coronet Gold guest house project' }],
  },
};

export default function CoronetGoldPage() {
  return <ProjectClientView project={projectData} />;
}