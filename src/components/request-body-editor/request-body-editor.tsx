import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { Button } from '@heroui/react';
import CodeMirror from '@uiw/react-codemirror';
import { useMemo } from 'react';

type Props = {
  body: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  mode?: 'json' | 'text';
  title?: string;
};

const SPACE_SIZE = 2;

export const RequestBodyEditor = ({
  body,
  onChange,
  readOnly = false,
  mode = 'json',
  title = 'JSON Content',
}: Props) => {
  const jsonError = useMemo(() => {
    if (mode !== 'json' || !body.trim()) return null;
    try {
      JSON.parse(body);

      return null;
    } catch (error) {
      return error instanceof Error ? error.message : 'Invalid JSON';
    }
  }, [body, mode]);

  const prettifyJSON = () => {
    if (!onChange) return;
    try {
      const parsed: unknown = JSON.parse(body);

      onChange(JSON.stringify(parsed, null, SPACE_SIZE));
    } catch {}
  };

  return (
    <>
      <div className="mb-2 flex h-8 items-center justify-between">
        <span>{title}</span>
        {mode === 'json' && !readOnly && onChange && (
          <Button size="sm" variant="flat" radius="none" onPress={prettifyJSON}>
            Prettify JSON
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
