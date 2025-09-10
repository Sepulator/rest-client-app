import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { Button } from '@heroui/react';
import CodeMirror from '@uiw/react-codemirror';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

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
  const { jsonError, parsedJson } = useMemo(() => {
    if (mode !== 'json' || !body.trim()) return { jsonError: null, parsedJson: null };
    try {
      const parsed: unknown = JSON.parse(body);

      return { jsonError: null, parsedJson: parsed };
    } catch (error) {
      return {
        jsonError: error instanceof Error ? error.message : 'Invalid JSON',
        parsedJson: null,
      };
    }
  }, [body, mode]);

  const prettifyJSON = () => {
    if (!onChange || !parsedJson) return;

    try {
      onChange(JSON.stringify(parsedJson, null, SPACE_SIZE));
    } catch {}
  };

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
        value={body}
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
