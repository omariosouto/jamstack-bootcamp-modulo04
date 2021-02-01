import { setCookie, destroyCookie } from 'nookies';

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
    return HttpClient('https://instalura-api.omariosouto.vercel.app/api/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then((response) => {
      const { token } = response.data;
      const DAY_IN_SECONDS = 86400;
      const WEEK_IN_SECONDS = DAY_IN_SECONDS * 7;

      setCookie(null, 'APP_TOKEN', token, {
        maxAge: WEEK_IN_SECONDS,
        path: '/',
      });

      return {
        token,
      };
    });
  },
  logout() {
    destroyCookie(null, 'APP_TOKEN');
  },
};
