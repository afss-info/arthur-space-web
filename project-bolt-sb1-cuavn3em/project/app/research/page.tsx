'use client';

import React, { useState, useEffect } from 'react';
import { Search, Telescope, Globe, Satellite, FlaskConical, Atom, Star, ExternalLink, BookOpen, Newspaper, Download, Loader2, Crosshair, Activity, Database, Radar, Zap } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const agencies = [
  { name: 'NASA', color: '#60a5fa', desc: 'National Aeronautics and Space Administration' },
  { name: 'ESA', color: '#93c5fd', desc: 'European Space Agency' },
  { name: 'JAXA', color: '#34d399', desc: 'Japan Aerospace Exploration Agency' },
  { name: 'CNSA', color: '#f87171', desc: 'China National Space Administration' },
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
    fetch('/api/nasa', { cache: 'no-store' }).then(res => res.json()).then(data => setNasaData(data)).catch(console.error);
    fetchLiveFeed('');
  }, []);

  const fetchLiveFeed = async (searchQuery: string) => {
    try {
      setLoading(true);
      const papersUrl = searchQuery ? `/api/papers?q=${encodeURIComponent(searchQuery)}` : '/api/papers';
      const newsUrl = searchQuery 
        ? `https://api.spaceflightnewsapi.net/v4/articles/?limit=4&search=${encodeURIComponent(searchQuery)}` 
        : 'https://api.spaceflightnewsapi.net/v4/articles/?limit=4';

      const [papersRes, newsRes] = await Promise.all([ fetch(papersUrl), fetch(newsUrl) ]);
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
    <div className="page-section relative overflow-hidden bg-[#020617]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* شبكة خلفية متحركة ببطء (Moving Grid Background) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header - واجهة المرصد */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Activity size={14} className="text-blue-400 animate-pulse" />
            <span className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase">{t('nav_research')} // OBSERVATORY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-600 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] mb-4">
            {t('research_title')}
          </h1>
          <p className="text-blue-200/60 max-w-2xl mx-auto text-sm sm:text-base tracking-wide font-medium">{t('research_subtitle')}</p>
        </div>

        {/* NASA Live APOD Feed - الشاشة السينمائية الكبرى */}
        <div className="relative mb-20 group">
          {nasaData && !nasaData.error && (
             <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-[80px] rounded-full transform scale-110 transition-all duration-1000" style={{ backgroundImage: `url(${nasaData.url})` }}></div>
          )}
          
          <div className="relative glass-card border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] rounded-3xl overflow-hidden bg-black/60 backdrop-blur-2xl p-1">
            {/* شريط المسح العلوي */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-scanline"></div>

            <div className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Telescope className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-widest uppercase">NASA APOD <span className="hidden sm:inline text-blue-500/50">| ASTRONOMY PICTURE OF THE DAY</span></h2>
                    <p className="text-xs text-blue-400 font-mono">LIVE API UPLINK ESTABLISHED</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full border border-cyan-500/30 flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> LIVE
                </span>
              </div>

              {nasaData && !nasaData.error ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  {/* حاوية الصورة/الفيديو السيبرانية */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors duration-500 bg-black shadow-[0_0_30px_rgba(0,0,0,0.8)] aspect-video">
                    {/* زوايا التصويب المضيئة */}
                    <Crosshair className="absolute top-4 left-4 text-cyan-500/70 z-20 pointer-events-none" size={24} />
                    <Crosshair className="absolute bottom-4 right-4 text-cyan-500/70 z-20 pointer-events-none transform rotate-180" size={24} />
                    
                    {nasaData.media_type === 'video' ? (
                      <iframe src={nasaData.url} title={nasaData.title} className="w-full h-full object-cover relative z-10" allowFullScreen></iframe>
                    ) : (
                      <img src={nasaData.url} alt={nasaData.title} className="w-full h-full object-cover relative z-10 transform transition-transform duration-[10s] group-hover:scale-110" />
                    )}
                  </div>
                  
                  {/* شاشة البيانات الوصفية */}
                  <div className="space-y-5 bg-blue-950/20 p-6 rounded-2xl border border-blue-500/10">
                    <div>
                      <div className="text-cyan-400 text-xs font-mono mb-2 flex items-center gap-2"><Database size={12}/> ENTRY: {nasaData.date}</div>
                      <h3 className="text-3xl font-black text-white leading-tight drop-shadow-md">{nasaData.title}</h3>
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                    <p className="text-gray-300 text-sm leading-[1.9] max-h-56 overflow-y-auto pr-3 custom-scrollbar font-medium">
                      {nasaData.explanation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-blue-400 flex flex-col items-center gap-4">
                  <Loader2 size={40} className="animate-spin text-cyan-500" />
                  <span className="font-mono text-sm tracking-widest uppercase animate-pulse">Establishing connection with NASA mainframes...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar - سطر الأوامر */}
        <div className="max-w-3xl mx-auto mb-16 relative z-20">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-purple-600/20 blur-xl rounded-2xl transition-opacity opacity-0 group-focus-within:opacity-100"></div>
            <div className="relative flex items-center bg-black/50 border border-white/10 group-focus-within:border-purple-500/50 rounded-2xl p-2 backdrop-blur-md shadow-2xl transition-all">
              <div className="pl-4 pr-2 flex items-center pointer-events-none">
                <span className="text-purple-500 font-black text-xl">{'>'}</span>
              </div>
              <input 
                type="text" 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder={isRTL ? "أدخل أمر البحث عن أوراق بحثية أو أخبار الفضاء..." : "QUERY DATABASE: Enter topic, e.g., 'Exoplanets'"} 
                className="w-full bg-transparent border-none text-white placeholder-gray-600 focus:outline-none focus:ring-0 text-sm sm:text-base py-3 px-2 font-mono" 
                dir={isRTL ? 'rtl' : 'ltr'} 
              />
              <button type="submit" disabled={isSearching} className="ml-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold tracking-widest uppercase rounded-xl flex items-center gap-2 disabled:opacity-50 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.4)]">
                {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                <span className="hidden sm:inline">{isSearching ? 'SCANNING...' : 'EXECUTE'}</span>
              </button>
            </div>
          </form> 
        </div>

        {/* Search Results Indicator */}
        {searched && query && (
          <div className="mb-10 flex items-center justify-between glass-card p-4 sm:px-8 border border-purple-500/30 bg-purple-900/10 rounded-2xl">
             <div className="text-purple-300 text-sm font-mono flex items-center gap-3">
               <Zap size={16} className="text-purple-400 animate-pulse"/>
               {isRTL ? `تم العثور على تطابقات لـ: [ ${query} ]` : `MATCHES FOUND FOR QUERY: [ ${query} ]`}
             </div>
             <button onClick={clearSearch} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-1.5 rounded-lg">
               RESET SYSTEM
             </button>
          </div>
        )}

        {/* Live Papers & News Grid - أرشيف البيانات والرادار */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
          
          {/* Latest Open Access Papers - خزانة البيانات */}
          <div className="glass-card p-1 border border-purple-500/20 bg-purple-950/10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none group-hover:bg-purple-500/20 transition-colors"></div>
            <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-[22px] h-full">
              <div className="flex items-center gap-4 mb-8 border-b border-purple-500/20 pb-4">
                <BookOpen size={24} className="text-purple-400" />
                <h2 className="text-xl font-black text-white tracking-widest uppercase">Classified Papers</h2>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-purple-400 font-mono text-sm flex items-center justify-center gap-3 py-10"><Loader2 size={20} className="animate-spin"/> DECRYPTING FILES...</div>
                ) : papersData.length > 0 ? papersData.map((paper, index) => (
                  <div key={index} className="relative p-5 rounded-xl bg-purple-900/10 border border-purple-500/20 hover:border-purple-400/60 hover:bg-purple-900/20 transition-all duration-300 flex flex-col justify-between group/card overflow-hidden">
                    {/* شريط الإضاءة الجانبي */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50 group-hover/card:bg-purple-400 transition-colors"></div>
                    
                    <h3 className="text-white text-sm font-bold mb-4 line-clamp-2 leading-relaxed ml-2">{paper.title}</h3>
                    <div className="flex items-center justify-between ml-2">
                      <span className="text-[10px] font-mono text-purple-300/60 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">PUB: {paper.year || '2026'}</span>
                      <a href={paper.openAccessPdf?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-colors shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                        <Download size={14} /> EXTRACT PDF
                      </a>
                    </div>
                  </div>
                )) : <p className="text-red-400/80 font-mono text-sm py-5 text-center">ERR: NO DATA FOUND IN MAINFRAME.</p>}
              </div>
            </div>
          </div>

          {/* Global Space Agencies News - رادار الأخبار */}
          <div className="glass-card p-1 border border-teal-500/20 bg-teal-950/10 rounded-3xl relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 blur-[60px] pointer-events-none group-hover:bg-teal-500/20 transition-colors"></div>
            <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-[22px] h-full">
               <div className="flex items-center gap-4 mb-8 border-b border-teal-500/20 pb-4">
                <Radar size={24} className="text-teal-400 animate-spin-slow" />
                <h2 className="text-xl font-black text-white tracking-widest uppercase">Live Radar Feed</h2>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="text-teal-400 font-mono text-sm flex items-center justify-center gap-3 py-10"><Loader2 size={20} className="animate-spin"/> SCANNING FREQUENCIES...</div>
                ) : newsData.length > 0 ? newsData.map((news, index) => (
                  <div key={index} className="p-4 rounded-xl bg-teal-900/10 border border-teal-500/20 flex gap-5 hover:border-teal-400/60 hover:bg-teal-900/20 transition-all duration-300 group/news">
                    <div className="relative shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-teal-500/30">
                      <div className="absolute inset-0 bg-teal-500/20 mix-blend-overlay z-10 group-hover/news:opacity-0 transition-opacity"></div>
                      <img src={news.image_url} alt={news.title} className="w-full h-full object-cover filter grayscale group-hover/news:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex flex-col justify-between w-full py-1">
                      <h3 className="text-white text-sm font-bold line-clamp-2 leading-relaxed">{news.title}</h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-teal-400 font-mono tracking-widest uppercase border border-teal-500/30 px-2 py-1 rounded bg-teal-950/50">SRC: {news.news_site}</span>
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-400 hover:text-teal-300 flex items-center gap-1 transition-colors">
                          UPLINK <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                )) : <p className="text-red-400/80 font-mono text-sm py-5 text-center">ERR: NO SIGNALS DETECTED.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Agency Sources - تصاريح الوكالات */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 flex items-center gap-2"><Shield className="text-blue-500/50" size={16}/> AUTHORIZED DATA SOURCES</h2>
            <div className="h-px bg-gradient-to-r from-gray-800 to-transparent flex-1"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {agencies.map(agency => (
              <div key={agency.name} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group cursor-default overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity blur-xl rounded-full" style={{ backgroundColor: agency.color }}></div>
                <div className="text-3xl font-black tracking-widest mb-2 drop-shadow-md transition-colors" style={{ color: agency.color }}>
                  {agency.name}
                </div>
                <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase leading-snug">{agency.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Research Areas - اللوحات البحثية */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 flex items-center gap-2"><Atom className="text-purple-500/50" size={16}/> FOCUS PROTOCOLS</h2>
            <div className="h-px bg-gradient-to-r from-gray-800 to-transparent flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredAreas.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 flex flex-col gap-4 border border-white/5 hover:border-purple-500/40 hover:bg-purple-900/10 transition-all duration-300 group rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                  <Icon size={22} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <div>
                  <div className="text-white text-base font-bold mb-2 tracking-wide">{title}</div>
                  <div className="text-gray-400 text-xs leading-relaxed font-medium">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// Dummy icon to fix missing import error without breaking lucide
const Shield = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
