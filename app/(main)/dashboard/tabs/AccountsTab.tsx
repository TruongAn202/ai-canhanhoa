"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";

export default function AccountsTab() {
  const users = useQuery(api.users.GetAllUsers);
  const updateUserRole = useMutation(api.users.UpdateUserRole);
  const deleteUser = useMutation(api.users.DeleteUser);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRoleChange = async (userId: Id<"users">, role: string, currentRole: string) => {
    if (currentRole === role) {
      alert(`Tài khoản này đã là ${role === "admin" ? "admin" : "user"}.`);
      return;
    }
    try {
      await updateUserRole({ userId, role });
      alert(`Đã phân quyền thành công: ${role}`);
    } catch (error) {
      alert("Phân quyền thất bại");
    }
  };

  const handleDeleteUser = async (userId: Id<"users">) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        await deleteUser({ userId });
        alert("Đã xóa tài khoản thành công");
      } catch (error) {
        alert("Xóa tài khoản thất bại");
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
            {users?.map((user) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
