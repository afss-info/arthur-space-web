'use client';

import React, { useState, useEffect } from 'react';
import { Search, Telescope, Globe, Satellite, FlaskConical, Atom, Star, ExternalLink, BookOpen, Newspaper, Download, Loader2 } from 'lucide-react';
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
  
  // States for live data
  const [nasaData, setNasaData] = useState<any>(null);
  const [papersData, setPapersData] = useState<any[]>([]);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // جلب بيانات ناسا مرة واحدة عند التحميل
    fetch('/api/nasa').then(res => res.json()).then(data => setNasaData(data)).catch(console.error);
    // جلب البيانات الافتراضية للأبحاث والأخبار
    fetchLiveFeed('');
  }, []);

  const fetchLiveFeed = async (searchQuery: string) => {
    try {
      setLoading(true);
      const papersUrl = searchQuery ? `/api/papers?q=${encodeURIComponent(searchQuery)}` : '/api/papers';
      const newsUrl = searchQuery 
        ? `https://api.spaceflightnewsapi.net/v4/articles/?limit=4&search=${encodeURIComponent(searchQuery)}` 
        : 'https://api.spaceflightnewsapi.net/v4/articles/?limit=4';

      const [papersRes, newsRes] = await Promise.all([
        fetch(papersUrl),
        fetch(newsUrl)
      ]);

      const papers = await papersRes.json();
      const news = await newsRes.json();

      setPapersData(papers.error ? [] : papers);
      setNewsData(news.results || []);
    } catch (error) {
      console.error('Error fetching live data:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      setSearched(true);
      fetchLiveFeed(query.trim());
    }
  }

  function clearSearch() {
    setQuery('');
    setSearched(false);
    fetchLiveFeed('');
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

        {/* NASA Live APOD Feed */}
        <div className="glass-card p-6 md:p-8 mb-10 border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-400">NASA Astronomy Picture of the Day</h2>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Live API
            </span>
          </div>
          {nasaData && !nasaData.error ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="overflow-hidden rounded-xl border border-white/10">
                <img src={nasaData.url} alt={nasaData.title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">{nasaData.title}</h3>
                <p className="text-xs text-blue-300">{nasaData.date}</p>
                <p className="text-gray-300 text-sm leading-relaxed max-h-48 overflow-y-auto pr-2 custom-scrollbar">{nasaData.explanation}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">جاري جلب أحدث صورة وبيانات حية من ناسا...</div>
          )}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
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
            <button type="submit" disabled={isSearching} className="absolute inset-y-2 right-2 px-4 btn-primary text-sm rounded-lg flex items-center gap-2 disabled:opacity-50">
              {isSearching ? <Loader2 size={16} className="animate-spin" /> : null}
              {isSearching ? (isRTL ? 'جاري البحث...' : 'Searching...') : t('research_search_btn')}
            </button>
          </form> 
        </div>

        {/* Search Results Indicator */}
        {searched && query && (
          <div className="mb-6 flex items-center justify-between glass-card p-4 border border-blue-500/30">
             <div className="text-white text-sm font-semibold flex items-center gap-2">
               <Search size={16} className="text-blue-400"/>
               {isRTL ? `نتائج البحث عن: "${query}"` : `Live search results for: "${query}"`}
             </div>
             <button onClick={clearSearch} className="text-xs text-gray-400 hover:text-white underline">
               {isRTL ? 'إلغاء البحث والعودة' : 'Clear search & reset'}
             </button>
          </div>
        )}

        {/* Live Papers & News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          
          {/* Latest Open Access Papers */}
          <div className="glass-card p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2 mb-6"><BookOpen size={20} /> Latest Research Papers</h2>
            <div className="space-y-4">
              {loading ? <div className="text-gray-400 text-sm flex items-center gap-2"><Loader2 size={16} className="animate-spin"/> Fetching papers...</div> : papersData.length > 0 ? papersData.map((paper, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <h3 className="text-white text-sm font-semibold mb-2 line-clamp-2">{paper.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">Year: {paper.year || '2026'}</span>
                    <a href={paper.openAccessPdf?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg transition-colors">
                      <Download size={14} /> PDF
                    </a>
                  </div>
                </div>
              )) : <p className="text-red-400 text-sm">No research papers found for this topic.</p>}
            </div>
          </div>

          {/* Global Space Agencies News */}
          <div className="glass-card p-6 border border-teal-500/20">
            <h2 className="text-xl font-bold text-teal-400 flex items-center gap-2 mb-6"><Newspaper size={20} /> Global Agencies Updates</h2>
            <div className="space-y-4">
              {loading ? <div className="text-gray-400 text-sm flex items-center gap-2"><Loader2 size={16} className="animate-spin"/> Scanning feeds...</div> : newsData.length > 0 ? newsData.map((news, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-4 hover:border-teal-500/30 transition-colors">
                  <img src={news.image_url} alt={news.title} className="w-20 h-20 object-cover rounded-lg shrink-0 border border-white/10" />
                  <div className="flex flex-col justify-between">
                    <h3 className="text-white text-sm font-semibold line-clamp-2">{news.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-teal-500 font-medium">{news.news_site}</span>
                      <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                        Read <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              )) : <p className="text-red-400 text-sm">No news found for this topic.</p>}
            </div>
          </div>
        </div>

        {/* Agency Sources */}
        <section className="mb-14">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-5">{t('research_sources_title')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {agencies.map(agency => (
              <div key={agency.name} className="glass-card p-5 text-center group cursor-default" style={{ borderColor: `${agency.color}25` }}>
                <div className="text-2xl font-black tracking-wider mb-2" style={{ color: agency.color === '#1e40af' ? '#60a5fa' : agency.color === '#1d4ed8' ? '#93c5fd' : agency.color === '#0f766e' ? '#34d399' : '#f87171' }}>
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
