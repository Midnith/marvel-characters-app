import { HTMLAttributes, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { IHorizontalScrollViewer } from './HorizontalScrollViewer.interface';
import styles from './HorizontalScrollViewer.module.scss';
import { Comic } from 'app/components';

export const HorizontalScrollViewer: React.FC<
  IHorizontalScrollViewer & HTMLAttributes<HTMLDivElement>
> = ({ comics, ...baseProps }) => {
  const scrollingDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrolllingDivElement = scrollingDiv?.current;
    if (scrollingDiv !== null && scrolllingDivElement !== null)
      scrolllingDivElement?.addEventListener('wheel', function (e) {
        if (e.deltaY > 0) scrolllingDivElement.scrollLeft += 50;
        else scrolllingDivElement.scrollLeft -= 50;
      });
  }, []);

  return (
    <div
      {...baseProps}
      className={classnames(styles['horizontal-scroll'], baseProps.className)}
      data-testid="horizontal-scroll"
    >
      <h2>Comics</h2>
      <div
        className={styles.wrapper}
        ref={scrollingDiv}
        data-testid="scrolling-comics"
      >
        {comics.map((comic: any) => (
          <Comic
            comic={comic}
            key={`comic-${comic.id}`}
            className={styles.comic}
          />
        ))}
      </div>
    </div>
  );
};
