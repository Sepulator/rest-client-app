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
import { useCurrentBody, useHeaders, useMethod, useUrl } from '@/stores/rest-client/selectors';

const generateCode = (language: string, method: string, headers: Header[], url = '', body?: string): string => {
  try {
    const validHeaders = headers.filter((h) => h.key && h.value);
    const headersArray = validHeaders.map((h) => ({
      name: h.key,
      value: h.value,
    }));

    const har: HTTPSnippet.Data = {
      method: method.toUpperCase(),
      url,
      headers: headersArray,
      cookies: [],
      queryString: [],
      postData: body ? { mimeType: 'application/json', text: body } : undefined,
      httpVersion: 'HTTP/1.1',
      headersSize: -1,
      bodySize: body ? body.length : 0,
    };

    const snippet = new HTTPSnippet(har);
    const [target, client] = language.split(':');

    return snippet.convert(target, client) || '';
  } catch {
    return 'Error generating code snippet';
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

  const code = generateCode(selectedLanguage, method, headers, url, body);
  const currentLanguage = CODE_LANGUAGES.find((lang) => lang.key === selectedLanguage);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, DELAY);
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
