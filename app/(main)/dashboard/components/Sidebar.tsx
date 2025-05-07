import { BarChart3 } from "lucide-react";
// Export component Sidebar, nhận 2 props: `tab` (tab đang active), `setTab` (hàm để đổi tab)
//Sidebar nhận vào một object có hai thuộc tính:tab: string: tab phải là một chuỗi.setTab: (value: string) => void: setTab là một hàm nhận vào một chuỗi (value) và không trả về gì (void).
export default function Sidebar({ tab, setTab }: { tab: string; setTab: (value: string) => void }) {
  return (
    // border-r nghĩa là thêm viền bên phải.aside
    <aside className="w-64 bg-white p-4 border-r border-gray-300">
      <div className="text-xl font-semibold text-gray-700 mb-6 px-1">Xin chào, Admin</div>
      {/* Navigation: các mục chọn tab. space-y-4 tạo khoảng cách giữa các mục */}
      <nav className="space-y-4 text-xl">
        <div
          onClick={() => setTab("dashboard")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${tab === "dashboard" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
        >
          <BarChart3 size={24} /> Dashboard 
        </div>
        <div
          onClick={() => setTab("payments")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${tab === "payments" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
        >
          💳 Quản lý thanh toán
        </div>
        <div
          onClick={() => setTab("accounts")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${tab === "accounts" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
        >
          👤 Quản lý tài khoản
        </div>
        <div
          onClick={() => setTab("support")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${tab === "support" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
        >
          💬 Yêu cầu hỗ trợ
        </div>
        <div
          onClick={() => setTab("blogs")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${tab === "blogs" ? "text-black" : "text-gray-500 hover:text-black"
            }`}
        >
          📝 Quản lý Blog
        </div>

      </nav>
    </aside>
  );
}
