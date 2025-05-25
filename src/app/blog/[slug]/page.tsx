import BlogDetails from '@/components/BlogDetails';
import { getPostBySlug, getAllPostsSlugs } from '@/utils/content/post';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;  // params as Promise
}): Promise<Metadata> {
  const { slug } = await params;       // await here
  const post = await getPostBySlug(slug);

  return {
    title: `${post.title} | Amaraiverse`,
    description: post.title || "Project Detail Page",
    openGraph: {
      title: post.title,
      description: post.title || "Project Detail Page",
    },
  };
}

export async function generateStaticParams() {
  return getAllPostsSlugs();
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;  // params as Promise
}) {
  const { slug } = await params;       // await here
  const post = await getPostBySlug(slug);
  return <BlogDetails post={post} />;
}