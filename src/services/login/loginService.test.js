import { loginService } from './loginService';

async function HttpClientMock() {
  return {
    data: {
      token: 'fake-token',
    },
  };
}

async function HttpClientMockError() {
  return {
    data: {
      token: '',
    },
    error: {},
  };
}

describe('loginService', () => {
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
  describe('logout()', () => {
    describe('when user try to logout and succeed', () => {
      test('remove its token', async () => {
        const destroyCookie = jest.fn();
        await loginService.logout(destroyCookie);
        expect(destroyCookie).toBeCalledWith(null, 'APP_TOKEN');
      });
    });
  });
});
