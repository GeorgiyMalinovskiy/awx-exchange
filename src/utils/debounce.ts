export const debounce = (func: () => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return function (this: unknown, ...args: never[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};
