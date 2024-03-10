export interface CharacterType {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: Array<{
      resourceURI: string;
      name: string;
    }>;
  };
}

export interface ComicType {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: Array<{
    type: string;
    language: string;
    text: string;
  }>;
  resourceURI: string;
  urls: Array<{
    type: string;
    url: string;
  }>;
}

export interface ActionsType {
  setCharacters?: (characters: CharacterType[]) => void;
  addCharacter?: (character: CharacterType) => void;
  clearCharacters?: () => void;
  setFavourites?: (favourites: string[]) => void;
  addFavourite?: (character: string) => void;
  removeFavourite?: (characterId: string) => void;
  setShowFavourites?: (state: boolean) => void;
  setIsLoading?: (state: boolean) => void;
  setIsSearching?: (state: boolean) => void;
}

export interface AppContextType {
  actions?: ActionsType;
  characters?: CharacterType[];
  favourites?: string[];
  showFavourites?: boolean;
  isLoading?: boolean;
  isSearching?: boolean;
}

export interface EmptyObject {
  children: React.ReactNode;
}
