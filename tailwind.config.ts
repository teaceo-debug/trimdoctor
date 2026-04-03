import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#D8F3DC',
          100: '#D8F3DC',
          200: '#95D5B2',
          300: '#40916C',
          400: '#2D6A4F',
          500: '#1B4332',
          600: '#1B4332',
          700: '#142F24',
          800: '#0E2118',
          900: '#07130D',
        },
        forest: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
          muted: '#40916C',
        },
        sage: {
          DEFAULT: '#95D5B2',
          light: '#D8F3DC',
        },
        cream: {
          DEFAULT: '#FBF8F3',
          dark: '#F5F0E8',
        },
        warm: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE6D9',
        },
        gold: {
          DEFAULT: '#DAA520',
          dark: '#B8860B',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '22px',
        '4xl': '28px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(.16,1,.3,1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'check-draw': 'checkDraw 0.5s ease forwards',
        'mail-bounce': 'mailBounce 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s cubic-bezier(.16,1,.3,1) forwards',
        'slide-left': 'slideLeft 0.4s cubic-bezier(.16,1,.3,1) forwards',
        'slide-right': 'slideRight 0.4s cubic-bezier(.16,1,.3,1) forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        checkDraw: {
          from: { strokeDashoffset: '24' },
          to: { strokeDashoffset: '0' },
        },
        mailBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
