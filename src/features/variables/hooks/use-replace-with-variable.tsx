import { useCallback, useMemo } from 'react';

import { useVariables } from '@/stores/variables/store';

export function useReplaceWithVariable() {
  const variables = useVariables();

  const variablesObject = useMemo(
    () =>
      variables.reduce<Record<string, string>>((acc, { key, value }) => {
        acc[key] = value;

        return acc;
      }, {}),
    [variables]
  );

  const replaceWithValue = useCallback(
    (string: string) =>
      string.replaceAll(/\{\{(.+?)\}\}/g, (match, key: string) => variablesObject[key.trim()] || match),
    [variablesObject]
  );

  return replaceWithValue;
}
