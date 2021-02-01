## Aula 04: Conhecendo o Jest e os testes de unidade

- Quem vem do BackEnd fala muito sobre regra de negócio
  - Faz sentido isso no front?
    - Convenções
    - Códigos
    - Regras
    - ...

- Vamos instalar a lib que faz testes mais próximos dos pequenos pedaços de código do que da interface 
  - https://jestjs.io/en/

```js
  "@types/jest": "^26.0.20",
  "eslint-plugin-jest": "^24.1.3",
  "jest": "^26.6.3",
```

  - Cria os scripts:
```js
    "test": "jest",
    "test:watch": "jest --watch",
```

- Cria o `jest.config.js`
```js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: [
    '<rootDir>/node_modules',
    'node_modules',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/cypress/',
    '<rootDir>/dist/',
  ],
};
```
- Cria o `jest.setup.js`
```js
/* eslint-disable no-console */
// console.log('[Jest: Setup!]');
```

- Garantindo que nossos redirects estão iguais:
  - Faz primeiro com toEqual duplicando o array
    - Ai a gente fala "vamo automatiza a automação"

```js
import redirects from './index';

describe('config/redirects', () => {
  test('renders all current redirects', () => {
    expect(redirects).toMatchSnapshot();
  });
});
```

===========

- Vamos testar nossa função propToStyle
  - Usamos ela a RODO e TODA a nossa interface todinha poderia ruir de ela ficasse zoada
```js
test('funciona quando receber uma string', () => {
  const propToStyleResult = propToStyle('color');
  expect(typeof propToStyleResult).toBe('function');

  // <Text color='red' />
  const componentProps = { color: 'red' };
  const styleResult = propToStyleResult(componentProps);
  expect(styleResult).toEqual({ color: 'red' });
});
```

- Faz com o flex também usando o `Grid.Col` como exemplo

- Agora e se tivermos um objeto como resposta?
  - Vamos antes de mais nada estruturar nosso teste para fazer sentido para quem ler depois
```sh
propToStyle()
  when receives a sample argument
    ✓ and it is a string (5 ms)
    ✓ and it is a number (1 ms)
  when receive an argument with breakpoints
    ✓ renders only the received ones (5 ms)
```

- Refatora o propToStyle para adicionar somente os estilos que foram passados e não mais que isso
```js
    if (typeof propValue === 'object') {
      const breakpoints = {};
      if (propValue.xs) breakpoints.xs = { [propName]: propValue.xs };
      if (propValue.sm) breakpoints.sm = { [propName]: propValue.sm };
      if (propValue.md) breakpoints.md = { [propName]: propValue.md };
      if (propValue.lg) breakpoints.lg = { [propName]: propValue.lg };
      if (propValue.xl) breakpoints.xl = { [propName]: propValue.xl };

      return breakpointsMedia(breakpoints);
    }
```

- Taraaaam
```js
import { propToStyle } from './propToStyle';

describe('propToStyle()', () => {
  describe('when receives a sample argument', () => {
    test('and it is a string', () => {
      const propToStyleResult = propToStyle('color');
      expect(typeof propToStyleResult).toBe('function');

      // <Text color='red' />
      const componentProps = { color: 'red' };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toEqual({ color: 'red' });
    });
    test('and it is a number', () => {
      const propToStyleResult = propToStyle('flex');
      expect(typeof propToStyleResult).toBe('function');

      // <Grid.Col flex={1} />
      const componentProps = { flex: 1 };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toEqual({ flex: 1 });
    });
  });

  describe('when receive an argument with breakpoints', () => {
    test('renders only the received ones', () => {
      const propToStyleResult = propToStyle('color');
      // <Text color={{ xs: 'red', md: 'blue' }} />
      const componentProps = {
        color: {
          xs: 'red',
          md: 'blue',
        },
      };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toMatchSnapshot();
    });
  });
});
```