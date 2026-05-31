"use client";

import AdminShell from "../components/AdminShell";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { adminTheme, orderStatusLabels } from "../admin-theme";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import { updateBookOrderStatus } from "@/lib/data/store";
import type { OrderStatus } from "@/lib/data/types";

const statuses: OrderStatus[] = ["pending", "confirmed", "delivered", "cancelled"];

export default function AdminBookOrdersPage() {
  const { bookOrders } = useCenterStore();

  return (
    <AdminShell title="طلبات الكتب">
      <PageHeader
        tag="ORDERS"
        title="متابعة طلبات الكتب"
        subtitle="راجع طلبات الكتب وحدّث حالتها (مراجعة/تأكيد/تسليم/إلغاء)."
      />

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: `1px solid ${adminTheme.border}`,
          boxShadow: adminTheme.cardShadow,
          overflow: "hidden",
        }}
      >
        {bookOrders.length === 0 ? (
          <p style={{ padding: "28px", textAlign: "center", color: adminTheme.muted }}>
            لا توجد طلبات كتب بعد.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }} dir="rtl">
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  {["الكتاب", "بيانات الطالب", "ولي الأمر", "العنوان", "التاريخ", "الحالة", "تحديث"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 18px",
                        textAlign: "right",
                        fontSize: "0.8rem",
                        color: adminTheme.muted,
                        fontWeight: 800,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookOrders.map((o) => (
                  <tr key={o.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 18px", fontWeight: 900 }}>{o.bookTitle}</td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800 }}>{o.studentName}</div>
                      <div style={{ color: adminTheme.muted, fontSize: "0.85rem" }}>{o.studentPhone}</div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800 }}>{o.parentName}</div>
                      <div style={{ color: adminTheme.muted, fontSize: "0.85rem" }}>{o.parentPhone}</div>
                    </td>
                    <td style={{ padding: "14px 18px", maxWidth: "260px" }}>{o.address}</td>
                    <td style={{ padding: "14px 18px", color: adminTheme.muted, fontSize: "0.85rem" }}>
                      {new Date(o.createdAt).toLocaleString("ar-EG")}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <StatusBadge statusKey={o.status} label={orderStatusLabels[o.status]} />
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <select
                        value={o.status}
                        onChange={(e) => updateBookOrderStatus(o.id, e.target.value as OrderStatus)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "12px",
                          border: "1.5px solid #e5e7eb",
                          background: "#fafafa",
                          fontWeight: 700,
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {orderStatusLabels[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

