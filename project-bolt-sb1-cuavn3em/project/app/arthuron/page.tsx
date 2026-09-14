'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Activity, Orbit, Sparkles, Terminal, RadioTower, Zap } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function ArthuronPage() {
  const { isRTL } = useLang();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // الرسالة الترحيبية الافتراضية
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: isRTL 
        ? 'تحياتي. أنا آرثرون، النواة المتقدمة للذكاء الاصطناعي في مؤسسة آرثر لعلوم الفضاء. جميع الأنظمة تعمل بكفاءة. كيف يمكنني تسريع أبحاثك العلمية اليوم؟'
        : 'Greetings. I am Arthuron, the advanced AI core of Arthur For Space Sciences. All systems nominal. How can I accelerate your scientific research today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // التمرير التلقائي لأسفل عند وصول رسالة جديدة
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. إضافة رسالة المستخدم إلى الشاشة
    const newUserMsg = {
      id: Date.now(),
      role: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMsg]);
    
    // حفظ النص قبل مسح مربع الإدخال لإرساله للسيرفر
    const currentMessage = inputValue; 
    setInputValue('');
    setIsTyping(true);

    try {
      // 2. الاتصال الفعلي بسيرفر آرثرون (API)
      const response = await fetch('/api/arthuron', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // تم استخدام 'prompt' ليتطابق مع كود السيرفر الخاص بك
        body: JSON.stringify({ prompt: currentMessage }) 
      });
      
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      // 3. عرض رد جيميناي الحقيقي على الشاشة (باستخدام 'reply' كما برمجتها في السيرفر)
      const newAiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: data.reply || (isRTL ? 'لم يتم استلام رد من السيرفر.' : 'No response received.'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newAiMsg]);

    } catch (error) {
      console.error("Error communicating with Arthuron API:", error);
      const errorMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: isRTL ? 'عذراً، حدث خطأ في الاتصال بالخادم المركزي. يرجى المحاولة لاحقاً.' : 'Connection to the central server failed. Please try again later.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 flex flex-col items-center relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Background Animated Elements (Space Vibes) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-5xl relative z-10 flex flex-col h-[85vh]">
        
        {/* HUD Header (Heads Up Display) */}
        <div className="flex flex-col items-center mb-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-cyan-500/50 bg-cyan-950/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-4">
            <Orbit className="text-cyan-400 animate-[spin_4s_linear_infinite]" size={18} />
            <span className="text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
              Arthuron AI Core • Online
            </span>
            <Activity className="text-cyan-400 animate-pulse" size={18} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight drop-shadow-lg mb-2">
            ARTHURON
          </h1>
          <p className="text-blue-200/70 font-mono text-sm tracking-widest uppercase">
            {isRTL ? 'مساعد الأبحاث العلمية المتقدم' : 'Advanced Scientific Research Assistant'}
          </p>
        </div>

        {/* System Status Bar */}
        <div className="flex justify-between items-center bg-slate-900/80 border border-blue-500/30 rounded-t-2xl px-6 py-3 font-mono text-[10px] sm:text-xs text-blue-400 uppercase tracking-wider backdrop-blur-md">
          <div className="flex items-center gap-2"><Cpu size={14} /> Core Temp: 32.4°C [Stable]</div>
          <div className="flex items-center gap-2 hidden sm:flex"><RadioTower size={14} /> Uplink: Securing</div>
          <div className="flex items-center gap-2"><Zap size={14} className="text-yellow-400" /> Power: 100%</div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 glass-card bg-slate-950/60 border-x border-b border-blue-500/30 rounded-b-2xl shadow-[0_0_40px_rgba(30,58,138,0.15)] flex flex-col overflow-hidden backdrop-blur-xl">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] sm:max-w-[75%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' 
                      : 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  }`}>
                    {msg.role === 'user' ? <Terminal size={20} /> : <Sparkles size={20} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`relative p-5 rounded-2xl border backdrop-blur-md ${
                    msg.role === 'user'
                      ? 'bg-blue-900/20 border-blue-500/30 text-blue-50 rounded-tr-none'
                      : 'bg-slate-800/40 border-cyan-500/30 text-gray-200 rounded-tl-none glow-cyan-sm'
                  }`}>
                    <p className="leading-relaxed text-sm sm:text-base">{msg.text}</p>
                    <span className="text-[10px] text-gray-500 font-mono absolute bottom-1 right-3 opacity-60">
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/50 bg-cyan-900/20 text-cyan-400">
                    <Orbit className="animate-spin" size={20} />
                  </div>
                  <div className="bg-slate-800/40 border border-cyan-500/30 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 bg-slate-900/50 border-t border-blue-500/20">
            <form onSubmit={handleSendMessage} className="relative flex items-center group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRTL ? 'اسأل آرثرون عن الفيزياء، الفضاء، أو أبحاث المؤسسة...' : 'Ask Arthuron about physics, space, or AFSS research...'}
                className="w-full bg-black/40 border border-blue-500/30 rounded-2xl py-4 px-6 text-blue-50 placeholder-blue-300/30 focus:outline-none focus:border-cyan-400/60 focus:bg-blue-950/20 transition-all shadow-inner font-mono text-sm sm:text-base"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute right-2 (isRTL ? 'left-2 right-auto' : 'right-2') p-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                style={isRTL ? { left: '8px', right: 'auto' } : { right: '8px' }}
              >
                <Send size={20} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
