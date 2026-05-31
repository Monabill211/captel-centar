"use client";

import AdminShell from "../components/AdminShell";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { adminTheme, bookingStatusLabels } from "../admin-theme";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import { updateTeacherBookingStatus } from "@/lib/data/store";
import type { BookingStatus } from "@/lib/data/types";

const statuses: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminTeacherBookingsPage() {
  const { teacherBookings } = useCenterStore();

  return (
    <AdminShell title="حجوزات المدرسين">
      <PageHeader
        tag="BOOKINGS"
        title="متابعة حجوزات المدرسين"
        subtitle="راجع طلبات حجز المدرسين وحدّث حالتها."
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
        {teacherBookings.length === 0 ? (
          <p style={{ padding: "28px", textAlign: "center", color: adminTheme.muted }}>
            لا توجد حجوزات بعد.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }} dir="rtl">
              <thead>
                <tr style={{ background: "#fafafa" }}>
                  {["المدرس", "بيانات الطالب", "ولي الأمر", "المرحلة", "الوقت", "ملاحظات", "التاريخ", "الحالة", "تحديث"].map(
                    (h) => (
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {teacherBookings.map((b) => (
                  <tr key={b.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 18px", fontWeight: 900 }}>{b.teacherName}</td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800 }}>{b.studentName}</div>
                      <div style={{ color: adminTheme.muted, fontSize: "0.85rem" }}>{b.studentPhone}</div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 800 }}>{b.parentName}</div>
                      <div style={{ color: adminTheme.muted, fontSize: "0.85rem" }}>{b.parentPhone}</div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>{b.stage}</td>
                    <td style={{ padding: "14px 18px" }}>{b.preferredTime}</td>
                    <td style={{ padding: "14px 18px", maxWidth: "260px", color: adminTheme.muted }}>
                      {b.notes || "—"}
                    </td>
                    <td style={{ padding: "14px 18px", color: adminTheme.muted, fontSize: "0.85rem" }}>
                      {new Date(b.createdAt).toLocaleString("ar-EG")}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <StatusBadge statusKey={b.status} label={bookingStatusLabels[b.status]} />
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <select
                        value={b.status}
                        onChange={(e) => updateTeacherBookingStatus(b.id, e.target.value as BookingStatus)}
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
                            {bookingStatusLabels[s]}
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

