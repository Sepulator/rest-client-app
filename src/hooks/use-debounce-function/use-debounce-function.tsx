import { useCallback, useRef } from 'react';

export function useDebounce<A>(callback: (argument: A) => void, delay = 150) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const onEdit = useCallback(
    (argument: A) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(argument);
      }, delay);
    },
    [callback, delay]
  );

  return onEdit;
}
