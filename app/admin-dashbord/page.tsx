"use client";

import Link from "next/link";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import AdminShell from "./components/AdminShell";
import PageHeader from "./components/PageHeader";
import StatCard from "./components/StatCard";
import StatusBadge from "./components/StatusBadge";
import { adminTheme, bookingStatusLabels, orderStatusLabels } from "./admin-theme";

export default function AdminOverviewPage() {
  const { books, teachers, blogs, bookOrders, teacherBookings } =
    useCenterStore();

  const pendingBooks = bookOrders.filter((o) => o.status === "pending").length;
  const pendingTeachers = teacherBookings.filter(
    (b) => b.status === "pending"
  ).length;

  const recentOrders = [...bookOrders, ...teacherBookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return (
    <AdminShell title="نظرة عامة على السنتر">
      <PageHeader
        tag="DASHBOARD"
        title="متابعة السنتر"
        subtitle="ملخص سريع لكل ما يحدث في سنتر كابيتال — الكتب، المدرسين، المدونة، والطلبات."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <StatCard label="الكتب" value={books.length} icon="📚" delay={0} />
        <StatCard
          label="المدرسون"
          value={teachers.length}
          icon="👨‍🏫"
          delay={0.05}
        />
        <StatCard label="المقالات" value={blogs.length} icon="✍️" delay={0.1} />
        <StatCard
          label="طلبات كتب معلقة"
          value={pendingBooks}
          icon="📦"
          delay={0.15}
        />
        <StatCard
          label="حجوزات معلقة"
          value={pendingTeachers}
          icon="📅"
          delay={0.2}
        />
        <StatCard
          label="إجمالي الطلبات"
          value={bookOrders.length + teacherBookings.length}
          icon="📋"
          delay={0.25}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            href: "/admin-dashbord/books",
            title: "إدارة الكتب",
            desc: "إضافة وتعديل الكتب التعليمية",
            icon: "📚",
          },
          {
            href: "/admin-dashbord/teachers",
            title: "إدارة المدرسين",
            desc: "إضافة وتعديل بيانات المدرسين",
            icon: "👨‍🏫",
          },
          {
            href: "/admin-dashbord/blogs",
            title: "إدارة المدونة",
            desc: "نشر مقالات ونصائح تعليمية",
            icon: "✍️",
          },
          {
            href: "/admin-dashbord/book-orders",
            title: "طلبات الكتب",
            desc: "متابعة وحالة طلبات الشراء",
            icon: "📦",
          },
          {
            href: "/admin-dashbord/teacher-bookings",
            title: "حجوزات المدرسين",
            desc: "متابعة طلبات الحجز",
            icon: "📅",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              textDecoration: "none",
              background: "#fff",
              borderRadius: "20px",
              padding: "24px",
              border: `1px solid ${adminTheme.border}`,
              boxShadow: adminTheme.cardShadow,
              transition: "transform 0.2s",
            }}
          >
            <span style={{ fontSize: "2rem" }}>{card.icon}</span>
            <h3
              style={{
                fontWeight: 900,
                color: "#111",
                margin: "12px 0 6px",
                fontSize: "1.05rem",
              }}
            >
              {card.title}
            </h3>
            <p style={{ color: adminTheme.muted, margin: 0, fontSize: "0.88rem" }}>
              {card.desc}
            </p>
          </Link>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: `1px solid ${adminTheme.border}`,
          boxShadow: adminTheme.cardShadow,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6" }}>
          <h3 style={{ margin: 0, fontWeight: 900, fontSize: "1.05rem" }}>
            آخر النشاطات
          </h3>
        </div>
        {recentOrders.length === 0 ? (
          <p
            style={{
              padding: "32px",
              textAlign: "center",
              color: adminTheme.muted,
            }}
          >
            لا توجد طلبات بعد — ستظهر هنا عند حجز الكتب أو المدرسين من الموقع.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  {["النوع", "التفاصيل", "التاريخ", "الحالة"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 20px",
                        textAlign: "right",
                        fontSize: "0.8rem",
                        color: adminTheme.muted,
                        fontWeight: 700,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((item) => {
                  const isBook = "bookTitle" in item;
                  return (
                    <tr
                      key={item.id}
                      style={{ borderTop: "1px solid #f3f4f6" }}
                    >
                      <td style={{ padding: "14px 20px", fontWeight: 700 }}>
                        {isBook ? "📦 كتاب" : "📅 مدرس"}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        {isBook
                          ? (item as { bookTitle: string }).bookTitle
                          : (item as { teacherName: string }).teacherName}
                      </td>
                      <td
                        style={{
                          padding: "14px 20px",
                          color: adminTheme.muted,
                          fontSize: "0.85rem",
                        }}
                      >
                        {new Date(item.createdAt).toLocaleDateString("ar-EG")}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <StatusBadge
                          statusKey={item.status}
                          label={
                            isBook
                              ? orderStatusLabels[item.status]
                              : bookingStatusLabels[item.status]
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
