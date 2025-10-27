
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getEdResponse } from '../services/geminiService';

const ChatConsole: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "👋 Hi, I'm Ed. How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmedInput },
      { role: 'model', content: "Just a moment… 💭" } // Temporary thinking message
    ];

    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const history = messages; // Pass current history
      const response = await getEdResponse(history, trimmedInput);
      setMessages(prev => prev.slice(0, -1).concat({ role: 'model', content: response }));
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.slice(0, -1).concat({ role: 'model', content: "⚠️ Sorry, I couldn’t respond." }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
        <h1 className="text-3xl font-bold text-white mb-2">Ed – AI Custodian Console</h1>
        <p className="text-lg text-gray-400 mb-6">Interactive support environment – type or ask Ed for assistance.</p>

        <div id="ed-chat-box" className="w-[380px] h-[440px] font-mono-console flex flex-col justify-between overflow-hidden bg-[#1c2541] text-white border border-[#32cd32] rounded-lg shadow-lg">
            <div id="chat-box" ref={chatBoxRef} className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <p key={index}>
                        {msg.role === 'model' ? (
                            <><strong className='text-[#5ec8e5]'>Ed:</strong> {msg.content}</>
                        ) : (
                            <><strong className='text-[#32cd32]'>&gt; You:</strong> {msg.content}</>
                        )}
                    </p>
                ))}
            </div>
            <div id="input-area" className="flex items-center p-2 bg-[#0b132b] border-t border-t-[#32cd32]/50">
                <span className="text-[#32cd32] font-bold pr-2">&gt;</span>
                <input
                    id="user-input"
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1 p-2 text-sm outline-none bg-transparent text-white border-none"
                />
                <button
                    id="send-btn"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="ml-2 px-4 py-2 cursor-pointer font-bold bg-[#1c2541] text-[#32cd32] border border-[#32cd32] rounded-md hover:bg-[#32cd32] hover:text-[#1c2541] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
        <style>{`
            @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out forwards;
            }
        `}</style>
    </div>
  );
};

export default ChatConsole;
