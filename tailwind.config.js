/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bumil: {
          pink: {
            50: '#fff5f8',
            100: '#ffe4ee',
            200: '#fecddf',
            300: '#fba5c6',
            400: '#f471a4',
            500: '#e84583',
            600: '#d42767',
          },
          peach: {
            50: '#fff8f4',
            100: '#ffefe5',
            200: '#fed9c7',
            300: '#fdbba1',
            400: '#f88c63',
            500: '#f06532',
          },
          lavender: {
            50: '#f8f6ff',
            100: '#f0ecff',
            200: '#dfd7ff',
            300: '#c5b4ff',
            400: '#a384fc',
            500: '#8559f2',
          },
          mint: {
            50: '#f1fcf6',
            100: '#dcf7e7',
            200: '#bdf0d2',
            300: '#8ce2b1',
            400: '#4eca83',
            500: '#28af64',
          },
          amber: {
            50: '#fffcf0',
            100: '#fef7ce',
            200: '#fdec9c',
            300: '#fbdb60',
            400: '#f8c42b',
            500: '#e5a50b',
          },
          softpurple: '#9d7ded',
        }
      },
      fontFamily: {
        cute: ['"Quicksand"', '"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 8px 30px rgba(244, 113, 164, 0.12)',
        'cute-lg': '0 14px 40px rgba(232, 69, 131, 0.18)',
        'bubble': '0 10px 25px -5px rgba(254, 205, 223, 0.6), 0 8px 10px -6px rgba(254, 205, 223, 0.4)',
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
