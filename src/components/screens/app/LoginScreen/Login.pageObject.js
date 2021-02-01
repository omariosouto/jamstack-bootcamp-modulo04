export class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;
    this.cy.visit('/app/login');
  }

  fillLoginForm({ usuario, senha }) {
    this.cy.get('#formCadastro input[name="usuario"]').type(usuario);
    this.cy.get('#formCadastro input[name="senha"]').type(senha);

    return this;
  }

  submitLoginForm() {
    this.cy.get('#formCadastro button[type="submit"]').click();

    return this;
  }
}
