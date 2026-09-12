'use client';

import { useState } from 'react';
import { Search, Telescope, FileText, ExternalLink, Radio, Satellite, Newspaper } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { PageHeading } from '@/components/page-heading';

const agencies = [
  { name: 'NASA', desc: 'National Aeronautics and Space Administration', region: 'USA' },
  { name: 'ESA', desc: 'European Space Agency', region: 'Europe' },
  { name: 'JAXA', desc: 'Japan Aerospace Exploration Agency', region: 'Japan' },
  { name: 'CNSA', desc: 'China National Space Administration', region: 'China' },
];

const papers = [
  { title: 'James Webb Space Telescope: Latest Deep Field Observations', source: 'NASA', date: '2026-09-08', tag: 'Astrophysics' },
  { title: 'ESA Mars Express: Subsurface Ice Mapping Results', source: 'ESA', date: '2026-09-05', tag: 'Planetary Science' },
  { title: 'JAXA SLIM Mission: Precision Landing Data Analysis', source: 'JAXA', date: '2026-09-02', tag: 'Space Engineering' },
  { title: "CNSA Chang'e Mission: Lunar Regolith Sample Studies", source: 'CNSA', date: '2026-08-28', tag: 'Lunar Science' },
  { title: 'Gravitational Wave Detection: New Binary System Catalog', source: 'NASA', date: '2026-08-25', tag: 'Cosmology' },
  { title: 'Solar Wind Interaction with Mercury Magnetosphere', source: 'ESA', date: '2026-08-20', tag: 'Heliophysics' },
];

export default function SpaceResearchPage() {
  const [query, setQuery] = useState('');

  const filtered = papers.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.source.toLowerCase().includes(query.toLowerCase()) ||
    p.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SiteShell>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PageHeading eyebrow="Space Research" title="Global Space Radar" description="A dedicated hub to display the latest published research and news from global space agencies (NASA, ESA, JAXA, CNSA) via feeds/APIs, and major scientific paper databases." />

          {/* Search bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-starlight/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Database"
                className="w-full rounded-2xl glass-strong py-4 pl-14 pr-4 text-starlight placeholder:text-starlight/30 focus:glass-nebula focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Agency cards */}
          <div className="mb-12">
            <h2 className="mb-6 font-display text-xl font-bold text-starlight">Tracked Agencies</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agencies.map((agency) => (
                <div key={agency.name} className="group glass rounded-2xl p-5 transition-all duration-300 hover:glass-nebula">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nebula/20 to-nebula-dark/20 border border-nebula/20">
                      <Satellite className="h-5 w-5 text-nebula-glow" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-starlight">{agency.name}</h3>
                      <p className="text-xs text-starlight/40">{agency.region}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-starlight/50">{agency.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Research papers */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Newspaper className="h-5 w-5 text-nebula-glow" />
              <h2 className="font-display text-xl font-bold text-starlight">Latest Research &amp; News</h2>
            </div>

            {filtered.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Search className="mx-auto mb-4 h-8 w-8 text-starlight/20" />
                <p className="text-starlight/40">No results found for &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((paper, i) => (
                  <div key={i} className="group glass rounded-2xl p-6 transition-all duration-300 hover:glass-nebula">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-nebula/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-nebula-glow">{paper.tag}</span>
                      <span className="flex items-center gap-1.5 text-xs text-starlight/40">
                        <Radio className="h-3 w-3" /> {paper.source}
                      </span>
                    </div>
                    <h3 className="mb-3 font-display text-base font-semibold leading-snug text-starlight group-hover:text-glow-soft transition-all">{paper.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-starlight/40">{paper.date}</span>
                      <button className="flex items-center gap-1 text-xs text-nebula-glow opacity-0 transition-opacity group-hover:opacity-100">
                        <FileText className="h-3.5 w-3.5" /> View <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info banner */}
          <div className="mt-12 glass rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <Telescope className="mt-1 h-5 w-5 shrink-0 text-nebula-glow" />
              <p className="text-sm leading-relaxed text-starlight/50">
                The Global Space Radar aggregates publicly available research publications and news from NASA, ESA, JAXA, and CNSA. Use the search field above to query the database by title, agency, or scientific field.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
