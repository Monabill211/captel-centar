"use client";

import { motion } from "framer-motion";
import { adminTheme } from "../admin-theme";

type Variant = "primary" | "outline" | "danger";

export default function AdminButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  small,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  small?: boolean;
}) {
  const styles: Record<Variant, React.CSSProperties> = {
    primary: {
      background: adminTheme.gradient,
      color: "#fff",
      border: "none",
    },
    outline: {
      background: "#fff",
      color: adminTheme.primary,
      border: `1.5px solid ${adminTheme.border}`,
    },
    danger: {
      background: "#FEE2E2",
      color: "#DC2626",
      border: "none",
    },
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: small ? "8px 16px" : "12px 24px",
        borderRadius: "12px",
        fontWeight: 700,
        fontSize: small ? "0.82rem" : "0.9rem",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  );
}
