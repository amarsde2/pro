import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), '/src/utils/content/posts');

export function getAllPostsSlugs() {
  const files = fs.readdirSync(postsDir);
  return files.map(filename => ({
    slug: filename.replace(/\.md$/, '')
  }));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    description: data.description,
    category: data.category,
    slug,
    content,
    publishDate: data.publishDate,
    banner: data.banner,
    readingTime: data.readingTime,
    contentHtml,
  };
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    };
  });
}
