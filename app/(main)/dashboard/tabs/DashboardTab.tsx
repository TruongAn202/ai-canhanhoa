import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardTab() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Tổng doanh thu", value: "100.000.000" },
          { label: "Tổng đơn hàng", value: "10" },
          { label: "Tổng số khách hàng", value: "50" },
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
          <div className="font-bold text-lg mb-2">Khách hàng gần đây</div>
          <p className="text-sm text-gray-600 mb-3">Khách hàng đăng kí gần đây nhất.</p>
          <div className="grid grid-cols-2 text-sm font-medium border-b border-gray-300 pb-1">
            <div>Khách hàng</div>
            <div>Plan</div>
          </div>
          {/* Nội dung danh sách cuộn được */}
          <div className="overflow-y-auto mt-2 space-y-2 flex-1">
            {/* Dữ liệu mẫu */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="grid grid-cols-2 text-sm border-b py-1">
                <div>User {i + 1}</div>
                <div>{i % 2 === 0 ? "Pro" : "Free"}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

