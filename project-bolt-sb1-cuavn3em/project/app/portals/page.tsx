'use client';

import Link from 'next/link';
import { GraduationCap, UserCog, ArrowRight, Shield, RadioTower } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function PortalsPage() {
  const { t, isRTL } = useLang();

  return (
    <div className="page-section" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <Shield size={13} className="text-purple-400" />
            <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">{t('nav_portals')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">{t('portals_title')}</h1>
          <p className="text-gray-400 max-w-xl mx-auto">{t('portals_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Portal */}
          <Link href="/portals/student" className="glass-card p-10 flex flex-col items-center text-center gap-5 hover:border-purple-500/40 hover:bg-white/5 transition-all duration-300 group glow-purple">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 to-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <GraduationCap size={36} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{t('portals_student_title')}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{t('portals_student_desc')}</p>
            </div>
            <div className="btn-primary flex items-center gap-2 mt-2 text-sm">
              {t('portals_enter_btn')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Mentor Portal */}
          <Link href="/portals/mentor" className="glass-card p-10 flex flex-col items-center text-center gap-5 hover:border-blue-500/40 hover:bg-white/5 transition-all duration-300 group glow-blue">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <UserCog size={36} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{t('portals_mentor_title')}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{t('portals_mentor_desc')}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-300 px-6 py-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-all mt-2">
              {t('portals_enter_btn')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          {/* Media Portal */}
        <Link href="/portals/media" className="glass-card p-10 flex flex-col items-center text-center gap-5 hover:border-blue-500/40 hover:bg-white/5 transition-all duration-300 group glow-blue">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <RadioTower size={36} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{isRTL ? 'بوابة فريق الإعلام' : 'Media / Comm Portal'}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isRTL ? 'الوصول إلى لوحة تحكم الإعلام لنشر وتعديل الأخبار الرسمية للمدونة.' : 'Access media dashboard to publish, edit, and manage official news and blog posts.'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-300 px-6 py-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 transition-all mt-2">
            {t('portals_enter_btn')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
}
