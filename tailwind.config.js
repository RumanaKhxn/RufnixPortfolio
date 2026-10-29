/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          black: '#030504',
          charcoal: '#080D0A',
          forest: '#0A1710',
          panel: '#0D1E15',
          panelBorder: '#163324',
          emerald: '#00E676',
          lime: '#A3FF12',
          mint: '#7CFFB2',
          text: '#F5F7F5',
          secondary: '#9CA8A0',
          muted: '#5F7065',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(0, 230, 118, 0.35)',
        'glow-lime': '0 0 25px -5px rgba(163, 255, 18, 0.35)',
        'glow-subtle': '0 0 15px -3px rgba(0, 230, 118, 0.15)',
        'panel': '0 20px 40px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(124, 255, 178, 0.1)',
        'laptop': '0 30px 60px -12px rgba(0, 230, 118, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.95)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'glow-sweep': 'glowSweep 8s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glowSweep: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
}
