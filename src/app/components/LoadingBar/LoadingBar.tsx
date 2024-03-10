import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './LoadingBar.module.scss';

export const LoadingBar: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...baseProps
}) => {
  return (
    <div
      {...baseProps}
      className={classnames(styles.loading, baseProps.className)}
      data-testid="loading-bar"
    />
  );
};
