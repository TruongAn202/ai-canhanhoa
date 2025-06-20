"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 5;//so dong moi trang

export default function PaymentsTab() {
  const transactions = useQuery(api.momoTransactions.GetAllTransactions); // Lấy danh sách tất cả giao dịch từ API MoMo để phân trang
  const searchParams = useSearchParams(); // Lấy đối tượng searchParams từ URL
  const searchQuery = searchParams.get("q")?.toLowerCase() || ""; // Lấy giá trị query 'q' từ URL, chuyển sang chữ thường, mặc định là chuỗi rỗng

  const [currentPage, setCurrentPage] = useState(1); // Khởi tạo biến currentPage, mặc định là trang đầu tiên (1).setCurrentPage được dùng để chuyển trang khi bấm nút.

  // Lọc giao dịch theo _id, tìm kiếm không phân biệt hoa thường
  const filteredTransactions = transactions?.filter((tx) =>
    tx._id.toLowerCase().includes(searchQuery) // Kiểm tra _id của giao dịch có chứa chuỗi tìm kiếm không
  );
//Có 12 giao dịch sau lọc 12 / 5 = 2.4 làm tròn lên thành 3 trang.
  const totalPages = filteredTransactions ? Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) : 1; // Tính tổng số trang dựa trên số lượng giao dịch đã lọc và số giao dịch mỗi trang.Dùng Math.ceil để làm tròn lên là ra tổng số trang.

  const paginatedTransactions = filteredTransactions?.slice( // Cắt dữ liệu theo trang hiện tại,Dùng .slice(start, end) để lấy dữ liệu trang hiện tại.
    (currentPage - 1) * ITEMS_PER_PAGE, // Chỉ mục bắt đầu
    currentPage * ITEMS_PER_PAGE // Chỉ mục kết thúc
  );//sau khi cắt trang thi ở giao diện sẽ lấy cái này để hiển thị


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
                <th className="px-4 py-2 border-b border-gray-300">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions?.map((tx) => (//duyệt ds đã phân trang
                <tr key={tx._id} className="cursor-pointer">
                  <td className="px-4 py-2 border-b border-r border-gray-300 max-w-[150px]">
                    <span
                      title={tx._id}
                      className="inline-block overflow-hidden overflow-ellipsis whitespace-nowrap"
                    >
                      {/* rút gọn mã giao dịch */}
                      {`${tx._id.slice(0, 10)}${tx._id.length > 10 ? "..." : ""}`}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b border-r border-gray-300">{tx.userName}</td>
                  <td className="px-4 py-2 border-b border-r border-gray-300">
                    {tx.paymentMethod.charAt(0).toUpperCase() + tx.paymentMethod.slice(1)}
                  </td>
                  <td className="px-4 py-2 border-b border-r border-gray-300">
                    {tx.amount.toLocaleString()} VNĐ
                  </td>
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
                  <td colSpan={6} className="text-left py-4">
                    Đang tải...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phân trang */}
      {filteredTransactions && totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
          // khi bấm, giảm số trang hiện tại currentPage đi 1
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
          // khi bấm, tăng currentPage lên 1 nhưng không vượt quá totalPages.
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}
