import styles from './NotFound.module.scss';

export const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className={styles['not-found']} data-testid="page-not-found">
      <div className={styles.message}>Not found</div>
    </div>
  );
};

export default NotFound;
