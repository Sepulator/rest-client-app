type FunctionUnknown = (...args: unknown[]) => unknown;

export function throttle<T extends FunctionUnknown>(function_: T, delay = 100) {
  let timer = false;

  return function (...args: Parameters<T>): void {
    if (!timer) {
      function_(...args);
      timer = true;
      setTimeout(() => (timer = false), delay);
    }
  };
}
