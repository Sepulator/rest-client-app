import { screen } from '@testing-library/react';

import { CARDS_KEYS } from '@/features/home-screen/constants';
import { HomeScreen } from '@/features/home-screen/home-screen';
import { renderWithProviders } from '@/testing/utils/render-with-providers';

import en from '../../../messages/en.json';

describe('HomeScreen', () => {
  describe('Render', () => {
    it('should render titles and descriptions', () => {
      renderWithProviders(<HomeScreen />);
      const homeMessages = en.HomePage;

      expect(screen.getByText(homeMessages.intro.title)).toBeInTheDocument();
      expect(screen.getByText(homeMessages.features.title)).toBeInTheDocument();
      expect(screen.getByText(homeMessages.intro.description)).toBeInTheDocument();
      expect(screen.getByText(homeMessages.intro.title)).toBeInTheDocument();
    });

    it('should render cards', () => {
      renderWithProviders(<HomeScreen />);
      const homeCardsInfo = en.HomePage.keyFeatures;

      CARDS_KEYS.forEach((key) => {
        expect(screen.getByText(homeCardsInfo[key].title)).toBeInTheDocument();
        expect(screen.getByText(homeCardsInfo[key].icon)).toBeInTheDocument();
        expect(screen.getByText(homeCardsInfo[key].description)).toBeInTheDocument();
      });
    });
  });
});
