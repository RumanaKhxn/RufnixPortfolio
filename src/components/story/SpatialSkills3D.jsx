import { useState } from 'react';
import { studioData } from '../../data/portfolioData';
import { Layout, Server, Database, Terminal, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SpatialSkills3D() {
  const { skillCategories } = studioData;
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const activeCategory = skillCategories[activeGroupIndex];

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint backdrop-blur-md shadow-glow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-studio-lime" />
            <span>SPATIAL TECHNOLOGY VISUALIZATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
            THE TOOLS BEHIND <br />
            <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">
              THE IDEAS.
            </span>
          </h2>

          <p className="text-xs sm:text-sm font-mono text-studio-secondary">
            Verified technologies orchestrated across the full stack. Select a technology cluster to transform the spatial matrix.
          </p>
        </div>

        {/* Spatial Group Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          {skillCategories.map((cat, idx) => {
            const isSelected = activeGroupIndex === idx;
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => setActiveGroupIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-studio-forest border-studio-lime text-studio-lime shadow-glow-emerald scale-105'
                    : 'bg-studio-charcoal/80 border-studio-panelBorder text-studio-secondary hover:text-studio-text hover:border-studio-emerald/50'
                }`}
              >
                <span>{getCategoryIcon(cat.icon)}</span>
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-studio-black text-studio-mint' : 'bg-studio-forest text-studio-muted'}`}>
                  {cat.technologies.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Spatial Transformation Grid & Orbiting Cards */}
        <div className="pointer-events-auto max-w-5xl mx-auto">
          <div className="rounded-3xl bg-studio-charcoal/90 backdrop-blur-xl border-2 border-studio-panelBorder p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-panelBorder gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-studio-forest border border-studio-panelBorder text-studio-lime">
                  {getCategoryIcon(activeCategory.icon)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-studio-text">
                    {activeCategory.title}
                  </h3>
                  <p className="text-xs font-mono text-studio-secondary">
                    Verified production tooling actively utilized in Rufnix Studio projects
                  </p>
                </div>
              </div>

              <div className="px-3 py-1 rounded-md bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-mint self-start sm:self-auto">
                Cluster 0{activeGroupIndex + 1} / 0{skillCategories.length}
              </div>
            </div>

            {/* Kinetic Skill Badges with 3D Depth Hover */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 relative z-10">
              {activeCategory.technologies.map((tech, idx) => (
                <div
                  key={tech}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="group relative p-5 rounded-2xl bg-studio-forest/40 border border-studio-panelBorder hover:border-studio-emerald hover:bg-studio-forest/80 hover:shadow-glow-subtle transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-studio-muted">SYS.0{idx + 1}</span>
                    <CheckCircle2 className="w-4 h-4 text-studio-emerald/50 group-hover:text-studio-lime group-hover:scale-110 transition-all" />
                  </div>

                  <div className="font-mono text-sm sm:text-base font-bold text-studio-text group-hover:text-studio-mint transition-colors">
                    {tech}
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-studio-muted group-hover:text-studio-secondary transition-colors">
                    Verified Deployment
                  </div>
                </div>
              ))}
            </div>

            {/* Telemetry Footer */}
            <div className="pt-4 border-t border-studio-panelBorder flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-studio-muted relative z-10">
              <span className="text-studio-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-studio-emerald animate-pulse" />
                <span>Zero Fabricated Percentages // 100% Genuine Stacks</span>
              </span>
              <span className="text-studio-mint font-semibold">
                React • .NET • Node.js • SQL
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
