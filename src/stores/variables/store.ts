import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DefaultField = { key: string; value: string; id: string };

type VariablesStoreType = {
  variables: DefaultField[];
  isHydrated: boolean;
};

type VariablesStoreActions = {
  actions: {
    addVariable: () => void;
    removeVariable: (index: number) => void;
    clearVariables: () => void;
    updateVariable: (updates: Partial<DefaultField>, index: number) => void;
    setHydrated: () => void;
  };
};

export const defaultField = { key: '', value: '' };
const getField = () => ({ key: '', value: '', id: crypto.randomUUID() });
const setHydratedStorage = (state?: VariablesStoreType & VariablesStoreActions) => {
  state?.actions.setHydrated();
};

export const useVariablesStore = create<VariablesStoreType & VariablesStoreActions>()(
  persist(
    (set) => ({
      variables: [getField()],
      isHydrated: false,

      actions: {
        setHydrated: () => set({ isHydrated: true }),

        addVariable: () =>
          set((state) => {
            return { variables: [...state.variables, getField()] };
          }),

        removeVariable: (index) =>
          set((state) => {
            return { variables: state.variables.toSpliced(index, 1) };
          }),

        clearVariables: () =>
          set(() => {
            return { variables: [getField()] };
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
