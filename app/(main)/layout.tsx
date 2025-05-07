import React from "react";
import Provider from "./provider";//để các thành phần bên trong có thể truy cập shared state hoặc logic.

function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //Tất cả children (tức là trang con, layout con...) sẽ được bọc bởi Provider de chia sẽ thông tin
    <div>
      <Provider>{children}</Provider>
    </div>
  )
}

export default WorkspaceLayout
