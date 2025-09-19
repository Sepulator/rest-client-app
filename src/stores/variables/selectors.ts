import { useVariablesStore } from '@/stores/variables/store';

export const useVariables = () => useVariablesStore((store) => store.variables);

export const useIsHydrated = () => useVariablesStore((store) => store.isHydrated);

export const useIsDuplicate = (index: number) =>
  useVariablesStore(({ variables }) =>
    variables.some((item, i) => item.key && item.key === variables[index]?.key && i !== index)
  );

export const useVariablesActions = () => useVariablesStore((store) => store.actions);
