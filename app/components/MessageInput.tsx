import { useState } from "react";
import { Send } from "lucide-react"; // ✅ Import a modern send icon

export default function MessageInput({ onSend }: { onSend: (message: string) => void }) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    return (
        <div className="p-4 bg-white flex items-center shadow-md rounded-b-xl">
            <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
                onClick={handleSend}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
                <Send size={18} /> Send
            </button>
        </div>
    );
}
