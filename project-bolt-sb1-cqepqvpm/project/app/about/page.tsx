import { Building2, Hash, MapPin, Users, Crown, FlaskConical } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { PageHeading } from '@/components/page-heading';

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeading eyebrow="About Us" title="The Genesis" description="Arthur For Space Sciences Ltd is a non-profit scientific institution and a global space community for enthusiasts, founded by dedicated scientists building a global space community.">
          </PageHeading>

          {/* Executive Team */}
          <div className="mb-16">
            <h2 className="mb-8 font-display text-2xl font-bold text-starlight">Executive Team</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { name: 'Jad Yassin', role: 'CEO & Founder', icon: Crown, desc: 'Description pending.' },
                { name: 'Laila Abou Alfadel', role: 'Co-Founder', icon: FlaskConical, desc: 'Description pending.' },
              ].map((member) => (
                <div key={member.name} className="group relative glass rounded-3xl p-8 transition-all duration-500 hover:glass-nebula overflow-hidden">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-nebula/20 blur-3xl transition-all duration-500 group-hover:bg-nebula/30" />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula to-nebula-dark glow-purple">
                        <member.icon className="h-7 w-7 text-starlight" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-starlight">{member.name}</h3>
                        <p className="text-sm text-nebula-glow/80">{member.role}</p>
                      </div>
                    </div>
                    <p className="leading-relaxed text-starlight/50">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Entity */}
          <div className="relative glass-strong rounded-3xl p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-nebula/10 via-transparent to-nebula/5" />
            <div className="absolute left-1/2 top-0 h-1 w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-nebula-glow to-transparent" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-nebula-glow">Legal Entity</span>
                <div className="h-px w-12 bg-gradient-to-r from-nebula-glow to-transparent" />
              </div>

              <h3 className="mb-4 text-center font-display text-2xl font-bold text-starlight md:text-3xl">Arthur For Space Sciences Ltd</h3>
              <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-starlight/60">
                Private Limited Company by Guarantee, officially registered in the United Kingdom.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="glass rounded-2xl p-6 text-center">
                  <Hash className="mx-auto mb-3 h-6 w-6 text-nebula-glow" />
                  <p className="mb-2 text-xs uppercase tracking-[0.15em] text-starlight/40">Company Number</p>
                  <p className="font-display text-lg font-bold text-starlight">17452506</p>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <MapPin className="mx-auto mb-3 h-6 w-6 text-nebula-glow" />
                  <p className="mb-2 text-xs uppercase tracking-[0.15em] text-starlight/40">Registered Address</p>
                  <p className="text-sm leading-relaxed text-starlight/80">182-184 High Street North<br />East Ham, London<br />E6 2JA</p>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <Building2 className="mx-auto mb-3 h-6 w-6 text-nebula-glow" />
                  <p className="mb-2 text-xs uppercase tracking-[0.15em] text-starlight/40">Legal Structure</p>
                  <p className="text-sm leading-relaxed text-starlight/80">Private Limited Company<br />by Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
