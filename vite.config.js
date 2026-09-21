import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rolldownOptions: {
      checks: {
        // MUI and Framer Motion ship React Server Component markers that are
        // not relevant to this client-only Vite application.
        moduleLevelDirective: false,
      },
    },
  },
});
