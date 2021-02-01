/// <reference types="Cypress" />

describe('app/login/', () => {
  it('faça o login', () => {
    cy.intercept('https://instalura-api.omariosouto.vercel.app/api/login').as('userLogin');

    cy.visit('/app/login/');

    cy.get('#formCadastro input[name="usuario"]').type('omariosouto');
    cy.get('#formCadastro input[name="senha"]').type('senhasegura');
    cy.get('#formCadastro button[type="submit"]').click();

    cy.url().should('include', '/app/profile');

    cy.wait('@userLogin').then((intercept) => {
      cy.getCookie('APP_TOKEN')
        .should('exist')
        .should('have.property', 'value', intercept.response.body.data.token);
    });
  });
});
