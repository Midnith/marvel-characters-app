import React, { HTMLAttributes } from 'react';
import { IMarvelImage } from './MarvelImage.interface';

export const MarvelImage: React.FC<
  IMarvelImage & HTMLAttributes<HTMLImageElement>
> = ({ src, extension, format, alt, ...baseProps }) => {
  const thumbnailFullPath = `${src}/${format}.${extension}`;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    e.currentTarget.src =
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/landscape_xlarge.jpg';
  };

  const objectFit = format === 'portrait_uncanny' ? 'bottom' : 'left';

  const thumbnailStyle = src.includes('image_not_available')
    ? { objectPosition: objectFit }
    : {};

  return (
    <img
      {...baseProps}
      src={thumbnailFullPath}
      alt={alt}
      onError={handleImageError}
      style={thumbnailStyle}
    />
  );
};
