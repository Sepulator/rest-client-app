import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

import en from '../../messages/en.json';

export const IntlProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextIntlClientProvider locale="en" messages={en}>
      {children}
    </NextIntlClientProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => {
  return render(ui, { wrapper: IntlProvider, ...options });
};

export const renderWithUserEvent = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const rendered = renderWithProviders(ui, options);

  const user = userEvent.setup();

  return {
    ...rendered,
    user,
  };
};
