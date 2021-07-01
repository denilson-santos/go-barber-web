import React from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { useTransition } from 'react-spring';

import * as Style from './style';
import { ToastProps } from '../../types/ToastProps';
import { useToast } from '../../hooks/useToast';

type ToastContainerProps = {
  messages: ToastProps[];
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  const { removeToast } = useToast();

  const icons = {
    info: <FiInfo size={24} />,
    success: <FiCheckCircle size={24} />,
    error: <FiAlertCircle size={24} />,
  };

  return (
    <Style.ToastContainer>
      {messagesWithTransitions((props, { id, type, title, description }) => (
        <Style.Toast
          key={id}
          type={type}
          title={title}
          description={description}
          style={props}
        >
          {icons[type || 'info']}

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
