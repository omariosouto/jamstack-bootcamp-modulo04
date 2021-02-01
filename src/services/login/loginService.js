import { setCookie, destroyCookie } from 'nookies';
import { isStaging } from '../../infra/env/isStagingEnv';

const BASE_URL = isStaging
  ? 'https://instalura-api-git-master.omariosouto.vercel.app'
  : 'https://instalura-api.omariosouto.vercel.app';

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
  async login({ username, password }, HttpClientModule = HttpClient, setCookieModule = setCookie) {
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then((response) => {
      const { token } = response.data;
      const hasToken = Boolean(token);
      if (!hasToken) {
        throw new Error('There is no token!');
      }

      const DAY_IN_SECONDS = 86400;
      const WEEK_IN_SECONDS = DAY_IN_SECONDS * 7;

      setCookieModule(null, 'APP_TOKEN', token, {
        maxAge: WEEK_IN_SECONDS,
        path: '/',
      });

      return {
        token,
      };
    });
  },
  logout(destroyCookieModule = destroyCookie) {
    destroyCookieModule(null, 'APP_TOKEN');
  },
};
