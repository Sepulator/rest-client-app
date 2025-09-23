'use client';

import { useCallback, useEffect } from 'react';

import { useVariables } from '@/stores/variables/selectors';
import { updateStore } from '@/stores/variables/store';

export function useReplaceWithVariable() {
  const variables = useVariables();

  const variablesObject = variables.reduce<Record<string, string>>((acc, { key, value }) => {
    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {});

  useEffect(() => {
    document.addEventListener('visibilitychange', updateStore);
    window.addEventListener('focus', updateStore);

    return () => {
      document.removeEventListener('visibilitychange', updateStore);
      window.removeEventListener('focus', updateStore);
    };
  }, []);

  const replaceWithValue = useCallback(
    (string: string) => {
      const regexp = /\{\{(.+?)\}\}/g;

      return string.replaceAll(regexp, (match, key: string) => variablesObject[key.trim()] || match);
    },

    [variablesObject]
  );

  return replaceWithValue;
}
