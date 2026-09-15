'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Activity, Orbit, Sparkles, Terminal, RadioTower, Zap, Crosshair, Fingerprint, Hexagon, Globe, Mic } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function ArthuronPage() {
  const { isRTL } = useLang();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // States for Cinematic JARVIS Boot Sequence
  const [bootSequence, setBootSequence] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  
  const ar_logs = ['تهيئة خوادم AFSS...', 'تحميل الأوزان العصبية الكمية...', 'تجاوز جدار الحماية...', 'تأسيس اتصال آمن...', 'النواة جاهزة.'];
  const en_logs = ['INITIALIZING AFSS SERVERS...', 'LOADING QUANTUM NEURAL WEIGHTS...', 'BYPASSING FIREWALL...', 'SECURING UPLINK...', 'CORE READY.'];

  useEffect(() => {
    let currentLogs: string[] = [];
    const logsToUse = isRTL ? ar_logs : en_logs;
    
    logsToUse.forEach((log, index) => {
      setTimeout(() => {
        currentLogs = [...currentLogs, log];
        setBootLogs([...currentLogs]);
        
        if (index === logsToUse.length - 1) {
          setTimeout(() => setBootSequence(false), 1000);
        }
      }, index * 400); 
    });
  }, [isRTL]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: isRTL 
        ? 'تحياتي يا سيدي. أنا آرثرون، النواة المتقدمة للذكاء الاصطناعي. جميع أنظمة المؤسسة تعمل بكفاءة قصوى. كيف يمكنني تسريع أبحاثك العلمية اليوم؟'
        : 'Greetings, sir. I am Arthuron, the advanced AI core. All AFSS systems are operating at maximum efficiency. How can I accelerate your scientific research today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      role: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMsg]);
    
    const currentMessage = inputValue; 
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/arthuron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentMessage }) 
      });
      
      if (!response.ok) throw new Error('Network Error');
      const data = await response.json();
      
      const newAiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: data.reply || (isRTL ? 'خطأ في الاتصال.' : 'Connection Error.'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'ai',
        text: isRTL ? 'النظام يواجه تداخلاً إشعاعياً. أعد المحاولة.' : 'System experiencing solar interference. Retry.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // تم إزالة الألوان المعتمة وإزالة مكون النجوم الدخيل. الموقع سيعتمد على نجومه الأصلية الآن!
    <div className="page-section relative min-h-screen overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
        .jarvis-glow { text-shadow: 0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4); }
        .radar-sweep { background: conic-gradient(from 0deg, transparent 70%, rgba(6, 182, 212, 0.4) 100%); border-radius: 50%; animation: spin-slow 4s linear infinite; }
      `}} />

      {/* الشبكة السيبرانية الشفافة التي تندمج مع النجوم */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      {/* J.A.R.V.I.S Boot Sequence */}
      {bootSequence && (
        <div className="absolute inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-10 sm:px-32 transition-opacity duration-1000">
           <Orbit size={80} className="text-cyan-400 animate-[spin_1s_linear_infinite] mb-8 drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]" />
           <div className="space-y-2">
             {bootLogs.map((log, i) => (
               <div key={i} className="text-cyan-400 font-mono tracking-widest text-sm sm:text-base animate-in fade-in duration-300 flex items-center gap-4">
                 <span className="text-blue-600">[SYS]</span> {log}
               </div>
             ))}
           </div>
           <div className="w-full max-w-md h-[1px] bg-cyan-950 mt-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-cyan-400 w-full animate-pulse shadow-[0_0_15px_rgba(6,182,212,1)]"></div>
           </div>
        </div>
      )}

      {/* الحاوية البانورامية الموسعة لتعرض بكامل الشاشة */}
      <div className="w-full px-2 sm:px-6 lg:px-8 mx-auto relative z-10 flex flex-col h-[92vh] pt-20 pb-4 animate-in zoom-in-95 duration-1000">
        
        {/* Supreme AI Header (JARVIS Core) */}
        <div className="flex flex-col items-center mb-4 relative">
          {/* Holographic Core */}
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center mb-4 z-10">
             <div className="absolute inset-0 border-t-2 border-l-2 border-cyan-500/80 rounded-full animate-[spin_4s_linear_infinite] shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
             <div className="absolute inset-2 border-b-2 border-r-2 border-blue-500/80 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
             <div className="absolute inset-4 border-2 border-dashed border-purple-500/50 rounded-full animate-[spin_6s_linear_infinite]"></div>
             <div className="absolute inset-2 radar-sweep pointer-events-none opacity-50"></div>
             <Cpu size={24} className="text-cyan-200 animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] relative z-10" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-[0.3em] uppercase text-center relative z-10 jarvis-glow mb-2">
            ARTHURON
          </h1>
          
          <div className="flex items-center gap-4 text-cyan-200/80 font-mono text-[9px] sm:text-[11px] tracking-[0.3em] uppercase text-center relative z-10 bg-cyan-950/40 px-6 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles size={12} className="text-cyan-400" />
            {isRTL ? 'نظام استخبارات الأبحاث' : 'RESEARCH INTELLIGENCE SYSTEM'}
          </div>
        </div>

        {/* Tactical HUD Telemetry Bar */}
        <div className="flex justify-between items-center bg-black/50 border border-cyan-500/30 rounded-t-3xl px-6 sm:px-10 py-3 font-mono text-[9px] sm:text-[11px] text-cyan-400 uppercase tracking-widest backdrop-blur-xl relative overflow-hidden shadow-lg mx-2 sm:mx-0">
          <div className="flex items-center gap-2"><Activity size={12} className="animate-pulse" /> {isRTL ? 'الحالة:' : 'STATUS:'} OPTIMAL</div>
          <div className="flex items-center gap-2 hidden sm:flex"><Globe size={12} /> {isRTL ? 'الخوادم:' : 'SERVERS:'} SYNCED</div>
          <div className="flex items-center gap-2"><Zap size={12} className="text-cyan-300 animate-pulse" /> {isRTL ? 'الطاقة:' : 'PWR:'} 100%</div>
        </div>

        {/* Chat Container (Ultra Wide) */}
        <div className="flex-1 glass-card bg-black/40 border-x border-b border-cyan-500/30 rounded-b-3xl shadow-[0_0_80px_rgba(6,182,212,0.1)] flex flex-col overflow-hidden backdrop-blur-md relative mx-2 sm:mx-0">
          
          <Hexagon className="absolute top-10 left-10 text-cyan-500/10 z-0 pointer-events-none animate-[spin_20s_linear_infinite]" size={150} />
          <Hexagon className="absolute bottom-10 right-10 text-blue-500/10 z-0 pointer-events-none animate-[spin_15s_linear_infinite_reverse]" size={200} />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent relative z-10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                {/* تم توسعة فقاعة المحادثة هنا لتصبح أعرض وأكثر راحة للقراءة */}
                <div className={`w-full max-w-[95%] lg:max-w-[85%] xl:max-w-[75%] flex gap-4 sm:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Holographic Avatar */}
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 border backdrop-blur-md relative overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-blue-950/60 border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                      : 'bg-cyan-950/80 border-cyan-400/80 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                  }`}>
                    {msg.role === 'user' ? <Terminal size={20} /> : <Orbit size={24} className="animate-[spin_4s_linear_infinite]" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`relative flex-1 p-5 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-900/20 border-blue-500/30 text-blue-50 rounded-tr-none'
                      : 'bg-black/60 border-cyan-500/40 text-cyan-50 rounded-tl-none shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]'
                  }`}>
                    <p className="leading-[2.2] text-sm sm:text-lg font-medium whitespace-pre-wrap break-words">{msg.text}</p>
                    <div className="flex items-center gap-2 mt-4 opacity-60 justify-end">
                       <span className="text-[10px] font-mono whitespace-nowrap text-cyan-400">{msg.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Visualizer Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="flex gap-4 sm:gap-6">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 border border-cyan-500/80 bg-cyan-950/80 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                    <Mic className="animate-pulse" size={20} />
                  </div>
                  <div className="bg-black/60 border border-cyan-500/40 rounded-3xl rounded-tl-none p-5 sm:p-8 flex items-center gap-4 backdrop-blur-xl">
                    <div className="flex items-end gap-1.5 h-8">
                      <div className="w-1.5 bg-cyan-400 rounded-full animate-[bounce_1s_infinite] h-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                      <div className="w-1.5 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_0.2s] h-3/4 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                      <div className="w-1.5 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_0.4s] h-1/2 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                      <div className="w-1.5 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_0.1s] h-4/5 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                    </div>
                    <span className="text-cyan-400/80 font-mono text-xs tracking-[0.2em] uppercase hidden sm:block ml-3">
                      {isRTL ? 'معالجة كمية...' : 'QUANTUM PROCESSING...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Full Width Fix (تم إزالة العوائق ليصبح بانورامياً 100%) */}
          <div className="p-4 sm:p-6 bg-black/60 border-t border-cyan-500/30 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {/* هنا جعلت الـ form يأخذ w-full كاملة بدون تقييد max-w-5xl */}
            <form onSubmit={handleSendMessage} className="relative flex items-center group w-full">
              <div className="absolute inset-y-0 left-4 sm:left-6 flex items-center pointer-events-none z-20" style={isRTL ? { right: '24px', left: 'auto' } : { left: '24px' }}>
                <span className="text-cyan-500 font-black text-xl animate-pulse">{'>'}</span>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRTL ? 'أدخل الأمر لآرثرون...' : 'Enter command for Arthuron...'}
                className="w-full bg-cyan-950/20 border border-cyan-500/40 rounded-2xl sm:rounded-full py-4 sm:py-6 px-12 sm:px-16 text-cyan-50 placeholder-cyan-500/40 focus:outline-none focus:border-cyan-400 focus:bg-cyan-950/40 transition-all shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] focus:shadow-[0_0_30px_rgba(6,182,212,0.2)] font-mono text-sm sm:text-lg backdrop-blur-xl"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 sm:right-3 (isRTL ? 'left-2 right-auto' : 'right-2') p-3 sm:p-5 bg-cyan-600/20 hover:bg-cyan-600 border border-cyan-500/50 text-cyan-300 hover:text-black rounded-xl sm:rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center group-hover:border-cyan-400"
                style={isRTL ? { left: '12px', right: 'auto' } : { right: '12px' }}
              >
                <Send size={22} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
