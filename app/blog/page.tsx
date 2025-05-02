"use client";
import React, { useMemo } from "react";
import Header from "../(main)/_components/HeaderHome";
import Footer from "@/components/footer/Footer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Blog() {
  const blogPosts = useQuery(api.blogs.GetTatCaBlog); // lấy dữ liệu từ Convex

  // Xử lý category
  const categories = useMemo(() => {
    if (!blogPosts) return ['Loading...']; // Khi chưa load xong, show "Loading..."
    const uniqueCategories = new Set(blogPosts.map((post) => post.category));
    return Array.from(uniqueCategories);
  }, [blogPosts]);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Công Nghệ & AI</h1>

        {categories.map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 border-b pb-2">{category}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(blogPosts
                ? blogPosts.filter((post) => post.category === category)
                : Array(2).fill(null) // tạo 2 card loading giả
              ).map((post, index) => (
                <div
                  key={post?._id ?? index}
                  className={`border rounded-2xl p-5 shadow hover:shadow-lg transition min-h-[160px] ${!post ? "mb-[250px]" : ""}`} // Chỉ thêm mb-[200px] khi loading
                >
                  {!post ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-5 bg-gray-200 rounded w-full" />
                      <div className="h-5 bg-gray-200 rounded w-1/2" />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-2">{post.description}</p>
                      <div className="text-sm text-gray-500 mb-2">
                        {post.author} · {new Date(post.date).toLocaleDateString('vi-VN')}
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Đọc tiếp →
                      </a>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
}
