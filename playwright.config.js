const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://ui.rexjones2.com',
    browserName: 'chromium',
    trace: 'retain-on-failure',
  },
});
