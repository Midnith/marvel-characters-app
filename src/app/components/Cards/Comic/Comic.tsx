import { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { IComic } from './Comic.interface';
import { MarvelImage } from 'app/components/MarvelImage';
import styles from './Comic.module.scss';

export const Comic: React.FC<IComic & HTMLAttributes<HTMLDivElement>> = ({
  comic,
  ...baseProps
}) => {
  const { title, thumbnail, dates } = comic;

  const onSaleDate = dates.find(
    (date: { [key: string]: string }) => date.type === 'onsaleDate'
  );
  const comicYear = onSaleDate ? onSaleDate.date.slice(0, 4) : '';

  return (
    <div
      {...baseProps}
      className={classnames(styles['comic-card'], baseProps.className)}
      data-testid="comic-card"
    >
      <div className={styles.thumbnail}>
        <MarvelImage
          src={thumbnail.path}
          alt={`${title} front page`}
          extension={thumbnail.extension}
          format="portrait_incredible"
        />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.year}>{comicYear}</p>
    </div>
  );
};
