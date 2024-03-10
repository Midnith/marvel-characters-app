import { useContext, useMemo } from 'react';
import { AppContext } from 'app';
import { getAllCharacters } from 'integration';
import { ActionsType, CharacterType } from 'app/context';

export const useDisplayCharacters = (): CharacterType[] => {
  const { favourites, showFavourites, characters, actions, isSearching } =
    useContext(AppContext);
  const { setCharacters, setIsLoading } = actions as ActionsType;
  const initialDisplayCharacters = characters;

  const displayCharacters = useMemo(() => {
    if (showFavourites) {
      const favoriteCharacters = favourites?.map(
        (character: string) => JSON.parse(character) as CharacterType
      );
      return favoriteCharacters ?? initialDisplayCharacters;
    } else {
      if (characters?.length === 0 && !isSearching) {
        setIsLoading?.(true);

        const timeoutId = setTimeout(() => {
          setIsLoading?.(false);
          getAllCharacters()
            .then((response) => {
              setCharacters?.(response);
              return response;
            })
            .catch((error) => console.error(error))
            .finally(() => {
              clearTimeout(timeoutId);
            });
        }, 1000);
      } else {
        return initialDisplayCharacters;
      }
    }
  }, [showFavourites, characters]);

  return displayCharacters as CharacterType[];
};
