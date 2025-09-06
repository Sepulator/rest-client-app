import * as v from 'valibot';

import { MIN_PASSWORD_LENGTH } from '../constants/constants';

const VALIDATION_MESSAGES = {
  MIN_LENGTH: 'Password must be at least 8 characters',
  NUMBER: 'Password must contain at least one number',
  LETTER: 'Password must contain at least one letter',
  SPECIAL_CHARACTER: 'Password must contain at least one special character',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Email is invalid',
};

const EMAIL_NAME = 'email';
const PASSWORD_NAME = 'password';

export const useSchemas = () => {
  const passwordSchema = v.pipe(
    v.string(),
    v.regex(/\p{N}/u, VALIDATION_MESSAGES.NUMBER),
    v.regex(/\p{L}/u, VALIDATION_MESSAGES.LETTER),
    v.regex(/[^\p{L}\p{N}]/u, VALIDATION_MESSAGES.SPECIAL_CHARACTER),
    v.minLength(MIN_PASSWORD_LENGTH, VALIDATION_MESSAGES.MIN_LENGTH)
  );

  const emailSchema = v.pipe(
    v.string(),
    v.nonEmpty(VALIDATION_MESSAGES.EMAIL_REQUIRED),
    v.email(VALIDATION_MESSAGES.EMAIL_INVALID)
  );

  const authSchema = v.object({
    [EMAIL_NAME]: emailSchema,
    [PASSWORD_NAME]: passwordSchema,
  });

  return { authSchema, passwordSchema, emailSchema };
};
