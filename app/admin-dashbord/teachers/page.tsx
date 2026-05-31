"use client";

import { useMemo, useState } from "react";
import AdminShell from "../components/AdminShell";
import PageHeader from "../components/PageHeader";
import AdminButton from "../components/AdminButton";
import CrudFormModal, { fieldStyle, FormField } from "../components/CrudFormModal";
import { adminTheme } from "../admin-theme";
import { addTeacher, deleteTeacher, updateTeacher } from "@/lib/data/store";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import type { Teacher } from "@/lib/data/types";

type FormState = Omit<Teacher, "id"> & { stagesText: string };

const emptyForm: FormState = {
  name: "",
  subject: "",
  image: "/img/teacher1.jpg",
  bio: "",
  students: "+0 طالب",
  experience: "",
  rating: 4.8,
  stages: [],
  stagesText: "",
};

export default function AdminTeachersPage() {
  const { teachers } = useCenterStore();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const sorted = useMemo(() => {
    return [...teachers].sort((a, b) => a.id - b.id);
  }, [teachers]);

  const close = () => {
    setOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (t: Teacher) => {
    setEditingId(t.id);
    setForm({
      ...t,
      stagesText: t.stages.join(", "),
    });
    setOpen(true);
  };

  const save = () => {
    const payload: Omit<Teacher, "id"> = {
      name: form.name.trim(),
      subject: form.subject.trim(),
      image: form.image.trim() || "/img/teacher1.jpg",
      bio: form.bio.trim(),
      students: form.students.trim() || "+0 طالب",
      experience: form.experience.trim(),
      rating: Number(form.rating) || 0,
      stages: (form.stagesText || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (!payload.name || !payload.subject) return;

    if (editingId) updateTeacher(editingId, payload);
    else addTeacher(payload);

    close();
  };

  return (
    <AdminShell title="إدارة المدرسين">
      <PageHeader
        tag="TEACHERS"
        title="المدرسون"
        subtitle="أضف المدرسين وعدّل بياناتهم، وسيظهر نفس المحتوى تلقائياً في صفحة المدرسين بالموقع."
      />

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
        <AdminButton onClick={openNew}>+ إضافة مدرس</AdminButton>
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
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }} dir="rtl">
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["#", "المدرس", "المادة", "الخبرة", "التقييم", "إجراءات"].map((h) => (
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
              {sorted.map((t) => (
                <tr key={t.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: adminTheme.muted }}>{t.id}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img
                        src={t.image}
                        alt={t.name}
                        style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "14px" }}
                      />
                      <div>
                        <div style={{ fontWeight: 900, color: "#111" }}>{t.name}</div>
                        <div style={{ color: adminTheme.muted, fontSize: "0.82rem" }}>
                          {t.stages.join(" • ")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 18px" }}>{t.subject}</td>
                  <td style={{ padding: "14px 18px" }}>{t.experience}</td>
                  <td style={{ padding: "14px 18px", fontWeight: 900, color: adminTheme.secondary }}>
                    {t.rating}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <AdminButton small variant="outline" onClick={() => openEdit(t)}>
                        تعديل
                      </AdminButton>
                      <AdminButton
                        small
                        variant="danger"
                        onClick={() => {
                          if (confirm("حذف هذا المدرس؟")) deleteTeacher(t.id);
                        }}
                      >
                        حذف
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: "28px", textAlign: "center", color: adminTheme.muted }}>
                    لا يوجد مدرسون بعد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CrudFormModal
        open={open}
        title={editingId ? "تعديل مدرس" : "إضافة مدرس"}
        onClose={close}
        onSubmit={save}
        submitLabel={editingId ? "تحديث" : "إضافة"}
      >
        <FormField label="اسم المدرس">
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="المادة">
          <input value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="رابط الصورة">
          <input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="نبذة قصيرة">
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            style={{ ...fieldStyle, resize: "none" }}
          />
        </FormField>
        <FormField label="عدد الطلاب (مثال: +1200 طالب)">
          <input value={form.students} onChange={(e) => setForm((p) => ({ ...p, students: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="الخبرة (مثال: 10 سنوات)">
          <input value={form.experience} onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="التقييم (0 - 5)">
          <input
            type="number"
            step="0.1"
            value={form.rating}
            onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
            style={fieldStyle}
          />
        </FormField>
        <FormField label="المراحل (افصل بينهم بفاصلة , )">
          <input
            value={form.stagesText}
            onChange={(e) => setForm((p) => ({ ...p, stagesText: e.target.value }))}
            style={fieldStyle}
          />
        </FormField>
      </CrudFormModal>
    </AdminShell>
  );
}

