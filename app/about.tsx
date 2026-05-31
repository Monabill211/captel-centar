"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "أفضل المدرسين",
    desc: "نخبة من أقوى المدرسين في مختلف المواد الدراسية.",
  },
  {
    title: "اختبارات دورية",
    desc: "متابعة مستمرة لمستوى الطالب طوال العام.",
  },
  {
    title: "مذكرات مميزة",
    desc: "شرح مبسط وتمارين شاملة تساعد على التفوق.",
  },
  {
    title: "متابعة أولياء الأمور",
    desc: "تقارير دورية عن الحضور والمستوى الدراسي.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 20px",
        background: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <div
          className="grid lg:grid-cols-2 items-center"
          style={{
            gap: "60px",
          }}
        >
          {/* Image */}
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <img
              src="/img/x_1YUy74SFJ3mMgao_6nJFWNRzRPASRV_kYmo9qg6SSaITTUNNCDXjs0Vr__-Ot5vRtAJXnx1LnlVl8rNzSPr3SptNNyZHtRwUHWfSEWMf2wIBqZwglYvd5vFe7ZMe15k6kv9BboomtsDe76aRJh3uY2kISz2lsI5wIKmF5LGrJT24cmNwXTTrpZ1HokA4Fm.jpg"
              alt="Capital Center"
              className="w-full object-cover rounded-3xl"
              style={{
                height: "500px",
              }}
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
              className="absolute bg-white rounded-3xl shadow-xl"
              style={{
                bottom: "20px",
                left: "20px",
                padding: "20px 30px",
              }}
            >
              <h3
                style={{
                  color: "#DC2626",
                  fontSize: "32px",
                  fontWeight: "900",
                }}
              >
                +1000
              </h3>

              <p
                style={{
                  color: "#6B7280",
                }}
              >
                طالب وطالبة
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: 100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <p
              style={{
                color: "#DC2626",
                fontWeight: "700",
                letterSpacing: "3px",
                marginBottom: "15px",
              }}
            >
              ABOUT US
            </p>

            <h2
              className="font-black text-gray-900"
              style={{
                fontSize: "clamp(2rem,5vw,4rem)",
                lineHeight: "1.3",
                marginBottom: "25px",
              }}
            >
              لماذا يختار الطلاب{" "}
              <span
                style={{
                  color: "#DC2626",
                }}
              >
                سنتر كابيتال؟
              </span>
            </h2>

            <p
              style={{
                color: "#6B7280",
                lineHeight: "2",
                marginBottom: "35px",
              }}
            >
              نسعى إلى توفير بيئة تعليمية متكاملة تساعد الطلاب
              على تحقيق أعلى مستويات النجاح من خلال نخبة من أفضل
              المدرسين، ومذكرات تعليمية متطورة، واختبارات دورية
              لمتابعة مستوى كل طالب باستمرار.
            </p>

            {/* Features */}
            <div
              className="grid md:grid-cols-2"
              style={{
                gap: "20px",
              }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  style={{
                    background: "#FFF7ED",
                    padding: "20px",
                    borderRadius: "20px",
                    border: "1px solid #FED7AA",
                  }}
                >
                  <h3
                    style={{
                      color: "#DC2626",
                      fontWeight: "800",
                      marginBottom: "10px",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      color: "#6B7280",
                      lineHeight: "1.8",
                    }}
                  >
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
              className="grid grid-cols-3"
              style={{
                marginTop: "40px",
                gap: "20px",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "#DC2626",
                    fontSize: "32px",
                    fontWeight: "900",
                  }}
                >
                  +1000
                </h3>

                <p className="text-gray-500">طالب</p>
              </div>

              <div>
                <h3
                  style={{
                    color: "#F97316",
                    fontSize: "32px",
                    fontWeight: "900",
                  }}
                >
                  +20
                </h3>

                <p className="text-gray-500">مدرس</p>
              </div>

              <div>
                <h3
                  style={{
                    color: "#DC2626",
                    fontSize: "32px",
                    fontWeight: "900",
                  }}
                >
                  %95
                </h3>

                <p className="text-gray-500">نسبة نجاح</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}