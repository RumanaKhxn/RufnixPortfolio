import { studioData } from '../../data/portfolioData';
import { Github, Linkedin, Terminal, Sparkles, Code2, Cpu, ArrowUpRight } from 'lucide-react';

export default function FoundersChapter() {
  const { founders } = studioData;

  return (
    <section
      id="about"
      className="relative min-h-screen py-36 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl pointer-events-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md">
            <span className="text-studio-emerald">03</span>
            <span>/ THE FOUNDING ENGINEERS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-studio-text uppercase font-sans leading-[1.0]">
            TWO MINDS. <br />
            <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent">
              ONE SHARED VISION.
            </span>
          </h2>

          <p className="text-sm sm:text-base font-mono text-studio-secondary leading-relaxed max-w-2xl">
            We operate as an agile dual-engine software studio. When you work with Rufnix Studio, you partner directly with the engineers who design the system architecture and write every line of production code.
          </p>
        </div>

        {/* Asymmetrical Editorial Founder Dossiers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pointer-events-auto">
          {founders.map((founder, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={founder.name}
                className={`relative rounded-3xl bg-studio-charcoal/90 backdrop-blur-xl border border-studio-panelBorder p-7 sm:p-10 transition-all duration-300 hover:border-studio-emerald/70 hover:shadow-glow-emerald flex flex-col justify-between group ${
                  isFirst ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                {/* Subtle Neon Accents */}
                <div className="absolute top-0 right-10 w-24 h-24 bg-studio-emerald/5 rounded-full blur-2xl pointer-events-none group-hover:bg-studio-emerald/10 transition-colors" />

                <div className="space-y-6">
                  {/* Top HUD Pill */}
                  <div className="flex items-center justify-between pb-4 border-b border-studio-panelBorder">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
                      <span className="text-xs font-mono font-bold text-studio-lime">
                        ENGINEERING CORE // 0{idx + 1}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-studio-forest text-studio-mint border border-studio-emerald/30">
                      FOUNDER &bull; ACTIVE
                    </span>
                  </div>

                  {/* Name and Designation */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black font-sans text-studio-text tracking-tight group-hover:text-studio-mint transition-colors">
                      {founder.name}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono font-bold text-studio-emerald mt-1.5 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-studio-lime" />
                      <span>{founder.role}</span>
                    </div>
                  </div>

                  {/* Editorial Bio */}
                  <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                    {founder.bio}
                  </p>

                  {/* Core Technical Stack */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-mono text-studio-muted uppercase tracking-wider">
                      Specialized Toolchains
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {founder.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-studio-forest/70 border border-studio-panelBorder text-studio-text group-hover:border-studio-emerald/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Verified Social & Code Channels */}
                <div className="pt-6 mt-6 border-t border-studio-panelBorder flex items-center justify-between">
                  <span className="text-[11px] font-mono text-studio-muted">
                    Verified Channels
                  </span>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-lime hover:border-studio-lime transition-all flex items-center gap-1.5 text-xs font-mono"
                      aria-label={`${founder.name}'s GitHub Profile`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 text-studio-muted" />
                    </a>

                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-emerald hover:border-studio-emerald transition-all flex items-center gap-1.5 text-xs font-mono"
                      aria-label={`${founder.name}'s LinkedIn Profile`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 text-studio-muted" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Studio Philosophy Bar */}
        <div className="pointer-events-auto rounded-2xl bg-studio-forest/40 border border-studio-panelBorder p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-studio-secondary">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-studio-lime flex-shrink-0" />
            <span>
              Engineered with clean code principles, typed contract APIs, and uncompromising attention to detail.
            </span>
          </div>
          <span className="text-studio-emerald font-semibold whitespace-nowrap">
            &bull; No Outsourcing. Direct Craft.
          </span>
        </div>

      </div>
    </section>
  );
}
