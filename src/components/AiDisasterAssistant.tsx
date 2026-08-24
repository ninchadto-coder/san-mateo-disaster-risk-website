import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  ShieldAlert, 
  Copy, 
  Check, 
  RotateCcw, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import { Language, AlertLevel } from '../types';
import { translations } from '../data/translations';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiDisasterAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentWaterLevel: number;
  currentAlertLevel: AlertLevel;
}

export const AiDisasterAssistant: React.FC<AiDisasterAssistantProps> = ({
  isOpen,
  onClose,
  language,
  currentWaterLevel,
  currentAlertLevel
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: language === 'tl'
        ? `Kamusta! Ako ang iyong **San Mateo DRRM AI Assistant**. Narito ako upang magbigay ng agarang gabay sa paghahanda sa baha sa Marikina-San Mateo River Basin, mga itinalagang evacuation centers sa 15 barangay, at mga protocol sa emergency. Ano ang nais mong itanong?`
        : `Hello! I am your **San Mateo DRRM AI Assistant**. I can provide immediate guidance on flood risk along the Marikina-San Mateo River Basin, designated evacuation centers across all 15 barangays, and household safety protocols. How may I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const t = translations[language].aiAdvisor;

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          language,
          currentWaterLevel,
          context: `San Mateo River water level currently at ${currentWaterLevel.toFixed(1)}m. Alert Level: ${currentAlertLevel}.`
        })
      });

      if (!response.ok) {
        throw new Error('Server returned error');
      }

      const data = await response.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: language === 'tl'
          ? `⚠️ Paumanhin, nagkaroon ng pansamantalang aberya sa koneksyon. Para sa agarang impormasyon sa kaligtasan, tumawag sa **San Mateo MDRRMO** sa **(02) 8297-8100 local 129** o 911.`
          : `⚠️ Connection temporarily unavailable. For urgent disaster assistance, please call **San Mateo MDRRMO** directly at **(02) 8297-8100 loc 129** or 911.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    t.quick1,
    t.quick2,
    t.quick3,
    t.quick4
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl h-[620px] shadow-2xl border-4 border-[#0B2545] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0B2545] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#2A9D8F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E76F51] flex items-center justify-center text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                  {t.modalTitle}
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#2A9D8F]/30 text-[#2A9D8F] border border-[#2A9D8F]/50">
                  Gemini 3.7 Flash
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Live Gauge: <strong className="text-amber-400 font-mono">{currentWaterLevel.toFixed(1)}m</strong> • {t.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-amber-50 px-4 py-2 text-[11px] text-amber-900 border-b border-amber-200 flex items-center justify-between font-medium">
          <span className="truncate">{t.disclaimer}</span>
          <a href="tel:0282978100" className="font-bold text-red-600 hover:underline shrink-0 ml-2 font-mono">
            Call (02) 8297-8100
          </a>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
          {messages.map((msg) => {
            const isBot = msg.sender === 'assistant';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 bg-[#0B2545] text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isBot
                      ? 'bg-white text-slate-800 border-l-4 border-[#2A9D8F] border-y border-r border-slate-200'
                      : 'bg-[#0B2545] text-white border-r-4 border-[#E76F51]'
                  }`}
                >
                  {/* Message body with formatted markdown spacing */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.text.split('\n').map((line, idx) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <strong key={idx} className="block font-bold text-[#0B2545] uppercase tracking-wide">{line.replace(/\*\*/g, '')}</strong>;
                      }
                      if (line.startsWith('- ') || line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                        return <div key={idx} className="pl-2 font-medium">{line}</div>;
                      }
                      return <p key={idx}>{line}</p>;
                    })}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] opacity-60 font-mono">
                    <span>{msg.timestamp}</span>
                    {isBot && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:opacity-100 flex items-center gap-1 cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-slate-500 italic">
              <div className="w-8 h-8 bg-[#0B2545] text-amber-400 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-3 border-l-4 border-[#E76F51] border-y border-r border-slate-200 shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 bg-[#E76F51] animate-bounce"></span>
                <span className="w-2 h-2 bg-amber-500 animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-[#2A9D8F] animate-bounce delay-200"></span>
                <span>Kumukunsulta sa DRRM Database...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="font-bold text-slate-700 uppercase tracking-wider shrink-0 text-[10px]">Subukan:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap border border-slate-300 transition-colors shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder={t.inputPlaceholder}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium focus:border-[#2A9D8F] focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2.5 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs uppercase tracking-widest shadow-xs transition-colors cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t.sendBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
