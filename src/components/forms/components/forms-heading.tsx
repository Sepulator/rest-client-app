import { Button } from '@heroui/react';

type FormHeadingProps = { handleAdd: () => void };

export function FormHeading({ handleAdd }: FormHeadingProps) {
  return (
    <div className="mb-5 flex justify-between">
      <h3>Variables</h3>
      <Button
        size="sm"
        variant="flat"
        radius="none"
        onPress={() => {
          handleAdd();
        }}
      >
        Add Variable
      </Button>
    </div>
  );
}
