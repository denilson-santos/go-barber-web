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

  function addToast({ type, title, description }: ToastProps): void {
    const message = {
      id: uuid(),
      type,
      title,
      description,
    };

    setMessages((oldMessages) => [...oldMessages, message]);
  }

  function removeToast(id: string): void {
    if (!id) return;

    setMessages(messages.filter((message) => message.id !== id));
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};
