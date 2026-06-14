const filters = [
  "All",
  "New",
  "Contacted",
  "Meeting Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function FilterBar({
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-3 py-1 rounded ${
            activeFilter === filter
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}