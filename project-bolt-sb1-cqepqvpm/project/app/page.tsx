import Link from 'next/link';
import { ArrowRight, Orbit, GraduationCap, Atom, Sparkles, Telescope, Users, Award } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';

export default function HomePage() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden px-6 py-20 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-nebula/20 blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-nebula-light/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nebula-dark/10 blur-[150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="h-[600px] w-[600px] rounded-full border border-nebula/10 animate-[spin_60s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nebula-glow/40 blur-sm" />
          </div>
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-nebula/15 animate-[spin_40s_linear_infinite_reverse]">
            <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-nebula-light/50 blur-sm" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-nebula-light/25 bg-nebula/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-nebula-glow animate-fade-in-up">
            <Sparkles className="h-4 w-4" /> Non-Profit Scientific Institution
          </div>

          <h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text text-glow">Arthur For Space Sciences Ltd</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg font-light text-starlight/55 sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A non-profit scientific institution and a global space community for enthusiasts.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/programs" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nebula via-nebula-light to-nebula px-8 py-4 text-base font-medium text-starlight transition-all duration-500 glow-purple-strong hover:scale-105">
              <GraduationCap className="h-5 w-5" /> Explore Programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/portals" className="group inline-flex items-center gap-2 rounded-full glass-strong px-8 py-4 text-base font-medium text-starlight transition-all duration-500 hover:glass-nebula hover:scale-105">
              <Orbit className="h-5 w-5 text-nebula-glow transition-transform duration-700 group-hover:rotate-180" /> Access Portals
            </Link>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Users, value: '2', label: 'Dedicated Founders' },
              { icon: GraduationCap, value: '6', label: 'Scientific Tracks' },
              { icon: Award, value: '1', label: 'IAAC Official Ambassador' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <stat.icon className="h-5 w-5 text-nebula-glow/60" />
                <span className="font-display text-3xl font-bold gradient-text-nebula">{stat.value}</span>
                <span className="max-w-[140px] text-center text-xs tracking-wide text-starlight/40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: '/about', icon: Users, title: 'About Us', desc: 'Meet the founders and learn about our UK-registered legal entity.' },
            { href: '/space-research', icon: Telescope, title: 'Space Research', desc: 'A hub for the latest published research from global space agencies.' },
            { href: '/programs', icon: GraduationCap, title: 'Programs', desc: 'Arthur Scholars Program and the Atheris Research Project.' },
            { href: '/partnerships', icon: Award, title: 'Partnerships', desc: 'Our official collaborations with IAAC and StemMed.' },
            { href: '/portals', icon: Orbit, title: 'Portals', desc: 'Student and Mentor/Coach login interfaces.' },
            { href: '/arthuron', icon: Atom, title: 'Arthuron', desc: 'The AFSS Artificial Intelligence Core, standing by to assist.' },
          ].map((card) => (
            <Link key={card.href} href={card.href} className="group glass rounded-3xl p-6 transition-all duration-500 hover:glass-nebula">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-nebula/20 to-nebula-dark/20 border border-nebula/20 transition-all duration-500 group-hover:from-nebula group-hover:to-nebula-dark group-hover:glow-purple">
                  <card.icon className="h-5 w-5 text-nebula-glow transition-colors duration-500 group-hover:text-starlight" />
                </div>
                <h3 className="font-display text-lg font-semibold text-starlight">{card.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-starlight/50">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
