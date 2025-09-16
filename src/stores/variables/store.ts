import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { VariablesValue } from '@/features/variables/schema/form-schema';

export type DefaultField = { key: string; value: string };

type VariablesStoreType = {
  variables: VariablesValue[];
  isHydrated: boolean;
};

type VariablesStoreActions = {
  actions: {
    addVariable: () => void;
    removeVariable: (index: number) => void;
    updateVariable: (updates: Partial<VariablesValue>, index: number) => void;
    setHydrated: () => void;
  };
};

export const defaultField = { key: '', value: '' };
const setHydratedStorage = (state?: VariablesStoreType & VariablesStoreActions) => {
  state?.actions.setHydrated();
};

export const useVariablesStore = create<VariablesStoreType & VariablesStoreActions>()(
  persist(
    (set) => ({
      variables: [defaultField],
      isHydrated: false,

      actions: {
        setHydrated: () => set({ isHydrated: true }),

        addVariable: () =>
          set((state) => {
            return { variables: [...state.variables, defaultField] };
          }),

        removeVariable: (index) =>
          set((state) => {
            return { variables: state.variables.toSpliced(index, 1) };
          }),

        updateVariable: (updates, index) =>
          set((state) => {
            const variables = [...state.variables];

            variables[index] = { ...variables[index], ...updates };

            return { variables };
          }),
      },
    }),
    {
      name: 'variables-store',
      onRehydrateStorage: () => setHydratedStorage,
      partialize: (state) => ({ variables: state.variables }),
    }
  )
);

export const useVariables = () => useVariablesStore((store) => store.variables);

export const useIsHydrated = () => useVariablesStore((store) => store.isHydrated);

export const useIsDuplicate = (index: number) =>
  useVariablesStore(({ variables }) =>
    variables.some((item, i) => item.key && item.key === variables[index]?.key && i !== index)
  );

export const useVariablesActions = () => useVariablesStore((store) => store.actions);
