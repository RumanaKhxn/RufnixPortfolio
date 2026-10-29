import { useState, useEffect } from 'react';
import Scene3D from './components/canvas/Scene3D';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroChapter from './components/story/HeroChapter';
import EvolutionChapter from './components/story/EvolutionChapter';
import ArchitectureChapter from './components/story/ArchitectureChapter';
import FoundersChapter from './components/story/FoundersChapter';
import ProjectGalleryChapter from './components/story/ProjectGalleryChapter';
import PortalContactChapter from './components/story/PortalContactChapter';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState('fr-studio');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-studio-black text-studio-text selection:bg-studio-emerald selection:text-studio-black">
      {/* 1. Master Three.js WebGL 3D Parametric Universe */}
      <Scene3D
        scrollProgress={scrollProgress}
        activeProjectId={activeProjectId}
        onProjectSelect={(id) => setActiveProjectId(id)}
      />

      {/* 2. Desktop Custom Cursor with Hover States */}
      <CustomCursor />

      {/* 3. Floating Capsule Navbar */}
      <Navbar />

      {/* 4. Cinematic Scroll-Driven Chapters */}
      <main className="relative z-10 flex flex-col">
        {/* Chapter 01: Hero & Kinetic Narrative */}
        <HeroChapter />

        {/* Chapter 02: Evolution & Manifesto */}
        <EvolutionChapter />

        {/* Chapter 03: Architecture & Capabilities */}
        <ArchitectureChapter />

        {/* Chapter 04: Founders & Engineering Cores */}
        <FoundersChapter />

        {/* Chapter 05: Premier Project Gallery */}
        <ProjectGalleryChapter
          activeProjectId={activeProjectId}
          onSelectProject={(id) => setActiveProjectId(id)}
        />

        {/* Chapter 06: Dimensional Portal & MongoDB Contact Pipeline */}
        <PortalContactChapter />
      </main>

      {/* 5. Studio Footer */}
      <Footer />
    </div>
  );
}
