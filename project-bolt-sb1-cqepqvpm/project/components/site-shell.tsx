import type { ReactNode } from 'react';
import { Starfield } from '@/components/starfield';
import { Navbar } from '@/components/navbar';
import { SiteFooter } from '@/components/site-footer';
import { AIAssistant } from '@/components/ai-assistant';

type SiteShellProps = { children: ReactNode };

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-space-black text-starlight">
      <Starfield />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
      <AIAssistant />
    </div>
  );
}
