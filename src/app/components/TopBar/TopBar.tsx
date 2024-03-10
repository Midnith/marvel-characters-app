import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import config from 'config';
import { AppContext } from 'app/context';
import { ReactComponent as MarvelLogo } from 'app/assets/Images/MarvelLogo.svg';
import { ReactComponent as Favourites } from 'app/assets/Images/Heart.svg';
import styles from './TopBar.module.scss';
import { ActionsType } from 'app/context/';

export const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const { favourites, actions, showFavourites } = useContext(AppContext);
  const { setShowFavourites, clearCharacters, setIsSearching } =
    actions as ActionsType;
  const favouritesCounter = favourites?.length;

  const navLanding = (): void => {
    showFavourites ? setShowFavourites?.(false) : clearCharacters?.();
    setIsSearching?.(false);
    navigate(config.PATH.LANDING);
  };

  const searchFavourites = (): void => {
    setShowFavourites?.(true);
    setIsSearching?.(false);
    navigate(config.PATH.LANDING);
  };

  return (
    <nav className={styles.topbar}>
      <button
        role="link"
        className={styles.logo}
        onClick={navLanding}
        tabIndex={0}
        aria-label="Go to Landing page"
      >
        <MarvelLogo />
      </button>
      <button
        className={styles.favourites}
        onClick={searchFavourites}
        tabIndex={0}
        aria-label="Show your favourite characters"
      >
        <Favourites />
        {favouritesCounter}
      </button>
    </nav>
  );
};
