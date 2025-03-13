"use client";
import { Button } from "@/components/ui/button";
import { XacThucContext } from "@/context/XacThucContext";
import { api } from "@/convex/_generated/api";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useContext } from "react";

//chi can tao trang page trong thu muc auth/sign-in là se co trang http://localhost:3000/sign-in
function SignIn() {
  const TaoUser = useMutation(api.users.TaoUser); //lay ham tao user bên users.ts
  const {user,setUser}=useContext(XacThucContext);
  const googleLogin = useGoogleLogin({
    //import useGoogleLogin từ @react-oauth/google
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      if (typeof window !== undefined) {
        localStorage.setItem("user_token", tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);
      //save user info
      //console.log(user);
      const result = await TaoUser({
        name: user?.name,
        email: user?.email,
        picture: user.picture,
      });
      //console.log(" ", result);
      setUser(result);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div className="flex items-center flex-col justify-center h-screen">
      <div className=" flex flex-col items-center gap-4 border rounded-2xl p-10 shadow-md">
        {/* /logo.svg thì nextjs tu dong hieu ban muon truy cap vao duong dan chua logo */}
        <Image src={"/logo.svg"} alt="logo" width={300} height={300} />
        <h2 className="text-2xl">Đăng Nhập AI Cá Nhân Hóa Của Bạn</h2>

        {/* click vao hien thi dang nhap bang google */}
        <Button onClick={() => googleLogin()}>Đăng nhập với google</Button>
      </div>
    </div>
  );
}

export default SignIn;
