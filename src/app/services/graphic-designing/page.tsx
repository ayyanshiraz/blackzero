import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const graphicData = { 
  title: `Graphic Designing`, 
  slug: `graphic-designing`,
  imageUrl: `/graphic designing.webp`,
  imgAltText: `Graphic design workspace displaying logos, color palettes, and brand identity assets`,
  description: `From logos to complete branding packages, we create a cohesive and memorable brand image through stunning visuals.`,
  subSections: [
      { 
          title: `Post Designing`, 
          slug: `post-designing`,
          description: `We design visually stunning and highly engaging posts for all your social media platforms. From Instagram carousels to LinkedIn infographics, our designs are tailored to each platforms unique audience and specifications. We focus on creating scroll-stopping visuals that communicate your message effectively, reinforce your brand identity, and drive audience interaction and engagement.`, 
          imageUrl: `/postdesign.webp` 
      },
      { 
          title: `Video Editing`, 
          slug: `video-editing`,
          description: `Transform your raw footage into a polished, compelling story with our professional video editing services. We handle everything from cutting and sequencing to color grading, sound design, and adding motion graphics. Whether it is for social media, corporate presentations, or ad campaigns, our editors craft a final product that is dynamic, professional, and perfectly paced to keep your viewers hooked.`, 
          imageUrl: `/videoediting.webp` 
      },
      { 
          title: `Billboards`, 
          slug: `billboards`,
          description: `Make a big impact with larger-than-life billboard designs. We understand the unique challenges of out-of-home advertising, creating bold, clear, and memorable visuals that can be understood in a matter of seconds. Our designs focus on high-contrast imagery and concise messaging to ensure your brand stands out and captures the attention of commuters and pedestrians alike.`, 
          imageUrl: `/billboards.webp` 
      },
      { 
          title: `TV Commercials`, 
          slug: `tv-commercials`,
          description: `We conceptualize and produce broadcast-quality TV commercials that tell a compelling story and drive action. From the initial storyboard and scriptwriting to filming, editing, and post-production, we manage the entire creative process. Our team creates visually impressive commercials that adhere to broadcast standards and are designed to resonate with a wide audience, building brand awareness.`, 
          imageUrl: `/tvc.webp` 
      },
      { 
          title: `Ads Design`, 
          slug: `ads-design`,
          description: `Capture clicks and drive conversions with professionally designed digital ads for platforms like Google, Facebook, and Instagram. Our designs are optimized for each platforms specifications and are A/B tested to maximize performance. We focus on creating visually appealing ads with clear calls-to-action that grab attention and persuade your target audience to engage.`, 
          imageUrl: `/adsdesigns.webp` 
      },
      { 
          title: `Content Calendar`, 
          slug: `content-calendar`,
          description: `Stay organized and consistent with a strategic content calendar. We plan, schedule, and manage your content across all channels, ensuring a steady stream of relevant and timely posts. Our calendars are built around key marketing objectives, seasonal trends, and audience engagement patterns, taking the guesswork out of your content strategy and helping you build a cohesive and impactful online presence.`, 
          imageUrl: `/contentcalender.webp` 
      },
  ]
};

export const metadata: Metadata = {
  title: `Graphic Design Services | Branding, Logos & Creative Visuals | Black Zero`,
  description: `Transform your brand identity with Black Zeros graphic design services. We offer logo design, social media visuals, video editing, and complete branding packages.`,
  keywords: [`graphic design`, `logo design`, `branding`, `social media graphics`, `video editing`, `creative visuals`, `ad design`],
  alternates: {
    canonical: `/services/graphic-designing`,
  },
  openGraph: {
    title: `Graphic Design Services | Branding, Logos & Creative Visuals | Black Zero`,
    description: `Transform your brand identity with Black Zeros graphic design services. We offer logo design, social media visuals, video editing, and complete branding packages.`,
    url: `/services/graphic-designing`,
    siteName: `Black Zero`,
    locale: `en_US`,
    type: `website`,
    images: [{ url: `/graphic designing.webp`, alt: `Graphic design workspace displaying logos, color palettes, and brand identity assets` }],
  },
};

export default function GraphicDesigningPage() {
  return <ServiceClientView service={graphicData} />;
}