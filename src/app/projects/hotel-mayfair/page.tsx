import { Metadata } from 'next';
import ProjectClientView from '@/components/ProjectClientView';

const projectData = {
  slug: 'hotel-mayfair',
  title: 'Hotel MayFair',
  category: "Hospitality",
  imageUrl: "/Projects/34.jpg",
  className: 'md:col-span-1 md:row-span-2',
  description: `Hotel Mayfair Lahore offers a comprehensive hospitality experience, strategically marketed through two distinct digital identities. The primary hotel page, <a href='https://www.instagram.com/hotelmayfairlhr/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@hotelmayfairlhr</a>, is dedicated to showcasing world-class lodging and the promise of a "Stay In Comfort." This platform targets travelers and business professionals by highlighting its luxurious deluxe rooms, premium amenities, and prime location in Lahore's commercial hub. In parallel, the <a href='https://www.instagram.com/hotelmayfairkitchen/' target='_blank' rel='noopener noreferrer' class='text-black font-semibold hover:underline'>@hotelmayfairkitchen</a> page focuses entirely on its culinary offerings, serving as a vibrant digital menu. It tempts local food enthusiasts with professionally shot images of their freshly prepared meals, driving orders exclusively through a strategic partnership with Foodpanda. This dual approach allows Hotel Mayfair to cater specifically to different customer segments, building a strong brand for both its accommodation and its delicious dining experiences.`,
  services: ['Performance Marketing', 'Social Media', 'Ad Creatives'],
  gallery: [ "/Projects/mayfair.png", "/Projects/35.jpg", "/Projects/36.jpg", "/Projects/37.jpg", "/Projects/38.jpg", "/Projects/39.jpg", "/Projects/40.jpg", "/Projects/41.jpg", "/Projects/42.jpg", "/Projects/46.jpg" ],
  details: [
      { title: "Website Development", description: "We designed and developed a comprehensive website for Hotel Mayfair, creating an elegant digital hub for both the hotel and its kitchen. The site features a seamless online booking engine, stunning galleries of the rooms and amenities, and integrated menus for the restaurant. The platform was built to be fully responsive, providing a premium user experience for guests booking a stay or ordering a meal.", imageUrl: "/Projects/s25.webp" },
      { title: "Campaign Management", description: "Our team managed distinct digital advertising campaigns for both the hotel and the kitchen. For lodging, we targeted travelers and business professionals searching for accommodation in Lahore. For the kitchen, we ran geo-targeted campaigns promoting their delivery service on Foodpanda, successfully driving food orders from the local community.", imageUrl: "/Projects/s26.webp" },
      { title: "Website Handling", description: "We provided continuous website handling and maintenance to ensure the digital presence of Hotel Mayfair remained current and effective. This included updating room rates and availability, refreshing the kitchen's menu with new items, posting special offers, and performing regular security and performance audits to guarantee a smooth and secure user experience.", imageUrl: "/Projects/s27.webp" },
      { title: "Photography", description: "Our visual strategy involved two separate professional photoshoots. For the hotel, we captured high-end interior photographs of the deluxe rooms, lobby, and other facilities to convey luxury and comfort. For the kitchen, we conducted professional food photography, styling each dish to look vibrant and appetizing for social media and delivery platforms.", imageUrl: "/Projects/s28.webp" },
      { title: "Videography", description: "We produced a suite of video content to engage audiences for both brands. This included elegant video tours of the hotel rooms and facilities, dynamic promotional videos for new dishes from the kitchen, and engaging short-form content for Instagram Reels to showcase the complete Mayfair experience.", imageUrl: "/Projects/s29.webp" },
      { title: "Listing on Hotel Apps", description: "To maximize bookings and reach a global audience, we managed Hotel Mayfair's listings on major hotel booking apps and Online Travel Agencies (OTAs). Our work involved optimizing their profile, managing dynamic pricing, ensuring calendar synchronization across platforms, and actively responding to guest reviews to maintain a high rating and attract more visitors.", imageUrl: "/Projects/s30.webp" }
  ],
  testimonial: { quote: "Black Zero masterfully unified the digital presence for both our luxury lodging and our specialized kitchen, creating a cohesive brand story. Their targeted strategies significantly boosted our online visibility, leading to a direct increase in both room bookings and food orders.", author: "Mian Asad", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: 'Hotel Mayfair | Hotel Web & Food Marketing | Black Zero',
  description: 'Explore how we unified Hotel Mayfair\'s digital presence, boosting room bookings and food delivery orders through web development and performance marketing.',
  keywords: ['hotel website development', 'hospitality digital marketing', 'food photography', 'booking engine integration', 'Hotel Mayfair Lahore', 'restaurant marketing'],
  alternates: {
    canonical: '/projects/hotel-mayfair',
  },
  openGraph: {
    title: 'Hotel Mayfair | Hotel Web & Food Marketing | Black Zero',
    description: 'Explore how we unified Hotel Mayfair\'s digital presence, boosting room bookings and food delivery orders through web development and performance marketing.',
    url: '/projects/hotel-mayfair',
    siteName: 'Black Zero',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/Projects/34.jpg', alt: 'Hotel Mayfair hospitality project' }],
  },
};

export default function HotelMayfairPage() {
  return <ProjectClientView project={projectData} />;
}