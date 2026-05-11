import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Amarillo eléctrico - EL color chicha principal
        primary: {
          50: '#fffff0',
          100: '#feffc0',
          200: '#feff80',
          300: '#ffff1a',
          400: '#FFE600',
          500: '#FFD700',
          600: '#e6c200',
          700: '#b89b00',
          800: '#8a7400',
          900: '#5c4d00',
          950: '#2e2700',
        },
        // Fuchsia / magenta - el choque chicha
        accent: {
          50: '#ffe0f0',
          100: '#ffb3d9',
          200: '#ff80be',
          300: '#ff4da3',
          400: '#ff1a88',
          500: '#FF006E',
          600: '#cc0058',
          700: '#990042',
          800: '#66002c',
          900: '#330016',
          950: '#1a000b',
        },
        // Paleta chicha completa
        chicha: {
          black: '#080808',
          dark: '#0d000d',
          yellow: '#FFE600',
          fuchsia: '#FF006E',
          green: '#39FF14',
          cyan: '#00FFFF',
          orange: '#FF6600',
          pink: '#FF00AA',
          purple: '#CC00FF',
          red: '#FF2200',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        display: ['var(--font-baloo)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'star-spin': 'starSpin 8s linear infinite',
        'neon-flicker': 'neonFlicker 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #FFE600, 0 0 20px rgba(255,230,0,0.3)' },
          '50%': { boxShadow: '0 0 20px #FFE600, 0 0 40px #FFE600, 0 0 60px rgba(255,230,0,0.4)' },
        },
        starSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        neonFlicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%, 99%': { opacity: '0.8' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
