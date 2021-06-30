import { useContext } from 'react';

import { ToastContext } from '../contexts/ToastContext';
import { ToastContextData } from '../types/ToastContextData';

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error('useToast must be used within an ToastProvider');

  return context;
}
