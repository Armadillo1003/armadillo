import { notFound } from "next/navigation";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const all = getAllPostsMeta();
  const exists = all.find((p) => p.slug === slug);
  if (!exists) return notFound();
  const { meta, html } = await getPostBySlug(slug);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">{meta.title}</h1>
      <div className="text-sm text-neutral-500 mb-6">
        {new Date(meta.date).toLocaleDateString()}
      </div>
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
