export const ANALYTICS_COLORS = {
  blue: "#2563eb",
  indigo: "#4f46e5",
  violet: "#7c3aed",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  cyan: "#06b6d4",
  slate: "#64748b",
};

export const STATUS_COLORS = {
  New: ANALYTICS_COLORS.blue,
  Contacted: ANALYTICS_COLORS.indigo,
  "Meeting Scheduled": ANALYTICS_COLORS.amber,
  "Proposal Sent": ANALYTICS_COLORS.violet,
  Won: ANALYTICS_COLORS.emerald,
  Lost: ANALYTICS_COLORS.rose,
};

export const CHART_COLORS = [
  ANALYTICS_COLORS.blue,
  ANALYTICS_COLORS.indigo,
  ANALYTICS_COLORS.violet,
  ANALYTICS_COLORS.emerald,
  ANALYTICS_COLORS.amber,
  ANALYTICS_COLORS.rose,
  ANALYTICS_COLORS.cyan,
];

export const DATE_FILTERS = [
  { label: "Last 7 Days", value: "7d", days: 7 },
  { label: "Last 30 Days", value: "30d", days: 30 },
  { label: "Last 90 Days", value: "90d", days: 90 },
  { label: "This Year", value: "year", days: null },
];

export const CHART_GRID_COLOR = "#e2e8f0";
export const CHART_TEXT_COLOR = "#64748b";
