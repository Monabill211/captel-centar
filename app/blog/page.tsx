"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { useCenterStore } from "@/lib/hooks/useCenterStore";

const faqs = [
  {
    question: "كيف أختار المدرس المناسب لابني؟",
    answer:
      "نوفر لك ملف كامل لكل مدرس يشمل مؤهلاته وخبرته وتقييمات أولياء الأمور السابقين، كما يمكنك حجز حصة تجريبية مجانية قبل الالتزام.",
  },
  {
    question: "هل يمكن تغيير المدرس إذا لم يناسب الطالب؟",
    answer:
      "بالطبع، نضمن لك حق تغيير المدرس في أي وقت دون أي رسوم إضافية حتى تجد الشخص المناسب تماماً لأسلوب تعلم ابنك.",
  },
  {
    question: "ما هي المواد الدراسية المتاحة؟",
    answer:
      "نغطي جميع المراحل الدراسية من الابتدائي حتى الثانوي في مواد الرياضيات، الفيزياء، الكيمياء، اللغة العربية، اللغة الإنجليزية، والأحياء.",
  },
  {
    question: "هل الحصص أونلاين أم حضورية؟",
    answer:
      "نوفر الخيارين. يمكنك اختيار الحصة الحضورية في منزلك أو أونلاين عبر منصات تفاعلية، حسب ما يناسبك.",
  },
  {
    question: "كيف يتم دفع أتعاب المدرس؟",
    answer:
      "الدفع مرن — يمكن أسبوعياً أو شهرياً. نقبل التحويل البنكي، المحافظ الإلكترونية، أو الكاش عند الحضور.",
  },
];

export default function FAQBlogSection() {
  const { blogs } = useCenterStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
     <>
    <Navbar />
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
                    اي سؤال عن سنتر {" "}
                  <span style={{
                    background: "linear-gradient(90deg,#DC2626,#F97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
كابتيال                  </span>
                </h1>
                <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.9 }}>
عن سنتر كابيتال، خدماتنا، وكيف نساعدك في اختيار المدرس المثالي لابنك. نحن هنا لدعمك في كل خطوة نحو التفوق الدراسي.
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
    
    <section
      id="faq"
      dir="rtl"
      style={{
        background: "#fafafa",
        padding: "120px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>

        {/* ═══════════════ HEADING ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span
            style={{
              color: "#DC2626",
              fontWeight: 700,
              letterSpacing: "3px",
              fontSize: "0.8rem",
            }}
          >
            FAQ
          </span>
          <h2
            style={{
              fontSize: "clamp(2.2rem,5vw,3.5rem)",
              fontWeight: 900,
              color: "#111",
              margin: "12px 0 16px",
              lineHeight: 1.2,
            }}
          >
            أسئلتك الشائعة
          </h2>
          <p style={{ color: "#6b7280", maxWidth: "460px", margin: "0 auto", lineHeight: 1.8 }}>
            إجابات على أكثر الأسئلة التي يسألها أولياء الأمور قبل البدء.
          </p>
        </motion.div>

        {/* ═══════════════ FAQ ACCORDION ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "100px" }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                layout
                onClick={() => toggle(i)}
                style={{
                  borderRadius: "16px",
                  marginBottom: "12px",
                  cursor: "pointer",
                  border: isOpen ? "1.5px solid #DC2626" : "1.5px solid #e5e7eb",
                  background: isOpen ? "#fff" : "#fff",
                  boxShadow: isOpen
                    ? "0 8px 32px rgba(220,38,38,0.10)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
              >
                {/* Question */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                  }}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: isOpen
                        ? "linear-gradient(135deg,#DC2626,#F97316)"
                        : "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginRight: "0",
                      marginLeft: "0",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke={isOpen ? "#fff" : "#9ca3af"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>

                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: isOpen ? "#DC2626" : "#111",
                      flex: 1,
                      textAlign: "right",
                      marginRight: "16px",
                      transition: "color 0.25s",
                    }}
                  >
                    {faq.question}
                  </p>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 24px 22px 24px",
                          borderTop: "1px solid #fee2e2",
                          marginTop: "0",
                        }}
                      >
                        <p
                          style={{
                            color: "#6b7280",
                            lineHeight: "1.85",
                            fontSize: "0.93rem",
                            textAlign: "right",
                            paddingTop: "16px",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══════════════ BLOG HEADING ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span
            style={{
              color: "#DC2626",
              fontWeight: 700,
              letterSpacing: "3px",
              fontSize: "0.8rem",
            }}
          >
            BLOG
          </span>
          <h3
            style={{
              fontSize: "clamp(1.7rem,4vw,2.6rem)",
              fontWeight: 900,
              color: "#111",
              margin: "12px 0 0",
            }}
          >
            مقالات قد تفيدك
          </h3>
        </motion.div>

        {/* ═══════════════ BLOG CARDS ═══════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              style={{
                background: "#fff",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid #f3f4f6",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Tag */}
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "linear-gradient(135deg,#DC2626,#F97316)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {blog.tag}
                </span>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: "18px 18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: "10px",
                }}
              >
                <h4
                  style={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    color: "#111",
                    textAlign: "right",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {blog.title}
                </h4>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.82rem",
                    lineHeight: "1.7",
                    textAlign: "right",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {blog.excerpt}
                </p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    marginTop: "6px",
                    width: "100%",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg,#DC2626,#F97316)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    letterSpacing: "0.3px",
                  }}
                >
                  اقرأ المزيد
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
   
    <Footer />
    </>
  );
}