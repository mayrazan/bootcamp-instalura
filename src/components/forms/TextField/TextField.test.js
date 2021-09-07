import React from 'react';
import user from '@testing-library/user-event';
import { render, screen } from '../../../infra/test/testUtils';

import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Mayra"
        onChange={() => {}}
        name="nome"
      />,
    );
    // screen.debug();
    const textField = screen.getByPlaceholderText(/nome/i);
    expect(textField).toMatchSnapshot();
  });

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', () => {
        const onChangeMock = jest.fn();
        render(
          <TextField
            placeholder="Nome"
            value=""
            onChange={onChangeMock}
            name="nome"
            isTouched
          />,
        );

        const inputNome = screen.getByPlaceholderText(/nome/i);
        user.type(inputNome, 'mayra');
        expect(onChangeMock).toHaveBeenCalledTimes(5);
      });
    });
  });

  describe('when field is invalid', () => {
    test('displays the respective error message', () => {
      render(
        <TextField
          placeholder="Nome"
          value="mayra"
          onChange={() => {}}
          name="nome"
          isTouched
          error="O campo nome é obrigatório"
        />,
      );

      const inputNome = screen.getByPlaceholderText(/nome/i);
      expect(inputNome).toHaveValue('mayra');
      expect(screen.getByRole('alert')).toHaveTextContent(
        'O campo nome é obrigatório',
      );
      expect(inputNome).toMatchSnapshot();
    });
  });
});
