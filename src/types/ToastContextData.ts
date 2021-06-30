import { ToastProps } from './ToastProps';

export type ToastContextData = {
  addToast(message: Omit<ToastProps, 'id'>): void;
  removeToast(id: string): void;
};
