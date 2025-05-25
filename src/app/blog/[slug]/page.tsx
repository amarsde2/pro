import BlogDetails from '@/components/BlogDetails';
import { getPostBySlug, getAllPostsSlugs } from '@/utils/content/post';
import { Metadata } from 'next';

// 🔥 Generate dynamic metadata based on slug
export async function generateMetadata({
  params,
}: {
  params: { slug: string };  // <-- not Promise
}): Promise<Metadata> {
  const { slug } = params; // no await
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

export default async function BlogDetail(
  {
    params,
  }: {
    params: { slug: string };  // <-- not Promise
  }
) {
  const { slug } = params;  // no await
  const post = await getPostBySlug(slug);
  return <BlogDetails post={post} />;
}
