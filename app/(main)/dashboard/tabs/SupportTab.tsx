"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

export default function SupportTab() {
  const tickets = useQuery(api.support.GetAllSupportTickets);
  const updateStatus = useMutation(api.support.UpdateSupportStatus);
  const [selectedId, setSelectedId] = useState<Id<"support"> | null>(null);

  const selectedTicket = tickets?.find((t) => t._id === selectedId);

  if (!tickets) return <div>Loading...</div>;

  // 👇 Nếu đang chọn một ticket => return chi tiết
  if (selectedTicket) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Chi tiết yêu cầu hỗ trợ</h1>
        <div className="bg-white border rounded-lg p-6 shadow-md max-w-2xl">
          <p><strong>ID:</strong> {selectedTicket._id}</p>
          <p><strong>Họ tên:</strong> {selectedTicket.name}</p>
          <p><strong>Email:</strong> {selectedTicket.email}</p>
          <p><strong>Ngày gửi:</strong> {new Date(selectedTicket._creationTime).toLocaleString("vi-VN")}</p>
          <p><strong>Trạng thái:</strong> {selectedTicket.status ? "Đã xử lý" : "Chưa xử lý"}</p>

          <div className="mt-4">
            <h3 className="font-medium mb-1">Nội dung tin nhắn:</h3>
            <div className="p-3 bg-gray-100 rounded-md whitespace-pre-wrap">
              {selectedTicket.message}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {!selectedTicket.status && (
              <Button
                onClick={async () => {
                  await updateStatus({ id: selectedTicket._id, status: true });
                  setSelectedId(null);
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Đánh dấu đã xử lý
              </Button>
            )}

            {selectedTicket.status && (
              <Button
                onClick={async () => {
                  await updateStatus({ id: selectedTicket._id, status: false });
                  setSelectedId(null);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Mở lại yêu cầu
              </Button>
            )}

            <Button
              onClick={() => setSelectedId(null)}
              variant="outline"
              className="border-gray-400"
            >
              ← Quay lại danh sách
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 👇 Ngược lại hiển thị danh sách
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Yêu cầu hỗ trợ</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-3 border border-gray-300">Tên người dùng</th>
              <th className="px-4 py-3 border border-gray-300">Email</th>
              <th className="px-4 py-3 border border-gray-300">Trạng thái</th>
              <th className="px-4 py-3 border border-gray-300">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                onClick={() => setSelectedId(ticket._id)}
                className="text-sm text-gray-800 hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="px-4 py-2 border border-gray-300">{ticket.name}</td>
                <td className="px-4 py-2 border border-gray-300">{ticket.email}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {ticket.status ? "Đã xử lý" : "Chưa xử lý"}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(ticket._creationTime).toLocaleDateString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
