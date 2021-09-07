import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const { result } = renderHook(() => useForm({
        initialValues: {
          nome: 'Mayra',
        },
      }));

      const initialValues = { nome: 'Mayra' };
      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          name: 'nome',
          value: 'mayra',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      // expect, to be a new value
      expect(result.current.values).toEqual({ nome: 'mayra' });
    });
  });
});
