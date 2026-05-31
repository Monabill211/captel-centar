"use client";

import { useMemo, useState } from "react";
import AdminShell from "../components/AdminShell";
import PageHeader from "../components/PageHeader";
import AdminButton from "../components/AdminButton";
import CrudFormModal, { fieldStyle, FormField } from "../components/CrudFormModal";
import { adminTheme } from "../admin-theme";
import { addBook, deleteBook, updateBook } from "@/lib/data/store";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import type { Book } from "@/lib/data/types";

type FormState = Omit<Book, "id"> & { stageText: string };

const emptyForm: FormState = {
  name: "",
  subject: "",
  image: "/img/book1.jpg",
  description: "",
  price: 0,
  author: "",
  stage: [],
  stageText: "",
};

export default function AdminBooksPage() {
  const { books } = useCenterStore();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => a.id - b.id);
  }, [books]);

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

  const openEdit = (b: Book) => {
    setEditingId(b.id);
    setForm({
      ...b,
      stageText: b.stage.join(", "),
    });
    setOpen(true);
  };

  const save = () => {
    const payload: Omit<Book, "id"> = {
      name: form.name.trim(),
      subject: form.subject.trim(),
      image: form.image.trim() || "/img/book1.jpg",
      description: form.description.trim(),
      price: Number(form.price) || 0,
      author: form.author.trim(),
      stage: (form.stageText || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (!payload.name || !payload.subject) return;

    if (editingId) updateBook(editingId, payload);
    else addBook(payload);

    close();
  };

  return (
    <AdminShell title="إدارة الكتب">
      <PageHeader
        tag="BOOKS"
        title="الكتب التعليمية"
        subtitle="أضف الكتب وعدّل بياناتها، وسيظهر نفس المحتوى تلقائياً في صفحات الكتب بالموقع."
      />

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
        <AdminButton onClick={openNew}>+ إضافة كتاب</AdminButton>
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
                {["#", "الكتاب", "المادة", "السعر", "المؤلف", "إجراءات"].map((h) => (
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
              {sortedBooks.map((b) => (
                <tr key={b.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: adminTheme.muted }}>{b.id}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img
                        src={b.image}
                        alt={b.name}
                        style={{ width: "52px", height: "44px", objectFit: "cover", borderRadius: "10px" }}
                      />
                      <div>
                        <div style={{ fontWeight: 900, color: "#111" }}>{b.name}</div>
                        <div style={{ color: adminTheme.muted, fontSize: "0.82rem" }}>
                          {b.stage.join(" • ")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 18px" }}>{b.subject}</td>
                  <td style={{ padding: "14px 18px", fontWeight: 900 }}>{b.price} جنيه</td>
                  <td style={{ padding: "14px 18px" }}>{b.author}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <AdminButton small variant="outline" onClick={() => openEdit(b)}>
                        تعديل
                      </AdminButton>
                      <AdminButton
                        small
                        variant="danger"
                        onClick={() => {
                          if (confirm("حذف هذا الكتاب؟")) deleteBook(b.id);
                        }}
                      >
                        حذف
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedBooks.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: "28px", textAlign: "center", color: adminTheme.muted }}>
                    لا توجد كتب بعد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CrudFormModal
        open={open}
        title={editingId ? "تعديل كتاب" : "إضافة كتاب"}
        onClose={close}
        onSubmit={save}
        submitLabel={editingId ? "تحديث" : "إضافة"}
      >
        <FormField label="اسم الكتاب">
          <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="المادة">
          <input value={form.subject} onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="رابط الصورة (داخل public/img أو رابط خارجي)">
          <input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="وصف مختصر">
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            style={{ ...fieldStyle, resize: "none" }}
          />
        </FormField>
        <FormField label="السعر (جنيه)">
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
            style={fieldStyle}
          />
        </FormField>
        <FormField label="المؤلف">
          <input value={form.author} onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="المراحل (افصل بينهم بفاصلة , )">
          <input
            value={form.stageText}
            onChange={(e) => setForm((p) => ({ ...p, stageText: e.target.value }))}
            style={fieldStyle}
          />
        </FormField>
      </CrudFormModal>
    </AdminShell>
  );
}

