'use client';

import { Input } from '@heroui/react';
import { useState } from 'react';

import { EyeFilledIcon } from './eye-filled-icon';
import { EyeSlashFilledIcon } from './eye-slash-filled-icon';

const TEXTS = {
  PASSWORD_LABEL: 'Password',
  PASSWORD_PLACEHOLDER: 'Enter your password',
  PASSWORD_ERROR: 'Please enter a valid password',
  PASSWORD_TOGGLE_VISIBILITY: 'toggle password visibility',
};

export const PasswordInput = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Input
      className="max-w-xs"
      isRequired
      endContent={
        <button
          aria-label={TEXTS.PASSWORD_TOGGLE_VISIBILITY}
          className="cursor-pointer outline-transparent focus:outline-solid"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          ) : (
            <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          )}
        </button>
      }
      errorMessage={TEXTS.PASSWORD_ERROR}
      labelPlacement="outside"
      label={TEXTS.PASSWORD_LABEL}
      placeholder={TEXTS.PASSWORD_PLACEHOLDER}
      type={isVisible ? 'text' : 'password'}
    />
  );
};
