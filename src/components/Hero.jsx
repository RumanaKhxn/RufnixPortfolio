import { useState, useEffect, useRef } from 'react';
import { studioData } from '../data/portfolioData';
import { 
  Zap, 
  ShieldCheck, 
  Layers, 
  Users, 
  ArrowRight, 
  Terminal, 
  Code2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 8, y: -16 });
  const [activeTab, setActiveTab] = useState('portfolio');
  const heroRef = useRef(null);

  useEffect(() => {
    // Only apply mouse parallax on non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Gentle responsive tilt angles
      setTilt({
        x: 6 - y * 14,
        y: -16 + x * 20,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 8, y: -16 });
    };

    const heroEl = heroRef.current;
    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-studio-black via-studio-charcoal to-studio-black"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-studio-emerald/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[32rem] h-[32rem] bg-studio-lime/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            
            {/* Monogram Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-studio-forest/90 border border-studio-panelBorder text-xs font-mono text-studio-mint">
              <span className="w-2 h-2 rounded-full bg-studio-lime animate-pulse" />
              <span className="text-studio-text tracking-widest font-semibold">RUFNIX STUDIO</span>
              <span className="text-studio-muted">|</span>
              <span className="text-studio-secondary">SOFTWARE STUDIO</span>
            </div>

            {/* Oversized Headline */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-studio-text uppercase font-sans">
                  WE BUILD
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold text-studio-emerald border border-studio-emerald/30 bg-studio-emerald/10">
                  &lt;/&gt;
                </span>
              </div>
              
              <h2 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight uppercase font-sans">
                <span className="bg-gradient-to-r from-studio-emerald via-studio-mint to-studio-lime bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,230,118,0.4)]">
                  DIGITAL
                </span>
              </h2>

              <h2 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-studio-text uppercase font-sans">
                EXPERIENCES.
              </h2>
            </div>

            {/* Tagline & Statement */}
            <div className="space-y-2 max-w-xl">
              <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-studio-lime uppercase">
                ENGINEERED BY IMAGINATION.
              </p>
              <p className="text-sm sm:text-base text-studio-secondary font-mono leading-relaxed">
                We design and develop thoughtful digital experiences, modern web applications, and software products built to solve real problems.
              </p>
              <p className="text-xs font-mono text-studio-muted">
                Founded by <span className="text-studio-mint">Rumana Khan</span> & <span className="text-studio-mint">Sayyeda Farnaaz</span> — Two minds. One vision. Building what's next.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-sm font-mono font-bold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime hover:shadow-glow-emerald transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-lime"
              >
                EXPLORE OUR WORK
              </a>

              <a
                href="#contact"
                className="group px-6 py-3 rounded-full text-sm font-mono font-semibold text-studio-text bg-studio-forest/80 border border-studio-emerald/40 hover:border-studio-lime hover:bg-studio-panel transition-all flex items-center gap-2"
              >
                <span>LET'S BUILD TOGETHER</span>
                <ArrowRight className="w-4 h-4 text-studio-lime group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 4 Feature Indicator Pills (Matching Reference Layout) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 w-full max-w-xl border-t border-studio-panelBorder">
              <div className="p-2.5 rounded-xl bg-studio-charcoal/80 border border-studio-panelBorder flex flex-col gap-1 hover:border-studio-emerald/40 transition-colors">
                <div className="flex items-center gap-1.5 text-studio-lime">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono font-bold">FAST & SCALABLE</span>
                </div>
                <span className="text-[10px] text-studio-secondary">High-speed React & APIs</span>
              </div>

              <div className="p-2.5 rounded-xl bg-studio-charcoal/80 border border-studio-panelBorder flex flex-col gap-1 hover:border-studio-emerald/40 transition-colors">
                <div className="flex items-center gap-1.5 text-studio-emerald">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono font-bold">CLEAN & SECURE</span>
                </div>
                <span className="text-[10px] text-studio-secondary">Structured practices</span>
              </div>

              <div className="p-2.5 rounded-xl bg-studio-charcoal/80 border border-studio-panelBorder flex flex-col gap-1 hover:border-studio-emerald/40 transition-colors">
                <div className="flex items-center gap-1.5 text-studio-mint">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono font-bold">MODERN STACK</span>
                </div>
                <span className="text-[10px] text-studio-secondary">React, Node.js & .NET</span>
              </div>

              <div className="p-2.5 rounded-xl bg-studio-charcoal/80 border border-studio-panelBorder flex flex-col gap-1 hover:border-studio-emerald/40 transition-colors">
                <div className="flex items-center gap-1.5 text-studio-lime">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono font-bold">CLIENT FOCUSED</span>
                </div>
                <span className="text-[10px] text-studio-secondary">Dedicated execution</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D LAPTOP & FLOATING DEVELOPER PANELS */}
          <div className="lg:col-span-6 relative flex items-center justify-center perspective-1000 py-8 lg:py-0">
            
            {/* Luminous Floor Reflection */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-studio-emerald/20 blur-2xl rounded-full pointer-events-none transform -rotate-x-60" />

            {/* FLOATING DEVELOPER PANEL 1: Terminal (Top Left) */}
            <div className="hidden sm:block absolute -top-4 -left-6 z-20 w-64 rounded-xl bg-studio-charcoal/95 backdrop-blur-md border border-studio-emerald/30 shadow-2xl p-3.5 transform -translate-y-2 hover:translate-y-0 transition-transform animate-float-slow">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-studio-panelBorder">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-studio-emerald" />
                </div>
                <span className="text-[10px] font-mono text-studio-muted">~/rufnix - bash</span>
              </div>
              <div className="font-mono text-xs space-y-1">
                <p className="text-studio-muted">$ whoami</p>
                <p className="text-studio-lime font-semibold">Rufnix Studio Developers</p>
                <p className="text-studio-muted">$ cat focus.txt</p>
                <p className="text-studio-mint text-[11px]">Full-Stack Web & Software</p>
                <div className="flex items-center gap-1 text-studio-emerald pt-1">
                  <span>$</span>
                  <span className="w-2 h-3.5 bg-studio-emerald animate-pulse inline-block" />
                </div>
              </div>
            </div>

            {/* FLOATING DEVELOPER PANEL 2: Founder Telemetry Card (Right Side) */}
            <div className="hidden md:block absolute -top-2 -right-4 z-20 w-72 rounded-xl bg-studio-charcoal/95 backdrop-blur-md border border-studio-panelBorder shadow-2xl p-4 transform translate-y-3 hover:translate-y-1 transition-transform animate-float-delayed">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-studio-panelBorder">
                <span className="text-[11px] font-mono font-bold text-studio-lime">Rufnix.Engineers()</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-studio-forest text-studio-emerald border border-studio-emerald/30">
                  Online
                </span>
              </div>
              <div className="font-mono text-[11px] text-studio-secondary space-y-1">
                <p><span className="text-studio-emerald">const</span> founders = [</p>
                <p className="pl-3 text-studio-text">&quot;Rumana Khan&quot;,</p>
                <p className="pl-3 text-studio-text">&quot;Sayyeda Farnaaz&quot;</p>
                <p>];</p>
                <p className="pt-1"><span className="text-studio-emerald">const</span> mission = <span className="text-studio-mint">&quot;Build What&apos;s Next&quot;</span>;</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-studio-panelBorder text-center">
                <div className="p-1.5 rounded-lg bg-studio-forest/60 border border-studio-panelBorder">
                  <div className="text-xs font-mono font-bold text-studio-lime">02</div>
                  <div className="text-[9px] font-mono text-studio-muted">Founders</div>
                </div>
                <div className="p-1.5 rounded-lg bg-studio-forest/60 border border-studio-panelBorder">
                  <div className="text-xs font-mono font-bold text-studio-emerald">100%</div>
                  <div className="text-[9px] font-mono text-studio-muted">Dedicated</div>
                </div>
              </div>
            </div>

            {/* 3D TILT LAPTOP CONTAINER */}
            <div
              className="relative w-full max-w-lg transition-transform duration-200 ease-out transform-style-3d cursor-pointer"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(0.98)`,
                transformOrigin: 'center center',
              }}
            >
              {/* Laptop Screen Bezel */}
              <div className="relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#1c2c23] via-[#0b1610] to-[#050b07] border-2 border-studio-panelBorder shadow-laptop">
                {/* Camera notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-studio-black border border-studio-panelBorder flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-studio-emerald" />
                </div>

                {/* Laptop Screen Display Content */}
                <div className="rounded-xl overflow-hidden bg-studio-black border border-studio-panelBorder/60 text-studio-text">
                  
                  {/* Laptop Top Browser Bar */}
                  <div className="px-3 py-2 bg-studio-charcoal flex items-center justify-between border-b border-studio-panelBorder">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-studio-emerald" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-studio-forest border border-studio-panelBorder text-[10px] font-mono text-studio-secondary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-studio-lime animate-pulse" />
                      <span>rufnix.studio/workspace</span>
                    </div>
                    <div className="text-[10px] font-mono text-studio-emerald">DEV</div>
                  </div>

                  {/* Laptop Inner Screen: Custom Studio IDE & Live Preview */}
                  <div className="p-4 bg-gradient-to-br from-[#06100a] to-[#020503] space-y-3">
                    
                    {/* Inner IDE Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-studio-emerald shadow-glow-emerald" />
                        <span className="font-mono text-xs font-bold text-studio-text tracking-wider">
                          Rufnix Core Runtime
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-studio-lime border border-studio-lime/30 px-2 py-0.5 rounded bg-studio-lime/10">
                        v2.4 Production
                      </span>
                    </div>

                    {/* Active Code Frame */}
                    <div className="p-3 rounded-lg bg-studio-black/80 border border-studio-panelBorder font-mono text-[11px] leading-relaxed overflow-hidden">
                      <div className="text-studio-muted pb-1">// Architecture Configuration</div>
                      <p className="text-studio-secondary">
                        <span className="text-studio-lime">studio</span>: <span className="text-studio-mint">&quot;Rufnix Studio&quot;</span>,
                      </p>
                      <p className="text-studio-secondary">
                        <span className="text-studio-lime">tagline</span>: <span className="text-studio-mint">&quot;Engineered by imagination&quot;</span>,
                      </p>
                      <p className="text-studio-secondary">
                        <span className="text-studio-lime">coreStack</span>: [<span className="text-studio-emerald">&quot;React&quot;</span>, <span className="text-studio-emerald">&quot;.NET&quot;</span>, <span className="text-studio-emerald">&quot;Node&quot;</span>, <span className="text-studio-emerald">&quot;SQL&quot;</span>],
                      </p>
                      <p className="text-studio-secondary">
                        <span className="text-studio-lime">status</span>: <span className="text-studio-emerald">&quot;Ready to Build&quot;</span>
                      </p>
                    </div>

                    {/* Mini Preview Cards inside the Screen */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-md bg-studio-forest/60 border border-studio-panelBorder">
                        <span className="text-[9px] font-mono text-studio-muted uppercase">FEATURED PRODUCT</span>
                        <div className="text-[11px] font-mono font-bold text-studio-mint truncate">F&R Studio</div>
                        <div className="text-[9px] text-studio-secondary">In Development</div>
                      </div>
                      <div className="p-2 rounded-md bg-studio-forest/60 border border-studio-panelBorder">
                        <span className="text-[9px] font-mono text-studio-muted uppercase">ACTIVE PROJECT</span>
                        <div className="text-[11px] font-mono font-bold text-studio-lime truncate">LifePilot</div>
                        <div className="text-[9px] text-studio-secondary">Goal Management</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base & Hinge */}
              <div className="relative -mt-1 mx-auto w-[104%] -left-[2%] h-4 sm:h-5 bg-gradient-to-b from-[#21382a] to-[#0c1810] rounded-b-xl border-t border-studio-emerald/30 shadow-2xl flex items-center justify-center">
                <div className="w-16 h-1 rounded-full bg-studio-panelBorder" />
              </div>
            </div>

            {/* FLOATING ACTION PILL (Bottom Right) */}
            <a
              href="#contact"
              className="absolute -bottom-4 right-2 sm:right-6 z-20 px-4 py-2 rounded-full bg-studio-charcoal/95 border border-studio-lime text-xs font-mono font-bold text-studio-lime shadow-glow-lime hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>LET'S BUILD TOGETHER</span>
              <span className="text-studio-emerald font-bold">&rarr;</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
