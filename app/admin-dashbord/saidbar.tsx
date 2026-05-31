"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminTheme } from "./admin-theme";

const navItems = [
  { href: "/admin-dashbord", label: "نظرة عامة", icon: "📊" },
  { href: "/admin-dashbord/books", label: "الكتب", icon: "📚" },
  { href: "/admin-dashbord/teachers", label: "المدرسون", icon: "👨‍🏫" },
  { href: "/admin-dashbord/blogs", label: "المدونة", icon: "✍️" },
  { href: "/admin-dashbord/book-orders", label: "طلبات الكتب", icon: "📦" },
  {
    href: "/admin-dashbord/teacher-bookings",
    label: "حجوزات المدرسين",
    icon: "📅",
  },
];

export default function AdminSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const content = (
    <aside
      dir="rtl"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: adminTheme.sidebarBg,
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <Link href="/" onClick={onClose} style={{ textDecoration: "none" }}>
        <div style={{ marginBottom: "32px", padding: "0 8px" }}>
          <h2
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "1.25rem",
              margin: 0,
            }}
          >
            سنتر{" "}
            <span style={{ color: adminTheme.secondary }}>كابيتال</span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.75rem",
              margin: "6px 0 0",
            }}
          >
            لوحة التحكم
          </p>
        </div>
      </Link>

      <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin-dashbord" &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "14px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: active ? "#fff" : "rgba(255,255,255,0.65)",
                background: active ? adminTheme.gradient : "transparent",
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", paddingTop: "24px" }}>
        <Link
          href="/"
          style={{
            display: "block",
            textAlign: "center",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          ← العودة للموقع
        </Link>
      </div>
    </aside>
  );

  return (
    <>
      <div className="admin-sidebar-desktop">{content}</div>
      {mobileOpen && (
        <>
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 40,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              zIndex: 50,
            }}
          >
            {content}
          </div>
        </>
      )}
      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar-desktop { display: none !important; }
        }
        @media (min-width: 901px) {
          .admin-sidebar-desktop { display: block !important; }
        }
      `}</style>
    </>
  );
}
