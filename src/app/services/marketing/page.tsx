import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const marketingData = { 
  title: `Turn Clicks Into Customers`,
  slug: `marketing`,
  imageUrl: `/brand-strategy.webp`,
  imgAltText: `Professional marketing team brainstorming internet marketing strategies for small business in modern workspace.`,
  description: `Making your way in the online world can be complicated, but growing your brand does not have to be. We specialize in custom internet marketing strategies for small business owners who are ready to expand their businesses.`,
  subSections: [
    {
      title: `Digital Marketing`,
      slug: `digital-marketing`,
      description: `Standing out in a crowded marketplace requires a strategy that cuts through the noise and connects directly with your ideal audience. We are committed to filling this gap with professional digital marketing services for small businesses, helping them take their brand identity to new heights. \n\nOur team combines technical expertise with creative vision to create campaigns that not only attract visitors but also convert them into loyal customers. Through our specialized content marketing services, we ensure that your voice is heard clearly across all channels, building trust and long-term engagement. \n\nAs a dynamic company serving the US, we understand the unique needs of the market and tailor our solutions to those specific requirements. Partner with us today and secure a leadership position in your industry.`,
      imageUrl: `/digitalmarketing.webp`,
      imgAltText: `Data analytics dashboard showing growth from digital marketing services and content marketing services for small businesses in the US.`
    },
    {
      title: `Design and Branding`,
      slug: `design-and-branding`,
      description: `Good design is not just about beauty; it is a strategic tool that determines how the world sees your value. We partner with committed and passionate companies to create a cohesive visual system that inspires trust and professionalism from the very first meeting. \n\nBy focusing on comprehensive brand identity design, we ensure that your message is consistent and effective everywhere, whether it is a business card or a billboard. A key part of this foundation is a strong brand identity, which is why we provide premium logo design services that accurately reflect your unique corporate DNA. \n\nRecognizing the competitive nature of the Western market, we offer high-quality branding services in the United States, enabling local and national businesses to thrive. Partner with us and bring your vision to life as a sophisticated reality that resonates deeply with your target audience.`,
      imageUrl: `/designandbranding.webp`,
      imgAltText: `Graphic designer outlining creative concepts for brand identity design and custom logo design services.`
    },
    {
      title: `PR Campaigns`,
      slug: `pr-campaigns`,
      description: `In todays hyper-connected world, a single story can determine the future of your brand, which is why controlling your public narrative is more important than ever. We specialize in building lasting trust with your audience and shaping positive perceptions through strategic storytelling and effective media relations. \n\nOur approach is not limited to press releases; we implement comprehensive online reputation management strategies to ensure your digital presence remains positive and influential. Through our expert pr services, we secure high-value media placements that position your company as a thought leader in your industry. \n\nWe proudly provide these critical communications services in the United States, enabling businesses to move forward with confidence in a complex media landscape. Let us be the guardians of your brand image, so that your message is heard clearly and accurately.`,
      imageUrl: `/pr-campaigns.webp`,
      imgAltText: `The public relations specialist is handling online reputation management and providing PR services for clients in the US.`
    },
    {
      title: `Traditional Marketing`,
      slug: `traditional-marketing`,
      description: `While digital channels dominate modern communication, the real impact of offline engagement still has the power to build trust in the real world. We understand that a complete strategy often requires looking beyond the screen and connecting with consumers in their real environments. Our team specializes in impactful traditional marketing in the U.S., bridging the gap between old-fashioned credibility and modern brand messaging. \n\nWhether it is engaging print campaigns, direct mail, or strategic billboard installations, we create experiences that leave a lasting impression. We are proud to offer these lasting services across the U.S., helping businesses gain attention where their competitors often are not looking. By combining these classic approaches with your digital efforts, we ensure your brand maintains a dominant presence both online and offline.`,
      imageUrl: `/traditional marketing.webp`,
      imgAltText: `Creative team discussing print layout and direct mail strategies for traditional marketing for clients in the US.`
    },
    {
      title: `Data-Driven Ads`,
      slug: `data-driven-ads`,
      description: `We design and deploy data-driven ads of all sorts across every platform. Reach your exact target audience with precision and maximize your return on investment through strategic ad placements. By analyzing consumer behavior and engagement metrics, we ensure your advertising budget is spent efficiently on the networks that matter most to your business growth.`,
      imageUrl: `/dda.webp`,
      imgAltText: `Data driven advertising campaigns across multiple digital platforms.`
    }
  ] 
};

export const metadata: Metadata = {
  title: `Top Internet Marketing Strategies in the UAE`,
  description: `Grow your small business in Dubai & the UAE with Black Zero's internet marketing strategies. Our expert digital services drive leads and maximize ROI.`,
  keywords: [
    `Internet marketing strategies for small business`,
    `digital marketing services for small business`,
    `content marketing services`,
    `brand identity design`,
    `logo design services`,
    `online reputation management`,
    `pr service`,
    `Traditional marketing in usa`,
    `data driven ads`
  ],
  alternates: {
    canonical: `/services/marketing`,
  },
  openGraph: {
    title: `Top Internet Marketing Strategies in the USA`,
    description: `Grow your small business in Dubai & the UAE with Black Zero's internet marketing strategies. Our expert digital services drive leads and maximize ROI.`,
    url: `/services/marketing`,
    siteName: `Black Zero`,
    locale: `en_US`,
    type: `website`,
    images: [{ url: `/brand-strategy.webp`, alt: `Professional marketing team brainstorming internet marketing strategies for small business in modern workspace.` }],
  },
};

export default function MarketingPage() {
  return <ServiceClientView service={marketingData} />;
}