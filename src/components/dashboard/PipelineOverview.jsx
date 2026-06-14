export default function PipelineOverview() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">
        Pipeline Overview
      </h2>

      <div className="w-full h-6 flex rounded overflow-hidden">
        <div className="bg-blue-600 w-2/5"></div>
        <div className="bg-yellow-500 w-1/4"></div>
        <div className="bg-green-500 w-1/5"></div>
        <div className="bg-red-500 w-1/6"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
        <p>🔵 New Leads</p>
        <p>🟡 Meeting</p>
        <p>🟢 Won</p>
        <p>🔴 Lost</p>
      </div>
    </div>
  );
}