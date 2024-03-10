import { render, screen } from '@testing-library/react';
import { CharacterSummary } from './CharacterSummary';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, CharacterType } from 'app/context';
import Characters from 'app/data/mock/characters.json';

const mockCharacter = Characters.data.results[2];

const favourites = Characters.data.results
  .slice(0, 3)
  .map((favChar: CharacterType) => JSON.stringify(favChar));
const addFavourite = jest.fn();
const removeFavourite = jest.fn();

const renderComponent = (favourites: string[]) =>
  render(
    <AppContext.Provider
      value={{
        favourites,
        actions: { addFavourite, removeFavourite }
      }}
    >
      <BrowserRouter>
        <CharacterSummary character={mockCharacter} />
      </BrowserRouter>
    </AppContext.Provider>
  );
describe('Component: CharacterSummary', () => {
  it('Should render', () => {
    renderComponent(favourites);
    const mainElement = screen.getByTestId('character-summary');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should render the correct thumbnail', () => {
    renderComponent(favourites);
    const imageElement: HTMLImageElement = screen.getByAltText(
      `${mockCharacter.name} portrait`
    );
    expect(imageElement.src).toBe(
      `${mockCharacter.thumbnail.path}/portrait_uncanny.${mockCharacter.thumbnail.extension}`
    );
  });
  it('Should render the correct description', () => {
    renderComponent(favourites);
    const descriptionElement = screen.getByText(mockCharacter.description);
    expect(descriptionElement).toBeInTheDocument();
  });
  it('Should render the correct character name', () => {
    renderComponent(favourites);
    const nameElement = screen.getByText(mockCharacter.name);
    expect(nameElement).toBeInTheDocument();
  });
  it('Should render the favourite button', () => {
    renderComponent(favourites);
    const favouriteBtn = screen.getByTestId('favourite-btn');
    const favouriteSvg = favouriteBtn.getElementsByTagName('svg');
    expect(favouriteBtn).toBeInTheDocument();
    expect(favouriteSvg.length).toBe(1);
  });
  it('Should add the favourite status when favourite button is clicked', () => {
    renderComponent([]);
    const favouriteBtn = screen.getByTestId('favourite-btn');
    favouriteBtn.click();
    expect(addFavourite).toHaveBeenCalledWith(JSON.stringify(mockCharacter));
  });
  it('Should remove the favourite status when favourite button is clicked', () => {
    renderComponent(favourites);
    const favouriteBtn = screen.getByTestId('favourite-btn');
    favouriteBtn.click();
    expect(removeFavourite).toHaveBeenCalledWith(JSON.stringify(mockCharacter));
  });
});
