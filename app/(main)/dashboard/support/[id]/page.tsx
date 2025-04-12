"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

export default function TicketDetailPage() {
  const { id } = useParams();
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
