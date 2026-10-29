import { useState } from 'react';
import { studioData } from '../../data/portfolioData';
import { Layout, Server, Database, Terminal, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ArchitectureChapter() {
  const { skillCategories } = studioData;
  const [activeDomain, setActiveDomain] = useState(0);

  const getDomainIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const domainDescriptions = [
    'Modular React SPA architectures, responsive CSS systems, client state management, and fluid motion design.',
    'Resilient RESTful APIs, asynchronous micro-services, multi-tenant security layers, and ASP.NET Core & Node.js runtimes.',
    'Optimized relational schemas with SQL Server & MySQL, and flexible JSON document models with MongoDB.',
    'Version control workflows, postman API contract testing, automated CI/CD builds, and VS Code optimization.'
  ];

  return (
    <section
      id="architecture"
      className="relative min-h-screen py-36 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl pointer-events-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md">
            <span className="text-studio-emerald">02</span>
            <span>/ CAPABILITIES &amp; ARCHITECTURE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-studio-text uppercase font-sans leading-[1.0]">
            ENGINEERED <br />
            <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">
              FROM CORE TO CLIENT.
            </span>
          </h2>

          <p className="text-sm sm:text-base font-mono text-studio-secondary leading-relaxed">
            Our capabilities are structured as coherent architectural layers &mdash; marrying resilient backend runtimes with high-performance interactive interfaces.
          </p>
        </div>

        {/* Spatial Architecture Domains */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pointer-events-auto">
          
          {/* Domain Tabs on Left */}
          <div className="lg:col-span-5 space-y-3">
            {skillCategories.map((cat, idx) => {
              const isSelected = activeDomain === idx;
              return (
                <div
                  key={cat.title}
                  onClick={() => setActiveDomain(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-studio-forest/90 border-studio-lime shadow-glow-emerald scale-[1.02]'
                      : 'bg-studio-charcoal/80 border-studio-panelBorder hover:border-studio-emerald/50 hover:bg-studio-forest/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isSelected ? 'bg-studio-black text-studio-lime' : 'bg-studio-forest text-studio-muted group-hover:text-studio-text'
                    }`}>
                      {getDomainIcon(cat.icon)}
                    </div>
                    <div>
                      <div className={`text-sm font-mono font-bold transition-colors ${
                        isSelected ? 'text-studio-text' : 'text-studio-secondary group-hover:text-studio-text'
                      }`}>
                        {cat.title}
                      </div>
                      <div className="text-[11px] font-mono text-studio-muted">
                        Layer 0{idx + 1} // {cat.technologies.length} Verified Toolings
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-studio-lime/20 text-studio-lime' : 'text-studio-muted'
                  }`}>
                    {isSelected ? 'INSPECTING' : 'VIEW'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Domain Telemetry & Stack Matrix on Right */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-studio-charcoal/95 backdrop-blur-xl border border-studio-panelBorder p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-studio-panelBorder">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-studio-emerald animate-pulse" />
                  <span className="font-mono text-xs font-bold text-studio-lime uppercase tracking-wider">
                    {skillCategories[activeDomain].title} Dossier
                  </span>
                </div>
                <span className="text-[10px] font-mono text-studio-muted">
                  RUFNIX PRODUCTION SPEC
                </span>
              </div>

              <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                {domainDescriptions[activeDomain]}
              </p>

              {/* Technologies in this Layer */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-mono text-studio-muted uppercase tracking-wider">
                  Verified Tools &amp; Frameworks
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skillCategories[activeDomain].technologies.map((t) => (
                    <div
                      key={t}
                      className="p-3.5 rounded-xl bg-studio-forest/50 border border-studio-panelBorder hover:border-studio-emerald transition-colors flex items-center justify-between"
                    >
                      <span className="font-mono text-xs font-bold text-studio-text">{t}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-studio-lime flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-studio-panelBorder flex items-center justify-between text-xs font-mono text-studio-muted">
                <span>Synchronized with 3D architectural planes</span>
                <span className="text-studio-emerald font-semibold">&bull; Clean Codebase</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
