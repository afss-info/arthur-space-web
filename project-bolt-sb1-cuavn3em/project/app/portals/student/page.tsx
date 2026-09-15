'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Lock, ArrowLeft, Eye, EyeOff, Info, UploadCloud, BookOpen, MessageSquare, Database, FileText, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { AFSSLogo } from '@/components/AFSSLogo';

const StarsBackground = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 30 }).map((_, i) => ({ id: i, left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 3 + 2}s`, animationDelay: `${Math.random() * 5}s`, size: Math.random() * 2 + 1 })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div key={star.id} className="absolute bg-white rounded-full shadow-[0_0_10px_#fff] animate-fall" style={{ left: star.left, width: `${star.size}px`, height: `${star.size}px`, animationDuration: star.animationDuration, animationDelay: star.animationDelay, top: '-5%' }} />
      ))}
    </div>
  );
};

export default function StudentPortalPage() {
  const { t, isRTL } = useLang();
  const [showPass, setShowPass] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  
  // نظام الدخول الافتراضي
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsAuthenticating(true);
    // محاكاة الاتصال بقاعدة البيانات
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
    }, 1500);
  }

  return (
    <div className="page-section relative min-h-screen overflow-hidden bg-[#01030a]" dir={isRTL ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fall { 0% { transform: translateY(-10vh) translateX(0); opacity: 1; } 100% { transform: translateY(110vh) translateX(-20vw); opacity: 0; } }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
      `}} />
      <StarsBackground />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="w-full max-w-5xl mx-auto px-4 relative z-10 py-10">
        
        {/* شاشة تسجيل الدخول */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto mt-20">
            <Link href="/portals" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <ArrowLeft size={15} className={isRTL ? 'rotate-180' : ''} /> {t('portals_back_btn')}
            </Link>

            <div className="glass-card p-8 sm:p-10 border border-purple-500/30 rounded-3xl bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
              
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <GraduationCap size={40} className="text-purple-400" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2 tracking-widest">{t('portals_student_title')}</h1>
                <div className="flex items-center justify-center gap-2 mt-2 bg-purple-500/10 border border-purple-500/20 w-max mx-auto px-3 py-1 rounded-full">
                  <ShieldCheck size={14} className="text-purple-400"/>
                  <span className="text-purple-300 text-[10px] tracking-[0.2em] font-bold uppercase">{isRTL ? 'اتصال مشفر' : 'SECURE ENCRYPTED'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-500/20 rounded-xl px-4 py-4 mb-8">
                <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-xs leading-relaxed font-mono">{t('portals_student_instructions')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-purple-300/80 text-[10px] font-bold uppercase tracking-widest mb-2">{t('portals_student_id_label')}</label>
                  <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder={t('portals_student_id_placeholder')} className="w-full px-5 py-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:bg-purple-900/20 transition-all text-sm font-mono" required />
                </div>
                <div>
                  <label className="block text-purple-300/80 text-[10px] font-bold uppercase tracking-widest mb-2">{t('portals_password_label')}</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={t('portals_password_placeholder')} className="w-full px-5 py-4 pr-12 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:bg-purple-900/20 transition-all text-sm font-mono" required />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={isAuthenticating} className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex justify-center items-center gap-2">
                  {isAuthenticating ? <Activity className="animate-spin" size={18}/> : <Lock size={18} />}
                  {isAuthenticating ? (isRTL ? 'جاري التحقق...' : 'AUTHENTICATING...') : t('portals_login_btn')}
                </button>
              </form>
            </div>
          </div>
        ) : (

          // شاشة لوحة تحكم الطالب (LMS Dashboard) الافتراضية
          <div className="animate-in fade-in duration-1000">
             <div className="flex items-center justify-between bg-black/50 border border-purple-500/30 rounded-2xl p-6 mb-8 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                    <GraduationCap size={24} className="text-purple-400"/>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">{isRTL ? 'مرحباً، باحث أثيريس' : 'Welcome, Atheris Researcher'}</h2>
                    <div className="text-purple-400 text-xs font-mono mt-1">ID: {studentId || 'AFSS-9021'} | {isRTL ? 'متصل بالشبكة السحابية' : 'CONNECTED TO CLOUD'}</div>
                  </div>
                </div>
                <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 text-xs font-bold uppercase tracking-widest transition-colors">
                  {isRTL ? 'تسجيل الخروج' : 'LOGOUT'}
                </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* رفع مسودات الأبحاث */}
                <div className="lg:col-span-2 glass-card border border-purple-500/20 rounded-3xl p-8 bg-black/60 backdrop-blur-xl">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><UploadCloud className="text-purple-400"/> {isRTL ? 'مستودع الأبحاث السحابي' : 'Cloud Research Repository'}</h3>
                  <div className="border-2 border-dashed border-purple-500/30 rounded-2xl p-10 text-center hover:bg-purple-500/5 transition-colors cursor-pointer group">
                    <Database size={40} className="text-purple-400/50 mx-auto mb-4 group-hover:text-purple-400 group-hover:scale-110 transition-all"/>
                    <p className="text-white font-bold mb-2">{isRTL ? 'اسحب وأفلت مسودة البحث هنا' : 'Drag & Drop Research Draft Here'}</p>
                    <p className="text-gray-500 text-xs font-mono">{isRTL ? 'يدعم PDF, DOCX (مشفر بالكامل)' : 'Supports PDF, DOCX (End-to-End Encrypted)'}</p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">{isRTL ? 'الملفات المرفوعة حديثاً' : 'RECENT UPLOADS'}</h4>
                    <div className="flex items-center justify-between bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-purple-400"/>
                        <span className="text-sm text-gray-200 font-mono">Exoplanet_Spectroscopy_Draft_v2.pdf</span>
                      </div>
                      <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">{isRTL ? 'تم التدقيق' : 'REVIEWED'}</span>
                    </div>
                  </div>
                </div>

                {/* تواصل مع المرشد */}
                <div className="glass-card border border-blue-500/20 rounded-3xl p-8 bg-black/60 backdrop-blur-xl flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><MessageSquare className="text-blue-400"/> {isRTL ? 'توجيهات المرشد' : 'Mentor Directives'}</h3>
                  <div className="flex-1 bg-blue-950/20 border border-blue-500/20 rounded-2xl p-5 overflow-y-auto space-y-4">
                     <div className="bg-black/50 border border-white/5 p-3 rounded-lg">
                       <div className="text-[10px] text-blue-400 font-mono mb-2">Mentor: Dr. Sarah | 09:00 AM</div>
                       <p className="text-gray-300 text-xs leading-relaxed">{isRTL ? 'عمل ممتاز في القسم الثاني. يرجى مراجعة معادلات التحليل الطيفي قبل الرفع النهائي.' : 'Excellent work on Section 2. Please review the spectral analysis equations before final submission.'}</p>
                     </div>
                  </div>
                  <div className="mt-4 relative">
                    <input type="text" placeholder={isRTL ? 'اكتب استفساراً للمرشد...' : 'Send inquiry to mentor...'} className="w-full bg-black border border-blue-500/30 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-blue-400" />
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
