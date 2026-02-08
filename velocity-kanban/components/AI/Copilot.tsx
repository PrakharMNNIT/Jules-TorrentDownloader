"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([
    { role: 'assistant', content: "Velocity Engine online. I've detected a velocity drop in the 'In Progress' column. Need a boost?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
    setIsTyping(true);

    // Mock AI Stream
    setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'assistant', content: "I recommend focusing on 'Optimize Assets'. It matches your current high energy state and unblocks 2 downstream tasks." }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-vk-primary text-white rounded-full shadow-[0_0_30px_rgba(var(--vk-primary),0.6)] z-50 flex items-center justify-center border border-white/20 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="group-hover:animate-pulse" />}
      </motion.button>

      {/* Floating Command Center */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed bottom-28 right-8 w-[400px] h-[600px] rounded-3xl glass-panel shadow-2xl z-40 flex flex-col overflow-hidden border border-vk-primary/30"
            >
                {/* Header */}
                <div className="h-14 border-b border-vk-border/50 flex items-center justify-between px-6 bg-vk-surface/50 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-vk-success animate-pulse" />
                        <span className="font-heading font-bold text-sm text-vk-text tracking-wider">COPILOT v2.0</span>
                    </div>
                    <Terminal size={16} className="text-vk-text-muted" />
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scroll-smooth">
                    {messages.map((m, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={i}
                            className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={clsx(
                                "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center shadow-lg border",
                                m.role === 'assistant'
                                    ? "bg-vk-primary border-vk-primary/50 text-white"
                                    : "bg-vk-surface border-vk-border text-vk-text"
                            )}>
                                {m.role === 'assistant' ? <Bot size={16} /> : <span className="font-mono text-xs font-bold">ME</span>}
                            </div>
                            <div className={clsx(
                                "p-4 rounded-2xl text-sm max-w-[85%] font-body leading-relaxed shadow-sm backdrop-blur-md",
                                m.role === 'assistant'
                                    ? "bg-vk-surface/80 text-vk-text border border-vk-border rounded-tl-none"
                                    : "bg-vk-primary text-white border border-vk-primary/50 rounded-tr-none"
                            )}>
                                {m.content}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                             <div className="w-8 h-8 rounded-lg bg-vk-primary/10 border border-vk-primary/20 flex items-center justify-center">
                                <Bot size={16} className="text-vk-primary" />
                             </div>
                             <div className="bg-vk-surface/50 border border-vk-border p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                                <span className="w-1.5 h-1.5 bg-vk-text-muted rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-vk-text-muted rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-vk-text-muted rounded-full animate-bounce" />
                             </div>
                        </motion.div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-vk-surface/50 border-t border-vk-border/50 backdrop-blur-lg">
                    <div className="relative">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Execute command..."
                            className="w-full bg-vk-bg/50 border border-vk-border rounded-xl pl-4 pr-12 py-4 text-sm focus:outline-none focus:border-vk-primary focus:ring-1 focus:ring-vk-primary transition-all font-mono text-vk-text placeholder:text-vk-text-muted"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-2 p-2 bg-vk-primary text-white rounded-lg hover:bg-vk-accent transition-colors shadow-lg"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
