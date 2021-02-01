import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from '../../../infra/hooks/forms/useForm';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { loginService } from '../../../services/login/loginService';

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      usuario: '',
      senha: '',
    },
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
      />
      <TextField
        placeholder="Senha"
        name="senha"
        type="password"
        value={form.values.senha}
        onChange={form.handleChange}
      />

      <Button
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
