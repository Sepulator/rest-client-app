import { object, string, safeParse } from 'valibot';

const headerSchema = object({
  header: string(),
  value: string(),
});

export const validateHeaderData = (data: { header: FormDataEntryValue | null; value: FormDataEntryValue | null }) => {
  return safeParse(headerSchema, data);
};
