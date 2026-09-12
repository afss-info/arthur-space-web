'use client';

import { useState } from 'react';
import { Search, Telescope, Globe, Satellite, FlaskConical, Atom, Star, ExternalLink } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const agencies = [
  { name: 'NASA', color: '#1e40af', bg: 'rgba(30,64,175,0.15)', desc: 'National Aeronautics and Space Administration' },
  { name: 'ESA', color: '#1d4ed8', bg: 'rgba(29,78,216,0.15)', desc: 'European Space Agency' },
  { name: 'JAXA', color: '#0f766e', bg: 'rgba(15,118,110,0.15)', desc: 'Japan Aerospace Exploration Agency' },
  { name: 'CNSA', color: '#b91c1c', bg: 'rgba(185,28,28,0.15)', desc: 'China National Space Administration' },
];

const featuredAreas = [
  { icon: Telescope, title: 'Exoplanet Characterization', desc: 'Spectroscopic analysis and atmospheric modeling of exoplanets beyond our solar system.' },
  { icon: Atom, title: 'Quantum Astrophysics', desc: 'Exploring quantum mechanical phenomena in extreme astrophysical environments.' },
  { icon: Satellite, title: 'Space Systems Engineering', desc: 'Mission design, spacecraft engineering, and orbital mechanics.' },
  { icon: FlaskConical, title: 'Astrobiology', desc: 'Study of the origin, evolution, and distribution of life in the universe.' },
  { icon: Star, title: 'Stellar Evolution', desc: 'Life cycles of stars from formation through stellar remnants.' },
  { icon: Globe, title: 'Planetary Science', desc: 'Comparative planetology and exploration of solar system bodies.' },
];

export default function ResearchPage() {
  const { t, isRTL } = useLang();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) setSearched(true);
  }

  return (
    <div className="page-section" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <Telescope size={13} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">{t('nav_research')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">{t('research_title')}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('research_subtitle')}</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-14">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('research_search_placeholder')}
              className="w-full pl-11 pr-36 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all text-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-4 btn-primary text-sm rounded-lg"
            >
              {t('research_search_btn')}
            </button>
          </form>

          {searched && (
            <div className="mt-4 glass-card p-5 text-center">
              <p className="text-gray-400 text-sm">
                {isRTL
                  ? `تم البحث عن: "${query}" — الاتصال بقاعدة البيانات...`
                  : `Searching for: "${query}" — Connecting to database...`}
              </p>
              <p className="text-gray-600 text-xs mt-2">
                {isRTL
                  ? 'ستكون قاعدة البيانات الحية متاحة قريباً.'
                  : 'Live database connection coming soon.'}
              </p>
            </div>
          )}
        </div>

        {/* Agency Sources */}
        <section className="mb-14">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-5">{t('research_sources_title')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {agencies.map(agency => (
              <div
                key={agency.name}
                className="glass-card p-5 text-center group cursor-default"
                style={{ borderColor: `${agency.color}25` }}
              >
                <div
                  className="text-2xl font-black tracking-wider mb-2"
                  style={{ color: agency.color === '#1e40af' ? '#60a5fa' : agency.color === '#1d4ed8' ? '#93c5fd' : agency.color === '#0f766e' ? '#34d399' : '#f87171' }}
                >
                  {agency.name}
                </div>
                <div className="text-gray-500 text-[10px] leading-snug">{agency.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Research Areas */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-5">{t('research_featured_title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredAreas.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 flex gap-4 hover:border-purple-500/25 transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0 group-hover:bg-purple-500/25 transition-colors">
                  <Icon size={17} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold mb-1">{title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Note */}
        <div className="glass-card p-4 flex items-start gap-3">
          <ExternalLink size={14} className="text-gray-600 shrink-0 mt-0.5" />
          <p className="text-gray-600 text-xs leading-relaxed">{t('research_note')}</p>
        </div>
      </div>
    </div>
  );
}
