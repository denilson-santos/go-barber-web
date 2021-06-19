import React, { createContext, useContext } from 'react';

import api from '../services/api';

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
};

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    const response = await api.post('sessions', { email, password });

    console.log(response.data);
  }

  return (
    <AuthContext.Provider value={{ name: 'Denilson', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContextData {
  const authContext = useContext(AuthContext);

  if (!authContext) throw new Error('Not auth context found');

  return authContext;
}
