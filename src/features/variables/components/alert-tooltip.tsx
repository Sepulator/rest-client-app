import { Tooltip } from '@heroui/react';
import { InfoIcon } from '@heroui/shared-icons';

type AlertTooltipProps = {
  content: string;
};

export function AlertTooltip({ content }: AlertTooltipProps) {
  return (
    <Tooltip color="danger" content={content} className="max-w-55">
      <span role="alert" className="text-danger cursor-pointer text-lg active:opacity-50">
        <InfoIcon className="text-danger-500" />
      </span>
    </Tooltip>
  );
}
