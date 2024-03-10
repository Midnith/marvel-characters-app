import { useContext, useEffect, useState } from 'react';
import { searchCharacterById, getComicsByCharacterId } from 'integration';
import { AppContext } from 'app';
import {
  ActionsType,
  AppContextType,
  CharacterType,
  ComicType
} from 'app/context';

interface ReturnType {
  characterInfo: CharacterType | undefined;
  comics: ComicType[];
}

export const useCharacterInfo = (characterId: string): ReturnType => {
  const { actions } = useContext<AppContextType>(AppContext);
  const { setIsLoading } = actions as ActionsType;
  const [characterInfo, setCharacterInfo] = useState<CharacterType | undefined>(
    undefined
  );
  const [comics, setComics] = useState<ComicType[]>([]);

  useEffect(() => {
    if (characterId) {
      setIsLoading?.(true);

      const fetchData = async () => {
        try {
          const characterResponse = await searchCharacterById(
            Number(characterId)
          );
          setCharacterInfo(characterResponse);

          const comicsResponse = await getComicsByCharacterId(characterId);
          setComics(comicsResponse);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading?.(false);
        }
      };

      void fetchData();
    }
  }, [characterId]);

  return { characterInfo, comics };
};
