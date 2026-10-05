const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/qauto1',
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      userEmail: 'test.qauto1@test.com',
      userPassword: 'Test1234'
    },
    setupNodeEvents(on, config) {},
  },
});
