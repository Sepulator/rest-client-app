import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const useStrength = () => {
  const t = useTranslations('PasswordStrength');

  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const STRENGTH_CONFIG: Record<number, { label: string; color: 'danger' | 'warning' | 'success' }> = {
    0: {
      label: t('label0'),
      color: 'danger',
    },
    1: {
      label: t('label1'),
      color: 'danger',
    },
    2: {
      label: t('label2'),
      color: 'warning',
    },
    3: {
      label: t('label3'),
      color: 'warning',
    },
    4: {
      label: t('label4'),
      color: 'success',
    },
  };

  const { label, color } = STRENGTH_CONFIG[passwordStrength];

  return { label, color, passwordStrength, setPasswordStrength } as const;
};
