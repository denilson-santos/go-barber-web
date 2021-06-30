import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import * as Style from './style';
import { ToastProps } from '../../types/ToastProps';
import { useToast } from '../../hooks/useToast';

type ToastContainerProps = {
  messages: ToastProps[];
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast();

  return (
    <Style.ToastContainer>
      {messages.map(({ id, type, title, description }) => (
        <Style.Toast
          key={id}
          type={type}
          title={title}
          description={description}
        >
          <FiAlertCircle size={20} />
          <div>
            <strong>{title}</strong>
            <p>{description}</p>
          </div>
          <button type="button" onClick={() => removeToast(id || '')}>
            <FiXCircle size={18} />
          </button>
        </Style.Toast>
      ))}
    </Style.ToastContainer>
  );
};
