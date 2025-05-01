"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation"; // Để lấy query params từ URL

export default function AccountsTab() {
  const users = useQuery(api.users.GetAllUsers); // Lấy danh sách người dùng từ API
  const updateUserRole = useMutation(api.users.UpdateUserRole); // Hàm cập nhật vai trò người dùng
  const deleteUser = useMutation(api.users.DeleteUser); // Hàm xóa người dùng
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Quản lý trạng thái dropdown (mở hoặc đóng)
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại cho phân trang
  const rowsPerPage = 5; // Số dòng hiển thị trên mỗi trang
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Tham chiếu đến dropdown để kiểm tra khi click bên ngoài
  
  const searchParams = useSearchParams(); // Lấy đối tượng searchParams từ URL
  const searchQuery = searchParams.get("q") || ""; // Lấy giá trị query 'q' từ URL, nếu không có thì mặc định là chuỗi rỗng
  
  const totalPages = Math.ceil((users?.length || 0) / rowsPerPage); // Tính tổng số trang dựa trên số lượng người dùng và số dòng mỗi trang
  const startIndex = (currentPage - 1) * rowsPerPage; // Tính chỉ mục bắt đầu cho việc phân trang
  const filteredUsers = users
    ?.filter((user) =>  
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) // Lọc người dùng theo email, tìm kiếm không phân biệt hoa thường
    );
  
  const paginatedUsers = filteredUsers?.slice(startIndex, startIndex + rowsPerPage); // Cắt danh sách người dùng theo phân trang
  
  useEffect(() => {
    // Hàm xử lý click bên ngoài dropdown để đóng nó
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) // Kiểm tra nếu click ngoài dropdown
      ) {
        setOpenDropdown(null); // Đóng dropdown nếu click bên ngoài
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside); // Thêm sự kiện lắng nghe click ngoài
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Xóa sự kiện khi component unmount
    };
  }, []); // Hook này chạy một lần khi component được mount
  
  const handleRoleChange = async (userId: Id<"users">, role: string, currentRole: string) => {
    if (currentRole === role) { // Nếu người dùng đã có vai trò như yêu cầu thì không làm gì
      alert(`Tài khoản này đã là ${role === "admin" ? "admin" : "user"}.`);
      return;
    }
    try {
      await updateUserRole({ userId, role }); // Cập nhật vai trò người dùng
      alert(`Đã phân quyền thành công: ${role}`); // Thông báo thành công
    } catch (error) {
      alert("Phân quyền thất bại"); // Thông báo lỗi nếu phân quyền thất bại
    }
  };
  
  const handleDeleteUser = async (userId: Id<"users">) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) { // Cảnh báo xác nhận xóa tài khoản
      try {
        await deleteUser({ userId }); // Xóa người dùng
        alert("Đã xóa tài khoản thành công"); // Thông báo thành công
      } catch (error) {
        alert("Xóa tài khoản thất bại"); // Thông báo lỗi nếu xóa thất bại
      }
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý tài khoản</h1>

      <div className="h-[500px] overflow-auto border border-gray-300 rounded-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="px-4 py-3 border border-gray-300">Tên người dùng</th>
              <th className="px-4 py-3 border border-gray-300">Email</th>
              <th className="px-4 py-3 border border-gray-300">Credits</th>
              <th className="px-4 py-3 border border-gray-300">Ngày tạo</th>
              <th className="px-4 py-3 border border-gray-300">Vai trò</th>
              <th className="px-4 py-3 border border-gray-300">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers?.map((user) => (
              <tr key={user._id} className="text-sm text-gray-800 hover:bg-gray-50 transition cursor-pointer">
                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300">{user.credits}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(user._creationTime).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                <td className="px-4 py-2 border border-gray-300 relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === user._id ? null : user._id)
                    }
                    className="px-2 py-1 text-gray-600 hover:text-black cursor-pointer"
                  >
                    •••
                  </button>

                  {openDropdown === user._id && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 mt-1 right-0 bg-white border border-gray-200 rounded shadow-md w-36 "
                    >
                      <button
                        onClick={() => {
                          handleRoleChange(user._id, "admin", user.role ?? "user")
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        Phân quyền admin
                      </button>
                      <button
                        onClick={() => {
                          handleRoleChange(user._id, "user", user.role ?? "user")
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        Phân quyền user
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteUser(user._id);
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Xóa tài khoản
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {!users && (
              <tr>
                <td colSpan={6} className="text-left py-4">Đang tải...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
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
    </div>
  );
}
