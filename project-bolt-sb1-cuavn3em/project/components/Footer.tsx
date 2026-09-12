'use client';

import { Mail, Phone, Instagram, Linkedin, MapPin, Hash } from 'lucide-react';
import { AFSSLogo } from './AFSSLogo';
import { useLang } from '@/contexts/LanguageContext';

export function Footer() {
  const { t, isRTL } = useLang();

  return (
    <footer className="border-t border-white/5 bg-[#050505]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AFSSLogo size={36} />
              <div>
                <div className="text-white font-bold tracking-widest text-base">AFSS</div>
                <div className="text-[10px] text-purple-400 tracking-[0.2em] uppercase">{t('nav_tagline')}</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t('footer_org')}</p>
            <p className="text-purple-400 text-xs tracking-widest uppercase font-medium">{t('footer_tagline')}</p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">{t('footer_contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-gray-400 text-sm hover:text-white transition-colors">
                <Mail size={15} className="text-purple-400 shrink-0" />
                <span>info@arthurforspacesciences.org.uk</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm hover:text-white transition-colors">
                <Phone size={15} className="text-purple-400 shrink-0" />
                <span dir="ltr">+44 746 658 8897</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm hover:text-white transition-colors">
                <Instagram size={15} className="text-purple-400 shrink-0" />
                <span>@afss.ofcl</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-sm">
                <Linkedin size={15} className="text-purple-400 shrink-0" />
                <span className="text-gray-600 italic">{t('footer_linkedin')}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">{t('footer_legal')}</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">{t('footer_legal_status')}</li>
              <li className="text-gray-400 text-sm">{t('footer_legal_reg')}</li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Hash size={13} className="text-purple-400 shrink-0" />
                <span dir="ltr">17452506</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={13} className="text-purple-400 shrink-0 mt-0.5" />
                <span dir="ltr">182-184 High Street North, East Ham, London, E6 2JA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs">{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
