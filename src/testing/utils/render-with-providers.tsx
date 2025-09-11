import type { RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';

import { render } from '@testing-library/react';

import type { ProvidersProps } from '@/app/[locale]/providers';

import { Providers } from '@/app/[locale]/providers';
import { mockUser } from '@/testing/mocks/user';
import { IntlProvider } from '@/testing/utils/intl-provider';

type RequiredProviderProps = Omit<ProvidersProps, 'children'>;
type MockProviderProps = Partial<RequiredProviderProps>;

export type ExtendedOptions = Omit<RenderOptions, 'wrapper'> & { providerOptions?: MockProviderProps };

const baseMockOptions: RequiredProviderProps = {
  userData: mockUser,
};

export const renderWithProviders = (ui: ReactElement, options?: ExtendedOptions): ReturnType<typeof render> => {
  const providerProps = { ...baseMockOptions, ...options?.providerOptions };

  const wrapper = ({ children }: PropsWithChildren) => (
    <IntlProvider>
      <Providers {...providerProps}>{children}</Providers>
    </IntlProvider>
  );

  return render(ui, { wrapper, ...options });
};
