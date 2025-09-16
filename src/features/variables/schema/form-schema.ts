import * as v from 'valibot';

const FieldSchema = v.pipe(
  v.object({
    key: v.pipe(v.string(), v.regex(/^[a-zA-Z0-9]+$/, 'Must contain only English letters or numbers')),
    value: v.string(),
  })
);

export const variablesSchema = v.object({
  variables: v.pipe(v.array(FieldSchema)),
});

export type VariablesValue = v.InferInput<typeof FieldSchema>;

export type VariablesFields = v.InferInput<typeof variablesSchema>;
