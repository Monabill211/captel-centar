"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCenterStore } from "@/lib/hooks/useCenterStore";

export default function TeachersSection() {
  const { teachers } = useCenterStore();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const subjects = [...new Set(teachers.map((t) => t.subject))];

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const subjectMatch =
        selectedSubject === "" ||
        teacher.subject === selectedSubject;

      const teacherMatch =
        selectedTeacher === "" ||
        teacher.name === selectedTeacher;

      return subjectMatch && teacherMatch;
    });
  }, [teachers, selectedSubject, selectedTeacher]);

  return (
    <section
      id="teachers"
      style={{
        padding: "120px 20px",
        background: "#FFF7ED",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
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
            marginBottom: "50px",
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
            OUR TEACHERS
          </p>

          <h2
            className="font-black text-gray-900"
            style={{
              fontSize: "clamp(2rem,5vw,4rem)",
              marginBottom: "20px",
            }}
          >
            نخبة من أفضل{" "}
            <span
              style={{
                color: "#DC2626",
              }}
            >
              المدرسين
            </span>
          </h2>

          <p
            style={{
              color: "#6B7280",
              maxWidth: "700px",
              margin: "auto",
              lineHeight: "2",
            }}
          >
            اختر المادة أو المدرس المناسب لك، وابدأ رحلتك نحو
            التفوق الدراسي مع أفضل الكفاءات التعليمية.
          </p>
        </motion.div>

        {/* Filters */}
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
            duration: 0.7,
            delay: 0.2,
          }}
          className="grid md:grid-cols-2"
          style={{
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(e.target.value)
            }
            className="bg-white border outline-none"
            style={{
              padding: "16px",
              borderRadius: "16px",
              borderColor: "#FED7AA",
            }}
          >
            <option value="">
              اختر المادة
            </option>

            {subjects.map((subject) => (
              <option
                key={subject}
                value={subject}
              >
                {subject}
              </option>
            ))}
          </select>

          <select
            value={selectedTeacher}
            onChange={(e) =>
              setSelectedTeacher(e.target.value)
            }
            className="bg-white border outline-none"
            style={{
              padding: "16px",
              borderRadius: "16px",
              borderColor: "#FED7AA",
            }}
          >
            <option value="">
              اختر المدرس
            </option>

            {teachers.map((teacher) => (
              <option
                key={teacher.id}
                value={teacher.name}
              >
                {teacher.name}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Cards */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "25px",
          }}
        >
          {filteredTeachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
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
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
              }}
              className="bg-white overflow-hidden"
              style={{
                borderRadius: "28px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.06)",
              }}
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full object-cover"
                style={{
                  height: "300px",
                }}
              />

              <div
                style={{
                  padding: "24px",
                }}
              >
                <span
                  style={{
                    color: "#F97316",
                    fontWeight: "700",
                  }}
                >
                  {teacher.subject}
                </span>

                <h3
                  className="font-black text-gray-900"
                  style={{
                    fontSize: "24px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {teacher.name}
                </h3>

                <p
                  style={{
                    color: "#6B7280",
                    lineHeight: "1.9",
                    marginBottom: "15px",
                  }}
                >
                  {teacher.bio}
                </p>

                <div
                  style={{
                    color: "#DC2626",
                    fontWeight: "700",
                    marginBottom: "20px",
                  }}
                >
                  👨‍🎓 {teacher.students}
                </div>

                <button
                  className="w-full text-white font-bold"
                  style={{
                    background:
                      "linear-gradient(90deg,#DC2626,#F97316)",
                    padding: "14px",
                    borderRadius: "16px",
                    cursor:"pointer"
                  }}
                >
                  <Link
                    href={`/teachers/booking?id=${teacher.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    احجز مع المدرس
                  </Link>
                </button>
              </div>
            </motion.div>
          ))}
                
        </div>
<motion.button
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring" as const, stiffness: 400 }}
                  style={{
                    margin: "40px auto 0",
                    display: "flex",
                    justifyContent: "center",
                    background: "#fff",
                    color: "#DC2626",
                    padding: "18px 35px",
                    borderRadius: "18px",
                    fontWeight: "800",
                    fontSize: "24px",
                    width:"450px",
                    cursor: "pointer",
                
                  }}
                >
            شاهد كل المدرسين
          </motion.button>
        {filteredTeachers.length === 0 && (
          <div
            className="text-center"
            style={{
              marginTop: "40px",
              color: "#6B7280",
            }}
          >
            لا يوجد مدرسون مطابقون للبحث.
          </div>
        )}
      </div>
    </section>
  );
}