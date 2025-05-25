import ProjectDetails from '@/components/ProjectDetails';
import { getProjectBySlug, getAllProjectSlugs } from '@/utils/content/project';
import { Metadata } from 'next';

// Generate dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: { slug: string };  // params is a plain object, no Promise
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  return {
    title: `${project.title} | Amaraiverse`,
    description: project.short || "Project Detail Page",
    openGraph: {
      title: project.title,
      description: project.short || "Project Detail Page",
    },
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return getAllProjectSlugs();
}

// The page component itself
export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };  // params is a plain object, no Promise
}) {
  const project = await getProjectBySlug(params.slug);
  return <ProjectDetails project={project} />;
}
