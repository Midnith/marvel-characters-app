import { screen, render } from '@testing-library/react';
import { Landing } from './Landing';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, CharacterType } from 'app/context';
import Characters from 'app/data/mock/characters.json';

const mockCharacters = Characters.data.results;
const isLoading = false;
const showFavourites = false;
const mockFavourites = Characters.data.results
  .slice(0, 3)
  .map((favChar: CharacterType) => JSON.stringify(favChar));
const setShowFavourites = jest.fn();
const setFavourites = jest.fn();
const clearCharacters = jest.fn();
const addCharacter = jest.fn();
const setIsLoading = jest.fn();

const renderComponent = (isLoading: boolean, showFavourites: boolean) =>
  render(
    <AppContext.Provider
      value={{
        favourites: mockFavourites,
        characters: mockCharacters,
        isLoading,
        showFavourites,
        actions: {
          setShowFavourites,
          setFavourites,
          clearCharacters,
          addCharacter,
          setIsLoading
        }
      }}
    >
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    </AppContext.Provider>
  );

describe('Page: Landing', () => {
  it('Should render', () => {
    renderComponent(isLoading, showFavourites);
    const mainElement = screen.getByTestId('page-landing');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should render the SearchBar', () => {
    renderComponent(isLoading, showFavourites);
    const searchBarElement = screen.getByPlaceholderText(
      'Search a character...'
    );
    expect(searchBarElement).toBeInTheDocument();
  });
  it('Should render the Characters', () => {
    renderComponent(isLoading, showFavourites);
    const charactersElement = screen.getByTestId('landing-characters');
    expect(charactersElement.childElementCount).toBe(mockCharacters.length);
  });
  it('Should show Favourites title when shownFavourites is true', () => {
    renderComponent(isLoading, true);
    const favouritesTitle = screen.getByText('Favourites');
    expect(favouritesTitle.style.opacity).toBe('1');
    const charactersElement = screen.getByTestId('landing-characters');
    expect(charactersElement.childElementCount).toBe(mockFavourites.length);
  });
  it('Should not show Favourites title when shownFavourites is false', () => {
    renderComponent(isLoading, showFavourites);
    const favouritesTitle = screen.getByText('Favourites');
    expect(favouritesTitle?.style.opacity).toBe('0');
  });
  it('Should show Favourites characters when shownFavourites is true', () => {
    renderComponent(isLoading, true);
    const charactersElement = screen.getByTestId('landing-characters');
    expect(charactersElement.childElementCount).toBe(mockFavourites.length);
  });
  it('Should show LoadingBar when isLoading is true', () => {
    renderComponent(true, showFavourites);
    const loadingBar = screen.getByTestId('loading-bar');
    expect(loadingBar).toBeInTheDocument();
  });
  it('Should not show LoadingBar when isLoading is false', () => {
    renderComponent(isLoading, showFavourites);
    const loadingBar = screen.queryByTestId('loading-bar');
    expect(loadingBar).not.toBeInTheDocument();
  });
});
