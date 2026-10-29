import { useState } from 'react';
import { studioData } from '../data/portfolioData';
import { 
  Code2, 
  Eye, 
  ExternalLink, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Cpu,
  Server
} from 'lucide-react';

export default function Projects() {
  const { projects } = studioData;
  const [activeTabByProject, setActiveTabByProject] = useState({});

  const toggleTab = (projectId, tab) => {
    setActiveTabByProject(prev => ({
      ...prev,
      [projectId]: tab
    }));
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-studio-black overflow-hidden border-t border-studio-panelBorder">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-studio-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-studio-lime/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint">
            <span className="text-studio-emerald">&lt;/&gt;</span>
            <span>PORTFOLIO SHOWCASE</span>
            <span className="text-studio-emerald">&lt;/&gt;</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
            PROJECTS THAT <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">SPEAK.</span>
          </h2>

          <p className="text-base sm:text-lg text-studio-secondary max-w-2xl font-mono">
            Direct insight into software applications and architectures we build. Toggle between visual preview and code logic for genuine technical verification.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const currentTab = activeTabByProject[project.id] || 'preview';

            return (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder overflow-hidden transition-all duration-300 hover:border-studio-emerald/50 hover:shadow-glow-emerald"
              >
                {/* macOS / IDE Terminal Titlebar */}
                <div className="px-4 py-2.5 bg-studio-forest/70 border-b border-studio-panelBorder flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-studio-emerald" />
                    <span className="ml-1 text-[11px] font-mono text-studio-muted truncate max-w-[140px]">
                      {project.codeFilename}
                    </span>
                  </div>

                  {/* Toggle Preview / Code Buttons */}
                  <div className="flex items-center bg-studio-black/80 rounded-lg p-0.5 border border-studio-panelBorder">
                    <button
                      onClick={() => toggleTab(project.id, 'preview')}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-colors ${
                        currentTab === 'preview'
                          ? 'bg-studio-forest text-studio-lime font-bold'
                          : 'text-studio-secondary hover:text-studio-text'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>UI</span>
                    </button>
                    <button
                      onClick={() => toggleTab(project.id, 'code')}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-colors ${
                        currentTab === 'code'
                          ? 'bg-studio-forest text-studio-emerald font-bold'
                          : 'text-studio-secondary hover:text-studio-text'
                      }`}
                    >
                      <Code2 className="w-3 h-3" />
                      <span>Code</span>
                    </button>
                  </div>
                </div>

                {/* Card Media / Code Area */}
                <div className="relative aspect-[16/10] bg-studio-black overflow-hidden border-b border-studio-panelBorder flex items-center justify-center">
                  
                  {currentTab === 'preview' ? (
                    project.hasGenuineImage ? (
                      <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={project.image}
                          alt={`${project.title} Interface Preview`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-studio-black/70 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      /* Verified Architectural Blueprint Placeholder for projects without raw screenshots */
                      <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-studio-forest/40 to-studio-black relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
                        <div className="flex items-center justify-between text-[10px] font-mono text-studio-mint z-10">
                          <span className="flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-studio-lime" />
                            ARCHITECTURE SCHEMATIC
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-studio-forest border border-studio-panelBorder text-studio-secondary">
                            CONCEPTUAL BLUEPRINT
                          </span>
                        </div>

                        <div className="z-10 text-center my-auto space-y-1">
                          <div className="font-mono text-sm font-bold text-studio-text">
                            {project.title}
                          </div>
                          <div className="text-[11px] font-mono text-studio-secondary max-w-xs mx-auto">
                            System design & database schema configured
                          </div>
                        </div>

                        <div className="z-10 flex items-center justify-between text-[9px] font-mono text-studio-muted border-t border-studio-panelBorder pt-2">
                          <span>Rufnix Design Lab</span>
                          <span className="text-studio-emerald font-bold">● Validated Spec</span>
                        </div>
                      </div>
                    )
                  ) : (
                    /* Code Snippet Tab */
                    <div className="w-full h-full p-3.5 bg-[#050d08] text-studio-mint font-mono text-[10.5px] leading-relaxed overflow-x-auto select-all">
                      <pre className="text-studio-secondary font-mono">
                        <code>{project.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Status Overlay Badge */}
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md ${
                      project.status === 'In Development'
                        ? 'bg-studio-charcoal/90 text-studio-lime border-studio-lime/50'
                        : project.status === 'Active Project'
                        ? 'bg-studio-charcoal/90 text-studio-emerald border-studio-emerald/50'
                        : 'bg-studio-charcoal/90 text-studio-mint border-studio-mint/50'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold font-sans text-studio-text group-hover:text-studio-mint transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono text-studio-muted">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-studio-secondary line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Stack Tags */}
                  <div className="space-y-3 pt-2 border-t border-studio-panelBorder">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-studio-forest/70 border border-studio-panelBorder text-studio-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between pt-1">
                      {project.primaryAction && project.primaryAction.url ? (
                        <a
                          href={project.primaryAction.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-studio-lime hover:text-studio-mint transition-colors"
                        >
                          <span>{project.primaryAction.label}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-studio-muted flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-studio-emerald" />
                          <span>Rufnix Studio Engine</span>
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-studio-muted">
                        DEV VERIFIED
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
