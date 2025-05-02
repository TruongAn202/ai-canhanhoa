import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";

import Header from '@/app/(main)/_components/HeaderHome';
import Footer from "@/components/footer/Footer";

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await fetchQuery(api.blogs.GetBlogBySlug, { slug: params.slug });

  if (!blog) return notFound();

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Tiêu đề bài viết */}
        <h1 className="text-4xl font-bold text-center mb-20">{blog.title}</h1>

        {/* Mô tả ngắn */}
        <p className="text-lg text-gray-600 mb-6 text-center">{blog.description}</p>

        {/* Thông tin tác giả và ngày tháng */}
        <div className="text-sm text-gray-500 mb-16 text-center">
          <span>{blog.author}</span> ·
          <span>{new Date(blog.date).toLocaleDateString("vi-VN")}</span>
        </div>

        {/* Nội dung blog */}
        <div className="prose prose-lg max-w-none mx-auto mb-15 min-h-[250px]">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Nút quay lại */}
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
