## Aula 02: Custom hooks no React + Lógica Inicial do Login

- Gist: https://gist.github.com/omariosouto/77a07cdb94216c105462ecd6e6f9dab6

- Fazer o login de fato
  - Vamos mover o nosso componente para uma pasta só dele
    - src/patterns/FormLogin/index.js

- Vamos deixar ligado nosso teste e2e e ir vendo no formato TDD
   - Sempre escreve e vê se quebrou algo que tava lá

- Existem diversas libs de formulário:

// https://formik.org/
  // https://formik.org/docs/api/useFormik
// https://react-hook-form.com/

- Vamos falar de custom hooks
  - Todo código que você faz na sua app, mas não pertence a ela, é um código de "infraestrutura"
    - Que a gente chama de utils no geral

> Monta o que precisa até quebrar o teste no handleSubmit
```js
import React from 'react';

export function useForm({
  initialValues,
  onSubmit,
}) {
  const [values, setValues] = React.useState(initialValues);

  return {
    values,
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;
      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
  };
}
```

========

- Vamos arrumar a navegação de página
  - Entender o pq o teste quebrou e arrumar

```js
import { useRouter } from 'next/router';
// Coloca no onSubmit
router.push('/app/profile');
```

========

- Agora, nós já criamos a base, mas não fizemos o login de fato
  - URL 
    - https://instalura-api.omariosouto.vercel.app/api/login/
    - Fazer login via postman

  - Poderiamos vir aqui e só fazer um fetch novamente
    - Mas vamos separar essa lógica

```js
async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }

      throw new Error(await respostaDoServer.text());
    });
}

export const loginService = {
  // Destructuring define contratos também
  async login({ username, password }) {
    return HttpClient('https://instalura-api.omariosouto.vercel.app/', {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
  },
};

```

=======
=======

- Vamos salvar o token!
  - https://github.com/maticzav/nookies

```js
import { setCookie, destroyCookie } from 'nookies';

```

=======
=======

- Vamos finalizar a aula criando um teste para garantir que o token foi salvo

```js
const STAGING_API_URL = 'https://instalura-api-git-master.omariosouto.vercel.app';
cy.intercept(`${STAGING_API_URL}/api/login`).as('userLogin');

cy.wait('@userLogin').then((intercept) => {
  cy.getCookie('APP_TOKEN')
    .should('exist')
    .should('have.property', 'value', intercept.response.body.data.token);
});
```