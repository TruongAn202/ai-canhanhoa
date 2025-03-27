"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { XacThucContext } from "@/context/XacThucContext"; // Import context xác thực

export default function Header() {
  const pathname = usePathname();
  const { user } = useContext(XacThucContext);

  return (
    <div className="px-14 py-4 shadow-sm flex justify-between items-center w-full bg-white">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={150} height={150} />
      </Link>

      {/* Menu điều hướng */}
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        <Link href="/documentation" className="hover:text-blue-600 transition">
          Tài Liệu
        </Link>
        <Link href="/pricing" className="hover:text-blue-600 transition">
          Đăng Ký Gói
        </Link>
        <Link href="/blog" className="hover:text-blue-600 transition">
          Blog
        </Link>
        <Link href="/about" className="hover:text-blue-600 transition">
          Về Chúng Tôi
        </Link>
      </nav>

      {/* Nếu chưa đăng nhập, hiển thị nút bắt đầu */}
      {!user && (
        <Link href="/sign-in">
          <Button variant="outline">Bắt đầu</Button>
        </Link>
      )}
    </div>
  );
}
