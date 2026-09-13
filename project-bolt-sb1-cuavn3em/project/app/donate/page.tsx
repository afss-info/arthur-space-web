'use client';

import React from 'react';
import { Heart, Landmark, ShieldAlert, Sparkles } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function DonatePage() {
  const { isRTL } = useLang();

  const content = {
    title: isRTL ? 'الدعم المالي' : 'Financial Support',
    subtitle: isRTL 
      ? 'ادعم أبحاث الفضاء والبرامج التعليمية الخاصة بنا.' 
      : 'Support our space research and educational programs.',
    motivationTitle: isRTL ? 'لماذا تدعمنا؟' : 'Why Support Us?',
    motivationText: isRTL
      ? 'نحن في مؤسسة آرثر لعلوم الفضاء (AFSS) نمثل مؤسسة علمية شابة وطموحة. نؤمن بأن الشغف بالاستكشاف لا يعترف بالحدود، ورغم حداثة عهدنا، إلا أننا نمتلك إمكانيات علمية وطموحات تعانق السماء لبناء جيل جديد من الباحثين. تبرعك – مهما كان حجمه – ليس مجرد دعم مالي؛ بل هو استثمار مباشر في عقول شابة، وتمويل لأبحاث فضاء رائدة، ومساهمة في توفير برامج تعليمية مجانية للطلاب الشغوفين حول العالم. كن جزءاً من رحلتنا، وساعدنا لنحول طموحاتنا الكبيرة إلى إنجازات علمية ملموسة.'
      : 'At AFSS, we are a young, ambitious scientific foundation. We believe that the passion for exploration knows no borders. Despite being relatively new, we possess vast scientific potential and sky-high ambitions to build a new generation of researchers. Your donation—no matter the size—is more than financial support; it is a direct investment in young minds, a catalyst for groundbreaking space research, and a contribution to free educational programs for passionate students worldwide. Join our journey and help us turn our bold ambitions into tangible scientific achievements.',
    legalWarning: isRTL
      ? 'إشعار قانوني هام: Arthur For Space Sciences Ltd هي شركة بريطانية خاصة محدودة بالضمان ومسجلة رسمياً في المملكة المتحدة تحت رقم الشركة (17452506). المقر المسجل: 182-184 High Street North, East Ham, London, E6 2JA. جميع التبرعات والمنح تُستخدم حصرياً لتمويل الأبحاث العلمية والبرامج التعليمية غير الربحية وفقاً لقانون الشركات البريطاني.'
      : 'IMPORTANT LEGAL NOTICE: Arthur For Space Sciences Ltd is a Private Limited Company by Guarantee, officially registered in the United Kingdom (Company Number: 17452506). Registered Office: 182-184 High Street North, East Ham, London, E6 2JA. All donations and grants are used exclusively to fund scientific research and non-profit educational programs in accordance with UK corporate law.',
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
    <div className="page-section min-h-screen py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 mb-6">
            <Heart size={16} className="text-purple-400" />
            <span className="text-purple-300 text-xs font-bold uppercase">{content.title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">{content.title}</h1>
          <p className="text-gray-400 text-lg">{content.subtitle}</p>
        </div>

        {/* Motivational Message Card */}
        <div className="glass-card border border-indigo-500/30 shadow-lg rounded-3xl p-8 bg-slate-900/60 relative overflow-hidden mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-indigo-400" size={24} />
            <h2 className="text-2xl font-bold text-white">{content.motivationTitle}</h2>
          </div>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-justify sm:text-start">
            {content.motivationText}
          </p>
        </div>

        {/* Legal Strict Notice (Updated to Yellow) */}
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-2xl p-6 mb-12 flex gap-4">
          <ShieldAlert className="text-yellow-500 shrink-0 mt-1" size={24} />
          <p className="text-gray-300 text-sm leading-relaxed">{content.legalWarning}</p>
        </div>

        {/* Bank Details Placeholder */}
        <div className="glass-card border border-purple-500/30 shadow-2xl rounded-3xl p-8 bg-slate-950/60 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <Landmark className="text-purple-400" size={32} />
            <h2 className="text-2xl font-bold text-white">{isRTL ? 'التحويل البنكي' : 'Bank Transfer'}</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {bankDetails.map((detail, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">{detail.label}</p>
                <p className="text-lg font-mono text-gray-200">{detail.value}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            {isRTL ? 'سيتم إضافة البيانات البنكية الرسمية قريباً.' : 'Official bank details will be added soon.'}
          </p>
        </div>

      </div>
    </div>
  );
}
