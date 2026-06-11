import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const advancedWebsitesData = { 
  title: `Advanced Website and Portal Systems`, 
  slug: `advanced-websites`,
  imageUrl: `/web.webp`,
  imgAltText: `Advanced website and scalable portal systems`,
  description: `Custom Websites, 3D Experiences and Scalable Portals. We Build Interactive Web and 3D Digital Platforms. From Websites to Advanced Portal Systems. Next-Level Web Development with 3D Innovation.`,
  subSections: [
      { 
          title: `Custom Websites and Advanced Portals`, 
          slug: `custom-websites-portals`,
          description: `Turn your digital vision into reality with our innovative programming solutions. We build highly scalable custom websites and advanced portal systems specifically designed to accelerate your growth. Choose a trusted web application development company in the USA for your next project. Our experienced engineers develop the best code that ensures the best performance of your interactive web platforms. We focus on intuitive designs that engage users and generate effective conversions. \n\nExperience the true dedication of a bespoke web development company today. Every digital product we launch undergoes rigorous testing for complete quality. We upgrade legacy systems to modern industry standards and scalable portal architectures. We proudly provide our specialised coding and deployment services in the USA. Seamless integrations help your business run more efficiently. Keep your valuable data safe with our robust and secure architectural framework. Create a partnership with our experts and gain a strong and prominent position in the digital world.`, 
          imageUrl: `/web.webp` 
      },
      { 
          title: `UI/UX and 3D Interactive Platforms`, 
          slug: `ui-ux-3d-platforms`,
          description: `Create engaging digital experiences that instantly engage your target audience. We bring next-level web development with 3D innovation to your digital presence. We focus on strategic layouts and interactive 3D experiences that improve usability and foster meaningful interactions. Elevate your digital presence with comprehensive UI/UX development tailored to you. Our creative team conducts in-depth user research to understand core customer behaviours better. \n\nWe specialise in intuitive app design UI/UX to ensure a seamless experience on mobile and desktop. Each wireframe is meticulously designed to strike the perfect balance between beauty and functionality. We create interactive prototypes that bring your visionary ideas to life. Our team proudly provides these transformative design services in the USA. Consistent visual elements are used to strengthen your brand identity. We transform complex workflows into simple and accessible digital interfaces. Strong usability testing ensures the experience is optimal across all modern platforms. Partner with your design experts and create digital products that users truly love.`, 
          imageUrl: `/uiux.webp` 
      },
      { 
          title: `App Development`, 
          slug: `app-development`,
          description: `Turn your mobile vision into reality with our expertly engineered digital solutions. We create intuitive interfaces that engage users and enhance brand experiences. Partner with a trusted mobile application development agency to build the future. Our expert programmers deliver robust and optimal performance across all major device platforms. We specialise in effective Flutter development to create seamless cross-platform apps. \n\nEach project is tailored specifically to your unique business objectives. We use agile methodologies to ensure fast delivery while maintaining quality. Our team proudly provides comprehensive mobile services in the USA. Scalable architecture ensures your digital product grows with your business. We prioritise strict security protocols to keep user data safe and maintain trust. We transform complex business challenges into simple and interactive mobile ecosystems. Start your journey today with us. Connect with experts and launch an effective and reliable digital product.`, 
          imageUrl: `/app.webp` 
      },
      { 
          title: `Wordpress / Shopify`, 
          slug: `wordpress-shopify`,
          description: `Build your digital store with our highly customised and responsive themes. We design seamless shopping experiences that engage customers and increase sales. Partner with a leading WordPress e-commerce development agency to achieve reliable growth. Our team optimises product pages to maximise visibility and conversion rates. We integrate secure payment gateways to ensure safe transactions for every shopper. \n\nChoose a top Shopify store development agency in the USA to take your retail brand to new heights. Every platform we build features easy navigation and super-fast loading speeds. We implement robust inventory management systems to simplify your daily operations. Our team proudly provides specialised digital services in the USA. Mobile responsive design is guaranteed so that users can browse smoothly on any device. We provide full maintenance so that you can keep your online store running smoothly. Launch an exceptional online store today and outdo your competitors in the market.`, 
          imageUrl: `/wordpress.webp` 
      }
  ]
};

export const metadata: Metadata = {
  title: `Advanced Web, App & Portal Development | Black Zero`,
  description: `CustDiscover how Black Zero transforms your digital presence in the UAE. Explore our custom web apps, scalable portals, 3D experiences, and Shopify development.`,
  keywords: [`web development`, `app development`, `Next.js developers`, `mobile apps`, `UI/UX design`, `custom portals`, `3D digital platforms`],
  alternates: {
    canonical: `/services/advanced-websites`,
  },
  openGraph: {
    title: `Advanced Web, App & Portal Development | Black Zero`,
    description: `CustDiscover how Black Zero transforms your digital presence in the UAE. Explore our custom web apps, scalable portals, 3D experiences, and Shopify development.`,
    url: `/services/advanced-websites`,
    siteName: `Black Zero`,
    locale: `en_US`,
    type: `website`,
    images: [{ url: `/web.webp`, alt: `Advanced website and scalable portal systems` }],
  },
};

export default function AdvancedWebsitesPage() {
  return <ServiceClientView service={advancedWebsitesData} />;
}