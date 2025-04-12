"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { XacThucContext } from "@/context/XacThucContext";

export default function Header() {
  const pathname = usePathname(); //lấy đường dẫn hiện tại
  const { user } = useContext(XacThucContext);

  const linkClass = (href: string) => //kiem tra xem phai la duong dan dang dc click khong, neu co thi hover
    `hover:text-pink-600 transition ${
      pathname === href ? "text-pink-600 font-semibold" : ""
    }`;

  return (
    <div className="px-14 py-4 shadow-sm flex justify-between items-center w-full bg-white">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={150} height={150} />
      </Link>

      {/* Menu điều hướng */}
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        <Link href="/documentation" className={linkClass("/documentation")}>
          Tài Liệu
        </Link>
        <Link href="/pricing" className={linkClass("/pricing")}>
          Đăng Ký Gói
        </Link>
        <Link href="/blog" className={linkClass("/blog")}>
          Blog
        </Link>
        <Link href="/about" className={linkClass("/about")}>
          Về Chúng Tôi
        </Link>
        <Link href="/lienhe" className={linkClass("/lienhe")}>
          Liên hệ
        </Link>
      </nav>

      {/* Nếu chưa đăng nhập, hiển thị nút bắt đầu */}
      {!user && (
        <Link href="/sign-in">
          <Button variant="outline" className="cursor-pointer">
            Bắt đầu
          </Button>
        </Link>
      )}
    </div>
  );
}
