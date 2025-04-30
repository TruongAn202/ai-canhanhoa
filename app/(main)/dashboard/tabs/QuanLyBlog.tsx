"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function QuanLyBlog() {
  const themBlog = useMutation(api.blogs.ThemBlog);
  const xoaBlog = useMutation(api.blogs.XoaBlog);
  const themCategory = useMutation(api.blogs.ThemCategory);
  const danhSachCategories = useQuery(api.blogCategories.GetAllCategories);
  const danhSachBlog = useQuery(api.blogs.GetTatCaBlog);
  const capNhatBlog = useMutation(api.blogs.CapNhatBlog);
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    slug: "",
    content: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [editing, setEditing] = useState(false);  // Flag để xác định chế độ sửa
  const [currentBlogId, setCurrentBlogId] = useState<Id<"blog"> | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.content) {
      alert("Vui lòng nhập đầy đủ tiêu đề, slug và nội dung blog!");
      return;
    }

    if (editing && currentBlogId) {
      // If editing, update the blog
      await capNhatBlog({
        id: currentBlogId,
        title: form.title,
        description: form.description,
        author: form.author,
        category: form.category,
        slug: form.slug,
        content: form.content,
      });
    } else {
      // If adding new, create the blog
      await themBlog({
        ...form,
        date: new Date().toISOString(),
      });
    }
    
    // Reset form và chế độ sửa
    setForm({
      title: "",
      description: "",
      author: "",
      category: "",
      slug: "",
      content: "",
    });
    setEditing(false);
    setCurrentBlogId(null);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      await themCategory({ category: newCategory.trim() });
      setNewCategory("");
    }
  };

  const handleDelete = async (id: Id<"blog">) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết này?");
    if (confirmDelete) {
      await xoaBlog({ id });
    }
  };

  const handleEdit = (blog: any) => {
    // Khi click vào một bài viết, cập nhật form với dữ liệu của bài viết đó và bật chế độ sửa
    setForm({
      title: blog.title,
      description: blog.description,
      author: blog.author,
      category: blog.category,
      slug: blog.slug,
      content: blog.content,
    });
    setEditing(true);
    setCurrentBlogId(blog._id);  // Lưu ID của bài viết đang chỉnh sửa
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">{editing ? "Chỉnh Sửa Blog" : "Thêm Blog Mới"}</h2>
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
          <option value="">-- Chọn thể loại --</option>
          {danhSachCategories?.map((cat: any) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Thêm thể loại mới"
            className="border p-2 rounded flex-1"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer"
          >
            Thêm
          </button>
        </div>
      </div>

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Nội dung bài viết (Markdown hoặc HTML)"
        className="border p-2 rounded w-full h-40"
      />

      <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded cursor-pointer">
        {editing ? "Sửa" : "Thêm Blog"}
      </button>

      <h3 className="text-xl font-semibold mt-8">Danh sách blog đã thêm</h3>
      <div className="h-[500px] overflow-auto border border-gray-300 rounded-md">
        <table className="w-full table-auto border mt-2">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-2 border">Tiêu đề</th>
              <th className="p-2 border">Tác giả</th>
              <th className="p-2 border">Thể loại</th>
              <th className="p-2 border">Ngày</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {danhSachBlog?.map((blog: any) => (
              <tr key={blog._id} onClick={() => handleEdit(blog)} className="cursor-pointer hover:bg-gray-100">
                <td className="p-2 border">{blog.title}</td>
                <td className="p-2 border">{blog.author}</td>
                <td className="p-2 border">{blog.category}</td>
                <td className="p-2 border">
                  {new Date(blog.date).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(blog._id); }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
