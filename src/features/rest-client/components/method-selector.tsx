import { Select, SelectItem } from '@heroui/react';
import { useCallback, type ChangeEvent } from 'react';

import { HTTP_METHODS } from '@/features/rest-client/constants/http-request';
import { useMethod, useSetMethod } from '@/stores/rest-client/selectors';

export const MethodSelector = () => {
  const method = useMethod();
  const setMethod = useSetMethod();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setMethod(event.target.value);
    },
    [setMethod]
  );

  return (
    <Select
      selectedKeys={[method]}
      onChange={handleChange}
      aria-label="Select HTTP method"
      className="w-40 border-1 border-gray-600"
      radius="none"
      placeholder="Method"
    >
      {HTTP_METHODS.map((methodOption) => (
        <SelectItem key={methodOption} textValue={methodOption}>
          <span className="font-medium">{methodOption}</span>
        </SelectItem>
      ))}
    </Select>
  );
};
