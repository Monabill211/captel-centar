"use client";

import { motion } from "framer-motion";
import { adminTheme } from "../admin-theme";

export default function StatCard({
  label,
  value,
  icon,
  delay = 0,
}: {
  label: string;
  value: string | number;
  icon: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        border: `1px solid ${adminTheme.border}`,
        boxShadow: adminTheme.cardShadow,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p style={{ color: adminTheme.muted, fontSize: "0.85rem", margin: 0 }}>
            {label}
          </p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              margin: "8px 0 0",
              background: adminTheme.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {value}
          </p>
        </div>
        <span
          style={{
            fontSize: "1.8rem",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "14px",
            background: "rgba(220,38,38,0.08)",
          }}
        >
          {icon}
        </span>
      </div>
    </motion.div>
  );
}
