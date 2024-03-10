import { render, screen } from '@testing-library/react';
import { TopBar } from './TopBar';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, CharacterType } from 'app/context';
import Characters from 'app/data/mock/characters.json';
import config from 'config';

const mockFavourites = Characters.data.results
  .slice(0, 3)
  .map((favChar: CharacterType) => JSON.stringify(favChar));
const setShowFavourites = jest.fn();

const renderComponent = () =>
  render(
    <AppContext.Provider
      value={{ favourites: mockFavourites, actions: { setShowFavourites } }}
    >
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>
    </AppContext.Provider>
  );

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('Component: TopBar', () => {
  it('Should render', () => {
    renderComponent();
    const mainElement = screen.getByRole('navigation');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should render the Marvel logo', () => {
    renderComponent();
    const marvelLogoBtn = screen.getByRole('link');
    const marvelLogoSvg = marvelLogoBtn.getElementsByTagName('svg');
    expect(marvelLogoBtn).toBeInTheDocument();
    expect(marvelLogoSvg.length).toBe(1);
  });
  it('Should navigate when click on Marvel logo', () => {
    renderComponent();
    const marvelLogoBtn = screen.getByRole('link');
    marvelLogoBtn.click();
    expect(mockedUsedNavigate).toHaveBeenCalledWith(config.PATH.LANDING);
    mockedUsedNavigate.mockRestore();
  });
  it('Should render the favourites icon', () => {
    renderComponent();
    const favouriteBtn = screen.getByText(mockFavourites.length.toString());
    const svgElements = favouriteBtn.getElementsByTagName('svg');
    expect(favouriteBtn).toBeInTheDocument();
    expect(svgElements.length).toBe(1);
  });
  it('Should counter the favourites properly', () => {
    renderComponent();
    const favouriteBtn = screen.getByText(mockFavourites.length.toString());
    expect(favouriteBtn.textContent).toContain(
      mockFavourites.length.toString()
    );
  });
  it('Should navigate and search for favourites when click on Favourites button', () => {
    renderComponent();
    const favouriteBtn = screen.getByText(mockFavourites.length.toString());
    favouriteBtn.click();
    expect(mockedUsedNavigate).toHaveBeenCalledWith(config.PATH.LANDING);
    expect(setShowFavourites).toHaveBeenCalledWith(true);
    mockedUsedNavigate.mockRestore();
  });
});
