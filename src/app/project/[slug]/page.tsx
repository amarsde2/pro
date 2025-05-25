import ProjectDetails from '@/components/ProjectDetails';
import { getProjectBySlug, getAllProjectSlugs } from '@/utils/content/project';
import { Metadata } from 'next';

// 🔥 Generate dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: { slug: string };  // <-- no Promise here
}): Promise<Metadata> {
  const { slug } = params;  // no await
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

export async function generateStaticParams() {
  return getAllProjectSlugs();
}

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };  // <-- no Promise here
}) {
  const { slug } = params;  // no await
  const project = await getProjectBySlug(slug);
  return <ProjectDetails project={project} />;
}
