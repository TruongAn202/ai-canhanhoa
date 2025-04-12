import { BarChart3 } from "lucide-react";

export default function Sidebar({ tab, setTab }: { tab: string; setTab: (value: string) => void }) {
  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-300">
      <nav className="space-y-4 text-sm">
        <div
          onClick={() => setTab("dashboard")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${
            tab === "dashboard" ? "text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          <BarChart3 size={16} /> Dashboard
        </div>
        <div
          onClick={() => setTab("payments")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${
            tab === "payments" ? "text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          💳 Quản lý thanh toán
        </div>
        <div
          onClick={() => setTab("accounts")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${
            tab === "accounts" ? "text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          👤 Quản lý tài khoản
        </div>
        <div
          onClick={() => setTab("support")}
          className={`flex items-center gap-2 cursor-pointer font-medium ${
            tab === "support" ? "text-black" : "text-gray-500 hover:text-black"
          }`}
        >
          💬 Yêu cầu hỗ trợ
        </div>
      </nav>
    </aside>
  );
}
