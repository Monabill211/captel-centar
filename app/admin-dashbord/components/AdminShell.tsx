"use client";

import { useState } from "react";
import AdminHeader from "../haedaer";
import AdminSidebar from "../saidbar";

export default function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AdminSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <AdminHeader
          title={title}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main style={{ padding: "28px", flex: 1 }}>{children}</main>
      </div>
    </>
  );
}
