/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0A0A0D',
          dark: '#060608',
          card: 'rgba(255, 255, 255, 0.03)',
          cardHover: 'rgba(255, 255, 255, 0.06)',
          elevated: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(204, 255, 0, 0.25)',
        },
        volt: {
          DEFAULT: '#CCFF00',
          hover: '#B8E600',
          subtle: 'rgba(204, 255, 0, 0.12)',
          glow: 'rgba(204, 255, 0, 0.35)',
        },
        lime: {
          DEFAULT: '#CCFF00',
          hover: '#B8E600',
          subtle: 'rgba(204, 255, 0, 0.12)',
        },
        zinc: {
          text: '#F8FAFC',
          subtext: '#CBD5E1',
          dim: '#94A3B8',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'volt-glow': '0 0 25px rgba(204, 255, 0, 0.35)',
        'volt-glow-sm': '0 0 12px rgba(204, 255, 0, 0.25)',
        'glass-card': '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'dark-mesh': 'radial-gradient(circle at 10% 20%, rgba(204, 255, 0, 0.07) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(245, 158, 11, 0.06) 0%, transparent 45%), linear-gradient(180deg, #0A0A0D 0%, #060608 100%)',
      },
    },
  },
  plugins: [],
};
