'use client';

import React, { useState, useEffect } from 'react';
import { Search, Telescope, Globe, Satellite, FlaskConical, Atom, Star, ExternalLink, BookOpen, Download, Loader2, Crosshair, Activity, Database, Radar, Zap, Shield, Skull, Map, Users, Navigation, Earth, Lock, Video, Clock, RefreshCcw, Sparkles, Cpu } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

// خزنة الأرض: فيديوهات 4K عالية الدقة ومذهلة للأرض بدون واجهة
const EARTH_VAULT = [
  "86YLFOog4GM", // NASA Earth From Space 4K
  "X0m3z3T7aKA", // ISS Live Loop 1
  "21X5lGlDOfg"  // ISS Live Loop 2
];

// خزنة الفضاء العميق: فيديوهات حيوية جداً وممتلئة بالألوان (لا يوجد سواد كئيب)
const DEEP_SPACE_VAULT = [
  "Un5SEJ8MyPc", // جيمس ويب - ألوان خارقة
  "17jymDn0W6U", // سديم الجبار 3D - ألوان نابضة
  "rQcRNzeX40M", // أعمدة الخلق - حيوية جداً
  "W1AEEB8o5j0"  // سديم كارينا - ألوان نارية
];

export default function ResearchPage() {
  const { t, isRTL } = useLang();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  
  const [nasaData, setNasaData] = useState<any>(null);
  const [earthData, setEarthData] = useState<any>(null);
  const [papersData, setPapersData] = useState<any[]>([]);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [asteroidsData, setAsteroidsData] = useState<any[]>([]);
  const [issData, setIssData] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // === خوارزمية المحاكاة المدارية ===
  const [orbitPhase, setOrbitPhase] = useState<'EARTH' | 'DEEP_SPACE'>('EARTH');
  const [cycleCountdown, setCycleCountdown] = useState(2700); 
  const [currentVideoId, setCurrentVideoId] = useState('');
  const [earthPool, setEarthPool] = useState([...EARTH_VAULT]);
  const [spacePool, setSpacePool] = useState([...DEEP_SPACE_VAULT]);
  
  // حالة شاشة الانتقال
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState('');

  // دالة بناء الرابط المحصن ضد الإعلانات والمقترحات والتحكم
  const getSafeYoutubeUrl = (id: string) => {
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${id}`;
  };

  const triggerTransition = (phase: 'EARTH' | 'DEEP_SPACE', newVideoId: string) => {
    setIsTransitioning(true);
    setTransitionMsg(phase === 'EARTH' ? (isRTL ? 'جاري استعادة مدار الأرض...' : 'RE-ESTABLISHING EARTH ORBIT...') : (isRTL ? 'توجيه التلسكوب للفضاء العميق...' : 'ALIGNING DEEP SPACE TELESCOPE...'));
    
    setTimeout(() => {
      setCurrentVideoId(newVideoId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1500); // إبقاء شاشة الانتقال قليلاً بعد تغيير الفيديو
    }, 2000); // مدة التظليل قبل تغيير المصدر
  };

  const pickNextVideo = (phase: 'EARTH' | 'DEEP_SPACE') => {
    let newVideoId = '';
    if (phase === 'EARTH') {
      let pool = earthPool.length > 0 ? earthPool : [...EARTH_VAULT];
      const idx = Math.floor(Math.random() * pool.length);
      newVideoId = pool[idx];
      pool.splice(idx, 1);
      setEarthPool(pool);
    } else {
      let pool = spacePool.length > 0 ? spacePool : [...DEEP_SPACE_VAULT];
      const idx = Math.floor(Math.random() * pool.length);
      newVideoId = pool[idx];
      pool.splice(idx, 1);
      setSpacePool(pool);
    }
    triggerTransition(phase, newVideoId);
  };

  useEffect(() => {
    // تشغيل فوري بدون تأخير عند التحميل
    let pool = [...EARTH_VAULT];
    const idx = Math.floor(Math.random() * pool.length);
    const initialVid = pool[idx];
    pool.splice(idx, 1);
    setEarthPool(pool);
    setCurrentVideoId(initialVid);
  }, []);

  useEffect(() => {
    const updateCycle = () => {
       const now = Math.floor(Date.now() / 1000);
       const orbitTime = now % 5400; 
       if (orbitTime < 2700) {
          if (orbitPhase !== 'EARTH') {
            setOrbitPhase('EARTH');
            pickNextVideo('EARTH');
          }
          setCycleCountdown(2700 - orbitTime);
       } else {
          if (orbitPhase !== 'DEEP_SPACE') {
              setOrbitPhase('DEEP_SPACE');
              pickNextVideo('DEEP_SPACE');
          }
          setCycleCountdown(5400 - orbitTime);
       }
    };
    const interval = setInterval(updateCycle, 1000);
    return () => clearInterval(interval);
  }, [orbitPhase]);

  const forceTogglePhase = () => {
    const nextPhase = orbitPhase === 'EARTH' ? 'DEEP_SPACE' : 'EARTH';
    setOrbitPhase(nextPhase);
    pickNextVideo(nextPhase);
    setCycleCountdown(2700);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
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
        if (nasaData && !nasaData.ar_title && !nasaData.error) {
          const res = await fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: [nasaData.title, nasaData.explanation], target: 'ar' }) }).then(r=>r.json());
          if (res.translatedText) setNasaData((prev: any) => ({ ...prev, ar_title: res.translatedText[0], ar_explanation: res.translatedText[1] }));
        }
        if (earthData && !earthData.ar_caption && !earthData.error) {
           const res = await fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: earthData.caption, target: 'ar' }) }).then(r=>r.json());
           if (res.translatedText) setEarthData((prev: any) => ({ ...prev, ar_caption: res.translatedText }));
        }
        if (papersData.length > 0 && !papersData[0].ar_title) {
           const titles = papersData.map(p => p.title);
           const res = await fetch('/api/translate', { method: 'POST', body: JSON.stringify({ text: titles, target: 'ar' }) }).then(r=>r.json());
           if (res.translatedText) setPapersData(prev => prev.map((p, i) => ({ ...p, ar_title: res.translatedText[i] })));
        }
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

  const isEarth = orbitPhase === 'EARTH';

  return (
    <div className="page-section relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes radar-spin { 100% { transform: rotate(360deg); } }
        .animate-radar { animation: radar-spin 4s linear infinite; }
        @keyframes scan-vertical { 0% { transform: translateY(-100%); } 100% { transform: translateY(1000%); } }
        .animate-scan-vert { animation: scan-vertical 3s linear infinite; }
        .matrix-glow { text-shadow: 0 0 10px rgba(34,211,238,0.9); }
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

        {/* TIER 1: THE DYNAMIC ORBITAL BROADCAST SYSTEM (DOBS) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 mb-12">
          
          {/* MAIN PANEL: DYNAMIC YOUTUBE BLOCKER VIDEO */}
          <div className={`xl:col-span-8 relative glass-card border bg-black/60 rounded-[30px] overflow-hidden p-1 flex flex-col group backdrop-blur-xl transition-all duration-1000 ${isEarth ? 'border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]' : 'border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)]'} h-full`}>
            <div className={`absolute inset-0 blur-[50px] transition-colors duration-1000 ${isEarth ? 'bg-emerald-500/5 group-hover:bg-emerald-500/15' : 'bg-purple-500/5 group-hover:bg-purple-500/15'}`}></div>

            <div className="p-4 sm:p-8 flex flex-col h-full relative z-10">
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4 transition-colors duration-1000 ${isEarth ? 'border-emerald-500/20' : 'border-purple-500/20'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-all duration-1000 ${isEarth ? 'bg-emerald-950/60 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-purple-950/60 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)]'}`}>
                    {isEarth ? <Earth className="text-emerald-400 animate-[spin_10s_linear_infinite]" size={24} /> : <Sparkles className="text-purple-400 animate-pulse" size={24} />}
                  </div>
                  <div>
                    <h2 className={`text-xl sm:text-2xl font-black tracking-widest uppercase transition-colors duration-1000 ${isEarth ? 'text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`}>
                      {isEarth ? (isRTL ? 'عين على الأرض' : 'EYE ON EARTH') : (isRTL ? 'استكشاف الفضاء العميق' : 'DEEP SPACE EXPLORATION')}
                    </h2>
                    <p className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase mt-1 transition-colors duration-1000 ${isEarth ? 'text-emerald-400/80' : 'text-purple-400/80'}`}>
                      {isEarth ? (isRTL ? 'الطور الأول: مدار الأرض المباشر (4K)' : 'PHASE 1: LIVE EARTH ORBIT (4K)') : (isRTL ? 'الطور الثاني: استكشاف السدم والمجرات' : 'PHASE 2: NEBULA & GALAXY SCAN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={forceTogglePhase} disabled={isTransitioning} title={isRTL ? "تخطي المدار" : "Force Phase Toggle"} className={`p-2 rounded-lg border transition-all hover:scale-110 disabled:opacity-50 ${isEarth ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/20'}`}>
                     <RefreshCcw size={14} className={isTransitioning ? 'animate-spin' : (orbitPhase === 'DEEP_SPACE' ? 'animate-spin-slow' : '')} />
                  </button>
                  <span className={`flex items-center gap-2 text-[10px] sm:text-xs px-4 py-2 rounded-lg font-black tracking-widest uppercase shadow-lg transition-all duration-1000 ${isEarth ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-purple-500/10 text-purple-400 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'}`}>
                    <Clock size={12} className="animate-pulse" />
                    <span>{formatTime(cycleCountdown)}</span>
                  </span>
                </div>
              </div>

              {/* شاشة البث المحصنة بالكامل */}
              <div className={`relative w-full flex-1 rounded-2xl overflow-hidden border aspect-video bg-black transition-all duration-1000 group/screen ${isEarth ? 'border-emerald-500/40 shadow-[inset_0_0_50px_rgba(16,185,129,0.2)]' : 'border-purple-500/40 shadow-[inset_0_0_50px_rgba(168,85,247,0.2)]'}`}>
                 
                 {/* طبقة الحماية القصوى: تمنع أي نقرة أو تفاعل مع اليوتيوب (لا إيقاف، لا شعارات، لا اقتراحات) */}
                 <div className="absolute inset-0 z-40 pointer-events-auto bg-transparent"></div>

                 <Crosshair className={`absolute top-4 left-4 z-50 pointer-events-none animate-pulse transition-colors duration-1000 ${isEarth ? 'text-emerald-400/60' : 'text-purple-400/60'}`} size={28} />
                 <Crosshair className={`absolute bottom-4 right-4 z-50 pointer-events-none transform rotate-180 animate-pulse transition-colors duration-1000 ${isEarth ? 'text-emerald-400/60' : 'text-purple-400/60'}`} size={28} />
                 <div className={`absolute top-0 left-0 w-full h-[2px] opacity-40 animate-scan-vert z-50 pointer-events-none transition-all duration-1000 ${isEarth ? 'bg-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,1)]' : 'bg-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,1)]'}`}></div>
                 
                 {/* التظليل السينمائي المدمج لدمج الأطراف */}
                 <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>

                 {/* شاشة الانتقال الهولوغرامية (Warp Transition) */}
                 <div className={`absolute inset-0 z-45 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-700 ${isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <Cpu size={50} className={`mb-6 animate-pulse ${isEarth ? 'text-emerald-500' : 'text-purple-500'}`} />
                    <div className="text-white text-lg sm:text-2xl font-black tracking-[0.3em] uppercase mb-2 animate-pulse">{transitionMsg}</div>
                    <div className={`text-xs font-mono tracking-widest ${isEarth ? 'text-emerald-400/70' : 'text-purple-400/70'}`}>
                      {isRTL ? 'تشفير وبرمجة المسار المداري...' : 'ENCRYPTING ORBITAL PATHWAY...'}
                    </div>
                 </div>

                 {/* مشغل الإطار المحصن بالكامل - مقطع بعيد لمنع ظهور الشعارات */}
                 {currentVideoId && (
                   <iframe
                     className="absolute inset-0 w-full h-full pointer-events-none z-10 transform scale-[1.15]" 
                     src={getSafeYoutubeUrl(currentVideoId)}
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                 )}

                 <div className="absolute bottom-4 left-4 z-50 pointer-events-none">
                   <div className={`bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-lg border text-[10px] sm:text-xs font-mono tracking-widest uppercase flex flex-col gap-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-1000 ${isEarth ? 'border-emerald-500/40 text-emerald-400' : 'border-purple-500/40 text-purple-400'}`}>
                     <span className="flex items-center gap-2">
                       <Video size={14} className="text-white animate-pulse"/> 
                       {isEarth ? 'ESA ORBITAL CAMERA [ACTIVE]' : 'HUBBLE/WEB TELESCOPE [ACTIVE]'}
                     </span>
                     <span className={`text-white border-t pt-1.5 transition-colors duration-1000 ${isEarth ? 'border-emerald-500/30' : 'border-purple-500/30'}`}>
                       {isEarth ? 'ALT: ~408 KM | V: 27,600 KM/H' : 'LOC: DEEP GALAXY | LIGHTYEARS AWAY'}
                     </span>
                   </div>
                 </div>
                 
                 <div className="absolute top-4 right-4 z-50 pointer-events-none">
                   <span className={`font-mono text-xs sm:text-sm font-bold tracking-widest flex items-center gap-2 transition-all duration-1000 ${isEarth ? 'text-emerald-500 drop-shadow-[0_0_8px_#10b981]' : 'text-purple-500 drop-shadow-[0_0_8px_#a855f7]'}`}>
                     <span className={`w-2.5 h-2.5 rounded-full animate-ping mr-1 transition-colors duration-1000 ${isEarth ? 'bg-emerald-500' : 'bg-purple-500'}`}></span> 
                     {isEarth ? 'ON-AIR' : 'SCANNING'}
                   </span>
                 </div>
              </div>

              <div className={`mt-5 flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-colors duration-1000 ${isEarth ? 'text-emerald-400/60' : 'text-purple-400/60'}`}>
                <span className="flex items-center gap-1.5"><Lock size={14}/> {isRTL ? 'حماية من الاقتراحات والإعلانات' : 'AD-FREE PROTECTED SHIELD'}</span>
                <span className="flex items-center gap-1.5"><Activity size={14} className="animate-pulse"/> {isRTL ? 'عدم تكرار تلقائي' : 'ANTI-REPEAT ACTIVE'}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: ISS & NEO */}
          <div className="xl:col-span-4 flex flex-col gap-6 sm:gap-8 h-full">
            
            {/* ISS Tracker Panel */}
            <div className="relative glass-card border border-cyan-500/30 bg-cyan-950/20 rounded-[30px] overflow-hidden p-5 sm:p-6 backdrop-blur-md flex-1 flex flex-col">
              <div className="absolute inset-0 bg-cyan-500/5 blur-[50px]"></div>
              <div className="absolute top-0 left-1/2 w-full h-[1px] bg-cyan-400/50 animate-scan-vert opacity-50"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 border-b border-cyan-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Satellite className="text-cyan-400 animate-bounce" size={20} />
                    <h2 className="text-sm sm:text-base font-black text-white tracking-widest uppercase">
                      {isRTL ? 'إحداثيات (ISS)' : 'ISS TELEMETRY'}
                    </h2>
                  </div>
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-1 rounded font-mono animate-pulse">
                    {isRTL ? 'حي' : 'LIVE'}
                  </span>
                </div>
                
                {issData ? (
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <div className="bg-black/60 border border-cyan-500/20 p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-cyan-500/70 text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5"><Map size={10}/> {isRTL ? 'خط العرض' : 'LAT'}</span>
                      <span className="text-white text-lg sm:text-xl font-mono matrix-glow">{parseFloat(issData.latitude).toFixed(3)}°</span>
                    </div>
                    <div className="bg-black/60 border border-cyan-500/20 p-3 rounded-xl flex flex-col gap-1">
                      <span className="text-cyan-500/70 text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5"><Navigation size={10}/> {isRTL ? 'خط الطول' : 'LON'}</span>
                      <span className="text-white text-lg sm:text-xl font-mono matrix-glow">{parseFloat(issData.longitude).toFixed(3)}°</span>
                    </div>
                    <div className="bg-black/60 border border-cyan-500/20 p-3 rounded-xl flex flex-col gap-1 col-span-2">
                      <span className="text-cyan-500/70 text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5"><Users size={10}/> {isRTL ? 'الطاقم الحالي' : 'CREW ONBOARD'}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-cyan-400">{issData.crewInSpace}</span>
                        <span className="text-gray-400 text-[9px] sm:text-[10px] leading-tight uppercase">{isRTL ? 'رواد في الفضاء' : 'ASTRONAUTS IN SPACE'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-cyan-500/50 font-mono text-xs py-10 gap-2">
                    <Loader2 className="animate-spin" size={20}/> 
                    {isRTL ? 'جاري التحديد...' : 'LOCATING...'}
                  </div>
                )}
              </div>
            </div>

            {/* Asteroid NEO Radar */}
            <div className="relative glass-card border border-red-500/30 bg-red-950/20 rounded-[30px] overflow-hidden p-5 sm:p-6 flex-1 flex flex-col backdrop-blur-md">
               <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-red-500/20"></div>
               <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-red-500/30"></div>
               <div className="absolute top-[20%] left-1/2 origin-bottom -translate-x-1/2 -translate-y-full w-[1px] h-20 bg-gradient-to-t from-red-500 to-transparent animate-radar opacity-70">
                  <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-red-500/20 to-transparent transform -skew-x-[30deg] origin-bottom-left"></div>
               </div>

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-red-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Radar className="text-red-400" size={20} />
                    <h2 className="text-sm sm:text-base font-black text-white tracking-widest uppercase">
                      {isRTL ? 'رادار (NEO)' : 'NEO RADAR'}
                    </h2>
                  </div>
                </div>

                <div className="space-y-2.5 mt-auto">
                  {asteroidsData.length > 0 ? asteroidsData.slice(0,3).map((ast, i) => (
                    <div key={i} className="bg-black/60 border border-red-500/20 p-2.5 rounded-lg flex items-center justify-between hover:border-red-500/50 transition-colors backdrop-blur-sm">
                      <div>
                        <div className="text-white font-bold text-[11px] sm:text-xs flex items-center gap-2">
                          {ast.name}
                          {ast.isHazardous ? <Skull size={10} className="text-red-500 animate-pulse"/> : <Shield size={10} className="text-green-500"/>}
                        </div>
                        <div className="text-gray-400 text-[9px] font-mono mt-0.5">
                           {ast.speed} km/s | ~{ast.size}m
                        </div>
                      </div>
                      <div className="text-right">
                         <div className={`text-[8px] font-black tracking-widest uppercase ${ast.isHazardous ? 'text-red-500' : 'text-green-500'}`}>
                           {ast.isHazardous ? (isRTL ? 'خطر' : 'HAZARD') : (isRTL ? 'آمن' : 'SAFE')}
                         </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-red-500/50 font-mono text-xs text-center py-6"><Loader2 className="animate-spin inline mr-2" size={16}/> {isRTL ? 'مسح...' : 'SCANNING...'}</div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TIER 2: NASA APOD */}
        <div className="w-full mb-20 relative z-20">
          <div className="relative glass-card border border-blue-500/40 bg-black/80 rounded-[40px] overflow-hidden p-2 group backdrop-blur-2xl shadow-[0_0_80px_rgba(59,130,246,0.15)]">
            
            {nasaData && !nasaData.error && (
               <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-[100px] rounded-[40px] transform scale-110 transition-all duration-1000" style={{ backgroundImage: `url(${nasaData.url})` }}></div>
            )}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse shadow-[0_0_20px_rgba(34,211,238,1)]"></div>
            
            <div className="p-6 sm:p-10 h-full flex flex-col relative z-10">
              <div className="flex items-center justify-between mb-8 border-b border-blue-500/30 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-900/40 flex items-center justify-center border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <Telescope className="text-blue-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-[0.2em] uppercase drop-shadow-md">
                      {isRTL ? 'مرصد الفضاء العميق' : 'DEEP SPACE OBSERVATORY'} <span className="hidden md:inline text-blue-500/50">| APOD</span>
                    </h2>
                    <p className="text-[10px] sm:text-xs text-blue-400 font-mono tracking-widest uppercase mt-1">{isRTL ? 'اتصال آمن بوكالة ناسا' : 'SECURE UPLINK TO NASA'}</p>
                  </div>
                </div>
              </div>

              {nasaData && !nasaData.error ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch h-full">
                  
                  {/* Media Content */}
                  <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-colors duration-500 bg-black min-h-[300px] lg:min-h-[450px] shadow-2xl w-full">
                    <Crosshair className="absolute top-4 left-4 text-cyan-500/70 z-20 pointer-events-none" size={24} />
                    <Crosshair className="absolute bottom-4 right-4 text-cyan-500/70 z-20 pointer-events-none transform rotate-180" size={24} />
                    {nasaData.media_type === 'video' ? (
                      <iframe src={nasaData.url} title={nasaData.title} className="absolute inset-0 w-full h-full object-cover z-10" allowFullScreen></iframe>
                    ) : (
                      <img src={nasaData.url} alt={nasaData.title} className="absolute inset-0 w-full h-full object-cover z-10 transform group-hover:scale-105 transition-transform duration-[15s]" />
                    )}
                  </div>
                  
                  {/* Text Details */}
                  <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                    <div>
                      <div className="text-cyan-400 text-[10px] sm:text-xs font-mono mb-3 flex items-center gap-2 uppercase tracking-widest bg-cyan-950/40 inline-flex px-3 py-1.5 rounded-lg border border-cyan-500/30">
                        <Database size={12}/> {isRTL ? 'سجل وكالة الفضاء:' : 'SPACE LOG:'} {nasaData.date}
                      </div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] drop-shadow-lg mb-4">
                        {isRTL && nasaData.ar_title ? nasaData.ar_title : nasaData.title}
                      </h3>
                      <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                    </div>
                    <p className="text-gray-200 text-sm sm:text-base leading-[2.2] max-h-[250px] lg:max-h-[300px] overflow-y-auto pr-4 custom-scrollbar font-medium text-justify">
                      {isRTL && nasaData.ar_explanation ? nasaData.ar_explanation : nasaData.explanation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-blue-400 gap-4 py-20">
                  <Loader2 size={40} className="animate-spin text-cyan-500" />
                  <span className="font-mono text-sm tracking-widest uppercase">{isRTL ? 'تهيئة الرابط الفضائي...' : 'INITIALIZING SPACE LINK...'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar - Cyber Terminal */}
        <div className="max-w-4xl mx-auto mb-16 relative z-20">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-purple-600/20 blur-xl rounded-2xl transition-opacity opacity-0 group-focus-within:opacity-100"></div>
            <div className="relative flex items-center bg-black/50 border border-white/10 group-focus-within:border-purple-500/50 rounded-2xl p-2 backdrop-blur-md shadow-2xl transition-all">
              <div className="pl-4 pr-2 flex items-center pointer-events-none">
                <span className="text-purple-500 font-black text-2xl">{'>'}</span>
              </div>
              <input 
                type="text" 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder={isRTL ? "أدخل أمر البحث عن أوراق بحثية أو أخبار الفضاء..." : "QUERY GLOBAL DATABASE: Enter topic..."} 
                className="w-full bg-transparent border-none text-white placeholder-gray-600 focus:outline-none focus:ring-0 text-base sm:text-lg py-4 px-3 font-mono" 
                dir={isRTL ? 'rtl' : 'ltr'} 
              />
              <button type="submit" disabled={isSearching} className="ml-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold tracking-widest uppercase rounded-xl flex items-center gap-3 disabled:opacity-50 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                <span className="hidden sm:inline">{isSearching ? (isRTL ? 'فك تشفير...' : 'DECRYPTING...') : (isRTL ? 'تأكيد الأمر' : 'EXECUTE')}</span>
              </button>
            </div>
          </form> 
        </div>

        {/* Search Results Indicator */}
        {searched && query && (
          <div className="mb-10 flex items-center justify-between glass-card p-4 sm:px-8 border border-purple-500/30 bg-purple-900/10 rounded-2xl backdrop-blur-md max-w-4xl mx-auto">
             <div className="text-purple-300 text-sm font-mono flex items-center gap-3">
               <Zap size={18} className="text-purple-400 animate-pulse"/>
               {isRTL ? `تطابقات لـ: [ ${query} ]` : `MATCHES FOR: [ ${query} ]`}
             </div>
             <button onClick={clearSearch} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-5 py-2 rounded-lg">
               {isRTL ? 'إعادة ضبط' : 'RESET'}
             </button>
          </div>
        )}

        {/* Live Papers & News Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20 relative z-20">
          
          {/* Papers Vault */}
          <div className="glass-card p-1 border border-purple-500/20 bg-purple-950/10 rounded-[30px] relative overflow-hidden group backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none group-hover:bg-purple-500/20 transition-colors"></div>
            <div className="bg-black/40 backdrop-blur-md p-6 sm:p-10 rounded-[26px] h-full">
              <div className="flex items-center gap-4 mb-8 border-b border-purple-500/20 pb-5">
                <BookOpen size={28} className="text-purple-400" />
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
                  {isRTL ? 'أوراق بحثية مصنفة' : 'Classified Papers'}
                </h2>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-purple-400 font-mono text-sm flex items-center justify-center gap-3 py-10"><Loader2 size={24} className="animate-spin"/> {isRTL ? 'جاري فك التشفير...' : 'DECRYPTING...'}</div>
                ) : papersData.length > 0 ? papersData.map((paper, index) => (
                  <div key={index} className="relative p-5 rounded-2xl bg-purple-900/10 border border-purple-500/20 hover:border-purple-400/60 hover:bg-purple-900/20 transition-all duration-300 flex flex-col justify-between group/card overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500/50 group-hover/card:bg-purple-400 transition-colors"></div>
                    <h3 className="text-white text-sm sm:text-base font-bold mb-4 line-clamp-2 leading-relaxed ml-3">
                      {isRTL && paper.ar_title ? paper.ar_title : paper.title}
                    </h3>
                    <div className="flex items-center justify-between ml-3">
                      <span className="text-[10px] sm:text-xs font-mono text-purple-300/60 uppercase tracking-widest bg-black/50 px-3 py-1.5 rounded-lg">
                        {isRTL ? 'نشر:' : 'PUB:'} {paper.year || '2026'}
                      </span>
                      <a href={paper.openAccessPdf?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-5 py-2.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                        <Download size={16} /> {isRTL ? 'استخراج' : 'EXTRACT'}
                      </a>
                    </div>
                  </div>
                )) : <p className="text-red-400/80 font-mono text-sm py-5 text-center">{isRTL ? 'لا توجد بيانات.' : 'NO DATA.'}</p>}
              </div>
            </div>
          </div>

          {/* News Radar */}
          <div className="glass-card p-1 border border-teal-500/20 bg-teal-950/10 rounded-[30px] relative overflow-hidden group backdrop-blur-md">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 blur-[60px] pointer-events-none group-hover:bg-teal-500/20 transition-colors"></div>
            <div className="bg-black/40 backdrop-blur-md p-6 sm:p-10 rounded-[26px] h-full">
               <div className="flex items-center gap-4 mb-8 border-b border-teal-500/20 pb-5">
                <Globe size={28} className="text-teal-400 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
                  {isRTL ? 'إشارات البث العالمي' : 'Global Transmissions'}
                </h2>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-teal-400 font-mono text-sm flex items-center justify-center gap-3 py-10"><Loader2 size={24} className="animate-spin"/> {isRTL ? 'اعتراض الإشارات...' : 'INTERCEPTING...'}</div>
                ) : newsData.length > 0 ? newsData.map((news, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-teal-900/10 border border-teal-500/20 flex gap-5 hover:border-teal-400/60 hover:bg-teal-900/20 transition-all duration-300 group/news">
                    <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden border border-teal-500/30 hidden sm:block">
                      <div className="absolute inset-0 bg-teal-500/20 mix-blend-overlay z-10 group-hover/news:opacity-0 transition-opacity"></div>
                      <img src={news.image_url} alt={news.title} className="w-full h-full object-cover filter grayscale group-hover/news:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex flex-col justify-between w-full py-1">
                      <h3 className="text-white text-sm sm:text-base font-bold line-clamp-2 leading-relaxed">
                        {isRTL && news.ar_title ? news.ar_title : news.title}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[10px] text-teal-400 font-mono tracking-widest uppercase border border-teal-500/30 px-3 py-1.5 rounded-lg bg-teal-950/50">
                          {isRTL ? 'المصدر:' : 'SRC:'} {news.news_site}
                        </span>
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors">
                          {isRTL ? 'اتصال' : 'UPLINK'} <ExternalLink size={14} />
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
