import { Button, Input } from '@heroui/react';
import { CloseIcon } from '@heroui/shared-icons';

import type { Header } from '@/types/http-request';

type HeaderRequestProps = {
  header: Header;
  onUpdate: (updates: Partial<Header>) => void;
  onRemove: () => void;
};

export const HeaderRequest = ({ header, onUpdate, onRemove }: HeaderRequestProps) => {
  return (
    <div className="mb-2 flex w-xl gap-2">
      <Input
        variant="underlined"
        value={header.key}
        onValueChange={(key) => {
          onUpdate({ key });
        }}
        placeholder="header"
        className="border-b-1 border-gray-600"
      />
      <Input
        variant="underlined"
        value={header.value}
        onValueChange={(value) => {
          onUpdate({ value });
        }}
        placeholder="value"
        className="border-b-1 border-gray-600"
      />
      <Button
        startContent={<CloseIcon />}
        className="w-fit"
        isIconOnly
        radius="none"
        variant="light"
        onPress={onRemove}
      />
    </div>
  );
};
