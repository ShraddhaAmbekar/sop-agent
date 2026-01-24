export default function SourcePanel({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-2 bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
      <div className="font-semibold text-gray-800 mb-1">Sources</div>
      {sources.map((s, i) => (
        <div key={i} className="mb-1">
          <span className="font-medium text-gray-700">{s.pdf}</span>
          <span className="text-gray-500"> • Page {s.page}</span>
          <span className="text-gray-500"> • {s.section}</span>
        </div>
      ))}
    </div>
  );
}
