'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/language-provider';
import { LanguageToggle } from '@/components/language-toggle';
import { LogoMark } from '@/components/logo-mark';

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.research', href: '/space-research' },
  { key: 'nav.programs', href: '/programs' },
  { key: 'nav.partnerships', href: '/partnerships' },
  { key: 'nav.portals', href: '/portals' },
];

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-space-black/80 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setMobileOpen(false)} aria-label="Arthur For Space Sciences Ltd">
          <LogoMark compact />
          <div className="hidden sm:block">
            <div className="font-display text-sm font-bold leading-tight text-starlight">Arthur For Space Sciences Ltd</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-starlight/40">{t('brand.placeholderCaption')}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-3 py-2 text-xs font-medium transition-colors',
                  active ? 'bg-nebula/15 text-starlight' : 'text-starlight/55 hover:bg-white/[0.04] hover:text-starlight'
                )}
              >
                {link.label}
                {active && <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-nebula-glow to-transparent" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link href="/arthuron" className="hidden items-center gap-2 rounded-full border border-nebula-light/30 bg-nebula/10 px-4 py-2 text-xs font-semibold text-starlight transition-all hover:border-nebula-glow hover:bg-nebula/20 md:inline-flex">
            {t('nav.arthuron')} <ArrowUpRight className="h-3.5 w-3.5 text-nebula-glow" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-starlight xl:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/[0.07] bg-space-black/95 px-6 py-4 xl:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={cn('rounded-xl px-4 py-3 text-sm transition-colors', active ? 'bg-nebula/15 text-starlight' : 'text-starlight/60 hover:bg-white/[0.04] hover:text-starlight')}>
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between gap-3">
              <Link href="/arthuron" onClick={() => setMobileOpen(false)} className="flex-1 rounded-xl border border-nebula-light/30 bg-nebula/10 px-4 py-3 text-sm font-semibold text-starlight">
                {t('nav.arthuron')}
              </Link>
              <LanguageToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
