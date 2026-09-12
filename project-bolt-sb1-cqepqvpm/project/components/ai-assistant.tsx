'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHovered(true), 3000);
    const timer2 = setTimeout(() => setHovered(false), 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-nebula-glow/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-full bg-nebula-glow/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
        </div>

        {/* Tooltip */}
        <div
          className={cn(
            'absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap glass-strong rounded-2xl px-4 py-3 transition-all duration-500 pointer-events-none',
            hovered && !open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          )}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-starlight/80 font-medium">Arthuron is standing by</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => setOpen(!open)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-nebula via-nebula-light to-nebula-dark flex items-center justify-center glow-purple-strong hover:scale-110 transition-all duration-500 group"
          aria-label="Arthuron AI Assistant"
        >
          <div className="absolute inset-0 rounded-full bg-nebula-glow/30 blur-xl animate-pulse-glow" />
          {open ? (
            <X className="relative w-7 h-7 text-starlight" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-starlight group-hover:rotate-12 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-space-black" />
            </div>
          )}
        </button>
      </div>

      {/* Mini panel */}
      <div
        className={cn(
          'fixed bottom-28 right-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] transition-all duration-500',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        )}
      >
        <div className="glass-strong rounded-3xl overflow-hidden shadow-2xl shadow-nebula/20">
          <div className="relative p-5 border-b border-nebula/15">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nebula-glow to-transparent" />
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-nebula-glow/30 blur-md rounded-full animate-pulse-glow" />
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-nebula to-nebula-dark flex items-center justify-center">
                  <Bot className="w-6 h-6 text-starlight" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-starlight">Arthuron</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-starlight/40">AFSS AI Core · Standing by</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5">
            <p className="text-sm leading-relaxed text-starlight/60 mb-4">
              Arthuron: The AFSS Artificial Intelligence Core. Standing by to assist with space science inquiries.
            </p>
            <Link
              href="/arthuron"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-nebula to-nebula-dark px-6 py-3 text-sm font-medium text-starlight transition-all hover:glow-purple"
            >
              <Sparkles className="w-4 h-4" /> Open Arthuron
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
