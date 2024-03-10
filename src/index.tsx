import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Routes } from 'app';

const App = (): JSX.Element => {
  const routing = useRoutes(Routes());
  return <>{routing}</>;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
