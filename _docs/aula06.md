## Aula 06: Validação Fluente + Testes do TextField

- Gist: https://gist.github.com/omariosouto/344d893bf2428838af3a715cc29ba3e4
### Vamos fazer as validações dos Campos!
- Da pra fazer sempre na mão MAAAAS
  - https://github.com/jquense/yup

- Antes de qualquer coisa, o form precisa saber se tudo ta válido ou não e retornar uma prop pra gente colocar no button

```js
  <Button
    disabled={form.isFormDisabled}
  />
// useForm()
const [isFormDisabled, setIsFormDisabled] = React.useState(false);
// exporta
```
- Mostra o button desabilitado a partir desse state

### Vamos configurar a lib de validação pra rodar em cima disso
- O que temos que validar?
  - Validação Fluente
  - `yarn add yup`
```js
const loginSchema = yup.object().shape({
  usuario: yup
    .string()
    .required('"Usuário" é obrigatório'),
  senha: yup
    .string()
    .min(8, 'Você precisa fornecer pelo menos 8').required('"Senha" é um campo obrigatório'),
});
```

- Mostra no console o validate do loginSchema funcionando
```js
loginSchema.validate(values, {
  abortEarly: false,
});
```

- Vamos passar isso pra dentro do FormLogin, pra ele conseguir validar lá dentro
  - Cria função passa pra dentro
    - A lib de form, sabe quando que precisa validar
      - que é? Quando mudam os valores
```js
// FormLogin.js
async function validateSchema(values) {
  return loginSchema.validate(values, {
    abortEarly: false,
  });
}

// useForm()
const [errors, setErrors] = React.useState({});
async function validateValues(currentValues) {
  try {
    await validateSchema(currentValues);
    setErrors({});
    setIsFormDisabled(false);
  } catch (err) {
    setErrors(formatErrors(err.inner)); // Faz sem o format
    setIsFormDisabled(true);
  }
}

React.useEffect(() => {
  validateValues(values)
    .catch(() => {});
}, [values]);
```
- Mostra na tela com o console.log do react os erros carregando insamente
  - Formata os erros
```js
function formatErrors(errors) {
  return errors.reduce((acc, error) => {
    const valueName = error.path;
    return ({
      ...acc,
      [valueName]: error,
    });
  }, {});
}
```

### Final
- Vamos fazer aparecer, somente depois de interagir com os campos
```js
    const [touched, setTouchedFields] = React.useState({});
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');
      setTouchedFields({
        ...touched,
        [fieldName]: true,
      });
    },

    <TextField
      placeholder="Senha"
      name="senha"
      type="password"
      value={form.values.senha}
      onChange={form.handleChange}
      // Props Novas!
      onBlur={form.handleBlur}
      error={form.errors.senha}
      isTouched={form.touched.senha}
      // Props novas ./
    />
```

```js
// ## TextField
  const hasError = Boolean(error);
  const isFieldInvalid = hasError && isTouched;
  const errorLabel = `textField_error_label_${name}`;

  {isFieldInvalid && (
  <Text
    variant="smallestException"
    color="error.main"
    id={errorLabel}
    role="alert"
  >
    {error.message}
  </Text>
)}
```


- Corzinha TOP
```js
  // Feedback colors
  error: {
    main: {
      color: '#dc3545',
      contrastText: '#fff',
    },
  },
  success: {
    main: {
      color: '#28a745',
      contrastText: '#fff',
    },
  },
````


=====
### Extras
- Como adicionar validação customizadas:
  - https://github.com/jquense/yup/blob/4e7c9ee34dc3127d0a4f14620bf7dfbf6eb3fa4c/docs/extending.md
  - https://medium.com/@arkadyt/how-does-yup-addmethod-work-creating-custom-validation-functions-with-yup-8fddb71a5470