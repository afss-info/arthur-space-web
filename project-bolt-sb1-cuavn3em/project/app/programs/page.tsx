'use client';

import React, { useState, useEffect } from 'react';
import { Rocket, Target, Activity, Lock, Orbit, Crosshair, Fingerprint, Zap, Atom, Calculator, Cpu, FlaskConical, Network, Stethoscope, CheckCircle2, ShieldAlert, Telescope, Database, Users } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

// مكون الجسيمات العائمة في الفضاء
const FloatingDebris = () => {
  const [debris, setDebris] = useState<any[]>([]);
  useEffect(() => {
    setDebris(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: Math.random() * 3 + 1,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {debris.map((d) => (
        <div key={d.id} className="absolute bg-blue-500/20 rounded-full animate-float-slow"
          style={{ left: d.left, top: d.top, width: `${d.size}px`, height: `${d.size}px`, animationDuration: d.animationDuration, animationDelay: d.animationDelay }}
        />
      ))}
    </div>
  );
};

export default function ProgramsPage() {
  const { t, isRTL } = useLang();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const aspTitle = isRTL ? 'برنامج آرثر للعلماء (ASP)' : 'Arthur Scholars Program (ASP)';
  const aspDesc = isRTL 
    ? 'برنامج تدريبي دولي مدته عام واحد يوفر الإرشاد والتدريب المتقدم والتوجيه للمسابقات العلمية الدولية.'
    : 'A one-year international training program providing mentorship, advanced training, and guidance for international scientific competitions.';
  
  const atherisTitle = isRTL ? 'مشروع أثيريس البحثي' : 'Atheris Research Project';
  const atherisDesc = isRTL
    ? 'مبادرة بحثية تعاونية تهدف إلى نشر أوراق بحثية علمية من خلال فرق متخصصة ومتعددة التخصصات.'
    : 'A collaborative research initiative aimed at publishing scientific research papers through specialized, multidisciplinary teams.';

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubmitted(true);
      setTimeout(() => { setIsModalOpen(false); setSubmitted(false); setEmail(''); }, 3000);
    }
  };

  return (
    <div className="page-section relative overflow-hidden bg-[#01030a] min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* CSS Effects */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zero-gravity-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(1deg); } }
        @keyframes zero-gravity-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(15px) rotate(-1deg); } }
        @keyframes float-slow { 0%, 100% { transform: translate(0, 0); opacity: 0.2; } 50% { transform: translate(20px, -20px); opacity: 0.8; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(500%); } }
        
        .animate-zg-1 { animation: zero-gravity-1 8s ease-in-out infinite; }
        .animate-zg-2 { animation: zero-gravity-2 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-scan { animation: scanline 3s linear infinite; }
        .matrix-text { text-shadow: 0 0 8px rgba(59,130,246,0.8); }
      `}} />

      {/* Background Layers */}
      <FloatingDebris />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 relative pt-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-sm">
            <Orbit size={14} className="text-blue-400 animate-spin-slow" />
            <span className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase">
              {isRTL ? 'إدارة المهمات المدارية' : 'ORBITAL MISSIONS CONTROL'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-600 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] mb-6">
            {t('nav_programs')}
          </h1>
          <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/30 px-6 py-3 rounded-xl backdrop-blur-sm">
            <ShieldAlert className="text-red-400 animate-pulse" size={18}/>
            <p className="text-red-300 text-sm tracking-widest font-mono uppercase">
              {isRTL ? 'تحذير النظام: التسجيل للمهمات الحالية مغلق رسمياً.' : 'SYSTEM ALERT: Registration for all current programs is officially CLOSED.'}
            </p>
          </div>
        </div>

        {/* MISSION 01: ASP */}
        <div className="relative mb-16 animate-zg-1 group">
          <div className="absolute inset-0 bg-blue-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="relative glass-card border border-blue-500/30 bg-black/60 rounded-3xl p-1 overflow-hidden transition-all duration-700 group-hover:transform group-hover:scale-[1.01] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:border-blue-400/50 backdrop-blur-xl">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
            
            <div className="p-8 sm:p-10 flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                      <Rocket className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase block mb-1">MISSION 01</span>
                      <h2 className="text-2xl font-black text-white tracking-wide">{aspTitle}</h2>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{isRTL ? 'الحالة المدارية' : 'ORBITAL STATUS'}</span>
                    <span className="text-xs text-cyan-400 font-bold tracking-widest flex items-center gap-2 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30 mt-1">
                      <Lock size={12}/> {isRTL ? 'المهمة قيد التنفيذ' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-8">{aspDesc}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-xl">
                    <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase block mb-1">{isRTL ? 'المدة الزمنية' : 'DURATION'}</span>
                    <span className="text-white text-sm font-mono">{isRTL ? 'عام أكاديمي واحد (2026-2027)' : 'One Academic Year (2026–2027)'}</span>
                  </div>
                  <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-xl">
                    <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase block mb-1">{isRTL ? 'النطاق' : 'SCOPE'}</span>
                    <span className="text-white text-sm font-mono">{isRTL ? 'دولي' : 'International'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                    <span>{isRTL ? 'مسار التدريب' : 'TRAINING PROGRESS'}</span>
                    <span>35%</span>
                  </div>
                  <div className="h-2 w-full bg-blue-950 rounded-full overflow-hidden border border-blue-500/20">
                    <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 w-[35%] relative">
                      <div className="absolute top-0 right-0 w-4 h-full bg-white/50 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 bg-black/40 rounded-2xl border border-white/5 p-6 relative overflow-hidden group/payload">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] pointer-events-none"></div>
                <h3 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                  <Target size={14} className="text-blue-500/50"/> {isRTL ? 'حمولات المسارات' : 'TRACK PAYLOADS'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Calculator, label: isRTL ? 'رياضيات' : 'Mathematics' },
                    { icon: Atom, label: isRTL ? 'فيزياء' : 'Physics' },
                    { icon: FlaskConical, label: isRTL ? 'كيمياء' : 'Chemistry' },
                    { icon: Activity, label: isRTL ? 'أحياء' : 'Biology' },
                    { icon: Cpu, label: isRTL ? 'برمجة' : 'Programming' },
                    { icon: Telescope, label: isRTL ? 'علوم الفضاء' : 'Space Science' }
                  ].map((track, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-blue-900/10 border border-blue-500/20 p-3 rounded-lg hover:bg-blue-500/20 hover:border-blue-400/50 transition-colors">
                      <track.icon size={16} className="text-blue-400 shrink-0"/>
                      <span className="text-gray-300 text-[11px] font-bold tracking-wider uppercase">{track.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION 02: ATHERIS */}
        <div className="relative mb-20 animate-zg-2 group" style={{ animationDelay: '1.5s' }}>
          <div className="absolute inset-0 bg-purple-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="relative glass-card border border-purple-500/30 bg-black/60 rounded-3xl p-1 overflow-hidden transition-all duration-700 group-hover:transform group-hover:scale-[1.01] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] group-hover:border-purple-400/50 backdrop-blur-xl">
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 animate-pulse"></div>
            
            <div className="p-8 sm:p-10 flex flex-col lg:flex-row-reverse gap-10">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <Network className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase block mb-1">MISSION 02</span>
                      <h2 className="text-2xl font-black text-white tracking-wide">{atherisTitle}</h2>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{isRTL ? 'حالة البحث' : 'RESEARCH STATUS'}</span>
                    <span className="text-xs text-purple-400 font-bold tracking-widest flex items-center gap-2 bg-purple-500/10 px-3 py-1 rounded border border-purple-500/30 mt-1">
                      <Lock size={12}/> {isRTL ? 'قيد التنفيذ' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-8">{atherisDesc}</p>

                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-[10px] font-mono text-purple-400 tracking-widest uppercase">
                    <span>{isRTL ? 'مرحلة صياغة الأبحاث' : 'DRAFTING PHASE'}</span>
                    <span>68%</span>
                  </div>
                  <div className="h-2 w-full bg-purple-950 rounded-full overflow-hidden border border-purple-500/20">
                    <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 w-[68%] relative">
                      <div className="absolute top-0 right-0 w-4 h-full bg-white/50 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 bg-black/40 rounded-2xl border border-white/5 p-6 relative overflow-hidden group/payload">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[40px] pointer-events-none"></div>
                <h3 className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                  <Users size={14} className="text-purple-500/50"/> {isRTL ? 'أسراب البحث' : 'RESEARCH SQUADRONS'}
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: Stethoscope, label: isRTL ? 'هندسة طبية حيوية' : 'Biomedical Engineering' },
                    { icon: Activity, label: isRTL ? 'علم الأعصاب' : 'Neuroscience' },
                    { icon: Zap, label: isRTL ? 'هندسة كهربائية (EE)' : 'Electrical Engineering (EE)' },
                    { icon: Cpu, label: isRTL ? 'برمجة' : 'Programming' }
                  ].map((team, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl hover:bg-purple-500/20 hover:border-purple-400/50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-black/50 border border-purple-500/30 flex items-center justify-center shrink-0">
                        <team.icon size={14} className="text-purple-400"/>
                      </div>
                      <span className="text-gray-200 text-xs font-bold tracking-wider uppercase">{team.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Request Clearance Button */}
        <div className="text-center relative z-20 pb-20">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-blue-600/30 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative flex items-center gap-3 bg-black border border-blue-500/50 px-8 py-4 rounded-full hover:bg-blue-950/50 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
            >
              <Fingerprint className="text-blue-400 group-hover:scale-110 transition-transform" size={24}/>
              <span className="text-white font-black tracking-widest uppercase text-sm">
                {isRTL ? 'طلب تصريح للمهمة القادمة' : 'REQUEST CLEARANCE FOR NEXT MISSION'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Cyber Waitlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none z-0"></div>
          
          <div className="relative w-full max-w-lg glass-card border border-blue-500/50 bg-black/90 p-8 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-400 animate-scan opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Database className="text-blue-400 animate-pulse" size={20}/>
                <h3 className="text-white font-mono tracking-widest uppercase text-sm matrix-text">
                  {isRTL ? 'محطة الاتصال' : 'COMM LINK TERMINAL'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <Crosshair size={20} className="transform rotate-45"/>
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                  <CheckCircle2 size={30} className="text-green-400"/>
                </div>
                <h4 className="text-white font-bold tracking-widest uppercase text-lg mt-2">{isRTL ? 'تم حفظ التوقيع' : 'SIGNATURE LOGGED'}</h4>
                <p className="text-green-400 font-mono text-xs">{isRTL ? 'سيتم إشعارك عند فتح بوابات الانطلاق.' : 'You will be notified when launch gates open.'}</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                <div>
                  <p className="text-gray-300 text-xs font-mono mb-6 leading-relaxed">
                    {isRTL ? 'قاعدة البيانات مغلقة حالياً. أدخل هويتك الرقمية (البريد الإلكتروني) لتجاوز النظام وتلقي إشعار فوري عند بدء تسجيل مهمات الدورة القادمة.' : 'Database is currently locked. Enter your digital ID (email) to bypass the system and receive a priority uplink when the next cycle missions open.'}
                  </p>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-blue-500 font-black text-xl">{'>'}</span>
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isRTL ? "أدخل بريدك الإلكتروني..." : "Enter your email address..."} 
                      className="w-full bg-blue-950/20 border border-blue-500/30 rounded-xl py-4 pl-10 pr-4 text-white font-mono focus:outline-none focus:border-blue-400 focus:bg-blue-900/30 transition-all text-sm"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  <Zap size={16}/> {isRTL ? 'تهيئة الاتصال' : 'INITIATE UPLINK'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
