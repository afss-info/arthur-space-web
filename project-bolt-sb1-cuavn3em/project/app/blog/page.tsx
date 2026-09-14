'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Newspaper, Rocket, Calendar, User } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const { isRTL } = useLang();
  
  // States للتحكم في المنشورات وحالة التحميل
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب المنشورات من السيرفر عند فتح الصفحة
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

  const content = {
    title: isRTL ? 'مدونة آرثر' : 'Arthur Blog',
    welcome: isRTL
      ? 'اعرف مؤسستنا أكثر، وتابع آخر الأخبار الرسمية، والأوراق البحثية، وأخبار مشاركاتنا وطلابنا... مع آرثر يبدأ الإبداع.'
      : 'Discover our foundation, follow the latest official news, research papers, and updates about our events and students... With Arthur, creativity begins.',
    emptyState: isRTL ? 'لا توجد أخبار حالياً... انتظروا إبداعاتنا قريباً!' : 'No news yet... Stay tuned for our upcoming creations!',
  };

  return (
    <div className="page-section min-h-screen py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 mb-6">
            <Newspaper size={16} className="text-blue-400" />
            <span className="text-blue-300 text-xs font-bold uppercase">{content.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-8">{content.title}</h1>
          
          {/* Welcome Message Card */}
          <div className="glass-card border border-blue-500/30 shadow-2xl rounded-3xl p-8 bg-slate-900/60 relative overflow-hidden mb-12 max-w-3xl mx-auto">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles size={64} className="text-blue-400" />
            </div>
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed text-center font-medium relative z-10">
              {content.welcome}
            </p>
          </div>
        </div>

        {/* Posts Container / Loading / Empty States */}
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
              <div key={post.id} className="glass-card bg-slate-900/80 border border-blue-500/20 rounded-3xl overflow-hidden hover:-translate-y-2 hover:border-blue-400 transition-all duration-300 group flex flex-col shadow-lg">

                {/* Media Renderer (يدعم الفيديو والصور معاً بذكاء) */}
                {post.media && post.mediaType === 'video' ? (
                  <div className="w-full h-52 overflow-hidden relative border-b border-blue-500/20 bg-black">
                    <video src={post.media} controls className="w-full h-full object-cover" />
                  </div>
                ) : post.media ? (
                  <div className="w-full h-52 overflow-hidden relative border-b border-blue-500/20">
                    <img src={post.media} alt={isRTL ? post.title_ar : post.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : null}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta Data */}
                  <div className="flex items-center gap-4 text-xs text-blue-300/70 mb-4 font-mono">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14}/> {post.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-snug">
                    {isRTL ? post.title_ar : post.title_en}
                  </h3>

                  {/* Content */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {isRTL ? post.content_ar : post.content_en}
                  </p>

                  {/* Read More Button */}
                  <button className="w-full py-3 rounded-xl bg-blue-500/10 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 text-blue-300 hover:text-white transition-all font-semibold text-sm mt-auto">
                    {isRTL ? 'قراءة المزيد' : 'Read More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
