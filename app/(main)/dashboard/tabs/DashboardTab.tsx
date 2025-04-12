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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white text-black border border-gray-300">
          <CardContent className="p-4">
            <div className="font-bold text-lg mb-2">Tổng quan</div>
            <p className="text-sm text-gray-600 mb-3">
              Xem biểu đồ thống kê doanh thu và người dùng.
            </p>
            <Tabs defaultValue="doanhthu">
              <TabsList className="bg-gray-200">
                <TabsTrigger value="doanhthu">Doanh thu</TabsTrigger>
                <TabsTrigger value="nguoidung">Người dùng</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="h-48 bg-gradient-to-t from-blue-300 to-blue-100 mt-4 rounded" />
          </CardContent>
        </Card>
        <Card className="bg-white text-black border border-gray-300">
          <CardContent className="p-4">
            <div className="font-bold text-lg mb-2">Khách hàng gần đây</div>
            <p className="text-sm text-gray-600 mb-3">Khách hàng đăng kí gần đây nhất.</p>
            <div className="grid grid-cols-2 text-sm font-medium border-b border-gray-300 pb-1">
              <div>Khách hàng</div>
              <div>Plan</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
