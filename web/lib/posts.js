import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content/posts");

export function getAllPostsMeta() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(postsDir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    return { slug, ...data };
  });
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
  const filePath = path.join(postsDir, \`\${slug}.md\`);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const processed = await remark().use(html).process(content);
  return { meta: { slug, ...data }, html: processed.toString() };
}
