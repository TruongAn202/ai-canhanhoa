"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DashboardTab() {
  const transactions = useQuery(api.momoTransactions.GetAllTransactionsWithUser);//lay danh sach all giao dich
  const tongDoanhThu = useQuery(api.momoTransactions.GetTongDoanhThu);//tong doan hthu
  const tongDonThanhCong = useQuery(api.momoTransactions.DemTongDonHangThanhCong);//dem so luong don hang giao dich thanh cong
  const tongTaiKhoan = useQuery(api.users.DemTongTaiKhoan);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {/* 3 card chinh */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Tổng doanh thu", value: tongDoanhThu !== undefined ? `${tongDoanhThu.toLocaleString()} VNĐ` : "Đang tải..." },
          { label: "Tổng đơn hàng", value: tongDonThanhCong?.toString() || "Đang tải..." },
          { label: "Tổng số khách hàng", value: tongTaiKhoan?.toString() || "Đang tải..." },
        ].map((item, index) => (
          <Card key={index} className="bg-white text-black border border-gray-300">
            <CardContent className="p-4">
              <div className="text-sm">{item.label}</div>
              <div className="text-2xl font-bold mt-1">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Khách hàng gần đây full width và cao 500px */}
      <Card className="bg-white text-black border border-gray-300 h-[350px]">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="font-bold text-lg mb-2">Giao dịch gần đây</div>
        <p className="text-sm text-gray-600 mb-3">Danh sách giao dịch của người dùng.</p>

        {/* Header */}
        <div className="grid grid-cols-6 text-sm font-medium border-b border-gray-300 pb-1">
          <div>Người dùng</div>
          <div>Email</div>
          <div>Token</div>
          <div>Phương thức</div>
          <div>Số tiền</div>
          <div>Ngày</div>
        </div>

        {/* Danh sách */}
        <div className="overflow-y-auto mt-2 space-y-2 flex-1">
          {transactions?.length ? (
            transactions.map((tx) => (
              <div key={tx._id} className="grid grid-cols-6 text-sm border-b py-1">
                <div>{tx.userName}</div>
                <div>{tx.email}</div>
                <div>{tx.credits}</div>
                <div>{tx.paymentMethod}</div>
                <div>{tx.amount.toLocaleString()}₫</div>
                <div>{new Date(tx._creationTime).toLocaleDateString("vi-VN")}</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">Đang tải...</div>
          )}
        </div>
      </CardContent>
    </Card>
    </>
  );
}

