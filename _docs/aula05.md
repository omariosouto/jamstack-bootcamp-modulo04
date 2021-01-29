## Aula 05: Testando Componentes com React Testing Library

- https://gist.github.com/omariosouto/e743d097c0ad28acab669b83320fafb2

- Para testar componentes
  - Precisamos ter um browser em memória
    - https://github.com/jsdom/jsdom
      - Browser só com a parte de render

  - vamos usar o Testing Library!!!
    - https://testing-playground.com/ 
      - estrutura para renderizar componentes hooks e interagir com as bagaça toda
    - https://testing-library.com/docs/react-testing-library/intro/

```sh
yarn add @testing-library/react-hooks @testing-library/jest-dom @testing-library/react jest-styled-components jest-canvas-mock eslint-plugin-jest --dev
```

```js
/* eslint-disable no-console */
// console.log('[Jest: Setup!]');
import 'jest-styled-components'; // Styled Components
import 'jest-canvas-mock'; // <Lottie />
import '@testing-library/jest-dom'; // Traz expects decentes para lidar com styles e outras coisas do HTML
```

- ESLint pega do Gist
  - https://gist.github.com/omariosouto/e743d097c0ad28acab669b83320fafb2

- Começa o teste de renderizar o componente
  - Nunca decorei, nem nunca decorarei todas as formas de fazer um teste, sempre abro a documentação
    - NINGUÉM SABE P!*&#ˆ NENHUMA!
    - https://testing-library.com/docs/queries/about
```js
import React from 'react';
import { render, screen } from '@testing-library/react';
import TextField from './index';
import WebsiteGlobalProvider from '../../wrappers/WebsitePage/provider';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <WebsiteGlobalProvider>
        <TextField
          placeholder="Nome"
          name="name"
          value="Mario"
          onChange={() => {}}
        />
      </WebsiteGlobalProvider>,
    );

    screen.debug();

    expect(screen.getByPlaceholderText('Nome')).toHaveValue('Mario');
    expect(screen.getByPlaceholderText('Nome')).toMatchSnapshot();
  });
});
```

- Para poder escrever direitinho, ainda falta 1 config ULTRA importante
  - https://testing-library.com/docs/react-testing-library/setup/
  - PEGA DO GIST <3
  - `src/infra/test/testUtils.js`