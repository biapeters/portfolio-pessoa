import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// "base" precisa ser o nome do repositório para funcionar no GitHub Pages
// (https://biapeters.github.io/portfolio-pessoa/)
export default defineConfig({
    base: '/portfolio-pessoa/',
    plugins: [react(), tailwindcss()],
});
