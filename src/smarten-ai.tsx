import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
     role: "user" | "assistant";
     content: string;
     contextUsed?: boolean;
     isError?: boolean;
}

function AppAI() {
     const [messages, setMessages] = useState<Message[]>([]);
     const [input, setInput] = useState<string>("");
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const messagesEndRef = useRef<HTMLDivElement | null>(null);

     const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
     };

     useEffect(() => {
          scrollToBottom();
     }, [messages]);

     const sendMessage = async () => {
          if (!input.trim() || isLoading) return;

          const userMessage: Message = { role: "user", content: input };
          setMessages((prev) => [...prev, userMessage]);
          setInput("");
          setIsLoading(true);

          try {
               const response = await fetch(`http://localhost:8000/api/ai/chat-stream/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: input }),
               });

               const data = await response.json();
               console.log("API Response:", data);

               if (data.success) {
               const aiMessage: Message = {
                    role: "assistant",
                    content: data.response,
                    contextUsed: data.contextUsed,
               };
               setMessages((prev) => [...prev, aiMessage]);
               } else {
                    const aiMessage: Message = {
                         role: "assistant",
                         content: data.response,
                         isError: false,
                    };
                    setMessages((prev) => [...prev, aiMessage]);
               }
          } catch (error) {
               console.log("Network error: ", error);
               const errorMessage: Message = {
                    role: "assistant",
                    content: "Oops! I can't reach my servers right now 😅 Are you connected to the internet? Could you try again in a sec? 📡",
                    isError: true,
               };
               setMessages((prev) => [...prev, errorMessage]);
          } finally {
               setIsLoading(false);
          }
     };

     const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === "Enter" && !e.shiftKey) {
               e.preventDefault();
               sendMessage();
          }
     };

     const clearChat = () => {
          setMessages([]);
     };

     // Custom components for ReactMarkdown
     const MarkdownComponents = {
          h1: ({ node, ...props }: any) => (
               <h1 className="text-xl font-semibold my-2 text-black" {...props} />
          ),
          h2: ({ node, ...props }: any) => (
               <h2 className="text-lg font-semibold my-2 text-black" {...props} />
          ),
          h3: ({ node, ...props }: any) => (
               <h3 className="text-base font-semibold my-1 text-black" {...props} />
          ),
          p: ({ node, ...props }: any) => (
               <p className="my-2 leading-relaxed text-black" {...props} />
          ),
          ul: ({ node, ...props }: any) => (
               <ul className="my-2 pl-5 list-disc text-black" {...props} />
          ),
          ol: ({ node, ...props }: any) => (
               <ol className="my-2 pl-5 list-decimal text-black" {...props} />
          ),
          li: ({ node, ...props }: any) => (
               <li className="my-1 leading-relaxed text-black" {...props} />
          ),
          strong: ({ node, ...props }: any) => (
               <strong className="font-bold text-black" {...props} />
          ),
          em: ({ node, ...props }: any) => (
               <em className="italic text-black" {...props} />
          ),
          code: ({ node, inline, ...props }: any) =>
               inline ? (
                    <code
                         className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm text-red-600"
                         {...props}
                    />
               ) : (
                    <code
                         className="bg-gray-100 block p-3 rounded font-mono text-sm overflow-x-auto my-2 text-black"
                         {...props}
                    />
               ),
          blockquote: ({ node, ...props }: any) => (
               <blockquote
                    className="border-l-4 border-[#0E9CFF] pl-3 my-3 text-gray-600 italic"
                    {...props}
               />
          ),
     };

     return (
          <div className="min-h-screen bg-white flex justify-center items-center p-2">
               <div className="w-full max-w-4xl h-[95vh] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#0E9CFF] text-white p-5 relative">
                         <h1 className="text-xl font-bold mb-1">🤖 Operational Smarten AI Assistant</h1>
                         <p className="text-white/90">Powered by Smarten</p>
                         <button onClick={clearChat} className="absolute top-5 right-5 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200">Clear Chat</button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                         {messages.length === 0 && (
                              <div className="text-center text-gray-600 my-10">
                                   <h3 className="text-[#0E9CFF] text-lg font-semibold mb-2">Welcome! 👋</h3>
                                   <p className="mb-4">Ask me about programming, English, French, or mathematics!</p>
                                   <div className="text-left bg-gray-50 p-4 rounded-lg border-l-4 border-[#0E9CFF]">
                                        <p className="font-medium text-black">Try asking:</p>
                                        <ul className="mt-2 pl-5 list-disc text-gray-700">
                                             <li>"What programming languages do you support?"</li>
                                             <li>"Can you help me learn French?"</li>
                                             <li>"Tell me about calculus basics"</li>
                                        </ul>
                                   </div>
                              </div>
                         )}

                         {messages.map((message, index) => (
                              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                   <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${message.role === "user" ? "bg-[#0E9CFF] text-white rounded-br-md" : message.isError ? "bg-red-100 text-red-700 border border-red-200" : "bg-gray-100 text-black rounded-bl-md"}`}>
                                        {message.role === "assistant" && !message.isError ? (
                                             <ReactMarkdown components={MarkdownComponents}>{message.content}</ReactMarkdown>
                                        ) : (
                                             <div className="whitespace-pre-wrap">{message.content}</div>
                                        )}
                                        {message.contextUsed && (
                                             <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">📚 Used knowledge base</div>
                                        )}
                                   </div>
                              </div>
                         ))}

                         {isLoading && (
                              <div className="flex justify-start">
                                   <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-gray-100 text-black px-5 py-3">
                                        <div className="flex gap-1 py-2">
                                             <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                             <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                             <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        </div>
                                   </div>
                              </div>
                         )}

                         <div ref={messagesEndRef} />
                    </div>

                    {/* Input Container */}
                    <div className="bg-gray-50 border-t border-gray-200 p-4 flex gap-3">
                         <textarea value={input} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                              onKeyDown={handleKeyPress} placeholder="Ask me anything about our educational platform..." disabled={isLoading} rows={2}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-[#0E9CFF] focus:ring-1 focus:ring-[#0E9CFF]"
                         />
                         <button onClick={sendMessage} disabled={!input.trim() || isLoading}
                              className="bg-[#0E9CFF] hover:bg-[#0C8CE5] disabled:bg-gray-400 text-white rounded-lg px-6 transition-colors duration-200 disabled:cursor-not-allowed"
                         >
                              {isLoading ? "⏳" : "📤"}
                         </button>
                    </div>
               </div>
          </div>
     );
}

export default AppAI;