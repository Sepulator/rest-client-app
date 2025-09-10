import type { RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';

import { render } from '@testing-library/react';

import type { ProvidersProps } from '@/app/[locale]/providers';

import { Providers } from '@/app/[locale]/providers';
import { mockUser } from '@/testing/mocks/user';

import en from '../../../messages/en.json';

type RequiredProviderProps = Omit<ProvidersProps, 'children'>;
type MockProviderProps = Partial<RequiredProviderProps>;

export type ExtendedOptions = Omit<RenderOptions, 'wrapper'> & { providerOptions?: MockProviderProps };

export const MOCK_LOCALE = 'en';

const baseMockOptions: RequiredProviderProps = {
  locale: MOCK_LOCALE,
  messages: en,
  userData: mockUser,
};

export const renderWithProviders = (ui: ReactElement, options?: ExtendedOptions): ReturnType<typeof render> => {
  const providerProps = { ...baseMockOptions, ...options?.providerOptions };
  const wrapper = ({ children }: PropsWithChildren) => <Providers {...providerProps}>{children}</Providers>;

  return render(ui, { wrapper, ...options });
};
