import React from 'react';
import user from '@testing-library/user-event';
import TextField from './index';
import { render, screen } from '../../../infra/test/testUtils';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        name="name"
        value="Mario"
        onChange={() => {}}
      />,
    );

    // screen.debug();

    expect(screen.getByPlaceholderText('Nome')).toHaveValue('Mario');
    expect(screen.getByPlaceholderText('Nome')).toMatchSnapshot();
  });

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', () => {
        const { container } = render(
          <TextField
            placeholder="Email"
            name="email"
            onChange={() => {}}
            value="teste_teste.com"
            isTouched
            error={{
              message: 'You must provide a valid email',
            }}
          />,
        );

        expect(screen.getByPlaceholderText('Email')).toHaveValue('teste_teste.com');
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('when field is invalid', () => {
    test('displays the respective error message', () => {
      render(
        <TextField
          placeholder="Email"
          name="email"
          onChange={() => {}}
          value="teste_teste.com"
          isTouched
          error={{
            message: 'You must provide a valid email',
          }}
        />,
      );

      expect(screen.getByPlaceholderText('Email')).toHaveValue('teste_teste.com');
      expect(screen.getByRole('alert')).toHaveTextContent('You must provide a valid email');
      expect(screen.getByPlaceholderText('Email')).toMatchSnapshot();
    });
  });

  describe('when user types', () => {
    test('calls onChange handler', async () => {
      const onChange = jest.fn();
      render(
        <TextField
          placeholder="Email"
          name="email"
          onChange={onChange}
          value=""
        />,
      );

      const inputEmail = screen.getByPlaceholderText('Email');
      user.type(inputEmail, 'mario@gmail.com');

      expect(onChange).toHaveBeenCalledTimes(15);
    });
  });
});
