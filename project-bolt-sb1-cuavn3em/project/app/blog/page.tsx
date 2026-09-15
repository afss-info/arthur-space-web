'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Newspaper, Rocket, Calendar, User, X, BookOpen, Fingerprint, Loader2, Database, Terminal, Activity, Zap, Crosshair } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const { isRTL } = useLang();
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // States for Cinematic Modal
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) { 
        console.error('Failed to fetch posts'); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedPost(null); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedPost || isDecrypting) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedPost, isDecrypting]);

  // Cinematic Open Effect
  const handlePostClick = (post: any) => {
    setIsDecrypting(true);
    // محاكاة فك التشفير لثانية واحدة لإعطاء طابع سينمائي
    setTimeout(() => {
      setIsDecrypting(false);
      setSelectedPost(post);
    }, 1000);
  };

  const content = {
    title: isRTL ? 'المستودع العلمي المفتوح' : 'OPEN SCIENTIFIC REPOSITORY',
    welcome: isRTL
      ? 'استكشف أحدث الأبحاث العلمية، الأخبار الرسمية، والمنشورات الأكاديمية الصادرة عن مؤسسة آرثر لعلوم الفضاء ومشروع أثيريس البحثي.'
      : 'Explore the latest scientific research, official news, and academic publications issued by Arthur For Space Sciences and the Atheris Research Project.',
    emptyState: isRTL ? 'لا توجد ملفات في قاعدة البيانات حالياً.' : 'No records in the database currently.',
  };

  return (
    // تمت إزالة الخلفية الداكنة ليسمح للنجوم الأصلية بالظهور
    <div className="page-section min-h-screen py-20 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan-vert { 0% { transform: translateY(-100%); } 100% { transform: translateY(1000%); } }
        .animate-scan-vert { animation: scan-vert 3s linear infinite; }
        .cinema-glow { text-shadow: 0 0 20px rgba(6, 182, 212, 0.6); }
      `}} />

      {/* الشبكة السيبرانية الشفافة (تندمج مع نجوم الموقع) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section (Cinematic Hero) */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-40 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-cyan-500/40 bg-cyan-900/20 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-md">
            <Activity size={16} className="text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]">
              {isRTL ? 'شبكة أثيريس متصلة' : 'ATHERIS NETWORK ONLINE'}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-600 tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] mb-8 uppercase cinema-glow">
            {content.title}
          </h1>
          
          <div className="glass-card border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)] rounded-3xl p-8 sm:p-10 bg-black/40 backdrop-blur-xl relative overflow-hidden mb-12 max-w-4xl mx-auto group">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
            <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Database size={150} className="text-cyan-400" /></div>
            <p className="text-gray-200 text-base md:text-lg leading-[2] text-center font-medium relative z-10 font-mono">
              {content.welcome}
            </p>
          </div>
        </div>

        {/* Posts Data Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-cyan-500" size={50} />
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase animate-pulse">{isRTL ? 'جاري الاتصال بقواعد البيانات...' : 'ACCESSING DATABASES...'}</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-black/40 rounded-3xl border border-cyan-500/20 border-dashed mt-10 backdrop-blur-md shadow-inner">
            <Terminal size={50} className="text-cyan-500/40 mb-6" />
            <p className="text-cyan-400/80 font-mono text-sm tracking-widest uppercase">{content.emptyState}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {posts.map((post) => (
              <div key={post.id} className="relative glass-card bg-black/40 border border-cyan-500/20 rounded-3xl overflow-hidden hover:-translate-y-2 hover:border-cyan-400/80 hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all duration-500 group flex flex-col shadow-lg backdrop-blur-md">
                
                {/* Visual Scanner Effect on Hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 hidden group-hover:block animate-scan-vert z-20 pointer-events-none"></div>

                {post.media && post.mediaType === 'video' ? (
                  <div className="w-full h-56 overflow-hidden relative border-b border-cyan-500/20 bg-black cursor-pointer" onClick={() => handlePostClick(post)}>
                    <Crosshair className="absolute top-3 left-3 text-cyan-500/50 z-20 pointer-events-none" size={20} />
                    <Crosshair className="absolute bottom-3 right-3 text-cyan-500/50 z-20 pointer-events-none transform rotate-180" size={20} />
                    <video src={post.media} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div className="w-16 h-16 bg-cyan-600/30 rounded-full flex items-center justify-center backdrop-blur-md border border-cyan-400/50 group-hover:scale-125 transition-transform duration-500 shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                      </div>
                    </div>
                  </div>
                ) : post.media ? (
                  <div className="w-full h-56 overflow-hidden relative border-b border-cyan-500/20 cursor-pointer bg-black" onClick={() => handlePostClick(post)}>
                    <Crosshair className="absolute top-3 left-3 text-cyan-500/50 z-20 pointer-events-none" size={20} />
                    <Crosshair className="absolute bottom-3 right-3 text-cyan-500/50 z-20 pointer-events-none transform rotate-180" size={20} />
                    <img src={post.media} alt={isRTL ? post.title_ar : post.title_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                  </div>
                ) : (
                   <div className="w-full h-32 bg-gradient-to-br from-cyan-900/30 to-black relative border-b border-cyan-500/20 cursor-pointer" onClick={() => handlePostClick(post)}></div>
                )}

                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="flex items-center gap-3 text-[10px] text-cyan-400 mb-5 font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 bg-cyan-950/50 border border-cyan-500/30 px-3 py-1.5 rounded"><Calendar size={12}/> {post.date}</span>
                    <span className="flex items-center gap-1.5 bg-purple-950/50 border border-purple-500/30 px-3 py-1.5 rounded text-purple-400"><User size={12}/> {post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-4 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {isRTL ? post.title_ar : post.title_en}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 flex-1 font-medium">
                    {isRTL ? post.content_ar : post.content_en}
                  </p>
                  
                  <button onClick={() => handlePostClick(post)} className="w-full py-4 rounded-xl bg-cyan-600/10 hover:bg-cyan-600 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all font-black tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2">
                    <Fingerprint size={16}/> {isRTL ? 'استخراج الملف السري' : 'EXTRACT CLASSIFIED FILE'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decrypting Loading State (Cinematic Transition) */}
      {isDecrypting && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl transition-opacity duration-300">
           <Zap size={60} className="text-cyan-400 animate-pulse mb-6" />
           <h2 className="text-2xl font-black text-cyan-400 tracking-[0.3em] uppercase font-mono mb-2">
             {isRTL ? 'جاري فك التشفير' : 'DECRYPTING DATA'}
           </h2>
           <p className="text-cyan-500/50 font-mono text-sm tracking-widest uppercase">
             {isRTL ? 'تأسيس اتصال آمن مع خوادم أثيريس...' : 'SECURING CONNECTION WITH ATHERIS SERVERS...'}
           </p>
           <div className="w-64 h-1 bg-cyan-950 mt-8 rounded-full overflow-hidden">
             <div className="h-full bg-cyan-400 animate-pulse w-full"></div>
           </div>
        </div>
      )}

      {/* The IMAX Cinema Stage Modal */}
      {selectedPost && !isDecrypting && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-0 sm:p-6 transition-all duration-700" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer" onClick={() => setSelectedPost(null)}></div>
          
          <div className="relative w-full h-full sm:h-[95vh] max-w-6xl glass-card bg-black border-0 sm:border border-cyan-500/40 sm:rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.2)] flex flex-col z-10 animate-in zoom-in-95 duration-500">
            
            <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-red-600 text-gray-300 hover:text-white rounded-full backdrop-blur-xl border border-white/10 hover:border-red-500 transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)]" style={isRTL ? { left: '24px', right: 'auto' } : { right: '24px' }}>
              <X size={24} />
            </button>

            <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent flex-1 relative">
              
              {/* IMAX Header Media */}
              {selectedPost.media && selectedPost.mediaType === 'video' ? (
                <div className="w-full h-[50vh] sm:h-[60vh] bg-black relative">
                  <video src={selectedPost.media} controls autoPlay className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none"></div>
                </div>
              ) : selectedPost.media ? (
                <div className="w-full h-[50vh] sm:h-[60vh] relative bg-black">
                  <img src={selectedPost.media} alt="Cover" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-b from-cyan-900/30 to-black w-full"></div>
              )}

              {/* Dossier Content */}
              <div className="px-6 sm:px-16 pb-20 relative z-10 bg-black -mt-32 sm:-mt-40 pt-10">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-cyan-400 mb-8 font-mono tracking-widest uppercase drop-shadow-md">
                    <span className="flex items-center gap-2 bg-black/60 border border-cyan-500/40 px-4 py-2 rounded-lg backdrop-blur-md"><Calendar size={14}/> {selectedPost.date}</span>
                    <span className="flex items-center gap-2 bg-black/60 border border-purple-500/40 px-4 py-2 rounded-lg backdrop-blur-md text-purple-400"><User size={14}/> {selectedPost.author}</span>
                    <span className="flex items-center gap-2 bg-black/60 border border-green-500/40 px-4 py-2 rounded-lg backdrop-blur-md text-green-400"><Fingerprint size={14}/> DOI: 10.1000/AFSS-{selectedPost.id || '001'}</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.2] drop-shadow-2xl">
                    {isRTL ? selectedPost.title_ar : selectedPost.title_en}
                  </h2>
                  
                  <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-12 shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                  
                  <div className="prose prose-invert max-w-none prose-p:leading-[2.2] prose-p:text-gray-300 prose-p:text-base sm:prose-p:text-lg prose-p:font-medium">
                    <p className="whitespace-pre-wrap break-words">
                      {isRTL ? selectedPost.content_ar : selectedPost.content_en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
