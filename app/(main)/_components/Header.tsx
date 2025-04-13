"use client"
import { XacThucContext } from '@/context/XacThucContext'
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"; //phai dung navigaton vì useRouter() chỉ hoạt động với Pages Router (thư mục /pages), nhưng hiện tại đang dùng app router
import React, { useContext, useEffect, useRef, useState } from 'react'
import { googleLogout } from '@react-oauth/google' //dang xuat googles

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isPersonalizedAI = pathname === "/ai-canhanhoa";
  const isDashboard = pathname === "/dashboard";
  const { user, setUser } = useContext(XacThucContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null); 

  // Click ra ngoài thì ẩn dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div className={`pl-8 shadow-sm flex justify-between items-center px-14 ${isPersonalizedAI || isDashboard ? '' : 'fixed'}`}>
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