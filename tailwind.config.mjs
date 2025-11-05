/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bleu-marine': '#1C2A39',
        'beige-lin': '#F5F1E8',
        'brun-clair': '#BFA58A',
        'gris-taupe': '#6E6B65',
        'blanc-casse': '#FAFAF9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        tavue: {
          primary: '#1C2A39',
          secondary: '#BFA58A',
          accent: '#6E6B65',
          neutral: '#F5F1E8',
          'base-100': '#FAFAF9',
        },
      },
    ],
  },
}