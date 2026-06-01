"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setOpen(false);
  };
  
  const menuItems = [
    { label: "الرئيسية", id: "/" },
    { label: "عن السنتر", id: "About" },
    { label: "المدرسون", id: "/teachers" },
    { label: "الكتب التعليمية", id: "books" },
    { label: "اجوابه علي اسئلتك", id: "blog" },
    { label: "تواصل معنا", id: "contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        dir="rtl"
        className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm"
      >
        <div
          className="max-w-7xl"
          style={{
            margin: "auto",
            padding: "0 20px",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              height: "80px",
            }}
          >
            {/* Logo */}
            <Link href="/">
              <div
                className="flex items-center cursor-pointer"
                style={{
                  gap: "12px",
                }}
              >
                <img
                  src="/public/img/"
                  alt="logo"
                  className="object-contain"
                  style={{
                    width: "56px",
                    height: "56px",
                  }}
                />

                <div>
                  <h2
                    className="font-black text-[#DC2626]"
                    style={{
                      fontSize: "22px",
                    }}
                  >
                    سنتر كابيتال
                  </h2>

                  <p
                    className="text-gray-500"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    طريقك نحو التفوق والنجاح
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div
              className="hidden lg:flex items-center"
              style={{
                gap: "32px",
              }}
            >
              {menuItems.map((item) => (
                <Link key={item.id} href={item.id}>
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="
                  relative
                  font-bold
                  text-gray-700
                  hover:text-[#DC2626]
                  transition
                  after:absolute
                  after:right-0
                  after:-bottom-2
                  after:w-0
                  after:h-[2px]
                  after:bg-[#DC2626]
                  after:transition-all
                  hover:after:w-full
                  
                  "
                >
                  {item.label}
                </button></Link>
              ))}
            </div>

            {/* Right Side */}
            <div
              className="flex items-center"
              style={{
                gap: "12px",
              }}
            >
              <button
                onClick={() => scrollTo("contact")}
                className="
                hidden md:block
                rounded-full
                text-white
                font-bold
                bg-gradient-to-r
                from-[#DC2626]
                to-[#F97316]
                hover:scale-105
                transition
                "
                style={{
                  padding: "12px 24px",
                }}
              >
                سجل الآن
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                  className="text-[#DC2626]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[60] transition-all duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        dir="rtl"
        className={`fixed top-0 right-0 h-full bg-white z-[70] shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        style={{
          width: "320px",
        }}
      >
        {/* Header */}
        <div
          className="bg-gradient-to-r from-[#DC2626] to-[#F97316] flex items-center justify-between"
          style={{
            padding: "20px",
          }}
        >
          <h2
            className="text-white font-black"
            style={{
              fontSize: "22px",
            }}
          >
            سنتر كابيتال
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-white"
            style={{
              fontSize: "32px",
            }}
          >
            ×
          </button>
        </div>

        {/* Links */}
        <div
          className="flex flex-col"
          style={{
            padding: "20px",
            gap: "12px",
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="
              text-right
                   cursor-pointer
              font-bold
              rounded-xl
              hover:bg-orange-50
              hover:text-[#DC2626]
              transition
         
              "
              style={{
                padding: "16px",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="absolute right-0 left-0"
          style={{
            bottom: "20px",
            padding: "0 20px",
          }}
        >
          <button
            onClick={() => scrollTo("contact")}
            className="
            w-full
            rounded-2xl
            text-white
            font-bold
            bg-gradient-to-r
            from-[#DC2626]
            to-[#F97316]
            cursor-pointer
            transition
            hover:scale-105
            "
            style={{
              padding: "16px",
            }}
          >
            سجل الآن
          </button>
        </div>
      </div>
    </>
  );
}