import { RouteObject } from 'react-router-dom';
import { PublicLayout } from 'app/layout';
import { Landing, CharacterInfo } from 'pages';
import { NotFound } from 'pages/NotFound';

export const Routes = (): RouteObject[] => [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '',
        element: <Landing />
      },
      {
        path: 'character/:characterId',
        element: <CharacterInfo />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];
