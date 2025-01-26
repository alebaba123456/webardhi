/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prime' : '#606c38',
        'sec' : '#283618',
        'sec-sh': '#28361890',
        'ter' : '#fefae0',
        'normal' : '#bc6c25',
        'normal-sh' : '#bc6c2554',
        'shade' : '#dda15e',
        'shade-sh' : '#dda15e60',
        'gr' : '#2C2C2C',
        'shade-wh': '#FFFFFFCC',
        'shade-gr' : '#00000099',

      },
      backgroundImage: {
        'login' : "url('@/assets/backgrounds/background.jpg')",
        'pattern' : "url('@/assets/backgrounds/pattern.png')",
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        disco: {
          '0%': { transform: 'translateY(-50%) rotate(0deg)' },
          '100%': { transform: 'translateY(-50%) rotate(360deg)' },
        },
      },
      animation: {
        disco: 'disco 1.5s linear infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'selector'
}