import React, { createContext, useState } from 'react';

import api from '../services/api';
import { AuthContextData } from '../types/AuthContextData';
import { SignInCredentials } from '../types/SignInCredencials';
import { User } from '../types/User';

type SignInData = {
  token: string;
  user: User;
};

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export const AuthContextProvider: React.FC = ({ children }) => {
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

  function logout(): void {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData(undefined);
  }

  return (
    <AuthContext.Provider value={{ user: data?.user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
