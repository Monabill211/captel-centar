"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "ما هي المراحل الدراسية المتاحة في السنتر؟",
    answer:
      "نوفر شرحًا ومتابعة لجميع المراحل الثانوية مع أفضل المدرسين المتخصصين.",
  },
  {
    question: "هل يوجد حصص أونلاين؟",
    answer:
      "نعم، نوفر حصصًا أونلاين بجودة عالية مع إمكانية مشاهدة التسجيلات لاحقًا.",
  },
  {
    question: "كيف يمكنني حجز مادة أو مدرس؟",
    answer:
      "يمكنك الحجز مباشرة من الموقع أو التواصل معنا عبر الواتساب.",
  },
  {
    question: "هل توجد اختبارات دورية؟",
    answer:
      "نعم، يتم إجراء اختبارات دورية لمتابعة مستوى الطلاب بشكل مستمر.",
  },
  {
    question: "هل يتم توفير مذكرات وكتب تعليمية؟",
    answer:
      "نعم، نوفر مذكرات وكتب تعليمية خاصة بالسنتر لجميع المواد.",
  },
  {
    question: "هل يوجد متابعة لأولياء الأمور؟",
    answer:
      "نعم، يتم إرسال تقارير دورية عن الحضور والمستوى الدراسي للطالب.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        padding: "120px 20px",
        background: "#FFF7ED",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="text-center"
          style={{
            marginBottom: "60px",
          }}
        >
          <p
            style={{
              color: "#DC2626",
              fontWeight: "700",
              letterSpacing: "3px",
              marginBottom: "12px",
            }}
          >
            FAQ
          </p>

          <h2
            className="font-black text-gray-900"
            style={{
              fontSize: "clamp(2rem,5vw,4rem)",
              marginBottom: "20px",
            }}
          >
            الأسئلة{" "}
            <span
              style={{
                color: "#DC2626",
              }}
            >
              الشائعة
            </span>
          </h2>

          <p
            style={{
              color: "#6B7280",
              lineHeight: "2",
            }}
          >
            إجابات على أكثر الأسئلة التي يطرحها الطلاب وأولياء الأمور.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              style={{
                background: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #FED7AA",
              }}
            >
              <button
                onClick={() =>
                  setOpenIndex(
                    openIndex === index ? null : index
                  )
                }
                style={{
                  width: "100%",
                  padding: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "800",
                  fontSize: "18px",
                  color: "#111827",
                  cursor: "pointer",
                }}
              >
                {faq.question}

                <motion.span
                  animate={{
                    rotate:
                      openIndex === index ? 45 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  style={{
                    fontSize: "30px",
                    color: "#DC2626",
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div
                      style={{
                        padding:
                          "0 24px 24px 24px",
                        color: "#6B7280",
                        lineHeight: "2",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}