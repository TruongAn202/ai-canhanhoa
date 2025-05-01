"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ReusableTable } from "../components/ReusableTable";
import { useSearchParams } from "next/navigation";

export default function SupportTab() {
  const tickets = useQuery(api.support.GetAllSupportTickets); // Lấy tất cả các yêu cầu hỗ trợ từ API
  const updateStatus = useMutation(api.support.UpdateSupportStatus); // Mutation để cập nhật trạng thái yêu cầu hỗ trợ
  const [selectedId, setSelectedId] = useState<Id<"support"> | null>(null); // Quản lý ID của yêu cầu hỗ trợ được chọn
  const searchParams = useSearchParams(); // Lấy đối tượng searchParams từ URL
  const searchQuery = searchParams.get("q")?.toLowerCase() || ""; // Lấy giá trị query 'q' từ URL và chuyển sang chữ thường

  const selectedTicket = tickets?.find((t) => t._id === selectedId); // Tìm yêu cầu hỗ trợ được chọn từ danh sách

  const filteredTickets = useMemo(() => { // Dùng useMemo để lọc danh sách yêu cầu hỗ trợ khi có thay đổi tickets hoặc searchQuery
    if (!tickets) return []; // Nếu không có tickets thì trả về mảng rỗng
    return tickets.filter((ticket) => // Lọc danh sách yêu cầu hỗ trợ theo email chứa chuỗi tìm kiếm
      ticket.email.toLowerCase().includes(searchQuery)
    );
  }, [tickets, searchQuery]); // Recompute filteredTickets khi tickets hoặc searchQuery thay đổi

  if (!tickets) return <div>Loading...</div>; // Nếu tickets chưa được tải, hiển thị "Loading..."

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Yêu cầu hỗ trợ</h1>
      <ReusableTable
        data={filteredTickets}
        onRowClick={(ticket) => setSelectedId(ticket._id)}
        columns={[
          { header: "Tên người dùng", accessor: "name" },
          { header: "Email", accessor: "email" },
          {
            header: "Trạng thái",
            accessor: (ticket) => (ticket.status ? "Đã xử lý" : "Chưa xử lý"),
          },
          {
            header: "Ngày tạo",
            accessor: (ticket) =>
              new Date(ticket._creationTime).toLocaleDateString("vi-VN"),
          },
        ]}
      />
    </div>
  );
}
