import { useState } from "react";

export default function useSSEChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question) => {
    setLoading(true);

    const userMsg = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);

    const response = await fetch("http://localhost:5000/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      setLoading(false);
      alert("Backend error");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let assistantMsg = { role: "assistant", content: "", sources: [] };
    setMessages((prev) => [...prev, assistantMsg]);

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value);

      // SSE format: data: <text>\n\n
      const lines = chunk.split("\n");
      for (let line of lines) {
        if (line.startsWith("data:")) {
          const text = line.replace("data:", "").trim();

          assistantMsg.content += text;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...assistantMsg };
            return updated;
          });
        }

        // optional: parse sources if backend sends them in JSON
        if (line.startsWith("data:") && line.includes("sources")) {
          try {
            const json = JSON.parse(line.replace("data:", "").trim());
            if (json.sources) assistantMsg.sources = json.sources;
          } catch {}
        }
      }
    }

    setLoading(false);
  };

  return { messages, sendMessage, loading };
}
