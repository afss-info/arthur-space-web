'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserCog, Lock, ArrowLeft, Eye, EyeOff, Info, Users, Activity, CheckCircle2, ShieldCheck, FileSearch } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

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

export default function MentorPortalPage() {
  const { t, isRTL } = useLang();
  const [showPass, setShowPass] = useState(false);
  const [mentorId, setMentorId] = useState('');
  const [password, setPassword] = useState('');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => { setIsAuthenticating(false); setIsAuthenticated(true); }, 1500);
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
        
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto mt-20">
            <Link href="/portals" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <ArrowLeft size={15} className={isRTL ? 'rotate-180' : ''} /> {t('portals_back_btn')}
            </Link>

            <div className="glass-card p-8 sm:p-10 border border-cyan-500/30 rounded-3xl bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
              
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <UserCog size={40} className="text-cyan-400" />
                </div>
                <h1 className="text-2xl font-black text-white mb-2 tracking-widest">{t('portals_mentor_title')}</h1>
                <div className="flex items-center justify-center gap-2 mt-2 bg-cyan-500/10 border border-cyan-500/20 w-max mx-auto px-3 py-1 rounded-full">
                  <ShieldCheck size={14} className="text-cyan-400"/>
                  <span className="text-cyan-300 text-[10px] tracking-[0.2em] font-bold uppercase">{isRTL ? 'تحقق استخباراتي' : 'SECURE CLEARANCE'}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-cyan-300/80 text-[10px] font-bold uppercase tracking-widest mb-2">{t('portals_mentor_id_label')}</label>
                  <input type="text" value={mentorId} onChange={e => setMentorId(e.target.value)} placeholder={t('portals_mentor_id_placeholder')} className="w-full px-5 py-4 bg-black/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/20 transition-all text-sm font-mono" required />
                </div>
                <div>
                  <label className="block text-cyan-300/80 text-[10px] font-bold uppercase tracking-widest mb-2">{t('portals_password_label')}</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={t('portals_password_placeholder')} className="w-full px-5 py-4 pr-12 bg-black/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/20 transition-all text-sm font-mono" required />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={isAuthenticating} className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex justify-center items-center gap-2">
                  {isAuthenticating ? <Activity className="animate-spin" size={18}/> : <Lock size={18} />}
                  {isAuthenticating ? (isRTL ? 'معالجة...' : 'PROCESSING...') : t('portals_login_btn')}
                </button>
              </form>
            </div>
          </div>
        ) : (

          // لوحة تحكم المرشد (Mentor Dashboard)
          <div className="animate-in fade-in duration-1000">
             <div className="flex items-center justify-between bg-black/50 border border-cyan-500/30 rounded-2xl p-6 mb-8 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                    <UserCog size={24} className="text-cyan-400"/>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">{isRTL ? 'مرحباً، كابتن الإرشاد' : 'Welcome, Lead Mentor'}</h2>
                    <div className="text-cyan-400 text-xs font-mono mt-1">ID: {mentorId || 'AFSS-CMD'} | {isRTL ? 'صلاحيات إشرافية' : 'SUPERVISOR ACCESS'}</div>
                  </div>
                </div>
                <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 text-xs font-bold uppercase tracking-widest transition-colors">
                  {isRTL ? 'تسجيل الخروج' : 'LOGOUT'}
                </button>
             </div>

             <div className="glass-card border border-cyan-500/20 rounded-3xl p-8 bg-black/60 backdrop-blur-xl">
               <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Users className="text-cyan-400"/> {isRTL ? 'أسراب الباحثين التابعة لك' : 'Assigned Research Squadrons'}</h3>
               
               <div className="space-y-4">
                 {[1, 2].map((student) => (
                   <div key={student} className="flex flex-col sm:flex-row items-center justify-between bg-cyan-950/20 border border-cyan-500/20 p-5 rounded-xl hover:bg-cyan-900/30 transition-colors gap-4">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-black border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-xs">S-{student}</div>
                       <div>
                         <div className="text-white font-bold text-sm">{isRTL ? 'باحث أثيريس' : 'Atheris Researcher'} #{8490 + student}</div>
                         <div className="text-gray-400 text-xs mt-1">{isRTL ? 'موضوع البحث: الفيزياء الفلكية' : 'Topic: Astrophysics'}</div>
                       </div>
                     </div>
                     <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="flex-1 sm:w-32 bg-black h-2 rounded-full border border-white/10 overflow-hidden">
                          <div className="h-full bg-cyan-500 w-[60%]"></div>
                        </div>
                        <span className="text-cyan-400 font-mono text-xs">60%</span>
                        <button className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-lg transition-colors"><FileSearch size={16}/></button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
