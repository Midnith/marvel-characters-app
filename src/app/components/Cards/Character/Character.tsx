import { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ICharacterCard } from './Character.interface';
import styles from './Character.module.scss';
import { FavouriteButton, MarvelImage } from 'app/components';

export const CharacterCard: React.FC<
  ICharacterCard & HTMLAttributes<HTMLDivElement>
> = ({ character, ...baseProps }) => {
  const { id, name, thumbnail } = character;
  const navigate = useNavigate();

  const navCharacter = (): void => {
    navigate(`/character/${id}`);
  };

  const shortenString = (text: string, maxChars: number): string => {
    return text.length > maxChars ? `${text.slice(0, maxChars)}...` : text;
  };

  return (
    <div
      {...baseProps}
      className={classnames(styles['character-card'], baseProps.className)}
      data-testid="character-thumbnail"
    >
      <button className={styles.thumbnail} onClick={navCharacter} tabIndex={0}>
        <MarvelImage
          src={thumbnail.path}
          alt={`${name} portrait`}
          extension={thumbnail.extension}
          format="landscape_xlarge"
        />
        <span className={styles.divider}></span>
      </button>

      <div className={styles.name}>
        <p>{shortenString(name, 15)}</p>
        <FavouriteButton
          className={styles.favourites}
          character={character}
          data-testid="favourite-btn"
        />
      </div>
    </div>
  );
};
