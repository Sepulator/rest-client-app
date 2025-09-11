import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { Button } from '@heroui/react';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

type Props = {
  body: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  mode?: 'json' | 'text';
  title?: string;
};

const SPACE_SIZE = 2;

export const RequestBodyEditor = ({ body, onChange, readOnly = false, mode = 'json', title }: Props) => {
  const t = useTranslations('RestClient');

  const { jsonError, parsedJson, displayBody } = useMemo(() => {
    if (mode !== 'json' || !body.trim()) return { jsonError: null, parsedJson: null, displayBody: body };
    try {
      const parsed: unknown = JSON.parse(body);
      const prettified = JSON.stringify(parsed, null, SPACE_SIZE);

      return { jsonError: null, parsedJson: parsed, displayBody: prettified };
    } catch (error) {
      return {
        jsonError: error instanceof Error ? error.message : 'Invalid JSON',
        parsedJson: null,
        displayBody: body,
      };
    }
  }, [body, mode]);

  const prettifyJSON = useCallback(() => {
    if (!onChange || !parsedJson) return;

    onChange(JSON.stringify(parsedJson, null, SPACE_SIZE));
  }, [onChange, parsedJson]);

  return (
    <>
      <div className="mb-2 flex h-8 items-center justify-between">
        <span>{title}</span>
        {mode === 'json' && !readOnly && onChange && (
          <Button size="sm" variant="flat" radius="none" onPress={prettifyJSON}>
            {t('prettify')}
          </Button>
        )}
      </div>
      <CodeMirror
        value={displayBody}
        onChange={onChange}
        editable={!readOnly}
        extensions={mode === 'json' ? [json(), EditorView.lineWrapping] : [EditorView.lineWrapping]}
        height="400px"
        theme="dark"
        style={{
          fontFamily: 'ui-monospace, monospace',
          border: '1px solid #374151',
        }}
      />
      {jsonError && <div className="mt-1 text-sm text-red-400">{jsonError}</div>}
    </>
  );
};
