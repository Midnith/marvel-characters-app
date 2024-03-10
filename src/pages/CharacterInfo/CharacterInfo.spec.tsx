import { render, screen } from '@testing-library/react';
import { CharacterInfo } from './CharacterInfo';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, CharacterType } from 'app/context';
import Characters from 'app/data/mock/characters.json';
import config from 'config';

const mockCharacters = Characters.data.results;

const mockFavourites = Characters.data.results
  .slice(0, 3)
  .map((favChar: CharacterType) => JSON.stringify(favChar));
const addFavourite = jest.fn();
const removeFavourite = jest.fn();
const setIsLoading = jest.fn();

const renderComponent = () =>
  render(
    <AppContext.Provider
      value={{
        favourites: mockFavourites,
        characters: mockCharacters,
        actions: {
          addFavourite,
          removeFavourite,
          setIsLoading
        }
      }}
    >
      <BrowserRouter>
        <CharacterInfo />
      </BrowserRouter>
    </AppContext.Provider>
  );

const mockedUsedNavigate = jest.fn();
const mockUseParams = jest.fn().mockReturnValue({
  characterId: '1017100'
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
  useNavigate: () => mockedUsedNavigate
}));

describe('Page: CharacterInfo', () => {
  it('Should render', () => {
    mockUseParams.mockReturnValueOnce({
      characterId: '1017100'
    });
    renderComponent();
    const mainElement = screen.getByTestId('page-character-info');
    expect(mainElement).toBeInTheDocument();
  });
  it('Should navigate to landing if there is no characterId', () => {
    mockUseParams.mockReturnValueOnce({
      characterId: ''
    });
    renderComponent();
    expect(mockedUsedNavigate).toHaveBeenCalledWith(config.PATH.LANDING);
  });
});
