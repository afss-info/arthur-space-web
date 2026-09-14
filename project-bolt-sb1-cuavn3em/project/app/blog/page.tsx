'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Newspaper, Rocket, Calendar, User, X } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const { isRTL } = useLang();
  
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // حالة تتبع المنشور المفتوح (النافذة الخارقة)
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

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

  // إغلاق النافذة المنبثقة عند الضغط على زر (Escape) من الكيبورد
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // منع تمرير الصفحة الخلفية عند فتح النافذة المنبثقة
  useEffect(() => {
    if (selectedPost) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedPost]);

  const content = {
    title: isRTL ? 'مدونة آرثر' : 'Arthur Blog',
    welcome: isRTL
      ? 'اعرف مؤسستنا أكثر، وتابع آخر الأخبار الرسمية، والأوراق البحثية، وأخبار مشاركاتنا وطلابنا... مع آرثر يبدأ الإبداع.'
      : 'Discover our foundation, follow the latest official news, research papers, and updates about our events and students... With Arthur, creativity begins.',
    emptyState: isRTL ? 'لا توجد أخبار حالياً... انتظروا إبداعاتنا قريباً!' : 'No news yet... Stay tuned for our upcoming creations!',
  };

  return (
    <div className="page-section min-h-screen py-20 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 mb-6">
            <Newspaper size={16} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-bold uppercase">{content.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-8">{content.title}</h1>
          
          <div className="glass-card border border-blue-500/30 shadow-2xl rounded-3xl p-8 bg-slate-900/60 relative overflow-hidden mb-12 max-w-3xl mx-auto">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles size={64} className="text-blue-400" />
            </div>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed text-center font-medium relative z-10">
              {content.welcome}
            </p>
          </div>
        </div>

        {/* Posts Container */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50 bg-white/5 rounded-3xl border border-white/10 border-dashed mt-10">
            <Rocket size={48} className="text-gray-500 mb-4 animate-bounce" />
            <p className="text-gray-400 text-lg">{content.emptyState}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {posts.map((post) => (
              <div key={post.id} className="glass-card bg-slate-900/80 border border-blue-500/20 rounded-3xl overflow-hidden hover:-translate-y-2 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 group flex flex-col shadow-lg">

                {/* شكل الوسائط في البطاقة الصغيرة (قبل الضغط) */}
                {post.media && post.mediaType === 'video' ? (
                  <div className="w-full h-52 overflow-hidden relative border-b border-blue-500/20 bg-black cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <video src={post.media} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* زر تشغيل وهمي ليعطي طابع أنه فيديو */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 bg-blue-600/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/50 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                      </div>
                    </div>
                  </div>
                ) : post.media ? (
                  <div className="w-full h-52 overflow-hidden relative border-b border-blue-500/20 cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <img src={post.media} alt={isRTL ? post.title_ar : post.title_en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  </div>
                ) : null}

                <div className="p-6 flex-1 flex flex-col relative z-10">
                  <div className="flex items-center gap-4 text-xs text-blue-300/80 mb-4 font-mono">
                    <span className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-md"><Calendar size={12}/> {post.date}</span>
                    <span className="flex items-center gap-1 bg-purple-500/10 px-2 py-1 rounded-md"><User size={12}/> {post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                    {isRTL ? post.title_ar : post.title_en}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {isRTL ? post.content_ar : post.content_en}
                  </p>
                  
                  {/* زر قراءة المزيد الذي يفتح النافذة */}
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600 hover:to-purple-600 border border-blue-500/30 hover:border-blue-400 text-blue-300 hover:text-white transition-all font-semibold text-sm mt-auto shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  >
                    {isRTL ? 'قراءة المزيد' : 'Read More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* النافذة المنبثقة الخارقة (Modal) بعد الضغط على قراءة المزيد */}
      {/* ==================================================== */}
      {selectedPost && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* الخلفية الضبابية المظلمة */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedPost(null)}
          ></div>
          
          {/* صندوق المحتوى الخارق */}
          <div className="glass-card bg-slate-900/95 border border-cyan-500/50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.3)] relative flex flex-col z-10 animate-in fade-in zoom-in duration-300">
            
            {/* زر الإغلاق الطافي */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500 text-gray-300 hover:text-white rounded-full backdrop-blur-md border border-white/20 hover:border-red-500 transition-all shadow-lg"
              style={isRTL ? { left: '16px', right: 'auto' } : { right: '16px' }}
            >
              <X size={24} />
            </button>

            {/* منطقة قابلة للتمرير (Scrollable Content) */}
            <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent flex-1">
              
              {/* عرض الوسائط بشكل كبير وسينمائي */}
              {selectedPost.media && selectedPost.mediaType === 'video' ? (
                <div className="w-full bg-black relative border-b border-cyan-500/30">
                  <video src={selectedPost.media} controls autoPlay className="w-full max-h-[35vh] object-contain" />
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                </div>
              ) : selectedPost.media ? (
                <div className="w-full relative border-b border-cyan-500/30">
                  <img src={selectedPost.media} alt="Cover" className="w-full max-h-[35vh] object-cover" />
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                </div>
              ) : (
                <div className="h-20 bg-gradient-to-b from-cyan-900/20 to-transparent w-full"></div>
              )}

              {/* نصوص وتفاصيل المنشور */}
              <div className="p-6 sm:p-12 -mt-10 relative z-10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-cyan-300/90 mb-6 font-mono">
                  <span className="flex items-center gap-2 bg-cyan-950/90 border border-cyan-500/40 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg"><Calendar size={16}/> {selectedPost.date}</span>
                  <span className="flex items-center gap-2 bg-purple-950/90 border border-purple-500/40 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg"><User size={16}/> {selectedPost.author}</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 leading-tight drop-shadow-lg">
                  {isRTL ? selectedPost.title_ar : selectedPost.title_en}
                </h2>
                
                <p className="text-gray-200 text-lg sm:text-xl leading-relaxed whitespace-pre-wrap break-words font-medium">
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-200 text-lg sm:text-xl leading-relaxed whitespace-pre-wrap font-medium">
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
