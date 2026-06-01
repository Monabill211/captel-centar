"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCenterStore } from "@/lib/hooks/useCenterStore";
import { addBookOrder } from "@/lib/data/store";

type BookView = {
  id: number;
  title: string;
  subject: string;
  image: string;
  price: number;
  author: string;
  stage: string[];
};

type PaymentMethod = "cash" | "instapay" | "vodafone";

type FormData = {
  studentName: string;
  studentPhone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  paymentMethod: PaymentMethod | "";
  paymentNumber: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const paymentOptions: { key: PaymentMethod; label: string; icon: string; color: string; needsNumber: boolean }[] = [
  { key: "cash", label: "كاش", icon: "💵", color: "#16a34a", needsNumber: false },
  { key: "instapay", label: "إنستا باي", icon: "⚡", color: "#7c3aed", needsNumber: true },
  { key: "vodafone", label: "فودافون كاش", icon: "📱", color: "#DC2626", needsNumber: true },
];

function InputField({ label, error, icon, children }: {
  label: string; error?: string; icon: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontWeight: 700, fontSize: "0.88rem", color: "#374151" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", right: "14px", top: "50%",
          transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none",
        }}>{icon}</div>
        {children}
      </div>
      {error && <span style={{ color: "#DC2626", fontSize: "0.78rem", fontWeight: 600 }}>⚠ {error}</span>}
    </div>
  );
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%", padding: "13px 44px 13px 16px",
  borderRadius: "12px", border: `1.5px solid ${hasError ? "#DC2626" : "#e5e7eb"}`,
  outline: "none", fontSize: "0.9rem",
  background: hasError ? "#fff5f5" : "#fafafa",
  boxSizing: "border-box", direction: "rtl", textAlign: "right", color: "#111",
});

const PersonIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function BookOrderPage() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { books } = useCenterStore();
  const storeBook = books.find((b) => b.id === id) ?? books[0];
  const book: BookView = {
    id: storeBook?.id ?? 0,
    title: storeBook?.name ?? "كتاب غير معروف",
    subject: storeBook?.subject ?? "",
    image: storeBook?.image ?? "/img/book1.jpg",
    price: storeBook?.price ?? 0,
    author: storeBook?.author ?? "",
    stage: storeBook?.stage ?? [],
  };

  const [form, setForm] = useState<FormData>({
    studentName: "", studentPhone: "", parentName: "", parentPhone: "",
    address: "", paymentMethod: "", paymentNumber: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const setPayment = (key: PaymentMethod) => {
    setForm((p) => ({ ...p, paymentMethod: key, paymentNumber: "" }));
    setErrors((p) => ({ ...p, paymentMethod: undefined, paymentNumber: undefined }));
  };

  const selectedPayment = paymentOptions.find((p) => p.key === form.paymentMethod);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.studentName.trim()) e.studentName = "اسم الطالب مطلوب";
    if (!form.studentPhone.trim()) e.studentPhone = "رقم الطالب مطلوب";
    else if (!/^01[0-9]{9}$/.test(form.studentPhone)) e.studentPhone = "رقم غير صحيح";
    if (!form.parentName.trim()) e.parentName = "اسم ولي الأمر مطلوب";
    if (!form.parentPhone.trim()) e.parentPhone = "رقم ولي الأمر مطلوب";
    else if (!/^01[0-9]{9}$/.test(form.parentPhone)) e.parentPhone = "رقم غير صحيح";
    if (!form.address.trim()) e.address = "العنوان مطلوب";
    if (!form.paymentMethod) e.paymentMethod = "اختر طريقة الدفع";
    if (selectedPayment?.needsNumber && !form.paymentNumber.trim()) e.paymentNumber = "رقم المحفظة مطلوب";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addBookOrder({
      bookId: book.id,
      bookTitle: book.title,
      studentName: form.studentName,
      studentPhone: form.studentPhone,
      parentName: form.parentName,
      parentPhone: form.parentPhone,
      address: form.address,
      paymentMethod: form.paymentMethod,
      paymentNumber: form.paymentNumber,
      status: "pending",
    });
    setSubmitted(true);
  };

  return (
    <div dir="rtl" style={{ background: "#fafafa", minHeight: "100vh" }}>

      {/* ══ HERO ══ */}
      <div style={{
        background: "linear-gradient(135deg,#1a0000 0%,#7f1d1d 50%,#1a0000 100%)",
        padding: "70px 20px 100px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute",top:"-60px",left:"-60px",width:"280px",height:"280px",borderRadius:"50%",background:"rgba(249,115,22,0.10)" }} />
        <div style={{ position:"absolute",bottom:"-60px",right:"-40px",width:"220px",height:"220px",borderRadius:"50%",background:"rgba(220,38,38,0.13)" }} />
        <motion.div
          initial={{ opacity:0, y:35 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
          style={{ maxWidth:"1100px", margin:"auto", textAlign:"center", position:"relative", zIndex:1 }}
        >
          <span style={{ color:"#F97316", fontWeight:700, letterSpacing:"3px", fontSize:"0.8rem", display:"block", marginBottom:"14px" }}>
            ORDER BOOK
          </span>
          <h1 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:900, color:"#fff", lineHeight:1.25, marginBottom:"14px" }}>
            اطلب{" "}
            <span style={{ background:"linear-gradient(90deg,#DC2626,#F97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              كتابك الآن
            </span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.6)", lineHeight:1.9, maxWidth:"420px", margin:"0 auto" }}>
            أكمل البيانات واختر طريقة الدفع المناسبة وسيصلك الكتاب في أقرب وقت.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"-48px auto 0", padding:"0 20px 100px", position:"relative", zIndex:10 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"28px", alignItems:"start" }} className="order-grid">

          {/* ══ BOOK CARD ══ */}
          <motion.div
            initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}
            style={{ background:"#fff", borderRadius:"24px", overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.09)", border:"1px solid #f3f4f6", position:"sticky", top:"24px" }}
          >
            <div style={{ position:"relative", height:"220px", overflow:"hidden" }}>
              <img src={book.image} alt={book.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 50%)" }} />
              <span style={{ position:"absolute", top:"12px", right:"12px", background:"linear-gradient(135deg,#DC2626,#F97316)", color:"#fff", fontWeight:700, fontSize:"0.7rem", borderRadius:"20px", padding:"4px 12px" }}>
                {book.subject}
              </span>
              <div style={{ position:"absolute", bottom:"12px", right:"14px", left:"14px" }}>
                <h3 style={{ color:"#fff", fontWeight:900, fontSize:"1rem", margin:0, lineHeight:1.4 }}>{book.title}</h3>
              </div>
            </div>

            <div style={{ padding:"20px" }}>
              <p style={{ color:"#F97316", fontWeight:700, fontSize:"0.85rem", margin:"0 0 16px" }}>✍️ {book.author}</p>

              {book.stage.map((s) => (
                <span key={s} style={{ background:"#f3f4f6", color:"#6b7280", fontWeight:600, fontSize:"0.75rem", borderRadius:"8px", padding:"4px 10px", marginLeft:"6px" }}>
                  {s}
                </span>
              ))}

              <div style={{
                marginTop:"20px", padding:"16px", borderRadius:"14px",
                background:"linear-gradient(135deg,rgba(220,38,38,0.06),rgba(249,115,22,0.06))",
                border:"1px solid rgba(220,38,38,0.12)",
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <span style={{ color:"#6b7280", fontSize:"0.85rem", fontWeight:600 }}>سعر الكتاب</span>
                <span style={{ fontWeight:900, fontSize:"1.3rem", background:"linear-gradient(90deg,#DC2626,#F97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  {book.price} جنيه
                </span>
              </div>

              <div style={{ marginTop:"14px", background:"#fff5f5", border:"1px solid #fecaca", borderRadius:"12px", padding:"12px 14px", fontSize:"0.8rem", color:"#DC2626", lineHeight:1.7 }}>
                🚚 سيتواصل معك فريقنا لتأكيد موعد التسليم.
              </div>
            </div>
          </motion.div>

          {/* ══ FORM ══ */}
          <motion.div
            initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}
            style={{ background:"#fff", borderRadius:"24px", padding:"36px", boxShadow:"0 8px 40px rgba(0,0,0,0.09)", border:"1px solid #f3f4f6" }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:"center", padding:"40px 20px" }}>
                  <motion.div
                    initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:200, delay:0.1 }}
                    style={{ width:"80px", height:"80px", borderRadius:"50%", background:"linear-gradient(135deg,#DC2626,#F97316)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", fontSize:"2rem", color:"#fff" }}
                  >✓</motion.div>
                  <h2 style={{ fontWeight:900, fontSize:"1.6rem", color:"#111", marginBottom:"12px" }}>تم إرسال الطلب!</h2>
                  <p style={{ color:"#6b7280", lineHeight:1.8, maxWidth:"360px", margin:"0 auto 12px" }}>
                    شكراً <strong>{form.parentName}</strong>، سيتواصل معك فريقنا على{" "}
                    <strong style={{ color:"#DC2626" }}>{form.parentPhone}</strong> لتأكيد الطلب.
                  </p>
                  <p style={{ color:"#6b7280", fontSize:"0.88rem", marginBottom:"28px" }}>
                    طريقة الدفع:{" "}
                    <strong style={{ color: selectedPayment?.key === "cash" ? "#16a34a" : selectedPayment?.key === "instapay" ? "#7c3aed" : "#DC2626" }}>
                      {selectedPayment?.label}
                      {form.paymentNumber ? ` — ${form.paymentNumber}` : ""}
                    </strong>
                  </p>
                  <motion.button
                    whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                    onClick={() => { setSubmitted(false); setForm({ studentName:"",studentPhone:"",parentName:"",parentPhone:"",address:"",paymentMethod:"",paymentNumber:"" }); }}
                    style={{ padding:"13px 32px", borderRadius:"14px", border:"none", background:"linear-gradient(135deg,#DC2626,#F97316)", color:"#fff", fontWeight:700, fontSize:"0.95rem", cursor:"pointer" }}
                  >طلب آخر</motion.button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }}>

                  <SectionTitle num="١" title="بيانات الطالب" />
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"28px" }} className="form-grid">
                    <InputField label="اسم الطالب" error={errors.studentName} icon={<PersonIcon />}>
                      <input placeholder="الاسم بالكامل" value={form.studentName} onChange={set("studentName")} style={inputStyle(!!errors.studentName)} />
                    </InputField>
                    <InputField label="رقم هاتف الطالب" error={errors.studentPhone} icon={<PhoneIcon />}>
                      <input placeholder="01xxxxxxxxx" value={form.studentPhone} onChange={set("studentPhone")} style={inputStyle(!!errors.studentPhone)} />
                    </InputField>
                  </div>

                  <Divider />

                  <SectionTitle num="٢" title="بيانات ولي الأمر" />
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"28px" }} className="form-grid">
                    <InputField label="اسم ولي الأمر" error={errors.parentName} icon={<PersonIcon />}>
                      <input placeholder="الاسم بالكامل" value={form.parentName} onChange={set("parentName")} style={inputStyle(!!errors.parentName)} />
                    </InputField>
                    <InputField label="رقم هاتف ولي الأمر" error={errors.parentPhone} icon={<PhoneIcon />}>
                      <input placeholder="01xxxxxxxxx" value={form.parentPhone} onChange={set("parentPhone")} style={inputStyle(!!errors.parentPhone)} />
                    </InputField>
                  </div>
                  <div style={{ marginBottom:"28px" }}>
                    <InputField label="عنوان التسليم" error={errors.address} icon={<LocationIcon />}>
                      <input placeholder="المنطقة، الشارع، رقم المبنى..." value={form.address} onChange={set("address")} style={inputStyle(!!errors.address)} />
                    </InputField>
                  </div>

                  <Divider />

                  <SectionTitle num="٣" title="طريقة الدفع" />
                  <div style={{ display:"flex", gap:"12px", marginBottom:"16px", flexWrap:"wrap" }}>
                    {paymentOptions.map((opt) => (
                      <motion.button
                        key={opt.key}
                        type="button"
                        whileHover={{ scale:1.04 }}
                        whileTap={{ scale:0.96 }}
                        onClick={() => setPayment(opt.key)}
                        style={{
                          flex:"1 1 120px", padding:"14px 12px", borderRadius:"14px",
                          border: form.paymentMethod === opt.key ? `2px solid ${opt.color}` : "2px solid #e5e7eb",
                          background: form.paymentMethod === opt.key ? `${opt.color}12` : "#fafafa",
                          cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", transition:"all 0.2s",
                        }}
                      >
                        <span style={{ fontSize:"1.6rem" }}>{opt.icon}</span>
                        <span style={{ fontWeight:700, fontSize:"0.85rem", color: form.paymentMethod === opt.key ? opt.color : "#6b7280" }}>
                          {opt.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  {errors.paymentMethod && (
                    <span style={{ color:"#DC2626", fontSize:"0.78rem", fontWeight:600, display:"block", marginBottom:"12px" }}>
                      ⚠ {errors.paymentMethod}
                    </span>
                  )}

                  <AnimatePresence>
                    {selectedPayment?.needsNumber && (
                      <motion.div
                        key="paymentNum"
                        initial={{ opacity:0, height:0 }}
                        animate={{ opacity:1, height:"auto" }}
                        exit={{ opacity:0, height:0 }}
                        style={{ overflow:"hidden", marginBottom:"20px" }}
                      >
                        <div style={{
                          background: `${selectedPayment.color}08`,
                          border: `1.5px solid ${selectedPayment.color}30`,
                          borderRadius:"14px", padding:"18px", marginTop:"4px",
                        }}>
                          <p style={{ fontWeight:700, fontSize:"0.88rem", color: selectedPayment.color, marginBottom:"10px" }}>
                            {selectedPayment.icon} أدخل رقم {selectedPayment.label} اللي دفعت منه
                          </p>
                          <input
                            placeholder="01xxxxxxxxx"
                            value={form.paymentNumber}
                            onChange={set("paymentNumber")}
                            style={{
                              width:"100%", padding:"12px 16px", borderRadius:"10px",
                              border: `1.5px solid ${errors.paymentNumber ? "#DC2626" : selectedPayment.color + "50"}`,
                              outline:"none", fontSize:"0.95rem", background:"#fff",
                              boxSizing:"border-box", direction:"ltr", textAlign:"left", color:"#111", fontWeight:600,
                            }}
                          />
                          {errors.paymentNumber && (
                            <span style={{ color:"#DC2626", fontSize:"0.78rem", fontWeight:600, display:"block", marginTop:"6px" }}>
                              ⚠ {errors.paymentNumber}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                    onClick={handleSubmit}
                    style={{
                      width:"100%", padding:"16px", borderRadius:"16px", border:"none",
                      background:"linear-gradient(135deg,#DC2626,#F97316)",
                      color:"#fff", fontWeight:700, fontSize:"1rem", cursor:"pointer",
                      boxShadow:"0 4px 20px rgba(220,38,38,0.30)",
                    }}
                  >
                    إرسال الطلب ←
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .order-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
      <div style={{
        width:"34px", height:"34px", borderRadius:"10px",
        background:"linear-gradient(135deg,#DC2626,#F97316)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"0.9rem", color:"#fff", fontWeight:900, flexShrink:0,
      }}>{num}</div>
      <h3 style={{ fontWeight:900, fontSize:"1.05rem", color:"#111", margin:0 }}>{title}</h3>
    </div>
  );
}

function Divider() {
  return <div style={{ height:"1px", background:"#f3f4f6", margin:"0 0 28px" }} />;
}