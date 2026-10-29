import { studioData } from '../../data/portfolioData';
import { Github, Linkedin, ExternalLink, Terminal, Code2 } from 'lucide-react';

export default function Founders3D() {
  const { founders } = studioData;

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md">
            <span className="text-studio-emerald">SCENE C</span>
            <span>// THE DUAL CORES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
            SMALL TEAM. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">
              BIG IDEAS.
            </span>
          </h2>

          <p className="text-sm font-mono text-studio-secondary">
            &ldquo;Two minds. One vision. Building what&apos;s next.&rdquo; Synchronized 3D crystalline nodes representing the founders.
          </p>
        </div>

        {/* Dual Founder Dossiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {founders.map((founder, idx) => (
            <div
              key={founder.name}
              className="pointer-events-auto group relative rounded-3xl bg-studio-charcoal/90 backdrop-blur-xl border-2 border-studio-panelBorder p-6 sm:p-8 transition-all duration-300 hover:border-studio-emerald/60 hover:shadow-glow-emerald"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-studio-panelBorder">
                <span className="text-xs font-mono font-bold text-studio-lime">
                  CORE NODE 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-studio-forest text-studio-mint border border-studio-emerald/30">
                  CO-FOUNDER
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-studio-text">
                    {founder.name}
                  </h3>
                  <div className="text-xs font-mono font-bold text-studio-lime mt-1">
                    {founder.role}
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                  {founder.bio}
                </p>

                {/* Tech Pills */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono text-studio-muted mb-2">TECHNICAL FOCUS</div>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-studio-forest border border-studio-panelBorder text-studio-mint"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Verification Buttons */}
                <div className="pt-4 border-t border-studio-panelBorder flex items-center justify-between">
                  <span className="text-[11px] font-mono text-studio-muted">
                    Verified Channels
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-lime hover:border-studio-lime transition-all"
                      aria-label={`${founder.name}'s GitHub Profile`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-emerald hover:border-studio-emerald transition-all"
                      aria-label={`${founder.name}'s LinkedIn Profile`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
