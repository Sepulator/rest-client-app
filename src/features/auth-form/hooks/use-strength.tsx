import { useTranslations } from 'next-intl';

type Props = {
  passwordStrength: number;
};

export const useStrength = ({ passwordStrength }: Props) => {
  const t = useTranslations('PasswordStrength');
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

  return { label, color } as const;
};
