import { Button } from '@heroui/react';

type FormHeadingProps = { action: () => void; heading: string; actionText: string };

export function FormHeading({ action, heading, actionText }: FormHeadingProps) {
  return (
    <div className="mb-5 flex justify-between">
      <h3>{heading}</h3>
      <Button size="sm" variant="flat" radius="none" onPress={action}>
        {actionText}
      </Button>
    </div>
  );
}
