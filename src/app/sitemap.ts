import { MetadataRoute } from 'next';
import { blogPostsData } from '@/data/blogs';
import { productsData } from '@/app/products/data';
import { projectsData } from '@/app/projects/data'; 

const servicesData = [
  { 
    slug: 'marketing', 
    subSections: [ 
        { slug: 'digital-marketing' } 
    ] 
  },
  
  
  { slug: 'graphic-designing', subSections: [] },
  { slug: 'photo-video', subSections: [] },
  // Naye missing services yahan add kiye gaye hain
  { slug: 'ai-software-hub', subSections: [] },
  { slug: 'advanced-websites', subSections: [] },
  { slug: 'data-analytics', subSections: [] },
  { slug: 'hybrid-seo', subSections: [] },
  { slug: 'creative-design-and-animation-studio', subSections: [] },
];

export default function sitemap(): MetadataRoute.Sitemap {
  
  const baseUrl = 'https://www.blackzero.org'; 
  
  // Set a fixed date for stable pages so Google does not get confused
  const staticLastModified = new Date('2024-03-20');
 
  // 1. Static Pages
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
    { route: '/products', priority: 0.8 },
    { route: '/blogs', priority: 0.8 },
    // Naye static pages yahan add kiye gaye hain
    { route: '/customized-solutions', priority: 0.8 },
    { route: '/turnitin', priority: 0.8 },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: staticLastModified,
    changeFrequency: 'monthly' as const,
    priority: item.priority,
  }));

  // 2. Projects (Automatic)
  const projectPages = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: staticLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Services
  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: staticLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const subServicePages = servicesData.flatMap((service) =>
    service.subSections
      .filter(subSection => subSection.slug) 
      .map((subSection) => ({
        url: `${baseUrl}/services/${service.slug}/${subSection.slug}`,
        lastModified: staticLastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
  );

  // 4. Products (Automatic)
  const productPages = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: staticLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 5. Blogs (Automatic - Keeps original correct logic)
  const blogPages = blogPostsData.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...servicePages,
    ...subServicePages,
    ...productPages,
    ...blogPages,
  ];
}