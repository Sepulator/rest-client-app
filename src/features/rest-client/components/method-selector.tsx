import type { ChangeEvent } from 'react';

import { Select, SelectItem } from '@heroui/react';

type MethodSelectorProps = {
  method: string;
  methods: readonly string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const MethodSelector = ({ method, methods, onChange }: MethodSelectorProps) => (
  <Select
    selectedKeys={[method]}
    onChange={onChange}
    aria-label="Select HTTP method"
    className="w-40 border-1 border-gray-600"
    radius="none"
    placeholder="Method"
  >
    {methods.map((methodOption) => (
      <SelectItem key={methodOption} textValue={methodOption}>
        <span className="font-medium">{methodOption}</span>
      </SelectItem>
    ))}
  </Select>
);
