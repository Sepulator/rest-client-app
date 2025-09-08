'use client';

import type { ChangeEvent, FormEvent } from 'react';

import { Button, Input, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';

import { SubmitIcon } from '@/components/icons/submit-icon';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
const DURATION = 1500;

export const HttpRequestForm = () => {
  const [selectedMethod, setSelectedMethod] = useState(HTTP_METHODS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');

  const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!url) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, DURATION);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-xl flex-row">
      <Select
        selectedKeys={[selectedMethod]}
        onChange={handleSelectionChange}
        aria-label="Select HTTP method"
        className="w-40"
        radius="none"
        placeholder="Method"
      >
        {HTTP_METHODS.map((method) => (
          <SelectItem key={method} textValue={method}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{method}</span>
            </div>
          </SelectItem>
        ))}
      </Select>

      <Input
        placeholder="https://api.example.com/endpoint"
        value={url}
        onValueChange={setUrl}
        radius="none"
        className="border-l-0"
      />

      <div>
        <Button type="submit" color="primary" isLoading={isLoading} radius="none">
          {!isLoading && <SubmitIcon />}
          Send
        </Button>
      </div>
    </form>
  );
};
