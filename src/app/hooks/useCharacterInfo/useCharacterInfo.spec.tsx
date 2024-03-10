import { ReactNode } from 'react';
import { WrapperComponent, renderHook } from '@testing-library/react-hooks';
import { useCharacterInfo } from './useCharacterInfo';
import { AppContext, AppContextType } from 'app/context';
import Characters from 'app/data/mock/characters.json';
import Comics from 'app/data/mock/comics.json';

const mockCharacter = Characters.data.results[1];
const mockComics = Comics.data.results;

const CustomWrapper: WrapperComponent<{
  children?: ReactNode;
  initialProps: AppContextType;
}> = ({ children, initialProps }) => (
  <AppContext.Provider value={initialProps}>{children}</AppContext.Provider>
);

const renderCustomHook = (characterId: string, initialProps: AppContextType) =>
  renderHook(() => useCharacterInfo(characterId), {
    wrapper: CustomWrapper,
    initialProps: { initialProps }
  });

const mockCharacterInfoContext = {
  actions: {
    setIsLoading: jest.fn()
  }
};

describe('Hooks: useCharacterInfo', () => {
  beforeEach(() => {
    jest.mock('integration', () => ({
      searchCharacterById: jest.fn().mockResolvedValue(mockCharacter),
      getComicsByCharacterId: jest.fn().mockResolvedValue(mockComics)
    }));
  });
  it('Should fetch character info and comics when characterId is provided', async () => {
    renderCustomHook('1010354', mockCharacterInfoContext);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    expect(mockCharacterInfoContext.actions.setIsLoading).toHaveBeenCalledTimes(
      2
    );
  });
  it('Should not fetch character info or comics when characterId is not provided', () => {
    const { result } = renderCustomHook('', mockCharacterInfoContext);

    expect(result.current.characterInfo).toBeUndefined();
    expect(result.current.comics).toEqual([]);
  });
});
