'use client';

import React, { useState } from 'react';
import { Sparkles, Newspaper, Rocket } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const { isRTL } = useLang();

  const content = {
    title: isRTL ? 'مدونة آرثر' : 'Arthur Blog',
    welcome: isRTL
      ? 'اعرف مؤسستنا أكثر، وتابع آخر الأخبار الرسمية، والأوراق البحثية، وأخبار مشاركاتنا وطلابنا... مع آرثر يبدأ الإبداع.'
      : 'Discover our foundation, follow the latest official news, research papers, and updates about our events and students... With Arthur, creativity begins.',
    emptyState: isRTL ? 'لا توجد أخبار حالياً... انتظروا إبداعاتنا قريباً!' : 'No news yet... Stay tuned for our upcoming creations!',
  };

  // هذه المصفوفة فارغة حالياً، وسنقوم لاحقاً بربطها بقاعدة البيانات لجلب الأخبار
  const [posts, setPosts] = useState([]);

  return (
    <div className="page-section min-h-screen py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
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

        {/* Posts Container */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-50 bg-white/5 rounded-3xl border border-white/10 border-dashed mt-10">
            <Rocket size={48} className="text-gray-500 mb-4 animate-bounce" />
            <p className="text-gray-400 text-lg">{content.emptyState}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* سيتم برمجة عرض المنشورات هنا في المرحلة القادمة */}
          </div>
        )}

      </div>
    </div>
  );
}
