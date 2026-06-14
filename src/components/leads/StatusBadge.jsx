export default function StatusBadge({ status }) {
  const colors = {
    New: "bg-gray-200 text-gray-800",
    Contacted: "bg-blue-100 text-blue-800",
    "Meeting Scheduled": "bg-yellow-100 text-yellow-800",
    "Proposal Sent": "bg-purple-100 text-purple-800",
    Won: "bg-green-100 text-green-800",
    Lost: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[status] || "bg-gray-200 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}