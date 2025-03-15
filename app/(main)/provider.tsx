"use client";
import React, { use, useContext, useEffect, useState } from "react";
import Header from "./_components/Header";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useRouter } from "next/navigation"; // Dùng cho App Router, nhớ chọn đúng
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { XacThucContext } from "@/context/XacThucContext";
import { CaNhanHoaContext } from "@/context/CaNhanHoaContext";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const convex = useConvex(); //khai bao convex de lay du lieu
  const { user, setUser } = useContext(XacThucContext);
  const [canhanhoa,setCaNhanHoa]=useState(); //khai bao cai nay dung ở CaNhanHoaContext.Provider value={{}}
  useEffect(() => {
    KiemTraXacThucUser();
  }, []);
  const KiemTraXacThucUser = async () => {
    const token = localStorage.getItem("user_token"); //lay token luu trong local stroage
    const user = token && (await GetAuthUserData(token));
    if (!user?.email) {
      //neu chua dang nhap chuyen qua trang sign-in
      router.replace("/sign-in");
      return;
    }
    //lay du lieu tu data base
    try {
      const result = await convex.query(api.users.GetUser, {
        //lay ra email tu hàm getUser
        email: user?.email,
      });
      //console.log(result);
      setUser(result);
    } catch (e) {}
  };
  return (
    <div>
      <CaNhanHoaContext.Provider value={{canhanhoa,setCaNhanHoa}}>
        <Header />
        {children}
      </CaNhanHoaContext.Provider>
    </div>
  );
}

export default Provider;
