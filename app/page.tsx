"use client";
import { useState } from "react";
import axios from "axios";
import ChatWindow from "../app/components/ChatWindow";
import MessageInput from "../app/components/MessageInput";
import { Bot } from "lucide-react"; // ✅ Add chatbot icon

export default function Home() {
  const [messages, setMessages] = useState<{ userMessage: string; botReply: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage: string) => {
    setMessages((prev) => [...prev, { userMessage, botReply: "Typing..." }]);
    setLoading(true);

    try {
      const response = await axios.post("/api/chat", { message: userMessage });
      const botReply = response.data.botReply;
      if (!botReply) return;

      setMessages((prev) => [...prev, { userMessage: "", botReply }]);
    } catch (error) {
      console.error("❌ Error fetching bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl flex flex-col overflow-hidden border border-gray-300">
        {/* ✅ Chatbot Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center py-3 font-semibold text-lg flex items-center justify-center gap-2">
          <Bot size={22} /> AI Chatbot
        </div>
        <ChatWindow messages={messages} />
        {loading && <p className="text-sm text-gray-500 text-center py-2 animate-pulse">AI is thinking...</p>}

        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
