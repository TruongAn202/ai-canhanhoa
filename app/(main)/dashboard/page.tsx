"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardTab from "./tabs/DashboardTab";
import PaymentsTab from "./tabs/PaymentsTab";
import AccountsTab from "./tabs/AccountsTab";
import SupportTab from "./tabs/SupportTab";

export default function DashboardPage() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar tab={tab} setTab={setTab} />
      <main className="flex-1 p-6">
        <Header />
        {tab === "dashboard" && <DashboardTab />}
        {tab === "payments" && <PaymentsTab />}
        {tab === "accounts" && <AccountsTab />}
        {tab === "support" && <SupportTab />}
      </main>
    </div>
  );
}
