import { ChangeEvent, HTMLAttributes, useContext } from 'react';
import classnames from 'classnames';
import { ActionsType, AppContext } from 'app/context';
import { ReactComponent as Search } from 'app/assets/Images/Magnifier.svg';
import styles from './SearchBar.module.scss';
import { getAllCharacters, searchCharacters } from 'integration';

export const SearchBar: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...baseProps
}) => {
  const { characters, favourites, showFavourites, actions } =
    useContext(AppContext);
  const { setCharacters, setShowFavourites, setIsSearching } =
    actions as ActionsType;

  const typewatch = (function () {
    let timer = 0;
    return function (callback: () => void, ms: number | undefined) {
      clearTimeout(timer);
      timer = Number(setTimeout(callback, ms));
    };
  })();

  const handleSearch = (searchText: string): void => {
    setShowFavourites?.(false);
    setIsSearching?.(true);
    searchText.length > 0
      ? searchCharacters(searchText)
          .then((result) => setCharacters?.(result))
          .catch((error) => console.error(error))
      : getAllCharacters()
          .then((result) => setCharacters?.(result))
          .catch((error) => console.error(error));
  };

  return (
    <div
      {...baseProps}
      className={classnames(styles['search-bar'], baseProps.className)}
      data-testid="search-bar"
    >
      <div className={styles.search}>
        <Search />
        <input
          role="searchbox"
          aria-label="Search a character..."
          type="text"
          placeholder="Search a character..."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            typewatch(() => handleSearch(e.target.value), 400)
          }
        />
      </div>
      <div className={styles.results} data-testid="search-results">
        {showFavourites ? favourites?.length : characters?.length} RESULTS
      </div>
    </div>
  );
};
