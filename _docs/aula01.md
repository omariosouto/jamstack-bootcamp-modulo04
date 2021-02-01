## Aula 01: A tela de login

- Gist da aula: https://gist.github.com/omariosouto/59651066259a0fa0f1fb69333baefcbb

- Vamos começar a trabalhar com testes automatizados hoje, focando em interface
  - Vamos assumir que você NUNCA trabalhou com testes
    - Vamos do básico, boas práticas e diferentes tipos de teste

- Dar a página pronta, copiar e colar e deus no comando
  - Falar dos campos
    - Senha segura

- `yarn add cypress eslint-plugin-cypress --dev`
  - Rodar o cypress
    - `"test:integration:open": "cypress open"`

```js
{
  "baseUrl": "http://localhost:3000",
  "video": false
}
```

- Falar que tem que rodar o projeto

```js
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

```