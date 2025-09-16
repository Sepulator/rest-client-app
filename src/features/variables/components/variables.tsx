'use client';
import { VariableForm } from '@/features/variables/components/variables-form';
import { useIsHydrated } from '@/stores/variables/store';

export function Variables() {
  const hydrated = useIsHydrated();

  if (!hydrated) {
    return <div>Loading</div>;
  }

  return <VariableForm />;
}
