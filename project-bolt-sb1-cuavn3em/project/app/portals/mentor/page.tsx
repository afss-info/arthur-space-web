'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserCog, Lock, ArrowLeft, Eye, EyeOff, Info } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { AFSSLogo } from '@/components/AFSSLogo';

export default function MentorPortalPage() {
  const { t, isRTL } = useLang();
  const [showPass, setShowPass] = useState(false);
  const [mentorId, setMentorId] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="page-section flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md mx-auto px-4">
        {/* Back */}
        <Link
          href="/portals"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} className={isRTL ? 'rotate-180' : ''} />
          {t('portals_back_btn')}
        </Link>

        <div className="glass-card p-8 sm:p-10 glow-blue">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
              <UserCog size={30} className="text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{t('portals_mentor_title')}</h1>
            <div className="flex items-center justify-center gap-1 mt-1">
              <AFSSLogo size={14} />
              <span className="text-gray-500 text-xs tracking-widest">AFSS</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3 mb-8">
            <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-blue-200 text-xs leading-relaxed">{t('portals_mentor_instructions')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {t('portals_mentor_id_label')}
              </label>
              <input
                type="text"
                value={mentorId}
                onChange={e => setMentorId(e.target.value)}
                placeholder={t('portals_mentor_id_placeholder')}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {t('portals_password_label')}
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t('portals_password_placeholder')}
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 border border-blue-500/40 mt-2"
            >
              <Lock size={16} />
              {t('portals_login_btn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
