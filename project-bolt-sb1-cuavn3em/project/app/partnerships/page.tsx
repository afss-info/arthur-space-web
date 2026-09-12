'use client';

import { Handshake, Award, Globe } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function PartnershipsPage() {
  const { t, isRTL } = useLang();

  return (
    <div className="page-section" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <Handshake size={13} className="text-cyan-400" />
            <span className="text-cyan-300 text-xs font-semibold tracking-widest uppercase">{t('nav_partnerships')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">{t('partnerships_title')}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('partnerships_subtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* IAAC */}
          <div className="glass-card p-8 sm:p-10 hover:border-cyan-500/25 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Globe size={28} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 className="text-xl font-bold text-white">{t('partnerships_iaac_name')}</h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 text-xs font-semibold">
                    <Award size={11} />
                    {t('partnerships_official_badge')}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{t('partnerships_iaac_desc')}</p>

                <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-widest font-medium mb-1.5">AFSS Status</div>
                    <div className="text-cyan-300 text-sm font-medium">Officially Registered Institute</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-widest font-medium mb-1.5">Representative</div>
                    <div className="text-white text-sm font-medium">Jad Yassin — IAAC Ambassador</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* StemMed */}
          <div className="glass-card p-8 sm:p-10 hover:border-purple-500/25 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Handshake size={28} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h2 className="text-xl font-bold text-white">{t('partnerships_stemmed_name')}</h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold">
                    <Award size={11} />
                    {t('partnerships_official_badge')}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{t('partnerships_stemmed_desc')}</p>

                <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-widest font-medium mb-1.5">Type</div>
                    <div className="text-purple-300 text-sm font-medium">US-based 501(c)(3) Nonprofit</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs uppercase tracking-widest font-medium mb-1.5">Collaboration</div>
                    <div className="text-white text-sm font-medium">Atheris Research Project</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
