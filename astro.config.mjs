import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Укажите URL вашего GitHub Pages
  site: 'https://styazhkoV.github.io',
  // Название вашего репозитория со слэшем в начале
  base: '/Syrlas-AI-landing',
  
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});