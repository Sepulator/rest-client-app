import type { ReactNode } from 'react';

import { Tab, Tabs } from '@heroui/react';

type ModeOption<T> = {
  value: T;
  label: string;
  children?: ReactNode;
};

type Props<T> = {
  options: ModeOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const ModeSwitcher = <T extends string | number | boolean>({
  options,
  value,
  onChange,
  size = 'sm',
  className,
}: Props<T>) => {
  return (
    <Tabs
      selectedKey={String(value)}
      onSelectionChange={(key) => {
        const option = options.find((opt) => String(opt.value) === key);

        if (option) {
          onChange(option.value);
        }
      }}
      size={size}
      className={className}
    >
      {options.map((option) => (
        <Tab key={String(option.value)} title={option.label}>
          {option.children}
        </Tab>
      ))}
    </Tabs>
  );
};
