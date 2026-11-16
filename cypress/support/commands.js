// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// cy.env() is built into Cypress 15+. Older versions (e.g. 13.x) don't have it,
// so provide a compatible command that reads values via Cypress.env().
if (typeof cy.env !== 'function') {
    Cypress.Commands.add('env', (keys) => {
        const values = Object.fromEntries(keys.map((key) => [key, Cypress.env(key)]));
        return cy.wrap(values, { log: false });
    });
}

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.get('header').find('.btn.btn-outline-white.header_signin').click();
    cy.get('[name="email"]').should('be.visible').type(email);
    cy.get('[name="password"]').should('be.visible').type(password, { sensitive: true });
    cy.get('.modal-footer').contains('button', 'Login').click();
    cy.url().should('include', '/panel/garage');
});

Cypress.Commands.add('createExpense', (expense) => {
    return cy.env(['basicAuthUsername', 'basicAuthPassword']).then(
        ({ basicAuthUsername, basicAuthPassword }) => cy.request({
            method: 'POST',
            url: '/api/expenses',
            auth: {
                username: basicAuthUsername,
                password: basicAuthPassword,
            },
            body: expense,
        })
    );
});

// Deletes every car of the logged-in user (the garage is limited to 25 cars)
Cypress.Commands.add('deleteAllCars', () => {
    return cy.env(['basicAuthUsername', 'basicAuthPassword']).then(
        ({ basicAuthUsername, basicAuthPassword }) => {
            const auth = { username: basicAuthUsername, password: basicAuthPassword };

            cy.request({ url: '/api/cars', auth }).then(({ body }) => {
                body.data.forEach((car) => {
                    cy.request({ method: 'DELETE', url: `/api/cars/${car.id}`, auth });
                });
            });
        }
    );
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
    if (options.sensitive) {
        options.log = false;
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }

    return originalFn(element, text, options);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
