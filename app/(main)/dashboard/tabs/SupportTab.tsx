"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { ReusableTable } from "../components/ReusableTable";
import { useSearchParams } from "next/navigation";

export default function SupportTab() {
  const tickets = useQuery(api.support.GetAllSupportTickets);
  const updateStatus = useMutation(api.support.UpdateSupportStatus);
  const [selectedId, setSelectedId] = useState<Id<"support"> | null>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const selectedTicket = tickets?.find((t) => t._id === selectedId);

  const filteredTickets = useMemo(() => {
    if (!tickets) return [];
    return tickets.filter((ticket) =>
      ticket.email.toLowerCase().includes(searchQuery)
    );
  }, [tickets, searchQuery]);

  if (!tickets) return <div>Loading...</div>;

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
