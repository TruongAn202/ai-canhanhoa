"use client";
import React, { useEffect,useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { XacThucContext } from "@/context/XacThucContext";


function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    //Lưu user vào localStorage khi thay đổi
    useEffect(() => { // nếu tồn tại user thì lưu vào de nhớ khi load lai trang
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }, [user]);// chỉ chạy khi user thay đổi
  
    //tải thông tin user từ localStorage khi app khởi động
    useEffect(() => {
      const storedUser = localStorage.getItem("user"); // lay thong tin từ localStogare
      if (storedUser) {
        setUser(JSON.parse(storedUser));//Cập nhật state user từ localStorage
      }
      setIsLoadingUser(false);
    }, []);//chỉ chạy 1 lần

  return (
    //Cung cấp Google OAuth context cho toàn bộ ứng dụng,xac thuc tai khoan gg
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {/* Bao toàn app bằng Convex Provider, có thể gọi useQuery, useMutation... từ Convex (cơ sở dữ liệu realtime/serverless). */}
      <ConvexProvider client={convex}>
        {/* chia sẽ trang thai dang nhập khap app */}
      <XacThucContext.Provider value={{ user, setUser, isLoadingUser }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            forcedTheme="light"
          >
            <div>{children}</div>
          </NextThemesProvider>
        </XacThucContext.Provider>
      </ConvexProvider>
      {/* ; dau ; cho nay lam cho app render ra du thua dau ; */}
    </GoogleOAuthProvider>
  );
}

export default Provider;
