"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

type HeaderProps = {
  tab: string;
};

const placeholderMap: Record<string, string> = {
  support: "Tìm theo email...",
  payments: "Tìm theo mã giao dịch...",
  blogs: "Tìm theo tiêu đề bài viết...",
  accounts: "Tìm theo email người dùng...",
};

export default function Header({ tab }: HeaderProps) {
  const placeholder = placeholderMap[tab] || "Tìm kiếm...";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 w-full max-w-md border border-gray-300 rounded px-3 py-1 bg-white">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent text-black outline-none"
          value={currentQuery}
          onChange={handleChange}
        />
      </div>
      <hr className="mt-4 border-t border-gray-300" />
    </div>
  );
}
