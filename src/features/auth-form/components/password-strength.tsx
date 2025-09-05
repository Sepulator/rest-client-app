import { Progress } from '@heroui/react';

import { PASSWORD_STRENGTH_MAX } from '../constants/constants';

const TEXTS = {
  PASSWORD_STRENGTH: 'Password strength',
  PASSWORD_STRENGTH_LABEL_0: 'Too weak',
  PASSWORD_STRENGTH_LABEL_1: 'Weak',
  PASSWORD_STRENGTH_LABEL_2: 'Medium',
  PASSWORD_STRENGTH_LABEL_3: 'Strong',
  PASSWORD_STRENGTH_LABEL_4: 'Excellent',
};

export const PasswordStrength = ({ passwordStrength }: { passwordStrength: number }) => {
  const PASSWORD_STRENGTH_CONFIG: Record<number, { label: string; color: 'danger' | 'warning' | 'success' }> = {
    0: {
      label: TEXTS.PASSWORD_STRENGTH_LABEL_0,
      color: 'danger',
    },
    1: {
      label: TEXTS.PASSWORD_STRENGTH_LABEL_1,
      color: 'danger',
    },
    2: {
      label: TEXTS.PASSWORD_STRENGTH_LABEL_2,
      color: 'warning',
    },
    3: {
      label: TEXTS.PASSWORD_STRENGTH_LABEL_3,
      color: 'warning',
    },
    4: {
      label: TEXTS.PASSWORD_STRENGTH_LABEL_4,
      color: 'success',
    },
  };

  return (
    <Progress
      color={PASSWORD_STRENGTH_CONFIG[passwordStrength].color}
      aria-label={TEXTS.PASSWORD_STRENGTH}
      size="sm"
      label={PASSWORD_STRENGTH_CONFIG[passwordStrength].label}
      maxValue={PASSWORD_STRENGTH_MAX}
      aria-valuemin={0}
      aria-valuemax={PASSWORD_STRENGTH_MAX}
      aria-valuenow={passwordStrength}
      value={passwordStrength}
    />
  );
};
