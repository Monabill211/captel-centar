"use client";

import { motion } from "framer-motion";
import Navbar from "../navbar";
import Footer from "../footer";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

const cardHover = {
  whileHover: {
    y: -10,
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
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


      {/* About */}
      <section
        style={{
          padding: "120px 20px",
          background: "#fff",
        }}
      >
        <div
          className="grid lg:grid-cols-2 items-center"
          style={{
            maxWidth: "1200px",
            margin: "auto",
            gap: "60px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="/img/about-center.jpg"
              alt=""
              className="w-full rounded-4xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              whileHover={{ scale: 1.05, letterSpacing: "5px" }}
              transition={{ type: "spring" as const, stiffness: 300 }}
              style={{
                color: "#DC2626",
                fontWeight: "700",
                letterSpacing: "3px",
                display: "inline-block",
              }}
            >
              ABOUT US
            </motion.span>

            <motion.h2
              {...fadeUp}
              whileHover={{ scale: 1.02 }}
              style={{
                fontSize: "50px",
                fontWeight: "900",
                marginTop: "20px",
                marginBottom: "25px",
                color: "#111827",
              }}
            >
              من نحن ؟
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ x: 5 }}
              style={{
                color: "#6B7280",
                lineHeight: "2.2",
                marginBottom: "20px",
              }}
            >
              سنتر كابيتال هو مركز تعليمي متخصص يهدف إلى تقديم
              تجربة تعليمية متكاملة تساعد الطلاب على تحقيق
              التفوق الدراسي وبناء مستقبل أكاديمي قوي.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ x: 5 }}
              style={{
                color: "#6B7280",
                lineHeight: "2.2",
              }}
            >
              نؤمن بأن النجاح لا يعتمد على الشرح فقط، بل يعتمد
              على المتابعة المستمرة، التدريب، الاختبارات
              الدورية، وتنمية مهارات الطالب للوصول إلى أفضل
              نسخة من نفسه.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        style={{
          padding: "120px 20px",
          background: "#FFF7ED",
        }}
      >
        <div
          className="grid md:grid-cols-2"
          style={{
            maxWidth: "1200px",
            margin: "auto",
            gap: "30px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            {...cardHover}
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              style={{
                color: "#DC2626",
                fontSize: "32px",
                fontWeight: "900",
                marginBottom: "20px",
              }}
            >
              رؤيتنا
            </motion.h3>

            <motion.p
              whileHover={{ x: 5 }}
              style={{
                color: "#6B7280",
                lineHeight: "2",
              }}
            >
              أن نكون من أفضل المراكز التعليمية في مصر وأن نصنع
              جيلاً قادراً على النجاح والمنافسة.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            {...cardHover}
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "30px",
            }}
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              style={{
                color: "#F97316",
                fontSize: "32px",
                fontWeight: "900",
                marginBottom: "20px",
              }}
            >
              رسالتنا
            </motion.h3>

            <motion.p
              whileHover={{ x: 5 }}
              style={{
                color: "#6B7280",
                lineHeight: "2",
              }}
            >
              تقديم تعليم عالي الجودة يعتمد على الفهم والتطبيق
              مع توفير بيئة تعليمية متطورة ومحفزة.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "120px 20px",
          background: "#fff",
        }}
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            maxWidth: "1200px",
            margin: "auto",
            gap: "25px",
          }}
        >
          {[
            {
              number: "+1000",
              title: "طالب",
            },
            {
              number: "+25",
              title: "مدرس",
            },
            {
              number: "+50",
              title: "كتاب تعليمي",
            },
            {
              number: "%95",
              title: "نسبة نجاح",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              {...cardHover}
              style={{
                background: "#FFF7ED",
                padding: "40px",
                borderRadius: "25px",
                textAlign: "center",
              }}
            >
              <motion.h3
                whileHover={{ scale: 1.1 }}
                style={{
                  fontSize: "45px",
                  fontWeight: "900",
                  color:
                    index % 2 === 0
                      ? "#DC2626"
                      : "#F97316",
                }}
              >
                {item.number}
              </motion.h3>

              <motion.p
                whileHover={{ scale: 1.05 }}
                style={{
                  color: "#6B7280",
                  marginTop: "10px",
                }}
              >
                {item.title}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "120px 20px",
          background: "#FFF7ED",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            style={{
              textAlign: "center",
              fontSize: "50px",
              fontWeight: "900",
              marginBottom: "60px",
              color: "#111827",
            }}
          >
            لماذا يختارنا الطلاب؟
          </motion.h2>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{
              gap: "25px",
            }}
          >
            {[
              "أفضل المدرسين",
              "اختبارات دورية",
              "متابعة مستمرة",
              "مذكرات تعليمية",
              "قاعات مجهزة",
              "دعم أولياء الأمور",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                {...cardHover}
                style={{
                  background: "#fff",
                  padding: "35px",
                  borderRadius: "25px",
                }}
              >
                <motion.h3
                  whileHover={{ scale: 1.05, x: 5 }}
                  style={{
                    color: "#DC2626",
                    fontWeight: "800",
                    marginBottom: "15px",
                  }}
                >
                  {feature}
                </motion.h3>

                <motion.p
                  whileHover={{ x: 5 }}
                  style={{
                    color: "#6B7280",
                    lineHeight: "2",
                  }}
                >
                  نوفر أفضل مستوى من الخدمات التعليمية لضمان
                  تحقيق أعلى النتائج للطلاب.
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "120px 20px",
          background:
            "linear-gradient(135deg,#DC2626,#F97316)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: "900px",
            margin: "auto",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <motion.h2
            whileHover={{ scale: 1.03 }}
            style={{
              fontSize: "60px",
              fontWeight: "900",
              marginBottom: "25px",
            }}
          >
            ابدأ رحلتك نحو التفوق الآن
          </motion.h2>

          <motion.p
            whileHover={{ scale: 1.02 }}
            style={{
              lineHeight: "2",
              marginBottom: "30px",
            }}
          >
            انضم إلى مئات الطلاب الذين حققوا النجاح معنا.
          </motion.p>

          <Link href="/#contact">
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring" as const, stiffness: 400 }}
              style={{
                background: "#fff",
                color: "#DC2626",
                padding: "18px 35px",
                borderRadius: "18px",
                fontWeight: "800",
              }}
            >
              سجل الآن
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
