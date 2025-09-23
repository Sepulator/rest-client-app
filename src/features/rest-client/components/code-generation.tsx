'use client';

import type { ChangeEvent } from 'react';

import { Button, Select, SelectItem } from '@heroui/react';
import HTTPSnippet from 'httpsnippet';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import type { Header } from '@/types/http-request';

import { CODE_LANGUAGES, DELAY } from '@/features/rest-client/constants/language-list';
import { useReplaceWithVariable } from '@/features/variables/hooks/use-replace-with-variable';
import { useCurrentBody, useHeaders, useMethod, useUrl } from '@/stores/rest-client/selectors';

const LIMIT = 2;

const generateCode = (
  language: string,
  method: string,
  headers: Header[],
  url = '',
  defaultError: string,
  replaceVariables: (text: string) => string,
  body?: string
): string => {
  try {
    const validHeaders = headers.filter((h) => h.key && h.value);
    const headersArray = validHeaders.map((h) => ({
      name: replaceVariables(h.key),
      value: replaceVariables(h.value),
    }));

    const har: HTTPSnippet.Data = {
      method: method.toUpperCase(),
      url: replaceVariables(url),
      headers: headersArray,
      cookies: [],
      queryString: [],
      postData: body ? { mimeType: 'application/json', text: replaceVariables(body) } : undefined,
      httpVersion: 'HTTP/1.1',
      headersSize: -1,
      bodySize: body ? new TextEncoder().encode(body).length : 0,
    };

    const snippet = new HTTPSnippet(har);
    const [target, client] = language.split(':', LIMIT);

    return snippet.convert(target, client) || '';
  } catch (error) {
    return `${defaultError} ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const CodeGeneration = () => {
  const method = useMethod();
  const url = useUrl();
  const headers = useHeaders();
  const body = useCurrentBody();
  const [selectedLanguage, setSelectedLanguage] = useState(CODE_LANGUAGES[0].key);
  const [copied, setCopied] = useState(false);
  const t = useTranslations('RestClient');
  const replaceVariables = useReplaceWithVariable();

  const code = generateCode(selectedLanguage, method, headers, url, t('codeError'), replaceVariables, body);
  const currentLanguage = CODE_LANGUAGES.find((lang) => lang.key === selectedLanguage);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, DELAY);
      })
      .catch((error: unknown) => {
        console.error('Failed to copy text:', error);
      });
  }, [code]);

  const handleSelectionChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedLanguage(event.target.value);
    },
    [setSelectedLanguage]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select
          selectedKeys={[selectedLanguage]}
          onChange={handleSelectionChange}
          className="w-48"
          radius="none"
          aria-label="Select language"
        >
          {CODE_LANGUAGES.map((lang) => (
            <SelectItem key={lang.key} textValue={lang.key}>
              {lang.label}
            </SelectItem>
          ))}
        </Select>
        <Button onPress={handleCopy} size="sm" variant="flat" radius="none">
          {copied ? t('copied') : t('copy')}
        </Button>
      </div>
      <SyntaxHighlighter
        language={currentLanguage?.syntax ?? 'text'}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
