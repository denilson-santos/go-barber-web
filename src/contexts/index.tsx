import React from 'react';

import { AuthContextProvider } from './AuthContext';
import { ToastContextProvider } from './ToastContext';

export const AppProvider: React.FC = ({ children }) => (
  <AuthContextProvider>
    <ToastContextProvider>{children}</ToastContextProvider>
  </AuthContextProvider>
);
