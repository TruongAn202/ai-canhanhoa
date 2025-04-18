import { createContext } from "react";

export const XacThucContext = createContext<any>({
    user: null,
    setUser: () => {}, // mới khởi tạo context (chưa có Provider bao quanh), tạm gán một hàm rỗng: () => {}.
    isLoadingUser: true, //trang thai load, tranh tinh trang chua load xong thi da bi xac nhan la null, tra ve /sign-in
  });
  