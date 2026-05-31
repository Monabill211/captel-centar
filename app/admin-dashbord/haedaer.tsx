"use client";

import { adminTheme } from "./admin-theme";

export default function AdminHeader({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick?: () => void;
}) {
  return (
    <header
      dir="rtl"
      style={{
        background: "#fff",
        borderBottom: `1px solid ${adminTheme.border}`,
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          type="button"
          onClick={onMenuClick}
          className="admin-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
        <h2 style={{ margin: 0, fontWeight: 900, fontSize: "1.1rem", color: "#111" }}>
          {title}
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.85rem",
          color: adminTheme.muted,
        }}
      >
        <span
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: adminTheme.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          أ
        </span>
        مدير السنتر
      </div>
      <style>{`
        @media (max-width: 900px) {
          .admin-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
