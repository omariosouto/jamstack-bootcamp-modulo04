/// <reference types="Cypress" />

describe('app/login/', () => {
  it('faça o login', () => {
    cy.visit('/app/login');

    cy.get('#formCadastro input[name="usuario"]').type('omariosouto');
    cy.get('#formCadastro input[name="senha"]').type('senhasegura');
    cy.get('#formCadastro button[type="submit"]').click();

    cy.url().should('include', '/app/profile');
  });
});
