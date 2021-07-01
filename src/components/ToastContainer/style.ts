import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

import { ToastProps } from '../../types/ToastProps';

const toastVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const ToastContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;

export const Toast = styled(animated.div)<ToastProps>`
  & + div {
    margin-top: 8px;
  }

  width: 375px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2 2 8 rgba(0, 0, 0, 0.2);

  display: flex;

  background: #ebf8ff;
  color: #3172b7;

  ${({ type }) => toastVariations[type || 'info']}

  > svg {
    margin: 1px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: none;
    background: transparent;
    color: inherit;
  }

  ${({ description }) =>
    !description &&
    css`
      align-items: center;
      margin-top: 0;
    `}
`;
