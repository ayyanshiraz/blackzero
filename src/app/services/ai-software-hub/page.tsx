import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const aiSoftwareData = { 
  title: `AI and Software Hub`, 
  slug: `ai-software-hub`,
  imageUrl: `/development.webp`,
  imgAltText: `AI and Software Hub providing complete ERP solutions`,
  description: `Building Intelligent Systems for Tomorrow. AI-Powered Software, Built for Growth. From Idea to Intelligent Execution. Custom Software. Smarter Results. Providing complete ERP solutions and individual systems.`,
  subSections: [
      { 
          title: `Custom Software Development`, 
          slug: `custom-software-development`,
          description: `Delivering scalable and tailored applications designed for specific business requirements. This covers the entire lifecycle from the initial idea to intelligent execution.`, 
          imageUrl: `/csd.webp` 
      },
      { 
          title: `Artificial Intelligence Solutions`, 
          slug: `artificial-intelligence-solutions`,
          description: `Building AI powered software to drive business growth. This includes machine learning models, predictive analytics, and smart automation to generate smarter results.`, 
          imageUrl: `/cei.webp` 
      },
      { 
          title: `Comprehensive ERP Implementation`, 
          slug: `erp-implementation`,
          description: `Designing and deploying complete Enterprise Resource Planning systems to streamline operations and centralize data across all departments.`, 
          imageUrl: `/ais.webp` 
      },
      { 
          title: `Individual Module Integration`, 
          slug: `module-integration`,
          description: `Developing specialized standalone software modules that connect smoothly with your existing technological framework to solve specific operational challenges.`, 
          imageUrl: `/imi.webp` 
      },
      { 
          title: `Intelligent System Architecture`, 
          slug: `intelligent-system-architecture`,
          description: `Constructing robust and modern system foundations that prepare businesses for tomorrow and support long term scalability.`, 
          imageUrl: `/isa.webp` 
      },
      { 
          title: `Explainable Artificial Intelligence (XAI)`, 
          slug: `xai`, 
          description: `Gain complete confidence in your automated systems by understanding exactly how they make critical decisions. We build advanced interpretable machine learning solutions that remove the black-box confusion from your predictive models. Our approach ensures that each algorithm operates transparently, so that results can be tested against real-world logic. \n\nWe specialize in ethical AI framework development, enabling your organization to meet regulatory requirements and maintain public trust. Companies across the U.S. rely on our expertise to implement responsible, fair, and unbiased artificial intelligence. By visualizing the decision process, we empower stakeholders to identify potential risks before they impact operations. \n\nWe fully document every step of model training so there is a clear audit trail for compliance. Our team works closely with your data scientists to transform complex logic into understandable insights. This clarity gives business leaders the confidence to adopt AI technologies without hesitation or fear of unknown errors.`, 
          imageUrl: `/xai.webp` 
      },
      { 
          title: `Machine Learning Models`, 
          slug: `machine-learning-models`, 
          description: `We build intelligent algorithms that evolve with your data and solve your toughest business problems. Our team provides expert machine learning consulting services so you can automate complex tasks and predict future outcomes with high accuracy. If you need advanced pattern recognition, we offer specialized deep learning services that process images and natural language in the same way that the human brain does. \n\n Our engineers handle the entire lifecycle, from data preprocessing and training to final model deployment and monitoring. We implement continuous learning pipelines to ensure your algorithms remain accurate and effective over time and adapt to new information. Through neural networks, we uncover insights hidden in your data that traditional software cannot discover. We prioritize scalability so that your machine learning infrastructure can handle increasing loads without impacting performance. \n\nSecurity is our top priority, which is why we fortify our models against adversarial attacks and data breaches. Let us turn your raw data into a powerful asset that drives intelligent decisions for your organization. Experience the competitive advantage that comes with a system that learns and improves every day.`, 
          imageUrl: `/machinelearningmodal.webp` 
      },
      { 
          title: `AI Content`, 
          slug: `ai-content`,
          description: `Leverage the power of artificial intelligence to scale your content creation. We use cutting-edge AI tools to assist in generating creative concepts, writing copy, and even producing unique visual assets. This allows us to produce high volumes of targeted content efficiently, while our human designers provide the crucial final touch of creativity, strategy, and brand alignment.`, 
          imageUrl: `/ai content.webp` 
      }
  ]
};

export const metadata: Metadata = {
  title: `AI and Software Hub Services | Custom Systems and Development | Black Zero`,
  description: `Transform your business with our AI solutions, Custom Software Development, ERP Implementation, and Machine Learning services.`,
  keywords: [`AI solutions`, `custom software development`, `ERP implementation`, `machine learning`, `intelligent system architecture`],
  alternates: {
    canonical: `/services/ai-software-hub`,
  },
  openGraph: {
    title: `AI and Software Hub Services | Custom Systems and Development | Black Zero`,
    description: `Transform your business with our AI solutions, Custom Software Development, ERP Implementation, and Machine Learning services.`,
    url: `/services/ai-software-hub`,
    siteName: `Black Zero`,
    locale: `en_US`,
    type: `website`,
    images: [{ url: `/development.webp`, alt: `AI and Software Hub providing complete ERP solutions` }],
  },
};

export default function AiSoftwareHubPage() {
  return <ServiceClientView service={aiSoftwareData} />;
}