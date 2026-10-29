import { studioData } from '../data/portfolioData';
import { Github, Linkedin, ExternalLink, Code2, Sparkles, Terminal } from 'lucide-react';

export default function About() {
  const { founders } = studioData;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-studio-black overflow-hidden border-t border-studio-panelBorder">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-studio-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-studio-lime/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint">
            <span className="text-studio-emerald">&lt;/&gt;</span>
            <span>ABOUT THE STUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
            SMALL TEAM. <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">BIG IDEAS.</span>
          </h2>

          <p className="text-base sm:text-lg text-studio-secondary max-w-2xl font-mono">
            Rufnix Studio is a dedicated developer duo focused on creating useful software, modern interfaces, and thoughtfully engineered digital products.
          </p>

          <div className="p-3 rounded-xl bg-studio-charcoal/80 border border-studio-panelBorder text-xs font-mono text-studio-mint">
            &ldquo;Two minds. One vision. Building what&apos;s next.&rdquo;
          </div>
        </div>

        {/* Founder Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {founders.map((founder, idx) => (
            <div
              key={founder.name}
              className="group relative rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 sm:p-8 transition-all duration-300 hover:border-studio-emerald/50 hover:shadow-glow-emerald"
            >
              {/* Corner Decorative Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-3 bg-gradient-to-l from-studio-emerald/40 to-transparent transform rotate-45 translate-x-12 -translate-y-6" />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-studio-panelBorder">
                
                {/* Reserved Elegant Monogram Avatar Area */}
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-studio-forest to-studio-black border-2 border-studio-emerald/40 p-1 flex items-center justify-center shadow-panel group-hover:border-studio-lime transition-colors">
                  <div className="w-full h-full rounded-xl bg-studio-charcoal flex flex-col items-center justify-center">
                    <span className="font-mono text-xl font-bold bg-gradient-to-br from-studio-emerald to-studio-lime bg-clip-text text-transparent">
                      {founder.avatarCode}
                    </span>
                    <span className="text-[9px] font-mono text-studio-muted">DEV</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-studio-emerald border-2 border-studio-black flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-studio-black" />
                  </div>
                </div>

                {/* Founder Title & Role */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-studio-text tracking-wide font-sans">
                      {founder.name}
                    </h3>
                  </div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-studio-forest border border-studio-panelBorder text-xs font-mono font-medium text-studio-lime">
                    {founder.role}
                  </div>
                  <p className="text-xs font-mono text-studio-secondary pt-1">
                    Co-Founder, Rufnix Studio
                  </p>
                </div>

              </div>

              {/* Bio & Focus */}
              <div className="py-5 space-y-4">
                <p className="text-sm font-mono text-studio-secondary leading-relaxed">
                  {founder.bio}
                </p>

                {/* Core Focus Tech Stack Pills */}
                <div>
                  <div className="text-[11px] font-mono font-semibold text-studio-mint mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-studio-emerald" />
                    <span>TECHNICAL FOCUS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {founder.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-studio-forest/60 border border-studio-panelBorder text-studio-text group-hover:border-studio-emerald/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Channels / External Profiles */}
              <div className="pt-4 border-t border-studio-panelBorder flex items-center justify-between">
                <span className="text-xs font-mono text-studio-muted">
                  Connect & Verify
                </span>
                
                <div className="flex items-center gap-3">
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-lime hover:border-studio-lime transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-lime"
                    aria-label={`${founder.name}'s GitHub Profile`}
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-emerald hover:border-studio-emerald transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-emerald"
                    aria-label={`${founder.name}'s LinkedIn Profile`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
