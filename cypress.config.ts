const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/integration/**/*.spec.{js,ts,jsx,tsx}',
  },
  video: true,
  viewportHeight: 1920,
  viewportWidth: 1080,
  screenshotOnRunFailure: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'raw_reports',
    overwrite: false,
    html: false,
    json: true,
  },
  component: {
    specPattern: 'src/**/*.spec.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // Reuse the app Vite config so CT does not treat config as "changed" vs the
      // e2e dev server and re-optimize deps while the browser already loads specs.
      // That race often surfaces as: Failed to fetch dynamically imported module …/component.ts
      async viteConfig() {
        const { default: userConfig } = await import('./vite.config');

        return userConfig;
      },
    },
  },
});
