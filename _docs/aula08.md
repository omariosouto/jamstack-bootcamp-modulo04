## Aula 08: Testando Hooks e Services

- Já testamos váaarios tipos de códegos!
  - Vamos testar nossos services e hoooks nessa aula
  - Gist: https://gist.github.com/omariosouto/6099c9e5786a2ed590dcbdb28019dfe8

- Dependencia
  - Injeção de dependencia por parametro default

- Vamos testar o logout primeiro
```js
  describe('logout()', () => {
    describe('when user try to logout and succeed', () => {
      test('remove its token', async () => {
        const destroyCookie = jest.fn();
        await loginService.logout(destroyCookie);
        expect(destroyCookie).toBeCalledWith(null, 'APP_TOKEN');
      });
    });
  });
```

- Agora vamos pro login

```js
  describe('login()', () => {
    describe('when user try to login', () => {
      describe('and succeed', () => {
        test('store its token', async () => {
          const setCookie = jest.fn();
          await loginService.login({
            username: 'omariosouto',
            password: 'senhasegura',
          }, HttpClientMock, setCookie);

          expect(setCookie).toBeCalledWith(null, 'APP_TOKEN', 'fake-token', { maxAge: 604800, path: '/' });
        });
      });
      describe('and it fails', () => {
        test('throws an error', async () => {
          const setCookie = jest.fn();

          await expect(loginService.login({
            username: 'omariosouto',
            password: 'senhasegura',
          }, HttpClientMockError, setCookie))
            .rejects
            .toThrow('There is no token!');
        });
      });
    });
  });
```

- Vamos cobrir o caso de falha:
```js
  const { token } = response.data;
  const hasToken = Boolean(token);
  if (!hasToken) {
    throw new Error('There is no token!');
  }
```

=============================================

- Escrever hooks

```js
import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const { result } = renderHook(() => useForm({
        initialValues: {
          nome: 'Mario',
        },
      }));

      const event = {
        target: {
          getAttribute: () => 'nome',
          value: 'Novo valor',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ nome: 'Novo valor' });
    });
  });
  // {Desafio você a fazer os outros casos!}
});
```