import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // three.js lives in its own lazy-loaded chunk (the 3D hero), so a larger chunk is expected.
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      checks: {
        // MUI and Framer Motion ship React Server Component markers that are
        // not relevant to this client-only Vite application.
        moduleLevelDirective: false,
      },
    },
  },
});
