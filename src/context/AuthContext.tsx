import React, { createContext, useContext, useState } from 'react';

import api from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
};

type SignInData = {
  token: string;
  user: User;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user?: User;
  signIn(credentials: SignInCredentials): Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<SignInData | undefined>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) return { token, user: JSON.parse(user) };

    return undefined;
  });

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    const response = await api.post<SignInData>('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData(response.data);
  }

  return (
    <AuthContext.Provider value={{ user: data?.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
