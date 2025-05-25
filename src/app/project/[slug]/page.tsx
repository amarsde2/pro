import ProjectDetails from '@/components/ProjectDetails';
import { getProjectBySlug, getAllProjectSlugs } from '@/utils/content/project';
import { Metadata } from 'next';


// 🔥 Generate dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;  // Await params here
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return <ProjectDetails project={project} />;
}