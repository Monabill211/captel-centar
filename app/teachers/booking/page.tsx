"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import { addTeacherBooking } from "@/lib/data/store";

const stages = ["الابتدائي", "الإعدادي", "الثانوي"];
const timeSlots = ["9:00 ص", "11:00 ص", "1:00 م", "3:00 م", "5:00 م", "7:00 م"];

type FormData = {
  // بيانات الطالب
  studentName: string;
  studentPhone: string;
  stage: string;
  // بيانات ولي الأمر
  parentName: string;
  parentPhone: string;
  // تفاصيل الحجز
  preferredTime: string;
  notes: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F97316" : "#e5e7eb"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ color: "#F97316", fontWeight: 700, fontSize: "0.8rem", marginRight: "4px" }}>
        {rating}
      </span>
    </div>
  );
}

function InputField({
  label, icon, error, children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontWeight: 700, fontSize: "0.88rem", color: "#374151" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", right: "14px", top: "50%",
          transform: "translateY(-50%)", color: "#9ca3af",
          pointerEvents: "none",
        }}>
          {icon}
        </div>
        {children}
      </div>
      {error && (
        <span style={{ color: "#DC2626", fontSize: "0.78rem", fontWeight: 600 }}>
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "13px 44px 13px 16px",
  borderRadius: "12px",
  border: `1.5px solid ${hasError ? "#DC2626" : "#e5e7eb"}`,
  outline: "none",
  fontSize: "0.9rem",
  background: hasError ? "#fff5f5" : "#fafafa",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  textAlign: "right" as const,
  direction: "rtl" as const,
  color: "#111",
});

export default function BookingPage() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { teachers } = useCenterStore();
  const teacher = teachers.find((t) => t.id === id) ?? teachers[0];

  const [form, setForm] = useState<FormData>({
    studentName: "",
    studentPhone: "",
    stage: "",
    parentName: "",
    parentPhone: "",
    preferredTime: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.studentName.trim()) newErrors.studentName = "اسم الطالب مطلوب";
    if (!form.studentPhone.trim()) newErrors.studentPhone = "رقم هاتف الطالب مطلوب";
    else if (!/^01[0-9]{9}$/.test(form.studentPhone)) newErrors.studentPhone = "رقم غير صحيح";
    if (!form.stage) newErrors.stage = "اختر المرحلة الدراسية";
    if (!form.parentName.trim()) newErrors.parentName = "اسم ولي الأمر مطلوب";
    if (!form.parentPhone.trim()) newErrors.parentPhone = "رقم ولي الأمر مطلوب";
    else if (!/^01[0-9]{9}$/.test(form.parentPhone)) newErrors.parentPhone = "رقم غير صحيح";
    if (!form.preferredTime) newErrors.preferredTime = "اختر الوقت المفضل";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addTeacherBooking({
      teacherId: teacher?.id ?? 0,
      teacherName: teacher?.name ?? "مدرس غير معروف",
      studentName: form.studentName,
      studentPhone: form.studentPhone,
      stage: form.stage,
      parentName: form.parentName,
      parentPhone: form.parentPhone,
      preferredTime: form.preferredTime,
      notes: form.notes,
      status: "pending",
    });
    setSubmitted(true);
  };

  return (
    <>
    <Navbar />
    <div dir="rtl" style={{ background: "#fafafa", minHeight: "100vh" }}>

      {/* ══════════ HERO ══════════ */}
      <div style={{
        background: "linear-gradient(135deg, #1a0000 0%, #7f1d1d 50%, #1a0000 100%)",
        padding: "70px 20px 100px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-60px", left: "-60px",
          width: "280px", height: "280px", borderRadius: "50%",
          background: "rgba(249,115,22,0.10)",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", right: "-40px",
          width: "220px", height: "220px", borderRadius: "50%",
          background: "rgba(220,38,38,0.13)",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: "1100px", margin: "auto", textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <span style={{
            color: "#F97316", fontWeight: 700, letterSpacing: "3px",
            fontSize: "0.8rem", display: "block", marginBottom: "14px",
          }}>
            BOOKING
          </span>
          <h1 style={{
            fontSize: "clamp(2rem,5vw,3.5rem)",
            fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: "14px",
          }}>
            احجز{" "}
            <span style={{
              background: "linear-gradient(90deg,#DC2626,#F97316)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              حصتك الآن
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, maxWidth: "440px", margin: "0 auto" }}>
            أكمل البيانات وسيتواصل معك فريقنا لتأكيد الحجز في أقرب وقت.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "-48px auto 0", padding: "0 20px 100px", position: "relative", zIndex: 10 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "28px",
          alignItems: "start",
        }}
          className="booking-grid"
        >

          {/* ══════════ TEACHER CARD ══════════ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#fff",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
              border: "1px solid #f3f4f6",
              position: "sticky",
              top: "24px",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
              <img src={teacher.image} alt={teacher.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
              }} />
              <span style={{
                position: "absolute", top: "12px", right: "12px",
                background: "linear-gradient(135deg,#DC2626,#F97316)",
                color: "#fff", fontWeight: 700, fontSize: "0.7rem",
                borderRadius: "20px", padding: "4px 12px",
              }}>
                {teacher.subject}
              </span>
              <div style={{ position: "absolute", bottom: "12px", right: "14px", left: "14px" }}>
                <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "1.05rem", margin: 0 }}>
                  {teacher.name}
                </h3>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: "20px" }}>
              <StarRating rating={teacher.rating} />

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                {[
                  { icon: "⏱", label: "الخبرة", value: teacher.experience },
                  { icon: "👨‍🎓", label: "الطلاب", value: teacher.students },
                  { icon: "📚", label: "المراحل", value: teacher.stages.join(" • ") },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    background: "#fafafa",
                    borderRadius: "10px",
                  }}>
                    <span style={{ color: "#374151", fontWeight: 700, fontSize: "0.82rem" }}>
                      {item.icon} {item.label}
                    </span>
                    <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div style={{
                marginTop: "16px",
                background: "#fff5f5",
                border: "1px solid #fecaca",
                borderRadius: "12px",
                padding: "12px 14px",
                fontSize: "0.8rem",
                color: "#DC2626",
                lineHeight: 1.7,
              }}>
                📞 سيتواصل معك فريقنا لتأكيد الموعد خلال 24 ساعة.
              </div>
            </div>
          </motion.div>

          {/* ══════════ FORM ══════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "36px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
              border: "1px solid #f3f4f6",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ══ SUCCESS STATE ══ */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    style={{
                      width: "80px", height: "80px", borderRadius: "50%",
                      background: "linear-gradient(135deg,#DC2626,#F97316)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 24px",
                      fontSize: "2rem",
                    }}
                  >
                    ✓
                  </motion.div>
                  <h2 style={{ fontWeight: 900, fontSize: "1.6rem", color: "#111", marginBottom: "12px" }}>
                    تم إرسال طلب الحجز!
                  </h2>
                  <p style={{ color: "#6b7280", lineHeight: 1.8, maxWidth: "360px", margin: "0 auto 28px" }}>
                    شكراً <strong>{form.parentName}</strong>، سيتواصل معك فريقنا على رقم{" "}
                    <strong style={{ color: "#DC2626" }}>{form.parentPhone}</strong> لتأكيد الحجز.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSubmitted(false); setForm({ studentName:"",studentPhone:"",stage:"",parentName:"",parentPhone:"",preferredTime:"",notes:"" }); }}
                    style={{
                      padding: "13px 32px", borderRadius: "14px", border: "none",
                      background: "linear-gradient(135deg,#DC2626,#F97316)",
                      color: "#fff", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                    }}
                  >
                    حجز آخر
                  </motion.button>
                </motion.div>
              ) : (
                /* ══ FORM ══ */
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                  {/* Section: بيانات الطالب */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "10px",
                        background: "linear-gradient(135deg,#DC2626,#F97316)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.9rem", color: "#fff", fontWeight: 900,
                      }}>١</div>
                      <h3 style={{ fontWeight: 900, fontSize: "1.05rem", color: "#111", margin: 0 }}>
                        بيانات الطالب
                      </h3>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                      className="form-grid"
                    >
                      <InputField label="اسم الطالب" error={errors.studentName}
                        icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                      >
                        <input placeholder="الاسم بالكامل" value={form.studentName} onChange={set("studentName")}
                          style={inputStyle(!!errors.studentName)} />
                      </InputField>

                      <InputField label="رقم هاتف الطالب" error={errors.studentPhone}
                        icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
                      >
                        <input placeholder="01xxxxxxxxx" value={form.studentPhone} onChange={set("studentPhone")}
                          style={inputStyle(!!errors.studentPhone)} />
                      </InputField>

                      <InputField label="المرحلة الدراسية" error={errors.stage}
                        icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>}
                      >
                        <select value={form.stage} onChange={set("stage")} style={inputStyle(!!errors.stage)}>
                          <option value="">اختر المرحلة</option>
                          {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </InputField>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "#f3f4f6", marginBottom: "28px" }} />

                  {/* Section: بيانات ولي الأمر */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "10px",
                        background: "linear-gradient(135deg,#DC2626,#F97316)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.9rem", color: "#fff", fontWeight: 900,
                      }}>٢</div>
                      <h3 style={{ fontWeight: 900, fontSize: "1.05rem", color: "#111", margin: 0 }}>
                        بيانات ولي الأمر
                      </h3>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                      className="form-grid"
                    >
                      <InputField label="اسم ولي الأمر" error={errors.parentName}
                        icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>}
                      >
                        <input placeholder="الاسم بالكامل" value={form.parentName} onChange={set("parentName")}
                          style={inputStyle(!!errors.parentName)} />
                      </InputField>

                      <InputField label="رقم هاتف ولي الأمر" error={errors.parentPhone}
                        icon={<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
                      >
                        <input placeholder="01xxxxxxxxx" value={form.parentPhone} onChange={set("parentPhone")}
                          style={inputStyle(!!errors.parentPhone)} />
                      </InputField>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "#f3f4f6", marginBottom: "28px" }} />

                  {/* Section: تفاصيل الحجز */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                      <div style={{
                        width: "34px", height: "34px", borderRadius: "10px",
                        background: "linear-gradient(135deg,#DC2626,#F97316)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.9rem", color: "#fff", fontWeight: 900,
                      }}>٣</div>
                      <h3 style={{ fontWeight: 900, fontSize: "1.05rem", color: "#111", margin: 0 }}>
                        تفاصيل الحجز
                      </h3>
                    </div>

                    {/* Time slots */}
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ fontWeight: 700, fontSize: "0.88rem", color: "#374151", display: "block", marginBottom: "10px" }}>
                        الوقت المفضل
                      </label>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {timeSlots.map((slot) => (
                          <motion.button
                            key={slot}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setForm((p) => ({ ...p, preferredTime: slot })); setErrors((p) => ({ ...p, preferredTime: undefined })); }}
                            style={{
                              padding: "9px 18px", borderRadius: "10px", border: "none",
                              fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
                              transition: "all 0.2s",
                              background: form.preferredTime === slot
                                ? "linear-gradient(135deg,#DC2626,#F97316)"
                                : "#f3f4f6",
                              color: form.preferredTime === slot ? "#fff" : "#6b7280",
                            }}
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>
                      {errors.preferredTime && (
                        <span style={{ color: "#DC2626", fontSize: "0.78rem", fontWeight: 600, display: "block", marginTop: "6px" }}>
                          ⚠ {errors.preferredTime}
                        </span>
                      )}
                    </div>

                    {/* Notes */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontWeight: 700, fontSize: "0.88rem", color: "#374151" }}>
                        ملاحظات إضافية (اختياري)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="أي ملاحظات تريد إضافتها..."
                        value={form.notes}
                        onChange={set("notes")}
                        style={{
                          padding: "13px 16px",
                          borderRadius: "12px",
                          border: "1.5px solid #e5e7eb",
                          outline: "none",
                          fontSize: "0.9rem",
                          background: "#fafafa",
                          resize: "none",
                          direction: "rtl",
                          textAlign: "right",
                          color: "#111",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    style={{
                      width: "100%", padding: "16px",
                      borderRadius: "16px", border: "none",
                      background: "linear-gradient(135deg,#DC2626,#F97316)",
                      color: "#fff", fontWeight: 700, fontSize: "1rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(220,38,38,0.30)",
                    }}
                  >
                    إرسال طلب الحجز ←
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
    
    <Footer />
    </>
  );
}