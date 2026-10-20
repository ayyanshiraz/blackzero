import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const crmData = {
  title: `Customer Relationship Management (CRM)`,
  slug: `crm`,
  imageUrl: `/crm.webp`,
  description: `Build stronger relationships and drive sales growth with our advanced CRM solutions. Manage interactions, track leads, and optimize your customer journey seamlessly.`,
  subSections: [
    {
      title: `Sales Pipeline Automation`,
      slug: `sales-automation`,
      description: `Track leads, automate follow ups, and monitor your entire sales funnel in real time to close deals faster and more efficiently.`,
      imageUrl: `/sa.webp`
    },
    {
      title: `Customer Support and Ticketing`,
      slug: `customer-support`,
      description: `Provide exceptional service with integrated ticketing systems, unified communication channels, and automated query routing.`,
      imageUrl: `/cst.webp`
    },
    {
      title: `Marketing Automation`,
      slug: `marketing-automation`,
      description: `Create targeted campaigns, manage email workflows, and segment your audience to deliver personalized experiences at scale.`,
      imageUrl: `/ma.webp`
    },
    {
      title: `Analytics and Insights`,
      slug: `crm-analytics`,
      description: `Make data driven decisions with customizable dashboards detailing customer behavior, sales agent performance, and revenue forecasting.`,
      imageUrl: `/aii.webp`
    }
  ]
};

export const metadata: Metadata = {
  title: `Customer Relationship Management (CRM) | Black Zero`,
  description: `Optimize your customer journey and drive sales growth with Black Zero advanced CRM solutions. Manage interactions, track leads, and build lasting relationships.`,
  keywords: [`CRM solutions`, `customer relationship management`, `sales automation`, `support ticketing`, `Black Zero CRM`],
  alternates: {
    canonical: `/services/crm`,
  },
  openGraph: {
    title: `Customer Relationship Management (CRM) | Black Zero`,
    description: `Optimize your customer journey and drive sales growth with Black Zero advanced CRM solutions. Manage interactions, track leads, and build lasting relationships.`,
    url: `/services/crm`,
    type: `website`,
    images: [
      {
        url: `/crm.webp`,
        width: 1200,
        height: 630,
        alt: `Black Zero CRM Solutions`,
      },
    ],
  },
};

export default function CrmServicePage() {
  return <ServiceClientView service={crmData} />;
}