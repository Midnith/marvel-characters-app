import { CSSProperties, RefObject, useContext, useEffect } from 'react';
import { AppContext } from 'app/context';

export const useLoadingTransition = (
  elementRef: RefObject<HTMLDivElement>,
  style?: 'opacity' | 'slide'
): void => {
  const { isLoading } = useContext(AppContext);
  let visibleStyles: CSSProperties = {
    opacity: '1'
  };
  let hiddenStyles: CSSProperties = {
    opacity: '0'
  };

  switch (style) {
    case 'opacity':
      visibleStyles = {
        opacity: '1',
        transition: 'opacity 300ms'
      };

      hiddenStyles = {
        opacity: '0',
        transition: 'opacity 300ms'
      };
      break;
    case 'slide':
      visibleStyles = {
        opacity: '1',
        transform: 'translateX(0)',
        transition: 'transform 200ms, opacity 400ms'
      };

      hiddenStyles = {
        opacity: '0',
        transform: 'translateY(-100%)',
        transition: 'transform 200ms, opacity 400ms'
      };
      break;
  }

  useEffect(() => {
    const givenElement = elementRef.current as HTMLElement;

    if (givenElement) {
      isLoading
        ? Object.assign(givenElement.style, hiddenStyles)
        : Object.assign(givenElement.style, visibleStyles);
    }
  }, [isLoading, elementRef]);
};
