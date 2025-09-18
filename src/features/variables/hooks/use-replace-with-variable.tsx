import { useCallback, useMemo } from 'react';

import { useVariables } from '@/stores/variables/selectors';

export function useReplaceWithVariable() {
  const variables = useVariables();

  const variablesObject = useMemo(
    () =>
      variables.reduce<Record<string, string>>((acc, { key, value }) => {
        if (key) {
          acc[key] = value;
        }

        return acc;
      }, {}),
    [variables]
  );

  const replaceWithValue = useCallback(
    (string: string) => {
      const regexp = /\{\{(.+?)\}\}/g;

      return string.replaceAll(regexp, (match, key: string) => variablesObject[key] || match);
    },

    [variablesObject]
  );

  return replaceWithValue;
}
