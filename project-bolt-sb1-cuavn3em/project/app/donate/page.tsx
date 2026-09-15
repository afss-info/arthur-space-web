'use client';

import React from 'react';
import { Heart, Landmark, ShieldAlert, Sparkles, Globe, MapPin, Network, Activity, BookOpen, Rocket, Fingerprint, Lock, Terminal } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function DonatePage() {
  const { isRTL } = useLang();

  const content = {
    title: isRTL ? 'منظومة الدعم المالي' : 'FINANCIAL SUPPORT SYSTEM',
    subtitle: isRTL 
      ? 'وقود المهمة: ادعم أبحاث الفضاء والبرامج التعليمية لبناء الجيل القادم.' 
      : 'Mission Fuel: Support our space research and educational programs for the next generation.',
    motivationTitle: isRTL ? 'لماذا ندعوك لتكون جزءاً من هذا الإرث؟' : 'Why Invest in Our Legacy?',
    motivationText: isRTL
      ? 'نحن في مؤسسة آرثر لعلوم الفضاء (AFSS) نمثل مؤسسة علمية شابة وطموحة. نؤمن بأن الشغف بالاستكشاف لا يعترف بالحدود، ورغم حداثة عهدنا، إلا أننا نمتلك إمكانيات علمية وطموحات تعانق السماء لبناء جيل جديد من الباحثين. تبرعك – مهما كان حجمه – ليس مجرد دعم مالي؛ بل هو استثمار مباشر في عقول شابة، وتمويل لأبحاث فضاء رائدة، ومساهمة في توفير برامج تعليمية مجانية للطلاب الشغوفين حول العالم. كن جزءاً من رحلتنا، وساعدنا لنحول طموحاتنا الكبيرة إلى إنجازات علمية ملموسة.'
      : 'At AFSS, we are a young, ambitious scientific foundation. We believe that the passion for exploration knows no borders. Despite being relatively new, we possess vast scientific potential and sky-high ambitions to build a new generation of researchers. Your donation—no matter the size—is more than financial support; it is a direct investment in young minds, a catalyst for groundbreaking space research, and a contribution to free educational programs for passionate students worldwide. Join our journey and help us turn our bold ambitions into tangible scientific achievements.',
    legalWarning: isRTL
      ? 'إشعار قانوني: Arthur For Space Sciences Ltd هي شركة بريطانية خاصة محدودة بالضمان ومسجلة رسمياً (17452506). جميع التبرعات والمنح تُستخدم حصرياً لتمويل الأبحاث العلمية والبرامج التعليمية غير الربحية وفقاً لقانون الشركات البريطاني.'
      : 'LEGAL NOTICE: Arthur For Space Sciences Ltd is a Private Limited Company by Guarantee, officially registered (17452506). All donations and grants are used exclusively to fund scientific research and non-profit educational programs in accordance with UK corporate law.',
  };

  const bankDetails = [
    { label: isRTL ? 'اسم الحساب المستفيد' : 'Beneficiary Name', value: 'Arthur For Space Sciences Ltd' },
    { label: isRTL ? 'اسم البنك' : 'Bank Name', value: '---' },
    { label: isRTL ? 'رمز الفرز (Sort Code)' : 'Sort Code', value: '---' },
    { label: isRTL ? 'رقم الحساب' : 'Account Number', value: '---' },
    { label: isRTL ? 'رقم الحساب الدولي (IBAN)' : 'IBAN', value: '---' },
    { label: isRTL ? 'رمز السويفت (SWIFT)' : 'SWIFT / BIC', value: '---' },
  ];

  return (
    <div className="page-section min-h-screen py-20 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* المؤثرات الحركية (CSS) */}
      <style dangerouslySetInnerHTML={{__html: `
        .pulse-line { animation: pulse-line 3s infinite; }
        @keyframes pulse-line { 0% { opacity: 0.3; transform: scaleX(0.95); } 50% { opacity: 1; transform: scaleX(1); } 100% { opacity: 0.3; transform: scaleX(0.95); } }
        .node-glow { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); }
      `}} />

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-purple-500/40 bg-purple-900/20 mb-8 shadow-[0_0_30px_rgba(168,85,247,0.2)] backdrop-blur-md">
            <Heart size={16} className="text-purple-400 animate-pulse" />
            <span className="text-purple-300 text-xs font-bold uppercase tracking-[0.2em]">
              {isRTL ? 'نظام التمويل المركزي' : 'CENTRAL FUNDING SYSTEM'}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-600 tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] mb-6 uppercase">
            {content.title}
          </h1>
          <p className="text-purple-200/70 max-w-2xl mx-auto text-sm sm:text-base font-mono tracking-wide">
            {content.subtitle}
          </p>
        </div>

        {/* Global Connection Nodes (Syria - UAE - UK - World) */}
        <div className="mb-20 glass-card border border-purple-500/20 rounded-3xl p-8 sm:p-12 bg-black/40 backdrop-blur-xl relative overflow-hidden">
           <div className="text-center mb-10">
             <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
               <Globe className="text-purple-400" /> {isRTL ? 'شبكة الأثر العلمي العالمية' : 'GLOBAL SCIENTIFIC IMPACT NETWORK'}
             </h3>
             <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">{isRTL ? 'نربط الجذور بالقمم لنلهم العالم' : 'Connecting roots to peaks to inspire the world'}</p>
           </div>

           {/* خريطة العقد التفاعلية (Interactive Nodes Map) */}
           <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 max-w-4xl mx-auto py-4">
              
              {/* خط الاتصال النبضي */}
              <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/60 to-blue-500/20 -translate-y-1/2 pulse-line z-0"></div>

              {/* Node 1: Syria */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-black border-2 border-cyan-500/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <MapPin size={24} className="text-cyan-400" />
                </div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">{isRTL ? 'سوريا' : 'SYRIA'}</span>
                <span className="text-cyan-400/80 text-[10px] font-mono mt-1">{isRTL ? 'الجذور والمواهب' : 'ROOTS & TALENTS'}</span>
              </div>

              {/* Node 2: UAE */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-black border-2 border-purple-500/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <Activity size={24} className="text-purple-400" />
                </div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">{isRTL ? 'الإمارات' : 'UAE'}</span>
                <span className="text-purple-400/80 text-[10px] font-mono mt-1">{isRTL ? 'قاعدة العمليات' : 'OPERATIONS BASE'}</span>
              </div>

              {/* Node 3: UK */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  <Landmark size={24} className="text-blue-400" />
                </div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">{isRTL ? 'المملكة المتحدة' : 'UK'}</span>
                <span className="text-blue-400/80 text-[10px] font-mono mt-1">{isRTL ? 'المقر القانوني' : 'LEGAL HQ'}</span>
              </div>

              {/* Node 4: The World */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-black border-2 border-white/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  <Network size={24} className="text-white" />
                </div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">{isRTL ? 'العالم' : 'THE WORLD'}</span>
                <span className="text-gray-400/80 text-[10px] font-mono mt-1">{isRTL ? 'الأثر والمستقبل' : 'IMPACT & FUTURE'}</span>
              </div>
           </div>
        </div>

        {/* Arthuron Impact Matrix (مصفوفة الأثر التي اقترحها آرثرون) */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 flex items-center gap-3">
            <Activity className="text-purple-400" /> {isRTL ? 'مصفوفة الأثر المالي' : 'FINANCIAL IMPACT MATRIX'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
             
             {/* Impact 1 */}
             <div className="glass-card bg-black/50 border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/50 transition-colors group backdrop-blur-md">
               <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Terminal className="text-cyan-400" size={24}/>
               </div>
               <h3 className="text-lg font-bold text-white mb-3">{isRTL ? 'تراخيص وبرمجيات علمية' : 'Scientific Software Licenses'}</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                 {isRTL ? 'تمويل شراء أدوات المحاكاة الفلكية وبرامج التحليل الإحصائي الضرورية للطلاب في مشروع أثيريس.' : 'Funding the purchase of astronomical simulation tools and statistical software necessary for Atheris students.'}
               </p>
               <div className="w-full bg-cyan-950/30 h-1.5 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-cyan-400 animate-pulse"></div></div>
             </div>

             {/* Impact 2 */}
             <div className="glass-card bg-black/50 border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/50 transition-colors group backdrop-blur-md">
               <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <BookOpen className="text-purple-400" size={24}/>
               </div>
               <h3 className="text-lg font-bold text-white mb-3">{isRTL ? 'نشر الأبحاث وتوثيقها' : 'Research Publication'}</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                 {isRTL ? 'تغطية تكاليف النشر المفتوح (Open Access) في المجلات العلمية المحكمة عالمياً بأسم مؤسسة آرثر.' : 'Covering Open Access publication costs in globally peer-reviewed scientific journals under the AFSS name.'}
               </p>
               <div className="w-full bg-purple-950/30 h-1.5 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-purple-400 animate-pulse"></div></div>
             </div>

             {/* Impact 3 */}
             <div className="glass-card bg-black/50 border border-blue-500/20 rounded-3xl p-8 hover:border-blue-500/50 transition-colors group backdrop-blur-md">
               <div className="w-12 h-12 rounded-xl bg-blue-950/50 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Rocket className="text-blue-400" size={24}/>
               </div>
               <h3 className="text-lg font-bold text-white mb-3">{isRTL ? 'المهمات والمسابقات الدولية' : 'International Missions'}</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                 {isRTL ? 'دعم مشاركة الفرق والطلاب المتميزين في المحافل الدولية وتغطية رسوم التسجيل كأعضاء معتمدين.' : 'Supporting the participation of outstanding teams in international forums and covering registration fees.'}
               </p>
               <div className="w-full bg-blue-950/30 h-1.5 rounded-full overflow-hidden"><div className="w-2/3 h-full bg-blue-400 animate-pulse"></div></div>
             </div>

          </div>
        </div>

        {/* Motivational Message Card (Director's Log) */}
        <div className="glass-card border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.1)] rounded-3xl p-8 sm:p-12 bg-black/60 backdrop-blur-xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-indigo-400 animate-pulse" size={28} />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">{content.motivationTitle}</h2>
          </div>
          <p className="text-gray-300 text-base md:text-lg leading-[2] font-medium">
            {content.motivationText}
          </p>
        </div>

        {/* Legal Strict Notice */}
        <div className="bg-yellow-950/20 border border-yellow-500/30 rounded-2xl p-6 sm:p-8 mb-16 flex gap-4 items-start backdrop-blur-md">
          <ShieldAlert className="text-yellow-500 shrink-0 mt-1" size={24} />
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono uppercase tracking-wide">
            {content.legalWarning}
          </p>
        </div>

        {/* Secure Bank Transfer Terminal (Data Uplink) */}
        <div className="glass-card border border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.15)] rounded-3xl p-8 sm:p-12 bg-black/80 relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute -top-20 -right-20 p-4 opacity-5 pointer-events-none"><Lock size={250} className="text-purple-400" /></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/30 border border-purple-500/50 flex items-center justify-center">
                <Landmark className="text-purple-400" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-widest uppercase">{isRTL ? 'قناة التحويل البنكي' : 'SECURE BANK TRANSFER'}</h2>
                <div className="text-purple-400 text-[10px] font-mono tracking-widest mt-1 flex items-center gap-2">
                  <Fingerprint size={12}/> {isRTL ? 'اتصال مالي مشفر 256-BIT' : '256-BIT ENCRYPTED FINANCIAL UPLINK'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bankDetails.map((detail, idx) => (
              <div key={idx} className="bg-black/50 border border-purple-500/20 hover:border-purple-500/50 transition-colors rounded-2xl p-5 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors"></div>
                <p className="text-[10px] text-gray-500 mb-2 font-bold tracking-widest uppercase ml-2">{detail.label}</p>
                <p className="text-lg font-mono text-gray-200 ml-2 group-hover:text-purple-200 transition-colors">{detail.value}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 text-center">
            <p className="text-purple-300 text-sm font-mono tracking-widest animate-pulse">
              {isRTL ? 'جارٍ تهيئة البيانات البنكية الرسمية في النظام...' : 'OFFICIAL BANK DATA INITIALIZING IN SYSTEM...'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
