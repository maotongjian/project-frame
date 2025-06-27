import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['Chrome >= 47', 'Android >= 6', 'IOS >= 11'], // 适配的 chrome 版本 chrome 52
      modernPolyfills: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/variables.scss" as *;
        `,
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        keep_numbers: true,
      },
    },
    rollupOptions: {
      output: {},
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/dev-api': {
        target: '',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      },
    },
  },
});
