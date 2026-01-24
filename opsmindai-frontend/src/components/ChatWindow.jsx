import { useState, useRef, useEffect } from "react";
import useSSEChat from "../hooks/useSSEChat";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, loading } = useSSEChat();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="w-full h-screen flex bg-gray-100">

      {/* ===== Sidebar (like ChatGPT) ===== */}
      <div className="w-64 bg-gray-900 text-white p-4 hidden md:flex flex-col">
        <h2 className="text-lg font-semibold mb-6">OpsMind AI</h2>

  

        <div className="flex-1 text-sm text-gray-400">
          Chat history
          <div className="mt-2 space-y-2">
            <div className="p-2 rounded bg-gray-800">Leave Policy</div>
            <div className="p-2 rounded bg-gray-800">HR Guidelines</div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-3 text-xs text-gray-400">
          Logged in as Employee
        </div>
      </div>

      {/* ===== Main Chat Area ===== */}
      <main className="flex-1 flex flex-col items-center">

        {/* Header */}
        <div className="w-full border-b bg-white px-6 py-4 flex justify-between items-center">
          <h1 className="font-semibold text-gray-800">OpsMind AI</h1>
          <span className="text-xs text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Online
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 w-full overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-24">
                <h2 className="text-2xl font-medium mb-2">
                  How can I help you today?
                </h2>
                <p className="text-sm">
                  Ask about SOPs, policies, workflows, HR rules…
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <MessageBubble key={idx} msg={msg} />
            ))}

            {loading && <Loader />}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Input (floating like ChatGPT) */}
        <div className="w-full border-t bg-white px-4 py-4">
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              className="flex-1 border rounded-xl px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message…"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl
                         hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
