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
// -- This is a parent command --
Cypress.Commands.add("login", (overrides = {}) => { 
    Cypress.log({
        name: 'LoginViaAuth0'
    })

    const options = {
        method: 'POST',
        url: Cypress.env('AUTH_URL'),
        body: {
            grant_type: 'password',
            username: Cypress.env('AUTH_USERNAME'),
            password: Cypress.env('AUTH_PASSWORD'),
            audience: Cypress.env('AUTH_AUDIENCE'),
            scope: 'openid profile email',
            client_id: Cypress.env('AUTH_CLIENT_ID'),
            client_secret: Cypress.env('AUTH_CLIENT_SECRET'),
        },
    };

    cy.request(options);
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
