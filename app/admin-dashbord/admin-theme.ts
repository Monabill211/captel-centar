export const adminTheme = {
  primary: "#DC2626",
  secondary: "#F97316",
  gradient: "linear-gradient(135deg,#DC2626,#F97316)",
  heroGradient:
    "linear-gradient(135deg, #1a0000 0%, #7f1d1d 50%, #1a0000 100%)",
  cardShadow: "0 8px 40px rgba(0,0,0,0.08)",
  border: "#FED7AA",
  muted: "#6B7280",
  bg: "#fafafa",
  sidebarBg: "#111827",
};

export const orderStatusLabels: Record<string, string> = {
  pending: "قيد المراجعة",
  confirmed: "تم التأكيد",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

export const bookingStatusLabels: Record<string, string> = {
  pending: "قيد المراجعة",
  confirmed: "تم التأكيد",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export const statusColors: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#FEF3C7", color: "#B45309" },
  confirmed: { bg: "#DBEAFE", color: "#1D4ED8" },
  delivered: { bg: "#D1FAE5", color: "#047857" },
  completed: { bg: "#D1FAE5", color: "#047857" },
  cancelled: { bg: "#FEE2E2", color: "#DC2626" },
};
