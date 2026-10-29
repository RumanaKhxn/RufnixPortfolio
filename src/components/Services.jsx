import { studioData } from '../data/portfolioData';
import { 
  Globe, 
  Layout, 
  Sparkles, 
  Cpu, 
  Share2, 
  Database, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

export default function Services() {
  const { services } = studioData;

  const getServiceIcon = (icon) => {
    switch (icon) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-studio-charcoal/50 overflow-hidden border-t border-studio-panelBorder">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-studio-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-panelBorder text-xs font-mono text-studio-mint">
            <span className="text-studio-emerald">&bull;</span>
            <span>CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-studio-text uppercase font-sans">
            FROM IDEA TO <span className="bg-gradient-to-r from-studio-emerald to-studio-lime bg-clip-text text-transparent">IMPLEMENTATION.</span>
          </h2>

          <p className="text-base sm:text-lg text-studio-secondary max-w-2xl font-mono">
            Practical development services tailored for modern products, robust APIs, and interactive web experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-studio-charcoal/90 border border-studio-panelBorder p-6 sm:p-7 transition-all duration-300 hover:border-studio-emerald/50 hover:bg-studio-forest/30 hover:shadow-glow-emerald ${
                index === services.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-lime group-hover:text-studio-emerald group-hover:border-studio-emerald/40 transition-colors">
                  {getServiceIcon(service.icon)}
                </div>
                <span className="font-mono text-xs font-bold text-studio-muted group-hover:text-studio-mint transition-colors">
                  {service.number}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-sans text-studio-text group-hover:text-studio-mint transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-studio-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-studio-panelBorder flex items-center justify-between">
                <span className="text-[10px] font-mono text-studio-muted uppercase">
                  Rufnix Core Service
                </span>
                <span className="text-studio-emerald opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
