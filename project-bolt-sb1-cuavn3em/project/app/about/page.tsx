'use client';

import { Building2, MapPin, Hash, Shield, User } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

function TeamMemberCard({
  name, title, bio, initials,
}: {
  name: string;
  title: string;
  bio: string;
  initials: string;
}) {
  return (
    <div className="glass-card p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl shrink-0 glow-purple">
          {initials}
        </div>
        <div>
          <h3 className="text-white text-lg font-bold">{name}</h3>
          <p className="text-purple-400 text-sm font-medium tracking-wide">{title}</p>
        </div>
      </div>
      {bio ? (
        <p className="text-gray-400 text-sm leading-[1.9] border-t border-white/5 pt-5">{bio}</p>
      ) : (
        <p className="text-gray-600 text-sm italic border-t border-white/5 pt-5">
          — Bio pending —
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  const { t, isRTL } = useLang();

  return (
    <div className="page-section" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <User size={13} className="text-purple-400" />
            <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">{t('nav_about')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient">{t('about_title')}</h1>
        </div>

        {/* Executive Team */}
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-white tracking-wider uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-purple-500" />
            {t('about_team_title')}
            <span className="w-8 h-px bg-purple-500" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TeamMemberCard
              name={t('about_jad_name')}
              title={t('about_jad_title')}
              bio={t('about_jad_bio')}
              initials="JY"
            />
            <TeamMemberCard
              name={t('about_laila_name')}
              title={t('about_laila_title')}
              bio={t('about_laila_bio')}
              initials="LA"
            />
          </div>
        </section>

        {/* Legal Entity */}
        <section>
          <h2 className="text-lg font-semibold text-white tracking-wider uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-blue-500" />
            {t('about_legal_title')}
            <span className="w-8 h-px bg-blue-500" />
          </h2>
          <div className="glass-card p-8 glow-blue">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <Shield size={22} className="text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold text-base">Arthur For Space Sciences Ltd</div>
                <div className="text-blue-400 text-sm">United Kingdom</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-medium">
                  <Building2 size={13} className="text-blue-400" />
                  {t('about_legal_status_label')}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">{t('about_legal_status_value')}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-medium">
                  <Hash size={13} className="text-blue-400" />
                  {t('about_legal_number_label')}
                </div>
                <p className="text-white font-bold text-2xl tracking-widest" dir="ltr">
                  {t('about_legal_number_value')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-medium">
                  <MapPin size={13} className="text-blue-400" />
                  {t('about_legal_address_label')}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed" dir="ltr">
                  {t('about_legal_address_value')}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-gray-500 text-xs tracking-widest uppercase text-center font-medium">
                Officially Registered — Companies House, United Kingdom
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
