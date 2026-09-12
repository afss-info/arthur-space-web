'use client';

export function AFSSLogo({ size = 48 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Planet body */}
      <defs>
        <radialGradient id="planetGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#7c3aed" />
        </radialGradient>
        <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Orbit ring back */}
      <ellipse cx="50" cy="58" rx="38" ry="10" fill="none" stroke="url(#ringGrad)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

      {/* Planet */}
      <circle cx="50" cy="44" r="26" fill="url(#planetGrad)" filter="url(#glow)" />

      {/* Orbit ring front */}
      <ellipse cx="50" cy="58" rx="38" ry="10" fill="none" stroke="url(#ringGrad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="60 20" />

      {/* Dots */}
      <circle cx="14" cy="44" r="5" fill="#3b82f6" />
      <circle cx="72" cy="18" r="4" fill="#ec4899" />
      <circle cx="20" cy="72" r="6" fill="#06b6d4" />
    </svg>
  );
}
