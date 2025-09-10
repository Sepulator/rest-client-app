import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

import { render } from '@testing-library/react';

import { IntlProvider } from './intl-provider';

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => {
  return render(ui, { wrapper: IntlProvider, ...options });
};
