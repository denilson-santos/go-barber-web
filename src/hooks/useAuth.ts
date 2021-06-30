import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { AuthContextData } from '../types/AuthContextData';

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
