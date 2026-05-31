"use client";

import { adminTheme } from "../admin-theme";

export default function PageHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <p
        style={{
          color: adminTheme.primary,
          fontWeight: 700,
          letterSpacing: "2px",
          fontSize: "0.75rem",
          marginBottom: "8px",
        }}
      >
        {tag}
      </p>
      <h1
        style={{
          fontSize: "clamp(1.5rem,3vw,2rem)",
          fontWeight: 900,
          color: "#111",
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: adminTheme.muted,
            marginTop: "8px",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
