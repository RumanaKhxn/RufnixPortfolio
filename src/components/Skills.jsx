import { useState } from 'react';
import { studioData } from '../data/portfolioData';
import { 
  Layout, 
  Server, 
  Database, 
  Terminal, 
  Cpu, 
  Code, 
  CheckCircle2 
} from 'lucide-react';

export default function Skills() {
  const { skillCategories } = studioData;
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Icon mapping
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  // Full ticker list
  const allTechs = skillCategories.flatMap(c => c.technologies);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-studio-charcoal/40 overflow-hidden border-t border-studio-panelBorder">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-studio-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint">
            <span className="text-studio-emerald">&lt;&gt;</span>
            <span>TECHNOLOGY STACK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
            THE TOOLS BEHIND <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">THE IDEAS.</span>
          </h2>

          <p className="text-base sm:text-lg text-studio-secondary max-w-2xl font-mono">
            We build solutions using modern, production-tested technologies across the full stack. No inflated claims — only tools we actively develop with.
          </p>
        </div>

        {/* Dynamic Skills Marquee / Ticker */}
        <div className="relative w-full overflow-hidden py-3 mb-12 rounded-xl bg-studio-forest/40 border border-studio-panelBorder">
          <div className="flex whitespace-nowrap animate-marquee">
            {allTechs.concat(allTechs).map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className="inline-flex items-center gap-2 px-5 text-xs font-mono tracking-wider text-studio-secondary hover:text-studio-lime transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-studio-emerald" />
                {tech}
                <span className="text-studio-panelBorder pl-3">|</span>
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Category Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {skillCategories.map((cat, index) => {
            const isSelected = selectedCategory === index;
            return (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(index)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                  isSelected
                    ? 'bg-studio-forest border-studio-emerald shadow-glow-subtle'
                    : 'bg-studio-charcoal/80 border-studio-panelBorder hover:border-studio-panelBorder/80 text-studio-secondary'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'text-studio-lime bg-studio-black' : 'text-studio-muted bg-studio-forest/50'}`}>
                  {getIcon(cat.icon)}
                </div>
                <div>
                  <div className={`text-xs font-mono font-bold ${isSelected ? 'text-studio-text' : 'text-studio-secondary'}`}>
                    {cat.title}
                  </div>
                  <div className="text-[10px] font-mono text-studio-muted">
                    {cat.technologies.length} Verified Tools
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill Matrix Display */}
        <div className="rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-studio-panelBorder gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-emerald">
                {getIcon(skillCategories[selectedCategory].icon)}
              </div>
              <div>
                <h3 className="text-xl font-bold font-sans text-studio-text">
                  {skillCategories[selectedCategory].title}
                </h3>
                <p className="text-xs font-mono text-studio-secondary">
                  Production-grade tools leveraged for Rufnix Studio applications
                </p>
              </div>
            </div>

            <div className="px-3 py-1 rounded-md bg-studio-forest border border-studio-panelBorder text-xs font-mono text-studio-mint">
              Active Category 0{selectedCategory + 1} / 0{skillCategories.length}
            </div>
          </div>

          {/* Technology Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skillCategories[selectedCategory].technologies.map((tech) => (
              <div
                key={tech}
                className="group p-4 rounded-xl bg-studio-forest/40 border border-studio-panelBorder hover:border-studio-emerald/50 hover:bg-studio-forest/80 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-studio-muted">STACK</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-studio-emerald opacity-60 group-hover:opacity-100 group-hover:text-studio-lime transition-all" />
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-studio-text group-hover:text-studio-mint transition-colors">
                  {tech}
                </div>
                <div className="text-[10px] font-mono text-studio-secondary mt-1">
                  Rufnix Verified Tool
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
