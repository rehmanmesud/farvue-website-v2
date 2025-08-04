/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System Tokens
        'bg-primary': '#000000',
        'text-primary': '#F8F8F8',
        'accent-red': '#E54747',
        'accent-blue': '#3478F6',
        'neutral-100': '#E5E7EB',
        'neutral-300': '#9CA3AF',
        
        // FARVUE Media Brand Colors (maintained for compatibility)
        primary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          200: '#b3cce5',
          300: '#8db3d8',
          400: '#6799cb',
          500: '#123456', // Primary brand color
          600: '#0f2a4a',
          700: '#0c1f3d',
          800: '#091531',
          900: '#060a24',
        },
        secondary: {
          50: '#f2f8fc',
          100: '#e6f0f9',
          200: '#cce1f3',
          300: '#b3d2ed',
          400: '#99c3e7',
          500: '#789ABC', // Secondary brand color
          600: '#607ba6',
          700: '#485c90',
          800: '#303d7a',
          900: '#181e64',
        },
        accent: {
          50: '#fff5f5',
          100: '#fed7d7',
          200: '#feb2b2',
          300: '#fc8181',
          400: '#f56565',
          500: '#e53e3e',
          600: '#c53030',
          700: '#9b2c2c',
          800: '#822727',
          900: '#63171b',
        },
        dark: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Design System Font Scale
        'caption': ['0.875rem', { lineHeight: '1.4' }],    // 300
        'body': ['1rem', { lineHeight: '1.5' }],           // 400
        'subtitle': ['1.25rem', { lineHeight: '1.4' }],    // 500
        'h4': ['1.875rem', { lineHeight: '1.3' }],         // 600
        'h3': ['2.25rem', { lineHeight: '1.2' }],          // 700
        'h2': ['3rem', { lineHeight: '1.1' }],             // 800
        'h1': ['3.75rem', { lineHeight: '1.1' }],          // 900
        
        // Existing sizes (maintained for compatibility)
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      spacing: {
        // Design System Spacing
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        
        // Existing spacing (maintained for compatibility)
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        // Design System Radii
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #123456 0%, #1a4971 50%, #789ABC 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(18, 52, 86, 0.1) 0%, rgba(120, 154, 188, 0.1) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(120, 154, 188, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}