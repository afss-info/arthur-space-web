'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, BrainCircuit, Terminal } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function ArthuronPage() {
  const { t, isRTL } = useLang();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { 
      role: 'arthuron', 
      text: isRTL 
        ? 'مرحباً. أنا آرثرون (Arthuron)، نواة الذكاء الاصطناعي الفائقة لمؤسسة Arthur For Space Sciences. الأنظمة تعمل بكفاءة 100%. كيف يمكنني تعزيز أبحاثك العلمية اليوم؟' 
        : 'Greetings. I am Arthuron, the advanced AI core of Arthur For Space Sciences. All systems nominal. How can I accelerate your scientific research today?' 
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/arthuron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage })
      });
      
      const data = await res.json();
      
      if (res.ok && data.reply) {
         setMessages(prev => [...prev, { role: 'arthuron', text: data.reply }]);
      } else {
         // سيعرض الآن الخطأ الدقيق القادم من الباك إند
         setMessages(prev => [...prev, { role: 'arthuron', text: data.error || 'حدث خطأ مجهول في الخادم.' }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'arthuron', text: `فشل الاتصال بالشبكة: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-section min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col h-[calc(100vh-100px)]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <BrainCircuit size={16} className="text-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold tracking-widest uppercase">Arthuron AI Core - Online</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-2">Arthuron</h1>
          <p className="text-gray-400 text-sm">Your Advanced Scientific Research Assistant</p>
        </div>

        {/* Chat Interface Container */}
        <div className="flex-1 glass-card border border-purple-500/30 shadow-2xl rounded-2xl flex flex-col overflow-hidden relative bg-slate-950/50 backdrop-blur-xl">
          
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border ${
                  msg.role === 'arthuron' 
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                    : 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                }`}>
                  {msg.role === 'arthuron' ? <BrainCircuit size={20} /> : <Terminal size={20} />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] rounded-2xl p-5 text-sm leading-relaxed ${
                  msg.role === 'arthuron'
                    ? 'bg-purple-900/10 border border-purple-500/20 text-gray-200'
                    : 'bg-blue-900/20 border border-blue-500/20 text-white'
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')} 
                      <br/>
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div className={`flex gap-4 ${isRTL ? '' : ''}`}>
                <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  <BrainCircuit size={20} className="animate-pulse" />
                </div>
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-5 flex items-center gap-3">
                  <Loader2 size={16} className="text-purple-400 animate-spin" />
                  <span className="text-purple-300 text-xs tracking-widest">{isRTL ? 'جاري معالجة البيانات...' : 'PROCESSING DATA...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-purple-500/20 bg-black/40">
            <form onSubmit={sendMessage} className="relative flex items-center gap-3 max-w-4xl mx-auto">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
                placeholder={isRTL ? 'اسأل آرثرون في الفيزياء، الفضاء، أو عن أبحاث المؤسسة...' : 'Ask Arthuron about physics, space, or AFSS research...'}
                className="flex-1 bg-white/5 border border-purple-500/30 rounded-xl py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-sm disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={loading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className={isRTL ? 'rotate-180' : ''} />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
