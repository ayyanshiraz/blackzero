import { Metadata } from "next";
import ServiceClientView from "@/components/ServiceClientView";

const creativeDesignData = {
  title: "Creative Design and Animation Studio",
  slug: "creative-design-and-animation-studio",
  imageUrl: "/animation.webp",
  imgAltText: "3D character rigging, motion graphics, and commercial animation studio workflow by Black Zero Technologies",
  description:
    "Transform complex product narratives into high-converting visual assets. Our creative studio engineers 2D and 3D animations, B2B SaaS explainer videos, interactive WebGL assets, and commercial video production for US brands.",
  subSections: [
    {
      title: "Bringing Ideas to Life in 2D and 3D",
      slug: "ideas-2d-3d",
      description:
        "Static graphics rarely hold executive or consumer attention in crowded digital feeds. Our studio bridges the gap between early concept sketches and production-ready 2D and 3D animation for commercial brands that need their message understood immediately.\n\nFrom storyboarding and styleframes to custom character rigging and physically based rendering (PBR), our animators control every stage of the pipeline. Whether visualizing an abstract software architecture or launching a physical hardware product, we deliver frame-accurate motion assets ready for web, broadcast, and paid social.",
      imageUrl: "/bit.webp",
      imgAltText: "2D and 3D animation production pipeline from concept storyboard to final 3D render",
    },
    {
      title: "Creative Designs and Stunning Animations",
      slug: "creative-designs-animations",
      description:
        "Cohesive visual design shapes how buyers perceive your product quality before they ever book a demo. We pair senior art direction with technical motion design to build brand systems, interactive web visuals, and launch trailers that stand out across high-competition markets.\n\nEvery engagement begins with a deep audit of your brand positioning and target buyer psychology. We translate complex value propositions into clean visual sequences, pairing balanced typography, custom illustration, and fluid pacing that elevate your digital presence.",
      imageUrl: "/cda.webp",
      imgAltText: "High-end commercial creative design and motion graphics sequence for brand launch",
    },
    {
      title: "From Graphics to Motion We Create It All",
      slug: "graphics-to-motion",
      description:
        "Managing separate agencies for static design, UI/UX assets, and motion graphics leads to fractured brand identity and slow turnaround times. Our studio operates as an all-in-one visual production partner—taking raw concepts from vector design and UI/UX layouts all the way to animated micro-interactions and 3D web elements.\n\nWe optimize every asset for its final delivery environment, whether that means lightweight Lottie JSON animations for mobile apps, compressed WebM loops for Next.js landing pages, or 4K master files for keynote presentations.",
      imageUrl: "/fgt1.webp",
      imgAltText: "Vector graphic design transitioning into animated UI/UX micro-interactions and 3D web assets",
    },
    {
      title: "Visual Stories, Perfectly Animated",
      slug: "visual-stories",
      description:
        "Great animation relies on deliberate pacing, narrative tension, and clear visual hierarchy. We turn dense corporate messaging into structured visual stories where every camera movement, transition, and sound-design cue guides the viewer toward your call to action.\n\nOur creative directors work closely with your marketing and product leads during US business hours to script, voice-cast, and animate stories that resonate with real buyers. You get narrative-driven creative assets built to increase landing page dwell time and ad recall.",
      imageUrl: "/visual-stories.webp",
      imgAltText: "Narrative storyboarding and timed motion graphics timeline for commercial brand storytelling",
    },
    {
      title: "2D Animation",
      slug: "2d-animation",
      description:
        "Clean 2D motion graphics remain one of the most effective ways to distil abstract services, financial workflows, and software features into clear takeaways. Using industry-standard 2D animation software, our illustrators and motion designers craft custom vector rigs, kinetic typography, and isometric workflow animations.\n\nEvery project is illustrated from scratch—never recycled from generic stock templates—so your characters, icons, and color palettes remain 100% exclusive to your brand. We deliver crisp, lightweight animations tailored for onboarding flows, social campaigns, and investor decks.",
      imageUrl: "/2danimation.webp",
      imgAltText: "Custom 2D vector animation and isometric motion graphics illustrating software workflows",
    },
    {
      title: "3D Animation",
      slug: "3d-animation",
      description:
        "Showcasing industrial hardware, medical devices, architectural layouts, or enterprise tech requires depth and photorealistic precision. As a specialized 3D animation studio, we handle hard-surface modeling, CAD file conversion, fluid and particle simulations, and studio-grade lighting.\n\nOur 3D artists reveal internal product mechanics through exploded-view renders and x-ray cutaways that traditional cameras could never capture. Each sequence is rendered for maximum visual clarity across trade show displays, product pages, and digital ad placements.",
      imageUrl: "/3danimation.webp",
      imgAltText: "Photorealistic 3D product animation and exploded-view CAD rendering",
    },
    {
      title: "Scroll Stoppers",
      slug: "scroll-stoppers",
      description:
        "You have less than two seconds to halt a prospect scrolling through a busy LinkedIn, Meta, or TikTok feed. We engineer high-contrast visual hooks and scroll-stopping motion loops specifically designed to win the first three seconds of viewer attention.\n\nBy combining bold kinetic headlines, unexpected 3D visual reveals, and rapid pattern-interrupt pacing, our creative team turns passive impressions into active clicks. Every creative batch includes multiple hook variations so your media buyers can A/B test what drives the lowest cost per click.",
      imageUrl: "/scrollstopper.webp",
      imgAltText: "High-impact 3D scroll-stopper video hook designed for paid social media ad campaigns",
    },
    {
      title: "Explanatory Videos",
      slug: "explanatory-videos",
      description:
        "When buyers cannot understand how your platform works within 90 seconds, they bounce to a competitor. We specialize in B2B explainer video production in the USA, turning complex SaaS architectures, fintech workflows, and enterprise services into concise, persuasive walkthroughs.\n\nOur team manages the entire production cycle: conversion scripting, professional American voiceover casting, custom UI screen animations, and sound mixing. Sales and marketing teams use our tech product demo videos on homepage heroes and outbound email sequences to shorten sales cycles.",
      imageUrl: "/explanatoryvideos.webp",
      imgAltText: "B2B SaaS explainer video and tech product demo animation showing software UI features",
    },
    {
      title: "Animes",
      slug: "animes",
      description:
        "Distinctive stylized animation gives gaming studios, entertainment brands, and bold consumer companies an unforgettable cultural edge. Operating as a custom anime character design agency and commercial anime production studio, we blend traditional hand-drawn keyframing with modern digital compositing.\n\nFrom expressive character sheets and dynamic action sequences to atmospheric background painting, our artists deliver authentic cel-shaded commercials, lore trailers, and brand mascots that build fierce community loyalty.",
      imageUrl: "/animes.webp",
      imgAltText: "Custom commercial anime character design and hand-drawn cel-shaded animation frame",
    },
    {
      title: "Metaverse Characters",
      slug: "metaverse-characters",
      description:
        "Interactive 3D environments, virtual training simulations, and Web3 experiences require optimized, expressive digital humans. We sculpt, texture, and rig custom 3D avatars and virtual brand ambassadors engineered for Unreal Engine, Unity, WebGL, and real-time spatial platforms.\n\nOur character technical directors enforce clean polygon topology, facial blendshapes for live motion-capture tracking, and full skeletal rigging—ensuring your virtual avatars perform smoothly across VR headsets, browser portals, and interactive livestreams.",
      imageUrl: "/metaverse.webp",
      imgAltText: "Rigged 3D virtual avatar and digital twin model built for Unreal Engine and WebGL",
    },
    {
      title: "Photography and Videography",
      slug: "photo-video",
      description:
        "Authentic live-action footage anchors brand credibility alongside digital motion graphics. As a commercial video production agency, we direct and edit high-definition corporate interviews, customer case study documentaries, product commercials, and executive photography.\n\nOur post-production editors handle multi-cam cutting, studio color grading, motion-tracked callouts, and broadcast audio mastering—turning raw footage into polished visual assets ready for your website, investor presentations, and national ad campaigns.",
      imageUrl: "/photo-video.webp",
      imgAltText: "Commercial video production set with cinema camera lighting and color grading monitor",
    },
  ],
};

export const metadata: Metadata = {
  title: "3D Animation, B2B Explainer Videos & Motion Studio USA | Black Zero",
  description:
    "Elevate your brand with Black Zero Technologies. Custom 2D/3D animation, B2B SaaS explainer videos, scroll-stopping ad creatives, and commercial video production.",
  keywords: [
    "3D animation studio USA",
    "B2B explainer video production USA",
    "tech product demo videos",
    "custom motion graphics agency",
    "2D animation services",
    "scroll stopping video ads",
    "commercial anime production company",
    "custom 3D avatar modeling",
    "commercial video production agency",
  ],
  alternates: {
    canonical: "https://www.blackzero.org/services/creative-design-and-animation-studio",
  },
  openGraph: {
    title: "3D Animation, B2B Explainer Videos & Motion Studio USA | Black Zero Technologies",
    description:
      "Custom 2D and 3D animation, B2B SaaS explainer videos, interactive 3D avatars, and high-converting motion graphics engineered for US brands.",
    url: "https://www.blackzero.org/services/creative-design-and-animation-studio",
    siteName: "Black Zero Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.blackzero.org/animation.webp",
        width: 1200,
        height: 630,
        alt: "3D character rigging, motion graphics, and commercial animation studio workflow by Black Zero Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Animation, B2B Explainer Videos & Motion Studio USA | Black Zero Technologies",
    description:
      "Turn complex ideas into high-converting 2D/3D animations, B2B product demos, and scroll-stopping video creatives.",
    images: ["https://www.blackzero.org/animation.webp"],
  },
};

export default function CreativeDesignPage() {
  // Structured data for 2D/3D Animation and Creative Production Studio
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Creative Design, 2D/3D Animation, and B2B Explainer Video Studio",
    serviceType: "3D Animation, Motion Graphics, and Commercial Video Production",
    provider: {
      "@type": "Organization",
      name: "Black Zero Technologies",
      url: "https://www.blackzero.org",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "Custom 2D and 3D animation, B2B SaaS explainer videos, scroll-stopping social ad creatives, commercial anime production, 3D avatar rigging, and video production for US businesses.",
    url: "https://www.blackzero.org/services/creative-design-and-animation-studio",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Animation and Creative Studio Capabilities",
      itemListElement: creativeDesignData.subSections.map((sub, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: sub.title,
          description: sub.description.replace(/\n+/g, " "),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceClientView service={creativeDesignData} />
    </>
  );
}