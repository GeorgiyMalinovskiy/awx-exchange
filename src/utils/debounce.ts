export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeout: NodeJS.Timeout;
  let pending: Promise<ReturnType<T>> | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (pending) return pending;

    pending = new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const result = await func.apply(this, args);
        pending = null;
        resolve(result);
      }, delay);
    });

    return pending;
  };
};
