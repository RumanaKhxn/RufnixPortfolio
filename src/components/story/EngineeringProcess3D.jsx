import { useState } from 'react';
import { Layers, Database, Server, Layout, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

export default function EngineeringProcess3D() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(3);

  const layers = [
    {
      id: 'data',
      number: '01',
      title: 'Data Architecture',
      badge: 'Database & Storage',
      icon: Database,
      technologies: ['SQL Server', 'MongoDB', 'MySQL'],
      description: 'Structured relational schemas, document models, automated transactions, and optimized database indices.'
    },
    {
      id: 'backend',
      number: '02',
      title: 'Backend & APIs',
      badge: 'Server Runtime',
      icon: Server,
      technologies: ['Node.js', 'Express.js', 'C#', '.NET'],
      description: 'Resilient RESTful APIs, multi-tenant security layers, asynchronous micro-services, and business logic execution.'
    },
    {
      id: 'integration',
      number: '03',
      title: 'Integration Mesh',
      badge: 'APIs & AI Streams',
      icon: Cpu,
      technologies: ['Groq AI', 'REST APIs', 'Postman', 'Webhooks'],
      description: 'Third-party payment gateways, real-time AI prompt streaming, identity providers, and event orchestration.'
    },
    {
      id: 'frontend',
      number: '04',
      title: 'Frontend Systems',
      badge: 'Interactive Client',
      icon: Layout,
      technologies: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS'],
      description: 'High-speed component architectures, responsive layouts, client-side state caching, and fluid animations.'
    },
    {
      id: 'design',
      number: '05',
      title: 'Design & UI/UX',
      badge: 'Human Interface',
      icon: Sparkles,
      technologies: ['Modern CSS', 'Figma', 'Micro-interactions'],
      description: 'Futuristic design systems, accessible typography hierarchy, dark cinematic atmospheres, and seamless user flows.'
    }
  ];

  return (
    <section
      id="process"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Exploded Layers Selector */}
        <div className="lg:col-span-5 pointer-events-auto space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint">
              <span className="text-studio-emerald">SCENE B</span>
              <span>// ENGINEERING PROCESS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
              EXPLODING THE <br />
              <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">
                ARCHITECTURE.
              </span>
            </h2>

            <p className="text-sm font-mono text-studio-secondary leading-relaxed">
              As you scroll through our digital pipeline, the core monolithic structure separates into independent 3D architectural planes. Explore each layer below.
            </p>
          </div>

          {/* Layer Selector Stack */}
          <div className="space-y-2 pt-2">
            {layers.map((layer, idx) => {
              const isSelected = activeLayerIndex === idx;
              const Icon = layer.icon;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-studio-forest/90 border-studio-lime shadow-glow-subtle'
                      : 'bg-studio-charcoal/80 border-studio-panelBorder hover:border-studio-emerald/40 hover:bg-studio-forest/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-studio-black text-studio-lime' : 'bg-studio-forest/60 text-studio-muted'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-mono font-bold ${isSelected ? 'text-studio-text' : 'text-studio-secondary'}`}>
                        {layer.number} &mdash; {layer.title}
                      </div>
                      <div className="text-[10px] font-mono text-studio-muted">
                        {layer.badge}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-studio-lime/20 text-studio-lime' : 'text-studio-muted'
                  }`}>
                    {isSelected ? 'ACTIVE LAYER' : 'INSPECT'}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Layer Detail Dossier */}
        <div className="lg:col-span-7 pointer-events-auto">
          <div className="rounded-2xl bg-studio-charcoal/90 backdrop-blur-xl border-2 border-studio-panelBorder p-6 sm:p-8 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-studio-panelBorder">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-studio-emerald animate-pulse" />
                <span className="font-mono text-xs font-bold text-studio-lime uppercase tracking-wider">
                  LAYER {layers[activeLayerIndex].number} TELEMETRY
                </span>
              </div>
              <span className="text-[10px] font-mono text-studio-muted">
                3D COUPLING ACTIVE
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-sans text-studio-text">
                {layers[activeLayerIndex].title}
              </h3>

              <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                {layers[activeLayerIndex].description}
              </p>

              <div className="pt-2">
                <div className="text-[11px] font-mono text-studio-muted uppercase mb-2">
                  Verified Technologies & Frameworks
                </div>
                <div className="flex flex-wrap gap-2">
                  {layers[activeLayerIndex].technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-studio-forest border border-studio-emerald/40 text-studio-mint flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-studio-lime" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-studio-forest/40 border border-studio-panelBorder text-[11px] font-mono text-studio-muted flex items-center justify-between">
                <span>Synchronized with 3D WebGL layer stack</span>
                <span className="text-studio-emerald font-bold">&bull; 60 FPS Engine</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
