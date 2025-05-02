"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { XacThucContext } from "@/context/XacThucContext";
import { Button } from "@/components/ui/button";
import Header from "../(main)/_components/HeaderHome";
import Footer from "@/components/footer/Footer";

function Pricing() {
  const { user } = useContext(XacThucContext);
  const router = useRouter();

  const handleUpgrade = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      // Nếu đã đăng nhập, chuyển đến trang thanh toán hoặc xử lý nâng cấp
      router.push("/ai-canhanhoa"); // hoặc bất kỳ trang nào bạn muốn
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Gói Pro duy nhất</h1>
        <p className="text-gray-600 text-lg mb-10">
          Truy cập đầy đủ tính năng AI cá nhân hóa và 500.000 tokens mỗi tháng chỉ với 200.000đ.
        </p>

        <div className="border rounded-2xl shadow-xl p-8 bg-white max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">Pro Plan</h2>
          <p className="text-5xl font-extrabold text-pink-600 mb-2">200.000đ</p>
          <p className="text-gray-500 mb-6">/ tháng</p>

          <ul className="text-left mb-6 space-y-3">
            <li className="flex items-center gap-2">✅ Truy cập toàn bộ AI cá nhân hóa</li>
            <li className="flex items-center gap-2">✅ Có ngay 500.000 tokens</li>
            <li className="flex items-center gap-2">✅ Hỗ trợ nhanh chóng từ đội ngũ</li>
            <li className="flex items-center gap-2">✅ Ưu tiên cập nhật tính năng mới</li>
          </ul>

          <Button
            className="cursor-pointer w-full bg-pink-600 text-white font-semibold py-3 rounded-xl hover:bg-pink-600 transition"
            onClick={handleUpgrade}
          >
            Nâng cấp ngay
          </Button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Hủy bất cứ lúc nào. Không ràng buộc hợp đồng.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
