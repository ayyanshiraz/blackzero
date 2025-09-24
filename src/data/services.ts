// src/data/services.ts

import { Megaphone, BarChartBig, Film, TerminalSquare, Palette, Camera, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// --- Type definition for sub-sections ---
export interface SubSection {
    title: string;
    slug?: string;
    description: string;
    imageUrl: string;
}

// --- Type definition for a single service ---
export interface Service {
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    subSections: SubSection[];
}

// --- All Services Data ---
export const servicesData: Service[] = [
    { 
        title: "Marketing", 
        slug: "marketing",
        icon: Megaphone,
        imageUrl: "/brand-strategy.png",
        description: "We create data-driven strategies that build brand awareness, drive traffic, and generate leads to elevate your digital footprint.",
        subSections: [
            {
                title: "Digital Marketing",
                slug: "digital-marketing",
                description: "We leverage a multi-channel approach to build a powerful online presence that drives targeted traffic and generates high-quality leads for your business. Our strategies integrate Search Engine Optimization (SEO) to capture organic interest, Pay-Per-Click (PPC) advertising for immediate visibility, and content marketing to build authority and engage your audience. We create a synergistic effect where each channel supports the others, ensuring a holistic and powerful digital machine that works tirelessly to grow your brand and deliver a measurable return on investment.",
                imageUrl: "/digitalmarketing.png"
            },
            {
                title: "Traditional Marketing",
                description: "Beyond the digital realm, we create impactful traditional marketing campaigns that connect your brand with a broader audience. From compelling print advertisements in targeted publications to strategic media buying for radio and television spots, we understand the power of tangible media. We ensure your message is consistent and resonant across all platforms, reaching key demographics through time-tested channels that build mainstream brand recognition and trust in a world that still values offline engagement and high-impact physical advertising.",
                imageUrl: "/traditional marketing.png"
            },
            {
                title: "PR Campaigns",
                description: "Shape public perception and build lasting trust with our strategic Public Relations campaigns. Our process begins with crafting a compelling brand narrative that resonates with your target audience and the media. We manage all aspects of media relations, from writing and distributing impactful press releases to securing positive press coverage in key outlets. By building strong relationships with journalists and influencers, we protect and enhance your brand's reputation, positioning you as a thought leader in your industry and effectively managing your public story.",
                imageUrl: "/pr-campaigns.png"
            },
            {
                title: "Design and Branding",
                description: "A strong brand is unforgettable, and consistency is key to recognition. We create a complete visual identity specifically for your marketing efforts, ensuring every touchpoint is cohesive and powerful. This includes designing stunning campaign visuals, high-converting ad creatives for digital platforms, and professionally crafted branded materials for both online and offline use. Our work ensures that your brand not only looks its best but also communicates its core message effectively, building a strong, recognizable identity that stands out from the competition.",
                imageUrl: "/designandbranding.png"
            }
        ] 
    },
    { 
        title: "Business Analytics", 
        slug: "business-analytics",
        icon: BarChartBig,
        imageUrl: "/business-analytics.png",
        description: "Unlock the power of your data. We provide comprehensive analytics to help you make informed decisions for sustainable growth.",
        subSections: [
            {
                title: "Dashboard Building",
                description: "We transform raw data into interactive, real-time dashboards using platforms like Power BI and Tableau. These tools provide a clear, at-a-glance view of your most important Key Performance Indicators (KPIs), empowering stakeholders to monitor performance, identify trends, and make data-driven decisions without needing to sift through complex spreadsheets.",
                imageUrl: "/dashboard-building.png"
            },
            {
                title: "Automations",
                description: "Eliminate manual, repetitive tasks and reduce the risk of human error with our custom automation solutions. We develop robust scripts and workflows to automate data extraction, report generation, and system integrations, freeing up your team to focus on high-value strategic work. This increases efficiency, ensures consistency, and accelerates your business processes.",
                imageUrl: "/automation.png"
            },
            {
                title: "Excel / Sheetbots",
                description: "We harness the full power of spreadsheets to create sophisticated business tools. This includes advanced financial modeling and forecasting in Excel, custom VBA macros for complex tasks, and the development of Google Sheet 'bots' that can automate data entry, send notifications, and integrate seamlessly with other G-Suite applications to streamline your daily operations.",
                imageUrl: "/excelsheetbots.png"
            },
            {
                title: "Big Data Handling",
                description: "When your data grows too large for traditional tools, we step in. We utilize powerful Big Data technologies like Apache Spark and Hadoop, along with scalable cloud platforms such as AWS and Azure, to process, store, and analyze massive datasets. We build data pipelines that can handle terabytes of information, enabling you to uncover insights from large-scale user behavior, market trends, and operational logs.",
                imageUrl: "/big data handling.png"
            },
            {
                title: "Software Development Life Cycle",
                description: "Data is a critical component of modern software development. We integrate analytics into every stage of the SDLC, from using user data to inform feature prioritization during the planning phase, to implementing A/B testing for new features, and setting up comprehensive performance monitoring and user behavior tracking post-launch. This data-centric approach ensures you build products that users actually want and need.",
                imageUrl: "/sdlc.png"
            },
            {
                title: "Explainable Artificial Intelligence (XAI)",
                description: "We build transparent AI and Machine Learning models that you can trust. Instead of relying on 'black box' solutions, our XAI approach focuses on creating models whose decisions are interpretable and easily understood by humans. This is crucial for ensuring fairness, accountability, and regulatory compliance, allowing you to deploy AI with confidence, knowing you can explain *why* a model made a particular decision.",
                imageUrl: "/xai.png"
            },
            {
                title: "Database Systems",
                description: "Your data is only as good as the system that stores it. We design, manage, and query both relational (SQL) and NoSQL databases to ensure optimal performance, data integrity, and security. We build efficient data schemas and write optimized queries to guarantee that your analytics tools and applications can access the information they need quickly and reliably.",
                imageUrl: "/database system.png"
            },
            {
                title: "Python Programming",
                description: "We leverage the power and versatility of Python for sophisticated data analysis. Using industry-standard libraries like Pandas, NumPy, and Matplotlib, we perform complex data manipulation, statistical analysis, and visualization. For predictive tasks, we utilize Scikit-learn and TensorFlow to build and train powerful machine learning models, creating custom analytics tools tailored to your specific business challenges.",
                imageUrl: "/python.png"
            },
            {
                title: "Research Analysis",
                description: "Go beyond raw data with our rigorous research analysis services. We design and conduct thorough market and user research initiatives, including surveys and focus groups. By applying advanced statistical methods to the collected data, we distill complex findings into clear, actionable insights that can confidently inform your product development, marketing strategy, and overall business direction.",
                imageUrl: "/research-analysis.png"
            },
            {
                title: "Econometrics",
                description: "We apply rigorous statistical and mathematical models to economic data to provide a quantitative edge to your business strategy. Our econometric analysis helps you forecast future market trends, understand complex consumer behavior, and scientifically assess the causal impact of your pricing strategies, marketing campaigns, and other key business decisions, moving from correlation to causation.",
                imageUrl: "/econometrics.png"
            },
            {
                title: "Advance Data Analysis",
                description: "We go deeper than standard reporting to uncover the hidden patterns in your data. Using sophisticated techniques like predictive modeling, customer segmentation with clustering algorithms, and multi-variable regression analysis, we can forecast future outcomes, identify your most valuable customer groups, and understand the key drivers of your business success with a high degree of statistical confidence.",
                imageUrl: "/advance data analysis.png"
            },
            {
                title: "Decision Making For Businesses",
                description: "Data is useless without action. Our ultimate goal is to translate complex analytical insights into clear, concise, and strategic recommendations that guide executive decision-making. We bridge the gap between data and action, providing you with the clarity needed to optimize operations, identify new market opportunities, and drive tangible business results based on evidence, not just intuition.",
                imageUrl: "/decision making for businesses.png"
            },
            {
                title: "Machine Learning Models",
                description: "We develop and deploy custom machine learning models to solve your most pressing business problems. Our expertise includes creating models for customer churn prediction, real-time fraud detection, personalized recommendation engines, and sales forecasting. We handle the entire lifecycle, from data preprocessing and feature engineering to model training, validation, and deployment into your production environment.",
                imageUrl: "/machinelearningmodal.png"
            },
            {
                title: "Business Consultancy",
                description: "This service ties all our analytical capabilities together. We act as your strategic partner, using our deep data expertise to provide high-level business consultancy. We help you diagnose complex challenges, identify untapped opportunities for growth, and develop a comprehensive, data-backed strategy to achieve your long-term objectives and gain a sustainable competitive advantage in your market.",
                imageUrl: "/business consultancy.png"
            }
        ]
    },
    { 
        title: "Animation", 
        slug: "animation",
        icon: Film,
        imageUrl: "/animation.png",
        description: "Bring your brand to life with stunning 2D and 3D animations, from explainer videos to engaging social media content.",
        subSections: [
            {
                title: "2D Animation",
                description: "We bring stories and brands to life through classic 2D animation. This versatile medium is perfect for creating engaging explainer videos, memorable character animations, and dynamic motion graphics. Our process combines traditional animation principles with modern digital tools to produce fluid, expressive, and visually compelling content that captures attention and communicates your message with charm and clarity.",
                imageUrl: "/2danimation.png"
            },
            {
                title: "3D Animation",
                description: "Step into a world of depth and realism with our high-fidelity 3D animation services. We create stunning product visualizations, architectural walkthroughs, and complex simulations that are impossible to capture with a camera. Our 3D artists use industry-leading software to model, texture, light, and animate objects and characters, delivering cinematic quality that adds a layer of sophistication and impact to your projects.",
                imageUrl: "/3danimation.png"
            },
            {
                title: "Scroll Stopper",
                description: "In a world of endless scrolling, we create 'Scroll Stopper' animations designed to instantly grab attention on social media feeds. These are short, looping, and visually surprising animations that break the pattern and compel users to pause. They are the perfect tool for increasing engagement, boosting brand recall, and making your social media presence unforgettable.",
                imageUrl: "/scrollstopper.png"
            },
            {
                title: "Explanatory Videos",
                description: "Simplify complex ideas and explain your product or service with clarity through custom explanatory videos. We combine sharp scripting, professional voice-overs, and engaging animations to break down information into easily digestible content. An explainer video is a powerful sales and marketing tool that can increase conversion rates on your website and clarify your value proposition in under 90 seconds.",
                imageUrl: "/explanatoryvideos.png"
            },
            {
                title: "Animes",
                description: "Harness the powerful and expressive art style of Japanese anime to tell unique stories. Whether you need a short animated sequence for an ad campaign or a full-fledged narrative piece, our artists are skilled in the iconic anime aesthetic. We can create dynamic action scenes and emotional character-driven stories that resonate with a global audience.",
                imageUrl: "/animes.png"
            },
            {
                title: "Metaverse Characters",
                description: "Establish your presence in the metaverse with custom 3D characters and avatars. We design, model, and rig characters optimized for virtual reality (VR), augmented reality (AR), and other metaverse platforms. From brand mascots to personalized user avatars, we create digital identities that are ready for the next generation of online interaction.",
                imageUrl: "/metaverse.png"
            }
        ]
    },
    { 
        title: "Development", 
        slug: "development",
        icon: TerminalSquare,
        imageUrl: "/development.png",
        description: "Our team builds robust, scalable, and user-friendly websites and applications using modern frameworks and technologies.",
        subSections: [
            {
                title: "Web Development",
                description: "We build custom, high-performance websites and web applications from the ground up. Using modern technologies like React, Next.js, and Node.js, we create scalable, secure, and responsive digital experiences that are perfectly tailored to your business needs. From dynamic corporate sites to complex SaaS platforms, our focus is on clean code, seamless functionality, and an exceptional user experience that drives results.",
                imageUrl: "/web.png"
            },
            {
                title: "App Development",
                description: "Engage your users on the go with a native or cross-platform mobile application. We specialize in developing intuitive and powerful apps for both iOS and Android. Our development process covers the full lifecycle, from initial strategy and design to development, testing, and deployment on the App Store and Google Play. We build apps that are not only feature-rich but also fast, reliable, and a joy for your customers to use.",
                imageUrl: "/app.png"
            },
            {
                title: "Wordpress / Shopify",
                description: "Get to market quickly with a powerful and flexible website built on industry-leading platforms. We offer expert development for both WordPress and Shopify, from custom theme creation and plugin development to full e-commerce store setups. We tailor these platforms to your specific requirements, providing you with a robust, easy-to-manage website that allows you to control your content and grow your business efficiently.",
                imageUrl: "/wordpress.png"
            },
            {
                title: "UI / UX",
                description: "Great development is built on a foundation of exceptional design. Our UI/UX service focuses on creating user-centric interfaces that are both beautiful and highly functional. We conduct user research, create wireframes and interactive prototypes, and perform usability testing to ensure your digital product is intuitive and easy to navigate. This focus on the user experience leads to higher engagement, better conversion rates, and increased customer loyalty.",
                imageUrl: "/uiux.png"
            }
        ]
    },
    { 
        title: "Graphic Designing", 
        slug: "graphic-designing",
        icon: Palette,
        imageUrl: "/graphic designing.png",
        description: "From logos to complete branding packages, we create a cohesive and memorable brand image through stunning visuals.",
        subSections: [
            {
                title: "Post Designing",
                description: "We design visually stunning and highly engaging posts for all your social media platforms. From Instagram carousels to LinkedIn infographics, our designs are tailored to each platform's unique audience and specifications. We focus on creating scroll-stopping visuals that communicate your message effectively, reinforce your brand identity, and drive audience interaction and engagement.",
                imageUrl: "/postdesign.png"
            },
            {
                title: "Video Editing",
                description: "Transform your raw footage into a polished, compelling story with our professional video editing services. We handle everything from cutting and sequencing to color grading, sound design, and adding motion graphics. Whether it's for social media, corporate presentations, or ad campaigns, our editors craft a final product that is dynamic, professional, and perfectly paced to keep your viewers hooked.",
                imageUrl: "/videoediting.png"
            },
            {
                title: "Billboards",
                description: "Make a big impact with larger-than-life billboard designs. We understand the unique challenges of out-of-home advertising, creating bold, clear, and memorable visuals that can be understood in a matter of seconds. Our designs focus on high-contrast imagery and concise messaging to ensure your brand stands out and captures the attention of commuters and pedestrians alike.",
                imageUrl: "/billboards.png"
            },
            {
                title: "TV Commercials",
                description: "We conceptualize and produce broadcast-quality TV commercials that tell a compelling story and drive action. From the initial storyboard and scriptwriting to filming, editing, and post-production, we manage the entire creative process. Our team creates visually impressive commercials that adhere to broadcast standards and are designed to resonate with a wide audience, building brand awareness.",
                imageUrl: "/tvc.png"
            },
            {
                title: "Ads Design",
                description: "Capture clicks and drive conversions with professionally designed digital ads for platforms like Google, Facebook, and Instagram. Our designs are optimized for each platform's specifications and are A/B tested to maximize performance. We focus on creating visually appealing ads with clear calls-to-action that grab attention and persuade your target audience to engage.",
                imageUrl: "/adsdesigns.png"
            },
            {
                title: "AI Content",
                description: "Leverage the power of artificial intelligence to scale your content creation. We use cutting-edge AI tools to assist in generating creative concepts, writing copy, and even producing unique visual assets. This allows us to produce high volumes of targeted content efficiently, while our human designers provide the crucial final touch of creativity, strategy, and brand alignment.",
                imageUrl: "/ai content.png"
            },
            {
                title: "Content Calendar",
                description: "Stay organized and consistent with a strategic content calendar. We plan, schedule, and manage your content across all channels, ensuring a steady stream of relevant and timely posts. Our calendars are built around key marketing objectives, seasonal trends, and audience engagement patterns, taking the guesswork out of your content strategy and helping you build a cohesive and impactful online presence.",
                imageUrl: "/contentcalender.png"
            }
        ]
    },
    { 
        title: "Photography / Videography", 
        slug: "photo-video",
        icon: Camera,
        imageUrl: "/photo-video.png",
        description: "High-quality visuals are essential. We capture your products, team, and story in the best light for all your marketing channels.",
        subSections: [
            {
                title: "Product Shoot",
                description: "We create clean, crisp, and compelling images of your products that drive sales. Whether you need minimalist e-commerce shots on a pure white background or dynamic lifestyle photos that show your product in action, our team handles the entire process. We focus on expert lighting, precise staging, and professional retouching to ensure your inventory looks its absolute best and stands out in a crowded marketplace.",
                imageUrl: "/productshoot.png"
            },
            {
                title: "Article Shoot",
                description: "Enhance your articles, blog posts, and editorial content with custom, high-quality photography that tells a story. We collaborate with you to create a series of images that perfectly complement your narrative, whether it's for a feature story, an interview, or a case study. Our editorial style focuses on capturing authentic moments and creating a strong visual theme that elevates your written content and engages your readers.",
                imageUrl: "/articleshoot.png"
            },
            {
                title: "Portfolio Shoot",
                description: "Build a professional portfolio that showcases your talent and opens doors to new opportunities. We specialize in creating high-end portfolio shoots for models, artists, designers, and other creative professionals. We work closely with you to understand your personal brand and career goals, directing a shoot that captures your unique style and produces a stunning collection of images for your website, social media, and professional submissions.",
                imageUrl: "/portfolioshoot.png"
            },
            {
                title: "Business Opening Ceremony",
                description: "Capture the excitement and key moments of your grand opening with our professional event photography and videography. We document every aspect of your business opening ceremony, from the ribbon-cutting and guest speakers to candid interactions and the overall atmosphere. Our team works discreetly to create a comprehensive visual record of your milestone event, providing you with a powerful set of assets for press releases, social media, and future marketing.",
                imageUrl: "/boc.png"
            }
        ]
    },
];