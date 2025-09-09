import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import en from '../../messages/en.json';

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => {
  const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
      <NextIntlClientProvider locale="en" messages={en}>
        {children}
      </NextIntlClientProvider>
    );
  };

  return render(ui, { wrapper: Providers, ...options });
};
