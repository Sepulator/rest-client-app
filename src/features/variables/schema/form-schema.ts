import * as v from 'valibot';

const skipEmptyString = (callback: (value: string) => boolean, message: string) => {
  return v.check((value: string) => value === '' || callback(value), message);
};

const FieldSchema = v.pipe(
  v.object({
    key: v.pipe(
      v.string(),
      skipEmptyString((value) => !/^\s|\s$/.test(value), 'Must not have leading or trailing whitespace'),
      skipEmptyString(
        (value) => /^[a-zA-Z0-9_-]+$/.test(value),
        'Must contain only English letters, numbers, underscores or hyphens'
      )
    ),
    value: v.string(),
  })
);

export const variablesSchema = v.object({
  variables: v.pipe(v.array(FieldSchema)),
});

export type VariablesValue = v.InferInput<typeof FieldSchema>;

export type VariablesFields = v.InferInput<typeof variablesSchema>;
