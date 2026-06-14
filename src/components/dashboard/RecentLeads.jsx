const leads = [
  {
    name: "John Doe",
    company: "Google",
    status: "New",
    date: "2026-06-10",
  },
  {
    name: "Sarah Smith",
    company: "Microsoft",
    status: "Meeting",
    date: "2026-06-11",
  },
  {
    name: "David Lee",
    company: "Amazon",
    status: "Won",
    date: "2026-06-12",
  },
  {
    name: "Emma Wilson",
    company: "Netflix",
    status: "Lost",
    date: "2026-06-13",
  },
  {
    name: "James Brown",
    company: "Tesla",
    status: "New",
    date: "2026-06-14",
  },
];

export default function RecentLeads() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">
        Recent Leads
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}