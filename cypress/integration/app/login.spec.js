/// <reference types="Cypress" />
import { LoginScreenPageObject } from '../../../src/components/screens/app/LoginScreen/Login.pageObject';

describe('app/login/', () => {
  describe('when fill and submit a login request', () => {
    it('go to the profile page', () => {
      const STAGING_API_URL = 'https://instalura-api-git-master.omariosouto.vercel.app';
      cy.intercept(`${STAGING_API_URL}/api/login`).as('userLogin');
      const loginScreen = new LoginScreenPageObject(cy);

      loginScreen
        .fillLoginForm({ usuario: 'omariosouto', senha: 'senhasegura' })
        .submitLoginForm();

      cy.url().should('include', '/app/profile');

      cy.wait('@userLogin').then((intercept) => {
        cy.getCookie('APP_TOKEN')
          .should('exist')
          .should('have.property', 'value', intercept.response.body.data.token);
      });
    });
  });
});
