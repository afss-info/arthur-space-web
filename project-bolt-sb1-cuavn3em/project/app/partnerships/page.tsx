'use client';

import React, { useState, useEffect } from 'react';
import { Handshake, Award, ShieldCheck, Activity, Users, Map, Star } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

// مكون النجوم المتساقطة ليضفي طابعاً فضائياً إلهياً
const StarsBackground = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: Math.random() * 2 + 1,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div key={star.id} className="absolute bg-white rounded-full shadow-[0_0_12px_#fff] animate-fall"
          style={{ left: star.left, width: `${star.size}px`, height: `${star.size}px`, animationDuration: star.animationDuration, animationDelay: star.animationDelay, top: '-5%' }}
        />
      ))}
    </div>
  );
};

export default function PartnershipsPage() {
  const { t, isRTL } = useLang();

  // بيانات IAAC
  const iaacName = isRTL ? 'المسابقة الدولية لعلم الفلك والفيزياء الفلكية (IAAC)' : 'International Astronomy and Astrophysics Competition (IAAC)';
  const iaacDesc = isRTL
    ? 'آرثر لعلوم الفضاء هي مؤسسة مسجلة رسمياً وموثقة لدى IAAC. يعمل جاد ياسين كسفير رسمي لـ IAAC، ممثلاً لمؤسسة آرثر لعلوم الفضاء على الساحة الدولية.'
    : 'AFSS is an officially registered institute with the IAAC. Jad Yassin serves as an official IAAC Ambassador, representing Arthur For Space Sciences on the international stage.';

  // بيانات STEMedic Central المُحدثة والمُصححة
  const stemedicName = 'STEMedic Central';
  const stemedicDesc = isRTL
    ? 'منظمة دولية غير ربحية يقودها الطلاب، مهمتها توفير مجتمع لعشاق العلوم والتكنولوجيا والهندسة والرياضيات (STEM) والطب للطلاب ذوي التمثيل المحدود حول العالم، لإشعال الفضول ورعاية الخبرات.'
    : 'An international student-led nonprofit organization whose mission is to provide a community of STEM and Medical enthusiasts to underrepresented students around the world, fueling curiosity and nurturing expertise.';

  return (
    // إزالة الخلفيات الداكنة لتندمج الصفحة مع نجوم الموقع الأصلية
    <div className="page-section relative overflow-hidden min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* تأثيرات الجاذبية والمؤثرات البصرية */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zero-gravity-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(1deg); } }
        @keyframes zero-gravity-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(12px) rotate(-1deg); } }
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0); opacity: 1; } 100% { transform: translateY(110vh) translateX(-20vw); opacity: 0; } }
        
        .animate-zg-1 { animation: zero-gravity-1 8s ease-in-out infinite; }
        .animate-zg-2 { animation: zero-gravity-2 10s ease-in-out infinite; }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}} />

      {/* الطبقات الخلفية المتداخلة */}
      <StarsBackground />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* رأس الصفحة (Header) */}
        <div className="text-center mb-20 relative pt-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-sm">
            <Handshake size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase">
              {isRTL ? 'شبكة التحالفات العالمية' : 'GLOBAL ALLIANCE NETWORK'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-600 tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] mb-4">
            {t('partnerships_title')}
          </h1>
          <p className="text-cyan-200/60 max-w-2xl mx-auto text-sm sm:text-base tracking-wide font-medium">
            {t('partnerships_subtitle')}
          </p>
        </div>

        <div className="space-y-12 pb-20">
          
          {/* الشريك الأول: IAAC */}
          <div className="relative animate-zg-1 group">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="relative glass-card border border-cyan-500/30 bg-black/60 rounded-3xl p-1 overflow-hidden transition-all duration-700 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] group-hover:border-cyan-400/50 backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
              
              <div className="p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                
                {/* صورة اللوغو (IAAC) */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)] shrink-0 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src="/70e29677-bcc2-4d6b-904a-de82667f04c6.jpg" alt="IAAC Logo" className="w-full h-full object-contain p-2 relative z-10" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className={`flex flex-col md:flex-row items-center md:items-start gap-4 mb-4 ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="flex-1">
                      <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block mb-2">{isRTL ? 'شريك رسمي' : 'OFFICIAL PARTNER'}</span>
                      <h2 className="text-2xl font-black text-white tracking-wide">{iaacName}</h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <Award size={14} className="text-cyan-400"/>
                      {isRTL ? 'تم التحقق' : 'VERIFIED'}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-8 max-w-3xl" dir={isRTL ? 'rtl' : 'ltr'}>{iaacDesc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-2">
                        <ShieldCheck size={14}/> {isRTL ? 'المركز التنظيمي' : 'AFSS STATUS'}
                      </div>
                      <div className="text-white text-sm font-medium">{isRTL ? 'مؤسسة مسجلة رسمياً' : 'Officially Registered Institute'}</div>
                    </div>
                    <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-2">
                        <Star size={14}/> {isRTL ? 'التمثيل الرسمي' : 'REPRESENTATIVE'}
                      </div>
                      <div className="text-white text-sm font-medium">{isRTL ? 'جاد ياسين — سفير IAAC' : 'Jad Yassin — IAAC Ambassador'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الشريك الثاني: STEMedic Central */}
          <div className="relative animate-zg-2 group" style={{ animationDelay: '1s' }}>
            <div className="absolute inset-0 bg-purple-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="relative glass-card border border-purple-500/30 bg-black/60 rounded-3xl p-1 overflow-hidden transition-all duration-700 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] group-hover:border-purple-400/50 backdrop-blur-xl">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 animate-pulse"></div>
              
              <div className="p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                
                {/* صورة اللوغو (STEMedic Central) */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] shrink-0 bg-white flex items-center justify-center p-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src="/7517c2fc-e67e-47c3-91f2-e7beb256442c.jpg" alt="STEMedic Central Logo" className="w-full h-auto max-h-full object-contain relative z-10" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className={`flex flex-col md:flex-row items-center md:items-start gap-4 mb-4 ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="flex-1">
                      <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase block mb-2">{isRTL ? 'شريك رسمي' : 'OFFICIAL PARTNER'}</span>
                      <h2 className="text-2xl font-black text-white tracking-wide">{stemedicName}</h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <Award size={14} className="text-purple-400"/>
                      {isRTL ? 'تم التحقق' : 'VERIFIED'}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-8 max-w-3xl" dir={isRTL ? 'rtl' : 'ltr'}>{stemedicDesc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="bg-purple-950/20 border border-purple-500/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-purple-400 text-[10px] uppercase tracking-widest font-bold mb-2">
                        <Activity size={14}/> {isRTL ? 'نوع المنظمة' : 'ORGANIZATION TYPE'}
                      </div>
                      <div className="text-white text-sm font-medium">{isRTL ? 'منظمة دولية يقودها الطلاب' : 'International Student-led Nonprofit'}</div>
                    </div>
                    <div className="bg-purple-950/20 border border-purple-500/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-purple-400 text-[10px] uppercase tracking-widest font-bold mb-2">
                        <Handshake size={14}/> {isRTL ? 'إطار التعاون' : 'COLLABORATION FRAMEWORK'}
                      </div>
                      <div className="text-white text-sm font-medium">{isRTL ? 'مشروع أثيريس البحثي' : 'Atheris Research Project'}</div>
                    </div>
                    
                    {/* إحصائيات STEMedic الإضافية المسحوبة من موقعهم */}
                    <div className="bg-purple-950/20 border border-purple-500/20 p-4 rounded-xl col-span-1 sm:col-span-2 mt-2 flex flex-wrap justify-around sm:justify-start sm:gap-12 gap-6">
                       <div className="flex items-center gap-3">
                         <Users size={18} className="text-purple-400"/>
                         <div>
                           <div className="text-purple-300/70 text-[10px] font-bold uppercase tracking-widest">{isRTL ? 'أعضاء المنظمة' : 'MEMBERS'}</div>
                           <div className="text-white font-mono font-bold text-lg">1500+</div>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <Map size={18} className="text-purple-400"/>
                         <div>
                           <div className="text-purple-300/70 text-[10px] font-bold uppercase tracking-widest">{isRTL ? 'الدول المشاركة' : 'COUNTRIES'}</div>
                           <div className="text-white font-mono font-bold text-lg">50+</div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
