import { screen, within } from '@testing-library/react';

import type { HistoryProps } from '@/features/history/components/history';

import { ROUTES } from '@/config/routes';
import { HistoryData } from '@/features/history/components/history';
import { ANALYTIC_KEYS } from '@/features/history/constants/analitic-keys';
import { mockHistoryData } from '@/testing/mocks/history';
import { renderWithProviders } from '@/testing/utils/render-with-providers';

const useTranslationsMock = (key: string) => key;

vi.mock('next-intl', async (importOriginal) => {
  const module_: object = await importOriginal();

  return {
    ...module_,
    useTranslations: () => useTranslationsMock,
    useLocale: () => 'en',
  };
});

const setupHistory = (props?: Partial<HistoryProps>) =>
  renderWithProviders(<HistoryData historyData={mockHistoryData} {...props} />);

describe('History', () => {
  describe('Render', () => {
    it('should render empty state', () => {
      setupHistory({ historyData: [] });

      const link = screen.getByRole('link', { name: /link/i });

      expect(link).toHaveAttribute('href', `/en${ROUTES.CLIENT}`);
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('description')).toBeInTheDocument();
    });

    it('should render data', () => {
      setupHistory();

      const items = screen.getAllByRole('listitem');

      items.forEach((item, index) => {
        const container = within(item);
        const data = mockHistoryData[index];

        expect(container.getByText(data.method)).toBeInTheDocument();
        expect(container.getByText(data.url)).toBeInTheDocument();

        ANALYTIC_KEYS.forEach((key) => {
          const value = data[key] ?? '-';
          const keyElement = within(container.getByTestId(`analytic-${key}`));

          expect(keyElement.getByText(value.toString())).toBeInTheDocument();
        });
      });

      expect(items.length).toBe(mockHistoryData.length);
    });
  });
});
