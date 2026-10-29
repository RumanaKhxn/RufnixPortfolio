import { studioData } from '../data/portfolioData';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { name, tagline, email, instagram, founders } = studioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-studio-black border-t border-studio-panelBorder pt-16 pb-12 overflow-hidden">
      {/* Animated Subtle Green Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-studio-emerald/50 to-transparent shadow-glow-emerald" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-studio-panelBorder">
          
          {/* Col 1: Studio Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-studio-emerald/50 bg-studio-forest flex items-center justify-center p-0.5">
                <img
                  src="/assets/logo.jpg"
                  alt="Rufnix Studio Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span className="absolute text-[10px] font-mono font-bold text-studio-lime">RF</span>
              </div>
              <span className="font-mono text-base font-bold tracking-wider text-studio-text">
                RUFNIX <span className="text-studio-lime">STUDIO</span>
              </span>
            </div>

            <p className="text-xs font-mono text-studio-secondary max-w-sm leading-relaxed">
              &ldquo;{tagline}&rdquo; — Software development studio focused on modern web applications, robust APIs, and thoughtful digital products.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-lime transition-colors"
                aria-label="Rufnix Studio Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${email}`}
                className="p-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-emerald transition-colors"
                aria-label="Rufnix Studio Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-studio-text uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono text-studio-secondary">
              <li><a href="#hero" className="hover:text-studio-lime transition-colors">Home</a></li>
              <li><a href="#evolution" className="hover:text-studio-lime transition-colors">Evolution</a></li>
              <li><a href="#architecture" className="hover:text-studio-lime transition-colors">Architecture</a></li>
              <li><a href="#about" className="hover:text-studio-lime transition-colors">Founders</a></li>
              <li><a href="#projects" className="hover:text-studio-lime transition-colors">Featured Projects</a></li>
              <li><a href="#contact" className="hover:text-studio-lime transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Founders Directory */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono font-bold text-studio-text uppercase tracking-wider">
              Founders & Profiles
            </div>

            <div className="space-y-3">
              {founders.map((f) => (
                <div key={f.name} className="p-3 rounded-xl bg-studio-forest/50 border border-studio-panelBorder flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="font-bold text-studio-text">{f.name}</div>
                    <div className="text-[10px] text-studio-muted">{f.role}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={f.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-studio-secondary hover:text-studio-lime transition-colors"
                      aria-label={`${f.name}'s GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-studio-secondary hover:text-studio-emerald transition-colors"
                      aria-label={`${f.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-studio-muted">
              Direct inquiries: <a href={`mailto:${email}`} className="text-studio-mint hover:underline">{email}</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-studio-muted">
          <div>
            &copy; {currentYear} {name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px]">Engineered with React + Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-studio-forest border border-studio-panelBorder text-studio-secondary hover:text-studio-lime hover:border-studio-lime transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
