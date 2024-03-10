import { useContext, useRef } from 'react';
import { AppContext } from 'app';
import { CharacterCard, LoadingBar, SearchBar } from 'app/components';
import {
  useDisplayCharacters,
  useTitleVisibility,
  useLoadingTransition
} from 'app/hooks';
import styles from './Landing.module.scss';

export const Landing: React.FC = (): JSX.Element => {
  const { isLoading } = useContext(AppContext);
  const refTitle = useRef<HTMLDivElement>(null);
  const refLanding = useRef<HTMLDivElement>(null);
  const refCharacters = useRef<HTMLDivElement>(null);
  useLoadingTransition(refLanding, 'opacity');
  useLoadingTransition(refLanding, 'opacity');
  useTitleVisibility(refTitle);
  const displayCharacters = useDisplayCharacters();

  return (
    <>
      {isLoading && <LoadingBar />}
      <div
        ref={refLanding}
        className={styles.landing}
        data-testid="page-landing"
      >
        <h1
          ref={refTitle}
          className={styles.title}
          data-testid="favourites-title"
        >
          Favourites
        </h1>
        <SearchBar className={styles['search-bar']} />
        <div
          className={styles.characters}
          data-testid="landing-characters"
          ref={refCharacters}
        >
          {displayCharacters?.map((character: any) => (
            <CharacterCard
              key={`card-${String(character.id)}`}
              character={character}
            />
          ))}
        </div>
      </div>
    </>
  );
};
