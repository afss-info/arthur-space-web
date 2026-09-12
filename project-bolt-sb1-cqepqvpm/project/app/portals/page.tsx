import { GraduationCap, Users, Lock, User, ArrowRight } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { PageHeading } from '@/components/page-heading';

export default function PortalsPage() {
  return (
    <SiteShell>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeading eyebrow="Portals" title="Command Center" description="Access your designated portal. Students and mentors each have separate login interfaces with their assigned credentials." />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Student Portal */}
            <div className="relative glass-strong rounded-3xl p-8 md:p-10 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-nebula/15 blur-[100px]" />
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula to-nebula-dark glow-purple">
                    <GraduationCap className="h-7 w-7 text-starlight" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-starlight">Student Portal</h3>
                    <p className="text-sm text-nebula-glow/80">For enrolled students</p>
                  </div>
                </div>

                <div className="mb-6 glass rounded-2xl p-4">
                  <p className="text-sm leading-relaxed text-starlight/50">
                    Students must log in using their designated Student ID and the password sent to their registered email upon site activation.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-starlight/30" />
                    <input type="text" placeholder="Student ID" className="w-full rounded-2xl glass py-4 pl-12 pr-4 text-starlight placeholder:text-starlight/30 focus:glass-nebula focus:outline-none transition-all duration-300" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-starlight/30" />
                    <input type="password" placeholder="Password" className="w-full rounded-2xl glass py-4 pl-12 pr-4 text-starlight placeholder:text-starlight/30 focus:glass-nebula focus:outline-none transition-all duration-300" />
                  </div>
                  <button type="button" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-nebula via-nebula-light to-nebula px-8 py-4 text-base font-medium text-starlight transition-all duration-500 glow-purple hover:glow-purple-strong">
                    Login <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>

            {/* Mentor/Coach Portal */}
            <div className="relative glass-strong rounded-3xl p-8 md:p-10 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-nebula-light/10 blur-[100px]" />
              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-nebula-light to-nebula glow-purple">
                    <Users className="h-7 w-7 text-starlight" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-starlight">Mentor/Coach Portal</h3>
                    <p className="text-sm text-nebula-glow/80">For assigned mentors and coaches</p>
                  </div>
                </div>

                <div className="mb-6 glass rounded-2xl p-4">
                  <p className="text-sm leading-relaxed text-starlight/50">
                    Mentors must log in using their designated Mentor ID and the password provided via email.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-starlight/30" />
                    <input type="text" placeholder="Mentor ID" className="w-full rounded-2xl glass py-4 pl-12 pr-4 text-starlight placeholder:text-starlight/30 focus:glass-nebula focus:outline-none transition-all duration-300" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-starlight/30" />
                    <input type="password" placeholder="Password" className="w-full rounded-2xl glass py-4 pl-12 pr-4 text-starlight placeholder:text-starlight/30 focus:glass-nebula focus:outline-none transition-all duration-300" />
                  </div>
                  <button type="button" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-nebula-light via-nebula to-nebula-dark px-8 py-4 text-base font-medium text-starlight transition-all duration-500 glow-purple hover:glow-purple-strong">
                    Login <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
