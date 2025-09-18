'use client';

import { useCallback, useEffect, useState } from 'react';

import { useVariables } from '@/stores/variables/selectors';
import { STORAGE_KEY } from '@/stores/variables/store';

export function useReplaceWithVariable() {
  const variables = useVariables();
  const [_, setStorageVersion] = useState(0);

  const variablesObject = variables.reduce<Record<string, string>>((acc, { key, value }) => {
    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {});

  useEffect(() => {
    const syncWithStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        setStorageVersion((previous) => previous + 1);
      }
    };

    window.addEventListener('storage', syncWithStorage);

    return () => {
      window.removeEventListener('storage', syncWithStorage);
    };
  }, []);

  const replaceWithValue = useCallback(
    (string: string) => {
      const regexp = /\{\{(.+?)\}\}/g;

      return string.replaceAll(regexp, (match, key: string) => variablesObject[key] || match);
    },

    [variablesObject]
  );

  return replaceWithValue;
}
