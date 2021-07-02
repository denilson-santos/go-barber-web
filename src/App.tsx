import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from './contexts';
import { Routes } from './routes';
import GlobalStyle from './styles/global';

export const App: React.FC = () => (
  <>
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>

    <GlobalStyle />
  </>
);
