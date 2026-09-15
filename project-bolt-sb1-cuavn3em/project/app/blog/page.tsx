'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Newspaper, Rocket, Calendar, User, X, BookOpen, Fingerprint } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const StarsBackground = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => { setStars(Array.from({ length: 40 }).map((_, i) => ({ id: i, left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 3 + 2}s`, animationDelay: `${Math.random() * 5}s`, size: Math.random() * 2 + 1 }))); }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (<div key={star.id} className="absolute bg-white rounded-full shadow-[0_0_12px_#fff] animate-fall" style={{ left: star.left, width: `${star.size}px`, height: `${star.size}px`, animationDuration: star.animationDuration, animationDelay: star.animationDelay, top: '-5%' }} />))}
    </div>
  );
};

export default function BlogPage() {
  const { isRTL } = useLang();
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) { console.error('Failed to fetch posts'); } 
      finally { setLoading(false); }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedPost(null); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedPost) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedPost]);

  const content = {
    title: isRTL ? 'المستودع العلمي المفتوح' : 'OPEN SCIENTIFIC REPOSITORY',
    welcome: isRTL
      ? 'استكشف أحدث الأبحاث العلمية، الأخبار الرسمية، والمنشورات الأكاديمية الصادرة عن مؤسسة آرثر لعلوم الفضاء ومشروع أثيريس البحثي.'
      : 'Explore the latest scientific research, official news, and academic publications issued by Arthur For Space Sciences and the Atheris Research Project.',
    emptyState: isRTL ? 'لا توجد ملفات في قاعدة البيانات حالياً.' : 'No records in the database currently.',
  };

  return (
    <div className="page-section min-h-screen py-20 relative bg-[#01030a]" dir={isRTL ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@keyframes fall { 0% { transform: translateY(-10vh) translateX(0); opacity: 1; } 100% { transform: translateY(110vh) translateX(-20vw); opacity: 0; } } .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }`}} />
      <StarsBackground />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 mb-6 backdrop-blur-sm">
            <BookOpen size={16} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">{isRTL ? 'سجلات آرثر' : 'ARTHUR LOGS'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-600 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] mb-8">{content.title}</h1>
          
          <div className="glass-card border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)] rounded-3xl p-8 bg-black/60 backdrop-blur-xl relative overflow-hidden mb-12 max-w-3xl mx-auto">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={100} className="text-blue-400" /></div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center font-mono relative z-10">
              {content.welcome}
            </p>
          </div>
        </div>

        {/* Posts Container */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-blue-950/20 rounded-3xl border border-blue-500/30 border-dashed mt-10 backdrop-blur-sm">
            <Rocket size={48} className="text-blue-500/50 mb-4 animate-bounce" />
            <p className="text-blue-400 font-mono text-sm tracking-widest uppercase">{content.emptyState}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {posts.map((post) => (
              <div key={post.id} className="glass-card bg-black/80 border border-blue-500/30 rounded-3xl overflow-hidden hover:-translate-y-2 hover:border-blue-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 group flex flex-col shadow-lg backdrop-blur-xl">

                {post.media && post.mediaType === 'video' ? (
                  <div className="w-full h-52 overflow-hidden relative border-b border-blue-500/30 bg-black cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <video src={post.media} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 bg-blue-600/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/50 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)]"><div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div></div>
                    </div>
                  </div>
                ) : post.media ? (
                  <div className="w-full h-52 overflow-hidden relative border-b border-blue-500/30 cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <img src={post.media} alt={isRTL ? post.title_ar : post.title_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  </div>
                ) : null}

                <div className="p-6 flex-1 flex flex-col relative z-10">
                  <div className="flex items-center gap-2 text-[10px] text-blue-400 mb-4 font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1 bg-blue-900/30 border border-blue-500/30 px-2 py-1 rounded"><Calendar size={12}/> {post.date}</span>
                    <span className="flex items-center gap-1 bg-purple-900/30 border border-purple-500/30 px-2 py-1 rounded text-purple-400"><User size={12}/> {post.author}</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-white mb-3 line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {isRTL ? post.title_ar : post.title_en}
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6 flex-1 font-medium">
                    {isRTL ? post.content_ar : post.content_en}
                  </p>
                  
                  <button onClick={() => setSelectedPost(post)} className="w-full py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/50 text-blue-300 hover:text-white transition-all font-bold tracking-widest uppercase text-xs shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    {isRTL ? 'استخراج الملف' : 'EXTRACT FILE'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal View */}
      {selectedPost && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer" onClick={() => setSelectedPost(null)}></div>
          
          <div className="glass-card bg-black/90 border border-cyan-500/50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.3)] relative flex flex-col z-10">
            <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 z-50 p-2 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-full backdrop-blur-md border border-red-500/50 transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)]" style={isRTL ? { left: '16px', right: 'auto' } : { right: '16px' }}><X size={20} /></button>

            <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent flex-1">
              
              {selectedPost.media && selectedPost.mediaType === 'video' ? (
                <div className="w-full bg-black relative border-b border-cyan-500/30"><video src={selectedPost.media} controls autoPlay className="w-full max-h-[40vh] object-contain" /></div>
              ) : selectedPost.media ? (
                <div className="w-full relative border-b border-cyan-500/30"><img src={selectedPost.media} alt="Cover" className="w-full max-h-[40vh] object-cover" /></div>
              ) : (<div className="h-20 bg-gradient-to-b from-cyan-900/30 to-transparent w-full"></div>)}

              <div className="p-6 sm:p-10 relative z-10 bg-black/50">
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-cyan-400 mb-6 font-mono tracking-widest uppercase">
                  <span className="flex items-center gap-2 bg-cyan-950/50 border border-cyan-500/50 px-3 py-1.5 rounded"><Calendar size={14}/> {selectedPost.date}</span>
                  <span className="flex items-center gap-2 bg-purple-950/50 border border-purple-500/50 px-3 py-1.5 rounded text-purple-400"><User size={14}/> {selectedPost.author}</span>
                  <span className="flex items-center gap-2 bg-green-950/50 border border-green-500/50 px-3 py-1.5 rounded text-green-400"><Fingerprint size={14}/> DOI: 10.1000/AFSS-{selectedPost.id || '001'}</span>
                </div>
                
                <h2 className="text-2xl sm:text-4xl font-black text-white mb-6 leading-tight">
                  {isRTL ? selectedPost.title_ar : selectedPost.title_en}
                </h2>
                
                <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent mb-8"></div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base leading-[2] whitespace-pre-wrap break-words font-medium">
                    {isRTL ? selectedPost.content_ar : selectedPost.content_en}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
