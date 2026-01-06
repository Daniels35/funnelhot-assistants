"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, Smartphone } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  time: string;
}

interface ChatSimulatorProps {
  assistantName: string;
}

export function ChatSimulator({ assistantName }: ChatSimulatorProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hola, ¿en qué puedo ayudarte hoy?", sender: "bot", time: getCurrentTime() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al fondo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleSend = () => {
    if (!input.trim()) return;

    // 1. Mensaje del Usuario
    const userMsg: Message = { 
      id: crypto.randomUUID(), 
      text: input, 
      sender: "user", 
      time: getCurrentTime() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // 2. Simular Respuesta del Bot (Delay)
    setTimeout(() => {
      const botResponses = [
        "¡Entendido! Cuéntame más sobre eso.",
        "Esa es una excelente pregunta. Déjame explicarte...",
        "Claro, puedo ayudarte con gusto.",
        "He registrado esa información en el sistema.",
        "¿Te gustaría agendar una llamada con un experto?"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMsg: Message = {
        id: crypto.randomUUID(),
        text: randomResponse,
        sender: "bot",
        time: getCurrentTime()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-100 dark:bg-black border border-border rounded-xl overflow-hidden shadow-sm relative">
      {/* Marco de Teléfono (Header) */}
      <div className="bg-whatsapp p-3 flex items-center gap-3 text-white shadow-md z-10">
        <div className="p-1.5 bg-white/20 rounded-full">
          <Smartphone className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm leading-tight">{assistantName}</h3>
          <span className="text-xs text-white/80 block">en línea</span>
        </div>
        <button 
          onClick={() => setMessages([])} 
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Reiniciar Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Área de Mensajes (Fondo WhatsApp Pattern) */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#e5ddd5] dark:bg-[#0b141a] relative">
        {/* Patrón de fondo opcional - Usamos opacidad para simularlo */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`relative max-w-[80%] p-3 rounded-lg shadow-sm text-sm z-0
              ${msg.sender === "user" 
                ? "ml-auto bg-[#dcf8c6] dark:bg-[#005c4b] text-black dark:text-white rounded-tr-none" 
                : "bg-white dark:bg-[#202c33] text-black dark:text-white rounded-tl-none"
              }`}
          >
            <p>{msg.text}</p>
            <span className={`text-[10px] block text-right mt-1 ${msg.sender === "user" ? "text-green-800 dark:text-green-100/60" : "text-gray-500 dark:text-gray-400"}`}>
              {msg.time} {msg.sender === "user" && "✓✓"}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="bg-white dark:bg-[#202c33] p-3 rounded-lg rounded-tl-none inline-block shadow-sm w-16 relative z-0">
            <div className="flex gap-1 justify-center">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-zinc-100 dark:bg-[#202c33] border-t border-border flex gap-2 z-10">
        <input
          type="text"
          className="flex-1 bg-white dark:bg-[#2a3942] text-black dark:text-white border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-whatsapp placeholder:text-gray-500"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}