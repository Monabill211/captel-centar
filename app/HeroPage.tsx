"use client";

import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function HeroPage() {
  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {/* Background */}
      <img
        src="/img/BDEQP-Ap00UZPON9uZgCZ24uePryj9GXsFf_UOJQG_xF7P6L3k06kQaY2_NgZf2N_2nEUB3QOEWk703HfQwtdfN6BHSIWnXcrCsxgbMCfvUWYBqt47Fun3vk3GXpfz4Lhwx5ljAWoZtGbZXVDyAKdrJDdq2r1IPMgzuiKX0aQkk.jpg"
        alt="Students"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-center items-center text-center"
        style={{
          padding: "0 20px",
        }}
      >
       
        {/* Badge */}
        <div
          className="bg-gradient-to-r from-[#DC2626] to-[#F97316] text-white rounded-full font-bold"
          style={{
            padding: "10px 22px",
            marginBottom: "25px",
          }}
        >
          مستقبلك يبدأ من هنا
        </div>
<h1
  className="font-black  bg-gradient-to-r from-[#DC2626] to-[#F97316] bg-clip-text text-transparent"
  style={{
    fontSize: "clamp(3rem, 8vw, 6rem)",
    lineHeight: "1",
  }}
>
  سنتر كابيتال
</h1>س
        {/* Title */}
        <h2
          className="text-white font-black"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 5rem)",
            lineHeight: "1.3",
          }}
        >
          <TypeAnimation
            sequence={[
              "أفضل المدرسين",
              2000,
              "",
              500,
              "أفضل الكتب التعليمية",
              2000,
              "",
              500,
              "طريقك للتفوق والنجاح",
              2000,
              "",
              500,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h2>

        {/* Description */}
        <p
          className="text-gray-200"
          style={{
            maxWidth: "850px",
            fontSize: "clamp(1rem,2vw,1.4rem)",
            marginTop: "25px",
          }}
        >
          نوفر بيئة تعليمية مميزة تضم نخبة من أفضل المدرسين
          وأحدث أساليب الشرح لمساعدة الطلاب على تحقيق أعلى
          الدرجات والتفوق الدراسي.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col md:flex-row gap-4"
          style={{
            marginTop: "35px",
          }}
        >
          <button
            className="text-white font-bold rounded-full transition hover:scale-105 cursor-pointer"
            style={{
              background:
                "linear-gradient(90deg,#DC2626,#F97316)",
              padding: "14px 35px",
            }}
          >
            سجل الآن
          </button>
<Link href={"/About"}>

          <button
            className="bg-white text-gray-900 font-bold rounded-full transition hover:bg-gray-100 cursor-pointer"
            style={{
              padding: "14px 35px",
            }}
          >
            تعرف علينا
          </button>
          </Link>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 bg-white/10 backdrop-blur-md rounded-3xl"
          style={{
            marginTop: "60px",
            gap: "50px",
            padding: "25px 40px",
          }}
        >
          <div>
            <h2
              className="text-white font-black"
              style={{
                fontSize: "2rem",
              }}
            >
              +1000
            </h2>

            <p className="text-gray-200">
              طالب
            </p>
          </div>

          <div>
            <h2
              className="text-white font-black"
              style={{
                fontSize: "2rem",
              }}
            >
              +20
            </h2>

            <p className="text-gray-200">
              مدرس
            </p>
          </div>

          <div>
            <h2
              className="text-white font-black"
              style={{
                fontSize: "2rem",
              }}
            >
              %95
            </h2>

            <p className="text-gray-200">
              نسبة نجاح
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}