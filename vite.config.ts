
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        // rewrite: (p) => p.replace(/^\/api/, ''), // Remove /api prefix
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[Vite Proxy] Forwarding HTTP request: ${req.method} ${req.url}`);
          });
          proxy.on('error', (err) => {
            console.error('[Vite Proxy] HTTP error:', err);
          });
        },
      },
      '/ws': {
  target: 'ws://127.0.0.1:8000',
  changeOrigin: true,
  ws: true,
  secure: false,
  configure: (proxy) => {
    proxy.on('proxyReqWs', (proxyReq, req) => {
      console.log(`[Vite Proxy] Forwarding WS: ${req.url}`);
      if (req.headers.cookie) {
        proxyReq.setHeader('cookie', req.headers.cookie);
      }
    });
  },
},

    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));