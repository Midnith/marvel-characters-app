import React, { useMemo, useState } from 'react';
import {
  AppContextType,
  CharacterType,
  EmptyObject
} from './AppContext.interface';

export const AppContext = React.createContext<AppContextType>({});

export const AppContextWrapper: React.FC<AppContextType & EmptyObject> = ({
  children
}) => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavourites, setShowFavourites] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const actions = useMemo(
    () => ({
      setCharacters,
      addCharacter: (character: CharacterType) =>
        setCharacters((prev) => [...prev, character]),
      clearCharacters: () => setCharacters([]),
      setFavourites,
      addFavourite: (character: string) =>
        setFavourites((prev) => [...prev, character]),
      removeFavourite: (characterId: string) =>
        setFavourites((prev) => prev.filter((char) => char !== characterId)),
      setShowFavourites,
      setIsLoading,
      setIsSearching
    }),
    []
  );

  return (
    <AppContext.Provider
      value={{
        actions,
        characters,
        favourites,
        showFavourites,
        isLoading,
        isSearching
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
