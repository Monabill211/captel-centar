"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCenterStore } from "@/lib/hooks/useCenterStore";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

export default function BooksSection() {
  const { books } = useCenterStore();
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = [...new Set(books.map((book) => book.subject))];

  const filteredBooks = useMemo(() => {
    if (!selectedSubject) return books;

    return books.filter(
      (book) => book.subject === selectedSubject
    );
  }, [selectedSubject]);

  return (
    <section
      id="books"
      style={{
        padding: "120px 20px",
        background: "#ffffff",
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
            EDUCATIONAL BOOKS
          </p>

          <h2
            className="font-black text-gray-900"
            style={{
              fontSize: "clamp(2rem,5vw,4rem)",
              marginBottom: "20px",
            }}
          >
            الكتب{" "}
            <span
              style={{
                color: "#DC2626",
              }}
            >
              التعليمية
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
            مجموعة من أفضل الكتب والمذكرات التعليمية لمساعدة
            الطلاب على التفوق وتحقيق أعلى الدرجات.
          </p>
        </motion.div>

        {/* Select */}
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
          }}
          style={{
            marginBottom: "50px",
          }}
        >
          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(e.target.value)
            }
            className="w-full md:w-[350px] bg-white border outline-none"
            style={{
              padding: "16px",
              borderRadius: "16px",
              borderColor: "#FED7AA",
            }}
          >
            <option value="">
              جميع المواد
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
        </motion.div>

        {/* Books Slider */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <Swiper
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={25}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {filteredBooks.map((book) => (
              <SwiperSlide key={book.id}>
                <motion.div
                  whileHover={{
                    y: -10,
                  }}
                  className="bg-white overflow-hidden"
                  style={{
                    borderRadius: "28px",
                    border: "1px solid #FED7AA",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,.06)",
                  }}
                >
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full object-cover"
                    style={{
                      height: "320px",
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
                      {book.subject}
                    </span>

                    <h3
                      className="font-black text-gray-900"
                      style={{
                        fontSize: "24px",
                        marginTop: "10px",
                        marginBottom: "12px",
                      }}
                    >
                      {book.name}
                    </h3>

                    <p
                      style={{
                        color: "#6B7280",
                        lineHeight: "1.9",
                        marginBottom: "20px",
                      }}
                    >
                      {book.description}
                    </p>

                    <Link href={`/books/booking-Book?id=${book.id}`}>
                      <button
                        className="w-full text-white font-bold"
                        style={{
                          background:
                            "linear-gradient(90deg,#DC2626,#F97316)",
                          padding: "14px",
                          borderRadius: "16px",
                        }}
                      >
                        احجز الكتاب
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          margin-top: 20px;
        }

        .swiper-pagination-bullet {
          background: rgba(220, 38, 38, 0.3) !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: #dc2626 !important;
          width: 28px !important;
          border-radius: 999px !important;
        }
      `}</style>
    </section>
  );
}