import React from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from '../../../infra/hooks/forms/useForm';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { loginService } from '../../../services/login/loginService';

const loginSchema = yup.object().shape({
  usuario: yup
    .string()
    .required('"Usuário" é obrigatório'),
  senha: yup
    .string()
    .min(8, 'Você precisa fornecer pelo menos 8').required('"Senha" é um campo obrigatório'),
});

async function validateSchema(values) {
  return loginSchema.validate(values, {
    abortEarly: false,
  });
}

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      usuario: '',
      senha: '',
    },
    validateSchema,
    onSubmit(values) {
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
        });
    },
  });

  return (
    <form
      id="formCadastro"
      onSubmit={form.handleSubmit}
    >
      <TextField
        placeholder="Usuário"
        name="usuario"
        value={form.values.usuario}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.usuario}
        isTouched={form.touched.usuario}
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        value={form.values.senha}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.senha}
        isTouched={form.touched.senha}
      />

      <Button
        disabled={form.isFormDisabled}
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
      >
        Entrar
      </Button>
    </form>
  );
}
