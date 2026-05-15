import { Metadata } from 'next';
import SubSectionClientView from '@/components/SubSectionClientView';

const parentServiceInfo = {
  title: `Marketing`,
  slug: `marketing`,
};

const currentSubSection = {
  title: `Digital Marketing`,
  slug: `digital-marketing`,
  description: `Choosing the best digital marketing company for small businesses is the first step towards sustainable growth and online prominence. Our team creates customized campaigns with your specific target audience in mind to maximize your return on investment.`,
  imageUrl: `/digitalmarketing.webp`,
  imgAltText: `Team working at a digital marketing company for small businesses to improve online growth.`
};

const digitalMarketingDetails = [
  { 
    title: `Social Media Marketing`, 
    description: `Strengthen your brand presence and build deeper relationships with your audience through our strategic online engagement and community-building strategies. We understand that consistency is essential to building a strong digital identity, which is why we tailor strategies to your business goals. Our expert team specializes in high-quality social media content creation services that capture attention and effectively tell your brands unique story. By combining compelling visuals and powerful storytelling, we ensure that your message reaches potential customers across all major social networks effectively and increases brand engagement. \n\nYou can extend your reach beyond organic boundaries with our data-driven social media advertising strategies that are designed to maximize your return on investment. We drive quality traffic by precisely targeting your ideal target audience and generating leads that actually convert into sales. Whether you are a local startup or an established organization, we are proud to provide high-quality digital marketing services in the US to help you grow your business. Let us guide you through the changing trends of the digital world and transform your social media profiles into powerful business assets.`, 
    imageUrl: `/smm.webp`,
    imgAltText: `Graph showing growth from social media advertising and content creation services.`
  },
  { 
    title: `Social Media Handling`, 
    description: `Effective social media management is essential to maintaining a positive brand image and building meaningful relationships with your target audience. We simplify the complexity of managing your digital presence, monitoring every interaction, and ensuring that your profiles are always vibrant and engaging. Our team uses cutting-edge social media management platforms to efficiently organize postings and monitor real-time engagement across all channels. We know that consistency and high-quality content are key to maintaining follower engagement and brand loyalty. That is why we are committed to providing high-quality social media content creation services in the US that are fully aligned with your unique business goals. \n\nBy combining creative visuals and effective storytelling, we ensure that your message reaches the right people, rather than being drowned out by the noise. We continuously refine our strategies through data-driven analytics to ensure your growth is sustainable and measurable over the long term. Our expert team handles everything from community management to emergency response, so you can focus on your core business without any worries. We are proud to provide professional digital solutions to businesses across the US to help them stand out in their industries.`, 
    imageUrl: `/smh.webp`,
    imgAltText: `Dashboard view of social media management platforms used for services in usa`
  },
  { 
    title: `Google Ads`, 
    description: `Accelerate your business growth and bring your brand to the top of search results where potential customers are searching. As an expert Google Ads consultant, we conduct in-depth analysis of your industry trends to design campaigns that outperform your competitors. Our primary goal is to drive quality traffic to your website that instantly converts into valuable leads and sales. We provide end-to-end Google Ads management services so that every dollar of your budget is spent effectively on high-performing keywords. Through constant bid monitoring and timely adjustments, we reduce unnecessary costs and significantly improve your return on ad spend. \n\nYou need a partner who understands the refinement of Quality Score and Ad Relevance to get you the best positions. We have helped countless businesses expand their reach and achieve financial goals through data-driven paid strategies. Our team is fully equipped to provide these high-quality digital advertising solutions to clients in the US market. Experience the difference of working with experts who put your profitability and long-term success first. We create compelling ad copy that grabs attention and immediately compels users to act on your offer.`, 
    imageUrl: `/googleads.webp`,
    imgAltText: `Professional Google Ads consultant analyzing campaign data for management services.`
  },
  { 
    title: `Content Calendar`, 
    description: `Staying organized is the foundation of every successful marketing strategy, helping to avoid last-minute panic and pressure. We specialize in providing high-quality content calendar services in the US so that businesses can easily manage their publishing workflow. A well-organized plan ensures that your brand voice remains consistent and effective across all channels, keeping your audience engaged. We use cutting-edge social media scheduling platforms to ensure your posts are automatically published on time, and no key engagement windows are missed. Our team works with you to plan monthly themes and key dates that align with your sales goals. \n\nBy planning, you can maintain a consistent flow of high-quality content that both informs and entertains your followers. We understand market dynamics and proudly provide these planning solutions to companies across the US. This strategic approach allows you to focus on creating great content instead of worrying about when to post. With our expert help, take the guesswork out of your marketing efforts and take full control of your digital story. We help you see your entire marketing timeline in one place, making collaboration between team members much smoother.`, 
    imageUrl: `/cc2.webp`,
    imgAltText: `Monthly plan on social media scheduling platforms for content calendar services in us`
  },
  { 
    title: `Pinterest Marketing`, 
    description: `Highlight the visual power of your brand with our unique strategies designed to capture attention and drive action. As expert Pinterest marketing specialists, we know exactly how to optimize your Pins to reach the right audience. We leverage the unique capabilities of Pinterest for Business to drive significant traffic to your product pages. Our team creates stunning visual designs that align with your brand identity and encourage users to save and share. We believe that Pinterest is a long-term strategy that requires consistency and high-quality imagery to succeed. By using rich Pins and the right keywords, we ensure that your content stands out in relevant search results. \n\nWe proudly provide these specialized visual marketing services to clients across the United States. Turn your casual viewers into engaged buyers by leveraging the immense potential of this discovery platform. We analyze analytics to continuously improve our strategy so that each pin contributes to your overall growth. Through detailed board management, we effectively organize your products for a better user experience.`, 
    imageUrl: `/pinterest.webp`,
    imgAltText: `Pinterest marketing expert creating visual boards for business growth.`
  },
  { 
    title: `TikTok Marketing`, 
    description: `Capture the attention of a wide audience worldwide with our dynamic strategies designed specifically for the fastest-growing video platform. We help you harness the full power of TikTok for Business to connect with the younger generation in a real and impactful way. Our creative team creates engaging short-form videos that are both entertaining and effectively communicate your products to potential buyers. As a specialist TikTok Ads company, we know exactly how to create campaigns that drive engagement and conversions. We focus on creating hooks that capture immediate attention because we know that the algorithm values watch time the most. \n\nWhether it is viral challenges or influencer collaborations, we handle every aspect of your development to ensure success. We proudly provide these cutting-edge digital services to passionate brands across the US. Through real-time data analysis, we continuously refine your content strategy to consistently increase reach and follower count. Turn casual scrollers into a vibrant community that supports your brand and shares your videos. We ensure that your brand voice remains consistent and strong while remaining in sync with the creative freedom of the platform.`, 
    imageUrl: `/tiktok.webp`,
    imgAltText: `Mobile screen showing TikTok ads company campaign results for business.`
  },
  { 
    title: `LinkedIn Marketing`, 
    description: `Strengthen your professional network and establish your authority with our strategic corporate social media strategy. We understand the unique dynamics of the professional world, where a consistent and credible brand voice is essential. As a specialized B2B marketing company, we enable you to reach the decision-makers who really matter. Our team creates impactful content that highlights your industry expertise and fosters meaningful conversations with potential partners. We use advanced LinkedIn Ads Management to precisely target specific job titles and companies, so your budget reaches high-value prospects instead of wasting it on generic and uninformed audiences. \n\nWe proudly provide these specialized corporate solutions to businesses operating across the United States. By improving your company profile, we help you acquire top talent and quality leads at the same time. Our strategies are designed to turn your connections into real opportunities that strengthen your sales pipeline. We continuously analyze performance metrics to maximize impact and achieve the best return on investment.`, 
    imageUrl: `/linkedin.webp`,
    imgAltText: `B2b marketing company team discussing linked in ads management strategy`
  },
];

const contactOptions = [
  { value: `digital-marketing`, label: `Digital Marketing` },
  { value: `traditional-marketing`, label: `Traditional Marketing` },
  { value: `pr-campaigns`, label: `PR Campaigns` },
  { value: `design-and-branding`, label: `Design and Branding` }
];

export const metadata: Metadata = {
  title: `Digital Marketing Company for Small Businesses in the USA`,
  description: `Accelerate your growth with our digital marketing strategies for small businesses. We provide expert digital services in the US that help increase leads and maximize your return on investment (ROI).`,
  keywords: [
    `Digital Marketing Company for Small Business`,
    `social media advertising`,
    `social media content creation services`,
    `social media management platforms`,
    `social media content creation services in usa`,
    `Google Ads consultant`,
    `Google Ads management services`,
    `social media scheduling platforms`,
    `content calendar services in usa`,
    `Pinterest marketing expert`,
    `Pinterest for business`,
    `TikTok ads company`,
    `TikTok for business`,
    `linked in ads management`,
    `b2b marketing company`
  ],
  alternates: {
    canonical: `/services/marketing/digital-marketing`, 
  },
  openGraph: {
    title: `Digital Marketing Company for Small Businesses in the USA`,
    description: `Accelerate your growth with our digital marketing strategies for small businesses. We provide expert digital services in the US that help increase leads and maximize your return on investment (ROI).`,
    url: `/services/marketing/digital-marketing`,
    siteName: `Black Zero`,
    locale: `en_US`,
    type: `website`,
    images: [{ url: `/digitalmarketing.webp`, alt: `Team working at a digital marketing company for small businesses to improve online growth.` }],
  },
};

export default function DigitalMarketingPage() {
  return (
    <SubSectionClientView 
      serviceTitle={parentServiceInfo.title}
      serviceSlug={parentServiceInfo.slug}
      subSection={currentSubSection}
      details={digitalMarketingDetails}
      contactOptions={contactOptions}
    />
  );
}