import { render, screen } from '@testing-library/react';
import { FavouriteButton } from './FavouriteButton';
import Characters from 'app/data/mock/characters.json';
import { AppContext, CharacterType } from 'app/context';

const mockFavourites = Characters.data.results
  .slice(0, 3)
  .map((favChar: CharacterType) => JSON.stringify(favChar));
const mockCharacter = Characters.data.results[1];
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
      <FavouriteButton character={mockCharacter} />
    </AppContext.Provider>
  );

describe('Component: FavouriteButton', () => {
  it('Should render', () => {
    renderComponent(mockFavourites);
    const favouriteBtn = screen.getByRole('button');
    expect(favouriteBtn).toBeInTheDocument();
  });
  it('Should render the favourites icon', () => {
    renderComponent(mockFavourites);
    const favouriteBtn = screen.getByRole('button');
    const favouriteSvg = favouriteBtn.getElementsByTagName('svg');
    expect(favouriteBtn).toBeInTheDocument();
    expect(favouriteSvg.length).toBe(1);
  });
  it('Should add the favourite status when favourite button is clicked', () => {
    renderComponent([]);
    const favouriteBtn = screen.getByRole('button');
    favouriteBtn.click();
    expect(addFavourite).toHaveBeenCalledWith(JSON.stringify(mockCharacter));
  });
  it('Should remove the favourite status when favourite button is clicked', () => {
    renderComponent(mockFavourites);
    const favouriteBtn = screen.getByRole('button');
    favouriteBtn.click();
    expect(removeFavourite).toHaveBeenCalledWith(JSON.stringify(mockCharacter));
  });
});
