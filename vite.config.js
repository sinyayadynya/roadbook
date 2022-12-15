import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['@babel/plugin-syntax-import-assertions'],
            },
        }),
        viteCompression(),
    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'js/main.min.js',
                entryFileNames: 'js/main.min.js',
                assetFileNames: 'css/[name].[ext]',
            },
        },
    },
});
