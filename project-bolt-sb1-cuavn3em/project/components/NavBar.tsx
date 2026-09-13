'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AFSSLogo } from './AFSSLogo';
import { useLang } from '@/contexts/LanguageContext';

const navKeys = [
  { key: 'nav_home' as const, href: '/' },
  { key: 'nav_about' as const, href: '/about' },
  { key: 'nav_research' as const, href: '/research' },
  { key: 'nav_programs' as const, href: '/programs' },
  { key: 'nav_partnerships' as const, href: '/partnerships' },
  { key: 'nav_portals' as const, href: '/portals' },
  { key: 'nav_arthuron' as const, href: '/arthuron' },
  { key: 'nav_blog' as const, href: '/blog' },
  { key: 'nav_donate' as const, href: '/donate' },
];

export function NavBar() {
  const { t, lang, toggleLang, isRTL } = useLang();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="glass-nav border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <AFSSLogo size={40} />
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-widest group-hover:text-purple-300 transition-colors">
                AFSS
              </span>
              <span className="text-[10px] tracking-[0.2em] text-purple-400 uppercase font-medium">
                {t('nav_tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navKeys.map(({ key, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-white bg-purple-600/30 border border-purple-500/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          {/* Language toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-md border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-semibold hover:bg-purple-500/20 transition-all duration-200 tracking-wider"
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button
              className="lg:hidden text-gray-400 hover:text-white p-1"
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass-nav border-b border-white/5 px-4 pb-4 pt-2" dir={isRTL ? 'rtl' : 'ltr'}>
          <nav className="flex flex-col gap-1">
            {navKeys.map(({ key, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-white bg-purple-600/30 border border-purple-500/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
