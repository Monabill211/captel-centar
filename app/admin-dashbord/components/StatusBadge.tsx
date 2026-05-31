"use client";

import { statusColors } from "../admin-theme";

export default function StatusBadge({
  label,
  statusKey,
}: {
  label: string;
  statusKey: string;
}) {
  const colors = statusColors[statusKey] ?? statusColors.pending;
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.color,
        fontWeight: 700,
        fontSize: "0.78rem",
        padding: "4px 12px",
        borderRadius: "20px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
