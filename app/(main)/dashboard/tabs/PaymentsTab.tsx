"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function PaymentsTab() {
  const transactions = useQuery(api.momoTransactions.GetAllTransactions);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý thanh toán</h1>
      <div className="h-[500px] overflow-auto border border-gray-300 rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="px-4 py-2 border-b border-r border-gray-300">Mã giao dịch</th>
              <th className="px-4 py-2 border-b border-r border-gray-300">Tên người dùng</th>
              <th className="px-4 py-2 border-b border-r border-gray-300">Phương thức</th>
              <th className="px-4 py-2 border-b border-r border-gray-300">Số tiền</th>
              <th className="px-4 py-2 border-b border-r border-gray-300">Trạng thái</th>
              <th className="px-4 py-2 border-b border-r border-gray-300">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((tx) => (
              <tr key={tx._id} className=" cursor-pointer">
                {/* chi hien thi 10 ky tu, hover vao hien thi */}
                <td className="px-4 py-2 border-b border-r border-gray-300 max-w-[150px]">
                  <span
                    title={tx._id}
                    className="inline-block overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {`${tx._id.slice(0, 10)}${tx._id.length > 10 ? '...' : ''}`}
                  </span>
                </td>
                <td className="px-4 py-2 border-b border-r border-gray-300">{tx.userName}</td>
                <td className="px-4 py-2 border-b border-r border-gray-300">
                  {tx.paymentMethod.charAt(0).toUpperCase() + tx.paymentMethod.slice(1)}
                </td>
                <td className="px-4 py-2 border-b border-r border-gray-300">{tx.amount.toLocaleString()} VNĐ</td>
                <td className="px-4 py-2 border-b border-r border-gray-300">
                  {tx.status === "success" ? "Thành công" : "Thất bại"}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {new Date(tx._creationTime).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
            {!transactions && (
              <tr>
                <td colSpan={4} className="text-center py-4">Đang tải...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
