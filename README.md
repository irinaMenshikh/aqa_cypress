# aqa_cypress

## Run Cypress

Open Cypress for each application version:

```bash
npm run cy:open:qauto1
npm run cy:open:qauto2
```

Run the tests headlessly:

```bash
npm run cy:run:qauto1
npm run cy:run:qauto2
```

The test credentials for each application are set in its matching
`cypress.qauto1.config.js` or `cypress.qauto2.config.js` file. Keep Basic Auth
credentials in the local, ignored `cypress.env.json` file with the keys
`basicAuthUsername` and `basicAuthPassword`; do not commit that file.

Headless runs use Mochawesome. Reports are saved under
`cypress/reports/qauto1` and `cypress/reports/qauto2` and are ignored by Git.
