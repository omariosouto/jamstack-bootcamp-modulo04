import React from 'react';
import { render, screen } from '../../../infra/test/testUtils';
import TextField from './index';

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

    screen.debug();

    expect(screen.getByPlaceholderText('Nome')).toHaveValue('Mario');
    expect(screen.getByPlaceholderText('Nome')).toMatchSnapshot();
  });
});
