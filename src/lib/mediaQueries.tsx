//* Sizes from here
// https://tailwindcss.com/docs/breakpoints

const breakpoints: Record<string, number> = {
  small: 500,
  medium: 768,
  large: 1200,
  xl: 2000,
};

type Sizes = "small" | "medium" | "large" | "xl";

export const mq = (n: Sizes) => {
  const bpArray = Object.keys(breakpoints).map((key) => [key, breakpoints[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export const px = (size: Sizes) => {
  return breakpoints[size];
};
