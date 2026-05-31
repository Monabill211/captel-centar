"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../navbar";
import Footer from "../footer";
import Link from "next/link";
import { useCenterStore } from "@/lib/hooks/useCenterStore";

const staticBooks = [
  {
    id: 1,
    title: "رياضيات الثانوية العامة",
    subject: "الرياضيات",
    image: "/img/book1.jpg",
    description: "شرح شامل لمنهج الرياضيات الثانوي مع أمثلة محلولة وتمارين متنوعة.",
    sales: "+3200 نسخة",
    rating: 4.9,
    reviews: 410,
    price: "120 جنيه",
    author: "أ / محمد أحمد",
    stage: ["الثانوي"],
    available: true,
  },
  {
    id: 2,
    title: "الفيزياء المبسطة",
    subject: "الفيزياء",
    image: "/img/book2.jpg",
    description: "كتاب تطبيقي يشرح قوانين الفيزياء بأسلوب مبسط مع تمارين الامتحانات السابقة.",
    sales: "+1800 نسخة",
    rating: 4.8,
    reviews: 270,
    price: "95 جنيه",
    author: "أ / أحمد خالد",
    stage: ["الثانوي"],
    available: true,
  },
  {
    id: 3,
    title: "قواعد اللغة الإنجليزية",
    subject: "اللغة الإنجليزية",
    image: "/img/book3.jpg",
    description: "مرجع شامل لقواعد اللغة الإنجليزية من المستوى الأساسي حتى المتقدم.",
    sales: "+4500 نسخة",
    rating: 5.0,
    reviews: 600,
    price: "110 جنيه",
    author: "أ / سارة علي",
    stage: ["الابتدائي", "الإعدادي", "الثانوي"],
    available: true,
  },
  {
    id: 4,
    title: "الكيمياء خطوة بخطوة",
    subject: "الكيمياء",
    image: "/img/book4.jpg",
    description: "يشرح التفاعلات الكيميائية والمعادلات بأسلوب منهجي وسهل الفهم.",
    sales: "+2100 نسخة",
    rating: 4.7,
    reviews: 190,
    price: "100 جنيه",
    author: "أ / محمود حسن",
    stage: ["الثانوي"],
    available: false,
  },
  {
    id: 5,
    title: "الأحياء الحديثة",
    subject: "الأحياء",
    image: "/img/book5.jpg",
    description: "يغطي جميع أبواب منهج الأحياء مع رسوم توضيحية وأسئلة مراجعة.",
    sales: "+1500 نسخة",
    rating: 4.8,
    reviews: 220,
    price: "90 جنيه",
    author: "أ / يوسف عبدالله",
    stage: ["الثانوي", "الإعدادي"],
    available: true,
  },
  {
    id: 6,
    title: "النحو والبلاغة الميسّر",
    subject: "اللغة العربية",
    image: "/img/book6.jpg",
    description: "مرجع متكامل في النحو والصرف والبلاغة لجميع المراحل الدراسية.",
    sales: "+2800 نسخة",
    rating: 4.9,
    reviews: 350,
    price: "105 جنيه",
    author: "أ / مريم أشرف",
    stage: ["الابتدائي", "الإعدادي", "الثانوي"],
    available: true,
  },
  {
    id: 7,
    title: "تمارين الرياضيات الإعدادي",
    subject: "الرياضيات",
    image: "/img/book7.jpg",
    description: "مجموعة ضخمة من التمارين المتدرجة لتقوية مهارات الرياضيات في المرحلة الإعدادية.",
    sales: "+1200 نسخة",
    rating: 4.6,
    reviews: 140,
    price: "75 جنيه",
    author: "أ / نور الدين سامي",
    stage: ["الإعدادي", "الابتدائي"],
    available: true,
  },
  {
    id: 8,
    title: "Conversation & Writing Skills",
    subject: "اللغة الإنجليزية",
    image: "/img/book8.jpg",
    description: "كتاب متخصص في تطوير مهارات المحادثة والكتابة باللغة الإنجليزية.",
    sales: "+1900 نسخة",
    rating: 4.9,
    reviews: 240,
    price: "115 جنيه",
    author: "أ / دينا محمود",
    stage: ["الثانوي", "الإعدادي"],
    available: false,
  },
];
const stages = ["الكل", "الابتدائي", "الإعدادي", "الثانوي"];

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

export default function BooksPage() {
  const { books: storeBooks } = useCenterStore();
  const books = useMemo(() => {
    if (storeBooks.length) {
      return storeBooks.map((b) => ({
        id: b.id,
        title: b.name,
        subject: b.subject,
        image: b.image,
        description: b.description,
        sales: "",
        rating: 4.8,
        reviews: 0,
        price: `${b.price} جنيه`,
        author: b.author,
        stage: b.stage,
        available: true,
      }));
    }
    return staticBooks;
  }, [storeBooks]);

  const subjects = useMemo(() => {
    return ["الكل", ...Array.from(new Set(books.map((b) => b.subject)))];
  }, [books]);

  const [selectedSubject, setSelectedSubject] = useState("الكل");
  const [selectedStage, setSelectedStage] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (selectedSubject !== "الكل" && b.subject !== selectedSubject) return false;
      if (selectedStage !== "الكل" && !b.stage.includes(selectedStage)) return false;
      if (onlyAvailable && !b.available) return false;
      if (searchQuery && !b.title.includes(searchQuery) && !b.subject.includes(searchQuery) && !b.author.includes(searchQuery)) return false;
      return true;
    });
  }, [books, selectedSubject, selectedStage, searchQuery, onlyAvailable]);

  return (
    <>
      <Navbar />
      <div dir="rtl" style={{ background: "#fafafa", minHeight: "100vh" }}>

        {/* ══════════ HERO ══════════ */}
        <div style={{
          background: "linear-gradient(135deg, #1a0000 0%, #7f1d1d 50%, #1a0000 100%)",
          padding: "80px 20px 100px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(249,115,22,0.12)" }} />
          <div style={{ position: "absolute", bottom: "-80px", right: "-40px", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(220,38,38,0.15)" }} />

          <div style={{ maxWidth: "1300px", margin: "auto", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ textAlign: "center" }}
            >
              <span style={{ color: "#F97316", fontWeight: 700, letterSpacing: "3px", fontSize: "0.8rem", display: "block", marginBottom: "16px" }}>
                OUR BOOKS
              </span>
              <h1 style={{ fontSize: "clamp(2.4rem,6vw,4.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "20px" }}>
                أفضل{" "}
                <span style={{ background: "linear-gradient(90deg,#DC2626,#F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  الكتب الدراسية
                </span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.9 }}>
                مراجع ومذكرات معتمدة من أفضل المدرسين، تغطي جميع المواد والمراحل الدراسية.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "48px", flexWrap: "wrap" }}
              >
                {[
                  { value: "+8", label: "كتاب متخصص" },
                  { value: "+19000", label: "نسخة مباعة" },
                  { value: "6", label: "مواد دراسية" },
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "2rem", fontWeight: 900, background: "linear-gradient(90deg,#DC2626,#F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
                      {stat.value}
                    </p>
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
              background: "#fff", borderRadius: "20px", padding: "24px 28px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
              display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center",
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
                placeholder="ابحث عن كتاب أو مادة أو مؤلف..."
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
                    padding: "9px 16px", borderRadius: "10px", border: "none",
                    cursor: "pointer", fontWeight: 700, fontSize: "0.82rem", transition: "all 0.2s",
                    background: selectedSubject === s ? "linear-gradient(135deg,#DC2626,#F97316)" : "#f3f4f6",
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
                padding: "11px 16px", borderRadius: "12px", border: "1.5px solid #f3f4f6",
                outline: "none", fontSize: "0.88rem", background: "#fafafa",
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
            عرض <strong style={{ color: "#DC2626" }}>{filtered.length}</strong> من أصل {books.length} كتاب
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
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📚</div>
                <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>لا يوجد كتب مطابقة للبحث</p>
              </motion.div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "24px" }}>
                {filtered.map((book, index) => (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    whileHover={{ y: -8, transition: { duration: 0.22 } }}
                    style={{
                      background: "#fff", borderRadius: "24px", overflow: "hidden",
                      boxShadow: "0 6px 28px rgba(0,0,0,0.07)", border: "1px solid #f3f4f6",
                      display: "flex", flexDirection: "column",
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                      <img
                        src={book.image}
                        alt={book.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />

                      <span style={{
                        position: "absolute", top: "14px", right: "14px",
                        background: "linear-gradient(135deg,#DC2626,#F97316)",
                        color: "#fff", fontWeight: 700, fontSize: "0.72rem",
                        borderRadius: "20px", padding: "5px 14px", letterSpacing: "0.3px",
                      }}>
                        {book.subject}
                      </span>

                      <span style={{
                        position: "absolute", top: "14px", left: "14px",
                        background: book.available ? "rgba(22,163,74,0.9)" : "rgba(107,114,128,0.85)",
                        color: "#fff", fontWeight: 700, fontSize: "0.7rem",
                        borderRadius: "20px", padding: "5px 12px",
                        display: "flex", alignItems: "center", gap: "5px",
                      }}>
                        <span style={{
                          width: "6px", height: "6px", borderRadius: "50%",
                          background: book.available ? "#86efac" : "#d1d5db",
                          display: "inline-block",
                        }} />
                        {book.available ? "متاح" : "نفذت"}
                      </span>

                      <div style={{ position: "absolute", bottom: "14px", right: "16px", left: "16px" }}>
                        <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "1.15rem", margin: 0 }}>
                          {book.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "20px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <StarRating rating={book.rating} />
                        <span style={{ color: "#9ca3af", fontSize: "0.78rem" }}>({book.reviews} تقييم)</span>
                      </div>

                      <p style={{ color: "#F97316", fontWeight: 700, fontSize: "0.83rem", margin: 0 }}>
                        ✍️ {book.author}
                      </p>

                      <p style={{ color: "#6b7280", fontSize: "0.87rem", lineHeight: "1.75", margin: 0 }}>
                        {book.description}
                      </p>

                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ background: "#fff5f5", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem", borderRadius: "8px", padding: "4px 10px" }}>
                          📦 {book.sales}
                        </span>
                        {book.stage.map((s) => (
                          <span key={s} style={{ background: "#f3f4f6", color: "#6b7280", fontWeight: 600, fontSize: "0.72rem", borderRadius: "8px", padding: "4px 10px" }}>
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Price + CTA */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                        <span style={{
                          fontWeight: 900, fontSize: "1.05rem",
                          background: "linear-gradient(90deg,#DC2626,#F97316)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                          whiteSpace: "nowrap",
                        }}>
                          {book.price}
                        </span>
                        {book.available ? (
                          <Link href={`/books/booking-Book?id=${book.id}`} style={{ flex: 1 }}>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              style={{
                                width: "100%", padding: "13px", borderRadius: "14px", border: "none",
                                background: "linear-gradient(135deg,#DC2626,#F97316)",
                                color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                              }}
                            >
                              اطلب الكتاب
                            </motion.button>
                          </Link>
                        ) : (
                          <button
                            disabled
                            style={{
                              flex: 1, padding: "13px", borderRadius: "14px", border: "none",
                              background: "#f3f4f6", color: "#9ca3af",
                              fontWeight: 700, fontSize: "0.9rem", cursor: "not-allowed",
                            }}
                          >
                            نفذت الكمية
                          </button>
                        )}
                      </div>
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