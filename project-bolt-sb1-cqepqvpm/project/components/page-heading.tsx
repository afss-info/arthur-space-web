import type { ReactNode } from 'react';

type PageHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHeading({ eyebrow, title, description, children }: PageHeadingProps) {
  return (
    <div className="mb-16 max-w-3xl">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-nebula-light/25 bg-nebula/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-nebula-glow">
        <span className="h-1.5 w-1.5 rounded-full bg-nebula-glow" />
        {eyebrow}
      </div>
      <h1 className="font-display text-4xl font-bold tracking-tight text-starlight sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-starlight/55 sm:text-lg">{description}</p>
      {children}
    </div>
  );
}
