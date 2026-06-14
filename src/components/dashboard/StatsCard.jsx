export default function StatsCard({
  title,
  value,
  change,
  color = "bg-blue-500",
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className={`w-4 h-4 rounded-full ${color}`}></div>
      </div>

      <h2 className="text-3xl font-bold mt-3">{value}</h2>

      <p className="text-green-600 text-sm mt-2">
        {change}% from last month
      </p>
    </div>
  );
}