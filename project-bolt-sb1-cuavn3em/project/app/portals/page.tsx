'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, UserCog, ArrowRight, Shield, RadioTower } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const StarsBackground = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: Math.random() * 2 + 1,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div key={star.id} className="absolute bg-white rounded-full shadow-[0_0_12px_#fff] animate-fall"
          style={{ left: star.left, width: `${star.size}px`, height: `${star.size}px`, animationDuration: star.animationDuration, animationDelay: star.animationDelay, top: '-5%' }}
        />
      ))}
    </div>
  );
};

export default function PortalsPage() {
  const { t, isRTL } = useLang();

  return (
    <div className="page-section relative min-h-screen overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0); opacity: 1; } 100% { transform: translateY(110vh) translateX(-20vw); opacity: 0; } }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}} />

      <StarsBackground />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-10">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-sm">
            <Shield size={14} className="text-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold tracking-[0.2em] uppercase">
              {isRTL ? 'المركز الرئيسي للقيادة' : 'MAIN COMMAND CENTER'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-600 tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] mb-4">
            {t('portals_title')}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base font-medium">{t('portals_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {/* Student Portal */}
          <Link href="/portals/student" className="relative glass-card p-10 flex flex-col items-center text-center gap-5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-900/10 transition-all duration-500 group rounded-3xl overflow-hidden backdrop-blur-xl hover:-translate-y-2 shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 to-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <GraduationCap size={36} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-wide">{t('portals_student_title')}</h2>
              <p className="text-gray-400 text-xs leading-relaxed">{t('portals_student_desc')}</p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-purple-300 px-6 py-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 group-hover:bg-purple-500 group-hover:text-white transition-all">
              {isRTL ? 'بدء الاتصال' : 'INITIATE UPLINK'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Mentor Portal */}
          <Link href="/portals/mentor" className="relative glass-card p-10 flex flex-col items-center text-center gap-5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all duration-500 group rounded-3xl overflow-hidden backdrop-blur-xl hover:-translate-y-2 shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-600/30 to-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <UserCog size={36} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-wide">{t('portals_mentor_title')}</h2>
              <p className="text-gray-400 text-xs leading-relaxed">{t('portals_mentor_desc')}</p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-cyan-300 px-6 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-white transition-all">
              {isRTL ? 'تأكيد الهوية' : 'VERIFY ID'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Media Portal */}
          <Link href="/portals/media" className="relative glass-card p-10 flex flex-col items-center text-center gap-5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-500 group rounded-3xl overflow-hidden backdrop-blur-xl hover:-translate-y-2 shadow-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <RadioTower size={36} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-wide">{isRTL ? 'بوابة فريق الإعلام' : 'Media / Comm Portal'}</h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                {isRTL ? 'الوصول إلى لوحة تحكم الإعلام لنشر وتعديل الأخبار الرسمية للمدونة مع التدقيق الآلي.' : 'Access media dashboard to publish and manage official news with automated AI auditing.'}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-300 px-6 py-2.5 rounded-xl border border-blue-500/30 bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white transition-all">
              {isRTL ? 'الوصول للخوادم' : 'ACCESS SERVERS'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
