import ProjectDetails from '@/components/ProjectDetails';
import { getProjectBySlug, getAllProjectSlugs } from '@/utils/content/project';
import { Metadata } from 'next';

// Generate dynamic metadata based on slug (params is Promise here)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // await the promise here
  const project = await getProjectBySlug(slug);

  return {
    title: `${project.title} | Amaraiverse`,
    description: project.short || "Project Detail Page",
    openGraph: {
      title: project.title,
      description: project.short || "Project Detail Page",
    },
  };
}

// Generate static params (still returns plain objects, no Promise)
export async function generateStaticParams() {
  return getAllProjectSlugs();  // returns Array<{ slug: string }>
}

// Page component (params is a Promise here)
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;  // await here
  const project = await getProjectBySlug(slug);
  return <ProjectDetails project={project} />;
}
