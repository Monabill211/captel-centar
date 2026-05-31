import { adminTheme } from "./admin-theme";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: adminTheme.bg,
      }}
    >
      {children}
    </div>
  );
}
