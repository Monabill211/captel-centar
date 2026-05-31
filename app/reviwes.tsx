"use client";

import SchoolIcon from "@mui/icons-material/School";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const reviews = [
  {
    name: "أحمد محمد",
    grade: "الصف الثالث الثانوي",
    review:
      "الشرح كان ممتاز جدًا وساعدني أفهم المواد بشكل أبسط وأجيب درجات أعلى من المتوقع.",
    rating: 5,
  },
  {
    name: "سارة خالد",
    grade: "الصف الثاني الثانوي",
    review:
      "المدرسين متعاونين جدًا والمتابعة المستمرة خلتني ملتزمة بالمذاكرة طول السنة.",
    rating: 5,
  },
  {
    name: "يوسف علي",
    grade: "الصف الأول الثانوي",
    review:
      "الكتب والمذكرات منظمة جدًا والشرح داخل الحصص واضح وسهل الفهم.",
    rating: 5,
  },
  {
    name: "ملك أحمد",
    grade: "الصف الثالث الثانوي",
    review:
      "أفضل سنتر اتعاملت معاه، تنظيم ممتاز ومستوى المدرسين رائع.",
    rating: 5,
  },
  {
    name: "عمر محمود",
    grade: "الصف الثاني الثانوي",
    review:
      "الاختبارات الدورية والمتابعة ساعدتني أعرف مستوايا وأطور نفسي باستمرار.",
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section
      dir="rtl"
      className="overflow-hidden"
      style={{
        background: "#FFF7ED",
        padding: "120px 20px",
      }}
    >
      {/* Heading */}
      <div
        className="text-center"
        style={{
          marginBottom: "70px",
        }}
      >
        <p
          style={{
            color: "#DC2626",
            letterSpacing: "4px",
            fontSize: "12px",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          STUDENT REVIEWS
        </p>

        <h2
          className="font-black text-gray-900"
          style={{
            fontSize: "clamp(2rem,5vw,4rem)",
            marginBottom: "20px",
          }}
        >
          آراء <span style={{ color: "#DC2626" }}>طلابنا</span>
        </h2>

        <p
          style={{
            color: "#6B7280",
            maxWidth: "700px",
            margin: "auto",
            lineHeight: "2",
          }}
        >
          استمع إلى تجارب طلابنا وكيف ساعدهم السنتر على تحقيق
          التفوق والنجاح الدراسي.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: false,
          scale: 0.9,
        }}
        pagination={{
          clickable: true,
        }}
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
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="reviewSwiper"
      >
        {reviews.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="review-card">
              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  marginBottom: "18px",
                }}
              >
                {[...Array(item.rating)].map((_, index) => (
                  <span
                    key={index}
                    style={{
                      color: "#F97316",
                      fontSize: "22px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Review */}
              <p className="review-text">{item.review}</p>

              {/* User */}
              <div className="user-box">
                <div>
                  <h3 className="user-name">{item.name}</h3>

                  <div className="grade-box">
                    <SchoolIcon
                      style={{
                        fontSize: "18px",
                      }}
                    />

                    {item.grade}
                  </div>
                </div>

                <span className="quote">”</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .reviewSwiper {
          width: 100%;
          padding-top: 20px;
          padding-bottom: 70px;
        }

        .review-card {
          background: #fff;
          border: 1px solid #fed7aa;
          border-radius: 28px;
          padding: 35px;
          min-height: 300px;
          transition: 0.4s;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .review-card:hover {
          transform: translateY(-10px);
          border-color: #f97316;
          box-shadow: 0 20px 40px rgba(249, 115, 22, 0.15);
        }

        .review-text {
          color: #4b5563;
          line-height: 2;
          font-size: 15px;
          margin-bottom: 35px;
        }

        .user-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .user-name {
          color: #111827;
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .grade-box {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #dc2626;
          font-size: 14px;
          font-weight: 700;
        }

        .quote {
          font-size: 70px;
          color: rgba(220, 38, 38, 0.08);
          line-height: 1;
          font-weight: 900;
        }

        @media (max-width: 768px) {
          .review-card {
            padding: 25px;
            min-height: 260px;
          }
        }
      `}</style>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(220, 38, 38, 0.25) !important;
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