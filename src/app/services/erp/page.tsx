import { Metadata } from 'next';
import ServiceClientView from '@/components/ServiceClientView';

const erpData = {
  title: `Enterprise Resource Planning (ERP)`,
  slug: `erp`,
  imageUrl: `/erp.webp`,
  description: `Streamline your business operations with our comprehensive ERP systems. Enhance efficiency, automate processes, and unify your data across all departments for smarter decision making.`,
  subSections: [
    {
      title: `Finance and Accounting`,
      slug: `finance-accounting`,
      description: `Automate financial processes, manage cash flow, and gain real time visibility into your financial performance with our secure ERP modules.`,
      imageUrl: `/fa.webp`
    },
    {
      title: `Supply Chain Management`,
      slug: `supply-chain`,
      description: `Optimize your supply chain from procurement to delivery. Track inventory levels, manage vendor relationships, and ensure timely order fulfillment.`,
      imageUrl: `/scm.webp`
    },
    {
      title: `Human Resources (HRMS)`,
      slug: `human-resources`,
      description: `Empower your workforce with comprehensive HR solutions. Manage payroll, employee records, attendance, and performance evaluations all in one centralized system.`,
      imageUrl: `/hr.webp`
    },
    {
      title: `Inventory and Order Management`,
      slug: `inventory-management`,
      description: `Maintain optimal stock levels, automate reordering, and track order life cycles seamlessly from creation to final delivery.`,
      imageUrl: `/iom.webp`
    }
  ]
};

export const metadata: Metadata = {
  title: `Enterprise Resource Planning (ERP) Solutions | Black Zero`,
  description: `Streamline operations with Black Zero Enterprise Resource Planning (ERP) systems. Unify data, automate processes, and drive business growth.`,
  keywords: [`ERP systems`, `enterprise resource planning`, `business automation`, `finance ERP`, `HRMS`, `Black Zero ERP`],
  alternates: {
    canonical: `/services/erp`,
  },
  openGraph: {
    title: `Enterprise Resource Planning (ERP) Solutions | Black Zero`,
    description: `Streamline operations with Black Zero Enterprise Resource Planning (ERP) systems. Unify data, automate processes, and drive business growth.`,
    url: `/services/erp`,
    type: `website`,
    images: [
      {
        url: `/erp.webp`,
        width: 1200,
        height: 630,
        alt: `Black Zero ERP Solutions`,
      },
    ],
  },
};

export default function ErpServicePage() {
  return <ServiceClientView service={erpData} />;
}