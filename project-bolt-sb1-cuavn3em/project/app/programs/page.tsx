'use client';

import { AlertTriangle, GraduationCap, FlaskConical, ChevronRight, BookOpen, Code2, Atom, Dna, Zap, Telescope } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const aspTracks = [
  { icon: BookOpen, label: 'Mathematics' },
  { icon: Atom, label: 'Physics' },
  { icon: FlaskConical, label: 'Chemistry' },
  { icon: Dna, label: 'Biology' },
  { icon: Code2, label: 'Programming' },
  { icon: Telescope, label: 'Space Science' },
];

const atherisTeams = [
  { icon: Dna, label: 'Biomedical Engineering' },
  { icon: Zap, label: 'Neuroscience' },
  { icon: Zap, label: 'Electrical Engineering (EE)' },
  { icon: Code2, label: 'Programming' },
];

const aspTracksAr = ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'البرمجة', 'علوم الفضاء'];
const atherisTeamsAr = ['الهندسة الطبية الحيوية', 'علم الأعصاب', 'الهندسة الكهربائية (EE)', 'البرمجة'];

export default function ProgramsPage() {
  const { t, isRTL, lang } = useLang();

  return (
    <div className="page-section" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <GraduationCap size={13} className="text-purple-400" />
            <span className="text-purple-300 text-xs font-semibold tracking-widest uppercase">{t('nav_programs')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient">{t('programs_title')}</h1>
        </div>

        {/* CLOSED Banner */}
        <div className="mb-10 rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 py-4 flex items-center gap-4">
          <AlertTriangle size={22} className="text-amber-400 shrink-0" />
          <p className="text-amber-300 font-semibold text-sm sm:text-base">{t('programs_closed_banner')}</p>
        </div>

        <div className="space-y-8">
          {/* ASP */}
          <div className="glass-card p-8 sm:p-10 glow-purple">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                <GraduationCap size={24} className="text-purple-400" />
              </div>
              <div>
                <div className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-1">Program 01</div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{t('programs_asp_name')}</h2>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">{t('programs_asp_desc')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3">{t('programs_duration_label')}</div>
                <div className="text-white text-sm">{t('programs_asp_duration')}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3">{t('programs_scope_label')}</div>
                <div className="text-white text-sm">{t('programs_asp_scope')}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3">{t('programs_asp_tracks_label')}</div>
              <div className="flex flex-wrap gap-2">
                {aspTracks.map(({ icon: Icon, label }, idx) => (
                  <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-300 text-xs font-medium">
                    <Icon size={12} />
                    {lang === 'ar' ? aspTracksAr[idx] : label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Atheris */}
          <div className="glass-card p-8 sm:p-10 glow-blue">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <FlaskConical size={24} className="text-blue-400" />
              </div>
              <div>
                <div className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-1">Program 02</div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{t('programs_atheris_name')}</h2>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">{t('programs_atheris_desc')}</p>

            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-3">{t('programs_atheris_teams_label')}</div>
              <div className="flex flex-wrap gap-2">
                {atherisTeams.map(({ icon: Icon, label }, idx) => (
                  <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-300 text-xs font-medium">
                    <Icon size={12} />
                    {lang === 'ar' ? atherisTeamsAr[idx] : label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
