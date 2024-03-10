import { RefObject, useContext, useEffect } from 'react';
import { AppContext, AppContextType } from 'app/context';

export const useTitleVisibility = (
  titleRef: RefObject<HTMLDivElement>
): void => {
  const { showFavourites }: AppContextType = useContext(AppContext);

  const visibleStyles = {
    height: 'fit-content',
    paddingBottom: '1.5rem',
    visibility: 'visible',
    opacity: '1',
    transition:
      'height cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms, padding cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms, opacity cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms, visibility cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms'
  };

  const hiddenStyles = {
    height: '0px',
    paddingBottom: '0',
    visibility: 'hidden',
    opacity: '0',
    transition:
      'height cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms, padding cubic-bezier(0.175, 0.885, 0.32, 1.275) 300ms, opacity cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms, visibility cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms'
  };

  useEffect(() => {
    const titleElement = titleRef.current as unknown as HTMLTitleElement;

    if (titleElement) {
      showFavourites
        ? Object.assign(titleElement.style, visibleStyles)
        : Object.assign(titleElement.style, hiddenStyles);
    }
  }, [showFavourites, titleRef]);
};
