import StatusBadge from "./StatusBadge";

export default function LeadCard({
  lead,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-colors duration-200">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {lead.name}
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        {lead.company}
      </p>

      <div className="mt-3">
        <StatusBadge status={lead.status} />
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {lead.email}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {lead.phone}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(lead)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(lead.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}