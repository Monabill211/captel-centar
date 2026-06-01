"use client";

import { motion, AnimatePresence } from "framer-motion";
import AdminButton from "./AdminButton";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1.5px solid #e5e7eb",
  outline: "none",
  fontSize: "0.9rem",
  background: "#fafafa",
  boxSizing: "border-box",
  direction: "rtl",
  textAlign: "right",
  color: "#111",
};

export function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label
        style={{
          display: "block",
          fontWeight: 700,
          fontSize: "0.85rem",
          color: "#374151",
          marginBottom: "6px",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export { fieldStyle };

export default function CrudFormModal({
  open,
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = "حفظ",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  submitLabel?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 100,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: "fixed",
              top: "5%",
              left: "25%",
              transform: "translate(-50%, -50%)",
              zIndex: 101,
              background: "#fff",
              borderRadius: "24px",
              padding: "28px",
              width: "min(520px, 92vw)",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
            dir="rtl"
          >
            <h3
              style={{
                fontWeight: 900,
                fontSize: "1.2rem",
                margin: "0 0 20px",
                color: "#111",
              }}
            >
              {title}
            </h3>
            {children}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                justifyContent: "flex-start",
              }}
            >
              <AdminButton onClick={onSubmit}>{submitLabel}</AdminButton>
              <AdminButton variant="outline" onClick={onClose}>
                إلغاء
              </AdminButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
