'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Zap, BookOpen, Rocket, Trophy } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { AFSSLogo } from '@/components/AFSSLogo';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const QUICK_PROMPTS_EN = [
  'What is AFSS?',
  'Tell me about the ASP program',
  'What is exoplanet characterization?',
  'How do I join AFSS?',
];

const QUICK_PROMPTS_AR = [
  'ما هو AFSS؟',
  'أخبرني عن برنامج ASP',
  'ما هو توصيف الكواكب الخارجية؟',
  'كيف أنضم إلى AFSS؟',
];

const AUTO_RESPONSES: Record<string, string> = {
  default_en: "That's a great question about space science. Arthuron is currently in standby mode — full AI response capabilities will be activated in an upcoming system update. In the meantime, I can direct you to explore our Programs, Research, and About sections for detailed information about AFSS.",
  default_ar: "سؤال رائع حول علوم الفضاء. آرثرون حالياً في وضع الاستعداد — ستُفعَّل قدرات الاستجابة الكاملة للذكاء الاصطناعي في تحديث قادم. في غضون ذلك، يمكنني توجيهك لاستكشاف أقسام البرامج والأبحاث ومن نحن للحصول على معلومات تفصيلية.",
};

export default function ArthuronPage() {
  const { t, isRTL, lang } = useLang();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: t('arthuron_greeting') },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: lang === 'ar' ? AUTO_RESPONSES.default_ar : AUTO_RESPONSES.default_en },
      ]);
    }, 1500);
  }

  const quickPrompts = lang === 'ar' ? QUICK_PROMPTS_AR : QUICK_PROMPTS_EN;

  return (
    <div className="page-section" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col" style={{ height: 'calc(100vh - 64px - 96px)' }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/5">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/30 flex items-center justify-center">
              <Cpu size={24} className="text-purple-400" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0a0a0a] pulse-dot" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {t('arthuron_title')}
              <span className="text-xs font-normal text-green-400 tracking-widest uppercase">{t('arthuron_status')}</span>
            </h1>
            <p className="text-gray-500 text-sm">{t('arthuron_subtitle')}</p>
          </div>
          <div className="ml-auto hidden sm:block">
            <AFSSLogo size={36} />
          </div>
        </div>

        {/* Capabilities */}
        {messages.length <= 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { icon: Cpu, key: 'arthuron_cap1' as const },
              { icon: BookOpen, key: 'arthuron_cap2' as const },
              { icon: Rocket, key: 'arthuron_cap3' as const },
              { icon: Trophy, key: 'arthuron_cap4' as const },
            ].map(({ icon: Icon, key }) => (
              <div key={key} className="glass-card p-3 flex flex-col items-center gap-2 text-center">
                <Icon size={16} className="text-purple-400" />
                <span className="text-gray-400 text-[11px] leading-tight">{t(key)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? (isRTL ? 'flex-row' : 'flex-row-reverse') : 'flex-row'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Cpu size={14} className="text-purple-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-white/5 border border-white/8 text-gray-200'
                    : 'bg-purple-600/30 border border-purple-500/30 text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 flex-row">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                <Cpu size={14} className="text-purple-400" />
              </div>
              <div className="px-4 py-3 bg-white/5 border border-white/8 rounded-2xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="flex flex-wrap gap-2 mt-4 mb-3">
          {quickPrompts.map(p => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/3 text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3 pt-3 border-t border-white/5">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={t('arthuron_placeholder')}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shrink-0"
          >
            <Send size={17} className={isRTL ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
