'use client';

import Link from 'next/link';
import { Rocket, Globe, Users, ArrowRight, Star, Atom, Handshake, ShieldCheck, Heart, Target, CheckCircle2, Globe2, Activity, Zap, Crosshair } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t, isRTL } = useLang();

  return (
    // الخلفية شفافة للسماح للنجوم الأصلية في الموقع بالسطوع والتمدد
    <div className="page-section relative overflow-hidden w-full min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* التأثيرات السيبرانية (CSS) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
        .cyber-glow { text-shadow: 0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(6, 182, 212, 0.4); }
        .radar-sweep { background: conic-gradient(from 0deg, transparent 70%, rgba(6, 182, 212, 0.2) 100%); border-radius: 50%; animation: spin-slow 4s linear infinite; }
      `}} />

      {/* الشبكة السيبرانية الشفافة التي تندمج مع نجومك */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      {/* Hero Section (Command Center) */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-4 sm:px-6 w-full z-10 pt-10">
        
        {/* Holographic Logo Core */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center mb-8 group mx-auto">
          {/* الحلقات الدوارة حول الشعار */}
          <div className="absolute inset-0 border-t-2 border-l-2 border-cyan-500/80 rounded-full animate-[spin_6s_linear_infinite] shadow-[0_0_30px_rgba(6,182,212,0.4)]"></div>
          <div className="absolute inset-2 border-b-2 border-r-2 border-purple-500/80 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>
          <div className="absolute inset-4 border-2 border-dashed border-blue-500/40 rounded-full animate-[spin_8s_linear_infinite]"></div>
          <div className="absolute inset-2 radar-sweep pointer-events-none opacity-50 rounded-full"></div>
          
          {/* شعار المؤسسة الرسمي */}
          <img 
            src="/aa6410ef-b400-415c-b6fe-818eaa1a0a84.jpg" 
            alt="AFSS Official Logo" 
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-700 shadow-[0_0_40px_rgba(255,255,255,0.2)] bg-white"
          />
        </div>

        {/* Tagline pill (System Status) */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Activity size={14} className="text-cyan-400 animate-pulse" />
          <span className="text-cyan-200 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">
            Still. Aware.
          </span>
          <Zap size={14} className="text-cyan-400" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight max-w-6xl mx-auto cyber-glow uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400">
          {t('home_headline')}
        </h1>

        <p className="mt-8 text-base sm:text-xl text-cyan-100/70 max-w-3xl mx-auto leading-[2] font-mono">
          {t('home_subheadline')}
        </p>

        {/* Uplink Commands (Buttons) */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
          <Link href="/programs" className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black tracking-widest uppercase text-sm shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 flex items-center gap-3">
            <Rocket size={20} /> {t('home_cta_programs')}
          </Link>
          <Link href="/portals" className="px-8 py-4 rounded-xl bg-purple-950/40 border border-purple-500/50 hover:bg-purple-900/60 text-purple-200 hover:text-white font-black tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all hover:scale-105 flex items-center gap-3">
            {t('home_cta_portals')} <ArrowRight size={20} />
          </Link>
        </div>

        {/* Telemetry Stats */}
        <div className="mt-20 grid grid-cols-3 gap-4 sm:gap-12 max-w-3xl mx-auto glass-card bg-black/40 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          {[
            { value: '2', label: t('home_stat1_label'), icon: Rocket },
            { value: '4', label: t('home_stat2_label'), icon: Atom },
            { value: '2', label: t('home_stat3_label'), icon: Globe },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center group">
              <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500 mb-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{value}</div>
              <div className="text-cyan-400/80 text-[10px] sm:text-xs font-mono uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-2">
                <Icon size={14} className="text-cyan-400" /> {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Directive */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="glass-card border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.15)] rounded-[40px] p-10 sm:p-16 bg-black/60 backdrop-blur-2xl text-center relative overflow-hidden group">
          <Crosshair className="absolute top-6 left-6 text-purple-500/30 pointer-events-none" size={30} />
          <Crosshair className="absolute bottom-6 right-6 text-purple-500/30 pointer-events-none transform rotate-180" size={30} />
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Star size={20} className="text-purple-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black tracking-[0.3em] uppercase text-purple-300">
              {t('home_mission_title')}
            </h2>
            <Star size={20} className="text-purple-400 animate-pulse" />
          </div>
          <p className="text-gray-200 text-lg sm:text-2xl leading-[2] font-medium font-mono">
            {t('home_mission_text')}
          </p>
        </div>
      </section>

      {/* Main Systems (Quick links) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href: '/about', label: t('nav_about'), desc: isRTL ? 'تعرف على فريقنا والكيان القانوني' : 'Meet our team and legal entity', icon: Users, color: 'cyan' },
            { href: '/programs', label: t('nav_programs'), desc: isRTL ? 'استكشف برامجنا التدريبية' : 'Explore our training programs', icon: Rocket, color: 'purple' },
            { href: '/partnerships', label: t('nav_partnerships'), desc: isRTL ? 'شركاؤنا الرسميون العالميون' : 'Our official global partners', icon: Globe, color: 'blue' },
          ].map(({ href, label, desc, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className={`glass-card p-8 flex flex-col items-start gap-6 border border-${color}-500/30 bg-black/50 hover:bg-${color}-950/40 hover:border-${color}-400 transition-all duration-500 group rounded-3xl backdrop-blur-md relative overflow-hidden shadow-lg`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500/50 group-hover:bg-${color}-400 transition-colors`}></div>
              <div className={`w-14 h-14 rounded-2xl bg-${color}-900/40 flex items-center justify-center shrink-0 border border-${color}-500/50 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(var(--${color}-500),0.3)]`}>
                <Icon size={24} className={`text-${color}-400`} />
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="text-white font-black tracking-widest uppercase text-lg">{label}</div>
                  <ArrowRight size={20} className={`text-gray-600 group-hover:text-${color}-400 transition-colors group-hover:translate-x-2`} />
                </div>
                <div className={`text-${color}-100/60 text-sm leading-relaxed font-mono`}>{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- الفضاء التفاعلي: قسم القيم والأهداف --- */}
      <section className="py-24 relative overflow-hidden w-full z-10">
        
        {/* OUR VALUES - قيمنا */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-32 relative">
            <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-600 tracking-[0.3em] uppercase relative z-10 mb-4">
              {isRTL ? 'قِيَمُنَا' : 'Our Values'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mx-auto shadow-[0_0_20px_rgba(6,182,212,0.8)] mb-16"></div>
            
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { icon: Handshake, en: 'Cooperation', ar: 'التعاون' },
                { icon: ShieldCheck, en: 'Credibility', ar: 'المصداقية' },
                { icon: Heart, en: 'Respect', ar: 'الاحترام' },
                { icon: Target, en: 'Commitment', ar: 'الالتزام' },
                { icon: CheckCircle2, en: 'Responsibility', ar: 'المسؤولية' }
              ].map((val, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-400/40 transition-all duration-500"></div>
                  <div className="relative glass-card bg-black/60 border border-cyan-500/30 p-8 sm:p-10 rounded-[30px] flex flex-col items-center gap-5 hover:-translate-y-4 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-500 w-44 sm:w-52 backdrop-blur-xl">
                    <val.icon className="text-cyan-400 group-hover:scale-125 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" size={48} />
                    <span className="text-white font-black text-sm sm:text-lg tracking-widest uppercase text-center">{isRTL ? val.ar : val.en}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OUR GOALS - أهدافنا */}
          <div className="text-center mt-32">
            <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-[0.3em] uppercase relative z-10 mb-4">
              {isRTL ? 'أَهْدَافُنَا' : 'Our Goals'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto shadow-[0_0_20px_rgba(168,85,247,0.8)] mb-16"></div>
            
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
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
                <div key={idx} className="group glass-card bg-black/60 border border-purple-500/30 p-8 sm:p-12 rounded-[40px] hover:bg-purple-950/40 hover:border-purple-400 hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all duration-500 hover:-translate-y-4 relative overflow-hidden flex flex-col items-center backdrop-blur-xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500"></div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-purple-900/30 border border-purple-500/50 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <goal.icon className="text-purple-300 group-hover:text-white transition-colors duration-300" size={40} />
                  </div>
                  <p className="text-purple-100/80 text-base sm:text-xl leading-[2] text-center relative z-10 font-medium font-mono group-hover:text-white transition-colors duration-300">
                    {isRTL ? goal.ar : goal.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
