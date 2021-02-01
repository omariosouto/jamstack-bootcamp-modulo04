## Aula 03: Page Objects e padronização nos testes de integração

- Gist: https://gist.github.com/omariosouto/704712e34809149d6ba90f3666d0f688

- Alguns detalhes ficaram soltos aqui no nosso código:
  - Organização do código do teste
  - como estruturar um teste
  - lidar com ambiente de produção e dev


- Vamos organizar o código do teste
  - Page Objects
    - https://martinfowler.com/bliki/PageObject.html
  - "Converter uma coisa visual, para uma estrutura de objeto fluente e semantica"

- Separação de ambiente de PROD e DEV

```js
const isServer = typeof window === 'undefined';
export const isStaging = isServer
  ? process.env.NODE_ENV === 'development'
  : globalThis.location.href.includes('localhost');

```

- Vamos organizar o teste em si
  - "Como escrever meus testes?"  
    - Testes como documentação
    - Padrão pra evitar repetição inutil
  - https://www.betterspecs.org/

```json
"test:integration": "cypress run --headless"
```

===========

- E agora? 
  - Só vamos fazer o happy path*
    - Ou coisas que REALMENTE são cruciais e impactam agressivamente o negócio
    - Piramide de testes
      - https://devporai.com.br/wp-content/uploads/2020/02/Pir%C3%A2mide-testes.png
  - Testes e2e
  - https://jestjs.io/