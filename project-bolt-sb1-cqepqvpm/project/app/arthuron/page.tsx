'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, Cpu, Radio } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { PageHeading } from '@/components/page-heading';

type Message = { role: 'assistant' | 'user'; content: string };

const initialMessages: Message[] = [
  { role: 'assistant', content: 'Arthuron: The AFSS Artificial Intelligence Core. Standing by to assist with space science inquiries.' },
  { role: 'assistant', content: 'What would you like to explore today?' },
];

const quickReplies = ['Tell me about AFSS programs', 'What is the IAAC partnership?', 'How do I access the portals?'];

export default function ArthuronPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Arthuron is currently in standby mode. Full AI capabilities will be available upon portal activation. For now, I can guide you to the right section of the site.' },
      ]);
    }, 800);
  };

  return (
    <SiteShell>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <PageHeading eyebrow="Arthuron" title="The AFSS AI Core" description="Arthuron: The AFSS Artificial Intelligence Core. Standing by to assist with space science inquiries." />

          {/* Chat interface */}
          <div className="glass-strong rounded-3xl overflow-hidden shadow-2xl shadow-nebula/20">
            {/* Header */}
            <div className="relative border-b border-nebula/15 p-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nebula-glow to-transparent" />
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-nebula-glow/30 blur-md rounded-2xl animate-pulse-glow" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula to-nebula-dark">
                    <Bot className="h-7 w-7 text-starlight" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-starlight">Arthuron</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-starlight/40">Online · Standing by</span>
                  </div>
                </div>
                <div className="hidden items-center gap-2 rounded-full glass px-3 py-1.5 sm:flex">
                  <Cpu className="h-3.5 w-3.5 text-nebula-glow" />
                  <span className="text-xs text-starlight/50">AI Core v1.0</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="max-h-[460px] space-y-4 overflow-y-auto p-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${msg.role === 'user' ? 'bg-white/[0.06]' : 'bg-gradient-to-br from-nebula to-nebula-dark'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4 text-starlight/60" /> : <Sparkles className="h-4 w-4 text-starlight" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'glass rounded-tr-sm' : 'glass-nebula rounded-tl-sm'}`}>
                    <p className="text-sm leading-relaxed text-starlight/80">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 px-6 pb-4">
              {quickReplies.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} className="rounded-full glass px-3 py-1.5 text-xs text-starlight/60 transition-all hover:glass-nebula hover:text-starlight">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-nebula/15 p-6">
              <div className="flex items-center gap-2 glass rounded-2xl px-4 py-3">
                <Radio className="h-5 w-5 text-nebula-glow/40" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Ask Arthuron about space science..."
                  className="flex-1 bg-transparent text-sm text-starlight placeholder:text-starlight/30 focus:outline-none"
                />
                <button onClick={() => sendMessage(input)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-nebula to-nebula-dark transition-transform hover:scale-110">
                  <Send className="h-4 w-4 text-starlight" />
                </button>
              </div>
            </div>
          </div>

          {/* Info card */}
          <div className="mt-8 glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Cpu className="mt-1 h-5 w-5 shrink-0 text-nebula-glow" />
              <p className="text-sm leading-relaxed text-starlight/50">
                Arthuron is the dedicated artificial intelligence core of Arthur For Space Sciences Ltd. It is designed to assist with space science inquiries, guide users through programs and partnerships, and support the AFSS community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
