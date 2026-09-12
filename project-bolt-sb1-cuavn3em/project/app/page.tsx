'use client';

import Link from 'next/link';
import { Rocket, Globe, Users, ArrowRight, Star, Atom } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { AFSSLogo } from '@/components/AFSSLogo';

export default function HomePage() {
  const { t, isRTL } = useLang();

  return (
    <div className="page-section relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[85vh] px-4 sm:px-6">
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-purple-500/5 absolute" />
          <div className="w-[800px] h-[800px] rounded-full border border-purple-500/5 absolute" />
          <div className="w-[1000px] h-[1000px] rounded-full border border-blue-500/5 absolute" />
        </div>

        {/* Logo */}
        <div className="float-anim mb-8">
          <AFSSLogo size={100} />
        </div>

        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 pulse-dot" />
          <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">
            Still. Aware.
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-5xl mx-auto">
          <span className="text-gradient">{t('home_headline')}</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t('home_subheadline')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/programs" className="btn-primary flex items-center gap-2 text-base">
            <Rocket size={18} />
            {t('home_cta_programs')}
          </Link>
          <Link href="/portals" className="btn-outline flex items-center gap-2 text-base">
            {t('home_cta_portals')}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-12 max-w-lg mx-auto">
          {[
            { value: '2', label: t('home_stat1_label'), icon: Rocket },
            { value: '4', label: t('home_stat2_label'), icon: Atom },
            { value: '2', label: t('home_stat3_label'), icon: Globe },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{value}</div>
              <div className="text-gray-500 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5">
                <Icon size={12} className="text-purple-400" />
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="glass-card p-8 sm:p-12 glow-purple text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={16} className="text-purple-400" />
            <h2 className="text-sm font-semibold tracking-widest uppercase text-purple-400">
              {t('home_mission_title')}
            </h2>
            <Star size={16} className="text-purple-400" />
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            {t('home_mission_text')}
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/about', label: t('nav_about'), desc: isRTL ? 'تعرف على فريقنا والكيان القانوني' : 'Meet our team and legal entity', icon: Users },
            { href: '/programs', label: t('nav_programs'), desc: isRTL ? 'استكشف برامجنا التدريبية' : 'Explore our training programs', icon: Rocket },
            { href: '/partnerships', label: t('nav_partnerships'), desc: isRTL ? 'شركاؤنا الرسميون العالميون' : 'Our official global partners', icon: Globe },
          ].map(({ href, label, desc, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="glass-card p-6 flex items-start gap-4 hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0 group-hover:bg-purple-500/25 transition-colors">
                <Icon size={20} className="text-purple-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
              </div>
              <ArrowRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors ml-auto shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
