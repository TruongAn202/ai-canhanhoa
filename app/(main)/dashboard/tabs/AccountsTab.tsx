"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AccountsTab() {
  const users = useQuery(api.users.GetAllUsers);
  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý tài khoản</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-3 border border-gray-300">Tên người dùng</th>
              <th className="px-4 py-3 border border-gray-300">Email</th>
              <th className="px-4 py-3 border border-gray-300">Credits</th>
              <th className="px-4 py-3 border border-gray-300">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="text-sm text-gray-800 hover:bg-gray-50 transition">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
