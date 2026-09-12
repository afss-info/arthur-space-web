import { GraduationCap, Microscope, Calculator, Atom, FlaskConical, Dna, Code, Rocket, Brain, CircuitBoard, Cpu, Lock } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { PageHeading } from '@/components/page-heading';

const aspTracks = [
  { icon: Calculator, name: 'Mathematics' },
  { icon: Atom, name: 'Physics' },
  { icon: FlaskConical, name: 'Chemistry' },
  { icon: Dna, name: 'Biology' },
  { icon: Code, name: 'Programming' },
  { icon: Rocket, name: 'Space Science' },
];

const atherisTeams = [
  { icon: Brain, name: 'Biomedical Engineering' },
  { icon: Microscope, name: 'Neuroscience' },
  { icon: CircuitBoard, name: 'Electrical Engineering (EE)' },
  { icon: Cpu, name: 'Programming' },
];

export default function ProgramsPage() {
  return (
    <SiteShell>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeading eyebrow="Our Programs" title="Programs" description="Structured initiatives designed to train, mentor, and publish the next generation of scientific researchers." />

          {/* Closed registration banner */}
          <div className="mb-12 flex items-center gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20">
              <Lock className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-red-300">Registration for all current programs is officially CLOSED.</p>
              <p className="mt-1 text-sm text-red-300/60">Please check back for future program cycles.</p>
            </div>
          </div>

          {/* Program 1: ASP */}
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 mb-8 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-nebula/15 blur-[100px]" />
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula to-nebula-dark glow-purple">
                  <GraduationCap className="h-8 w-8 text-starlight" />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-nebula/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-nebula-glow">Program 01</span>
                    <span className="rounded-full glass px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-starlight/50">2026 — 2027</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-starlight md:text-3xl">Arthur Scholars Program (ASP) 2026-2027</h3>
                </div>
              </div>

              <p className="mb-8 max-w-3xl leading-relaxed text-starlight/60">
                A one-year international training program providing mentorship, advanced training, and guidance for international scientific competitions.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {aspTracks.map((track) => (
                  <div key={track.name} className="glass rounded-2xl p-4 text-center transition-all duration-300 hover:glass-nebula">
                    <track.icon className="mx-auto mb-3 h-6 w-6 text-nebula-glow" />
                    <p className="text-xs font-medium text-starlight/80">{track.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Program 2: Atheris */}
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-nebula-light/10 blur-[100px]" />
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula-light to-nebula glow-purple">
                  <Microscope className="h-8 w-8 text-starlight" />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-full bg-nebula/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-nebula-glow">Program 02</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-starlight md:text-3xl">Atheris Research Project</h3>
                </div>
              </div>

              <p className="mb-8 max-w-3xl leading-relaxed text-starlight/60">
                A collaborative research initiative aimed at publishing scientific research papers through specialized, multidisciplinary teams.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {atherisTeams.map((team) => (
                  <div key={team.name} className="glass rounded-2xl p-5 transition-all duration-300 hover:glass-nebula flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-nebula">
                      <team.icon className="h-5 w-5 text-nebula-glow" />
                    </div>
                    <p className="text-sm font-medium text-starlight/80">{team.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
