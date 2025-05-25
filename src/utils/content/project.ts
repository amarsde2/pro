import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDir = path.join(process.cwd(), '/src/utils/content/projects');

export function getAllProjectSlugs() {
  const files = fs.readdirSync(projectsDir);
  return files.map(filename => ({
    params: {
      slug: filename.replace(/\.md$/, '')
    }
  }));
}

export async function getProjectBySlug(slug: string) {
  const fullPath = path.join(projectsDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

 

  return {
    title: data.title,
    short: data.short,
    category: data.category,
    slug,
    content,
    image: data.image,
    technologies: data.technologies,
    contentHtml,
  };
}


export function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDir);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      ...data,
    };
  });
}