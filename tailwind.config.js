/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sandstone: {
          50: '#fbf4e6',
          100: '#f3e3bf',
          200: '#e8cd94',
          300: '#d8b069',
          400: '#c89649',
          500: '#b07c33',
          600: '#8c5f24',
          700: '#6a461b',
          800: '#48300f',
          900: '#2a1c08',
        },
        gold: {
          50: '#fff8e0',
          100: '#fbeab2',
          200: '#f5d77c',
          300: '#ecc24c',
          400: '#dba72a',
          500: '#b8861a',
          600: '#8f6612',
          700: '#68490d',
          800: '#412d07',
          900: '#1f1303',
        },
        maroon: {
          50: '#fbeeee',
          100: '#f1cfd0',
          200: '#dfa0a2',
          300: '#c87173',
          400: '#a8464a',
          500: '#7d2a2e',
          600: '#5d1e22',
          700: '#3f1417',
          800: '#230a0c',
          900: '#120405',
        },
        ivory: {
          50: '#fffdf6',
          100: '#fff8e7',
          200: '#fff1cf',
          300: '#ffe6ad',
          400: '#f9d77e',
          500: '#e9c25a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['Inter', '"Segoe UI"', 'system-ui', 'sans-serif'],
        deva: ['"Noto Serif Devanagari"', 'serif'],
        script: ['"Great Vibes"', '"Snell Roundhand"', 'cursive'],
        upper: ['Cinzel', '"Bodoni Moda"', 'serif'],
      },
      letterSpacing: {
        invitation: '0.18em',
      },
      keyframes: {
        floatPetal: {
          '0%': { transform: 'translate3d(0, -10vh, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translate3d(8vw, 110vh, 0) rotate(220deg)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.35', filter: 'blur(8px)' },
          '50%': { opacity: '0.8', filter: 'blur(14px)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateY(0) rotate(-0.6deg)' },
          '50%': { transform: 'translateY(2px) rotate(0.6deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.85', transform: 'scaleY(1)' },
          '40%': { opacity: '0.6', transform: 'scaleY(0.9)' },
          '70%': { opacity: '1', transform: 'scaleY(1.05)' },
        },
        riseSlow: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatPetal: 'floatPetal linear infinite',
        glowPulse: 'glowPulse 3.4s ease-in-out infinite',
        sway: 'sway 6s ease-in-out infinite',
        flicker: 'flicker 2.4s ease-in-out infinite',
        riseSlow: 'riseSlow 1.2s ease-out both',
      },
    },
  },
  plugins: [],
}