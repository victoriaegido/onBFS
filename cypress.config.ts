import { defineConfig } from "cypress";

export default defineConfig({
    env: {
      preserveOriginalScreenshot: false,
    },
    chromeWebSecurity: false,
    viewportWidth: 1680,
    viewportHeight: 940,
    defaultCommandTimeout: 10000,
    requestTimeout: 20000,
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      excludeSpecPattern: '**/examples/**/*.spec.js',
      specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
      testIsolation: false,
      video: false,
      baseUrl: 'http://localhost:3000/',
    },
});
