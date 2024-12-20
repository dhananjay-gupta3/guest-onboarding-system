import { defineConfig } from 'vite';

export default defineConfig({
  // ... other config options ...
  plugins: [
    // Add any other plugins you're using
    // ...
    // Add the following plugin to handle warnings from the React plugin
    {
      name: 'react-warnings',
      enforce: 'post',
      apply: 'build',
      configResolved(config) {
        config.build.rollupOptions.onwarn = (warning, warn) => {
          if (warning.code === 'CIRCULAR_DEPENDENCY') {
            warn(warning);
          }
        };
      },
    },
  ],
});