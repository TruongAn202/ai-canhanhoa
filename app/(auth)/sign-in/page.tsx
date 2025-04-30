"use client";
import { Button } from "@/components/ui/button";
import { XacThucContext } from "@/context/XacThucContext";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Header from "@/app/(main)/_components/HeaderHome";

//chi can tao trang page trong thu muc auth/sign-in là se co trang http://localhost:3000/sign-in
function SignIn() {
  const TaoUser = useMutation(api.users.TaoUser); //lay ham tao user bên users.ts
  const {user,setUser}=useContext(XacThucContext); //	Truy cập context
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    // import useGoogleLogin từ @react-oauth/google
    onSuccess: async (tokenResponse) => {//dn thanh cong
      //console.log(tokenResponse);
  
      if (typeof window !== "undefined") {//dam bao chay o client
        // Lưu token vào localStorage
        localStorage.setItem("user_token", tokenResponse.access_token); 
      }
  
      const user = await GetAuthUserData(tokenResponse.access_token); // dung token de lay thong tin user
  
      const result = await TaoUser({ //dùng hàm taouser cua convex, chua co tk thi tao moi
        name: user?.name,
        email: user?.email,
        picture: user.picture,
      });
  
      setUser(result); // tra full bảng
  
      
      const userWithRole = result as { role?: string };//ép kieu de kq tra ve hieu la co role
      if (userWithRole.role === "admin") {
        router.replace("/dashboard");
      } else {
        router.replace("/ai-canhanhoa");
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  
  return (
    <>
    
    <div className="flex items-center flex-col justify-center h-screen">
      <div className=" flex flex-col items-center gap-4 border rounded-2xl p-10 shadow-md">
        {/* /logo.svg thì nextjs tu dong hieu ban muon truy cap vao duong dan chua logo */}
        <Image src={"/logo.svg"} alt="logo" width={300} height={300} />
        <h2 className="text-2xl">Đăng Nhập AI Cá Nhân Hóa Của Bạn</h2>

        {/* click vao hien thi dang nhap bang google */}
        <Button className="cursor-pointer" onClick={() => googleLogin()}>Đăng nhập với google</Button>
      </div>
    </div>
    </>
  );
  
}

export default SignIn;
