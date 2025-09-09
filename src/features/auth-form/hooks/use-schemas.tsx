import { useTranslations } from 'next-intl';
import * as v from 'valibot';

import { MIN_PASSWORD_LENGTH } from '../constants/constants';

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';

export const useSchemas = () => {
  const t = useTranslations('Schemas');
  const passwordSchema = v.pipe(
    v.string(),
    v.regex(/\p{N}/u, t('number')),
    v.regex(/\p{L}/u, t('letter')),
    v.regex(/[^\p{L}\p{N}]/u, t('specialCharacter')),
    v.minLength(MIN_PASSWORD_LENGTH, t('minLength'))
  );

  const emailSchema = v.pipe(v.string(), v.nonEmpty(t('emailRequired')), v.email(t('emailInvalid')));

  const authSchema = v.object({
    [EMAIL_NAME]: emailSchema,
    [PASSWORD_NAME]: passwordSchema,
  });

  return { authSchema, passwordSchema, emailSchema };
};
