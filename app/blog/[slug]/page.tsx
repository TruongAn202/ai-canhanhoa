// app/blog/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/(main)/_components/HeaderHome";
import Footer from "@/components/footer/Footer";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch(() => router.push("/not-found"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-20">Đang tải...</div>;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-20">{blog.title}</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">{blog.description}</p>
        <div className="text-sm text-gray-500 mb-16 text-center">
          <span>{blog.author}</span> ·{" "}
          <span>{new Date(blog.date).toLocaleDateString("vi-VN")}</span>
        </div>
        <div className="prose prose-lg max-w-none mx-auto mb-15 min-h-[250px]">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        <div className="text-center">
          <a href="/blog" className="text-blue-600 hover:underline">
            ← Quay lại danh sách blog
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
