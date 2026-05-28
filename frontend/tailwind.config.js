/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        shakthi: {
          ink: '#111827',
          rose: '#e11d48',
          coral: '#fb7185',
          mint: '#14b8a6',
          violet: '#7c3aed',
          sky: '#0284c7'
        }
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15, 23, 42, 0.10)'
      },
      animation: {
        pulseSoft: 'pulseSoft 2.2s ease-in-out infinite'
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.72' },
          '50%': { transform: 'scale(1.12)', opacity: '0.24' }
        }
      }
    }
  },
  plugins: []
};
