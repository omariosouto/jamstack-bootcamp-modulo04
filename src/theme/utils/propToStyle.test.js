import { propToStyle } from './propToStyle';

describe('propToStyle()', () => {
  describe('when receives a sample argument', () => {
    test('and it is a string', () => {
      const propToStyleResult = propToStyle('color');
      expect(typeof propToStyleResult).toBe('function');

      // <Text color='red' />
      const componentProps = { color: 'red' };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toEqual({ color: 'red' });
    });
    test('and it is a number', () => {
      const propToStyleResult = propToStyle('flex');
      expect(typeof propToStyleResult).toBe('function');

      // <Grid.Col flex={1} />
      const componentProps = { flex: 1 };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toEqual({ flex: 1 });
    });
  });

  describe('when receive an argument with breakpoints', () => {
    test('renders only the received ones', () => {
      const propToStyleResult = propToStyle('color');
      // <Text color={{ xs: 'red', md: 'blue' }} />
      const componentProps = {
        color: {
          xs: 'red',
          md: 'blue',
        },
      };
      const styleResult = propToStyleResult(componentProps);
      expect(styleResult).toMatchSnapshot();
    });
  });
});
