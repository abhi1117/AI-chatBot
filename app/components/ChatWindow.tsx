import { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // ✅ Add animations

export default function ChatWindow({ messages }: { messages: { userMessage: string; botReply: string }[] }) {
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            // You can use chatRef.current here if needed
        }
    }, [messages]);

    return (
        <div
            ref={chatRef}
            className="h-96 flex flex-col p-4 space-y-3 overflow-y-auto scrollbar-hidden bg-white rounded-lg shadow-sm"
        >
            {messages.map((msg, index) => (
                <motion.div
                    key={index}
                    className={`flex ${msg.userMessage ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className={`px-4 py-2 max-w-xs text-white rounded-xl shadow-md transition-all ${msg.userMessage
                            ? "bg-blue-500  text-white rounded-tr-none"
                                : "bg-gray-500 text-black rounded-tl-none"
                            }`}
                    >
                        {msg.userMessage || msg.botReply}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
