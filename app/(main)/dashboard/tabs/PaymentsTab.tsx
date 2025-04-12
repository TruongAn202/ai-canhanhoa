export default function PaymentsTab() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Quản lý thanh toán</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="px-4 py-2 border-b border-gray-300">Mã giao dịch</th>
                <th className="px-4 py-2 border-b border-gray-300">Người dùng</th>
                <th className="px-4 py-2 border-b border-gray-300">Số tiền</th>
                <th className="px-4 py-2 border-b border-gray-300">Thời gian</th>
              </tr>
            </thead>
            <tbody>{/* Render danh sách giao dịch tại đây */}</tbody>
          </table>
        </div>
      </div>
    );
  }
  