import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const { result } = renderHook(() => useForm({
        initialValues: {
          nome: 'Mario',
        },
      }));

      const event = {
        target: {
          getAttribute: () => 'nome',
          value: 'Novo valor',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ nome: 'Novo valor' });
    });
  });
});
