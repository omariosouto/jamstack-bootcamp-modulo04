## Aula 07: Finalizando o Form + Testes do Form


- Reforçar evitar testar o framework!
- Começa ajustando o Input
```js
  ${({ theme, isFieldInvalid }) => isFieldInvalid && css`
    border-color: ${theme.colors.error.main.color};
    & + span {
      color: ${theme.colors.error.main.color};
      font-size: 11px;
    }
  `}
```
```js
  return (
    <InputWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        isFieldInvalid={isFieldInvalid}
        {...props}
      />
```
```js
    onSubmit(values) {
      form.setIsFormDisabled(true);
      loginService.login({
        username: values.usuario,
        password: values.senha,
      })
        .then(() => {
          router.push('/app/profile/');
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        })
        .finally(() => {
          form.setIsFormDisabled(false);
        });
    },
```
  - Faz os testes
  - Faz o último teste como de input 
    - https://github.com/testing-library/user-event
    - `yarn add @testing-library/user-event`
    - https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
    - https://jestjs.io/docs/en/mock-function-api

- Vamos pro teste do Form
  - https://gist.github.com/omariosouto/36b305a4136c2610d91c8b762ae65743