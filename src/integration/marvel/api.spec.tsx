import {
  getAllCharacters,
  searchCharacters,
  searchCharacterById,
  getComicsByCharacterId
} from './api';
import Characters from 'app/data/mock/characters.json';

const mockCharacter = Characters.data.results[1];

describe('API: Marvel api', () => {
  it('Should return all characters (limited to 50)', async () => {
    const characters = await getAllCharacters();
    expect(characters).toHaveLength(50);
  });

  it('Should search characters by name', async () => {
    const searchText = 'Iron Man';
    const characters = await searchCharacters(searchText);
    expect(characters).toHaveLength(7);
  });

  it('Should search a character by ID', async () => {
    const characterId = mockCharacter.id;
    const character = await searchCharacterById(characterId);
    expect(character.id).toBe(characterId);
  });

  it('Should receive comics by character', async () => {
    const characterId = String(mockCharacter.id);
    const comics = await getComicsByCharacterId(characterId);
    expect(comics).toHaveLength(mockCharacter.comics.available);
  });
});
