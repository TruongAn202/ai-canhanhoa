"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 5;

export default function QuanLyBlog() {
  const themBlog = useMutation(api.blogs.ThemBlog); // Hàm thêm blog mới thông qua mutation
  const xoaBlog = useMutation(api.blogs.XoaBlog); // Hàm xóa blog thông qua mutation
  const themCategory = useMutation(api.blogs.ThemCategory); // Hàm thêm thể loại blog mới thông qua mutation
  const danhSachCategories = useQuery(api.blogCategories.GetAllCategories); // Lấy danh sách tất cả thể loại blog từ API
  const danhSachBlog = useQuery(api.blogs.GetTatCaBlog); // Lấy danh sách tất cả bài blog từ API
  const capNhatBlog = useMutation(api.blogs.CapNhatBlog); // Hàm cập nhật thông tin blog thông qua mutation
  
  const [form, setForm] = useState({ // Quản lý trạng thái form cho các trường blog
    title: "",
    description: "",
    author: "",
    category: "",
    slug: "",
    content: "",
  });
  
  const [newCategory, setNewCategory] = useState(""); // Quản lý trạng thái thể loại blog mới
  const [editing, setEditing] = useState(false); // Trạng thái chỉnh sửa blog hay không
  const [currentBlogId, setCurrentBlogId] = useState<Id<"blog"> | null>(null); // ID của blog hiện tại đang chỉnh sửa
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại cho phân trang
  const searchParams = useSearchParams(); // Lấy đối tượng searchParams từ URL
  const searchQuery = searchParams.get("q")?.toLowerCase() || ""; // Lấy giá trị query 'q' từ URL và chuyển sang chữ thường
  
  // Lọc danh sách blog theo tiêu đề hoặc slug, không phân biệt hoa thường
  const filteredBlogs = danhSachBlog?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery) || blog.slug.toLowerCase().includes(searchQuery) // Kiểm tra xem tiêu đề hoặc slug có chứa chuỗi tìm kiếm không
  );
  
  const totalPages = filteredBlogs ? Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) : 1; // Tính tổng số trang dựa trên số lượng blog đã lọc và số bài mỗi trang
  
  const indexOfLastBlog = currentPage * ITEMS_PER_PAGE; // Chỉ mục của blog cuối cùng trong trang hiện tại
  const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE; // Chỉ mục của blog đầu tiên trong trang hiện tại
  const currentBlogs = filteredBlogs?.slice(indexOfFirstBlog, indexOfLastBlog); // Lấy danh sách các blog cho trang hiện tại
  
  const handleChange = (e: any) => { // Hàm xử lý sự kiện thay đổi trong form
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // Cập nhật trạng thái form
  };
  
  const handleSubmit = async () => { // Hàm xử lý khi người dùng gửi form
    if (!form.title || !form.slug || !form.content) { // Kiểm tra trường bắt buộc
      alert("Vui lòng nhập đầy đủ tiêu đề, slug và nội dung blog!");
      return;
    }
  
    if (editing && currentBlogId) { // Nếu đang chỉnh sửa, cập nhật blog
      await capNhatBlog({
        id: currentBlogId,
        ...form,
      });
    } else { // Nếu không phải chỉnh sửa, thêm blog mới
      await themBlog({
        ...form,
        date: new Date().toISOString(),
      });
    }
  
    setForm({ // Reset lại form
      title: "",
      description: "",
      author: "",
      category: "",
      slug: "",
      content: "",
    });
    setEditing(false); // Chế độ chỉnh sửa tắt
    setCurrentBlogId(null); // Xóa ID của blog đang chỉnh sửa
  };
  
  const handleAddCategory = async () => { // Hàm thêm thể loại mới
    if (newCategory.trim()) { // Nếu thể loại không rỗng
      await themCategory({ category: newCategory.trim() }); // Gọi API thêm thể loại
      setNewCategory(""); // Reset giá trị thể loại mới
    }
  };
  
  const handleDelete = async (id: Id<"blog">) => { // Hàm xử lý xóa blog
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết này?"); // Hiển thị hộp thoại xác nhận
    if (confirmDelete) { // Nếu xác nhận
      await xoaBlog({ id }); // Gọi API xóa blog
    }
  };
  
  const handleEdit = (blog: any) => { // Hàm xử lý khi chỉnh sửa blog
    setForm({ // Cập nhật lại form với dữ liệu của blog đang chỉnh sửa
      title: blog.title,
      description: blog.description,
      author: blog.author,
      category: blog.category,
      slug: blog.slug,
      content: blog.content,
    });
    setEditing(true); // Chế độ chỉnh sửa bật
    setCurrentBlogId(blog._id); // Lưu ID của blog đang chỉnh sửa
  };
  
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">{editing ? "Chỉnh Sửa Blog" : "Thêm Blog Mới"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Tiêu đề" className="border p-2 rounded" />
        <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (ví dụ: blog-bai-viet-1)" className="border p-2 rounded" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" className="border p-2 rounded" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Tác giả" className="border p-2 rounded" />
        <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
          <option value="">-- Chọn thể loại --</option>
          {danhSachCategories?.map((cat: any) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
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
            {currentBlogs?.map((blog: any) => (
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

      {/* Phân trang */}
      {danhSachBlog && totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Trang trước
          </button>
          <span className="px-3 py-1">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}
