import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { AppContext, CharacterType } from 'app/context';
import Characters from 'app/data/mock/characters.json';

const mockCharacter = Characters.data.results;
const setCharacters = jest.fn();
const setShowFavourites = jest.fn();

const renderComponent = (characters: CharacterType[]) =>
  render(
    <AppContext.Provider
      value={{
        characters,
        actions: { setShowFavourites, setCharacters }
      }}
    >
      <SearchBar />
    </AppContext.Provider>
  );

describe('Component: SearchBar', () => {
  it('Should render', () => {
    renderComponent(mockCharacter);
    const mainElement = screen.getByTestId('search-bar');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should render with the search icon', () => {
    renderComponent(mockCharacter);
    const svgElements = document.getElementsByTagName('svg');
    expect(svgElements.length).toBe(1);
  });
  it('Should render with the correct placeholder', () => {
    renderComponent(mockCharacter);
    const inputElement = screen.getByPlaceholderText('Search a character...');
    expect(inputElement).toBeInTheDocument();
  });
  it('Should render with the correct results number', () => {
    renderComponent(mockCharacter);
    const resultsElement = screen.getByTestId('search-results');
    expect(resultsElement.textContent).toBe(`${mockCharacter.length} RESULTS`);
  });
  it('Should run the handleSearch function when typing', async () => {
    renderComponent(mockCharacter);
    const inputElement = screen.getByPlaceholderText('Search a character...');
    fireEvent.change(inputElement, { target: { value: 'spider' } });
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(setShowFavourites).toHaveBeenCalledWith(false);
  });
});
