import { MetadataRoute } from 'next';
<<<<<<< HEAD
import { blogPosts } from './blog/data'; 

export const dynamic = 'force-dynamic'; 

const BASE_URL = 'https://www.almadinahijamacenter.com';

const serviceSlugs = [
  'wet-cupping',
  'dry-cupping',
  'hijama-for-pain-relief',
  'hijama-for-internal-health',
  'hijama-for-sports-recovery',
  'hijama-for-detox',
  'fire-cupping',
  'female-face-hijama',
  'beauty-hijama',
  'breast-cysts',
  'hijama-for-baldness',
  'hijama-for-fistula',
  'pcos'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/booking`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    // 👇👇👇 UPDATED: Blog Main Page ab 'daily' check hoga 👇👇👇
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily', // ✅ Changed from 'weekly' to 'daily'
      priority: 0.9, // Priority bhi barha di taake Google jaldi aye
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const servicePages = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: currentDate,
=======
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
  { slug: 'ai-software-hub', subSections: [] },
  { slug: 'advanced-websites', subSections: [] },
  { slug: 'data-analytics', subSections: [] },
  { slug: 'hybrid-seo', subSections: [] },
  { slug: 'creative-design-and-animation-studio', subSections: [] },
];

export default function sitemap(): MetadataRoute.Sitemap {
  
  const baseUrl = 'https://www.blackzero.org'; 
  
 
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
>>>>>>> aa0485d (Fix hero section layout and padding)
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

<<<<<<< HEAD
  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : currentDate,
    changeFrequency: 'weekly' as const, 
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
=======
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
>>>>>>> aa0485d (Fix hero section layout and padding)
}