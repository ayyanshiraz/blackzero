import { MetadataRoute } from 'next';
import { blogPostsData } from '@/data/blogs';
import { productsData } from '@/app/products/data';
import { projectsData } from '@/app/projects/data'; 
import { PRODUCTS_URL, TURNITIN_URL, productUrl } from '@/lib/siteUrls';

const servicesData = [
  { 
    slug: 'marketing', 
    subSections: [ 
        { slug: 'digital-marketing' } 
    ] 
  },
  { slug: 'ai-software-hub', subSections: [] },
  { slug: 'advanced-websites', subSections: [] },
  { slug: 'data-analytics', subSections: [] },
  { slug: 'hybrid-seo', subSections: [] },
  { slug: 'creative-design-and-animation-studio', subSections: [] },
];

export default function sitemap(): MetadataRoute.Sitemap {
  
  const baseUrl = 'https://www.blackzero.org'; 
  
  const dynamicLastModified = new Date();

  const staticPages = [
    { route: '', priority: 1.0 }, 
    { route: '/about', priority: 0.8 },
    { route: '/careers', priority: 0.8 },
    { route: '/contact', priority: 0.8 },
    { route: '/ecommerce-success', priority: 0.8 },
    { route: '/projects', priority: 0.8 },
    { route: '/services', priority: 0.8 },
    { route: '/team', priority: 0.8 },
    { route: '/privacy-policy', priority: 0.5 }, 
    { route: '/blogs', priority: 0.8 },
    { route: '/customized-solutions', priority: 0.8 },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: dynamicLastModified,
    changeFrequency: 'monthly' as const,
    priority: item.priority,
  }));

  const projectPages = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: dynamicLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: dynamicLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const subServicePages = servicesData.flatMap((service) =>
    service.subSections
      .filter(subSection => subSection.slug) 
      .map((subSection) => ({
        url: `${baseUrl}/services/${service.slug}/${subSection.slug}`,
        lastModified: dynamicLastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
  );

  const productPages = productsData.map((product) => ({
    url: productUrl(product.slug),
    lastModified: dynamicLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages = blogPostsData.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const subdomainPages = [
    { url: PRODUCTS_URL, lastModified: dynamicLastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: TURNITIN_URL, lastModified: dynamicLastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  return [
    ...staticPages,
    ...subdomainPages,
    ...projectPages,
    ...servicePages,
    ...subServicePages,
    ...productPages,
    ...blogPages,
  ];
}