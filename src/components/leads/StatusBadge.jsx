/**
 * Map of status string names to customized light/dark Tailwind styling classes
 * for consistent, premium aesthetics.
 */
const STATUS_STYLES = {
  "New": "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600/50",
  "Contacted": "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/30",
  "Meeting Scheduled": "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/30",
  "Proposal Sent": "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/30",
  "Won": "bg-green-50 text-green-700 border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/30",
  "Lost": "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/30",
};

/**
 * StatusBadge component
 * Renders a pill-shaped badge indicating a lead's pipeline status,
 * colored dynamically according to standard brand guidelines.
 * 
 * @component
 * @param {object} props - Component props
 * @param {string} props.status - The lead status value (e.g. "Won", "Meeting Scheduled")
 */
export default function StatusBadge({ status = "New" }) {
  const badgeStyle = STATUS_STYLES[status] || STATUS_STYLES["New"];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors duration-200 ${badgeStyle}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75" />
      {status}
    </span>
  );
}
