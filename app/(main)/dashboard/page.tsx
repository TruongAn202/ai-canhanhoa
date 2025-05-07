"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardTab from "./tabs/DashboardTab";
import PaymentsTab from "./tabs/PaymentsTab";
import AccountsTab from "./tabs/AccountsTab";
import SupportTab from "./tabs/SupportTab";
import BlogstTab from "./tabs/QuanLyBlog"

export default function DashboardPage() {
  const [tab, setTab] = useState("dashboard");
  //chuyen tab
  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar tab={tab} setTab={setTab} />
      <main className="flex-1 p-6">
        {/* Dùng  "{tab !== "dashboard" && <Header tab={tab} />}"cái này để cho chuuc nang hien thi place hoder khung search */}
        {tab !== "dashboard" && <Header tab={tab} />}
        {tab === "dashboard" && <DashboardTab />}
        {tab === "payments" && <PaymentsTab />}
        {tab === "accounts" && <AccountsTab />}
        {tab === "support" && <SupportTab />}
        {tab === "blogs" && <BlogstTab />}
      </main>
    </div>
  );  
}
