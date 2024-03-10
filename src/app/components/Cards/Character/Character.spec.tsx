import { render, screen } from '@testing-library/react';
import { CharacterCard } from './Character';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, CharacterType } from 'app/context';
import styles from './Character.module.scss';
import Characters from 'app/data/mock/characters.json';

const mockCharacter = Characters.data.results[1];

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
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    </AppContext.Provider>
  );

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('Component: CharacterCard', () => {
  it('Should render', () => {
    renderComponent(favourites);
    const mainElement = screen.getByTestId('character-thumbnail');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should render the correct thumbnail', () => {
    renderComponent(favourites);
    const imageElement: HTMLImageElement = screen.getByAltText(
      `${mockCharacter.name} portrait`
    );
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(
      `${mockCharacter.thumbnail.path}/landscape_xlarge.${mockCharacter.thumbnail.extension}`
    );
  });
  it('Should navigate when click on the thumbnail', () => {
    renderComponent(favourites);
    const thumbnailElement = screen.getByTestId('character-thumbnail');
    const thumbnailBtn = thumbnailElement.getElementsByClassName(
      styles.thumbnail
    )[0] as HTMLButtonElement;
    thumbnailBtn.click();
    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      `/character/${mockCharacter.id}`
    );
    mockedUsedNavigate.mockRestore();
  });
  it('Should render the favourites button', () => {
    renderComponent(favourites);
    const favouriteBtn = screen.getByTestId('favourite-btn');
    const favouriteSvg = favouriteBtn.getElementsByTagName('svg');
    expect(favouriteBtn).toBeInTheDocument();
    expect(favouriteSvg.length).toBe(1);
  });
  it('Should render the character name', () => {
    renderComponent(favourites);
    const nameElement = screen.getByText(mockCharacter.name);
    expect(nameElement).toBeInTheDocument();
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
