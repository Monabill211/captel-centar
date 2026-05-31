"use client";

import { useMemo, useState } from "react";
import AdminShell from "../components/AdminShell";
import PageHeader from "../components/PageHeader";
import AdminButton from "../components/AdminButton";
import CrudFormModal, { fieldStyle, FormField } from "../components/CrudFormModal";
import { adminTheme } from "../admin-theme";
import { addBlog, deleteBlog, updateBlog } from "@/lib/data/store";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import type { Blog } from "@/lib/data/types";

type FormState = Omit<Blog, "id">;

const emptyForm: FormState = {
  image:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  tag: "نصائح",
  title: "",
  excerpt: "",
  content: "",
};

export default function AdminBlogsPage() {
  const { blogs } = useCenterStore();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const sorted = useMemo(() => {
    return [...blogs].sort((a, b) => a.id - b.id);
  }, [blogs]);

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

  const openEdit = (b: Blog) => {
    setEditingId(b.id);
    setForm({
      image: b.image,
      tag: b.tag,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
    });
    setOpen(true);
  };

  const save = () => {
    const payload: Omit<Blog, "id"> = {
      image: form.image.trim(),
      tag: form.tag.trim(),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
    };

    if (!payload.title || !payload.excerpt) return;

    if (editingId) updateBlog(editingId, payload);
    else addBlog(payload);

    close();
  };

  return (
    <AdminShell title="إدارة المدونة">
      <PageHeader
        tag="BLOG"
        title="المدونة"
        subtitle="أضف مقالات ونصائح تعليمية، وسيظهر نفس المحتوى في صفحة المدونة بالموقع."
      />

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
        <AdminButton onClick={openNew}>+ إضافة مقال</AdminButton>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "18px",
        }}
      >
        {sorted.map((b) => (
          <div
            key={b.id}
            style={{
              background: "#fff",
              borderRadius: "20px",
              border: `1px solid ${adminTheme.border}`,
              boxShadow: adminTheme.cardShadow,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: "160px", overflow: "hidden" }}>
              <img
                src={b.image}
                alt={b.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
              <span style={{ color: adminTheme.secondary, fontWeight: 800, fontSize: "0.78rem" }}>
                {b.tag}
              </span>
              <h3 style={{ margin: 0, fontWeight: 900, color: "#111", fontSize: "1rem", lineHeight: 1.5 }}>
                {b.title}
              </h3>
              <p style={{ margin: 0, color: adminTheme.muted, fontSize: "0.85rem", lineHeight: 1.75, flex: 1 }}>
                {b.excerpt}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <AdminButton small variant="outline" onClick={() => openEdit(b)}>
                  تعديل
                </AdminButton>
                <AdminButton
                  small
                  variant="danger"
                  onClick={() => {
                    if (confirm("حذف هذا المقال؟")) deleteBlog(b.id);
                  }}
                >
                  حذف
                </AdminButton>
              </div>
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <div
            style={{
              gridColumn: "1/-1",
              background: "#fff",
              borderRadius: "20px",
              border: `1px solid ${adminTheme.border}`,
              boxShadow: adminTheme.cardShadow,
              padding: "28px",
              textAlign: "center",
              color: adminTheme.muted,
            }}
          >
            لا توجد مقالات بعد.
          </div>
        )}
      </div>

      <CrudFormModal
        open={open}
        title={editingId ? "تعديل مقال" : "إضافة مقال"}
        onClose={close}
        onSubmit={save}
        submitLabel={editingId ? "تحديث" : "إضافة"}
      >
        <FormField label="عنوان المقال">
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="التصنيف (Tag)">
          <input value={form.tag} onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="رابط صورة المقال">
          <input value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} style={fieldStyle} />
        </FormField>
        <FormField label="ملخص قصير (يظهر في الكروت)">
          <textarea
            rows={3}
            value={form.excerpt}
            onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
            style={{ ...fieldStyle, resize: "none" }}
          />
        </FormField>
        <FormField label="المحتوى الكامل (اختياري الآن)">
          <textarea
            rows={6}
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            style={{ ...fieldStyle, resize: "vertical" }}
          />
        </FormField>
      </CrudFormModal>
    </AdminShell>
  );
}

