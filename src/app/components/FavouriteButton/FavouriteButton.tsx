import { AppContext } from 'app/context';
import { HTMLAttributes, useContext } from 'react';
import { IFavouriteButton } from './FavouriteButton.interface';
import { ReactComponent as HeartSolid } from 'app/assets/Images/Heart.svg';
import { ReactComponent as HeartOutline } from 'app/assets/Images/HeartOutline.svg';

export const FavouriteButton: React.FC<
  IFavouriteButton & HTMLAttributes<HTMLButtonElement>
> = ({ character, ...baseProps }) => {
  const context: any = useContext(AppContext);
  const { favourites } = context;
  const { addFavourite, removeFavourite } = context.actions;
  const stringifiedCharacter = JSON.stringify(character);

  const toggleFavourites = (): void => {
    favourites.includes(stringifiedCharacter)
      ? removeFavourite(stringifiedCharacter)
      : addFavourite(stringifiedCharacter);
  };

  const isFavourite = favourites.includes(stringifiedCharacter);
  return (
    <button
      {...baseProps}
      onClick={toggleFavourites}
      tabIndex={0}
      aria-label="Toggle this character from your favourites"
    >
      {isFavourite ? <HeartSolid /> : <HeartOutline />}
    </button>
  );
};
