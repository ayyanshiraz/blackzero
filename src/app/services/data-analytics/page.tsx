import { Metadata } from "next";
import ServiceClientView from "@/components/ServiceClientView";

const dataAnalyticsData = {
  title: "Data Analytics",
  slug: "data-analytics",
  imageUrl: "/business-analytics.webp",
  imgAltText: "Enterprise data analytics dashboard displaying real-time KPIs and predictive growth trends",
  description:
    "Transform fragmented corporate data into real-time operational intelligence. Partner with our data engineering and analytics consultants to architect cloud data warehouses, executive BI dashboards, and predictive revenue models.",
  subSections: [
    {
      title: "Dashboard Building",
      slug: "dashboard-building",
      description:
        "Executive teams cannot make high-stakes decisions from static weekly spreadsheets. Through our data visualization consulting services, we engineer custom Power BI, Tableau, and React/Next.js executive command centers that unify financial, sales, and operational telemetry in real time.\n\nEvery dashboard is architected for sub-second query performance, granular role-based access control (RBAC), and intuitive drill-down filtering so non-technical stakeholders can isolate margin trends instantly. We collaborate directly with US operations leaders across EST and PST hours to map your core KPIs into a single source of truth.",
      imageUrl: "/dash.webp",
      imgAltText: "Custom executive BI dashboard showing real-time financial and operational KPIs",
    },
    {
      title: "Automations",
      slug: "automations",
      description:
        "Eliminate manual data entry bottlenecks and cross-departmental reporting delays with event-driven workflow automation. Our business process automation services connect your CRM, ERP, billing gateways, and warehouse databases through fault-tolerant Python and Node.js pipelines.\n\nBy replacing repetitive CSV reconciliations with automated webhook triggers and scheduled ETL jobs, we reduce human accounting errors and free your analysts to focus on high-value strategy. Every automated workflow includes dead-letter retry queues and real-time Slack or email anomaly alerts.",
      imageUrl: "/automation.webp",
      imgAltText: "Automated business process and ETL workflow connecting enterprise software systems",
    },
    {
      title: "Excel / Sheetbots",
      slug: "excel-sheetbots",
      description:
        "Finance and operations teams often rely on complex spreadsheet models that break under heavy transaction volumes. We engineer enterprise Excel automation scripts, VBA/Office Scripts, and Google Sheets API bots that synchronize live database records directly into your financial models without manual copy-pasting.\n\nOur Google Sheets and Excel automation consultants build bidirectional connectors that pull live ledger, inventory, and ad-spend metrics on automated schedules. Your team keeps the familiar spreadsheet interface while gaining database-grade validation, version control, and zero formula corruption.",
      imageUrl: "/excelsheetbots.webp",
      imgAltText: "Automated Excel and Google Sheets financial reporting bot synchronizing live database metrics",
    },
    {
      title: "Big Data Handling",
      slug: "big-data-handling",
      description:
        "Process millions of daily events without query timeouts or infrastructure bottlenecks. We design and migrate legacy databases to modern cloud data warehouse architectures on Snowflake, Google BigQuery, Amazon Redshift, and AWS RDS.\n\nOur data engineers implement partitioned schemas, automated ingestion pipelines, and strict encryption-at-rest protocols aligned with US enterprise compliance standards. Whether ingesting IoT telemetry, multi-channel e-commerce logs, or historical financial records, we ensure high availability and predictable cloud compute costs.",
      imageUrl: "/big data handling.webp",
      imgAltText: "Cloud data warehouse architecture processing high-volume enterprise big data streams",
    },
    {
      title: "Software Development Life Cycle",
      slug: "sdlc",
      description:
        "Data-intensive applications require disciplined engineering governance from initial schema design through production deployment. We implement an agile software development life cycle (SDLC) featuring automated CI/CD pipelines, containerization, and rigorous load testing.\n\nOur US-aligned engineering pods maintain transparent sprint velocity, comprehensive API documentation, and peer-reviewed code standards. By embedding quality assurance and security scanning into every development phase, we deliver analytics platforms that scale cleanly as your transaction volume grows.",
      imageUrl: "/sdlc.webp",
      imgAltText: "Agile software development life cycle diagram with automated CI/CD and quality assurance stages",
    },
    {
      title: "Database Systems",
      slug: "database-systems",
      description:
        "Eliminate sluggish application performance caused by unindexed tables and poorly normalized schemas. Our database administrators provide deep SQL Server, PostgreSQL, and MySQL performance tuning alongside zero-downtime Azure and AWS cloud data migration services.\n\nWe architect high-concurrency relational and NoSQL database clusters with automated point-in-time recovery, read-replica load balancing, and row-level security. Continuous health monitoring ensures your transactional databases maintain ACID compliance and 99.99% uptime under peak workloads.",
      imageUrl: "/database system.webp",
      imgAltText: "High-availability SQL and PostgreSQL database cluster architecture with cloud migration",
    },
    {
      title: "Python Programming",
      slug: "python-programming",
      description:
        "Harness the industry standard language for data engineering, quantitative modeling, and high-throughput backend APIs. Our custom Python development services cover everything from FastAPI and Django microservices to automated Pandas, Polars, and PySpark data processing pipelines.\n\nWe write clean, type-safe, and maintainable Python codebases that integrate third-party financial, logistics, and marketing APIs into your internal infrastructure. Every deployment is packaged in reproducible Docker containers for seamless scaling across your cloud environment.",
      imageUrl: "/python.webp",
      imgAltText: "Custom Python data engineering and FastAPI backend microservice code architecture",
    },
    {
      title: "Research Analysis",
      slug: "research-analysis",
      description:
        "Validate capital investments and product expansions with empirical market intelligence rather than executive guesswork. Our quantitative research analysts combine primary demographic polling, competitor pricing telemetry, and industry cohort data to map untapped revenue opportunities.\n\nWe deliver structured market research reports and interactive data models that quantify customer acquisition costs, addressable market size, and demand elasticity across US regional segments—giving your leadership team clear evidence before committing budget.",
      imageUrl: "/research-analysis.webp",
      imgAltText: "Market research and competitive intelligence analysis dashboard for US business expansion",
    },
    {
      title: "Econometrics",
      slug: "econometrics",
      description:
        "Isolate the true causal drivers behind your revenue fluctuations, pricing tiers, and marketing spend. Our econometric consulting team applies time-series forecasting, panel data regression, and economic impact modeling to answer complex corporate finance questions.\n\nWe help CFOs and strategy teams measure price elasticity, macroeconomic sensitivity, and multi-touch attribution with statistical rigor. Complex mathematical outputs are translated into clear scenario simulators so leadership can stress-test quarterly plans with confidence.",
      imageUrl: "/econometrics.webp",
      imgAltText: "Econometric time-series forecasting and price elasticity statistical model",
    },
    {
      title: "Advanced Data Analysis",
      slug: "advance-data-analysis",
      description:
        "Uncover hidden margin leakage and customer churn signals buried inside raw transaction logs. Through advanced statistical modeling and predictive analytics consulting, we transform historical datasets into forward-looking operational alerts.\n\nOur data scientists cleanse, normalize, and model multi-source data to optimize inventory reorder points, customer lifetime value (LTV) segmentation, and capacity planning. You gain reproducible analytical pipelines that continuously sharpen accuracy as new data arrives.",
      imageUrl: "/advance data analysis.webp",
      imgAltText: "Advanced predictive analytics and customer lifetime value segmentation model",
    },
    {
      title: "Decision Making For Businesses",
      slug: "decision-making",
      description:
        "Bridge the gap between raw analytics and boardroom execution. We implement decision-intelligence frameworks that embed live operational metrics, variance alerts, and scenario modeling directly into your leadership cadence.\n\nBy aligning finance, sales, and operations around standardized KPI definitions, we eliminate conflicting departmental reports. Your executive team gains instant visibility into unit economics, cash flow velocity, and resource allocation trade-offs.",
      imageUrl: "/decision making for businesses.webp",
      imgAltText: "Executive decision intelligence platform showing unit economics and scenario planning",
    },
    {
      title: "Business Consultancy",
      slug: "business-consultancy",
      description:
        "Modernize legacy operational workflows with a structured digital transformation roadmap. Our technical consultants audit your existing software stack, identify data silos, and design phased integration architectures that connect finance, supply chain, and revenue operations.\n\nRather than pushing bloated off-the-shelf software licenses, we help US mid-market organizations architect lean, interoperable data ecosystems. From vendor evaluation and schema governance to staff onboarding, we ensure every technology investment delivers measurable operational ROI.",
      imageUrl: "/business consultancy.webp",
      imgAltText: "Enterprise data strategy and digital transformation consulting roadmap for US operations",
    },
  ],
};

export const metadata: Metadata = {
  title: "Enterprise Data Analytics & BI Consulting USA | Black Zero",
  description:
    "Transform raw corporate data into real-time executive intelligence. Custom BI dashboards, cloud data warehousing, Python ETL automation, and predictive analytics for US enterprises.",
  keywords: [
    "data analytics consultant USA",
    "data visualization consulting services",
    "cloud data warehouse migration",
    "business process automation services",
    "custom Python data engineering",
    "predictive analytics consulting",
    "executive BI dashboard development",
  ],
  alternates: {
    canonical: "https://www.blackzero.org/services/data-analytics",
  },
  openGraph: {
    title: "Enterprise Data Analytics & BI Consulting USA | Black Zero Technologies",
    description:
      "Custom BI dashboards, cloud data warehousing, Python ETL automation, and predictive analytics engineered for US mid-market and enterprise teams.",
    url: "https://www.blackzero.org/services/data-analytics",
    siteName: "Black Zero Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.blackzero.org/business-analytics.webp",
        width: 1200,
        height: 630,
        alt: "Enterprise data analytics dashboard displaying real-time KPIs and predictive growth trends",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Data Analytics & BI Consulting USA | Black Zero Technologies",
    description:
      "Architect scalable cloud data warehouses, automated ETL pipelines, and real-time executive BI dashboards with Black Zero Technologies.",
    images: ["https://www.blackzero.org/business-analytics.webp"],
  },
};

export default function DataAnalyticsPage() {
  // Structured data for Enterprise Data Analytics & BI Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Enterprise Data Analytics and Business Intelligence Consulting",
    serviceType: "Data Analytics, Cloud Data Warehousing, and BI Engineering",
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
      "Enterprise data analytics consulting, custom BI dashboard engineering, cloud data warehousing, Python ETL automation, and econometric modeling for US businesses.",
    url: "https://www.blackzero.org/services/data-analytics",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Data Engineering and Analytics Capabilities",
      itemListElement: dataAnalyticsData.subSections.map((sub, index) => ({
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
      <ServiceClientView service={dataAnalyticsData} />
    </>
  );
}