const TEXTS = {
  PASSWORD_STRENGTH_LABEL_0: 'Empty',
  PASSWORD_STRENGTH_LABEL_1: 'Weak',
  PASSWORD_STRENGTH_LABEL_2: 'Medium',
  PASSWORD_STRENGTH_LABEL_3: 'Strong',
  PASSWORD_STRENGTH_LABEL_4: 'Excellent',
};

type Props = {
  passwordStrength: number;
};

export const useStrength = ({ passwordStrength }: Props) => {
  const STRENGTH_CONFIG: Record<number, { label: string; color: 'danger' | 'warning' | 'success' }> = {
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

  const { label, color } = STRENGTH_CONFIG[passwordStrength];

  return { label, color } as const;
};
