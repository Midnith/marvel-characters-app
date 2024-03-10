import React, { useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from 'config';
import { AppContext } from 'app';
import {
  CharacterSummary,
  HorizontalScrollViewer,
  LoadingBar
} from 'app/components';
import { useCharacterInfo, useLoadingTransition } from 'app/hooks';
import styles from './CharacterInfo.module.scss';

export const CharacterInfo: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { characterId } = useParams();
  const refCharacterInfo = useRef<HTMLDivElement>(null);
  useLoadingTransition(refCharacterInfo, 'slide');

  if (!characterId) {
    navigate(config.PATH.LANDING);
    return <></>;
  }

  const { characterInfo, comics } = useCharacterInfo(characterId);
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading && <LoadingBar />}
      <div
        className={styles['character-info']}
        data-testid="page-character-info"
        ref={refCharacterInfo}
      >
        {characterInfo && <CharacterSummary character={characterInfo} />}
        {comics.length > 0 && <HorizontalScrollViewer comics={comics} />}
      </div>
    </>
  );
};
