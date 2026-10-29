import { useState, useEffect } from 'react';
import { studioData } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Featured', href: '#featured' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['hero', 'about', 'skills', 'projects', 'featured', 'services', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-studio-charcoal/90 backdrop-blur-md border border-studio-panelBorder shadow-glow-subtle'
            : 'bg-studio-charcoal/60 backdrop-blur-sm border border-white/5'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-emerald rounded-full pr-2"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-studio-emerald/50 p-0.5 bg-studio-forest flex items-center justify-center shadow-glow-subtle group-hover:border-studio-lime transition-colors">
            <img
              src="/assets/logo.jpg"
              alt="Rufnix Studio Logo"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="absolute text-[10px] font-mono font-bold text-studio-lime">RF</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-wider text-studio-text flex items-center gap-1">
              <span className="text-studio-emerald">&lt;</span>
              RUFNIX
              <span className="text-studio-lime">STUDIO</span>
              <span className="text-studio-emerald">/&gt;</span>
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1 bg-studio-forest/60 rounded-full border border-studio-panelBorder">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1 text-xs font-mono tracking-wider transition-all duration-200 rounded-full ${
                  isActive
                    ? 'text-studio-black font-semibold bg-studio-emerald shadow-glow-emerald'
                    : 'text-studio-secondary hover:text-studio-text hover:bg-studio-panel/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Status Pill & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-studio-forest/80 border border-studio-emerald/20 text-xs font-mono text-studio-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-studio-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-studio-emerald"></span>
            </span>
            <span className="text-[11px] text-studio-mint">online</span>
          </div>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold text-studio-black bg-gradient-to-r from-studio-emerald to-studio-lime hover:opacity-90 transition-all shadow-glow-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-lime"
          >
            LET'S TALK
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-studio-secondary hover:text-studio-text hover:bg-studio-panel border border-studio-panelBorder focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-emerald"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-studio-lime" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl bg-studio-charcoal/95 backdrop-blur-xl border border-studio-panelBorder p-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-mono tracking-wider text-studio-secondary hover:text-studio-emerald hover:bg-studio-forest/60 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-studio-muted">&gt;</span>
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-studio-panelBorder flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-studio-mint px-2">
                <span className="h-2 w-2 rounded-full bg-studio-emerald animate-pulse"></span>
                <span>Available for projects</span>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl font-mono text-xs font-bold text-studio-black bg-studio-emerald shadow-glow-emerald"
              >
                START A PROJECT
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
