import type { StateCreator } from 'zustand';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DefaultField = { key: string; value: string; id: string };

export type VariablesStoreType = {
  variables: DefaultField[];
  isHydrated: boolean;
};

export type VariablesStoreActions = {
  actions: {
    addVariable: () => void;
    removeVariable: (index: number) => void;
    clearVariables: () => void;
    updateVariable: (updates: Partial<DefaultField>, index: number) => void;
    setHydrated: () => void;
  };
};

const getField = () => ({ key: '', value: '', id: crypto.randomUUID() });
const setHydratedStorage = (state?: VariablesStoreType & VariablesStoreActions) => {
  state?.actions.setHydrated();
};

export const STORAGE_KEY = 'variables-store';

export const variablesStoreCreator: StateCreator<VariablesStoreType & VariablesStoreActions> = (set) => ({
  variables: [getField()],
  isHydrated: false,

  actions: {
    setHydrated: () => {
      set({ isHydrated: true });
    },

    addVariable: () => {
      set((state) => {
        return { variables: [...state.variables, getField()] };
      });
    },

    removeVariable: (index) => {
      set((state) => {
        return { variables: state.variables.toSpliced(index, 1) };
      });
    },

    clearVariables: () => {
      set(() => {
        return { variables: [getField()] };
      });
    },

    updateVariable: (updates, index) => {
      set((state) => {
        const variables = [...state.variables];

        if (state.variables[index]) {
          variables[index] = { ...variables[index], ...updates };
        }

        return { variables };
      });
    },
  },
});

export const useVariablesStore = create<VariablesStoreType & VariablesStoreActions>()(
  persist(variablesStoreCreator, {
    name: STORAGE_KEY,
    onRehydrateStorage: () => setHydratedStorage,
    partialize: (state) => ({ variables: state.variables }),
  })
);

export const updateStore = () => {
  void useVariablesStore.persist.rehydrate();
};
