"use client";

import { motion } from "framer-motion";
import Navbar from "../navbar";
import Footer from "../footer";

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "رقم الهاتف",
    value: "01000000000",
    href: "tel:01000000000",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.625a.75.75 0 00.918.918l5.77-1.475A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.002-1.379l-.357-.214-3.71.95.968-3.617-.234-.372A9.75 9.75 0 1112 21.75z" />
      </svg>
    ),
    label: "واتساب",
    value: "01021219588",
    href: "https://wa.me/201021219588",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "البريد الإلكتروني",
    value: "info@capital-center.com",
    href: "mailto:info@capital-center.com",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "العنوان",
    value: "اكتوبر الحي السابع - الجيزه - مصر",
    href: "https://maps.google.com/?q=Alexandria,Egypt",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactSection() {
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
              تواصل مع سنتر   {" "}
              <span style={{
                background: "linear-gradient(90deg,#DC2626,#F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                كابيتال
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.9 }}>
تواصل معنا اليوم لاختيار المدرس المثالي لاحتياجاتك التعليمية وابدأ رحلتك نحو التفوق الدراسي مع أفضل المعلمين في سنتر كابيتال.
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
      id="contact"
      className="bg-white"
      style={{ padding: "120px 20px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
          style={{ marginBottom: "70px" }}
        >
          <span className="text-[#DC2626] font-bold tracking-[3px]">
            CONTACT US
          </span>
          <h2
            className="font-black text-gray-900"
            style={{ fontSize: "clamp(2.5rem,5vw,4rem)", marginTop: "15px" }}
          >
            تواصل معنا
          </h2>
          <p className="text-gray-500" style={{ marginTop: "20px" }}>
            نحن جاهزون للرد على جميع استفساراتكم ومساعدتكم في اختيار المدرس المناسب.
          </p>
        </motion.div>

        {/* Top Row: Info + Form */}
        <div
          className="grid lg:grid-cols-2"
          style={{ gap: "40px", marginBottom: "40px" }}
        >
          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-orange-50 rounded-4xl"
            style={{ padding: "40px" }}
          >
            <motion.h3
              className="font-black text-[#DC2626]"
              style={{ fontSize: "35px", marginBottom: "30px" }}
            >
              بيانات التواصل
            </motion.h3>

            <div className="flex flex-col" style={{ gap: "20px" }}>
              {contactInfo.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: -6, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 bg-white rounded-2xl group cursor-pointer no-underline"
                  style={{ padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="text-[#DC2626] bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-[#DC2626] group-hover:text-white transition-colors duration-300"
                    style={{ width: "46px", height: "46px", flexShrink: 0 }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-white shadow-xl rounded-4xl border border-orange-100"
            style={{ padding: "40px" }}
          >
            <div className="flex flex-col" style={{ gap: "20px" }}>
              <input
                type="text"
                placeholder="الاسم بالكامل"
                className="border border-gray-200 rounded-xl outline-none focus:border-[#DC2626] transition-colors duration-200"
                style={{ padding: "15px", direction: "rtl" }}
              />
              <input
                type="tel"
                placeholder="رقم الهاتف"
                className="border border-gray-200 rounded-xl outline-none focus:border-[#DC2626] transition-colors duration-200"
                style={{ padding: "15px", direction: "rtl" }}
              />
             
              <textarea
                placeholder="اكتب رسالتك"
                rows={5}
                className="border border-gray-200 rounded-xl outline-none focus:border-[#DC2626] transition-colors duration-200"
                style={{ padding: "15px", direction: "rtl", resize: "none" }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-bold rounded-xl bg-gradient-to-r from-[#DC2626] to-[#F97316]"
                style={{ padding: "18px" }}
              >
                إرسال الرسالة
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Map Row */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="rounded-4xl overflow-hidden border border-orange-100"
          style={{
            height: "380px",
            boxShadow: "0 8px 40px rgba(220,38,38,0.08)",
            position: "relative",
          }}
        >
          {/* Red accent bar on top */}
          <div
            className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-[#DC2626] to-[#F97316]"
            style={{ height: "5px" }}
          />

          <iframe
            title="موقعنا على الخريطة"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.77694438636!2d29.8738707!3d31.2000924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c49126710fd3%3A0xb4f3d42a6fa60e12!2sAlexandria%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

      </div>
    </section>
       <Footer />
    </>
  );
}