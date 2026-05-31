"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../navbar";
import Footer from "../footer";
import Link from "next/link";
import { useCenterStore } from "@/lib/hooks/useCenterStore";

const staticTeachers = [
  {
    id: 1,
    name: "أ / محمد أحمد",
    subject: "الرياضيات",
    image: "/img/teacher1.jpg",
    bio: "خبرة أكثر من 15 سنة في تدريس الرياضيات للمرحلة الثانوية مع سجل حافل من الطلاب المتفوقين.",
    students: "+1200 طالب",
    rating: 4.9,
    reviews: 340,
    experience: "15 سنة",
    stages: ["الثانوي", "الإعدادي"],
    available: true,
  },
  {
    id: 2,
    name: "أ / أحمد خالد",
    subject: "الفيزياء",
    image: "/img/teacher2.jpg",
    bio: "شرح مبسط وتدريبات عملية للوصول لأعلى الدرجات في الفيزياء.",
    students: "+900 طالب",
    rating: 4.8,
    reviews: 210,
    experience: "10 سنوات",
    stages: ["الثانوي"],
    available: true,
  },
  {
    id: 3,
    name: "أ / سارة علي",
    subject: "اللغة الإنجليزية",
    image: "/img/teacher3.jpg",
    bio: "تأسيس قوي وتطوير مهارات اللغة الإنجليزية للطلاب من جميع المراحل.",
    students: "+1500 طالب",
    rating: 5.0,
    reviews: 520,
    experience: "12 سنة",
    stages: ["الابتدائي", "الإعدادي", "الثانوي"],
    available: false,
  },
  {
    id: 4,
    name: "أ / محمود حسن",
    subject: "الكيمياء",
    image: "/img/teacher4.jpg",
    bio: "شرح سهل ومتابعة مستمرة طوال العام الدراسي لضمان أعلى النتائج.",
    students: "+1100 طالب",
    rating: 4.7,
    reviews: 180,
    experience: "8 سنوات",
    stages: ["الثانوي"],
    available: true,
  },
  {
    id: 5,
    name: "أ / يوسف عبدالله",
    subject: "الأحياء",
    image: "/img/teacher5.jpg",
    bio: "تبسيط المناهج وتحقيق أفضل النتائج للطلاب في مادة الأحياء.",
    students: "+800 طالب",
    rating: 4.8,
    reviews: 160,
    experience: "9 سنوات",
    stages: ["الثانوي", "الإعدادي"],
    available: true,
  },
  {
    id: 6,
    name: "أ / مريم أشرف",
    subject: "اللغة العربية",
    image: "/img/teacher6.jpg",
    bio: "خبرة طويلة في النحو والبلاغة والقراءة لجميع المراحل الدراسية.",
    students: "+1000 طالب",
    rating: 4.9,
    reviews: 290,
    experience: "11 سنة",
    stages: ["الابتدائي", "الإعدادي", "الثانوي"],
    available: true,
  },
  {
    id: 7,
    name: "أ / نور الدين سامي",
    subject: "الرياضيات",
    image: "/img/teacher7.jpg",
    bio: "متخصص في حل المسائل المعقدة وتبسيط المفاهيم الصعبة بأسلوب ممتع.",
    students: "+650 طالب",
    rating: 4.6,
    reviews: 120,
    experience: "7 سنوات",
    stages: ["الإعدادي", "الابتدائي"],
    available: true,
  },
  {
    id: 8,
    name: "أ / دينا محمود",
    subject: "اللغة الإنجليزية",
    image: "/img/teacher8.jpg",
    bio: "خريجة جامعة الإسكندرية، متخصصة في تطوير مهارات الكتابة والمحادثة.",
    students: "+780 طالب",
    rating: 4.9,
    reviews: 200,
    experience: "6 سنوات",
    stages: ["الثانوي", "الإعدادي"],
    available: false,
  },
];

const stages = ["الكل", "الابتدائي", "الإعدادي", "الثانوي"];

function StarRating({ rating }: { rating: number }) {
  return (

    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#F97316" : "#e5e7eb"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ color: "#F97316", fontWeight: 700, fontSize: "0.8rem", marginRight: "4px" }}>
        {rating}
      </span>
    </div>
  );
}

export default function TeachersPage() {
  const { teachers: storeTeachers } = useCenterStore();
  const teachers = useMemo(() => {
    if (storeTeachers.length) {
      return storeTeachers.map((t) => ({
        id: t.id,
        name: t.name,
        subject: t.subject,
        image: t.image,
        bio: t.bio,
        students: t.students,
        rating: t.rating ?? 4.8,
        reviews: 0,
        experience: t.experience,
        stages: t.stages,
        available: true,
      }));
    }
    return staticTeachers;
  }, [storeTeachers]);

  const subjects = useMemo(() => {
    return ["الكل", ...Array.from(new Set(teachers.map((t) => t.subject)))];
  }, [teachers]);

  const [selectedSubject, setSelectedSubject] = useState("الكل");
  const [selectedStage, setSelectedStage] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      if (selectedSubject !== "الكل" && t.subject !== selectedSubject) return false;
      if (selectedStage !== "الكل" && !t.stages.includes(selectedStage)) return false;
      if (onlyAvailable && !t.available) return false;
      if (searchQuery && !t.name.includes(searchQuery) && !t.subject.includes(searchQuery)) return false;
      return true;
    });
  }, [teachers, selectedSubject, selectedStage, searchQuery, onlyAvailable]);


  return (
        <>
    <Navbar/>
    <div dir="rtl" style={{ background: "#fafafa", minHeight: "100vh" }}>

      {/* ══════════ HERO BANNER ══════════ */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a0000 0%, #7f1d1d 50%, #1a0000 100%)",
          padding: "80px 20px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-60px", left: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(249,115,22,0.12)",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "-40px",
          width: "250px", height: "250px", borderRadius: "50%",
          background: "rgba(220,38,38,0.15)",
        }} />

        <div style={{ maxWidth: "1300px", margin: "auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center" }}
          >
            <span style={{
              color: "#F97316", fontWeight: 700, letterSpacing: "3px",
              fontSize: "0.8rem", display: "block", marginBottom: "16px",
            }}>
              OUR TEACHERS
            </span>
            <h1 style={{
              fontSize: "clamp(2.4rem,6vw,4.2rem)",
              fontWeight: 900, color: "#fff",
              lineHeight: 1.2, marginBottom: "20px",
            }}>
              نخبة من أفضل{" "}
              <span style={{
                background: "linear-gradient(90deg,#DC2626,#F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                المدرسين
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.9 }}>
              اختر المدرس المناسب لك وابدأ رحلتك نحو التفوق الدراسي مع أفضل الكفاءات التعليمية في اكتوبر.
            </p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                display: "flex", justifyContent: "center", gap: "40px",
                marginTop: "48px", flexWrap: "wrap",
              }}
            >
              {[
                { value: "+8", label: "مدرس متخصص" },
                { value: "+8000", label: "طالب مستفيد" },
                { value: "6", label: "مواد دراسية" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{
                    fontSize: "2rem", fontWeight: 900,
                    background: "linear-gradient(90deg,#DC2626,#F97316)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    margin: 0,
                  }}>{stat.value}</p>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", margin: "4px 0 0" }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══════════ FILTERS ══════════ */}
      <div style={{ maxWidth: "1300px", margin: "-36px auto 0", padding: "0 20px", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "24px 28px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 200px", minWidth: "200px" }}>
            <svg style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}
              width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="ابحث عن مدرس أو مادة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", padding: "12px 44px 12px 16px",
                borderRadius: "12px", border: "1.5px solid #f3f4f6",
                outline: "none", fontSize: "0.9rem", background: "#fafafa",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Subject pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  transition: "all 0.2s",
                  background: selectedSubject === s
                    ? "linear-gradient(135deg,#DC2626,#F97316)"
                    : "#f3f4f6",
                  color: selectedSubject === s ? "#fff" : "#6b7280",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Stage select */}
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            style={{
              padding: "11px 16px", borderRadius: "12px",
              border: "1.5px solid #f3f4f6", outline: "none",
              fontSize: "0.88rem", background: "#fafafa",
              color: "#374151", fontWeight: 600, cursor: "pointer",
            }}
          >
            {stages.map((s) => <option key={s} value={s}>{s === "الكل" ? "كل المراحل" : s}</option>)}
          </select>

          {/* Available toggle */}
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", whiteSpace: "nowrap" }}>
            <div
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              style={{
                width: "40px", height: "22px", borderRadius: "11px",
                background: onlyAvailable ? "#DC2626" : "#e5e7eb",
                position: "relative", transition: "background 0.25s", cursor: "pointer",
              }}
            >
              <div style={{
                position: "absolute", top: "3px",
                right: onlyAvailable ? "3px" : "19px",
                width: "16px", height: "16px", borderRadius: "50%",
                background: "#fff", transition: "right 0.25s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }} />
            </div>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>متاح الآن فقط</span>
          </label>
        </motion.div>
      </div>

      {/* ══════════ RESULTS COUNT ══════════ */}
      <div style={{ maxWidth: "1300px", margin: "28px auto 0", padding: "0 20px" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          عرض <strong style={{ color: "#DC2626" }}>{filtered.length}</strong> من أصل {teachers.length} مدرس
        </p>
      </div>

      {/* ══════════ CARDS GRID ══════════ */}
      <div style={{ maxWidth: "1300px", margin: "24px auto 0", padding: "0 20px 100px" }}>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "80px 20px", color: "#9ca3af" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
              <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>لا يوجد مدرسون مطابقون للبحث</p>
            </motion.div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: "24px",
              }}
            >
              {filtered.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  whileHover={{ y: -8, transition: { duration: 0.22 } }}
                  style={{
                    background: "#fff",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 6px 28px rgba(0,0,0,0.07)",
                    border: "1px solid #f3f4f6",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                    }} />

                    {/* Subject badge */}
                    <span style={{
                      position: "absolute", top: "14px", right: "14px",
                      background: "linear-gradient(135deg,#DC2626,#F97316)",
                      color: "#fff", fontWeight: 700, fontSize: "0.72rem",
                      borderRadius: "20px", padding: "5px 14px", letterSpacing: "0.3px",
                    }}>
                      {teacher.subject}
                    </span>

                    {/* Available badge */}
                    <span style={{
                      position: "absolute", top: "14px", left: "14px",
                      background: teacher.available ? "rgba(22,163,74,0.9)" : "rgba(107,114,128,0.85)",
                      color: "#fff", fontWeight: 700, fontSize: "0.7rem",
                      borderRadius: "20px", padding: "5px 12px",
                      display: "flex", alignItems: "center", gap: "5px",
                    }}>
                      <span style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: teacher.available ? "#86efac" : "#d1d5db",
                        display: "inline-block",
                      }} />
                      {teacher.available ? "متاح" : "محجوز"}
                    </span>

                    {/* Name overlay */}
                    <div style={{ position: "absolute", bottom: "14px", right: "16px", left: "16px" }}>
                      <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "1.15rem", margin: 0 }}>
                        {teacher.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "20px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>

                    {/* Rating + reviews */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <StarRating rating={teacher.rating} />
                      <span style={{ color: "#9ca3af", fontSize: "0.78rem" }}>({teacher.reviews} تقييم)</span>
                    </div>

                    {/* Bio */}
                    <p style={{ color: "#6b7280", fontSize: "0.87rem", lineHeight: "1.75", margin: 0 }}>
                      {teacher.bio}
                    </p>

                    {/* Meta row */}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{
                        background: "#fff5f5", color: "#DC2626",
                        fontWeight: 700, fontSize: "0.75rem",
                        borderRadius: "8px", padding: "4px 10px",
                      }}>
                        👨‍🎓 {teacher.students}
                      </span>
                      <span style={{
                        background: "#fff7ed", color: "#F97316",
                        fontWeight: 700, fontSize: "0.75rem",
                        borderRadius: "8px", padding: "4px 10px",
                      }}>
                        ⏱ {teacher.experience}
                      </span>
                      {teacher.stages.map((stage) => (
                        <span key={stage} style={{
                          background: "#f3f4f6", color: "#6b7280",
                          fontWeight: 600, fontSize: "0.72rem",
                          borderRadius: "8px", padding: "4px 10px",
                        }}>
                          {stage}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
<Link href={`/teachers/booking?id=${teacher.id}`}>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={!teacher.available}
                      style={{
                        marginTop: "4px",
                        width: "100%",
                        padding: "13px",
                        borderRadius: "14px",
                        border: "none",
                        background: teacher.available
                          ? "linear-gradient(135deg,#DC2626,#F97316)"
                          : "#f3f4f6",
                        color: teacher.available ? "#fff" : "#9ca3af",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        cursor: teacher.available ? "pointer" : "not-allowed",
                        transition: "opacity 0.2s",
                      }}
                    >
                      {teacher.available ? "احجز مع المدرس" : "غير متاح حالياً"}
                    </motion.button></Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>

    <Footer />
    </>
  );
}