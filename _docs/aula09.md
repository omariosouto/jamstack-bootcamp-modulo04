## Aula 09

- Gist da aula:
  - https://gist.github.com/omariosouto/79d03ae73e7add0d512a58c63107d354

- Vamos finalizar o módulo adicionando nossos testes no CI


```yml
  unit_tests:
    name: Unit Tests
    runs-on: ubuntu-latest # The type of runner that the job will run on
    steps: # Steps represent a sequence of tasks that will be executed as part of the job
      # [Pre Build-step]
      - uses: actions/checkout@v2 ## Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/setup-node@v1
        with:
          node-version: '14.15.0'
      - name: Get yarn cache directory path
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"
      - uses: actions/cache@v2
        with:
          path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
      # ####################

      # Commands that will run:
      - name: Install Packages
        run: yarn --prefer-offline

      - name: Run Unit Tests
        run: yarn test
```