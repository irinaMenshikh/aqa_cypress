const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/qauto2',
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://qauto2.forstudy.space',
    excludeSpecPattern: ['cypress/e2e/registration.cy.js'],
    env: {
      userEmail: 'test.qauto2@test.com',
      userPassword: 'Test1234'
    },
    setupNodeEvents(on, config) {},
  },
});
