import { breakpointsMedia } from './breakpointsMedia';

export function propToStyle(propName) {
  return (props) => {
    const propValue = props[propName];

    if (typeof propValue === 'string' || typeof propValue === 'number') {
      return {
        // textAlign: props.textAlign
        [propName]: propValue,
      };
    }

    if (typeof propValue === 'object') {
      const breakpoints = {};
      if (propValue.xs) breakpoints.xs = { [propName]: propValue.xs };
      if (propValue.sm) breakpoints.sm = { [propName]: propValue.sm };
      if (propValue.md) breakpoints.md = { [propName]: propValue.md };
      if (propValue.lg) breakpoints.lg = { [propName]: propValue.lg };
      if (propValue.xl) breakpoints.xl = { [propName]: propValue.xl };

      return breakpointsMedia(breakpoints);
    }

    return {};
  };
}
