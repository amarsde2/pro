import { MetadataRoute } from 'next';
import { getAllPosts } from '@/utils/content/post';
import { getAllProjects } from './content/project';

export default async function sitemapItems(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const projects = getAllProjects();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://amaraiverse.com';

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
      title: 'Home',
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
      title: 'Privacy Policy',
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
      title: 'Terms and conditions',
    },
  ];

  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    title: post.title,
  }));

  const projectRoutes = projects.map((project: any) => ({
    url: `${baseUrl}/project/${project.slug}`,
    lastModified: new Date(), // fixed from Date.now()
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    title: project.title,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
