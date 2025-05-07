"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

type HeaderProps = {
  tab: string;// Prop nhận vào để xác định tab hiện tại (ví dụ: "support", "payments", v.v.)
};

const placeholderMap: Record<string, string> = { //place holder thay đổi theo trang
  support: "Tìm theo email...",
  payments: "Tìm theo mã giao dịch...",
  blogs: "Tìm theo tiêu đề bài viết...",
  accounts: "Tìm theo email người dùng...",
};

export default function Header({ tab }: HeaderProps) {
  const placeholder = placeholderMap[tab] || "Tìm kiếm...";//chọn placeholder, nếu ko thì mac dinh

  const router = useRouter();//chuyen huong ng dung
  const pathname = usePathname(); //lay path hien tai
  const searchParams = useSearchParams();//Lấy danh sách query hiện tại từ URL
  const currentQuery = searchParams.get("q") || "";// Lấy giá trị tìm kiếm hiện tại (nếu có), mặc định là chuỗi rỗng

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value; // Lấy giá trị mới từ ô input
    const params = new URLSearchParams(searchParams);// Tạo bản sao có thể chỉnh sửa của searchParams

    if (newQuery) {
      params.set("q", newQuery);//neu co noi dung thi cap nhat gia tri q
    } else {
      params.delete("q");//neu ko thi xoa q ở url
    }
    router.push(`${pathname}?${params.toString()}`);//Cập nhật URL với query mới mà không reload trang
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 w-full max-w-md border border-gray-300 rounded px-3 py-1 bg-white">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder={placeholder}// Placeholder theo tab
          className="flex-1 bg-transparent text-black outline-none"
          value={currentQuery}//gia tri hien tai cua input
          onChange={handleChange}//goi ham khi ng dung thay doi noi dung
        />
      </div>
      <hr className="mt-4 border-t border-gray-300" />
    </div>
  );
}
