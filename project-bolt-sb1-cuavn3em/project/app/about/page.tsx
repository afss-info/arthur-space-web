'use client';

import { Building2, MapPin, Hash, Shield, User, Fingerprint, Cpu, Globe, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

function TeamMemberCard({
  name, title, bio, initials,
}: {
  name: string;
  title: string;
  bio: string;
  initials: string;
}) {
  return (
    <div className="relative group">
      {/* إضاءة خلفية تنبض عند تمرير الفأرة */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:blur-2xl"></div>
      
      {/* البطاقة الزجاجية - طابع الهوية الفضائية */}
      <div className="relative glass-card p-8 flex flex-col gap-6 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-purple-500/50 rounded-2xl overflow-hidden h-full shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        
        {/* خط المسح السيبراني (Scanline) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 animate-pulse"></div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* الأفاتار التقني */}
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full animate-spin-slow opacity-70 group-hover:opacity-100 blur-[2px]"></div>
              <div className="relative w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl border border-purple-500/50 glow-purple">
                {initials}
              </div>
            </div>
            <div>
              <h3 className="text-white text-xl font-bold tracking-wide">{name}</h3>
              <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mt-1 flex items-center gap-2">
                <Cpu size={14} /> {title}
              </p>
            </div>
          </div>
          {/* تصريح الأمان */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Clearance</span>
            <span className="text-xs text-green-400 font-bold tracking-widest flex items-center gap-1"><CheckCircle2 size={12}/> ACTIVE</span>
          </div>
        </div>

        {bio ? (
          <p className="text-gray-300 text-sm leading-[2] border-t border-white/10 pt-6 relative">
            <Fingerprint size={100} className="absolute top-8 left-1/2 -translate-x-1/2 text-white/5 pointer-events-none" />
            {bio}
          </p>
        ) : (
          <p className="text-gray-600 text-sm italic border-t border-white/10 pt-6 text-center">
            — Data Encrypted —
          </p>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t, isRTL } = useLang();

  // النصوص الخاصة بفريق المؤسسة
  const jadName = isRTL ? 'جاد ياسين' : 'Jad Yassin';
  const jadTitle = isRTL ? 'مؤسس مشارك ومدير' : 'CO-FOUNDER & DIRECTOR';
  const jadBio = isRTL 
    ? 'بصفتي باحثاً شغوفاً بالفيزياء الفلكية وهندسة أنظمة الفضاء، أكرس جهودي لتوسيع آفاق تعليم علوم الفضاء. مدفوعاً باهتمام عميق بتوصيف الكواكب الخارجية وتصميم مهام الفضاء، أسست "آرثر لعلوم الفضاء" لسد الفجوة بين الفيزياء النظرية وفرص الأبحاث المتاحة للطلاب حول العالم. رؤيتي هي بناء مجتمع عالمي من المبتكرين الذين سيقودون الجيل القادم من استكشاف الفضاء.'
    : 'As a passionate researcher in astrophysics and space systems engineering, I dedicate my efforts to expanding the horizons of space science education. Driven by a deep interest in exoplanet characterization and space mission design, I founded Arthur For Space Sciences to bridge the gap between theoretical physics and research opportunities available to students worldwide. My vision is to build a global community of innovators who will lead the next generation of space exploration.';

  const lailaName = isRTL ? 'ليلى أبو الفضل' : 'Laila Abou Alfadel';
  const lailaTitle = isRTL ? 'مؤسس مشارك ومدير' : 'CO-FOUNDER & DIRECTOR';
  const lailaBio = isRTL
    ? 'أنا شغوفة بجعل علوم الفضاء وتعليم STEM أكثر سهولة للطلاب، خاصة أولئك الذين لديهم وصول محدود للفرص العلمية. مدفوعة باهتمام عميق في الفيزياء الحيوية، طب الفضاء، والأبحاث متعددة التخصصات، أسست "آرثر" لإنشاء مجتمع يقوده الطلاب، ولتحويل الفضول إلى عمل علمي هادف. من خلال البرامج التعليمية، المسابقات، المبادرات البحثية، والإرشاد، أهدف إلى ربط الطلاب بفرص للاستكشاف تتجاوز حدود بيئاتهم المحلية وتمكينهم ليصبحوا العلماء والمبتكرين والمستكشفين الذين يشكلون مستقبل علوم الفضاء.'
    : 'I am passionate about making space science and STEM education more accessible to students, especially those with limited access to scientific opportunities. Driven by a deep interest in biophysics, space medicine, and interdisciplinary research, I founded Arthur to create a student-led community, growing curiosity into meaningful scientific work. Through educational programs, competitions, research initiatives, and mentorship, I aim to connect students with opportunities to explore beyond the limits of their local environments and empower them to become the scientists, innovators, and explorers shaping the future of space science.';

  return (
    <div className="page-section relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* خلفية شبكية سيبرانية (Cyber Grid Background) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header - واجهة الاتصال */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span className="text-purple-300 text-xs font-bold tracking-[0.2em] uppercase">{t('nav_about')} // SYSTEM_ONLINE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            {t('about_title')}
          </h1>
        </div>

        {/* Executive Team - أرشيف القيادة */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent to-purple-500 flex-1"></div>
            <h2 className="text-xl font-bold text-white tracking-[0.15em] uppercase flex items-center gap-3 text-shadow-glow">
              <User className="text-purple-400" />
              {t('about_team_title')}
            </h2>
            <div className="h-px bg-gradient-to-l from-transparent to-purple-500 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TeamMemberCard name={jadName} title={jadTitle} bio={jadBio} initials="JY" />
            <TeamMemberCard name={lailaName} title={lailaTitle} bio={lailaBio} initials="LA" />
          </div>
        </section>

        {/* Legal Entity - مركز البيانات القانوني والترخيص */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-gradient-to-r from-transparent to-blue-500 flex-1"></div>
            <h2 className="text-xl font-bold text-white tracking-[0.15em] uppercase flex items-center gap-3 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
              <Shield className="text-blue-400" />
              {t('about_legal_title')}
            </h2>
            <div className="h-px bg-gradient-to-l from-transparent to-blue-500 flex-1"></div>
          </div>
          
          {/* الكرت الزجاجي الرئيسي للكيان القانوني */}
          <div className="relative group glass-card p-1 sm:p-1 overflow-hidden border border-blue-500/30 bg-blue-950/20 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 hover:border-blue-400/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <div className="flex flex-col lg:flex-row bg-black/40 rounded-[22px] overflow-hidden">
              
              {/* قسم البيانات النصية (يسار/يمين حسب اللغة) */}
              <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-10">
                  <div className="relative w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-blue-400/20 animate-pulse"></div>
                    <Globe size={28} className="text-blue-400 relative z-10" />
                  </div>
                  <div>
                    <div className="text-white font-black text-2xl tracking-wide drop-shadow-md">Arthur For Space Sciences Ltd</div>
                    <div className="text-blue-400 text-sm font-semibold tracking-widest uppercase mt-1">United Kingdom Domain</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-3 p-5 rounded-xl bg-blue-950/30 border border-blue-500/10 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-2 text-blue-400 text-xs uppercase tracking-widest font-bold">
                      <Building2 size={14} />
                      {t('about_legal_status_label')}
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed font-medium">{t('about_legal_status_value')}</p>
                  </div>

                  <div className="space-y-3 p-5 rounded-xl bg-blue-950/30 border border-blue-500/10 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-2 text-blue-400 text-xs uppercase tracking-widest font-bold">
                      <Hash size={14} />
                      {t('about_legal_number_label')}
                    </div>
                    <p className="text-white font-black text-2xl tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" dir="ltr">
                      {t('about_legal_number_value')}
                    </p>
                  </div>

                  <div className="space-y-3 p-5 rounded-xl bg-blue-950/30 border border-blue-500/10 hover:border-blue-500/30 transition-all md:col-span-2">
                    <div className="flex items-center gap-2 text-blue-400 text-xs uppercase tracking-widest font-bold">
                      <MapPin size={14} />
                      {t('about_legal_address_label')}
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed font-medium" dir="ltr">
                      {t('about_legal_address_value')}
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-blue-500/20">
                  <p className="text-blue-400/80 text-xs tracking-[0.2em] uppercase text-center font-bold">
                    Official Status: VERIFIED — Companies House, UK
                  </p>
                </div>
              </div>

              {/* قسم الشهادة الهولوغرامية (يسار/يمين حسب اللغة) */}
              <div className="flex-1 relative bg-gradient-to-br from-blue-900/20 to-black p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-blue-500/20 min-h-[400px]">
                {/* شبكة خلفية للهولوغرام */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                
                {/* التأثير المضيء الخفيف خلف الشهادة */}
                <div className="absolute w-3/4 h-3/4 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 transform transition-all duration-700 hover:scale-105 hover:rotate-1 perspective-1000">
                  <div className="relative border border-blue-400/40 p-2 rounded-lg bg-blue-950/40 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    {/* شعاع المسح الضوئي للهولوغرام */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent w-full h-full animate-scanline pointer-events-none rounded-lg"></div>
                    
                    {/* صورة الترخيص مع فلاتر تحويلها لهولوغرام أزرق */}
                    <img 
  src="/certificate.jpg" 
  alt="UK Certificate of Incorporation Hologram" 
  className="w-full max-w-sm rounded-sm invert mix-blend-screen opacity-85 filter contrast-125 sepia-[.4] hue-rotate-[180deg] saturate-150 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
/>
                    
                    {/* زوايا تصويب سيبرانية للشهادة */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
