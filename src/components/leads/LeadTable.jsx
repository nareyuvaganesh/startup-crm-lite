import StatusBadge from "./StatusBadge";

export default function LeadTable({ leads }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 overflow-x-auto transition-colors duration-200">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        All Leads
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left dark:border-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">Company</th>
            <th className="p-2">Status</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, index) => (
            <tr
              key={index}
              className="border-b dark:border-gray-700"
            >
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.company}</td>
              <td className="p-2">
                <StatusBadge status={lead.status} />
              </td>
              <td className="p-2">{lead.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}