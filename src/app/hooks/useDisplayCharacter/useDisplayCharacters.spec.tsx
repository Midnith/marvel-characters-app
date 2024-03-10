import { ReactNode } from 'react';
import { WrapperComponent, renderHook } from '@testing-library/react-hooks';
import { useDisplayCharacters } from './useDisplayCharacters';
import { AppContext, AppContextType, CharacterType } from 'app/context';
import Characters from 'app/data/mock/characters.json';

const mockCharacters = Characters.data.results;
const mockJSONFavourites = Characters.data.results.slice(0, 3);
const mockFavourites = Characters.data.results
  .slice(0, 3)
  .map((favChar: CharacterType) => JSON.stringify(favChar));

const mockAppContext = {
  favourites: mockFavourites,
  actions: {
    setCharacters: jest.fn(),
    setIsLoading: jest.fn()
  }
};

const CustomWrapper: WrapperComponent<{
  children?: ReactNode;
  initialProps: AppContextType;
}> = ({ children, initialProps }) => (
  <AppContext.Provider value={initialProps}>{children}</AppContext.Provider>
);

const renderCustomHook = (initialProps: AppContextType) =>
  renderHook(() => useDisplayCharacters(), {
    wrapper: CustomWrapper,
    initialProps: { initialProps }
  });

describe('Hooks: useDisplayCharacters', () => {
  it('Should return favorite characters when showFavourites is true', () => {
    const { result } = renderCustomHook({
      showFavourites: true,
      characters: mockCharacters,
      ...mockAppContext
    });
    expect(result.current).toEqual(mockJSONFavourites);
  });
  it('Should return characters when showFavourites is false and characters are defined', () => {
    const { result } = renderCustomHook({
      showFavourites: false,
      characters: mockCharacters,
      ...mockAppContext
    });
    expect(result.current).toEqual(mockCharacters);
  });
  it('Should fetch characters when showFavourites is false, characters are empty and isSearching is false', async () => {
    renderCustomHook({
      showFavourites: false,
      characters: [],
      isSearching: false,
      ...mockAppContext
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(mockAppContext.actions.setCharacters).toHaveBeenCalled();
  });
  it('Should not fetch characters when showFavourites is false, characters are empty and isSearching is true', async () => {
    const { result } = renderCustomHook({
      showFavourites: false,
      characters: [],
      isSearching: true,
      ...mockAppContext
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(mockAppContext.actions.setCharacters).not.toHaveBeenCalled();
    expect(result.current).toEqual([]);
  });
});
