module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          white: '#ffffff',
          offwhite: '#f9fafb',
        },
        ink: {
          primary: '#0f172a',
          secondary: '#334155',
          muted: '#64748b',
        },
        accent: {
          gold: '#c6a15b',
          goldDark: '#a8843a',
        },
        line: '#e5e7eb',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      letterSpacing: {
        luxury: '0.15em',
      },
      animation: {
        slideUp: 'slideUp 0.8s ease-out',
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}