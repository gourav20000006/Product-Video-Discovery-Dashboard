/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: '#07111f',
        panel: '#0d1724',
        panel2: '#101d2d',
        line: '#1d2d3d',
        cyanBrand: '#38bdf8',
        violetBrand: '#8b5cf6',
        mint: '#34d399',
        amber: '#fbbf24',
        red: '#f87171',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56,189,248,0.15), 0 22px 50px rgba(8, 14, 28, 0.65)',
        soft: '0 18px 30px rgba(2, 6, 23, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
