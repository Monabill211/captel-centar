"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        padding: "80px 20px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "auto",
        }}
      >
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "40px",
            marginBottom: "50px",
          }}
        >
          {/* Logo */}
          <div>
            <h2
              style={{
                color: "#fff",
                fontSize: "32px",
                fontWeight: "900",
                marginBottom: "15px",
              }}
            >
              <span style={{ color: "#DC2626" }}>
                Capital
              </span>{" "}
              Center
            </h2>

            <p
              style={{
                color: "#9CA3AF",
                lineHeight: "2",
              }}
            >
              نسعى لتقديم أفضل تجربة تعليمية للطلاب من خلال
              نخبة من أفضل المدرسين والمتابعة المستمرة لتحقيق
              أعلى النتائج.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              style={{
                color: "#fff",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              روابط سريعة
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Link href="/" className="text-gray-400 hover:text-white cursor-pointer">
                الرئيسية
              </Link>

              <Link href="/About" className="text-gray-400 hover:text-white cursor-pointer">
                عن السنتر
              </Link>

              <Link
                href="/teachers"
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                المدرسون
              </Link>

              <Link href="/books" className="text-gray-400 hover:text-white cursor-pointer">
                الكتب
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              style={{
                color: "#fff",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              تواصل معنا
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                color: "#9CA3AF",
              }}
            >
              <span>📞 01021219588</span>
              <span>📧 info@capitalcenter.com</span>
              <span>📍 اكتوبر الحي السابع - الجيزه - مصر</span>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h3
              style={{
                color: "#fff",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              ابدأ الآن
            </h3>

            <p
              style={{
                color: "#9CA3AF",
                marginBottom: "20px",
                lineHeight: "1.8",
              }}
            >
              احجز مكانك الآن وابدأ رحلتك نحو التفوق الدراسي.
            </p>

            <button
              style={{
                background:
                  "linear-gradient(90deg,#DC2626,#F97316)",
                color: "#fff",
                borderRadius: "14px",
                padding: "14px 24px",
                fontWeight: "700",
                width: "100%",
                cursor:"pointer"
              }}
            >
              سجل الآن
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.1)",
            padding: "25px 0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#9CA3AF",
            }}
          >
            © 2026 جميع الحقوق محفوظة لـ Capital Center
          </p>

          <p
            style={{
              marginTop: "10px",
              fontWeight: "700",
             color:"white"
            }}
          >
            Developed by <span style={{ background: "#F97316", padding: "2px 6px", borderRadius: "4px" }}>MoSalah</span> 
          </p>
        </div>
      </div>
    </footer>
  );
}