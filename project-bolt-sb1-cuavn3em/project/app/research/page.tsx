'use client';

import React, { useState, useEffect } from 'react';
import { Search, Telescope, Globe, Satellite, FlaskConical, Atom, Star, ExternalLink, BookOpen, Download, Loader2, Crosshair, Activity, Database, Radar, Zap, Shield, Skull, Map, Users, Navigation, Earth, Lock, Video } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function ResearchPage() {
  const { t, isRTL } = useLang();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  
  // Data States
  const [nasaData, setNasaData] = useState<any>(null);
  const [earthData, setEarthData] = useState<any>(null);
  const [papersData, setPapersData] = useState<any[]>([]);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [asteroidsData, setAsteroidsData] = useState<any[]>([]);
  const [issData, setIssData] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // جلب البيانات الأولية باللغة الإنجليزية
    fetch('/api/nasa', { cache: 'no-store' }).then(res => res.json()).then(data => setNasaData(data)).catch(console.error);
    fetch('/api/earth').then(res => res.json()).then(data => setEarthData(data)).catch(console.error);
    fetch('/api/asteroids').then(res => res.json()).then(data => setAsteroidsData(data.error ? [] : data)).catch(console.error);

    const fetchISS = () => fetch('/api/iss').then(res => res.json()).then(data => setIssData(data.error ? null : data)).catch(console.error);
    fetchISS();
    const issInterval = setInterval(fetchISS, 5000);

    fetchLiveFeed('');

    return () => clearInterval(issInterval);
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

  useEffect(() => {
    if (isRTL && !isTranslating) {
      const translateEverything = async () => {
        setIsTranslating(true);
        
        // ترجمة وكالة ناسا APOD
        if (nasaData && !nasaData.ar_title && !nasaData.error) {
          const res = await fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: [nasaData.title, nasaData.explanation], target: 'ar' }) }).then(r=>r.json());
          if (res.translatedText) setNasaData((prev: any) => ({ ...prev, ar_title: res.translatedText[0], ar_explanation: res.translatedText[1] }));
        }

        // ترجمة صورة الأرض
        if (earthData && !earthData.ar_caption && !earthData.error) {
           const res = await fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: earthData.caption, target: 'ar' }) }).then(r=>r.json());
           if (res.translatedText) setEarthData((prev: any) => ({ ...prev, ar_caption: res.translatedText }));
        }

        // ترجمة الأوراق البحثية
        if (papersData.length > 0 && !papersData[0].ar_title) {
           const titles = papersData.map(p => p.title);
           const res = await fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: titles, target: 'ar' }) }).then(r=>r.json());
           if (res.translatedText) setPapersData(prev => prev.map((p, i) => ({ ...p, ar_title: res.translatedText[i] })));
        }

        // ترجمة أخبار الفضاء
        if (newsData.length > 0 && !newsData[0].ar_title) {
           const titles = newsData.map(n => n.title);
           const res = await fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: titles, target: 'ar' }) }).then(r=>r.json());
           if (res.translatedText) setNewsData(prev => prev.map((n, i) => ({ ...n, ar_title: res.translatedText[i] })));
        }

        setIsTranslating(false);
      };
      translateEverything();
    }
  }, [isRTL, nasaData, earthData, papersData, newsData, isTranslating]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      setSearched(true);
      fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: query.trim(), target: 'en' }) })
        .then(res => res.json())
        .then(data => fetchLiveFeed(data.translatedText || query.trim()))
        .catch(() => fetchLiveFeed(query.trim()));
    }
  }

  function clearSearch() {
    setQuery('');
    setSearched(false);
    fetchLiveFeed('');
  }

  return (
    <div className="page-section relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes radar-spin { 100% { transform: rotate(360deg); } }
        .animate-radar { animation: radar-spin 4s linear infinite; }
        @keyframes scan-vertical { 0% { transform: translateY(-100%); } 100% { transform: translateY(1000%); } }
        .animate-scan-vert { animation: scan-vertical 3s linear infinite; }
        .matrix-glow { text-shadow: 0 0 8px rgba(34,211,238,0.8); }
      `}} />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-sm">
            <Activity size={14} className="text-blue-400 animate-pulse" />
            <span className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase">
              {t('nav_research')}
            </span>
            {isTranslating && <Loader2 size={12} className="animate-spin text-purple-400" />}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-600 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] mb-4">
            {t('research_title')}
          </h1>
          <p className="text-blue-200/60 max-w-2xl mx-auto text-sm sm:text-base tracking-wide font-medium">{t('research_subtitle')}</p>
        </div>

        {/* TOP SATELLITE TIER (EARTH & ISS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* LIVE EARTH ORBITAL STREAM PANEL (التحفة الإبداعية الجديدة) */}
          <div className="relative glass-card border border-emerald-500/30 bg-black/60 rounded-3xl overflow-hidden p-1 flex flex-col group backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <div className="absolute inset-0 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/15 transition-colors duration-700"></div>

            <div className="p-5 sm:p-8 flex flex-col h-full relative z-10">
              <div className="flex items-center justify-between mb-6 border-b border-emerald-500/20 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500">
                    <Earth className="text-emerald-400 animate-[spin_10s_linear_infinite]" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                      {isRTL ? 'عين على الأرض' : 'EYE ON EARTH'}
                    </h2>
                    <p className="text-[10px] text-emerald-400/80 font-mono tracking-widest uppercase mt-1">{isRTL ? 'بث الفضاء العميق (ISS)' : 'DEEP SPACE FEED (ISS)'}</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-[10px] sm:text-xs bg-red-500/10 text-red-400 border border-red-500/40 px-3 py-1.5 rounded-lg font-black tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                  <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
                  <span className="hidden sm:inline">{isRTL ? 'بث مباشر' : 'LIVE UPLINK'}</span>
                  <span className="sm:hidden">LIVE</span>
                </span>
              </div>

              {/* شاشة البث الحي السيبرانية */}
              <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-emerald-500/40 aspect-video bg-black shadow-[inset_0_0_40px_rgba(16,185,129,0.2)] group/screen">
                 {/* Cybernetic HUD Overlays */}
                 <Crosshair className="absolute top-4 left-4 text-emerald-400/60 z-20 pointer-events-none animate-pulse" size={24} />
                 <Crosshair className="absolute bottom-4 right-4 text-emerald-400/60 z-20 pointer-events-none transform rotate-180 animate-pulse" size={24} />
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-400/50 opacity-40 animate-scan-vert z-20 pointer-events-none shadow-[0_0_15px_rgba(16,185,129,1)]"></div>
                 
                 {/* تأثير التشويش السيبراني الخفيف */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-20 pointer-events-none"></div>

                 {/* البث الحي الفعلي من محطة الفضاء الدولية */}
                 <iframe
                   className="absolute inset-0 w-full h-full pointer-events-auto z-10"
                   src="https://www.youtube.com/embed/xRPjKQtRXR8?autoplay=1&mute=1&controls=0&modestbranding=1"
                   title="NASA ISS Live Stream"
                   frameBorder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 ></iframe>

                 {/* بيانات التكتيك الفضائي */}
                 <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                   <div className="bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg border border-emerald-500/40 text-emerald-400 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase flex flex-col gap-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                     <span className="flex items-center gap-2"><Video size={12} className="text-white"/> ISS HDEV CAM 01</span>
                     <span className="text-white border-t border-emerald-500/30 pt-1">ALT: ~408 KM | SPD: 27,600 KM/H</span>
                   </div>
                 </div>
                 
                 {/* مؤشر التسجيل */}
                 <div className="absolute top-4 right-4 z-20 pointer-events-none">
                   <span className="text-red-500 font-mono text-[10px] sm:text-xs font-bold tracking-widest flex items-center gap-1 drop-shadow-[0_0_5px_red]">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-1"></span> REC
                   </span>
                 </div>
              </div>

              {/* شريط حالة التشفير أسفل الشاشة */}
              <div className="mt-5 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Lock size={12}/> {isRTL ? 'تشفير كمي 256-BIT' : '256-BIT ENCRYPTION'}</span>
                <span className="flex items-center gap-1.5"><Activity size={12} className="animate-pulse text-emerald-400"/> {isRTL ? 'إشارة مستقرة' : 'STABLE SIGNAL'}</span>
              </div>
            </div>
          </div>

          {/* ISS Tracker Panel */}
          <div className="relative glass-card border border-cyan-500/30 bg-cyan-950/20 rounded-3xl overflow-hidden p-6 sm:p-8 backdrop-blur-md">
            <div className="absolute inset-0 bg-cyan-500/5 blur-[50px]"></div>
            <div className="absolute top-0 left-1/2 w-full h-[1px] bg-cyan-400/50 animate-scan-vert opacity-50"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Satellite className="text-cyan-400 animate-bounce" size={24} />
                  <h2 className="text-lg font-black text-white tracking-widest uppercase">
                    {isRTL ? 'القياسات المدارية (ISS)' : 'ISS ORBITAL TELEMETRY'}
                  </h2>
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded font-mono animate-pulse">
                  {isRTL ? 'تزامن حي' : 'LIVE SYNC'}
                </span>
              </div>
              
              {issData ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/50 border border-cyan-500/20 p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-cyan-500/70 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Map size={12}/> {isRTL ? 'خط العرض' : 'LATITUDE'}</span>
                    <span className="text-white text-xl sm:text-2xl font-mono matrix-glow">{parseFloat(issData.latitude).toFixed(4)}°</span>
                  </div>
                  <div className="bg-black/50 border border-cyan-500/20 p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-cyan-500/70 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Navigation size={12}/> {isRTL ? 'خط الطول' : 'LONGITUDE'}</span>
                    <span className="text-white text-xl sm:text-2xl font-mono matrix-glow">{parseFloat(issData.longitude).toFixed(4)}°</span>
                  </div>
                  <div className="bg-black/50 border border-cyan-500/20 p-4 rounded-xl flex flex-col gap-1 col-span-2">
                    <span className="text-cyan-500/70 text-xs font-bold tracking-widest uppercase flex items-center gap-2"><Users size={12}/> {isRTL ? 'الطاقم الحالي' : 'CREW ONBOARD'}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-cyan-400">{issData.crewInSpace}</span>
                      <span className="text-gray-400 text-xs">{isRTL ? 'رواد فضاء متواجدون في الفضاء الآن' : 'ASTRONAUTS CURRENTLY IN SPACE'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-cyan-500/50 font-mono text-sm py-10 gap-3">
                  <Loader2 className="animate-spin" size={30}/> 
                  {isRTL ? 'جاري تحديد موقع المحطة...' : 'LOCATING STATION...'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* APOD & Asteroids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Asteroid NEO Radar */}
          <div className="relative glass-card border border-red-500/30 bg-red-950/20 rounded-3xl overflow-hidden p-6 lg:col-span-1 flex flex-col backdrop-blur-md">
             <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-red-500/20"></div>
             <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-red-500/30"></div>
             <div className="absolute top-[30%] left-1/2 origin-bottom -translate-x-1/2 -translate-y-full w-[1px] h-32 bg-gradient-to-t from-red-500 to-transparent animate-radar opacity-70">
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-red-500/20 to-transparent transform -skew-x-[30deg] origin-bottom-left"></div>
             </div>

            <div className="relative z-10 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Radar className="text-red-400" size={20} />
                  <h2 className="text-sm sm:text-base font-black text-white tracking-widest uppercase">
                    {isRTL ? 'رادار (NEO)' : 'NEO RADAR'}
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {asteroidsData.length > 0 ? asteroidsData.map((ast, i) => (
                  <div key={i} className="bg-black/60 border border-red-500/20 p-3 rounded-lg flex items-center justify-between hover:border-red-500/50 transition-colors backdrop-blur-sm">
                    <div>
                      <div className="text-white font-bold text-xs flex items-center gap-2">
                        {ast.name}
                        {ast.isHazardous ? <Skull size={10} className="text-red-500 animate-pulse"/> : <Shield size={10} className="text-green-500"/>}
                      </div>
                      <div className="text-gray-400 text-[10px] font-mono mt-1">
                         {ast.speed} km/s | ~{ast.size}m
                      </div>
                    </div>
                    <div className="text-right">
                       <div className={`text-[9px] font-black tracking-widest uppercase ${ast.isHazardous ? 'text-red-500' : 'text-green-500'}`}>
                         {ast.isHazardous ? (isRTL ? 'خطر' : 'HAZARD') : (isRTL ? 'آمن' : 'SAFE')}
                       </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-red-500/50 font-mono text-xs text-center py-10"><Loader2 className="animate-spin inline mr-2"/> {isRTL ? 'مسح القطاع...' : 'SCANNING...'}</div>
                )}
              </div>
            </div>
          </div>

          {/* NASA APOD Feed */}
          <div className="relative glass-card border border-blue-500/30 bg-black/60 rounded-3xl overflow-hidden p-1 lg:col-span-2 group backdrop-blur-md">
            {nasaData && !nasaData.error && (
               <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-[80px] rounded-full transform scale-110 transition-all duration-1000" style={{ backgroundImage: `url(${nasaData.url})` }}></div>
            )}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
            
            <div className="p-6 h-full flex flex-col relative z-10">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Telescope className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-widest uppercase">
                      {isRTL ? 'مرصد الفضاء العميق' : 'DEEP SPACE OBSERVATORY'} <span className="hidden sm:inline text-blue-500/50">| APOD</span>
                    </h2>
                    <p className="text-[10px] text-blue-400 font-mono">{isRTL ? 'اتصال آمن' : 'SECURE UPLINK'}</p>
                  </div>
                </div>
              </div>

              {nasaData && !nasaData.error ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start h-full">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors bg-black aspect-video w-full">
                    <Crosshair className="absolute top-2 left-2 text-cyan-500/70 z-20 pointer-events-none" size={20} />
                    <Crosshair className="absolute bottom-2 right-2 text-cyan-500/70 z-20 pointer-events-none transform rotate-180" size={20} />
                    {nasaData.media_type === 'video' ? (
                      <iframe src={nasaData.url} title={nasaData.title} className="w-full h-full object-cover relative z-10" allowFullScreen></iframe>
                    ) : (
                      <img src={nasaData.url} alt={nasaData.title} className="w-full h-full object-cover relative z-10 transform group-hover:scale-105 transition-transform duration-[10s]" />
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-cyan-400 text-[10px] font-mono mb-1 flex items-center gap-2"><Database size={10}/> {isRTL ? 'سجل:' : 'LOG:'} {nasaData.date}</div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {isRTL && nasaData.ar_title ? nasaData.ar_title : nasaData.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-xs leading-[2] max-h-40 overflow-y-auto pr-2 custom-scrollbar font-medium">
                      {isRTL && nasaData.ar_explanation ? nasaData.ar_explanation : nasaData.explanation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-blue-400 gap-4 py-10">
                  <Loader2 size={30} className="animate-spin text-cyan-500" />
                  <span className="font-mono text-xs tracking-widest uppercase">{isRTL ? 'تحميل...' : 'LOADING...'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar - Cyber Terminal */}
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
                placeholder={isRTL ? "أدخل أمر البحث عن أوراق بحثية أو أخبار..." : "QUERY GLOBAL DATABASE: Enter topic..."} 
                className="w-full bg-transparent border-none text-white placeholder-gray-600 focus:outline-none focus:ring-0 text-sm sm:text-base py-3 px-2 font-mono" 
                dir={isRTL ? 'rtl' : 'ltr'} 
              />
              <button type="submit" disabled={isSearching} className="ml-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold tracking-widest uppercase rounded-xl flex items-center gap-2 disabled:opacity-50 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.4)]">
                {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                <span className="hidden sm:inline">{isSearching ? (isRTL ? 'فك تشفير...' : 'DECRYPTING...') : (isRTL ? 'تأكيد' : 'EXECUTE')}</span>
              </button>
            </div>
          </form> 
        </div>

        {/* Search Results Indicator */}
        {searched && query && (
          <div className="mb-10 flex items-center justify-between glass-card p-4 sm:px-8 border border-purple-500/30 bg-purple-900/10 rounded-2xl backdrop-blur-md">
             <div className="text-purple-300 text-sm font-mono flex items-center gap-3">
               <Zap size={16} className="text-purple-400 animate-pulse"/>
               {isRTL ? `تطابقات لـ: [ ${query} ]` : `MATCHES FOR: [ ${query} ]`}
             </div>
             <button onClick={clearSearch} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-1.5 rounded-lg">
               {isRTL ? 'إعادة ضبط' : 'RESET'}
             </button>
          </div>
        )}

        {/* Live Papers & News Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20 relative z-20">
          
          {/* Papers Vault */}
          <div className="glass-card p-1 border border-purple-500/20 bg-purple-950/10 rounded-3xl relative overflow-hidden group backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none group-hover:bg-purple-500/20 transition-colors"></div>
            <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-[22px] h-full">
              <div className="flex items-center gap-4 mb-8 border-b border-purple-500/20 pb-4">
                <BookOpen size={24} className="text-purple-400" />
                <h2 className="text-xl font-black text-white tracking-widest uppercase">
                  {isRTL ? 'أوراق بحثية مصنفة' : 'Classified Papers'}
                </h2>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-purple-400 font-mono text-sm flex items-center justify-center gap-3 py-10"><Loader2 size={20} className="animate-spin"/> {isRTL ? 'جاري فك التشفير...' : 'DECRYPTING...'}</div>
                ) : papersData.length > 0 ? papersData.map((paper, index) => (
                  <div key={index} className="relative p-5 rounded-xl bg-purple-900/10 border border-purple-500/20 hover:border-purple-400/60 hover:bg-purple-900/20 transition-all duration-300 flex flex-col justify-between group/card overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50 group-hover/card:bg-purple-400 transition-colors"></div>
                    <h3 className="text-white text-sm font-bold mb-4 line-clamp-2 leading-relaxed ml-2">
                      {isRTL && paper.ar_title ? paper.ar_title : paper.title}
                    </h3>
                    <div className="flex items-center justify-between ml-2">
                      <span className="text-[10px] font-mono text-purple-300/60 uppercase tracking-widest bg-black/50 px-2 py-1 rounded">
                        {isRTL ? 'نشر:' : 'PUB:'} {paper.year || '2026'}
                      </span>
                      <a href={paper.openAccessPdf?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-colors shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                        <Download size={14} /> {isRTL ? 'استخراج' : 'EXTRACT'}
                      </a>
                    </div>
                  </div>
                )) : <p className="text-red-400/80 font-mono text-sm py-5 text-center">{isRTL ? 'لا توجد بيانات.' : 'NO DATA.'}</p>}
              </div>
            </div>
          </div>

          {/* News Radar */}
          <div className="glass-card p-1 border border-teal-500/20 bg-teal-950/10 rounded-3xl relative overflow-hidden group backdrop-blur-md">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 blur-[60px] pointer-events-none group-hover:bg-teal-500/20 transition-colors"></div>
            <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-[22px] h-full">
               <div className="flex items-center gap-4 mb-8 border-b border-teal-500/20 pb-4">
                <Globe size={24} className="text-teal-400 animate-pulse" />
                <h2 className="text-xl font-black text-white tracking-widest uppercase">
                  {isRTL ? 'إشارات البث العالمي' : 'Global Transmissions'}
                </h2>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-teal-400 font-mono text-sm flex items-center justify-center gap-3 py-10"><Loader2 size={20} className="animate-spin"/> {isRTL ? 'اعتراض الإشارات...' : 'INTERCEPTING...'}</div>
                ) : newsData.length > 0 ? newsData.map((news, index) => (
                  <div key={index} className="p-4 rounded-xl bg-teal-900/10 border border-teal-500/20 flex gap-5 hover:border-teal-400/60 hover:bg-teal-900/20 transition-all duration-300 group/news">
                    <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-teal-500/30 hidden sm:block">
                      <div className="absolute inset-0 bg-teal-500/20 mix-blend-overlay z-10 group-hover/news:opacity-0 transition-opacity"></div>
                      <img src={news.image_url} alt={news.title} className="w-full h-full object-cover filter grayscale group-hover/news:grayscale-0 transition-all" />
                    </div>
                    <div className="flex flex-col justify-between w-full py-1">
                      <h3 className="text-white text-sm font-bold line-clamp-2 leading-relaxed">
                        {isRTL && news.ar_title ? news.ar_title : news.title}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-teal-400 font-mono tracking-widest uppercase border border-teal-500/30 px-2 py-1 rounded bg-teal-950/50">
                          {isRTL ? 'المصدر:' : 'SRC:'} {news.news_site}
                        </span>
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-400 hover:text-teal-300 flex items-center gap-1 transition-colors">
                          {isRTL ? 'اتصال' : 'UPLINK'} <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                )) : <p className="text-red-400/80 font-mono text-sm py-5 text-center">{isRTL ? 'لا توجد إشارات.' : 'NO SIGNALS.'}</p>}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
