"use client";

import { useQuery, useMutation } from "convex/react";//cú phap truy van va cap nhat du lieu cua convex
import { api } from "@/convex/_generated/api";//Import object `api` đã được auto-generate để gọi API Convex một cách an toàn (có kiểm tra kiểu)
import { useParams } from "next/navigation";//Lấy `params` trên URL, ví dụ: /dashboard/abc123 sẽ trả về { id: "abc123" }
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";//Dùng `Id<"support">` để đảm bảo biến `ticketId` đúng kiểu ID trong bảng `support`

export default function TicketDetailPage() {
  const { id } = useParams();//lay id
  const ticketId = id as Id<"support">; // ✅ Ép kiểu cho đúng Convex

  const ticket = useQuery(api.support.GetSupportTicketById, { id: ticketId });
  const updateStatus = useMutation(api.support.UpdateSupportStatus);

  const markAsDone = async () => {
    //await updateStatus({ id: ticketId });
    window.location.reload();
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-md rounded-xl border">
      <h1 className="text-2xl font-bold mb-4">Chi tiết yêu cầu hỗ trợ</h1>
      <div className="mb-4">
        <p><strong>Họ tên:</strong> {ticket.name}</p>
        <p><strong>Email:</strong> {ticket.email}</p>
        <p><strong>Ngày gửi:</strong> {new Date(ticket._creationTime).toLocaleString("vi-VN")}</p>
        <p><strong>Trạng thái:</strong> {ticket.status ? "Đã xử lý" : "Chưa xử lý"}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Nội dung tin nhắn:</h2>
        <div className="p-3 bg-gray-100 rounded-md whitespace-pre-wrap">{ticket.message}</div>
      </div>
      {!ticket.status && (
        <Button onClick={markAsDone} className="bg-green-600 hover:bg-green-700 text-white">
          Đánh dấu đã xử lý
        </Button>
      )}
    </div>
  );
}
