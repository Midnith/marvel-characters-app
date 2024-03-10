import { CharacterType, ComicType } from 'app/context';
import config from 'config';

const getCharacters = async (
  parameters = '',
  id?: number
): Promise<CharacterType[] & CharacterType> => {
  const characterId = id !== undefined ? `/${id}` : '';
  const response = await fetch(
    `${config.API.FETCH_URL.replace(':search', `/characters${characterId}`).replace(':parameters', parameters)}`
  );

  const { data } = await response.json();
  const characters = data.results;
  return id ? characters[0] : characters;
};

export const getAllCharacters = async (): Promise<CharacterType[]> => {
  return await getCharacters('limit=50&');
};

export const searchCharacters = async (
  text: string
): Promise<CharacterType[]> => {
  return await getCharacters(`limit=100&nameStartsWith=${text}&`);
};

export const searchCharacterById = async (
  id: number
): Promise<CharacterType> => {
  return await getCharacters('', id);
};

export const getComicsByCharacterId = async (
  id?: string
): Promise<ComicType[]> => {
  const characterId = id !== undefined ? `/${id}` : '';
  const response = await fetch(
    `${config.API.FETCH_URL.replace(':search', `/characters${characterId}/comics`).replace(':parameters', 'limit=20&orderBy=onsaleDate&')}`
  );
  const { data } = await response.json();
  const comics = data.results;
  return comics;
};
