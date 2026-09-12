import { Orbit } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function LogoMark({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber via-nebula-light to-nebula-dark glow-purple-strong">
        <div className="absolute inset-1 rounded-full border border-white/20" />
        <Orbit className="relative h-6 w-6 text-starlight" />
        <span className="absolute -right-1 top-1 h-2.5 w-2.5 rounded-full bg-amber-glow" />
        <span className="absolute -bottom-1 left-1 h-2 w-2 rounded-full bg-sky-400" />
      </div>
      <div className={compact ? 'hidden sm:block' : ''}>
        <div className="font-display text-base font-bold leading-tight text-starlight">AFSS</div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-amber-glow/80">{t('brand.stillAware')}</div>
      </div>
    </div>
  );
}
