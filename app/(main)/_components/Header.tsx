"use client"
import { XacThucContext } from '@/context/XacThucContext'
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"; //phai dung navigaton vì useRouter() chỉ hoạt động với Pages Router (thư mục /pages), nhưng hiện tại đang dùng app router
import React, { useContext, useEffect, useRef, useState } from 'react'
import { googleLogout } from '@react-oauth/google' //dang xuat googles

function Header() {
  const pathname = usePathname();//Trả về đường dẫn hiện tại (pathname) của trang
  const router = useRouter();//Cung cấp đối tượng router để điều khiển chuyển hướng (navigation) trong ứng dụng
  const isPersonalizedAI = pathname === "/ai-canhanhoa";
  const isDashboard = pathname === "/dashboard";
  const { user, setUser } = useContext(XacThucContext);//thong tin user da dang nhap

  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null); 

  // Click ra ngoài thì ẩn dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => { // Xử lý khi click ra ngoài dropdown
      if (avatarRef.current && !avatarRef.current.contains(event.target)) { // Nếu click không nằm trong avatarRef
        setShowDropdown(false); // Ẩn dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside); // Thêm sự kiện lắng nghe click chuột
    return () => document.removeEventListener('mousedown', handleClickOutside);// Cleanup khi unmount
  }, []);// Chạy 1 lần sau khi component mount

  // Hàm đăng xuất
  const handleLogout = () => {
    googleLogout(); // Xóa session Google
    setUser(null); // Xóa context user
  
    localStorage.clear();
    sessionStorage.clear();
  
    // Xóa cookie (nếu có)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  
    setTimeout(() => {
      router.push("/sign-in");
    }, 100); // Delay nhỏ để đảm bảo state được reset
  };
  
  return (
    //  flex justify-between items-center: Flex box, căn giữa và tách phần tử 2 bên
    <div className={`border-b border-gray-300 pl-8 shadow-sm flex justify-between items-center px-14 ${isPersonalizedAI || isDashboard ? '' : 'fixed'}`}>
      <Image src={'/logo.svg'} alt='logo' width={isPersonalizedAI || isDashboard ? 200 : 40} height={isPersonalizedAI || isDashboard ? 200 : 40} />

      {user?.picture && (
        <div className="relative" ref={avatarRef}>
          <Image
            src={user.picture}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          
          {showDropdown && (
            //rounded	Bo góc. z-50 là z-index để nổi lên cao
            //block: Hiển thị như một khối chiếm toàn bộ chiều ngang.
            //px-4	Padding ngang(trai phai), py padding dọc
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header