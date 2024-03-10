import { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ICharacterSummary } from './CharacterSummary.interface';
import { FavouriteButton, MarvelImage } from 'app/components';
import styles from './CharacterSummary.module.scss';

export const CharacterSummary: React.FC<
  ICharacterSummary & HTMLAttributes<HTMLDivElement>
> = ({ character, ...baseProps }) => {
  const { name, thumbnail, description } = character;

  return (
    <div
      {...baseProps}
      className={classnames(styles['character-summary'], baseProps.className)}
      data-testid="character-summary"
    >
      <div className={styles.wrapper}>
        <div className={styles.thumbnail}>
          <MarvelImage
            src={thumbnail.path}
            alt={`${name} portrait`}
            extension={thumbnail.extension}
            format="portrait_uncanny"
          />
        </div>

        <div className={styles.description}>
          <div className={styles.name}>
            <h1>{name}</h1>
            <FavouriteButton
              className={styles.favourites}
              character={character}
              data-testid="favourite-btn"
            />
          </div>
          <p>{description ?? ''}</p>
        </div>
      </div>
    </div>
  );
};
