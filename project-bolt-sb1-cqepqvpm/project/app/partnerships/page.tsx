import { Award, BadgeCheck, UserCheck, Users, FlaskConical, Globe2 } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { PageHeading } from '@/components/page-heading';

export default function PartnershipsPage() {
  return (
    <SiteShell>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeading eyebrow="Partnerships" title="Official Partners" description="Our collaborations with organizations that share our mission of advancing space science education and research." />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* IAAC */}
            <div className="relative glass-strong rounded-3xl p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nebula/10 via-transparent to-transparent" />
              <div className="absolute top-0 left-1/2 h-1 w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-nebula-glow to-transparent" />

              <div className="relative">
                <div className="mb-8 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-nebula-glow/20 blur-2xl rounded-full animate-pulse-glow" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-nebula to-nebula-dark glow-purple-strong">
                      <Award className="h-12 w-12 text-starlight" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-starlight">International Astronomy and Astrophysics Competition (IAAC)</h3>
                  <p className="text-sm text-starlight/40">Global astronomy and astrophysics competition</p>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-nebula">
                      <BadgeCheck className="h-5 w-5 text-nebula-glow" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-display font-semibold text-starlight">Officially Registered Institute</h4>
                      <p className="text-sm leading-relaxed text-starlight/50">Arthur For Space Sciences Ltd is an officially registered institute with IAAC.</p>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-nebula">
                      <UserCheck className="h-5 w-5 text-nebula-glow" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-display font-semibold text-starlight">CEO as IAAC Ambassador</h4>
                      <p className="text-sm leading-relaxed text-starlight/50">Our CEO serves as an official IAAC Ambassador.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* StemMed */}
            <div className="relative glass-strong rounded-3xl p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nebula-light/10 via-transparent to-transparent" />
              <div className="absolute top-0 left-1/2 h-1 w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-nebula-glow to-transparent" />

              <div className="relative">
                <div className="mb-8 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-nebula-glow/20 blur-2xl rounded-full animate-pulse-glow" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-nebula-light to-nebula glow-purple-strong">
                      <Globe2 className="h-12 w-12 text-starlight" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-starlight">StemMed</h3>
                  <p className="text-sm text-starlight/40">US-based STEM education non-profit organization</p>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-nebula">
                      <Users className="h-5 w-5 text-nebula-glow" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-display font-semibold text-starlight">STEM Education Non-Profit</h4>
                      <p className="text-sm leading-relaxed text-starlight/50">A US-based STEM education non-profit organization.</p>
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-nebula">
                      <FlaskConical className="h-5 w-5 text-nebula-glow" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-display font-semibold text-starlight">Atheris Research Project</h4>
                      <p className="text-sm leading-relaxed text-starlight/50">We collaborate on the Atheris Research Project to drive youth-led scientific research.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
