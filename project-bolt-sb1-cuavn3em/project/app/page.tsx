'use client';

import Link from 'next/link';
import { Rocket, Globe, Users, ArrowRight, Star, Atom, Handshake, ShieldCheck, Heart, Target, CheckCircle2, Globe2 } from 'lucide-react';
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
      {/* --- الفضاء التفاعلي: قسم القيم والأهداف (بداية) --- */}
        <section className="py-24 relative overflow-hidden w-full">
          {/* تأثيرات الخلفية الكونية */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] max-w-5xl bg-gradient-to-b from-cyan-900/10 via-purple-900/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            
            {/* OUR VALUES - قيمنا */}
            <div className="text-center mb-32">
              <div className="inline-block relative mb-12 group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest uppercase relative z-10">
                  {isRTL ? 'قِيَمُنَا' : 'Our Values'}
                </h2>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {[
                  { icon: Handshake, en: 'Cooperation', ar: 'التعاون' },
                  { icon: ShieldCheck, en: 'Credibility', ar: 'المصداقية' },
                  { icon: Heart, en: 'Respect', ar: 'الاحترام' },
                  { icon: Target, en: 'Commitment', ar: 'الالتزام' },
                  { icon: CheckCircle2, en: 'Responsibility', ar: 'المسؤولية' }
                ].map((val, idx) => (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-400/50 transition-all duration-500"></div>
                    <div className="relative glass-card bg-slate-900/80 border border-cyan-500/30 p-6 md:p-8 rounded-3xl flex flex-col items-center gap-4 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 w-40 md:w-48">
                      <val.icon className="text-cyan-400 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500" size={40} />
                      <span className="text-white font-bold text-lg tracking-wide">{isRTL ? val.ar : val.en}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OUR GOALS - أهدافنا */}
            <div className="text-center mt-20">
              <div className="inline-block relative mb-16 group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-widest uppercase relative z-10">
                  {isRTL ? 'أَهْدَافُنَا' : 'Our Goals'}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    icon: Rocket, 
                    en: 'Providing opportunities for those interested in space science.', 
                    ar: 'توفير الفرص للمهتمين بعلوم الفضاء.' 
                  },
                  { 
                    icon: Atom, 
                    en: 'Transferring modern science and opening up practical integration opportunities for young people in this field.', 
                    ar: 'نقل العلم الحديث وفتح فرص الاندماج العملي للشباب في هذا المجال.' 
                  },
                  { 
                    icon: Globe2, 
                    en: 'Applying the principle of separating science from discrimination and linking it to the values of cooperation and humanism.', 
                    ar: 'تطبيق مبدأ فصل العلم عن التمييز وربطه بقيم التعاون والإنسانية.' 
                  }
                ].map((goal, idx) => (
                  <div key={idx} className="group glass-card bg-slate-900/60 border border-purple-500/30 p-8 rounded-3xl hover:bg-slate-800/90 hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500 hover:-translate-y-4 relative overflow-hidden flex flex-col items-center md:items-start">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/40 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 shadow-lg">
                      <goal.icon className="text-purple-300 group-hover:text-white transition-colors duration-300" size={36} />
                    </div>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center md:text-start relative z-10 font-medium group-hover:text-white transition-colors duration-300">
                      {isRTL ? goal.ar : goal.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
        {/* --- الفضاء التفاعلي: قسم القيم والأهداف (نهاية) --- */}
    </div>
  );
}
