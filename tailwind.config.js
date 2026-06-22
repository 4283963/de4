/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Noto Sans SC', 'sans-serif'],
      },
      colors: {
        'cyber': {
          50: '#e6ffff',
          100: '#b3ffff',
          200: '#80ffff',
          300: '#4dffff',
          400: '#1affff',
          500: '#00e5ff',
          600: '#00b3cc',
          700: '#008099',
          800: '#004d66',
          900: '#001a33',
        },
        'deep': {
          950: '#05070f',
          900: '#0a0e1a',
          800: '#0f1320',
          700: '#1a1f35',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
