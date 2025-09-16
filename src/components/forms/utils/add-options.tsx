import type { FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';

import { InfoIcon } from '@heroui/shared-icons';

export type RegisteredData<T extends FieldValues> = {
  registerOptions: Record<'key' | 'value', UseFormRegisterReturn<Path<T>>>;
  errors: Partial<Record<'key' | 'value', string>>;
};

export const addOptions = <T extends FieldValues>(inputName: 'key' | 'value', registeredData: RegisteredData<T>) => {
  const { registerOptions, errors } = registeredData;

  return {
    ...registerOptions[inputName],
    endContent: errors[inputName] && <InfoIcon className="text-danger-500" />,
  };
};
