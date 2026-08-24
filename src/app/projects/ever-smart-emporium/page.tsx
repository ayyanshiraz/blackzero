import { Metadata } from "next";
import ProjectClientView from "@/components/ProjectClientView";

const projectData = {
  slug: "ever-smart-emporium",
  title: "Ever Smart Emporium",
  category: "E-commerce",
  imageUrl: "/Projects/1.jpg",
  className: "md:col-span-1 md:row-span-2",
  description: `Ever Smart Emporium stands as a premier luxury retailer in Lahore, curating high-end international brands for a discerning clientele. Operating through their influential Instagram page, <a href="https://www.instagram.com/eversmart_emporium/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@eversmart_emporium</a>, they have cultivated a significant online community of over 27,000 followers. This digital showroom serves as a one-stop destination, showcasing an exquisite collection of goods for both men and women. Their offerings range from the latest arrivals and exclusive fragrances to bespoke suits and designer accessories. By sourcing exclusive items from renowned brands globally, they bring a unique taste of international luxury to the local market. Complementing their strong digital presence, their physical store on Ghalib Road cements their status as a key destination for luxury retail in the heart of Lahore.`,
  services: ["Branding & Design", "Web Development", "E-commerce Strategy"],
  gallery: ["/Clients/1.png", "/Projects/2.jpg", "/Projects/3.jpg", "/Projects/4.jpg", "/Projects/5.jpg", "/Projects/6.jpg", "/Projects/11.jpg", "/Projects/8.jpg", "/Projects/9.jpg", "/Projects/10.jpg"],
  details: [
    { title: "Social Media Handling", description: `We took complete ownership of the <a href="https://www.instagram.com/eversmart_emporium/" target="_blank" rel="noopener noreferrer" class="text-black font-semibold hover:underline">@eversmart_emporium</a> Instagram account, ensuring a consistent and high-end digital presence. Our team managed daily content posting, story updates, and direct community engagement. By responding to inquiries and fostering conversations with their 27.6k followers, we cultivated a loyal community and solidified the brand's reputation as a responsive and prestigious luxury source.`, imageUrl: "/Projects/s1.webp" },
    { title: "Social Media Marketing", description: "Our strategy focused on transforming their Instagram page into a powerful sales funnel. We developed a content marketing plan that highlighted new arrivals and brand stories. Through targeted promotions, we expanded their reach to a qualified audience of luxury shoppers, driving significant traffic and converting followers into paying customers.", imageUrl: "/Projects/s2.webp" },
    { title: "Photography", description: "To capture the essence of the luxury products, we conducted professional photoshoots that emphasized quality and detail. Each image was carefully styled, lit, and edited to create a visually stunning and cohesive feed. Our high-quality photography established a premium aesthetic for the brand, making each product feel exclusive and desirable.", imageUrl: "/Projects/s3.webp" },
    { title: "Videography", description: "We brought the products to life through dynamic videography, creating engaging Instagram Reels and Stories. Short-form video content allowed us to showcase the texture, craftsmanship, and real-world appeal of the luxury items. These videos captured user attention, increased engagement rates, and provided a more immersive shopping experience.", imageUrl: "/Projects/s5.webp" },
    { title: "Campaigns", description: "We designed and executed targeted campaigns for key moments like \"New Arrivals\" and promotions for specific high-end brands. These campaigns combined compelling visuals, persuasive copy, and strategic ad placements to generate excitement and urgency, successfully boosting sales for featured collections.", imageUrl: "/Projects/s4.webp" }
  ],
  testimonial: { quote: "Partnering with Black Zero was a game-changer, transforming our digital presence to perfectly capture our luxury brand's essence. Their strategic approach to social media and advertising dramatically increased our engagement and, most importantly, our sales. We couldn't be happier and highly recommend Black Zero for their professionalism, creativity, and incredible results.", author: "Habib Rafique", image: "", rating: 5 }
};

export const metadata: Metadata = {
  title: "Ever Smart Emporium | Luxury E-Commerce | Black Zero",
  description: "Discover how Black Zero scaled Ever Smart Emporium into Lahore's top luxury retailer through expert e-commerce, social media, and product photography.",
  keywords: ["luxury e-commerce", "fashion marketing", "social media management", "product photography", "brand strategy Lahore", "Ever Smart Emporium"],
  
  alternates: {
    canonical: "https://www.blackzero.org/projects/ever-smart-emporium",
  },

  openGraph: {
    title: "Ever Smart Emporium | Luxury E-Commerce | Black Zero",
    description: "Discover how Black Zero scaled Ever Smart Emporium into Lahore's top luxury retailer through expert e-commerce, social media, and product photography.",
    url: "https://www.blackzero.org/projects/ever-smart-emporium",
    siteName: "Black Zero",
    locale: "en_US",
    type: "website",
    images: [{ url: "/Projects/1.jpg", alt: "Ever Smart Emporium luxury retail project" }],
  },
};

export default function EverSmartEmporiumPage() {
  return <ProjectClientView project={projectData} />;
}