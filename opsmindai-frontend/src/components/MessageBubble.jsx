import SourcePanel from "./SourcePanel";

export default function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[80%]">
        <div
          className={`p-3 rounded-2xl ${
            isUser ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
          }`}
        >
          {msg.content}
        </div>

        {!isUser && <SourcePanel sources={msg.sources} />}
      </div>
    </div>
  );
}
