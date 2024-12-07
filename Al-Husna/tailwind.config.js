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
        'ter' : '#fefae0',
        'normal' : '#bc6c25',
        'shade' : '#dda15e'
      },
      backgroundImage: {
        'login' : "url('@/assets/backgrounds/login-background.png')",
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