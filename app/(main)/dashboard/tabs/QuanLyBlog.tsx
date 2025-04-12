"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function QuanLyBlog() {
  const themBlog = useMutation(api.blogs.ThemBlog);
  const danhSachBlog = useQuery(api.blogs.GetTatCaBlog);
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    category: "AI Cá Nhân Hóa",
    slug: "",
    content: "", // Thêm trường content
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.content) {
      alert("Vui lòng nhập đầy đủ tiêu đề, slug và nội dung blog!");
      return;
    }

    await themBlog({
      ...form,
      date: new Date().toISOString(),
    });

    setForm({
      title: "",
      description: "",
      author: "",
      category: "AI Cá Nhân Hóa",
      slug: "",
      content: "",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Thêm Blog Mới</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tiêu đề"
          className="border p-2 rounded"
        />
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug (ví dụ: blog-bai-viet-1)"
          className="border p-2 rounded"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Mô tả"
          className="border p-2 rounded"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Tác giả"
          className="border p-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>AI Cá Nhân Hóa</option>
          <option>Công nghệ AI</option>
          <option>Ứng dụng thực tiễn</option>
        </select>
      </div>

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Nội dung bài viết (Markdown hoặc HTML)"
        className="border p-2 rounded w-full h-40"
      />

      <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
        Thêm Blog
      </button>

      <h3 className="text-xl font-semibold mt-8">Danh sách blog đã thêm</h3>
      <table className="w-full table-auto border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Tác giả</th>
            <th className="p-2 border">Thể loại</th>
            <th className="p-2 border">Ngày</th>
          </tr>
        </thead>
        <tbody>
          {danhSachBlog?.map((blog: any) => (
            <tr key={blog._id}>
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">{blog.author}</td>
              <td className="p-2 border">{blog.category}</td>
              <td className="p-2 border">
                {new Date(blog.date).toLocaleDateString("vi-VN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
