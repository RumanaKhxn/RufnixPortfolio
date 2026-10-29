import { useState } from 'react';
import { studioData } from '../../data/portfolioData';
import { Eye, Code2, ExternalLink, Sparkles, ChevronRight, Layers, Cpu } from 'lucide-react';

export default function ProjectsOrbit3D({ activeProjectId, onSelectProject }) {
  const { projects } = studioData;
  const [viewMode, setViewMode] = useState('ui'); // 'ui' | 'code'

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 z-10 pointer-events-none flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D Orbit Selector & Gallery HUD */}
        <div className="lg:col-span-5 pointer-events-auto space-y-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint">
              <span className="text-studio-emerald">SCENE D</span>
              <span>// 3D SPATIAL ORBIT GALLERY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
              PROJECTS IN <br />
              <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">
                ORBIT.
              </span>
            </h2>

            <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
              Select any project from the spatial orbit. The Three.js camera and corresponding 3D panel will glide into the foreground focus position.
            </p>
          </div>

          {/* Project List Selector */}
          <div className="space-y-2">
            {projects.map((proj) => {
              const isSelected = proj.id === activeProject.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj.id)}
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-studio-forest/90 border-studio-lime shadow-glow-subtle'
                      : 'bg-studio-charcoal/80 border-studio-panelBorder hover:border-studio-emerald/40 hover:bg-studio-forest/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-studio-lime animate-ping' : 'bg-studio-muted'}`} />
                    <div>
                      <div className={`text-xs font-mono font-bold ${isSelected ? 'text-studio-text' : 'text-studio-secondary'}`}>
                        {proj.title}
                      </div>
                      <div className="text-[10px] font-mono text-studio-muted">
                        {proj.category}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    proj.status === 'In Development'
                      ? 'bg-studio-lime/20 text-studio-lime font-bold'
                      : 'bg-studio-forest text-studio-mint'
                  }`}>
                    {proj.status}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Project Inspector Card */}
        <div className="lg:col-span-7 pointer-events-auto">
          <div className="rounded-3xl bg-studio-charcoal/95 backdrop-blur-xl border-2 border-studio-panelBorder p-6 sm:p-8 shadow-2xl relative space-y-5">
            
            {/* Header: File path & View Switcher */}
            <div className="flex items-center justify-between pb-4 border-b border-studio-panelBorder">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-studio-emerald" />
                <span className="ml-1 text-xs font-mono text-studio-mint truncate max-w-[200px]">
                  {activeProject.codeFilename}
                </span>
              </div>

              {/* Toggle UI / Code */}
              <div className="flex items-center bg-studio-black rounded-lg p-1 border border-studio-panelBorder">
                <button
                  type="button"
                  onClick={() => setViewMode('ui')}
                  className={`px-3 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    viewMode === 'ui' ? 'bg-studio-forest text-studio-lime font-bold' : 'text-studio-muted hover:text-studio-text'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>UI Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('code')}
                  className={`px-3 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    viewMode === 'code' ? 'bg-studio-forest text-studio-emerald font-bold' : 'text-studio-muted hover:text-studio-text'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Architecture</span>
                </button>
              </div>
            </div>

            {/* Media / Snippet Area */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-studio-black border border-studio-panelBorder">
              {viewMode === 'ui' ? (
                activeProject.hasGenuineImage ? (
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} Preview`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-studio-forest/30 text-center">
                    <div className="flex items-center justify-between text-[10px] font-mono text-studio-muted">
                      <span>RUFNIX LAB BLUEPRINT</span>
                      <span className="text-studio-lime font-bold">● SPEC VALIDATED</span>
                    </div>
                    <div className="my-auto space-y-1">
                      <div className="font-mono text-lg font-bold text-studio-text">{activeProject.title}</div>
                      <div className="text-xs font-mono text-studio-secondary max-w-sm mx-auto">
                        System design, schemas and data routing verified for implementation.
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-studio-muted">
                      Database & API Pipeline Configured
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full h-full p-4 bg-[#040a06] text-studio-mint font-mono text-xs overflow-auto select-all">
                  <pre>
                    <code>{activeProject.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Status Pill on Media */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-studio-black/90 backdrop-blur-md text-studio-lime border border-studio-lime/40">
                  {activeProject.status}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-studio-text">
                  {activeProject.title}
                </h3>
                <span className="text-xs font-mono text-studio-muted">
                  {activeProject.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                {activeProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded text-xs font-mono bg-studio-forest border border-studio-panelBorder text-studio-mint"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Primary Action */}
              <div className="pt-2 flex items-center justify-between">
                {activeProject.primaryAction && activeProject.primaryAction.url ? (
                  <a
                    href={activeProject.primaryAction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-studio-lime hover:text-studio-mint transition-colors"
                  >
                    <span>{activeProject.primaryAction.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-studio-muted">
                    Engineered within Rufnix Studio internal workspace
                  </span>
                )}

                <span className="text-[10px] font-mono text-studio-muted">
                  3D PANEL SYNCHRONIZED
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
