import React, { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { ToastContainer } from '../components/ToastContainer';
import { ToastContextData } from '../types/ToastContextData';
import { ToastProps } from '../types/ToastProps';

export const ToastContext = createContext<ToastContextData | undefined>(
  undefined
);

export const ToastContextProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastProps[]>([]);

  function removeToast(id: string): void {
    if (!id) return;

    setMessages((oldMessages) =>
      oldMessages.filter((message) => message.id !== id)
    );
  }

  function addToast({ type, title, description }: ToastProps): void {
    const message = {
      id: uuid(),
      type,
      title,
      description,
    };

    setMessages((oldMessages) => [...oldMessages, message]);

    setTimeout(() => {
      removeToast(message.id);
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};
