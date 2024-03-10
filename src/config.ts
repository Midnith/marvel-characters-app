/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { env } from './env';
import md5 from 'md5';

const timeStamp = 1;
const hashValue = md5(
  `${timeStamp}${env.REACT_APP_API_PRIVATE_KEY}${env.REACT_APP_API_KEY}`
);

export default {
  API: {
    URL: env.REACT_APP_API,
    KEY: env.REACT_APP_API_KEY,
    FETCH_URL: `${env.REACT_APP_API}:search?:parametersts=${timeStamp}&apikey=${env.REACT_APP_API_KEY}&hash=${hashValue}`
  },
  PATH: {
    LANDING: env.REACT_APP_PATH_LANDING,
    CHARACTER_INFO: env.REACT_APP_PATH_CHARACTER_INFO
  }
};
