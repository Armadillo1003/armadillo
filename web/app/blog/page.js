import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export const dynamic = "force-static";

export default function BlogIndex() {
  const posts = getAllPostsMeta();
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <div className="grid gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="text-sm text-neutral-500">
              {new Date(p.date).toLocaleDateString()}
            </div>
            <h2 className="text-xl font-medium mt-1">
              <Link className="underline" href={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>
            {p.excerpt && <p className="mt-2 text-neutral-700">{p.excerpt}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
