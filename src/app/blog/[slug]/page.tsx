import BlogDetails from '@/components/BlogDetails';
import { getPostBySlug, getAllPostsSlugs } from '@/utils/content/post';
import { Metadata } from 'next';

// Generate dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: { slug: string };  // <-- params is a plain object
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return {
    title: `${post.title} | Amaraiverse`,
    description: post.title || "Project Detail Page",
    openGraph: {
      title: post.title,
      description: post.title || "Project Detail Page",
    },
  };
}

// Generate all static params for pre-rendering
export async function generateStaticParams() {
  return getAllPostsSlugs();
}

// The actual page component
export default async function BlogDetail({
  params,
}: {
  params: { slug: string };  // <-- params is plain object, no Promise here!
}) {
  const post = await getPostBySlug(params.slug);
  return <BlogDetails post={post} />;
}
