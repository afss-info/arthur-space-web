import { Hash, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-space-dark">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-dashed border-nebula-light/60 text-[8px] font-semibold uppercase tracking-[0.14em] text-nebula-glow">AFSS Logo</div>
            <div className="font-display text-sm font-bold text-starlight">Arthur For Space Sciences Ltd</div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-starlight/45">A non-profit scientific institution and a global space community for enthusiasts.</p>
          <div className="mt-6 space-y-3 text-sm text-starlight/55">
            <a className="flex items-center gap-3 transition-colors hover:text-nebula-glow" href="mailto:info@arthurforspacesciences.org.uk"><Mail className="h-4 w-4 text-nebula-glow" />info@arthurforspacesciences.org.uk</a>
            <a className="flex items-center gap-3 transition-colors hover:text-nebula-glow" href="tel:+447466588897"><Phone className="h-4 w-4 text-nebula-glow" />+44 746 658 8897</a>
            <div className="flex items-center gap-3"><Instagram className="h-4 w-4 text-nebula-glow" />@afss.ofcl</div>
            <div className="flex items-center gap-3"><Linkedin className="h-4 w-4 text-nebula-glow" />Coming Soon</div>
          </div>
        </div>
        <div>
          <h2 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-starlight">Legal transparency</h2>
          <div className="space-y-4 text-sm leading-6 text-starlight/55">
            <div className="flex items-start gap-3"><Hash className="mt-1 h-4 w-4 shrink-0 text-nebula-glow" /><span>Company Number: 17452506</span></div>
            <div className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-nebula-glow" /><span>182-184 High Street North,<br />East Ham, London, E6 2JA.</span></div>
          </div>
        </div>
        <div>
          <h2 className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-starlight">Legal status</h2>
          <p className="text-sm leading-7 text-starlight/55">Private Limited Company by Guarantee, officially registered in the United Kingdom.</p>
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-6 py-5 text-center text-xs text-starlight/35">Arthur For Space Sciences Ltd · Company Number 17452506</div>
    </footer>
  );
}
